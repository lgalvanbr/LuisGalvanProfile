import { motion, useReducedMotion } from 'motion/react';

export default function CyberBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Base oscura sobria y profunda */}
      <div className="absolute inset-0 bg-[#0d0d11]" />

      {/* Trama sutil de precisión técnica monocromática */}
      <div 
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px), linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)`,
          backgroundSize: `48px 48px, 96px 96px, 96px 96px`,
          maskImage: `radial-gradient(ellipse 80% 60% at 50% 25%, black 40%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(ellipse 80% 60% at 50% 25%, black 40%, transparent 100%)`
        }}
      />

      {/* Luz ambiental monocromática neutra suave (sin tintes de azul estridente) */}
      <motion.div
        animate={shouldReduceMotion ? {} : {
          opacity: [0.08, 0.14, 0.08],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[550px] rounded-full bg-white/[0.04] blur-[160px]"
      />

      {/* Sutil halo lateral neutro en escala de grises */}
      <motion.div
        animate={shouldReduceMotion ? {} : {
          opacity: [0.04, 0.08, 0.04],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-white/[0.03] blur-[160px]"
      />

      {/* Línea divisoria superior sobria */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
