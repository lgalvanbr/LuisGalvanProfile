import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { 
  Bot, 
  Workflow, 
  Layers, 
  FileSpreadsheet, 
  ArrowRight, 
  Check, 
  MessageSquare, 
  Database, 
  CalendarCheck, 
  Cpu, 
  BarChart3,
  FileCode2,
  Sparkles,
  Zap,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import SpotlightCard from '../ui/SpotlightCard';

export default function BentoServices() {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  // Estados interactivos para el Bento Grid
  const [activeChatScenario, setActiveChatScenario] = useState<'sales' | 'support' | 'booking'>('sales');
  const [docFormat, setDocFormat] = useState<'raw' | 'json'>('json');

  const chatScenarios = {
    sales: {
      title: language === 'es' ? 'Cualificación B2B' : 'B2B Lead Qualification',
      user: language === 'es' ? 'Hola, necesitamos automatizar la emisión de 400 órdenes de compra semanales.' : 'Hi, we need to automate issuing 400 purchase orders weekly.',
      agent: language === 'es' ? '¡Entendido! Con nuestro módulo n8n + OCR procesas ese volumen en <15 min y sincronizas tu ERP. ¿Deseas ver una estimación de ahorro en minutos o agendar demo?' : 'Understood! With our n8n + OCR pipeline you process that volume in <15 min and sync your ERP. Want a quick savings estimate or book a live demo?'
    },
    support: {
      title: language === 'es' ? 'Soporte 24/7' : '24/7 Tech Support',
      user: language === 'es' ? '¿El agente puede responder preguntas técnicas consultando nuestros manuales en PDF?' : 'Can the agent answer tech queries using our PDF equipment manuals?',
      agent: language === 'es' ? 'Exacto. Con arquitectura RAG citamos la página exacta del manual con 99.4% de precisión sin inventar respuestas.' : 'Exactly. Using enterprise RAG we cite the exact manual page with 99.4% accuracy without hallucinations.'
    },
    booking: {
      title: language === 'es' ? 'Agendamiento Autónomo' : 'Autonomous Scheduling',
      user: language === 'es' ? 'Quiero agendar una sesión técnica el jueves a las 3:00 PM.' : 'I want to schedule a technical session on Thursday at 3:00 PM.',
      agent: language === 'es' ? '¡Perfecto! El horario de las 3:00 PM está disponible en el calendario de Luis Galvan. Te acabo de reservar la llamada y te envié el link de Google Meet a tu correo.' : 'Done! 3:00 PM is open on Luis Galvan’s calendar. I reserved the slot and sent the Google Meet link to your inbox.'
    }
  };

  return (
    <section id="servicios" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-rose-500/30 text-rose-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(244,63,94,0.2)]">
            <Sparkles className="w-3.5 h-3.5" />
            {language === 'es' ? 'Arquitectura de Soluciones' : 'Solutions Architecture'}
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            {language === 'es' 
              ? 'Infraestructura de Software para Escalar sin Fricción' 
              : 'Software Infrastructure Built to Scale Without Friction'}
          </h2>
          <p className="text-slate-300/80 text-base sm:text-lg leading-relaxed font-light">
            {language === 'es'
              ? 'Combinamos modelos de frontera (LLMs multimodales), motores de orquestación de bajo código y APIs de misión crítica para eliminar las tareas manuales de su empresa.'
              : 'We combine frontier models (multimodal LLMs), low-code orchestration engines, and mission-critical APIs to eradicate repetitive human toil.'}
          </p>
        </div>

        {/* BENTO GRID (2x2 Asimétrico con Spotlight interactivo) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* CARD 1: Agentes IA WhatsApp & Web (7 Columnas) */}
          <SpotlightCard 
            spotlightColor="rgba(244, 63, 94, 0.16)"
            borderColor="rgba(244, 63, 94, 0.4)"
            className="lg:col-span-7 p-6 sm:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-rose-950/80 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                <Bot className="w-6 h-6" aria-hidden="true" />
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 text-rose-300 border border-rose-500/30 font-semibold">
                {language === 'es' ? 'Conversacional & Transaccional' : 'Conversational & Actions'}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
              {language === 'es' ? 'Agentes Autónomos para WhatsApp & Web' : 'Autonomous WhatsApp & Web Agents'}
            </h3>
            <p className="text-slate-300 text-sm sm:text-base mb-6 leading-relaxed font-light">
              {language === 'es'
                ? 'No son simples chatbots de árboles fijos. Son agentes inteligentes conectados a tus bases de datos, CRM y políticas internas con capacidad de ejecutar acciones reales: calificar leads, emitir cotizaciones y agendar llamadas 24/7.'
                : 'Not rigid button-tree bots. Truly intelligent agents connected to your databases, CRM, and policies capable of taking real actions: qualifying leads, quoting, and scheduling 24/7.'}
            </p>

            {/* Simulador Interactivo de Chat */}
            <div className="rounded-2xl bg-slate-950/90 border border-white/10 p-4 mb-6 shadow-inner">
              {/* Selector de Escenarios */}
              <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
                {(['sales', 'support', 'booking'] as const).map((scenarioKey) => (
                  <button
                    key={scenarioKey}
                    onClick={() => setActiveChatScenario(scenarioKey)}
                    className={`min-h-[36px] px-3.5 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                      activeChatScenario === scenarioKey
                        ? 'bg-gradient-to-r from-[#ff1e42] to-[#e11d48] text-white font-bold shadow-[0_0_12px_rgba(244,63,94,0.4)]'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {chatScenarios[scenarioKey].title}
                  </button>
                ))}
              </div>

              {/* Burbujas de Chat */}
              <div className="space-y-3 font-sans text-xs sm:text-sm">
                <div className="flex items-start gap-2.5 max-w-[85%] ml-auto justify-end">
                  <div className="bg-rose-950/60 border border-rose-500/40 text-rose-100 p-3 rounded-2xl rounded-tr-none shadow-sm">
                    {chatScenarios[activeChatScenario].user}
                  </div>
                </div>
                <div className="flex items-start gap-2.5 max-w-[90%]">
                  <div className="w-6 h-6 rounded-full bg-rose-500/20 border border-rose-400 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-3.5 h-3.5 text-rose-300" aria-hidden="true" />
                  </div>
                  <div className="bg-slate-900 text-slate-200 p-3.5 rounded-2xl rounded-tl-none border border-white/10 leading-relaxed shadow-sm">
                    {chatScenarios[activeChatScenario].agent}
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-slate-300 pt-2 border-t border-white/5 mt-auto">
              <span className="flex items-center gap-2 text-rose-300">
                <Check className="w-4 h-4 text-rose-400 shrink-0" />
                RAG Empresarial (PDF/Docs)
              </span>
              <span className="flex items-center gap-2 text-rose-300">
                <Check className="w-4 h-4 text-rose-400 shrink-0" />
                Meta Cloud API Oficial
              </span>
              <span className="flex items-center gap-2 text-rose-300">
                <Check className="w-4 h-4 text-rose-400 shrink-0" />
                Sincronización a CRM
              </span>
            </div>
          </SpotlightCard>

          {/* CARD 2: Orquestación Make & n8n Enterprise (5 Columnas) */}
          <SpotlightCard 
            spotlightColor="rgba(168, 85, 247, 0.18)"
            borderColor="rgba(168, 85, 247, 0.4)"
            className="lg:col-span-5 p-6 sm:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                <Workflow className="w-6 h-6" aria-hidden="true" />
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 text-purple-300 border border-purple-500/30 font-semibold">
                {language === 'es' ? 'Flujos Desatendidos' : 'Unattended Workflows'}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
              {language === 'es' ? 'Orquestación n8n & Make Enterprise' : 'Enterprise n8n & Make Workflows'}
            </h3>
            <p className="text-slate-300 text-sm sm:text-base mb-6 leading-relaxed font-light">
              {language === 'es'
                ? 'Conectamos tu ecosistema de herramientas (Google Workspace, HubSpot, Slack, Facturación electrónica, PostgreSQL, SAP) mediante flujos con lógica condicional, tolerancia a fallos y webhooks seguros.'
                : 'We interconnect your tech stack (Google Workspace, HubSpot, Slack, Invoicing, PostgreSQL, SAP) through conditional pipelines with auto-retries and secure webhooks.'}
            </p>

            {/* Visual Mini Pipeline */}
            <div className="rounded-2xl bg-slate-950/90 border border-white/10 p-4 mb-6">
              <div className="text-[11px] font-mono text-slate-400 uppercase mb-3 flex items-center justify-between">
                <span>Webhook Event Flow</span>
                <span className="text-emerald-400 font-bold">Latency: 42ms</span>
              </div>
              <div className="space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-white/5">
                  <span className="text-purple-300">1. Trigger: Nuevo Lead Inbound</span>
                  <span className="text-emerald-400">200 OK</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-white/5">
                  <span className="text-rose-300">2. Enriquecimiento de Datos (API)</span>
                  <span className="text-emerald-400">Verificado</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-white/5">
                  <span className="text-amber-300">3. Sincronización ERP & Alerta Slack</span>
                  <span className="text-emerald-400">Ejecutado</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono text-slate-300 pt-2 border-t border-white/5 mt-auto">
              <div className="flex items-center gap-2 text-purple-300">
                <Check className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Zero código espagueti: arquitecturas mantenibles</span>
              </div>
              <div className="flex items-center gap-2 text-purple-300">
                <Check className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Despliegue en servidores privados dedicados</span>
              </div>
            </div>
          </SpotlightCard>

          {/* CARD 3: Digitalización de Operaciones & Dashboards (5 Columnas) */}
          <SpotlightCard 
            spotlightColor="rgba(16, 185, 129, 0.18)"
            borderColor="rgba(16, 185, 129, 0.4)"
            className="lg:col-span-5 p-6 sm:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <BarChart3 className="w-6 h-6" aria-hidden="true" />
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 text-emerald-300 border border-emerald-500/30 font-semibold">
                {language === 'es' ? 'Datos en Tiempo Real' : 'Real-Time Insights'}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
              {language === 'es' ? 'Digitalización & Gemelos de Procesos' : 'Process Digitalization & Twins'}
            </h3>
            <p className="text-slate-300 text-sm sm:text-base mb-6 leading-relaxed font-light">
              {language === 'es'
                ? 'Migramos procesos manuales en hojas de cálculo y papel a plataformas centralizadas en la nube con cuadros de mando ejecutivos y telemetría de rendimiento en vivo.'
                : 'We transition manual spreadsheets and paper-based tracking into centralized cloud systems with executive dashboards and operational health metrics.'}
            </p>

            {/* Dashboard Telemetry Widget */}
            <div className="rounded-2xl bg-slate-950/90 border border-white/10 p-4 mb-6">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-900 border border-white/5">
                  <span className="text-xs font-mono text-slate-400 block mb-1">Eficiencia de Ciclo</span>
                  <span className="text-xl font-mono font-bold text-emerald-400 flex items-center justify-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    +38.5%
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-white/5">
                  <span className="text-xs font-mono text-slate-400 block mb-1">Horas Recuperadas</span>
                  <span className="text-xl font-mono font-bold text-rose-400">
                    64 hrs/mes
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono text-slate-300 pt-2 border-t border-white/5 mt-auto">
              <div className="flex items-center gap-2 text-emerald-300">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Paneles de control accesibles desde móvil y escritorio</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-300">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Alertas proactivas a WhatsApp y correo ante anomalías</span>
              </div>
            </div>
          </SpotlightCard>

          {/* CARD 4: Extracción Inteligente de Documentos OCR (7 Columnas) */}
          <SpotlightCard 
            spotlightColor="rgba(244, 63, 94, 0.16)"
            borderColor="rgba(244, 63, 94, 0.4)"
            className="lg:col-span-7 p-6 sm:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-rose-950/80 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                <FileSpreadsheet className="w-6 h-6" aria-hidden="true" />
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 text-rose-300 border border-rose-500/30 font-semibold">
                {language === 'es' ? 'Modelos de Visión Multimodal' : 'Vision Language Models'}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
              {language === 'es' ? 'Extracción Inteligente de Documentos & Facturas' : 'Intelligent Document & Invoice Parsing'}
            </h3>
            <p className="text-slate-300 text-sm sm:text-base mb-6 leading-relaxed font-light">
              {language === 'es'
                ? 'Olvídate de transcribir facturas, contratos, órdenes de compra o remisiones a mano. Nuestro motor basado en Gemini y visión artificial extrae tablas, números de serie y valores directamente a tu ERP con 99.8% de precisión.'
                : 'Eradicate manual transcription of invoices, contracts, POs, or receipts. Our multimodal vision models extract structured tabular data and line items directly into your ERP with 99.8% precision.'}
            </p>

            {/* Document Preview vs JSON Switcher */}
            <div className="rounded-2xl bg-slate-950/90 border border-white/10 p-4 mb-6">
              <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                <span className="text-xs font-mono text-slate-400">Muestra en vivo: Factura_Eléctrica_EPM.pdf</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setDocFormat('raw')}
                    className={`px-2.5 py-1 text-[11px] font-mono rounded cursor-pointer ${docFormat === 'raw' ? 'bg-gradient-to-r from-[#ff1e42] to-[#e11d48] text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                  >
                    Origen
                  </button>
                  <button
                    onClick={() => setDocFormat('json')}
                    className={`px-2.5 py-1 text-[11px] font-mono rounded cursor-pointer ${docFormat === 'json' ? 'bg-gradient-to-r from-[#ff1e42] to-[#e11d48] text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                  >
                    JSON Estructurado
                  </button>
                </div>
              </div>

              {docFormat === 'json' ? (
                <pre className="text-xs font-mono text-rose-300 leading-relaxed overflow-x-auto bg-slate-900/60 p-3 rounded-lg border border-white/5">
{`{
  "cliente": "Planta Industrial Andes S.A.S.",
  "operador_red": "EPM / Grupo EPM",
  "consumo_mensual_kwh": 14820,
  "costo_kwh": 945.5,
  "total_liquidado_cop": 14012310,
  "ahorro_con_solar_ley1715": "88% mensual",
  "estatus_validacion": "100%_CONCILIADO"
}`}
                </pre>
              ) : (
                <div className="p-4 rounded-lg bg-slate-900/60 border border-white/5 text-xs text-slate-300 leading-relaxed font-mono">
                  <p className="text-slate-400 text-[11px] mb-2">[DOCUMENTO PDF ESCANEADO CON CÁMARA MÓVIL]</p>
                  <p>Consumo activo: 14.820 kWh — Tarifa: $945.5/kWh — Total a pagar: $14.012.310 COP.</p>
                  <p className="text-rose-400 mt-2">→ Detectado automáticamente sin requerir plantilla previa.</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-300 pt-2 border-t border-white/5 mt-auto">
              <span className="flex items-center gap-2 text-rose-300">
                <Check className="w-4 h-4 text-rose-400 shrink-0" />
                Validación matemática automática de subtotales e impuestos
              </span>
              <span className="flex items-center gap-2 text-rose-300">
                <Check className="w-4 h-4 text-rose-400 shrink-0" />
                Exportación directa a PostgreSQL, Supabase o Excel
              </span>
            </div>
          </SpotlightCard>

        </div>
      </div>
    </section>
  );
}
