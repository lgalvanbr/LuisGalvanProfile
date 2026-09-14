import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  HelpCircle, 
  ChevronDown, 
  ArrowRight, 
  Bot, 
  Building2, 
  Sun, 
  Mail, 
  Phone,
  FileCheck,
  Lock,
  Zap,
  Server
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import HubNavbar from '../components/HubNavbar';
import CyberBackground from '../components/ui/CyberBackground';
import HeroAI from '../components/ia/HeroAI';
import WorkflowArchitecture from '../components/ia/WorkflowArchitecture';
import BentoServices from '../components/ia/BentoServices';
import TechEcosystem from '../components/ia/TechEcosystem';
import RoiCalculator from '../components/ia/RoiCalculator';
import BookingQuoteSection from '../components/ia/BookingQuoteSection';
import WhatsAppButton from '../components/WhatsAppButton';
import logoImg from '../assets/logo.jpeg';

const springGentle = {
  type: "spring" as const,
  stiffness: 220,
  damping: 24,
  mass: 0.8,
};

export default function LgiAI() {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [roiNotes, setRoiNotes] = useState<string>('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleTransferRoi = (data: { teamSize: number; hoursPerWeek: number; hourlyRate: number; currency: 'USD' | 'COP'; annualSavings: number }) => {
    const formattedCurrency = data.currency === 'USD' 
      ? `$${data.annualSavings.toLocaleString('en-US')} USD`
      : `$${data.annualSavings.toLocaleString('es-CO')} COP`;

    setRoiNotes(
      `Diagnóstico Calculadora ROI:\n• Equipo: ${data.teamSize} personas\n• Horas repetitivas semanales: ${data.hoursPerWeek} hrs\n• Costo por hora: ${data.hourlyRate} ${data.currency}\n• Ahorro Anual Proyectado: ${formattedCurrency}`
    );
  };

  const faqs = [
    {
      q: language === 'es' ? '¿Cómo se integran los agentes con nuestro software actual (ERP, CRM o WhatsApp)?' : 'How do AI agents integrate with our current ERP, CRM, or WhatsApp?',
      a: language === 'es' 
        ? 'Utilizamos la API oficial de WhatsApp Cloud y conectores seguros mediante n8n/Make hacia tus bases de datos (PostgreSQL, MySQL, SQL Server) o APIs de software (HubSpot, Salesforce, SAP, Siigo). No reemplazamos tus sistemas: los potenciamos con una capa de inteligencia autónoma.'
        : 'We leverage official WhatsApp Cloud APIs and resilient n8n/Make orchestrators connecting securely to your databases (PostgreSQL, MySQL, SQL Server) or SaaS APIs (HubSpot, Salesforce, SAP). We enhance your existing systems without replacing them.'
    },
    {
      q: language === 'es' ? '¿Nuestros datos y documentos comerciales están protegidos bajo confidencialidad?' : 'Is our commercial data and documentation protected under strict confidentiality?',
      a: language === 'es'
        ? 'Absolutamente. Firmamos un Acuerdo de Confidencialidad (NDA) antes de cualquier análisis técnico. Los datos nunca se utilizan para re-entrenar modelos públicos y los flujos pueden ejecutarse en servidores dedicados privados si la política de tu empresa lo requiere.'
        : 'Strictly yes. We sign a non-disclosure agreement (NDA) before reviewing architecture. Your sensitive corporate data is never used to train public foundational models, and workflows can deploy to private enterprise VPCs.'
    },
    {
      q: language === 'es' ? '¿Cuánto tiempo toma tener el primer agente o flujo funcionando en producción?' : 'How long does it take to deploy the first production workflow or agent?',
      a: language === 'es'
        ? 'Implementamos un sprint de Entrega Rápida (PoC funcional) en 10 a 14 días hábiles para el primer caso de uso prioritario. Esto permite validar el retorno de inversión y ajustar el comportamiento antes del despliegue masivo.'
        : 'We deliver an MVP sprint in 10 to 14 business days for your highest-priority bottleneck. This allows rapid validation of ROI and performance before expanding scope.'
    },
    {
      q: language === 'es' ? '¿Qué pasa si cambian nuestros formatos de facturas o documentos en el futuro?' : 'What happens if our invoice or document formats change in the future?',
      a: language === 'es'
        ? 'Nuestros motores de extracción documental combinan OCR avanzado con modelos multimodales (LLMs) de comprensión semántica. A diferencia de los sistemas tradicionales basados en coordenadas fijas, comprenden el significado contextual de los datos sin romperse si cambia el diseño del documento.'
        : 'Our document extraction pipelines pair OCR with vision-language multimodal models. Unlike legacy coordinate-bound templates, they understand semantic tables and context, staying resilient when visual layouts shift.'
    }
  ];

  return (
    <div className="bg-[#050508] min-h-screen text-slate-100 font-sans selection:bg-rose-500/30 selection:text-white overflow-x-clip relative">
      
      {/* Deep Cyber Atmospheric Background */}
      <CyberBackground />

      {/* Universal Hub Navbar */}
      <HubNavbar />

      <main className="relative z-10">
        {/* 1. Hero Section B2B con Dual CTA y pipeline interactivo */}
        <HeroAI />

        {/* 2. Visual Interactive Pipeline Architecture */}
        <WorkflowArchitecture />

        {/* 3. Bento Grid Interactivo de Servicios */}
        <BentoServices />

        {/* 4. Enterprise Tech Stack & Zero-Retention Security */}
        <TechEcosystem />

        {/* 5. Calculadora Interactiva de ROI con Presets Industriales */}
        <RoiCalculator onTransferData={handleTransferRoi} />

        {/* 6. Sección de Agendamiento Cal.com / Cotizador Dinámico */}
        <BookingQuoteSection initialRoiNotes={roiNotes} />

        {/* 5. Seguridad Corporativa & Enterprise Standards */}
        <section className="py-20 bg-slate-900/30 border-y border-slate-800/80">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-rose-500/30 transition-colors">
                <Lock className="w-8 h-8 text-rose-500 mb-4 mx-auto sm:mx-0" aria-hidden="true" />
                <h3 className="text-lg font-bold text-white mb-2">
                  {language === 'es' ? 'Privacidad & NDA Garantizado' : 'Guaranteed Privacy & NDA'}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {language === 'es'
                    ? 'Tus datos operativos, bases de clientes y métricas financieras permanecen aislados y encriptados en tránsito y en reposo.'
                    : 'Your operational data, client repositories, and financial telemetry remain isolated and encrypted in transit and at rest.'}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-rose-500/30 transition-colors">
                <FileCheck className="w-8 h-8 text-rose-400 mb-4 mx-auto sm:mx-0" aria-hidden="true" />
                <h3 className="text-lg font-bold text-white mb-2">
                  {language === 'es' ? 'Arquitectura Probada en Producción' : 'Production-Grade Architecture'}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {language === 'es'
                    ? 'Monitoreo de fallos con alertas automáticas y reintentos inteligentes para asegurar una operación 24/7 sin pérdida de eventos.'
                    : 'Fault monitoring with self-healing retry pipelines and proactive alerts to assure 24/7 uptime with zero event loss.'}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-rose-500/30 transition-colors">
                <Server className="w-8 h-8 text-amber-400 mb-4 mx-auto sm:mx-0" aria-hidden="true" />
                <h3 className="text-lg font-bold text-white mb-2">
                  {language === 'es' ? 'Rigor de Ingeniería Aplicada' : 'Applied Engineering Rigor'}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {language === 'es'
                    ? 'Respaldado por la metodología de LGI Ingeniería: modelado riguroso, pruebas de estrés y despliegue iterativo medible.'
                    : 'Backed by LGI Engineering principles: rigorous system modeling, stress verification, and measurable iterative rollout.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Preguntas Frecuentes (FAQ) */}
        <section className="py-24 bg-[#050508]">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-rose-500/30 text-rose-400 text-xs font-mono uppercase tracking-wider mb-3">
                <HelpCircle className="w-3.5 h-3.5 text-rose-500" aria-hidden="true" />
                {language === 'es' ? 'Resolución de Dudas Frecuentes' : 'Frequently Asked Questions'}
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {language === 'es' ? 'Todo lo que Necesitas Saber' : 'Frequently Asked Questions'}
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div 
                    key={index}
                    className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden transition-colors hover:border-rose-500/40"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="min-h-[56px] w-full px-6 py-4 text-left flex items-center justify-between gap-4 text-base font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown 
                        className={`w-5 h-5 text-rose-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                        aria-hidden="true" 
                      />
                    </button>
                    {isOpen && (
                      <motion.div
                        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={springGentle}
                        className="px-6 pb-5 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </main>

      {/* Enterprise Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-16 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            
            {/* Col 1: Brand & Bio */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <img src={logoImg} alt="LGI Logo" className="h-9 w-auto rounded-md" />
                <span className="text-xl font-bold font-sans text-white tracking-tight">
                  LGI <span className="text-cyan-400 font-light">AI & Automatización</span>
                </span>
              </div>
              <p className="text-slate-400 text-sm max-w-md leading-relaxed">
                {language === 'es'
                  ? 'Unidad tecnológica especializada de LGI. Transformamos operaciones empresariales mediante agentes autónomos, orquestación de flujos y extracción inteligente de datos.'
                  : 'Specialized enterprise intelligence division of LGI. Transforming corporate operations via autonomous agents, workflow orchestration, and smart data extraction.'}
              </p>
              <div className="text-xs font-mono text-slate-500">
                {language === 'es' ? 'Arquitectura de sistemas autónomos de alta fidelidad.' : 'High-fidelity autonomous systems architecture.'}
              </div>
            </div>

            {/* Col 2: Ecosistema LGI */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider font-mono mb-4">
                {language === 'es' ? 'Ecosistema LGI' : 'LGI Ecosystem'}
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <Link to="/lgi" className="hover:text-rose-400 transition-colors flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>LGI Ingeniería</span>
                  </Link>
                </li>
                <li>
                  <Link to="/ia" className="text-rose-400 font-semibold flex items-center gap-2">
                    <Bot className="w-3.5 h-3.5 text-[#ff1e42]" aria-hidden="true" />
                    <span>LGI AI & Automatización</span>
                  </Link>
                </li>
                <li>
                  <span className="text-slate-400 flex items-center gap-2 cursor-not-allowed">
                    <Sun className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{language === 'es' ? 'LGI Solar (Próximamente)' : 'LGI Solar (Upcoming)'}</span>
                  </span>
                </li>
                <li>
                  <Link to="/" className="hover:text-rose-400 transition-colors">
                    Portafolio Luis Galvan
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Enlaces Directos & Contacto */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider font-mono mb-4">
                {language === 'es' ? 'Contacto Corporativo' : 'Corporate Contact'}
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="mailto:cotizaciones@luisgalvan.me" className="hover:text-rose-400 transition-colors flex items-center gap-1.5 font-mono text-xs">
                    <span>cotizaciones@luisgalvan.me</span>
                  </a>
                </li>
                <li>
                  <a href="#agendar" className="hover:text-rose-400 transition-colors">
                    {language === 'es' ? 'Agendar Diagnóstico (30m)' : 'Schedule Diagnostic Call'}
                  </a>
                </li>
                <li>
                  <a href="#calculadora" className="hover:text-rose-400 transition-colors">
                    {language === 'es' ? 'Simulador de Ahorro ROI' : 'ROI Savings Simulator'}
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/573022687981" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                    WhatsApp: +57 302 268 7981
                  </a>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              © {new Date().getFullYear()} LGI Engineering & AI Technologies. {language === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
            </div>
            <div className="flex items-center gap-6 font-mono text-[11px] text-slate-500">
              <span>{language === 'es' ? 'Alta Disponibilidad 99.9%' : '99.9% High Availability'}</span>
              <span>•</span>
              <span>{language === 'es' ? 'Cifrado de Grado Bancario' : 'Enterprise Grade Encryption'}</span>
              <span>•</span>
              <span>WCAG AA</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />

    </div>
  );
}
