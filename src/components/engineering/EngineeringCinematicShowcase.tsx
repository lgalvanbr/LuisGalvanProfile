import React, { useRef, useState, useEffect } from 'react';
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

interface EngineeringChapterProps {
  id: string;
  badge: string;
  badgeIcon: React.ReactNode;
  title: string;
  desc: string;
  videoSrc: string;
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

  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackMode, setPlaybackMode] = useState<'play' | 'scroll'>('play');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    mass: 0.4,
  });

  // Handle scroll scrubbing
  useEffect(() => {
    const video = videoRef.current;
    if (!video || playbackMode !== 'scroll') return;

    const unsubscribe = smoothProgress.on('change', (progress) => {
      if (video.duration && !isNaN(video.duration)) {
        video.currentTime = Math.min(video.duration - 0.05, Math.max(0, progress * video.duration));
      }
    });

    return () => unsubscribe();
  }, [smoothProgress, playbackMode]);

  const setMode = (mode: 'play' | 'scroll') => {
    setPlaybackMode(mode);
    const video = videoRef.current;
    if (!video) return;

    if (mode === 'scroll') {
      video.pause();
      setIsPlaying(false);
      if (video.duration) {
        video.currentTime = scrollYProgress.get() * video.duration;
      }
    } else {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.onloadeddata = () => {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    };
  }, []);

  return (
    <div id={id} ref={containerRef} className="relative h-[220vh] sm:h-[240vh] bg-[#050508] text-white">
      {/* Sticky High-Definition Fullscreen Viewport */}
      <div className="sticky top-0 h-[100dvh] w-full flex items-center justify-center overflow-hidden">
        
        {/* GPU Hardware-Accelerated Native Video */}
        <video
          ref={videoRef}
          src={videoSrc}
          playsInline
          muted
          loop
          preload="auto"
          className="w-full h-full object-cover"
          style={{ filter: 'contrast(1.04) brightness(0.97)' }}
        />

        {/* Ambient Dark Tech Gradients */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#050508] via-transparent to-[#050508]/80" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#050508]/70 via-transparent to-[#050508]/70" />

        {/* Top Controls: Mode Switcher & Quality Tag */}
        <div className="absolute top-20 sm:top-24 left-3 right-3 sm:left-6 sm:right-6 flex items-center justify-between z-30 pointer-events-auto">
          <div className="inline-flex p-1 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/15 shadow-2xl">
            <button
              onClick={() => setMode('play')}
              className={`min-h-[44px] px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
                playbackMode === 'play'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-950/60'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-300" /> : <Play className="w-3.5 h-3.5 text-emerald-300" />}
              <span>{language === 'es' ? 'Auto-Play' : 'Auto-Play'}</span>
              <span className="hidden sm:inline">60FPS</span>
            </button>

            <button
              onClick={() => setMode('scroll')}
              className={`min-h-[44px] px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
                playbackMode === 'scroll'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-950/60'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Scroll 3D' : 'Scroll Scrub'}</span>
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
          <div className="pt-36 sm:hidden flex justify-center w-full">
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
          <div className="pt-24 sm:pt-20 hidden sm:flex justify-end">
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
          <div className="pb-6 sm:pb-16 max-w-2xl space-y-2 sm:space-y-3">
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
                <span>{language === 'es' ? 'Desliza para controlar el vuelo del dron' : 'Scroll down or up to scrub drone trajectory'}</span>
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
