import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { 
  Database, 
  Cpu, 
  Workflow, 
  ShieldCheck, 
  Server, 
  Code2, 
  Zap, 
  ExternalLink,
  CheckCircle2,
  Terminal,
  Lock,
  Layers
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import SpotlightCard from '../ui/SpotlightCard';

const springGentle = {
  type: "spring" as const,
  stiffness: 220,
  damping: 24,
  mass: 0.8,
};

export default function TechEcosystem() {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'models' | 'orchestration' | 'database'>('all');

  const technologies = [
    {
      name: 'Google Gemini 1.5 Pro / Flash',
      category: 'models',
      tag: 'Vision & Multimodal',
      role: {
        es: 'Comprensión semántica de documentos, tablas de facturación y extracción multimodal con ventana de contexto de 1M tokens.',
        en: 'Semantic document comprehension, billing table parsing, and multimodal extraction with 1M token context window.'
      },
      spec: '1.000.000 Tokens Context · Sub-500ms TTFT'
    },
    {
      name: 'WhatsApp Cloud API Oficial',
      category: 'orchestration',
      tag: 'Enterprise Messaging',
      role: {
        es: 'Canal oficial verificado por Meta con plantillas transaccionales, botones interactivos y webhooks seguros de baja latencia.',
        en: 'Official Meta-verified enterprise channel with transactional HSM templates, interactive list buttons, and secure webhooks.'
      },
      spec: 'Tier 3 Meta Partner · Uptime 99.99%'
    },
    {
      name: 'n8n Enterprise Orchestrator',
      category: 'orchestration',
      tag: 'Self-Hosted Workflow',
      role: {
        es: 'Orquestación de flujos complejos autoalojados en servidores dedicados para control absoluto de datos y cero fugas a terceros.',
        en: 'Complex self-hosted workflow orchestration deployed in dedicated VPCs for absolute data sovereignty and zero third-party leaks.'
      },
      spec: 'Self-Hosted VPC · Zero-Data Leak'
    },
    {
      name: 'PostgreSQL + pgvector',
      category: 'database',
      tag: 'Vector Storage & RAG',
      role: {
        es: 'Base de datos relacional y vectorial de alto rendimiento para búsqueda de similitud semántica y memoria contextual de agentes.',
        en: 'High-performance relational and vector store for semantic similarity cosine searches and persistent agent memory.'
      },
      spec: 'HNSW Indexing · Latencia < 5ms'
    },
    {
      name: 'Make / Integromat Enterprise',
      category: 'orchestration',
      tag: 'Event Mesh & APIs',
      role: {
        es: 'Automatización de integraciones rápidas con suites de contabilidad, CRM (HubSpot, Salesforce) y sistemas de almacenamiento S3.',
        en: 'Rapid integration automation with accounting suites, CRMs (HubSpot, Salesforce), and S3 enterprise buckets.'
      },
      spec: 'Multi-Region Failover · Encrypted Storage'
    },
    {
      name: 'Docker & Microservicios Fastify',
      category: 'database',
      tag: 'Container Runtime',
      role: {
        es: 'Contenedores aislados con APIs escritas en TypeScript y Python de alta concurrencia diseñadas para responder en milisegundos.',
        en: 'Isolated containers with high-concurrency TypeScript and Python microservices engineered for millisecond response times.'
      },
      spec: 'Zero Cold-Start · Isolated Sandboxes'
    }
  ];

  const filteredTech = selectedCategory === 'all' 
    ? technologies 
    : technologies.filter(t => t.category === selectedCategory);

  return (
    <section id="ecosistema" className="py-24 px-6 relative z-10 bg-slate-950/80 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-white/10 text-rose-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>{language === 'es' ? 'Stack Tecnológico & Seguridad' : 'Technology Stack & Security'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            {language === 'es' 
              ? 'Construido sobre Tecnología de Grado Empresarial' 
              : 'Built on Enterprise-Grade Technology'}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
            {language === 'es'
              ? 'No usamos soluciones cerradas o propietarias de baja escalabilidad. Implementamos software probado con estándares mundiales de seguridad, aislamiento de datos y alta disponibilidad.'
              : 'We avoid brittle proprietary black-boxes. We engineer with globally battle-tested frameworks guaranteeing strict data isolation, compliance, and 99.9% uptime.'}
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', label: language === 'es' ? 'Todos los Módulos' : 'All Modules' },
              { id: 'models', label: language === 'es' ? 'Modelos de Visión & LLMs' : 'Vision Models & LLMs' },
              { id: 'orchestration', label: language === 'es' ? 'Orquestación & Mensajería' : 'Orchestration & Messaging' },
              { id: 'database', label: language === 'es' ? 'Bases Vectoriales & Backend' : 'Vector Stores & Backend' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as any)}
                className={`min-h-[40px] px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-gradient-to-r from-[#ff1e42] to-[#e11d48] text-white font-bold shadow-[0_0_15px_rgba(244,63,94,0.4)]'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredTech.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...springGentle, delay: index * 0.06 }}
            >
              <SpotlightCard
                spotlightColor="rgba(244, 63, 94, 0.12)"
                borderColor="rgba(244, 63, 94, 0.3)"
                className="p-6 h-full flex flex-col justify-between bg-slate-900/60 border-white/10"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-rose-300">
                      {tech.tag}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                    {tech.name}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed font-light mb-6">
                    {tech.role[language]}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Zap className="w-3.5 h-3.5 text-rose-400" />
                    {tech.spec}
                  </span>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Enterprise Security Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-rose-950/40 border border-white/15 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
                <Lock className="w-3.5 h-3.5" />
                <span>POLÍTICA DE RETENCIÓN CERO / ZERO-DATA-RETENTION</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {language === 'es' ? 'Tus Datos Comerciales Jamás Entrenan Modelos Públicos' : 'Your Commercial Data Never Trains Public Models'}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                {language === 'es'
                  ? 'Todas las llamadas a modelos de lenguaje y visión se realizan mediante endpoints empresariales con acuerdos de no retención de datos (Zero Data Retention SLA). La información confidencial de tu empresa nunca sale de tu perímetro autorizado.'
                  : 'All API interactions route through enterprise endpoints backed by Zero Data Retention SLAs. Your trade secrets, price models, and customer rosters never leave your authorized perimeter.'}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 text-xs font-mono flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-rose-400 shrink-0" />
                <span className="text-slate-200">Acuerdo de Confidencialidad (NDA) firmado previo al PoC</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 text-xs font-mono flex items-center gap-3">
                <Server className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="text-slate-200">Despliegue local en VPC privada si se requiere</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
