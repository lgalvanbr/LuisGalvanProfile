import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';
import { 
  Sun, 
  BatteryCharging, 
  Zap, 
  Play, 
  Pause, 
  Maximize2, 
  RotateCcw, 
  CheckCircle2, 
  Building2, 
  Home, 
  Sliders,
  ShieldAlert,
  ArrowDown
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface ChapterProps {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  desc: string;
  videoSrc: string;
  posterSrc?: string;
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
  subtitle,
  desc,
  videoSrc,
  instantKw,
  gridDependency,
  savings,
  metricLabel1,
  metricVal1,
  metricLabel2,
  metricVal2,
  accentColor,
}: ChapterProps) {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [playbackMode, setPlaybackMode] = useState<'scroll' | 'play'>('play');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    mass: 0.4,
  });

  // Handle scroll-based scrubbing when in scroll mode
  useEffect(() => {
    const video = videoRef.current;
    if (!video || playbackMode !== 'scroll') return;

    const unsubscribe = smoothProgress.on('change', (progress) => {
      if (video.duration && !isNaN(video.duration)) {
        // Direct GPU scrubbing
        video.currentTime = Math.min(video.duration - 0.05, Math.max(0, progress * video.duration));
      }
    });

    return () => unsubscribe();
  }, [smoothProgress, playbackMode]);

  // Handle play/pause mode
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      setPlaybackMode('play');
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const setMode = (mode: 'scroll' | 'play') => {
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

  // Autoplay initially in loop for vivid Apple keynote feel
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.onloadeddata = () => {
      setIsVideoReady(true);
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    };
  }, []);

  return (
    <div id={id} ref={containerRef} className="relative h-[220vh] sm:h-[250vh] bg-[#050508] text-white">
      {/* Sticky Fullscreen High-Definition Viewport */}
      <div className="sticky top-0 h-[100dvh] w-full flex items-center justify-center overflow-hidden">
        
        {/* Native Hardware-Accelerated 1080p Video */}
        <video
          ref={videoRef}
          src={videoSrc}
          playsInline
          muted
          loop
          preload="auto"
          className="w-full h-full object-cover"
          style={{ filter: 'contrast(1.03) brightness(0.98)' }}
        />

        {/* Ambient Dark Tech Gradients */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#050508] via-transparent to-[#050508]/80" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#050508]/70 via-transparent to-[#050508]/70" />

        {/* Floating Top Bar: Mode Switcher & Playback Control */}
        <div className="absolute top-20 sm:top-24 left-3 right-3 sm:left-6 sm:right-6 flex items-center justify-between z-30 pointer-events-auto">
          
          {/* Mode Switcher */}
          <div className="inline-flex p-1 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/15 shadow-2xl">
            <button
              onClick={() => setMode('play')}
              className={`min-h-[44px] px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
                playbackMode === 'play'
                  ? 'bg-gradient-to-r from-[#ff1e42] to-rose-600 text-white shadow-lg shadow-rose-950/60'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-300" /> : <Play className="w-3.5 h-3.5 text-emerald-300" />}
              <span>{language === 'es' ? 'Auto-Play' : 'Auto-Play'}</span>
              <span className="hidden sm:inline">1080p</span>
            </button>

            <button
              onClick={() => setMode('scroll')}
              className={`min-h-[44px] px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
                playbackMode === 'scroll'
                  ? 'bg-gradient-to-r from-[#ff1e42] to-rose-600 text-white shadow-lg shadow-rose-950/60'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Scroll 3D' : 'Scroll Scrub'}</span>
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
          <div className="pt-36 sm:hidden flex justify-center w-full">
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
          <div className="pt-24 sm:pt-20 hidden sm:flex justify-end">
            <div className="bg-black/75 backdrop-blur-2xl border border-white/15 rounded-3xl p-5 sm:p-6 max-w-xs w-full shadow-2xl space-y-4 font-mono">
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
          <div className="pb-6 sm:pb-16 max-w-2xl space-y-2 sm:space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/50 text-rose-300 text-[11px] sm:text-xs font-mono uppercase tracking-wider shadow-lg shadow-rose-950/50">
              <Sun className="w-3.5 h-3.5 text-[#ff1e42]" />
              <span>{badge}</span>
            </div>

            <h2 className="text-2xl sm:text-5xl font-black text-white tracking-tight leading-snug sm:leading-tight drop-shadow-lg">
              {title}
            </h2>

            <p className="text-xs sm:text-base text-slate-200 leading-relaxed font-sans max-w-xl drop-shadow-md line-clamp-3 sm:line-clamp-none">
              {desc}
            </p>

            {playbackMode === 'scroll' && (
              <div className="pt-1 flex items-center gap-1.5 text-[11px] sm:text-xs font-mono text-rose-400 animate-pulse">
                <ArrowDown className="w-3.5 h-3.5" />
                <span>{language === 'es' ? 'Desliza para avanzar o retroceder el video' : 'Scroll down or up to scrub the 1080p frame'}</span>
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
      <div className="py-20 px-6 bg-gradient-to-b from-[#050508] via-[#090a10] to-[#050508] border-y border-white/5 text-center relative z-10">
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
