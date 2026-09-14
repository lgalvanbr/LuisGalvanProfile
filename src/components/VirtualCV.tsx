import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Mail, Phone, Globe, Briefcase, Award, GraduationCap,
  Layers, Cpu, FileText, Download, CheckCircle2, ExternalLink, User, Code2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import profileImg from '../assets/profile.jpeg';

type VirtualCVProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function VirtualCV({ isOpen, onClose }: VirtualCVProps) {
  const { language } = useLanguage();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handlePrint = () => {
    window.print();
  };

  // Pre-compiled highly professional, concise bilingual CV Data
  const cvData = {
    es: {
      title: "Hoja de Vida",
      subtitle: "Luis Carlos Galvan Vergel",
      tagline: "Ingeniero Civil & Estudiante de Ingeniería de Sistemas",
      
      profileTitle: "Perfil Profesional",
      profile: "Perfil analítico de alto rendimiento. Ingeniero Civil (Universidad de los Andes) finalizando pregrado de Ingeniería de Sistemas y Maestría en Ingeniería Civil (AI & Ciencia de Datos). Especializado en desarrollo de software, telemetría industrial IoT para optimización de activos y modelos de visión artificial integrados en sistemas de infraestructura y transporte masivo.",
      
      educationTitle: "Formación Académica",
      education: [
        {
          title: "M.Sc. en Ingeniería Civil — IA & Analítica de Datos para Infraestructura",
          institution: "Universidad de los Andes",
          period: "2026 - Presente",
          details: "Enfoque en modelos predictivos, optimización estocástica y big data industrial aplicado a activos físicos."
        },
        {
          title: "Ingeniería de Sistemas (Semestres Avanzados)",
          institution: "Universidad de los Andes",
          period: "2024 - Presente (En curso)",
          details: "Énfasis principal en Estructuras de Datos, Algoritmos, Programación de Redes y Sistemas Distribuidos."
        },
        {
          title: "Ingeniero Civil",
          institution: "Universidad de los Andes",
          period: "2022 - 2026",
          details: "Énfasis principal en Diseño Estructural, modelación avanzada en SAP2000 y estructuración financiera de proyectos."
        }
      ],

      achievementsTitle: "Hitos y Proyectos de Ingeniería",
      achievements: [
        {
          title: "Sistema Fotovoltaico 30kW+ (Pailitas, Cesar)",
          institution: "Modelación Energética",
          desc: "Modelé técnicamente los sistemas de generación solar usando tecnologías Growatt y JA Solar, y estructuré el expediente técnico integral para su radicación legal ante la UPME.",
          tags: ["Growatt", "JA Solar", "UPME", "Modelación"]
        },
        {
          title: "Proyecto HydroSafe",
          institution: "Cimentaciones Resilientes",
          desc: "Co-diseñé técnicamente y realicé la representación tridimensional 3D de cimentaciones flotantes con concretos especializados para mitigar riesgos por inundaciones.",
          tags: ["Diseño 3D", "Concrete Design", "Hidráulica"]
        },
        {
          title: "Monitoreo con Visión Computacional",
          institution: "CIAM Lab / Tránsito Inteligente",
          desc: "Implementé y desplegué scripts en Python utilizando YOLO y ByteTrack para analítica avanzada de tráfico vehicular y controles de seguridad industrial en frentes de obra activos.",
          tags: ["YOLO", "ByteTrack", "Python", "Computer Vision"]
        },
        {
          title: "Portal Digital CIAM",
          institution: "CIAM Lab / Gestión Documental",
          desc: "Desplegué una plataforma web interactiva y modular dedicada al control centralizado de tareas y la administración documental de las investigaciones del laboratorio.",
          tags: ["React", "TypeScript", "SaaS Hub"],
          link: "https://ciam-lab.vercel.app"
        }
      ],

      experienceTitle: "Trayectoria Profesional",
      experience: [
        {
          role: "Director y Fundador",
          company: "Consultoría de Ingeniería y Desarrollo Tecnológico",
          period: "Jun 2026 - Presente",
          desc: "Liderazgo técnico y estratégico de servicios de consultoría civil, calibración e instalación de sensores de telemetría IoT y desarrollo de soluciones de software corporativas.",
          achievements: [
            "Diseñé e instalé sistemas de instrumentación remota de tanques y sensores hidrostáticos para mitigación de riesgos operativos.",
            "Gestioné el despliegue de plataformas web corporativas para optimizar el control de tareas y flujos de información en obra."
          ]
        },
        {
          role: "Asistente de Laboratorio (CIAM Lab) & Monitor de IA",
          company: "Universidad de los Andes",
          period: "Ene 2026 - Presente",
          desc: "Coordinación técnica de investigación en visión artificial aplicada a sistemas de infraestructura y soporte conceptual de software en el curso de herramientas de IA.",
          achievements: [
            "Desarrollé scripts de visión por computadora empleando YOLO y segmentación semántica para monitorear el avance de frentes de obra.",
            "Impartí demostraciones prácticas en Python enfocadas en regresiones lineales, librerías de analítica de datos y modelos predictivos."
          ]
        },
        {
          role: "Desarrollador de Sistemas de Control IoT",
          company: "EDS de Combustible / Empresa de Construcción",
          period: "Jun - Sep 2022",
          desc: "Diseño y despliegue de arquitectura industrial para telemetría inteligente de tanques de almacenamiento subterráneo de combustible.",
          achievements: [
            "Programé firmware en C++ para microcontroladores ESP32 e integré sensores de presión hidrostática.",
            "Enlacé flujos de transmisión a bases de datos privadas para la detección de fugas en tiempo real."
          ]
        }
      ],

      skillsTitle: "Sistemas & Stack Tecnológico",
      languages: "Idiomas",
      languagesVal: "Inglés (B2 - Profesional) • Español (Nativo)",
      systems: "Lenguajes de Programación",
      systemsVal: "Python, JavaScript, C#, SQL",
      software: "Herramientas de IA & Ciencia de Datos",
      softwareVal: "AI Studio, YOLO, ByteTrack, Pandas, NumPy, SciPy",
      specialized: "Software Especializado de Ingeniería",
      specializedVal: "Autodesk AutoCAD / ReCap Pro, SAP2000, SketchUp, CloudCompare",
      extracurricular: "Premios e Intereses",
      extracurricularVal: "Medalla de Plata en olimpiada de robótica SOLACYT.",
      printCV: "Descargar Hoja de Vida (PDF)",
      close: "Cerrar"
    },
    en: {
      title: "Resume",
      subtitle: "Luis Carlos Galvan Vergel",
      tagline: "Civil Engineer & Systems Engineering Student",
      
      profileTitle: "Professional Profile",
      profile: "High-performance analytical hybrid profile. Civil Engineer (Universidad de los Andes) completing his Systems Engineering degree and M.Sc. in Civil Engineering (AI & Data Science focus). Specialized in software engineering, industrial IoT telemetry for physical asset auditing, and deep learning models applied to mass transit systems.",
      
      educationTitle: "Elite Education",
      education: [
        {
          title: "M.Sc. in Civil Engineering — AI & Data Science for Infrastructure",
          institution: "Universidad de los Andes",
          period: "2026 - Present",
          details: "Specializing in predictive models, stochastic optimization, and industrial big data for physical structures."
        },
        {
          title: "Systems Engineering (Advanced Student)",
          institution: "Universidad de los Andes",
          period: "2024 - Present (In Progress)",
          details: "Core focus: Resilient Data Structures, Algorithms, Network Programming, and Distributed Systems."
        },
        {
          title: "Bachelor of Science in Civil Engineering",
          institution: "Universidad de los Andes",
          period: "2022 - 2026",
          details: "Main emphasis: Structural Design, dynamic simulations with SAP2000, and financial decision modeling."
        }
      ],

      achievementsTitle: "Engineering Milestones",
      achievements: [
        {
          title: "30kW+ Photovoltaic System (Pailitas, Colombia)",
          institution: "Energy & Infrastructure",
          desc: "Modeled solar generation infrastructures utilizing Growatt and JA Solar technologies, compiling the complete compliance folders for legal UPME approval.",
          tags: ["Growatt", "JA Solar", "UPME", "Solar Flow"]
        },
        {
          title: "HydroSafe Initiative",
          institution: "Floating Foundations",
          desc: "Co-designed and developed 3D dynamic stress representations of special structural concrete floating modules to mitigate flood risks.",
          tags: ["3D Modeling", "Concrete Design", "Risk Mitigation"]
        },
        {
          title: "Computer Vision Traffic Analytics",
          institution: "CIAM Lab / Smart Infra",
          desc: "Engineered real-time vehicle and worker detection tools leveraging YOLO and ByteTrack for structural sites and logistics safety.",
          tags: ["YOLO", "ByteTrack", "Python", "Computer Vision"]
        },
        {
          title: "CIAM Lab Digital Hub",
          institution: "CIAM Lab / Document Portal",
          desc: "Designed and launched an interactive web management program to index files, coordinate tasks, and log asset operations for the modeling team.",
          tags: ["React", "TypeScript", "Document SaaS"],
          link: "https://ciam-lab.vercel.app"
        }
      ],

      experienceTitle: "Professional Timeline",
      experience: [
        {
          role: "Director & Founder",
          company: "Private Engineering & Technology Firm",
          period: "Jun 2026 - Present",
          desc: "Leading strategic consulting in civil infrastructure development, real-time IoT monitoring sensor installations, and corporate web application delivery.",
          achievements: [
            "Engineered hydrostatic pressure monitoring platforms and sensor deployments for high-durability assets.",
            "Spearheaded development pipelines for custom web ecosystems optimizing administrative and task flows for builders."
          ]
        },
        {
          role: "CIAM Lab Research Assistant & AI Educator",
          company: "Universidad de los Andes",
          period: "Jan 2026 - Present",
          desc: "Leading vision-based computational research in mass infrastructure projects while facilitating academic support in AI techniques.",
          achievements: [
            "Authored YOLO and semantic segmentation pipelines to automatically catalog objects and progress on active transit maps.",
            "Facilitated Python workshops centered on deep learning regressors, machine learning algorithms, and structural damage prediction."
          ]
        },
        {
          role: "IoT Control Systems & Telemetry Developer",
          company: "Fuel Service Station / Construction Venture",
          period: "Jun - Sep 2022",
          desc: "Designed and connected an end-to-end industrial internet structure to audit underground fuel stocks.",
          achievements: [
            "Programmed ESP32 chips in C++ and calibrated heavy hydrostatic liquid-level transducers.",
            "Bound telemetry streams to secure databases, eliminating inventory leak issues and manual audits."
          ]
        }
      ],

      skillsTitle: "Technical Stack & Tools",
      languages: "Languages",
      languagesVal: "English (B2 - Upper Intermediate) • Spanish (Native)",
      systems: "Programming Languages",
      systemsVal: "Python, JavaScript, C#, SQL",
      software: "AI & Data Science Tools",
      softwareVal: "AI Studio, YOLO, ByteTrack, Pandas, NumPy, SciPy",
      specialized: "Specialized Engineering Software",
      specializedVal: "Autodesk AutoCAD / ReCap Pro, SAP2000, SketchUp, CloudCompare",
      extracurricular: "Honors",
      extracurricularVal: "Silver medal award at SOLACYT robotics project competition.",
      printCV: "Download Resume (PDF)",
      close: "Close"
    }
  };

  const data = language === 'es' ? cvData.es : cvData.en;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-hidden print:static print:p-0">
          
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute inset-0 bg-black/85 backdrop-blur-md print:hidden cursor-pointer"
          />

          {/* Main Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="relative w-full max-w-5xl h-[92vh] bg-slate-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col z-10 overflow-hidden print:static print:h-auto print:overflow-visible print:border-none print:shadow-none print:bg-white print:text-black"
          >
            
            {/* STICKY HEADER - Toolbar with Print & Close controls */}
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur px-6 py-4 border-b border-white/10 flex items-center justify-between shrink-0 z-30 print:hidden">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                </div>
                <div className="h-4 w-px bg-white/10"></div>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                  <FileText size={14} className="text-emerald-400" />
                  <span>{language === 'es' ? 'luis_galvan_hoja_de_vida.pdf' : 'luis_galvan_resume.pdf'}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-zinc-200 font-mono text-xs font-bold text-zinc-950 rounded-lg transition-all duration-200 shadow-md cursor-pointer"
                >
                  <Download size={14} />
                  <span>{data.printCV}</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-red-500/20 text-white hover:text-red-400 font-mono text-xs font-semibold rounded-lg border border-white/10 hover:border-red-500/30 transition-all duration-200 cursor-pointer z-50 relative"
                  aria-label={data.close}
                >
                  <X size={14} />
                  <span>{data.close}</span>
                </button>
              </div>
            </div>

            {/* SCROLLABLE DOCUMENT - Fully redesigned for premium, single-glance UX */}
            <div className="flex-1 overflow-y-auto px-6 py-8 md:p-10 space-y-10 print:px-0 print:py-0 print:overflow-visible print:block">
              
              {/* PRINT ONLY HEADER */}
              <div className="hidden print:block border-b-2 border-slate-900 pb-5 mb-5 text-black">
                <h1 className="text-3xl font-extrabold tracking-tight">{data.subtitle}</h1>
                <p className="text-sm font-bold text-slate-800 mt-1 uppercase tracking-wide">{data.tagline}</p>
              </div>

              {/* SECTION: HERO CONTAINER (Photo + Contacts) */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 pb-8 border-b border-white/10 print:border-slate-300 print:flex-row print:pb-6 print:gap-6">
                
                {/* Profile Photo Element */}
                <div className="relative group shrink-0">
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-white/20 to-zinc-500/20 rounded-full blur opacity-40 group-hover:opacity-80 transition duration-500 print:hidden" />
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-white/15 relative z-10 bg-slate-800 print:border-black/30">
                    <img 
                      src={profileImg} 
                      alt="Luis Carlos Galvan" 
                      className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                </div>

                {/* Info and Address */}
                <div className="text-center md:text-left space-y-3 flex-1">
                  <div className="space-y-1 print:hidden">
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white bg-gradient-to-r from-white via-white to-text-light bg-clip-text">
                      {data.subtitle}
                    </h2>
                    <p className="text-xs sm:text-sm font-mono text-zinc-300 font-bold tracking-wide uppercase">
                      {data.tagline}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-text-muted mt-2 print:text-slate-800 print:grid-cols-2">
                    <div className="flex items-center justify-center md:justify-start gap-2.5">
                      <span className="p-1 px-1.5 rounded bg-white/10 text-zinc-200 text-[10px] print:bg-slate-100 print:text-slate-800">TEL</span>
                      <a href="tel:+573022687981" className="hover:text-white transition-colors">+57 3022687981</a>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2.5">
                      <span className="p-1 px-1.5 rounded bg-white/10 text-zinc-200 text-[10px] print:bg-slate-100 print:text-slate-800">MAIL</span>
                      <a href="mailto:cotizaciones@luisgalvan.me" className="hover:text-white transition-colors">cotizaciones@luisgalvan.me</a>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2.5">
                      <span className="p-1 px-1.5 rounded bg-white/10 text-zinc-200 text-[10px] print:bg-slate-100 print:text-slate-800">GH</span>
                      <a href="https://github.com/lgalvanbr" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                        github.com/lgalvanbr <ExternalLink size={10} className="print:hidden" />
                      </a>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2.5">
                      <span className="p-1 px-1.5 rounded bg-white/10 text-zinc-200 text-[10px] print:bg-slate-100 print:text-slate-800">WEB</span>
                      <a href="https://www.luisgalvan.me" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                        www.luisgalvan.me <ExternalLink size={10} className="print:hidden" />
                      </a>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2.5">
                      <span className="p-1 px-1.5 rounded bg-white/10 text-zinc-200 text-[10px] print:bg-slate-100 print:text-slate-800">LNK</span>
                      <a href="https://www.linkedin.com/in/luis-carlos-galvan-vergel-15696230a/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                        LinkedIn Profile <ExternalLink size={10} className="print:hidden" />
                      </a>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2.5">
                      <span className="p-1 px-1.5 rounded bg-white/10 text-zinc-200 text-[10px] print:bg-slate-100 print:text-slate-800">LOC</span>
                      <span>Bogotá, Colombia</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* DUAL COLUMN INTERACTIVE FLEX */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start print:grid-cols-1 print:gap-6">
                
                {/* LEFT COLUMN (8/12): Perfil, Experiencia y Educación */}
                <div className="lg:col-span-8 space-y-10 print:col-span-1 print:space-y-6">
                  
                  {/* COMPONENT: PROFESSIONAL SUMMARY (Emerald/Green Theme) */}
                  <section className="space-y-3.5 p-5 bg-emerald-950/20 border border-emerald-500/10 rounded-2xl relative overflow-hidden print:p-0 print:bg-transparent print:border-none">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none print:hidden" />
                    <h3 className="text-xs uppercase font-mono font-bold text-emerald-400 tracking-widest flex items-center gap-2 print:text-emerald-700 print:font-extrabold">
                      <User size={14} className="text-emerald-400 print:text-emerald-700 shrink-0" />
                      {data.profileTitle}
                    </h3>
                    <p className="text-sm text-text-light leading-relaxed font-sans print:text-black print:text-xs">
                      {data.profile}
                    </p>
                  </section>

                  {/* COMPONENT: TECHNICAL TIMELINE (Sky Blue Theme) */}
                  <section className="space-y-5 p-5 bg-sky-950/20 border border-sky-500/10 rounded-2xl relative overflow-hidden print:p-0 print:bg-transparent print:border-none">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl pointer-events-none print:hidden" />
                    <h3 className="text-xs uppercase font-mono font-bold text-sky-400 tracking-widest flex items-center gap-2 print:text-sky-700 print:font-extrabold">
                      <Briefcase size={14} className="text-sky-400 print:text-sky-700 shrink-0" />
                      {data.experienceTitle}
                    </h3>
                    
                    <div className="space-y-6 relative border-l border-sky-500/20 pl-5 ml-1.5 print:border-slate-300 print:space-y-5 print:pl-4">
                      {data.experience.map((exp, idx) => (
                        <div key={idx} className="relative space-y-1.5 group">
                          
                          {/* Timeline dot accent */}
                          <div className="absolute -left-[26px] top-1.5 w-3 h-3 rounded-full bg-sky-400 group-hover:bg-cyan-300 transition-colors border-2 border-slate-900 print:border-white print:bg-sky-700 print:-left-[21px]" />
                          
                          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                            <h4 className="text-sm font-bold text-white print:text-black">
                              {exp.role} 
                              <span className="text-sky-400 font-mono font-normal text-xs ml-1.5 print:text-sky-700">@{exp.company}</span>
                            </h4>
                            <span className="text-xs font-mono text-text-muted shrink-0 print:text-slate-600">{exp.period}</span>
                          </div>

                          <p className="text-xs text-text-muted leading-relaxed font-sans pr-4 print:text-slate-800 print:pr-0">
                            {exp.desc}
                          </p>

                          <ul className="space-y-1 text-xs text-text-light font-sans pl-1 pt-1">
                            {exp.achievements.map((ach, aIdx) => (
                              <li key={aIdx} className="flex items-start gap-2.5 pr-4 print:text-black print:pr-0">
                                <CheckCircle2 size={12} className="text-sky-400 mt-0.5 shrink-0 print:text-sky-700" />
                                <span>{ach}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* COMPONENT: FORMACIÓN ACADÉMICA (Violet Theme) */}
                  <section className="space-y-5 p-5 bg-violet-950/20 border border-violet-500/10 rounded-2xl relative overflow-hidden print:p-0 print:bg-transparent print:border-none">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 rounded-full blur-2xl pointer-events-none print:hidden" />
                    <h3 className="text-xs uppercase font-mono font-bold text-violet-400 tracking-widest flex items-center gap-2 print:text-violet-700 print:font-extrabold">
                      <GraduationCap size={15} className="text-violet-400 print:text-violet-700 shrink-0" />
                      {data.educationTitle}
                    </h3>

                    <div className="space-y-4 print:space-y-3">
                      {data.education.map((edu, idx) => (
                        <div key={idx} className="p-4 bg-white/[0.02] border border-white/5 rounded-xl space-y-1.5 transition-all hover:bg-white/5 hover:border-violet-500/20 print:bg-slate-50 print:border-slate-200 print:p-3">
                          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                            <h4 className="text-sm font-bold text-white print:text-black">{edu.title}</h4>
                            <span className="text-[10px] sm:text-xs font-mono text-violet-400 shrink-0 print:text-violet-700 font-semibold">{edu.period}</span>
                          </div>
                          <p className="text-xs text-text-muted pr-20 print:text-slate-800 print:pr-0 font-medium">{edu.institution}</p>
                          <p className="text-xs text-text-muted leading-relaxed pt-2 border-t border-white/5 font-sans print:border-slate-200 print:text-slate-700">
                            {edu.details}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>

                </div>

                {/* RIGHT COLUMN (4/12): Tech Stacks, Honors & Achievements */}
                <div className="lg:col-span-4 space-y-10 print:col-span-1 print:space-y-6">
                  
                  {/* BLOCK: SKILLSETS (Amber/Yellow Theme) */}
                  <section className="space-y-4 p-5 bg-amber-950/20 border border-amber-500/10 rounded-2xl relative overflow-hidden print:p-0 print:bg-transparent print:border-none">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none print:hidden" />
                    <h3 className="text-xs uppercase font-mono font-bold text-amber-400 tracking-widest flex items-center gap-2 print:text-amber-700 print:font-extrabold">
                      <Cpu size={14} className="text-amber-400 print:text-amber-700 shrink-0" />
                      {data.skillsTitle}
                    </h3>

                    <div className="space-y-5 text-xs font-mono">
                      
                      {/* Language cloud */}
                      <div className="space-y-1.5">
                        <p className="text-[10px] uppercase font-bold text-amber-300 flex items-center gap-1.5 print:text-black">
                          <Globe size={11} className="text-amber-400 print:text-amber-700" />
                          <span>{data.languages}</span>
                        </p>
                        <p className="text-xs text-text-light">{data.languagesVal}</p>
                      </div>

                      {/* Systems / Langs cloud */}
                      <div className="space-y-2 pt-3 border-t border-white/5 print:border-slate-300">
                        <p className="text-[10px] uppercase font-bold text-amber-300 flex items-center gap-1.5 print:text-black">
                          <Code2 size={11} className="text-amber-400 print:text-amber-700" />
                          <span>{data.systems}</span>
                        </p>
                        <div className="flex flex-wrap gap-1.5 text-[10px]">
                          {data.systemsVal.split(', ').map((sys, sidx) => (
                            <span key={sidx} className="px-2 py-1 bg-slate-800/80 border border-amber-500/10 text-white rounded-md print:bg-slate-100 print:border-slate-300 print:text-black shrink-0 font-sans">
                              {sys}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Software Tools */}
                      <div className="space-y-2 pt-3 border-t border-white/5 print:border-slate-300">
                        <p className="text-[10px] uppercase font-bold text-amber-300 flex items-center gap-1.5 print:text-black">
                          <Layers size={11} className="text-amber-400 print:text-amber-700" />
                          <span>{data.software}</span>
                        </p>
                        <div className="flex flex-wrap gap-1.5 text-[10px]">
                          {data.softwareVal.split(', ').map((sys, sidx) => (
                            <span key={sidx} className="px-2 py-1 bg-slate-800/80 border border-amber-500/10 text-white rounded-md print:bg-slate-100 print:border-slate-300 print:text-black shrink-0 font-sans">
                              {sys}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Specialized Software */}
                      <div className="space-y-2 pt-3 border-t border-white/5 print:border-slate-300">
                        <p className="text-[10px] uppercase font-bold text-amber-300 flex items-center gap-1.5 print:text-black">
                          <Cpu size={11} className="text-amber-400 print:text-amber-700" />
                          <span>{data.specialized}</span>
                        </p>
                        <div className="flex flex-wrap gap-1.5 text-[10px]">
                          {data.specializedVal.split(', ').map((sys, sidx) => (
                            <span key={sidx} className="px-2 py-1 bg-slate-800/40 border border-white/5 text-text-muted rounded-md print:bg-slate-50 print:border-slate-200 print:text-slate-700 shrink-0 font-sans">
                              {sys}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Honors Extra */}
                      <div className="space-y-1.5 pt-3 border-t border-white/5 print:border-slate-300">
                        <p className="text-[10px] uppercase font-bold text-amber-300 flex items-center gap-1.5 print:text-black">
                          <Award size={11} className="text-amber-400 print:text-amber-700" />
                          <span>{data.extracurricular}</span>
                        </p>
                        <p className="text-xs text-text-light leading-relaxed">{data.extracurricularVal}</p>
                      </div>

                    </div>
                  </section>

                  {/* BLOCK: HITOS / PROYECTOS ACADÉMICOS (Rose Theme) */}
                  <section className="space-y-4 p-5 bg-rose-950/20 border border-rose-500/10 rounded-2xl relative overflow-hidden print:p-0 print:bg-transparent print:border-none">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full blur-2xl pointer-events-none print:hidden" />
                    <h3 className="text-xs uppercase font-mono font-bold text-rose-400 tracking-widest flex items-center gap-2 print:text-rose-700 print:font-extrabold">
                      <Award size={14} className="text-rose-400 print:text-rose-700 shrink-0" />
                      {data.achievementsTitle}
                    </h3>

                    <div className="space-y-3 print:space-y-3 text-xs">
                      {data.achievements.map((ach: any, idx) => (
                        <div key={idx} className="border border-white/5 bg-slate-950/30 p-3.5 rounded-xl space-y-1 hover:border-rose-500/15 transition-all print:bg-slate-50 print:border-slate-150 print:p-3">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="text-xs font-bold text-white print:text-black">{ach.title}</h4>
                            {ach.link && (
                              <a 
                                href={ach.link} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="text-rose-400 hover:text-rose-300 font-mono text-[10px] flex items-center gap-1 transition-colors print:hidden shrink-0"
                              >
                                {language === 'es' ? 'Ver App' : 'View Link'} <ExternalLink size={10} />
                              </a>
                            )}
                          </div>
                          <p className="text-[9px] font-mono text-rose-400 uppercase tracking-wider print:text-rose-700 font-semibold">{ach.institution}</p>
                          <p className="text-xs text-text-muted leading-relaxed font-sans print:text-slate-700">
                            {ach.desc}
                          </p>
                          <div className="flex flex-wrap gap-1.2 pt-1">
                            {ach.tags.map((tag, tid) => (
                              <span key={tid} className="text-[8px] font-mono px-1.5 py-0.5 bg-white/5 border border-white/5 text-text-muted rounded print:bg-slate-100 print:border-slate-200 print:text-black">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                </div>

              </div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
