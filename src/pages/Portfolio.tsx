import React, { Suspense, useState, useEffect, useRef } from 'react';
import CyberBackground from '../components/ui/CyberBackground';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import EcosystemSection from '../components/EcosystemSection';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import WhatsAppButton from '../components/WhatsAppButton';
import { useLanguage } from '../context/LanguageContext';
import { lazyWithRetry } from '../utils/lazyWithRetry';
import { Box, Sparkles } from 'lucide-react';

// Viewport-deferred lazy load for heavy 3D WebGL Three.js simulator
const InteractiveSection = lazyWithRetry(() => import('../components/InteractiveSection'));

function InteractiveSectionFallback() {
  return (
    <div className="py-24 px-6 md:px-12 lg:px-24 bg-[#0a0a0e] text-center flex flex-col items-center justify-center min-h-[350px]">
      <div className="w-8 h-8 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin mb-4" />
      <p className="text-xs font-mono text-zinc-400 tracking-wider uppercase">Iniciando Motor 3D WebGL (Three.js)...</p>
    </div>
  );
}

export default function Portfolio() {
  const { language } = useLanguage();
  const [load3DLab, setLoad3DLab] = useState(false);
  const labRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (load3DLab) return;

    // Stream 3D module on-demand when scrolling within 400px of the 3D lab
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoad3DLab(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' }
    );

    if (labRef.current) {
      observer.observe(labRef.current);
    }

    return () => observer.disconnect();
  }, [load3DLab]);

  return (
    <div className="min-h-screen text-text-light font-sans selection:bg-white/20 selection:text-white relative bg-[#0d0d11] overflow-x-clip">
      {/* Deep Atmospheric Cyber Background */}
      <CyberBackground />

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <EcosystemSection />
        <Projects />
        <Skills />

        {/* 3D WebGL Lab: Viewport-deferred on-demand loading (0 bytes Three.js on initial load) */}
        <div ref={labRef} id="laboratorio-3d" className="relative">
          {load3DLab ? (
            <Suspense fallback={<InteractiveSectionFallback />}>
              <InteractiveSection />
            </Suspense>
          ) : (
            <div className="py-20 px-6 md:px-12 lg:px-24 bg-[#0a0a0e] text-center border-t border-white/5 flex flex-col items-center justify-center min-h-[260px]">
              <div className="max-w-xl mx-auto space-y-4">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium uppercase tracking-wider bg-white/[0.04] text-cyan-300 border border-cyan-500/20">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  WebGL & Three.js
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  {language === 'es' ? 'Laboratorio 3D & Simulación Estructural' : '3D Structural Simulation Lab'}
                </h3>
                <p className="text-xs md:text-sm text-zinc-400 font-mono">
                  {language === 'es' ? 'Gemelos digitales y modelos interactivos CIMOC UniAndes.' : 'Digital twins & CIMOC UniAndes interactive models.'}
                </p>
                <button
                  onClick={() => setLoad3DLab(true)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500 text-cyan-300 hover:text-zinc-950 border border-cyan-500/30 font-semibold text-xs transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.15)] min-h-[44px]"
                >
                  <Box size={16} />
                  <span>{language === 'es' ? 'Explorar Modelos 3D en Vivo' : 'Load Live 3D Models'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <Contact />
      </main>
      
      <footer className="relative z-10 py-10 border-t border-white/5 text-center text-sm text-zinc-400 font-mono bg-[#09090d]/80 backdrop-blur-md">
        <p>
          &copy; {new Date().getFullYear()} Luis Carlos Galvan · LGI Engineering & AI Technologies. {language === 'es' ? 'Diseñado con rigor y código.' : 'Built with engineering rigor & code.'}
        </p>
        <p className="text-xs text-zinc-500 mt-2">
          {language === 'es' 
            ? 'Doble Titulación Universidad de los Andes (Ing. Civil & Ing. de Sistemas)' 
            : 'Double Degree Universidad de los Andes (Civil & Systems Engineering)'}
        </p>
      </footer>
      
      <WhatsAppButton />
    </div>
  );
}
