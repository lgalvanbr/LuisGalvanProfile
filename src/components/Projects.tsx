import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { 
  Glasses, 
  Activity, 
  Cpu, 
  Sun, 
  Bot, 
  Layers, 
  Camera, 
  ExternalLink, 
  Github, 
  ShieldCheck, 
  Sparkles,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  X,
  Code2,
  Globe,
  BarChart3
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SpotlightCard from './ui/SpotlightCard';

const springGentle = {
  type: "spring" as const,
  stiffness: 220,
  damping: 24,
  mass: 0.8,
};

const springSnappy = {
  type: "spring" as const,
  stiffness: 450,
  damping: 28,
};

interface ProjectItem {
  id: string;
  category: 'all' | 'twins' | 'ai' | 'seismic' | 'robotics' | 'solar';
  categoryLabel: { es: string; en: string };
  title: { es: string; en: string };
  type: { es: string; en: string };
  statusBadge: { es: string; en: string };
  summary: { es: string; en: string };
  problem: { es: string; en: string };
  solution: { es: string; en: string };
  metrics: { es: string; en: string };
  stack: string[];
  spotlightColor: string;
  borderColor: string;
  icon: React.ReactNode;
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  isVercelLive?: boolean;
}

export default function Projects() {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);

  useEffect(() => {
    if (!activeProjectModal) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveProjectModal(null);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeProjectModal]);

  const categories = [
    { id: 'all', label: language === 'es' ? 'Todos' : 'All' },
    { id: 'twins', label: language === 'es' ? 'Gemelos Digitales & AR' : 'Digital Twins & AR' },
    { id: 'ai', label: language === 'es' ? 'IA & Analítica' : 'AI & Analytics' },
    { id: 'seismic', label: language === 'es' ? 'Ingeniería Sísmica & GIS' : 'Seismic & GIS' },
    { id: 'robotics', label: language === 'es' ? 'Ciencias de la Computación' : 'Computer Science' },
  ];

  const defaultSpotlight = 'rgba(255, 255, 255, 0.08)';
  const defaultBorder = 'rgba(255, 255, 255, 0.18)';

  const projects: ProjectItem[] = [
    {
      id: 'ciam-lab',
      category: 'twins',
      categoryLabel: { es: 'Gemelos Digitales & IA', en: 'Digital Twins & AI' },
      title: { 
        es: 'CIAM Lab — Gemelo Digital 8K para Infraestructura Crítica', 
        en: 'CIAM Lab — 8K Digital Twin for Critical Infrastructure' 
      },
      type: { es: 'Investigación CIMOC / Metro de Bogotá', en: 'CIMOC / Bogotá Metro Research' },
      statusBadge: { es: 'En Producción Vercel', en: 'Live on Vercel' },
      summary: {
        es: 'Ecosistema de gemelos digitales para la visualización inmersiva en tiempo real de infraestructura urbana y líneas de transporte masivo.',
        en: 'Digital twin ecosystem for real-time immersive visualization of urban infrastructure and mass transit networks.'
      },
      problem: {
        es: 'Los silos de datos entre sensores IoT, planos BIM y sistemas GIS gubernamentales impiden predecir fallas estructurales a tiempo.',
        en: 'Siloed IoT sensors, BIM blueprints, and municipal GIS APIs prevent early prediction of structural failures.'
      },
      solution: {
        es: 'Pipeline unificado en Three.js y WebGL con ingesta en tiempo real (<5ms), modelos 3D con texturas PBR y analítica predictiva asistida por IA.',
        en: 'Unified Three.js/WebGL pipeline with sub-5ms telemetry ingestion, high-fidelity PBR rendering, and AI-assisted predictive analytics.'
      },
      metrics: {
        es: 'Latencia < 5ms · Resolución 8K · Sincronización multi-sensor',
        en: '< 5ms Latency · 8K Resolution · Multi-Sensor Telemetry Sync'
      },
      stack: ['React 19', 'Three.js', 'WebGL', 'Google GenAI', 'Firebase Realtime', 'Tailwind CSS'],
      spotlightColor: defaultSpotlight,
      borderColor: defaultBorder,
      icon: <Glasses className="w-5 h-5 text-zinc-200" />,
      imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156a?q=80&w=1000&auto=format&fit=crop',
      liveUrl: 'https://ciam-lab.vercel.app',
      githubUrl: 'https://github.com/lgalvanbr/CiamLab',
      isVercelLive: true
    },
    {
      id: 'inspector-estructural',
      category: 'seismic',
      categoryLabel: { es: 'Ingeniería Sísmica & GIS', en: 'Seismic Engineering & GIS' },
      title: { 
        es: 'InspectorEstructural — Plataforma de Triaje Post-Sismo & Algoritmo IPT', 
        en: 'InspectorEstructural — Post-Earthquake Triage & IPT Algorithm' 
      },
      type: { es: 'Gestión de Riesgo / NSR-10 & FEMA', en: 'Disaster Risk / NSR-10 & FEMA' },
      statusBadge: { es: 'En Producción Vercel', en: 'Live on Vercel' },
      summary: {
        es: 'Sistema de triaje táctico que categoriza en segundos el daño estructural de edificaciones tras terremotos severos.',
        en: 'Tactical triage system evaluating and scoring post-earthquake building damage in seconds.'
      },
      problem: {
        es: 'Tras un sismo mayor, las brigadas tardan semanas en evaluar miles de inmuebles manualmente, arriesgando vidas por colapsos secundarios.',
        en: 'Following major tremors, manual building safety inspections take weeks, leaving citizens exposed to secondary collapses.'
      },
      solution: {
        es: 'Algoritmo de Índice de Peligrosidad Táctico (IPT) con geocodificación PostGIS, semáforo de habitabilidad (Verde/Amarillo/Rojo) y reportes con georreferenciación GPS.',
        en: 'Tactical Hazard Index (IPT) algorithm powered by PostGIS, automated habitability scoring, and GPS-tagged photo evidence.'
      },
      metrics: {
        es: 'Evaluación en < 15 segundos · Cumple NSR-10 / FEMA 154 · Despliegue en campo',
        en: '< 15s Assessment · NSR-10 / FEMA 154 Compliant · Field Ready'
      },
      stack: ['React', 'Supabase PostGIS', 'Vercel Serverless', 'MapLibre', 'OpenCV', 'TypeScript'],
      spotlightColor: defaultSpotlight,
      borderColor: defaultBorder,
      icon: <Activity className="w-5 h-5 text-zinc-200" />,
      imageUrl: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?q=80&w=1000&auto=format&fit=crop',
      liveUrl: 'https://inspector-estructural.vercel.app',
      githubUrl: 'https://github.com/lgalvanbr/InspectorEstructural',
      isVercelLive: true
    },
    {
      id: 'ciam-ar',
      category: 'twins',
      categoryLabel: { es: 'Realidad Aumentada 1:1', en: '1:1 Augmented Reality' },
      title: { 
        es: 'ciamAR — Inspección Holográfica de Estructuras en Obra', 
        en: 'ciamAR — Holographic In-Situ Structural Inspection' 
      },
      type: { es: 'WebXR / AEC Inmersivo', en: 'WebXR / Immersive AEC' },
      statusBadge: { es: 'En Producción Vercel', en: 'Live on Vercel' },
      summary: {
        es: 'Proyección en Realidad Aumentada de gemelos digitales estructurales directamente desde el navegador de cualquier teléfono o tablet.',
        en: 'Augmented reality projection of structural digital twins directly inside standard mobile web browsers without installing apps.'
      },
      problem: {
        es: 'Las aplicaciones nativas de AR para construcción son pesadas, costosas y requieren dispositivos especializados que los residentes de obra no portan.',
        en: 'Native AR construction software is heavy, expensive, and demands specialized headsets that field teams do not carry.'
      },
      solution: {
        es: 'Visualizador WebXR y @google/model-viewer con escala 1:1 en obra y 1:20 en escritorio, compresión Draco y raycasting métrico de fisuras.',
        en: 'WebXR and model-viewer pipeline with 1:1 jobsite scaling, Draco-compressed GLB meshes, and metric crack raycasting.'
      },
      metrics: {
        es: 'Cero descargas requeridas · Escala 1:1 milimétrica · Soporta Android & iOS',
        en: 'Zero App Installs · 1:1 Millimetric Scale · Android & iOS Universal'
      },
      stack: ['WebXR', '@google/model-viewer', 'Three.js', 'GLB Draco', 'JavaScript', 'Vite'],
      spotlightColor: defaultSpotlight,
      borderColor: defaultBorder,
      icon: <Glasses className="w-5 h-5 text-zinc-200" />,
      imageUrl: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=1000&auto=format&fit=crop',
      liveUrl: 'https://ciam-ar.vercel.app',
      githubUrl: 'https://github.com/lgalvanbr/ciamAR',
      isVercelLive: true
    },
    {
      id: 'interventor-ia',
      category: 'ai',
      categoryLabel: { es: 'IA & Supervisión de Obra', en: 'AI & Site Oversight' },
      title: { 
        es: 'InterventorIA — Supervisión de Obras & Consorcio Usaquén', 
        en: 'InterventorIA — Construction Oversight & Usaquén Consortium' 
      },
      type: { es: 'Interventoría Civil / INCOLTA SAS', en: 'Civil Inspection / INCOLTA SAS' },
      statusBadge: { es: 'En Producción Vercel', en: 'Live on Vercel' },
      summary: {
        es: 'Plataforma web para la gestión de actas, seguimiento financiero y control de avance de obra en tiempo real con IA.',
        en: 'Web platform for inspection records, financial tracking, and real-time site progress monitoring with AI.'
      },
      problem: {
        es: 'El seguimiento manual de bitácoras de obra genera retrasos en pagos y discrepancias de cantidades entre contratistas e interventoría.',
        en: 'Manual site logging creates payment bottlenecks and quantity discrepancies between contractors and inspectors.'
      },
      solution: {
        es: 'Dashboard interactivo con control de hitos, estimaciones de avance, trazabilidad documental y alertas de desvío presupuestal.',
        en: 'Interactive dashboard with milestone tracking, progress estimation, document traceability, and budget deviation alerts.'
      },
      metrics: {
        es: 'Control del 100% de actas · Reducción 40% en tiempos de revisión · Monitoreo continuo',
        en: '100% Records Audited · 40% Faster Review Time · Continuous Oversight'
      },
      stack: ['React', 'Vite', 'Tailwind CSS', 'Vercel', 'JavaScript'],
      spotlightColor: defaultSpotlight,
      borderColor: defaultBorder,
      icon: <ShieldCheck className="w-5 h-5 text-zinc-200" />,
      imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000&auto=format&fit=crop',
      liveUrl: 'https://interventor-ia.vercel.app',
      githubUrl: 'https://github.com/lgalvanbr/InterventorIA',
      isVercelLive: true
    },
    {
      id: 'ui-ux-hia',
      category: 'ai',
      categoryLabel: { es: 'IA Generativa & UI/UX', en: 'Generative AI & UI/UX' },
      title: { 
        es: 'UniAndes IAStudio — Entorno Creativo Asistido por IA', 
        en: 'UniAndes IAStudio — AI-Assisted Creative Studio' 
      },
      type: { es: 'Investigación HIA / UniAndes', en: 'HIA Research / UniAndes' },
      statusBadge: { es: 'En Producción Vercel', en: 'Live on Vercel' },
      summary: {
        es: 'Suite interactiva de herramientas de diseño y generación asistida por modelos de lenguaje y visión para la comunidad académica.',
        en: 'Interactive design suite leveraging vision and language models for academic and technical workflows.'
      },
      problem: {
        es: 'La integración de modelos de IA en flujos de diseño requiere interfaces accesibles que simplifiquen el prompt engineering.',
        en: 'Integrating AI models into design workflows demands accessible interfaces that abstract prompt engineering.'
      },
      solution: {
        es: 'Entorno web reactivo con catálogo de herramientas, generación de componentes y renderizado interactivo en tiempo real.',
        en: 'Reactive web studio with tooling catalogs, component generation, and real-time interactive rendering.'
      },
      metrics: {
        es: 'Despliegue serverless · Latencia reducida · Interfaz accesible',
        en: 'Serverless Deployment · Low Latency · Accessible UI'
      },
      stack: ['React', 'Vite', 'Tailwind CSS', 'Vercel'],
      spotlightColor: defaultSpotlight,
      borderColor: defaultBorder,
      icon: <Bot className="w-5 h-5 text-zinc-200" />,
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
      liveUrl: 'https://ui-ux-hia.vercel.app',
      githubUrl: 'https://github.com/lgalvanbr/UI_UX_HIA',
      isVercelLive: true
    },
    {
      id: 'roblecaribe-analytics',
      category: 'ai',
      categoryLabel: { es: 'Analítica de Operaciones & IA', en: 'Operations Analytics & AI' },
      title: { 
        es: 'RobleCaribe Analytics — Control de Ventas e Inteligencia IA', 
        en: 'RobleCaribe Analytics — Fuel Telemetry & AI Sales Intelligence' 
      },
      type: { es: 'Inteligencia de Negocios / EDS Roble Caribe', en: 'Business Intelligence / Roble Caribe Fuel Station' },
      statusBadge: { es: 'En Producción Vercel', en: 'Live on Vercel' },
      summary: {
        es: 'Plataforma interactiva de analítica avanzada, control de inventario de combustibles y toma de decisiones estratégicas basadas en IA.',
        en: 'Interactive advanced analytics platform for fuel inventory telemetry, sales control, and AI-assisted strategic decisions.'
      },
      problem: {
        es: 'La conciliación manual de galonaje, mermas por temperatura y turnos de surtidores genera fugas operativas y falta de visibilidad en tiempo real.',
        en: 'Manual fuel volume reconciliation, thermal shrinkages, and pump shift audits cause operational leaks and lack of real-time visibility.'
      },
      solution: {
        es: 'Dashboard analítico en tiempo real con monitoreo GIS de rutas, alertas de inventario crítico y algoritmos predictivos de demanda.',
        en: 'Real-time analytics dashboard with GIS routing, low-inventory alerts, and predictive fuel demand forecasting.'
      },
      metrics: {
        es: 'Control 100% de tanques · Analítica horaria · Conciliación en tiempo real',
        en: '100% Tank Level Control · Hourly Analytics · Real-Time Reconciliation'
      },
      stack: ['React', 'Vite', 'Leaflet GIS', 'Tailwind CSS', 'Vercel', 'TypeScript'],
      spotlightColor: defaultSpotlight,
      borderColor: defaultBorder,
      icon: <BarChart3 className="w-5 h-5 text-zinc-200" />,
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop',
      liveUrl: 'https://eds-roble-caribe-jij7.vercel.app',
      isVercelLive: true
    },
    {
      id: 'lenguajes-maquinas',
      category: 'robotics',
      categoryLabel: { es: 'Teoría de la Computación', en: 'Theory of Computation' },
      title: { 
        es: 'Simulador de Autómatas & Gramáticas Formales', 
        en: 'Automata & Formal Grammars Simulator' 
      },
      type: { es: 'Ciencias de la Computación / UniAndes', en: 'Computer Science / UniAndes' },
      statusBadge: { es: 'En Producción Vercel', en: 'Live on Vercel' },
      summary: {
        es: 'Herramienta interactiva para la simulación, conversión y análisis de autómatas finitos deterministas y no deterministas (DFA/NFA).',
        en: 'Interactive tool for simulating, converting, and analyzing finite automata (DFA/NFA) and formal grammars.'
      },
      problem: {
        es: 'Comprender la ejecución de cadenas en autómatas complejos y gramáticas libres de contexto resulta abstracto sin visualización gráfica paso a paso.',
        en: 'Understanding state transitions in complex automata is challenging without step-by-step graphical tracing.'
      },
      solution: {
        es: 'Visualizador interactivo con animación de estados, verificación de cadenas y renderizado formal de transiciones.',
        en: 'Interactive graph visualizer with state animation, string acceptance tracing, and transition diagrams.'
      },
      metrics: {
        es: 'Simulación paso a paso · Grafo interactivo · Verificación instantánea',
        en: 'Step-by-Step Simulation · Interactive Graph · Instant Verification'
      },
      stack: ['JavaScript', 'HTML5 Canvas', 'Vercel'],
      spotlightColor: defaultSpotlight,
      borderColor: defaultBorder,
      icon: <Cpu className="w-5 h-5 text-zinc-200" />,
      imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop',
      liveUrl: 'https://lenguajes-y-maquinas.vercel.app',
      githubUrl: 'https://github.com/lgalvanbr/Lenguajes-y-maquinas',
      isVercelLive: true
    }
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="proyectos" className="py-28 px-6 md:px-12 lg:px-24 relative overflow-hidden bg-[#0d0d11]">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={springGentle}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-zinc-300 text-xs font-mono uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-zinc-400" aria-hidden="true" />
            {language === 'es' ? 'Casos de Éxito & Aplicaciones en Producción' : 'Case Studies & Production Apps'}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            {language === 'es' ? 'Soluciones Reales de Alto Impacto' : 'Real High-Impact Engineering Solutions'}
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-normal">
            {language === 'es'
              ? 'Explora las plataformas activas en Vercel y proyectos de ingeniería: desde gemelos digitales 8K y supervisión de obras con IA hasta algoritmos sísmicos.'
              : 'Explore live Vercel deployments and applied engineering systems: from 8K digital twins and AI site oversight to seismic algorithms.'}
          </p>
        </motion.div>

        {/* Category Filter Tabs with layoutId */}
        <div className="flex justify-center mb-14 overflow-x-auto pb-4">
          <div 
            role="tablist"
            aria-label={language === 'es' ? 'Filtro de proyectos por categoría' : 'Filter projects by category'}
            className="inline-flex p-1.5 rounded-2xl bg-zinc-900/90 border border-white/10 relative gap-1 shadow-xl"
          >
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors relative z-10 whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                    isSelected ? 'text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="project-category-pill"
                      transition={springSnappy}
                      className="absolute inset-0 bg-white rounded-xl -z-10 shadow-md"
                    />
                  )}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={springGentle}
                className="h-full"
              >
                <SpotlightCard
                  spotlightColor={project.spotlightColor}
                  borderColor={project.borderColor}
                  className="p-5 sm:p-6 flex flex-col justify-between h-full group bg-[#13141a]/90 border-white/10 overflow-hidden"
                >
                  <div>
                    {/* Project Thumbnail Image with Subtle Gradient & Floating Badges */}
                    <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-5 border border-white/10 bg-zinc-950">
                      <img 
                        src={project.imageUrl} 
                        alt={project.title[language]} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 contrast-105 group-hover:brightness-100"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#13141a] via-black/20 to-transparent opacity-85 pointer-events-none" />
                      
                      {/* Floating Top Controls inside Image */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
                        <div className="p-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/15 text-white">
                          {project.icon}
                        </div>

                        {project.isVercelLive ? (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-black/70 backdrop-blur-md text-emerald-300 border border-emerald-500/40 shadow-sm">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                            </span>
                            <span>Vercel Live</span>
                          </div>
                        ) : (
                          <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full font-medium bg-black/70 backdrop-blur-md border border-white/15 text-zinc-200">
                            {project.statusBadge[language]}
                          </span>
                        )}
                      </div>

                      {/* Floating Category Tag at bottom of Image */}
                      <div className="absolute bottom-2.5 left-3 z-10 pointer-events-none">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-zinc-300 border border-white/10">
                          {project.categoryLabel[language]}
                        </span>
                      </div>
                    </div>

                    {/* Category & Title */}
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">
                      {project.type[language]}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-zinc-200 transition-colors leading-snug">
                      {project.title[language]}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-5 font-normal line-clamp-3">
                      {project.summary[language]}
                    </p>

                    {/* Metrics Banner */}
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-zinc-300 mb-5 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                      <span className="truncate">{project.metrics[language]}</span>
                    </div>
                  </div>

                  {/* Footer: Tech Stack & Action Buttons */}
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.stack.map((tech, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/[0.03] text-zinc-400 border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-2">
                      {/* Fila de accesos directos a Vercel y GitHub */}
                      <div className="flex items-center gap-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="min-h-[44px] flex-1 py-2.5 px-3.5 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_2px_12px_rgba(255,255,255,0.12)] transition-all cursor-pointer"
                          >
                            <Globe className="w-4 h-4" />
                            <span>{language === 'es' ? 'App en Vivo (Vercel)' : 'Live App (Vercel)'}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="min-h-[44px] px-3.5 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/15 text-zinc-200 hover:text-white font-medium text-xs sm:text-sm border border-white/15 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                            title={language === 'es' ? 'Ver Código en GitHub' : 'View Code on GitHub'}
                            aria-label="GitHub Repository"
                          >
                            <Github className="w-4 h-4" />
                            <span className="hidden sm:inline">Repo</span>
                          </a>
                        )}
                      </div>

                      {/* Botón secundario para ver la ficha técnica */}
                      <button
                        onClick={() => setActiveProjectModal(project)}
                        className="min-h-[44px] w-full py-2 px-4 rounded-xl bg-white/[0.04] hover:bg-white/10 text-zinc-300 hover:text-white font-medium text-xs sm:text-sm border border-white/10 transition-all flex items-center justify-center gap-2 group/btn cursor-pointer"
                      >
                        <span>{language === 'es' ? 'Ver Ficha Técnica & Arquitectura' : 'Technical Specs & Architecture'}</span>
                        <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Technical Detail Modal */}
      <AnimatePresence>
        {activeProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProjectModal(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={springGentle}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-project-title"
              className="relative w-full max-w-2xl bg-[#0f1015] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProjectModal(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 cursor-pointer"
                aria-label="Cerrar ventana"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto pr-2 space-y-6">
                
                {/* Modal Project Preview Image */}
                <div className="relative w-full aspect-[16/8] sm:aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 bg-zinc-950">
                  <img 
                    src={activeProjectModal.imageUrl} 
                    alt={activeProjectModal.title[language]} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1015] via-transparent to-transparent opacity-80 pointer-events-none" />
                </div>

                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono uppercase mb-3">
                    {activeProjectModal.categoryLabel[language]}
                  </div>
                  <h3 id="modal-project-title" className="text-2xl font-bold text-white">
                    {activeProjectModal.title[language]}
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 mt-1">
                    {activeProjectModal.type[language]} · {activeProjectModal.statusBadge[language]}
                  </p>
                </div>

                {/* Enlaces directos a Vercel y Repositorio GitHub en el modal */}
                <div className={`grid gap-3 ${activeProjectModal.githubUrl ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
                  {activeProjectModal.liveUrl && (
                    <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/15 flex flex-col justify-between gap-3">
                      <div>
                        <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold block">
                          ● {language === 'es' ? 'Despliegue en Producción Activo' : 'Live Production Deployment'}
                        </span>
                        <span className="text-xs font-mono text-zinc-400 break-all">
                          {activeProjectModal.liveUrl}
                        </span>
                      </div>
                      <a
                        href={activeProjectModal.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[40px] px-4 py-2 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer shrink-0"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>{language === 'es' ? 'Abrir en Vercel' : 'Open in Vercel'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}

                  {activeProjectModal.githubUrl && (
                    <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/15 flex flex-col justify-between gap-3">
                      <div>
                        <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold block">
                          ● {language === 'es' ? 'Repositorio de Código Abierto' : 'Open-Source Repository'}
                        </span>
                        <span className="text-xs font-mono text-zinc-400 break-all">
                          {activeProjectModal.githubUrl}
                        </span>
                      </div>
                      <a
                        href={activeProjectModal.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[40px] px-4 py-2 rounded-xl bg-white/[0.1] hover:bg-white/20 text-white font-semibold text-xs flex items-center justify-center gap-2 border border-white/10 transition-colors cursor-pointer shrink-0"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>{language === 'es' ? 'Ver en GitHub' : 'View on GitHub'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Problem & Solution Callouts */}
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                    <span className="text-xs font-mono uppercase tracking-wider text-rose-300 font-semibold block mb-1">
                      {language === 'es' ? 'El Desafío / Problema de Ingeniería' : 'The Engineering Challenge'}
                    </span>
                    <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                      {activeProjectModal.problem[language]}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-200 font-semibold block mb-1">
                      {language === 'es' ? 'La Solución Técnica Implementada' : 'The Implemented Technical Solution'}
                    </span>
                    <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                      {activeProjectModal.solution[language]}
                    </p>
                  </div>
                </div>

                {/* Metrics & Impact */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-1">
                    {language === 'es' ? 'Métricas & Retorno de Inversión' : 'Metrics & Operational Impact'}
                  </span>
                  <p className="text-sm font-mono text-zinc-200">
                    {activeProjectModal.metrics[language]}
                  </p>
                </div>

                {/* Tech Stack Full Badges */}
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-2">
                    {language === 'es' ? 'Stack Tecnológico Empleado' : 'Technology Stack Employed'}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeProjectModal.stack.map((t, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct CTA */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                  {activeProjectModal.githubUrl ? (
                    <a
                      href={activeProjectModal.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>{language === 'es' ? 'Ver Repositorio GitHub' : 'View GitHub Repo'}</span>
                    </a>
                  ) : (
                    <span className="text-xs text-zinc-400">
                      {language === 'es' ? 'Código e investigación respaldada por LGI' : 'Code and research backed by LGI'}
                    </span>
                  )}

                  <a
                    href={`https://wa.me/573022687981?text=${encodeURIComponent(
                      language === 'es'
                        ? `Hola Luis, estuve revisando tu proyecto '${activeProjectModal.title.es}' y me interesa implementar una arquitectura similar.`
                        : `Hello Luis, I was reviewing your project '${activeProjectModal.title.en}' and I would like to explore a similar architecture.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] px-5 py-2 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>{language === 'es' ? 'Conversar con Luis' : 'Talk with Luis'}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
