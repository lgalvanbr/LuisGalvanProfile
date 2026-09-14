import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useReducedMotion } from 'motion/react';
import { Sun, BatteryCharging, Zap, ShieldCheck, Play, Pause, RotateCcw, ArrowDown, Building2, Home } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const TOTAL_FRAMES = 120;

type SolarScene = 'villa' | 'warehouse';

interface SolarScrollytellerProps {
  onSceneChange?: (scene: SolarScene) => void;
}

export default function SolarScrollyteller({ onSceneChange }: SolarScrollytellerProps) {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeScene, setActiveScene] = useState<SolarScene>('villa');
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Scroll tracking across 350vh for cinematic silky scrolling
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.5,
  });

  const frameIndex = useTransform(smoothProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  // Preload sequence frames
  const loadSequence = useCallback((scene: SolarScene) => {
    setIsLoaded(false);
    setLoadProgress(0);
    const loadedImages: HTMLImageElement[] = [];
    let count = 0;
    const folder = scene === 'villa' ? 'solar-villa' : 'solar-warehouse';

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const padded = String(i).padStart(4, '0');
      img.src = `/sequences/${folder}/frame_${padded}.webp`;
      
      img.onload = () => {
        count++;
        setLoadProgress(Math.round((count / TOTAL_FRAMES) * 100));
        if (count === TOTAL_FRAMES) {
          setImages(loadedImages);
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        count++;
        if (count === TOTAL_FRAMES) {
          setImages(loadedImages);
          setIsLoaded(true);
        }
      };

      loadedImages.push(img);
    }
  }, []);

  useEffect(() => {
    loadSequence(activeScene);
    if (onSceneChange) onSceneChange(activeScene);
  }, [activeScene, loadSequence, onSceneChange]);

  // Render frame on Canvas
  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentIdx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.floor(index)));
    const img = images[currentIdx];
    if (!img || !img.complete) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Cover positioning
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
  }, [images]);

  // Sync scroll with frame
  useEffect(() => {
    if (!isLoaded || images.length === 0) return;

    // Draw initial frame
    renderFrame(0);

    const unsubscribe = frameIndex.on('change', (latest) => {
      renderFrame(latest);
    });

    return () => unsubscribe();
  }, [isLoaded, images, frameIndex, renderFrame]);

  // Auto-play animation feature
  useEffect(() => {
    if (!isPlaying || !isLoaded) return;
    let current = 0;
    const interval = setInterval(() => {
      current = (current + 1) % TOTAL_FRAMES;
      renderFrame(current);
    }, 1000 / 24);

    return () => clearInterval(interval);
  }, [isPlaying, isLoaded, renderFrame]);

  // Telemetry HUD overlay values based on scroll
  const kwGenerated = useTransform(smoothProgress, [0, 0.5, 1], [3.2, 12.8, 28.5]);
  const gridDependency = useTransform(smoothProgress, [0, 0.4, 0.8], [85, 20, 0]);

  return (
    <div ref={containerRef} className="relative h-[350vh] bg-[#050508] text-white">
      {/* Sticky Fullscreen Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Main 60FPS Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
          style={{ filter: 'contrast(1.04) brightness(0.98)' }}
        />

        {/* Ambient Gradient Overlays for Cinematic Depth */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#050508] via-transparent to-[#050508]/60" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#050508]/60 via-transparent to-[#050508]/60" />

        {/* Loading State Indicator */}
        <AnimatePresence>
          {!isLoaded && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#050508] flex flex-col items-center justify-center gap-4 z-40"
            >
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-rose-500/20 animate-ping" />
                <div className="w-12 h-12 rounded-full border-2 border-t-[#ff1e42] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                <Sun className="w-5 h-5 text-[#ff1e42]" />
              </div>
              <div className="text-center space-y-1">
                <span className="font-mono text-xs uppercase tracking-widest text-slate-300">
                  {language === 'es' ? 'Cargando Fotogramas Ultra HD...' : 'Buffering Ultra HD Frames...'}
                </span>
                <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden mx-auto">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#ff1e42] to-amber-400"
                    style={{ width: `${loadProgress}%` }}
                  />
                </div>
                <span className="font-mono text-[11px] text-slate-300">{loadProgress}%</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Top Controls: Scene Switcher & Play Toggle */}
        <div className="absolute top-24 left-6 right-6 flex items-center justify-between z-30 pointer-events-auto">
          {/* Scene Selector */}
          <div className="inline-flex p-1.5 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl">
            <button
              onClick={() => setActiveScene('villa')}
              className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeScene === 'villa'
                  ? 'bg-gradient-to-r from-[#ff1e42] to-rose-600 text-white shadow-lg shadow-rose-950/60'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Villa Residencial' : 'Residential Villa'}</span>
            </button>

            <button
              onClick={() => setActiveScene('warehouse')}
              className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeScene === 'warehouse'
                  ? 'bg-gradient-to-r from-[#ff1e42] to-rose-600 text-white shadow-lg shadow-rose-950/60'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Complejo Industrial' : 'Industrial Warehouse'}</span>
            </button>
          </div>

          {/* Autoplay toggle */}
          <div className="hidden sm:flex items-center gap-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-1.5 shadow-2xl">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono flex items-center gap-2 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title={isPlaying ? 'Pausar auto-reproducción' : 'Auto-reproducir secuencia'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{isPlaying ? (language === 'es' ? 'Pausar' : 'Pause') : (language === 'es' ? 'Auto-Play' : 'Auto-Play')}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Storytelling HUD Overlay based on Active Scene */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 sm:p-12 z-20">
          
          {/* Top Metric Telemetry Bar */}
          <div className="pt-24 sm:pt-20 flex justify-end">
            <div className="bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 max-w-xs w-full shadow-2xl space-y-3 font-mono">
              <div className="flex items-center justify-between text-xs text-slate-300 border-b border-white/10 pb-2">
                <span className="flex items-center gap-1.5 text-rose-400 font-semibold">
                  <Zap className="w-3.5 h-3.5" />
                  <span>TELEMETRÍA LGI SOLAR</span>
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-300">{language === 'es' ? 'Generación Instantánea:' : 'Current Output:'}</span>
                  <motion.span className="text-white font-bold">
                    {activeScene === 'villa' ? '12.4 kW' : '148.6 kW'}
                  </motion.span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-300">{language === 'es' ? 'Dependencia de Red:' : 'Grid Reliance:'}</span>
                  <span className="text-emerald-400 font-bold">0.0 kW (Autónomo)</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-300">{language === 'es' ? 'Ahorro Acumulado:' : 'Cost Savings:'}</span>
                  <span className="text-amber-300 font-bold">92% Tarifa</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Title & Narrative Hook */}
          <div className="pb-12 sm:pb-16 max-w-2xl">
            <AnimatePresence mode="wait">
              {activeScene === 'villa' ? (
                <motion.div
                  key="villa-narrative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-3"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/70 border border-rose-500/40 text-rose-300 text-xs font-mono uppercase tracking-wider">
                    <Sun className="w-3.5 h-3.5 text-[#ff1e42]" />
                    <span>LGI Solar Residencial & Casas Campestres</span>
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                    {language === 'es'
                      ? 'Climatización y Confort Total sin Preocuparse por la Factura'
                      : 'Zero-Grid Climate Luxury with 100% Rooftop Solar'}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-xl">
                    {language === 'es'
                      ? 'Desliza el scroll para explorar el render cinemático. Arquitectura fotovoltaica con silicio monocristalino bifacial y baterías de respaldo para encender aires acondicionados día y noche.'
                      : 'Scroll down to scrub the cinematic Apple-grade presentation. Engineered bifacial silicon with lithium battery storage keeping comfort at max 24/7.'}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="warehouse-narrative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-3"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/70 border border-rose-500/40 text-rose-300 text-xs font-mono uppercase tracking-wider">
                    <BatteryCharging className="w-3.5 h-3.5 text-[#ff1e42]" />
                    <span>LGI Solar Comercial & Bodegas Industriales</span>
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                    {language === 'es'
                      ? 'Cero Apagones: Su Cadena de Operación Nunca se Detiene'
                      : 'Zero Downtime: Continuous Power When the Grid Fails'}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-xl">
                    {language === 'es'
                      ? 'Plantas solares industriales con transferencia automática ultrarrápida (<10ms). Proteja maquinaria, cuartos fríos y servidores corporativos ante caídas de la red pública.'
                      : 'Industrial-grade rooftop solar arrays featuring <10ms microgrid transfer. Protect assembly lines, cold storage, and compute nodes against municipal blackouts.'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Scroll Down Pulse Prompt */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-xs font-mono text-slate-300 pointer-events-none"
        >
          <span>{language === 'es' ? 'Desplaza para controlar la cámara 3D' : 'Scroll to scrub 3D camera'}</span>
          <ArrowDown className="w-4 h-4 text-[#ff1e42]" />
        </motion.div>

      </div>
    </div>
  );
}
