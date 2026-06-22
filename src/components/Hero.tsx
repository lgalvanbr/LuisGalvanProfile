import { motion } from 'motion/react';
import { ChevronDown, Download, Briefcase } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; vx: number; vy: number }[] = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numParticles = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0, 123, 255, 0.5)';
      ctx.strokeStyle = 'rgba(0, 123, 255, 0.15)';

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-dark-bg">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 opacity-40"
      />
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 text-white">
            Luis Carlos Galvan
          </h1>
          <h2 className="text-xl md:text-2xl font-mono text-tech-blue mb-6">
            {t('hero.role')}
          </h2>
          <p className="text-lg md:text-xl text-text-muted mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="#proyectos"
              className="flex items-center gap-2 px-8 py-3 bg-tech-blue hover:bg-blue-600 text-white rounded-md font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,123,255,0.4)]"
            >
              <Briefcase size={20} />
              {t('hero.viewProjects')}
            </a>
            <a
              href="#contacto"
              className="flex items-center gap-2 px-8 py-3 bg-transparent border border-white/20 hover:border-tech-blue hover:text-tech-blue text-white rounded-md font-medium transition-all duration-300"
            >
              <Download size={20} />
              {t('hero.contactMe')}
            </a>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex items-center justify-center gap-4 opacity-60 hover:opacity-100 transition-opacity duration-300"
          >
            <img src="/uniandes.png" alt="Universidad de los Andes" className="h-12 object-contain filter grayscale hover:grayscale-0 transition-all duration-500" onError={(e) => e.currentTarget.style.display = 'none'} />
            <div className="text-left border-l border-white/20 pl-4">
              <p className="text-sm font-mono text-text-light">{t('hero.doubleDegree').split(' - ')[0]}</p>
              <p className="text-xs font-mono text-tech-blue">{t('hero.doubleDegree').split(' - ')[1]}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
}
