import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';
import { 
  Building2, 
  Radio, 
  Cpu, 
  Activity, 
  Play, 
  Pause, 
  Sliders, 
  ShieldCheck, 
  Layers, 
  ArrowDown, 
  Zap, 
  Eye
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const TOTAL_FRAMES = 120;

interface EngineeringChapterProps {
  id: string;
  badge: string;
  badgeIcon: React.ReactNode;
  title: string;
  desc: string;
  videoSrc: string;
  sequenceFolder: string;
  hudTitle: string;
  hudMetrics: { label: string; value: string; highlight?: boolean }[];
  specLabel1: string;
  specVal1: string;
  specLabel2: string;
  specVal2: string;
}

function EngineeringChapter({
  id,
  badge,
  badgeIcon,
  title,
  desc,
  videoSrc,
  sequenceFolder,
  hudTitle,
  hudMetrics,
  specLabel1,
  specVal1,
  specLabel2,
  specVal2,
}: EngineeringChapterProps) {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Lazy chapter activation: Only stream frames when chapter approaches viewport
  const [inView, setInView] = useState(false);
  const [playbackMode, setPlaybackMode] = useState<'scroll' | 'play'>('scroll');
  const [isPlaying, setIsPlaying] = useState(false);
  const [images, setImages] = useState<(HTMLImageElement | null)[]>(() => new Array(TOTAL_FRAMES).fill(null));

  // Smooth scroll tracking across 240vh
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 34,
    mass: 0.35,
  });

  // 1. Viewport Detection: Activate loading only when chapter is near (800px margin)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 800 && rect.bottom > -800) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight + 800) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '800px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Render a specific frame onto the 2D canvas with proper DPR and cover scaling
  const drawFrameToCanvas = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const targetWidth = Math.round(rect.width * dpr);
    const targetHeight = Math.round(rect.height * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Object-fit: cover positioning
    const hRatio = rect.width / img.width;
    const vRatio = rect.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShiftX = (rect.width - img.width * ratio) / 2;
    const centerShiftY = (rect.height - img.height * ratio) / 2;

    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShiftX,
      centerShiftY,
      img.width * ratio,
      img.height * ratio
    );
    ctx.restore();
  }, []);

  // 2. High-Performance Progressive Frame Streaming:
  // Phase 1 (Instant): Frame 0 paints immediately (Latency < 50ms)
  // Phase 2 (Buffer): Frames 1-15 load for instant touch-scrubbing
  // Phase 3 (Background): Remaining frames stream in small idle batches without choking network
  useEffect(() => {
    if (!inView) return;

    let isCancelled = false;
    const frameCache: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);

    const getFrameUrl = (idx: number) => {
      const padded = String(idx).padStart(4, '0');
      return `/sequences/${sequenceFolder}/frame_${padded}.webp`;
    };

    // Phase 1: Critical Keyframe 0
    const frame0 = new Image();
    frame0.src = getFrameUrl(0);
    frame0.onload = () => {
      if (isCancelled) return;
      frameCache[0] = frame0;
      setImages([...frameCache]);
      drawFrameToCanvas(frame0);

      // Phase 2: Immediate Buffer (Frames 1-15)
      loadBatch(1, 15, () => {
        // Phase 3: Progressive streaming in batches of 8
        streamRemaining(16);
      });
    };

    const loadBatch = (start: number, end: number, onDone?: () => void) => {
      let pending = end - start + 1;
      if (pending <= 0) {
        onDone?.();
        return;
      }

      for (let i = start; i <= end && i < TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = getFrameUrl(i);
        img.onload = () => {
          if (isCancelled) return;
          frameCache[i] = img;
          pending--;
          if (pending === 0) {
            setImages([...frameCache]);
            onDone?.();
          }
        };
        img.onerror = () => {
          pending--;
          if (pending === 0) onDone?.();
        };
      }
    };

    const streamRemaining = (startIdx: number) => {
      if (isCancelled || startIdx >= TOTAL_FRAMES) return;
      const batchSize = 8;
      const endIdx = Math.min(startIdx + batchSize - 1, TOTAL_FRAMES - 1);

      loadBatch(startIdx, endIdx, () => {
        if (isCancelled) return;
        setImages([...frameCache]);

        // Schedule next batch on idle
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(() => streamRemaining(endIdx + 1), { timeout: 80 });
        } else {
          setTimeout(() => streamRemaining(endIdx + 1), 35);
        }
      });
    };

    return () => {
      isCancelled = true;
    };
  }, [inView, sequenceFolder, drawFrameToCanvas]);

  // Find the closest loaded image so the canvas never drops a frame or shows a blank flash
  const getBestAvailableImage = useCallback((targetIdx: number) => {
    if (images[targetIdx] && images[targetIdx]!.complete) return images[targetIdx]!;
    for (let i = targetIdx - 1; i >= 0; i--) {
      if (images[i] && images[i]!.complete) return images[i]!;
    }
    for (let i = targetIdx + 1; i < TOTAL_FRAMES; i++) {
      if (images[i] && images[i]!.complete) return images[i]!;
    }
    return null;
  }, [images]);

  // Sync scroll progress with canvas frame
  useEffect(() => {
    if (playbackMode !== 'scroll') return;

    const unsubscribe = smoothProgress.on('change', (progress) => {
      const frameIdx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1))));
      const img = getBestAvailableImage(frameIdx);
      if (img) {
        drawFrameToCanvas(img);
      }
    });

    return () => unsubscribe();
  }, [smoothProgress, playbackMode, getBestAvailableImage, drawFrameToCanvas]);

  // Handle mode switches
  const handleSetMode = (mode: 'scroll' | 'play') => {
    setPlaybackMode(mode);
    const video = videoRef.current;
    if (!video) return;

    if (mode === 'play') {
      video.preload = 'auto';
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
      // Immediately draw current scroll frame
      const progress = scrollYProgress.get();
      const frameIdx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1))));
      const img = getBestAvailableImage(frameIdx);
      if (img) drawFrameToCanvas(img);
    }
  };

  return (
    <div id={id} ref={containerRef} className="relative h-[220vh] sm:h-[260vh] bg-[#050508] text-white" style={{ touchAction: 'pan-y' }}>
      {/* Sticky High-Definition Fullscreen Viewport */}
      <div className="sticky top-0 h-[100dvh] w-full flex items-center justify-center overflow-hidden" style={{ touchAction: 'pan-y' }}>
        
        {/* Layer 1: Canvas for Zero-Latency 60FPS Touch & Scroll Scrubbing */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            playbackMode === 'scroll' ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
          }`}
          style={{ touchAction: 'pan-y' }}
        />

        {/* Layer 2: GPU Hardware-Accelerated Native Video (Zero initial bandwidth: preload="none") */}
        <video
          ref={videoRef}
          src={videoSrc}
          playsInline
          muted
          loop
          preload="none"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            playbackMode === 'play' ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
          }`}
          style={{ filter: 'contrast(1.04) brightness(0.97)', touchAction: 'pan-y' }}
        />

        {/* Ambient Dark Tech Gradients */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#050508] via-transparent to-[#050508]/80 z-15" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#050508]/70 via-transparent to-[#050508]/70 z-15" />

        {/* Top Controls: Mode Switcher & Quality Tag */}
        <div className="absolute top-20 sm:top-24 left-3 right-3 sm:left-6 sm:right-6 flex items-center justify-between z-30 pointer-events-auto">
          <div className="inline-flex p-1 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/15 shadow-2xl">
            <button
              onClick={() => handleSetMode('scroll')}
              className={`min-h-[44px] px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
                playbackMode === 'scroll'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-950/60'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Scroll 3D' : 'Scroll 3D'}</span>
            </button>

            <button
              onClick={() => handleSetMode('play')}
              className={`min-h-[44px] px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
                playbackMode === 'play'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-950/60'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-300" /> : <Play className="w-3.5 h-3.5 text-emerald-300" />}
              <span>{language === 'es' ? 'Auto-Play' : 'Auto-Play'}</span>
              <span className="hidden sm:inline">60FPS</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-xl border border-blue-500/30 text-blue-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span>DRONE SCAN MASTER</span>
          </div>
        </div>

        {/* Live Engineering Telemetry & Narrative Overlay */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 sm:p-12 z-20">
          
          {/* Mobile Compact HUD Bar */}
          <div className="pt-36 sm:hidden flex justify-center w-full pointer-events-none">
            <div className="bg-black/85 backdrop-blur-xl border border-white/15 rounded-2xl px-3.5 py-1.5 flex items-center gap-3 text-[11px] font-mono shadow-xl">
              <span className="flex items-center gap-1 text-blue-400 font-bold">
                <Activity className="w-3 h-3 text-blue-400" />
                <span>{hudTitle.replace('LGI ', '')}</span>
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400 font-bold">{hudMetrics[1]?.value || hudMetrics[0]?.value}</span>
            </div>
          </div>

          {/* Desktop Top-Right HUD Telemetry Card */}
          <div className="pt-24 sm:pt-20 hidden sm:flex justify-end pointer-events-none">
            <div className="bg-black/80 backdrop-blur-2xl border border-white/15 rounded-3xl p-5 sm:p-6 max-w-xs w-full shadow-2xl space-y-4 font-mono">
              <div className="flex items-center justify-between text-xs text-slate-300 border-b border-white/10 pb-2.5">
                <span className="flex items-center gap-1.5 text-blue-400 font-bold tracking-wider">
                  <Activity className="w-4 h-4 text-blue-400" />
                  <span>{hudTitle}</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  REAL-TIME
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                {hudMetrics.map((m, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-slate-400">{m.label}</span>
                    <span className={m.highlight ? 'text-emerald-400 font-bold' : 'text-white font-semibold'}>
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2 text-center text-[10px]">
                <div className="p-2 rounded-xl bg-white/5">
                  <span className="text-slate-400 block">{specLabel1}</span>
                  <span className="text-white font-bold text-xs">{specVal1}</span>
                </div>
                <div className="p-2 rounded-xl bg-white/5">
                  <span className="text-slate-400 block">{specLabel2}</span>
                  <span className="text-white font-bold text-xs">{specVal2}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Narrative Card */}
          <div className="pb-6 sm:pb-16 max-w-2xl space-y-2 sm:space-y-3 pointer-events-none">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/50 text-blue-300 text-[11px] sm:text-xs font-mono uppercase tracking-wider shadow-lg shadow-blue-950/50">
              {badgeIcon}
              <span>{badge}</span>
            </div>

            <h2 className="text-2xl sm:text-5xl font-black text-white tracking-tight leading-snug sm:leading-tight drop-shadow-lg">
              {title}
            </h2>

            <p className="text-xs sm:text-base text-slate-200 leading-relaxed font-sans max-w-xl drop-shadow-md line-clamp-3 sm:line-clamp-none">
              {desc}
            </p>

            {playbackMode === 'scroll' && (
              <div className="pt-1 flex items-center gap-1.5 text-[11px] sm:text-xs font-mono text-blue-400 animate-pulse">
                <ArrowDown className="w-3.5 h-3.5" />
                <span>{language === 'es' ? 'Desliza con tu dedo para controlar el vuelo' : 'Swipe up/down to scrub drone trajectory'}</span>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

export default function EngineeringCinematicShowcase() {
  const { language } = useLanguage();

  return (
    <section className="relative">
      
      {/* CAPÍTULO 1: DRONE SCAN VIADUCTO ATIRANTADO (LGI INGENIERÍA) */}
      <EngineeringChapter
        id="viaducto-scan"
        badge={language === 'es' ? 'Capítulo 01 • Infraestructura Civil & Drones' : 'Chapter 01 • Civil Infrastructure & Drones'}
        badgeIcon={<Building2 className="w-3.5 h-3.5 text-blue-400" />}
        title={language === 'es' ? 'Inspección de Mega-Estructuras con Fotogrametría & LiDAR' : 'Mega-Infrastructure Laser Telemetry & Drone Inspection'}
        desc={language === 'es'
          ? 'Digitalización milimétrica de puentes atirantados, viaductos y túneles. Drones cinemáticos equipados con sensores LiDAR y visión artificial para modelar gemelos digitales 3D y detectar patologías sin detener el tráfico vehicular.'
          : 'High-precision photogrammetric and LiDAR drone surveys across suspension bridges and viaducts. Generating millimeter-accurate 3D digital twins and finite element models with zero traffic disruption.'}
        videoSrc="/videos/engineering/lgi-viaduct-drone.mp4"
        sequenceFolder="engineering-viaduct"
        hudTitle="LGI TELEMETRÍA CIVIL"
        hudMetrics={[
          { label: language === 'es' ? 'Nube de Puntos:' : 'LiDAR Point Cloud:', value: '18.4M pts/sec' },
          { label: language === 'es' ? 'Tolerancia Geométrica:' : 'Geometric Tolerance:', value: '± 0.8 mm', highlight: true },
          { label: language === 'es' ? 'Factor de Seguridad:' : 'Safety Factor:', value: '2.85 (Óptimo)' },
        ]}
        specLabel1={language === 'es' ? 'Sensor LiDAR' : 'LiDAR Sensor'}
        specVal1="Velodyne 64ch"
        specLabel2={language === 'es' ? 'Resolución' : 'Resolution'}
        specVal2="Submilimétrica"
      />

      {/* TRANSICIÓN EDITORIAL HACIA IOT */}
      <div className="py-20 px-6 bg-gradient-to-b from-[#050508] via-[#080a14] to-[#050508] border-y border-white/5 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400">
            {language === 'es' ? 'Capítulo 02 • Redes de Sensórica' : 'Chapter 02 • Sensor Networks'}
          </span>
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
            {language === 'es' ? 'De la Inspección Visual a la Sensórica Continua 24/7' : 'From Visual Surveying to 24/7 Continuous Telemetry'}
          </h3>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            {language === 'es'
              ? 'Desliza para ver la red de sensores IoT industriales comunicándose en tiempo real sobre la infraestructura.'
              : 'Continue scrolling to see ruggedized IoT sensors mesh-networking across live highway infrastructure.'}
          </p>
          <div className="flex justify-center pt-2">
            <div className="w-8 h-8 rounded-full border border-blue-500/30 flex items-center justify-center text-blue-400 animate-bounce">
              <ArrowDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* CAPÍTULO 2: RED MESH DE SENSORES IOT EN EL PUENTE (LGI IOT) */}
      <EngineeringChapter
        id="iot-bridge-mesh"
        badge={language === 'es' ? 'Capítulo 02 • LGI IoT & Salud Estructural (SHM)' : 'Chapter 02 • LGI IoT & Structural Health'}
        badgeIcon={<Radio className="w-3.5 h-3.5 text-blue-400" />}
        title={language === 'es' ? 'Red Inalámbrica Mesh: Alerta Sísmica y Deformaciones en Vivo' : 'Wireless Mesh Nodes: Real-Time Vibration & Early Seismic Alert'}
        desc={language === 'es'
          ? 'Nodos sensores de titanio anodizado apernados a pilas de puentes y pilas de concreto. Acelerómetros triaxiales MEMS e inclinómetros que transmiten vibraciones, frecuencias modales y temperatura hacia la nube cada 50ms.'
          : 'Ruggedized IoT sensor nodes bolted directly to concrete piers. Triaxial MEMS accelerometers and laser inclinometers streaming modal frequencies and ambient vibration to the cloud at 200Hz.'}
        videoSrc="/videos/iot/lgi-iot-sensors.mp4"
        sequenceFolder="iot-sensors"
        hudTitle="LGI RED MESH IOT"
        hudMetrics={[
          { label: language === 'es' ? 'Nodos Conectados:' : 'Connected Nodes:', value: '32 Sensores' },
          { label: language === 'es' ? 'Latencia Mesh:' : 'Mesh Latency:', value: '28 ms', highlight: true },
          { label: language === 'es' ? 'Frecuencia Muestreo:' : 'Sampling Rate:', value: '250 Hz' },
        ]}
        specLabel1={language === 'es' ? 'Acelerómetro' : 'Accelerometer'}
        specVal1="MEMS 3-Ejes"
        specLabel2={language === 'es' ? 'Protocolo' : 'Protocol'}
        specVal2="LoRaWAN / 4G"
      />

    </section>
  );
}
