import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';
import { 
  Sun, 
  BatteryCharging, 
  Zap, 
  Play, 
  Pause, 
  Sliders, 
  ArrowDown
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const TOTAL_FRAMES = 120;

interface ChapterProps {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  desc: string;
  videoSrc: string;
  sequenceFolder: string;
  instantKw: string;
  gridDependency: string;
  savings: string;
  metricLabel1: string;
  metricVal1: string;
  metricLabel2: string;
  metricVal2: string;
  accentColor: string;
}

function CinematicChapter({
  id,
  badge,
  title,
  desc,
  videoSrc,
  sequenceFolder,
  instantKw,
  gridDependency,
  savings,
  metricLabel1,
  metricVal1,
  metricLabel2,
  metricVal2,
}: ChapterProps) {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // In-memory ref cache: completely decoupled from React state to prevent re-render loops or network flooding
  const imageCacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const pendingRequestsRef = useRef<Set<number>>(new Set());

  const [inView, setInView] = useState(false);
  const [playbackMode, setPlaybackMode] = useState<'scroll' | 'play'>('scroll');
  const [isPlaying, setIsPlaying] = useState(false);

  // Smooth scroll tracking across 250vh
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    mass: 0.25,
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

  // Render a specific frame onto the 2D canvas with DPR awareness, zero-flicker buffer, and smart mobile framing
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

    // Guard: Only resize buffer if uninitialized or dimension changes significantly (> 80px, e.g. orientation change).
    // Prevents mobile address bar collapse/expand from wiping the canvas buffer and flashing black!
    const widthDiff = Math.abs(canvas.width - targetWidth);
    const heightDiff = Math.abs(canvas.height - targetHeight);
    if (canvas.width === 0 || canvas.height === 0 || widthDiff > 80 || heightDiff > 80) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    const canvasW = canvas.width;
    const canvasH = canvas.height;

    ctx.clearRect(0, 0, canvasW, canvasH);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const isMobilePortrait = rect.width < 768 && rect.height > rect.width;
    let ratio: number;
    let centerShiftX: number;
    let centerShiftY: number;

    if (isMobilePortrait) {
      // Smart mobile portrait framing:
      // A 16:9 render on a 9:19.5 phone will be 75% cropped if we use standard cover (Math.max).
      // Instead, fit the width with a generous 1.15x scale factor so the 3D subject is prominently visible
      // without chopping off the sides of the model.
      const baseRatio = canvasW / img.width;
      ratio = baseRatio * 1.15;
      centerShiftX = (canvasW - img.width * ratio) / 2;
      // Shift upward so it centers comfortably in the open space above the bottom narrative card
      const upwardOffset = Math.min(canvasH * 0.08, 60 * dpr);
      centerShiftY = (canvasH - img.height * ratio) / 2 - upwardOffset;
    } else {
      // Desktop / Landscape: standard cinematic object-cover
      const hRatio = canvasW / img.width;
      const vRatio = canvasH / img.height;
      ratio = Math.max(hRatio, vRatio);
      centerShiftX = (canvasW - img.width * ratio) / 2;
      centerShiftY = (canvasH - img.height * ratio) / 2;
    }

    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      Math.round(centerShiftX),
      Math.round(centerShiftY),
      Math.round(img.width * ratio),
      Math.round(img.height * ratio)
    );
  }, []);

  // Safe On-Demand Request: Loads at most 1 instance per frame, never duplicates, never triggers re-renders
  const requestFrame = useCallback((idx: number, onLoaded?: (img: HTMLImageElement) => void) => {
    if (idx < 0 || idx >= TOTAL_FRAMES) return;

    if (imageCacheRef.current.has(idx)) {
      const cached = imageCacheRef.current.get(idx)!;
      if (cached.complete && cached.naturalWidth > 0) {
        onLoaded?.(cached);
        return;
      }
    }

    if (pendingRequestsRef.current.has(idx)) return; // In-flight request

    pendingRequestsRef.current.add(idx);
    const img = new Image();
    const padded = String(idx).padStart(4, '0');
    img.src = `/sequences/${sequenceFolder}/frame_${padded}.webp`;

    img.onload = () => {
      pendingRequestsRef.current.delete(idx);
      imageCacheRef.current.set(idx, img);
      onLoaded?.(img);
    };

    img.onerror = () => {
      pendingRequestsRef.current.delete(idx);
    };
  }, [sequenceFolder]);

  // Initial Load: Request Frame 0 immediately, then progressively preload a low-bandwidth keyframe spine
  useEffect(() => {
    if (!inView) return;

    // 1. First priority: Frame 0 for instant initial render
    requestFrame(0, (img) => {
      drawFrameToCanvas(img);
    });

    // 2. Second priority: Progressive 8-keyframe spine spaced evenly across 120 frames
    // Spaced out with setTimeout (80ms each) so it never floods the network, but gives instant 360 scrubbing on mobile
    const keyframes = [15, 30, 45, 60, 75, 90, 105, 119];
    const timeouts: NodeJS.Timeout[] = [];

    keyframes.forEach((frameIdx, index) => {
      const timer = setTimeout(() => {
        requestFrame(frameIdx);
      }, 150 + index * 80);
      timeouts.push(timer);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [inView, requestFrame, drawFrameToCanvas]);

  // Scroll Scrubbing: Windowed On-Demand Streaming (Loads tight window around active position)
  useEffect(() => {
    if (playbackMode !== 'scroll') return;

    const progressSource = shouldReduceMotion ? scrollYProgress : smoothProgress;

    const unsubscribe = progressSource.on('change', (progress) => {
      const targetIdx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1))));

      // 1. Draw target or nearest cached frame immediately
      let bestImg = imageCacheRef.current.get(targetIdx);
      if (!bestImg || !bestImg.complete) {
        for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
          const prev = imageCacheRef.current.get(targetIdx - offset);
          if (prev && prev.complete) { bestImg = prev; break; }
          const next = imageCacheRef.current.get(targetIdx + offset);
          if (next && next.complete) { bestImg = next; break; }
        }
      }

      if (bestImg) {
        drawFrameToCanvas(bestImg);
      }

      // 2. Windowed prefetch: Request a 4-frame window around current scroll target (both directions)
      const startIdx = Math.max(0, targetIdx - 1);
      const endIdx = Math.min(TOTAL_FRAMES - 1, targetIdx + 2);
      for (let i = startIdx; i <= endIdx; i++) {
        requestFrame(i, (loadedImg) => {
          const currentProgress = progressSource.get();
          const currentIdx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.floor(currentProgress * (TOTAL_FRAMES - 1))));
          if (i === currentIdx) {
            drawFrameToCanvas(loadedImg);
          }
        });
      }
    });

    return () => unsubscribe();
  }, [smoothProgress, scrollYProgress, shouldReduceMotion, playbackMode, requestFrame, drawFrameToCanvas]);

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
      const progress = scrollYProgress.get();
      const targetIdx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1))));
      const img = imageCacheRef.current.get(targetIdx) || imageCacheRef.current.get(0);
      if (img) drawFrameToCanvas(img);
    }
  };

  return (
    <div id={id} ref={containerRef} className="relative h-[220vh] sm:h-[260vh] bg-[#050508] text-white" style={{ touchAction: 'pan-y' }}>
      {/* Sticky Fullscreen High-Definition Viewport */}
      <div className="sticky top-0 h-[100dvh] w-full flex items-center justify-center overflow-hidden" style={{ touchAction: 'pan-y' }}>
        
        {/* Layer 1: Canvas for Zero-Latency 60FPS Touch & Scroll Scrubbing */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full transition-opacity duration-300 pointer-events-none ${
            playbackMode === 'scroll' ? 'opacity-100 z-10' : 'opacity-0'
          }`}
        />

        {/* Layer 2: Native Hardware-Accelerated 1080p Video (Zero initial bandwidth: preload="none") */}
        <video
          ref={videoRef}
          src={videoSrc}
          playsInline
          muted
          loop
          preload="none"
          className={`absolute inset-0 w-full h-full object-contain md:object-cover object-[center_38%] md:object-center transition-opacity duration-300 pointer-events-none ${
            playbackMode === 'play' ? 'opacity-100 z-10' : 'opacity-0'
          }`}
          style={{ filter: 'contrast(1.03) brightness(0.98)' }}
        />

        {/* Ambient Dark Tech Gradients */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#050508] via-transparent to-[#050508]/80 z-15" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#050508]/70 via-transparent to-[#050508]/70 z-15" />

        {/* Floating Top Bar: Mode Switcher & Playback Control */}
        <div className="absolute top-16 sm:top-24 left-3 right-3 sm:left-6 sm:right-6 flex items-center justify-between z-30 pointer-events-auto">
          
          {/* Mode Switcher */}
          <div className="inline-flex p-1 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/15 shadow-2xl">
            <button
              onClick={() => handleSetMode('scroll')}
              className={`min-h-[44px] px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
                playbackMode === 'scroll'
                  ? 'bg-gradient-to-r from-[#ff1e42] to-rose-600 text-white shadow-lg shadow-rose-950/60'
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
                  ? 'bg-gradient-to-r from-[#ff1e42] to-rose-600 text-white shadow-lg shadow-rose-950/60'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-300" /> : <Play className="w-3.5 h-3.5 text-emerald-300" />}
              <span>{language === 'es' ? 'Auto-Play' : 'Auto-Play'}</span>
              <span className="hidden sm:inline">60FPS</span>
            </button>
          </div>

          {/* Video Definition Badge */}
          <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-xl border border-emerald-500/30 text-emerald-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>NATIVE 1080P MASTER</span>
          </div>

        </div>

        {/* Live Telemetry & Narrative Overlay */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 sm:p-12 z-20">
          
          {/* Mobile Compact HUD Bar */}
          <div className="pt-28 sm:hidden flex justify-center w-full pointer-events-none">
            <div className="bg-black/85 backdrop-blur-xl border border-white/15 rounded-2xl px-3.5 py-1.5 flex items-center gap-3 text-[11px] font-mono shadow-xl">
              <span className="flex items-center gap-1 text-rose-400 font-bold">
                <Zap className="w-3 h-3 text-[#ff1e42]" />
                <span>{instantKw}</span>
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400 font-bold">{gridDependency.split(' ')[0]}</span>
              <span className="text-slate-500">•</span>
              <span className="text-amber-300 font-bold">{savings}</span>
            </div>
          </div>

          {/* Desktop Top-Right Telemetry Card */}
          <div className="pt-24 sm:pt-20 hidden sm:flex justify-end pointer-events-none">
            <div className="bg-black/80 backdrop-blur-2xl border border-white/15 rounded-3xl p-5 sm:p-6 max-w-xs w-full shadow-2xl space-y-4 font-mono">
              <div className="flex items-center justify-between text-xs text-slate-300 border-b border-white/10 pb-2.5">
                <span className="flex items-center gap-1.5 text-rose-400 font-bold tracking-wider">
                  <Zap className="w-4 h-4 text-[#ff1e42]" />
                  <span>TELEMETRÍA LGI</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  LIVE
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">{language === 'es' ? 'Generación Solar:' : 'Solar Output:'}</span>
                  <span className="text-white font-black text-sm">{instantKw}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">{language === 'es' ? 'Dependencia Red:' : 'Grid Reliance:'}</span>
                  <span className="text-emerald-400 font-bold">{gridDependency}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">{language === 'es' ? 'Ahorro Tarifa:' : 'Bill Savings:'}</span>
                  <span className="text-amber-300 font-bold">{savings}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2 text-center text-[10px]">
                <div className="p-2 rounded-xl bg-white/5">
                  <span className="text-slate-400 block">{metricLabel1}</span>
                  <span className="text-white font-bold text-xs">{metricVal1}</span>
                </div>
                <div className="p-2 rounded-xl bg-white/5">
                  <span className="text-slate-400 block">{metricLabel2}</span>
                  <span className="text-white font-bold text-xs">{metricVal2}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Narrative Card */}
          <div className="pb-6 sm:pb-16 max-w-2xl space-y-2 sm:space-y-3 pointer-events-none bg-gradient-to-t from-[#050508]/95 via-[#050508]/75 to-transparent p-4 -mx-4 rounded-3xl sm:bg-none sm:p-0 sm:mx-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/50 text-rose-300 text-[11px] sm:text-xs font-mono uppercase tracking-wider shadow-lg shadow-rose-950/50">
              <Sun className="w-3.5 h-3.5 text-[#ff1e42]" />
              <span>{badge}</span>
            </div>

            <h2 className="text-xl sm:text-5xl font-black text-white tracking-tight leading-snug sm:leading-tight drop-shadow-lg">
              {title}
            </h2>

            <p className="text-xs sm:text-base text-slate-200 leading-relaxed font-sans max-w-xl drop-shadow-md line-clamp-3 sm:line-clamp-none">
              {desc}
            </p>

            {playbackMode === 'scroll' && (
              <div className="pt-1 flex items-center gap-1.5 text-[11px] sm:text-xs font-mono text-rose-400 animate-pulse">
                <ArrowDown className="w-3.5 h-3.5" />
                <span>{language === 'es' ? 'Desliza con tu dedo para rotar el modelo en 3D' : 'Swipe up/down to rotate 3D view'}</span>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

export default function CinematicShowcase() {
  const { language } = useLanguage();

  return (
    <section className="relative">
      
      {/* CAPÍTULO 1: VILLA RESIDENCIAL */}
      <CinematicChapter
        id="solar-residencial"
        badge={language === 'es' ? 'Capítulo 01 • Residencial & Fincas' : 'Chapter 01 • Residential & Estates'}
        title={language === 'es' ? 'Climatización y Confort Total sin Preocuparse por la Factura' : 'Zero-Grid Climate Luxury with 100% Rooftop Solar'}
        subtitle="Autoconsumo Fotovoltaico con Baterías LiFePO4"
        desc={language === 'es'
          ? 'Arquitectura fotovoltaica con silicio monocristalino bifacial de alta eficiencia. Diseñada para mantener aires acondicionados, sistemas de bombeo y domótica encendidos las 24 horas del día con costo de energía en cero.'
          : 'Engineered rooftop solar array with bifacial monocrystalline silicon. Keeps multi-zone HVAC, water pumps, and smart home automation operating 24/7 with zero utility bills.'}
        videoSrc="/videos/solar/solar-villa.mp4"
        sequenceFolder="solar-villa"
        instantKw="12.8 kW"
        gridDependency="0.0 kW (Autónomo)"
        savings="92% Tarifa"
        metricLabel1={language === 'es' ? 'Tecnología' : 'Technology'}
        metricVal1="Bifacial N-Type"
        metricLabel2={language === 'es' ? 'Retorno' : 'Payback'}
        metricVal2="3.2 Años"
        accentColor="#ff1e42"
      />

      {/* TRANSICIÓN EDITORIAL ENTRE CAPÍTULOS */}
      <div className="py-16 sm:py-20 px-6 bg-gradient-to-b from-[#050508] via-[#090a10] to-[#050508] border-y border-white/5 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#ff1e42]">
            {language === 'es' ? 'Capítulo 02 a Continuación' : 'Chapter 02 Below'}
          </span>
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
            {language === 'es' ? 'De la Residencia de Lujo a la Continuidad Industrial' : 'From Luxury Living to Industrial Zero-Downtime'}
          </h3>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            {language === 'es'
              ? 'Desliza hacia abajo para presenciar la resiliencia energética ante un apagón en la red pública.'
              : 'Continue scrolling to experience commercial blackout resilience in action.'}
          </p>
          <div className="flex justify-center pt-2">
            <div className="w-8 h-8 rounded-full border border-rose-500/30 flex items-center justify-center text-rose-400 animate-bounce">
              <ArrowDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* CAPÍTULO 2: BODEGA INDUSTRIAL EN APAGÓN */}
      <CinematicChapter
        id="solar-industrial"
        badge={language === 'es' ? 'Capítulo 02 • Comercial & Bodegas' : 'Chapter 02 • Industrial & Logistics'}
        title={language === 'es' ? 'Cero Apagones: Su Cadena de Operación Nunca se Detiene' : 'Zero Downtime: Continuous Power When the Grid Fails'}
        subtitle="Plantas Solares Híbridas con Microred Industrial"
        desc={language === 'es'
          ? 'Transferencia automática de potencia en menos de 10 milisegundos ante caídas de la red pública. Proteja maquinaria de manufactura, cuartos fríos, centros de cómputo y logística sin pérdidas financieras por corte eléctrico.'
          : 'Industrial-grade rooftop solar arrays featuring <10ms microgrid transfer. Protect assembly lines, cold storage, and compute nodes against municipal blackouts with guaranteed business continuity.'}
        videoSrc="/videos/solar/solar-warehouse.mp4"
        sequenceFolder="solar-warehouse"
        instantKw="148.6 kW"
        gridDependency="0.0 kW (Autónomo)"
        savings="88% Tarifa"
        metricLabel1={language === 'es' ? 'Transferencia' : 'Transfer'}
        metricVal1="< 10ms"
        metricLabel2={language === 'es' ? 'Respaldo' : 'Backup'}
        metricVal2="100% Carga"
        accentColor="#ff1e42"
      />

    </section>
  );
}
