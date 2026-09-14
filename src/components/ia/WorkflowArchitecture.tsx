import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { 
  Workflow, 
  MessageSquare, 
  Eye, 
  Cpu, 
  ShieldCheck, 
  Database, 
  Send, 
  Sparkles, 
  Layers, 
  Activity, 
  Code2, 
  ArrowRight,
  CheckCircle2,
  Lock,
  Zap
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import SpotlightCard from '../ui/SpotlightCard';

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

interface PipelineNode {
  id: string;
  step: string;
  title: { es: string; en: string };
  role: { es: string; en: string };
  icon: React.ReactNode;
  latency: string;
  tech: string[];
  description: { es: string; en: string };
  payloadSample: string;
  guardrails: { es: string; en: string };
}

export default function WorkflowArchitecture() {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [activeNodeId, setActiveNodeId] = useState<string>('reasoning');

  const nodes: PipelineNode[] = [
    {
      id: 'ingestion',
      step: '01',
      title: { 
        es: 'Ingestión Multicanal', 
        en: 'Multichannel Ingestion' 
      },
      role: { 
        es: 'Recepción Segura de Eventos', 
        en: 'Secure Event Ingestion' 
      },
      icon: <MessageSquare className="w-5 h-5 text-rose-400" />,
      latency: '< 15 ms',
      tech: ['WhatsApp Cloud API', 'Fastify Webhooks', 'mTLS', 'HMAC-SHA256'],
      description: {
        es: 'Captura en tiempo real mensajes de WhatsApp, correos comerciales con archivos adjuntos o webhooks de sistemas externos con verificación criptográfica.',
        en: 'Real-time ingestion of WhatsApp messages, commercial emails with attachments, or external system webhooks with cryptographic HMAC verification.'
      },
      payloadSample: JSON.stringify({
        source: "whatsapp_cloud_api",
        sender: "+573001234567",
        event_type: "document_message",
        file_mime: "application/pdf",
        checksum: "sha256:e3b0c44298fc1c149afbf4c8996fb924"
      }, null, 2),
      guardrails: {
        es: 'Validación de firma digital, filtrado contra spam e inyección de prompts en cabeceras.',
        en: 'Digital signature verification, spam throttle, and prompt injection defense on transport headers.'
      }
    },
    {
      id: 'perception',
      step: '02',
      title: { 
        es: 'Percepción & Visión OCR', 
        en: 'Perception & Vision OCR' 
      },
      role: { 
        es: 'Extracción Multimodal Estructurada', 
        en: 'Structured Multimodal Parsing' 
      },
      icon: <Eye className="w-5 h-5 text-rose-400" />,
      latency: '< 650 ms',
      tech: ['Gemini 1.5 Flash Vision', 'OpenCV', 'PDFMiner', 'Pydantic'],
      description: {
        es: 'Descompone facturas, remisiones o planos en tablas y coordenadas exactas, extrayendo datos clave sin depender de plantillas rígidas.',
        en: 'Parses invoices, site manifests, or engineering blueprints into spatial coordinates and exact line items without template dependencies.'
      },
      payloadSample: JSON.stringify({
        document_id: "REM-2026-0482",
        vendor: "Concretos y Agregados del Norte S.A.S.",
        items_detected: 4,
        total_amount: 14850000,
        currency: "COP",
        ocr_confidence: 0.998
      }, null, 2),
      guardrails: {
        es: 'Control estricto de esquemas con Pydantic. Rechazo automático de montos con discrepancia matemática.',
        en: 'Strict schema enforcement via Pydantic. Automatic rejection on mathematical line discrepancy.'
      }
    },
    {
      id: 'reasoning',
      step: '03',
      title: { 
        es: 'Núcleo RAG & Razonamiento', 
        en: 'RAG Core & Reasoning' 
      },
      role: { 
        es: 'Toma de Decisiones Contextual', 
        en: 'Contextual Decision Making' 
      },
      icon: <Cpu className="w-5 h-5 text-rose-400" />,
      latency: '< 420 ms',
      tech: ['Google GenAI', 'pgvector', 'PostgreSQL', 'LangChain'],
      description: {
        es: 'Consulta las bases vectoriales de la empresa (políticas de crédito, manuales técnicos, catálogo de precios) para formular respuestas exactas y libres de alucinación.',
        en: 'Queries enterprise vector stores (credit policies, technical specs, pricing matrices) to synthesize hallucination-free answers.'
      },
      payloadSample: JSON.stringify({
        embedding_dimension: 1536,
        top_k_similarity: 0.942,
        retrieved_clauses: ["POL_CRED_V4_SEC2", "CATALOGO_PVSOLAR_2026"],
        reasoning_decision: "APPROVE_WITH_SPECIAL_DISCOUNT_TIER_2",
        confidence: 0.985
      }, null, 2),
      guardrails: {
        es: 'Recuperación acotada con verificación de citas y límite estricto de temperatura (0.1) para evitar improvisación.',
        en: 'Grounded retrieval with strict source citation checks and 0.1 temperature constraint to prevent hallucinations.'
      }
    },
    {
      id: 'validation',
      step: '04',
      title: { 
        es: 'Guardrails & Reglas de Negocio', 
        en: 'Guardrails & Business Rules' 
      },
      role: { 
        es: 'Auditoría Determinista Pre-Acción', 
        en: 'Deterministic Pre-Action Audit' 
      },
      icon: <ShieldCheck className="w-5 h-5 text-amber-400" />,
      latency: '< 30 ms',
      tech: ['NeMo Guardrails', 'Custom Python Audits', 'Z-Score Checks'],
      description: {
        es: 'Antes de tocar cualquier sistema transaccional, un validador determinista verifica que la propuesta cumpla los límites de crédito, stock e inventario.',
        en: 'Before mutating transactional records, a deterministic rules validator verifies credit ceilings, inventory stock, and compliance.'
      },
      payloadSample: JSON.stringify({
        compliance_check: "PASSED",
        risk_score: 0.02,
        financial_limit_verified: true,
        human_escalation_required: false,
        audit_trail_id: "AUD-8921-99"
      }, null, 2),
      guardrails: {
        es: 'Si el umbral de riesgo supera 0.15, la operación se deriva instantáneamente a un supervisor humano con resumen contextual.',
        en: 'If risk exceeds 0.15, execution halts and escalates to a human manager with an instant context summary.'
      }
    },
    {
      id: 'execution',
      step: '05',
      title: { 
        es: 'Acción ERP & Notificación', 
        en: 'ERP Action & Notification' 
      },
      role: { 
        es: 'Mutación en Sistemas Reales', 
        en: 'Live Transactional Mutation' 
      },
      icon: <Database className="w-5 h-5 text-rose-400" />,
      latency: '< 180 ms',
      tech: ['n8n Orchestrator', 'SAP REST API', 'Siigo API', 'Slack Webhook'],
      description: {
        es: 'Inserta la orden en el ERP, genera el PDF formal con firma electrónica y envía la confirmación al cliente por WhatsApp y al equipo por Slack.',
        en: 'Inserts the purchase order into the ERP, compiles a signed PDF invoice, and dispatches instant confirmations to WhatsApp and Slack.'
      },
      payloadSample: JSON.stringify({
        sap_doc_entry: 994021,
        pdf_quote_url: "https://lgi.ai/cdn/quotes/COT-994021.pdf",
        client_whatsapp_dispatched: true,
        slack_notification_sent: true,
        end_to_end_duration_ms: 1320
      }, null, 2),
      guardrails: {
        es: 'Transacciones atómicas (ACID) con reversión automática (rollback) si el servicio externo falla.',
        en: 'ACID atomic transactions with automated compensating rollbacks if downstream APIs time out.'
      }
    }
  ];

  const activeNode = nodes.find(n => n.id === activeNodeId) || nodes[2];

  return (
    <section id="arquitectura" className="py-24 px-6 relative z-10 overflow-hidden bg-[#07070b] border-t border-white/10">
      
      {/* Ambient background glow: Sith Red / Crimson laser */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-rose-600/10 blur-[140px] rounded-full" 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-rose-500/30 text-rose-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4 shadow-[0_0_20px_rgba(244,63,94,0.2)]">
            <Workflow className="w-3.5 h-3.5" />
            <span>{language === 'es' ? 'Ingeniería de Sistemas Autónomos' : 'Autonomous Systems Engineering'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            {language === 'es' 
              ? 'Cómo Funciona la Arquitectura por Dentro' 
              : 'How the Architecture Operates Internally'}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
            {language === 'es'
              ? 'Una mirada transparente al pipeline de 5 fases que procesa eventos de clientes, razona con LLMs y actualiza tus sistemas transaccionales en menos de 2 segundos.'
              : 'A transparent deep-dive into the 5-phase pipeline that receives customer events, reasons with LLMs, and commits to enterprise systems in under 2 seconds.'}
          </p>
        </div>

        {/* Pipeline Stage Tabs (Horizontal Flow) */}
        <div className="relative mb-12">
          
          {/* Connecting Line background on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-rose-500/30 via-red-500/40 to-amber-500/30 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 relative z-10">
            {nodes.map((node) => {
              const isActive = activeNodeId === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setActiveNodeId(node.id)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-300 relative cursor-pointer group flex flex-col justify-between ${
                    isActive 
                      ? 'bg-slate-900/95 border-rose-500 shadow-[0_0_25px_rgba(244,63,94,0.35)] ring-1 ring-rose-500' 
                      : 'bg-slate-950/70 border-white/10 hover:border-white/20 hover:bg-slate-900/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                        isActive ? 'bg-rose-500/20 text-rose-300' : 'bg-white/5 text-slate-400'
                      }`}>
                        PASO {node.step}
                      </span>
                      <div className={`p-2 rounded-xl border ${
                        isActive 
                          ? 'bg-rose-500/20 border-rose-500/50 shadow-sm text-rose-300' 
                          : 'bg-white/5 border-white/10 text-slate-400 group-hover:text-white'
                      }`}>
                        {node.icon}
                      </div>
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1 leading-snug">
                      {node.title[language]}
                    </h3>
                    <p className="text-[11px] text-slate-400 line-clamp-1 font-light">
                      {node.role[language]}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-slate-400">Latencia:</span>
                    <span className="text-emerald-400 font-semibold">{node.latency}</span>
                  </div>

                  {/* Active Indicator Bar */}
                  {isActive && (
                    <motion.div 
                      layoutId="active-node-indicator"
                      className="absolute -bottom-1 left-4 right-4 h-1 bg-gradient-to-r from-[#ff1e42] to-amber-500 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.8)]"
                      transition={springSnappy}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Inspector Panel for Selected Node */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode.id}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -15 }}
            transition={springGentle}
          >
            <SpotlightCard
              spotlightColor="rgba(244, 63, 94, 0.16)"
              borderColor="rgba(244, 63, 94, 0.4)"
              className="p-6 sm:p-10 bg-slate-950/95 border-white/15 rounded-3xl shadow-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Col: Explanations & Specs (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300">
                      {activeNode.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-rose-400 uppercase tracking-wider font-semibold">
                        <span>Paso {activeNode.step}</span>
                        <span>•</span>
                        <span>Latencia típica: {activeNode.latency}</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                        {activeNode.title[language]}
                      </h3>
                    </div>
                  </div>

                  <p className="text-slate-200 text-base leading-relaxed font-light">
                    {activeNode.description[language]}
                  </p>

                  {/* Guardrails Callout */}
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/30 text-xs sm:text-sm">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-1 font-mono uppercase tracking-wide">
                      <Lock className="w-4 h-4" />
                      <span>{language === 'es' ? 'Guardrail & Política de Seguridad' : 'Security Guardrail & Assurance'}</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed font-light">
                      {activeNode.guardrails[language]}
                    </p>
                  </div>

                  {/* Tech Badges */}
                  <div>
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2 font-semibold">
                      {language === 'es' ? 'Stack de Ejecución:' : 'Runtime Stack:'}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeNode.tech.map((t, idx) => (
                        <span 
                          key={idx}
                          className="text-xs font-mono px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 flex items-center gap-1.5"
                        >
                          <Zap className="w-3 h-3 text-rose-400" />
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Col: Live JSON Payload Inspector (5 cols) */}
                <div className="lg:col-span-5">
                  <div className="rounded-2xl bg-slate-900/90 border border-white/10 overflow-hidden shadow-2xl">
                    <div className="flex items-center justify-between px-4 py-3 bg-black/60 border-b border-white/10">
                      <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5 text-rose-400" />
                        payload_inspect.json
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                        HTTP 200 OK
                      </span>
                    </div>
                    <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed bg-[#05060c] max-h-[340px]">
                      <code>{activeNode.payloadSample}</code>
                    </pre>
                  </div>
                </div>

              </div>
            </SpotlightCard>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
