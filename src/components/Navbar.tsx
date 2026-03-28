import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Menu, X, Globe, Building2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.about'), href: '#sobre-mi' },
    { name: t('nav.projects'), href: '#proyectos' },
    { name: t('nav.skills'), href: '#habilidades' },
    { name: t('nav.contact'), href: '#contacto' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark-bg/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#hero" className="text-xl font-bold font-mono text-white tracking-tighter">
          LC<span className="text-tech-blue">G</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-sm font-medium text-text-muted hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-tech-blue transition-all group-hover:w-full"></span>
            </a>
          ))}
          
          <div className="h-6 w-px bg-white/20 mx-2"></div>
          
          <Link 
            to="/lgi"
            className="flex items-center gap-2 text-sm font-medium text-tech-blue hover:text-blue-400 transition-colors"
          >
            <img src="/logo.jpeg" alt="LGI Logo" className="h-5 w-auto rounded-sm" />
            LGI Ingeniería
          </Link>

          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-sm font-mono text-text-muted hover:text-white transition-colors border border-white/10 px-3 py-1.5 rounded-full hover:border-tech-blue/50"
          >
            <Globe size={14} />
            {language === 'es' ? 'EN' : 'ES'}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-dark-surface border-b border-white/10"
        >
          <div className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium text-text-muted hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            <Link 
              to="/lgi"
              className="flex items-center gap-2 text-sm font-medium text-tech-blue hover:text-blue-400 transition-colors mt-4"
            >
              <img src="/logo.jpeg" alt="LGI Logo" className="h-5 w-auto rounded-sm" />
              LGI Ingeniería
            </Link>

            <button 
              onClick={() => {
                toggleLanguage();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-sm font-mono text-text-muted hover:text-white transition-colors mt-2"
            >
              <Globe size={16} />
              {language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
