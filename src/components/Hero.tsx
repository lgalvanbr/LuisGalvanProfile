import { motion } from 'motion/react';
import { ChevronDown, Briefcase, FileText, Bot, ArrowRight, Mail } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import VirtualCV from './VirtualCV';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { t, language } = useLanguage();
  const [isCVOpen, setIsCVOpen] = useState(false);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numParticles = Math.floor((canvas.width * canvas.height) / 14000);
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 1.5 + 1,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: null, y: null };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Partículas y líneas en blanco/plata sobrio (sin azules estridentes)
      const particleColor = 'rgba(255, 255, 255, 0.55)';
      const lineColor = 'rgba(255, 255, 255, 0.08)';
      const mouseLineColor = 'rgba(255, 255, 255, 0.18)';

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Dibujar partícula
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

        // Conexión sutil con el cursor del ratón si está cerca
        if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
          const mdx = p.x - mouseRef.current.x;
          const mdy = p.y - mouseRef.current.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 160) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.strokeStyle = mouseLineColor;
            ctx.lineWidth = 1 - mDist / 160;
            ctx.stroke();
          }
        }

        // Conectar con partículas cercanas
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.8 * (1 - dist / 140);
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
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0d0d11]">
      
      {/* Canvas interactivo de constelación de partículas en escala monocromática sobria */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 opacity-70 pointer-events-none"
      />

      {/* Sutil viñeta radial oscura para garantizar legibilidad óptima */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,#0d0d11_85%)] z-1" 
      />
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge sobrio institucional */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 mb-8 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>{language === 'es' ? 'Ingeniería Civil & de Sistemas · UniAndes' : 'Civil & Systems Engineering · UniAndes'}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4 text-white">
            Luis Carlos Galvan
          </h1>
          
          <h2 className="text-xl sm:text-2xl font-mono text-zinc-300 mb-6 font-normal tracking-wide">
            {t('hero.role')}
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed font-normal">
            {t('hero.subtitle')}
          </p>
          
          {/* Botonera sobria y ejecutiva sin degradados azules chillones */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14">
            
            {/* Botón primario: blanco de alto contraste */}
            <button
              onClick={() => setIsCVOpen(true)}
              className="w-full sm:w-auto min-h-[44px] flex items-center justify-center gap-2 px-7 py-3 bg-white text-zinc-950 hover:bg-zinc-200 rounded-lg font-semibold text-sm transition-all duration-200 shadow-[0_2px_15px_rgba(255,255,255,0.12)] cursor-pointer"
            >
              <FileText size={18} />
              <span>{t('hero.viewCv')}</span>
            </button>

            {/* Botón secundario: acceso a la nueva división de IA */}
            <Link
              to="/ia"
              className="w-full sm:w-auto min-h-[44px] flex items-center justify-center gap-2 px-6 py-3 bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-white/30 text-white rounded-lg font-medium text-sm transition-all duration-200"
            >
              <Bot size={18} className="text-zinc-300" />
              <span>{language === 'es' ? 'LGI AI & Automatización' : 'LGI AI & Automation'}</span>
              <ArrowRight size={15} className="text-zinc-400" />
            </Link>

            {/* Botón terciario: ver proyectos */}
            <a
              href="#proyectos"
              className="w-full sm:w-auto min-h-[44px] flex items-center justify-center gap-2 px-6 py-3 bg-transparent border border-white/10 hover:border-white/25 hover:bg-white/[0.03] text-zinc-300 hover:text-white rounded-lg font-medium text-sm transition-all duration-200"
            >
              <Briefcase size={18} />
              <span>{t('hero.viewProjects')}</span>
            </a>

            {/* Botón de contacto */}
            <a
              href="#contacto"
              className="w-full sm:w-auto min-h-[44px] flex items-center justify-center gap-2 px-6 py-3 bg-transparent border border-white/10 hover:border-white/25 hover:bg-white/[0.03] text-zinc-400 hover:text-zinc-200 rounded-lg font-medium text-sm transition-all duration-200"
            >
              <Mail size={18} />
              <span>{t('hero.contactMe')}</span>
            </a>

          </div>

          <VirtualCV isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />

          {/* Sello institucional UniAndes sobrio */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex items-center justify-center gap-4 opacity-70 hover:opacity-100 transition-opacity duration-300"
          >
            <img 
              src="/uniandes.png" 
              alt="Universidad de los Andes" 
              className="h-11 object-contain filter grayscale hover:grayscale-0 transition-all duration-500" 
              onError={(e) => e.currentTarget.style.display = 'none'} 
            />
            <div className="text-left border-l border-white/15 pl-4">
              <p className="text-sm font-mono text-zinc-200 font-medium">{t('hero.doubleDegree').split(' - ')[0]}</p>
              <p className="text-xs font-mono text-zinc-400">{t('hero.doubleDegree').split(' - ')[1]}</p>
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* Indicador de scroll inferior sobrio */}
      <motion.div 
        role="button"
        tabIndex={0}
        aria-label={language === 'es' ? 'Desplazarse a Sobre Mí' : 'Scroll to About'}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/20 rounded-full p-1"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        onClick={() => {
          document.getElementById('sobre-mi')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            document.getElementById('sobre-mi')?.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <ChevronDown size={28} />
      </motion.div>

    </section>
  );
}
