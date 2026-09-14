import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Globe, 
  ChevronDown, 
  Building2, 
  Bot, 
  Sun, 
  Radio,
  User, 
  ExternalLink,
  ArrowRight,
  Layers,
  Github
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import logoImg from '../assets/logo.jpeg';

const springSnappy = {
  type: "spring" as const,
  stiffness: 450,
  damping: 28,
};

const springGentle = {
  type: "spring" as const,
  stiffness: 220,
  damping: 24,
  mass: 0.8,
};

export default function HubNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHubOpen, setIsHubOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const hubDropdownRef = useRef<HTMLDivElement>(null);
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside to close Hub dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (hubDropdownRef.current && !hubDropdownRef.current.contains(event.target as Node)) {
        setIsHubOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Escape key to close menus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsHubOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Determine current active section links
  const isIaPage = location.pathname === '/ia' || location.pathname === '/ai';
  const isLgiPage = location.pathname === '/lgi';
  const isSolarPage = location.pathname === '/solar';
  const isPortfolio = location.pathname === '/';

  const contextualNavLinks = isIaPage
    ? [
        { name: language === 'es' ? 'Servicios' : 'Services', href: '#servicios' },
        { name: language === 'es' ? 'Calculadora ROI' : 'ROI Calculator', href: '#calculadora' },
        { name: language === 'es' ? 'Agendar' : 'Schedule', href: '#agendar' },
        { name: language === 'es' ? 'Cotizar' : 'Quote', href: '#cotizar' },
      ]
    : isSolarPage
    ? [
        { name: language === 'es' ? 'Ingeniería' : 'Engineering', href: '#ingenieria-solar' },
        { name: language === 'es' ? 'Calculadora Solar' : 'Solar Calculator', href: '#calculadora-solar' },
      ]
    : isLgiPage
    ? [
        { name: t('lgi.nav.services'), href: '#lgi-services' },
        { name: t('lgi.nav.about'), href: '#lgi-about' },
        { name: t('lgi.nav.contact'), href: '#lgi-contact' },
      ]
    : [
        { name: t('nav.about'), href: '#sobre-mi' },
        { name: t('nav.projects'), href: '#proyectos' },
        { name: t('nav.skills'), href: '#habilidades' },
        { name: t('nav.contact'), href: '#contacto' },
      ];

  const businessUnits = [
    {
      id: 'ia',
      name: 'LGI AI & Automatización',
      desc: language === 'es' ? 'Agentes autónomos, flujos n8n y software B2B' : 'Autonomous agents, n8n pipelines & B2B AI',
      icon: Bot,
      path: '/ia',
      badge: 'B2B Tech',
      active: isIaPage,
      isExternal: false,
    },
    {
      id: 'solar',
      name: 'LGI Solar',
      desc: language === 'es' ? 'Energía fotovoltaica, dimensionamiento y baterías' : 'Solar PV, sizing & LiFePO4 battery storage',
      icon: Sun,
      path: '/solar',
      badge: 'Clean Tech',
      active: isSolarPage,
      isExternal: false,
    },
    {
      id: 'engineering',
      name: 'LGI Ingeniería',
      desc: language === 'es' ? 'Infraestructura, gemelos digitales y peritaje civil' : 'Infrastructure, digital twins & structural forensic',
      icon: Building2,
      path: '/lgi',
      badge: 'Civil & Tech',
      active: isLgiPage,
      isExternal: false,
    },
    {
      id: 'iot',
      name: 'LGI IoT & Sensores',
      desc: language === 'es' ? 'Telemetría estructural, acelerómetros y alerta sísmica' : 'Structural telemetry, accelerometers & seismic alert',
      icon: Radio,
      path: '#iot',
      badge: 'IoT Hardware',
      active: false,
      isExternal: false,
      isUpcoming: true,
    },
    {
      id: 'solar',
      name: 'LGI Solar',
      desc: language === 'es' ? 'Energía fotovoltaica y dimensionamiento inteligente' : 'Photovoltaic energy & smart sizing',
      icon: Sun,
      path: '#solar',
      badge: language === 'es' ? 'Próximamente' : 'Coming Soon',
      active: false,
      isExternal: false,
      isUpcoming: true,
    },
    {
      id: 'portfolio',
      name: 'Luis Galvan (Perfil & I+D)',
      desc: language === 'es' ? 'Trayectoria profesional, investigación y portafolio' : 'Career profile, research & engineering code',
      icon: User,
      path: '/',
      badge: 'Portfolio',
      active: isPortfolio,
      isExternal: false,
    },
  ];

  const vercelDeployments = [
    {
      name: 'CIAM Lab',
      desc: language === 'es' ? 'Gemelo Digital 8K Metro Bogotá' : '8K Digital Twin Metro Bogotá',
      url: 'https://ciam-lab.vercel.app',
      tag: 'WebGL'
    },
    {
      name: 'InspectorEstructural',
      desc: language === 'es' ? 'Triaje Post-Sismo & Algoritmo IPT' : 'Post-Earthquake Triage & IPT',
      url: 'https://inspector-estructural.vercel.app',
      tag: 'GIS / FEMA'
    },
    {
      name: 'ciamAR',
      desc: language === 'es' ? 'WebAR Holográfico 1:1 en Obra' : '1:1 In-Situ WebAR Viewer',
      url: 'https://ciam-ar.vercel.app',
      tag: 'WebXR'
    },
    {
      name: 'InterventorIA',
      desc: language === 'es' ? 'Supervisión Obras & Consorcio Usaquén' : 'Site Oversight & Inspection',
      url: 'https://interventor-ia.vercel.app',
      tag: 'Oversight'
    },
    {
      name: 'RobleCaribe Analytics',
      desc: language === 'es' ? 'Telemetría & Analítica de Combustible' : 'Fuel Telemetry & Sales AI',
      url: 'https://eds-roble-caribe-jij7.vercel.app',
      tag: 'Analytics'
    },
    {
      name: 'UniAndes IAStudio',
      desc: language === 'es' ? 'Entorno Creativo Asistido por IA' : 'AI-Assisted Design Studio',
      url: 'https://ui-ux-hia.vercel.app',
      tag: 'GenAI'
    },
    {
      name: 'Simulador de Autómatas',
      desc: language === 'es' ? 'DFA/NFA & Gramáticas Formales' : 'Finite Automata Simulator',
      url: 'https://lenguajes-y-maquinas.vercel.app',
      tag: 'CompSci'
    },
  ];

  return (
    <motion.header
      initial={shouldReduceMotion ? { opacity: 0 } : { y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={springGentle}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0b0b0e]/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-lg shadow-black/40' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Left: Brand Logo & Hub Switcher Trigger */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-white group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-lg p-1"
            aria-label="Ir a inicio de Luis Galvan y LGI"
          >
            <img src={logoImg} alt="LGI Logo" className="h-8 w-auto rounded-md shadow-sm border border-white/10" />
            <span className="font-mono font-bold text-lg tracking-tight hidden sm:inline-block">
              Luis Galvan <span className="text-zinc-400 font-light">| LGI</span>
            </span>
          </Link>

          {/* Business Unit Switcher (Dropdown Desktop) */}
          <div className="relative" ref={hubDropdownRef}>
            <button
              onClick={() => setIsHubOpen(!isHubOpen)}
              aria-expanded={isHubOpen}
              aria-haspopup="true"
              aria-label="Seleccionar unidad de negocio o ver despliegues en vivo"
              className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium inline-flex items-center gap-2 border transition-all focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none ${
                isHubOpen 
                  ? 'bg-zinc-800 border-white/30 text-white' 
                  : 'bg-zinc-900/80 hover:bg-zinc-800 border-zinc-700/60 text-zinc-200'
              }`}
            >
              <Layers className="w-4 h-4 text-zinc-300" aria-hidden="true" />
              <span className="font-medium hidden md:inline">
                {isIaPage 
                  ? (language === 'es' ? 'LGI AI & Automatización' : 'LGI AI & Automation')
                  : isSolarPage
                    ? 'LGI Solar'
                    : isLgiPage 
                      ? 'LGI Ingeniería' 
                      : (language === 'es' ? 'Ecosistema & Apps' : 'Ecosystem & Apps')}
              </span>
              <span className="font-medium md:hidden">{language === 'es' ? 'Ecosistema' : 'Ecosystem'}</span>
              <ChevronDown 
                className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${isHubOpen ? 'rotate-180 text-white' : ''}`} 
                aria-hidden="true" 
              />
            </button>

            {/* Dropdown Menu Desktop */}
            <AnimatePresence>
              {isHubOpen && (
                <motion.div
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.98 }}
                  transition={springGentle}
                  className="absolute left-0 mt-2 w-80 sm:w-[420px] rounded-2xl bg-[#121217] border border-white/15 p-3 shadow-2xl backdrop-blur-2xl z-50 max-h-[85vh] overflow-y-auto"
                  role="menu"
                >
                  <div className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-zinc-400 border-b border-white/10 mb-2">
                    {language === 'es' ? 'Unidades de Negocio & Portales' : 'Business Units & Portals'}
                  </div>

                  <div className="space-y-1">
                    {businessUnits.map((unit) => {
                      const IconComponent = unit.icon;
                      return (
                        <div key={unit.id} className="relative">
                          {unit.isUpcoming ? (
                            <div className="p-2.5 rounded-xl bg-zinc-900/40 border border-zinc-800/60 flex items-center justify-between opacity-60 cursor-not-allowed">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400">
                                  <IconComponent className="w-4 h-4" aria-hidden="true" />
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-zinc-300">{unit.name}</div>
                                  <div className="text-xs text-zinc-500">{unit.desc}</div>
                                </div>
                              </div>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                                {unit.badge}
                              </span>
                            </div>
                          ) : (
                            <Link
                              to={unit.path}
                              role="menuitem"
                              onClick={() => setIsHubOpen(false)}
                              className={`min-h-[44px] p-2.5 rounded-xl flex items-center justify-between transition-all group ${
                                unit.active 
                                  ? 'bg-zinc-800 border border-white/20 text-white' 
                                  : 'hover:bg-zinc-800/60 text-zinc-300 hover:text-white'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                                  unit.active 
                                    ? 'bg-white text-black font-bold' 
                                    : 'bg-zinc-800 text-zinc-300 group-hover:text-white'
                                }`}>
                                  <IconComponent className="w-4 h-4" aria-hidden="true" />
                                </div>
                                <div>
                                  <div className="text-sm font-semibold flex items-center gap-1.5">
                                    <span>{unit.name}</span>
                                    {unit.active && (
                                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                    )}
                                  </div>
                                  <div className="text-xs text-zinc-400">{unit.desc}</div>
                                </div>
                              </div>
                              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                                unit.active
                                  ? 'bg-zinc-800 text-white border-white/30'
                                  : 'bg-zinc-900 text-zinc-400 border-zinc-700'
                              }`}>
                                {unit.badge}
                              </span>
                            </Link>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Sección de Despliegues en Vivo en Vercel */}
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <div className="px-3 py-1 text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center justify-between mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{language === 'es' ? 'Apps en Vivo (Vercel)' : 'Live Deployments (Vercel)'}</span>
                      </span>
                      <span className="text-[10px] text-zinc-500">
                        {vercelDeployments.length} {language === 'es' ? 'activas' : 'active'}
                      </span>
                    </div>

                    <div className="space-y-1">
                      {vercelDeployments.map((app, idx) => (
                        <a
                          key={idx}
                          href={app.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="min-h-[42px] px-3 py-2 rounded-xl flex items-center justify-between text-xs text-zinc-300 hover:text-white hover:bg-zinc-800/80 transition-all border border-transparent hover:border-white/10 group"
                        >
                          <div className="flex flex-col">
                            <span className="font-semibold text-zinc-200 group-hover:text-white flex items-center gap-1.5">
                              {app.name}
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 font-mono">
                                {app.tag}
                              </span>
                            </span>
                            <span className="text-[11px] text-zinc-400">{app.desc}</span>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white shrink-0 ml-2" aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Center: Contextual In-Page Anchor Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Navegación contextual de la página">
          {contextualNavLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative group py-1"
            >
              {link.name}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
            </a>
          ))}
          {/* Quick link to Vercel section in projects (handles cross-page navigation) */}
          <a
            href={isPortfolio ? "#proyectos" : "/#proyectos"}
            className="text-xs font-mono text-zinc-300 hover:text-white px-2.5 py-1 rounded-full border border-white/15 hover:border-white/40 flex items-center gap-1.5 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Vercel Apps</span>
          </a>
        </nav>

        {/* Right: GitHub, Language Switcher & Quick CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://github.com/lgalvanbr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Perfil de GitHub @lgalvanbr"
            className="min-h-[44px] min-w-[44px] px-3.5 py-1.5 rounded-full border border-zinc-700 hover:border-white/40 text-xs font-mono text-zinc-300 hover:text-white transition-all flex items-center gap-1.5"
          >
            <Github className="w-3.5 h-3.5 text-zinc-400" aria-hidden="true" />
            <span className="hidden md:inline">lgalvanbr</span>
          </a>

          <button
            onClick={toggleLanguage}
            aria-label={language === 'es' ? 'Cambiar idioma a Inglés' : 'Switch language to Spanish'}
            className="min-h-[44px] px-3.5 py-1.5 rounded-full border border-zinc-700 hover:border-white/40 text-xs font-mono text-zinc-300 hover:text-white transition-all flex items-center gap-1.5"
          >
            <Globe className="w-3.5 h-3.5 text-zinc-400" aria-hidden="true" />
            <span>{language === 'es' ? 'EN' : 'ES'}</span>
          </button>

          <motion.a
            href={isIaPage ? "#agendar" : isLgiPage ? "#lgi-contact" : "#contacto"}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={springSnappy}
            className="min-h-[44px] px-5 py-2 rounded-xl bg-white text-black font-semibold text-xs sm:text-sm inline-flex items-center gap-2 shadow-sm hover:bg-zinc-200 transition-all focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
          >
            <span>{isIaPage ? (language === 'es' ? 'Agendar' : 'Book') : (language === 'es' ? 'Contactar' : 'Contact')}</span>
            <ArrowRight className="w-3.5 h-3.5 text-black" aria-hidden="true" />
          </motion.a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
            aria-expanded={isMobileMenuOpen}
            className="min-h-[44px] min-w-[44px] p-2 rounded-xl text-zinc-200 hover:text-white bg-zinc-900 border border-zinc-800 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-white/40"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={springGentle}
            className="lg:hidden bg-[#0e0e12] border-b border-white/10 px-6 py-5 overflow-hidden max-h-[85vh] overflow-y-auto"
          >
            <div className="space-y-4">
              
              {/* Unidades de Negocio Selector Mobile */}
              <div className="pb-3 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-2">
                  {language === 'es' ? 'Ecosistema de Unidades' : 'Business Units'}
                </span>
                <div className="grid grid-cols-1 gap-1.5">
                  {businessUnits.map((u) => {
                    const IconComp = u.icon;
                    if (u.isUpcoming) {
                      return (
                        <div
                          key={u.id}
                          className="min-h-[44px] p-2.5 rounded-xl flex items-center justify-between text-sm text-zinc-500 opacity-60"
                        >
                          <span className="flex items-center gap-2.5">
                            <IconComp className="w-4 h-4 text-zinc-500" aria-hidden="true" />
                            <span>{u.name}</span>
                          </span>
                          <span className="text-[10px] font-mono text-zinc-400">{u.badge}</span>
                        </div>
                      );
                    }
                    return (
                      <Link
                        key={u.id}
                        to={u.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`min-h-[44px] p-2.5 rounded-xl flex items-center justify-between text-sm ${
                          u.active ? 'bg-zinc-800 text-white border border-white/20' : 'text-zinc-300 hover:text-white'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <IconComp className="w-4 h-4 text-zinc-300" aria-hidden="true" />
                          <span>{u.name}</span>
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400">{u.badge}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Apps en Vivo Vercel Mobile */}
              <div className="pb-3 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{language === 'es' ? 'Apps en Vivo (Vercel)' : 'Live Deployments (Vercel)'}</span>
                </span>
                <div className="grid grid-cols-1 gap-1">
                  {vercelDeployments.map((app, idx) => (
                    <a
                      key={idx}
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] px-3 py-2 rounded-xl flex items-center justify-between text-xs text-zinc-300 hover:text-white bg-zinc-900/60 border border-zinc-800/80"
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold text-zinc-200">{app.name}</span>
                        <span className="text-[11px] text-zinc-400">{app.desc}</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-400 shrink-0 ml-2" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Enlaces de la página actual */}
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                  {language === 'es' ? 'En esta página' : 'On this page'}
                </span>
                {contextualNavLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="min-h-[44px] flex items-center text-sm font-medium text-zinc-300 hover:text-white"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* Controles inferiores Mobile */}
              <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <a
                  href="https://github.com/lgalvanbr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub de Luis Galvan"
                  className="min-h-[44px] px-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 flex items-center gap-2 hover:text-white"
                >
                  <Github className="w-4 h-4 text-zinc-400" aria-hidden="true" />
                  <span>GitHub</span>
                </a>

                <button
                  onClick={() => {
                    toggleLanguage();
                    setIsMobileMenuOpen(false);
                  }}
                  className="min-h-[44px] px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 flex items-center gap-2"
                >
                  <Globe className="w-4 h-4 text-zinc-400" aria-hidden="true" />
                  <span>{language === 'es' ? 'EN' : 'ES'}</span>
                </button>

                <a
                  href={isIaPage ? "#agendar" : isLgiPage ? "#lgi-contact" : "#contacto"}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="min-h-[44px] px-5 rounded-xl bg-white text-black font-semibold text-xs flex items-center justify-center shadow-sm"
                >
                  {isIaPage ? (language === 'es' ? 'Agendar' : 'Book') : (language === 'es' ? 'Contactar' : 'Contact')}
                </a>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
