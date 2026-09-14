import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { 
  ArrowRight, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Bot, 
  FileText, 
  Workflow, 
  Play, 
  Terminal, 
  Layers, 
  Database,
  ScanLine,
  Activity,
  Cpu,
  BookOpen,
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

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

export default function HeroAI() {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  // Active Interactive Demo Tab
  const [activeTab, setActiveTab] = useState<'agent' | 'ocr' | 'workflow' | 'rag'>('agent');
  
  // Interactive Agent State
  const [selectedScenario, setSelectedScenario] = useState<'construction' | 'finance' | 'sales'>('construction');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [executionLatency, setExecutionLatency] = useState<number>(380);
  const [copiedJson, setCopiedJson] = useState<boolean>(false);

  const scenarios = {
    construction: {
      role: language === 'es' ? 'Director de Obra (Consorcio)' : 'Site Operations Director',
      input: language === 'es' 
        ? 'Requerimos cotizar urgentemente peritaje sísmico y prueba de carga para 3 puentes en Cundinamarca con normativa NSR-10.' 
        : 'Need an urgent structural seismic audit and proof loading for 3 bridges in Cundinamarca under NSR-10 standards.',
      response: language === 'es'
        ? '¡Recibido! Según nuestra matriz de ingeniería civil y disponibilidad de brigadas CIMOC, el costo estimado es de **$28.5M COP** con entrega de informe en 5 días hábiles. Te he generado la propuesta preliminar con alcance técnico.'
        : 'Received! Based on our civil engineering matrix and CIMOC field brigade schedules, estimated cost is **$7,200 USD** with a 5-day delivery turnaround. Preliminary technical scope generated.',
      action: language === 'es' ? 'Propuesta Técnica COT-8920.pdf generada y agendada visita técnica' : 'Technical Proposal COT-8920.pdf compiled & site visit reserved',
      badge: 'NSR-10 / Civil AI'
    },
    finance: {
      role: language === 'es' ? 'Gerente de Finanzas (Distribuidora)' : 'Finance Manager (Distribution)',
      input: language === 'es'
        ? 'Llegaron 120 remisiones de transporte en PDF hoy. Necesitamos conciliarlas contra las órdenes de compra en SAP.'
        : '120 logistics delivery manifests arrived today in PDF. We need them matched against open SAP purchase orders.',
      response: language === 'es'
        ? 'Procesamiento finalizado con éxito: **118 remisiones cuadradas al centavo**, 2 con discrepancia de flete marcadas para revisión humana. Toda la contabilidad quedó actualizada en SAP mediante webhook n8n.'
        : 'Batch processing complete: **118 manifests reconciled to the cent**, 2 flagged with freight discrepancies for human audit. SAP accounts ledger updated via n8n webhook.',
      action: language === 'es' ? '118 registros sincronizados en SAP · Ahorro: 3.5 hrs' : '118 records synced into SAP · Saved: 3.5 hrs',
      badge: 'SAP / n8n Sync'
    },
    sales: {
      role: language === 'es' ? 'Gerente Comercial (Energía Solar)' : 'Commercial Director (Solar Energy)',
      input: language === 'es'
        ? 'Hola, un cliente industrial envió su factura de luz de $18.5M COP y quiere saber cuántos paneles solares necesita.'
        : 'Hi, an industrial client sent their $4,800 monthly utility bill and wants to know the required solar PV array capacity.',
      response: language === 'es'
        ? 'Gemini Vision extrajo un consumo de **19.450 kWh/mes**. Se calculó un sistema de **110 kWp (198 paneles bifaciales)** con payback de 3.2 años y deducción de renta bajo Ley 1715. Dossier comercial enviado al WhatsApp del cliente.'
        : 'Gemini Vision extracted **19,450 kWh/month**. Sized an optimal **110 kWp array (198 bifacial modules)** with 3.2-year ROI payback and tax credits under Law 1715. Commercial proposal sent to customer WhatsApp.',
      action: language === 'es' ? 'Dossier financiero generado y prospecto calificado A+' : 'Financial deck generated & prospect scored A+',
      badge: 'Solar AI / Law 1715'
    }
  };

  const handleSimulate = () => {
    setIsSimulating(true);
    const randomLatency = Math.floor(Math.random() * 180) + 290;
    setExecutionLatency(randomLatency);
    setTimeout(() => {
      setIsSimulating(false);
    }, 600);
  };

  const handleCopyJson = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const currentScenario = scenarios[selectedScenario];

  const metrics = [
    {
      value: '+75%',
      label: language === 'es' ? 'Ahorro de Tiempo' : 'Time Saved',
      sub: language === 'es' ? 'En tareas repetitivas' : 'On repetitive tasks',
    },
    {
      value: '< 45 días',
      label: language === 'es' ? 'Retorno de Inversión' : 'ROI Payback',
      sub: language === 'es' ? 'Amortización de setup' : 'Setup recovery',
    },
    {
      value: '24/7',
      label: language === 'es' ? 'Operación Autónoma' : 'Autonomous Uptime',
      sub: language === 'es' ? 'Cero latencia de espera' : 'Zero wait latency',
    },
    {
      value: '100%',
      label: language === 'es' ? 'Integrado a tu Stack' : 'Seamless Integration',
      sub: language === 'es' ? 'WhatsApp, ERPs & CRMs' : 'WhatsApp, ERPs & CRMs',
    },
  ];

  return (
    <section id="hero-ia" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-[#050508]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: B2B Value Proposition & Hooks */}
          <motion.div 
            className="lg:col-span-6 xl:col-span-7 flex flex-col items-start text-left"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springGentle}
          >
            {/* Ambient Shimmer Badge: Sith Lightsaber Red + Titanium */}
            <div className="relative group inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-rose-500/40 text-rose-300 text-xs md:text-sm font-mono mb-8 backdrop-blur-md shadow-[0_0_25px_rgba(244,63,94,0.25)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
              </span>
              <span className="font-semibold tracking-wide text-rose-200">
                {language === 'es' ? 'LGI AI & AUTOMATIZACIÓN — SISTEMAS AUTÓNOMOS' : 'LGI AI & AUTOMATION — AUTONOMOUS SYSTEMS'}
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400 hidden sm:inline">
                {language === 'es' ? 'Empresas B2B' : 'B2B Enterprise'}
              </span>
            </div>

            {/* Main Headline with Lightsaber Plasma Gradient */}
            <h1 className="text-4xl sm:text-6xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-6">
              {language === 'es' ? (
                <>
                  Multiplique la Capacidad de su Empresa sin Aumentar su Nómina con{' '}
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-[#ff1e42] via-rose-400 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(244,63,94,0.45)]">
                      Agentes de IA
                    </span>
                  </span>
                </>
              ) : (
                <>
                  Multiply Your Operational Capacity Without Inflating Headcount Using{' '}
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-[#ff1e42] via-rose-400 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(244,63,94,0.45)]">
                      AI Agents
                    </span>
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle / Direct Benefit */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300/90 max-w-2xl mb-8 leading-relaxed font-light">
              {language === 'es' 
                ? 'Diseñamos e implementamos infraestructura de software inteligente: flujos automatizados de extremo a extremo (n8n/Make), agentes omnicanal para WhatsApp y extracción documental con modelos de visión de última generación.'
                : 'We architect and deploy mission-critical software infrastructure: end-to-end workflow automations (n8n/Make), omnichannel WhatsApp agents, and computer vision document extraction models.'}
            </p>

            {/* Dual CTAs with Spring Physics */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-12">
              <motion.a
                href="#agendar"
                whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                transition={springSnappy}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#ff1e42] via-[#e11d48] to-[#be123c] text-white font-bold text-base shadow-[0_0_30px_rgba(244,63,94,0.45)] hover:shadow-[0_0_40px_rgba(244,63,94,0.65)] transition-all duration-300 min-h-[48px] cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-white" />
                <span>{language === 'es' ? 'Agendar Diagnóstico Gratuito (30m)' : 'Book Free Diagnostic (30m)'}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </motion.a>

              <motion.a
                href="#calculadora"
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                transition={springSnappy}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold text-base border border-slate-700/60 hover:border-rose-500/50 transition-all duration-300 backdrop-blur-md min-h-[48px] cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-rose-400" />
                <span>{language === 'es' ? 'Calcular Ahorro de ROI' : 'Calculate ROI Savings'}</span>
              </motion.a>
            </div>

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-8 border-t border-white/10">
              {metrics.map((m, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-bold font-mono text-rose-400 tracking-tight">
                    {m.value}
                  </span>
                  <span className="text-xs font-semibold text-slate-200 mt-1">
                    {m.label}
                  </span>
                  <span className="text-[11px] text-slate-400 font-light hidden sm:inline">
                    {m.sub}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: High-Tech Interactive AI Sandbox Console (Sith Lightsaber Red Edition) */}
          <motion.div 
            className="lg:col-span-6 xl:col-span-5 relative"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...springGentle, delay: 0.15 }}
          >
            {/* Outer Ambient Glow for the Sandbox Card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-rose-600/30 via-red-500/20 to-amber-500/20 rounded-3xl blur-2xl opacity-75 pointer-events-none" />

            <div className="relative rounded-2xl border border-white/15 bg-slate-950/95 backdrop-blur-2xl shadow-2xl overflow-hidden">
              
              {/* Console Header Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900/90 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-300 flex items-center gap-1.5 font-medium">
                    <Terminal className="w-3.5 h-3.5 text-rose-400" />
                    lgi-orchestrator.v2
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-rose-950/80 text-rose-300 border border-rose-500/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                    <span>{executionLatency}ms</span>
                  </span>
                </div>
              </div>

              {/* Interactive Tab Switcher with shared layoutId */}
              <div className="flex items-center p-1.5 bg-slate-900/70 border-b border-white/10 gap-1 text-xs font-mono">
                {[
                  { id: 'agent', label: language === 'es' ? 'Agente WhatsApp' : 'WhatsApp Agent', icon: <Bot className="w-3.5 h-3.5" /> },
                  { id: 'ocr', label: 'OCR Visión', icon: <ScanLine className="w-3.5 h-3.5" /> },
                  { id: 'workflow', label: 'Flujo n8n / ERP', icon: <Workflow className="w-3.5 h-3.5" /> },
                  { id: 'rag', label: 'RAG & Normas', icon: <BookOpen className="w-3.5 h-3.5" /> },
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`relative flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg transition-colors cursor-pointer ${
                        isActive ? 'text-rose-300 font-semibold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="hero-active-tab-pill"
                          className="absolute inset-0 bg-rose-500/15 border border-rose-500/40 rounded-lg shadow-sm"
                          transition={springSnappy}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-1">
                        {tab.icon}
                        <span className="hidden sm:inline">{tab.label}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Live Interactive Body */}
              <div className="p-5 sm:p-6 min-h-[380px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  
                  {/* TAB 1: WhatsApp Autonomous Agent Simulation */}
                  {activeTab === 'agent' && (
                    <motion.div
                      key="agent-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      {/* Scenario Selector Pills */}
                      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                        {[
                          { id: 'construction', label: language === 'es' ? 'Peritaje Obra' : 'Site Audit' },
                          { id: 'finance', label: language === 'es' ? 'Conciliación SAP' : 'SAP Sync' },
                          { id: 'sales', label: language === 'es' ? 'Venta Solar' : 'Solar Sizing' },
                        ].map(s => (
                          <button
                            key={s.id}
                            onClick={() => setSelectedScenario(s.id as any)}
                            className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                              selectedScenario === s.id
                                ? 'bg-rose-500/25 text-rose-200 border border-rose-500/50 font-semibold'
                                : 'bg-white/5 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>

                      {/* Chat Messages */}
                      <div className="space-y-3">
                        {/* User Message */}
                        <div className="flex items-start gap-2 justify-end">
                          <div className="bg-rose-950/60 border border-rose-500/30 text-rose-100 p-3 rounded-2xl rounded-tr-none text-xs leading-relaxed max-w-[90%] shadow-sm">
                            <p className="font-semibold text-[10px] text-rose-400 mb-0.5">
                              {currentScenario.role}
                            </p>
                            {currentScenario.input}
                          </div>
                        </div>

                        {/* Agent Response */}
                        <div className="flex items-start gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center flex-shrink-0 text-rose-400 mt-0.5">
                            <Bot className="w-4 h-4" />
                          </div>
                          <div className="bg-slate-900/90 border border-white/10 text-slate-200 p-3.5 rounded-2xl rounded-tl-none text-xs leading-relaxed max-w-[92%] shadow-md">
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <span className="font-semibold text-[10px] text-rose-400 flex items-center gap-1 font-mono">
                                <Sparkles className="w-3 h-3 text-rose-400" />
                                LGI Agent · Inferencia RAG
                              </span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-amber-300 border border-amber-500/30">
                                {currentScenario.badge}
                              </span>
                            </div>
                            <p className="font-light text-slate-300">
                              {currentScenario.response}
                            </p>
                            
                            <div className="mt-2.5 p-2 rounded-lg bg-slate-950 border border-white/10 text-[11px] font-mono text-emerald-400 flex items-center justify-between">
                              <span>✓ {currentScenario.action}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Interactive Trigger Button */}
                      <div className="pt-2 flex items-center justify-between border-t border-white/5 text-[11px] font-mono">
                        <span className="text-slate-400">Canal: WhatsApp Cloud API</span>
                        <button
                          onClick={handleSimulate}
                          disabled={isSimulating}
                          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-rose-300 border border-white/10 hover:border-rose-500/40 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                        >
                          <RefreshCw className={`w-3 h-3 ${isSimulating ? 'animate-spin' : ''}`} />
                          <span>{isSimulating ? 'Procesando...' : 'Re-ejecutar Inferencia'}</span>
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: OCR Multimodal Document Extraction */}
                  {activeTab === 'ocr' && (
                    <motion.div
                      key="ocr-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-white/5 pb-2">
                        <span>MODELO: GEMINI 1.5 PRO VISION</span>
                        <span className="text-emerald-400 font-semibold">PRECISIÓN OCR: 99.8%</span>
                      </div>

                      <div className="relative rounded-xl border border-white/10 bg-slate-900/90 p-3.5 font-mono text-xs overflow-hidden">
                        {/* Animated Laser Scanning Line: Lightsaber Red Blade */}
                        <motion.div 
                          animate={shouldReduceMotion ? {} : { y: [0, 180, 0] }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff1e42] to-transparent shadow-[0_0_18px_rgba(255,30,66,1)] pointer-events-none z-20"
                        />

                        <div className="text-slate-400 text-[10px] uppercase tracking-wider mb-2 flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-rose-300">
                            <FileText className="w-3.5 h-3.5 text-rose-400" />
                            Remision_Concreto_Puente_Andes.pdf
                          </span>
                          <button
                            onClick={() => handleCopyJson(`{
  "remision_id": "REM-2026-992",
  "proveedor": "Argos Concretos S.A.",
  "resistencia_psi": 4000,
  "volumen_m3": 32.5,
  "asentamiento_slump_pulg": 6.5,
  "tiempo_transito_valido": true,
  "sap_matching_order": "PO-88190-OK"
}`)}
                            className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-rose-300 transition-colors cursor-pointer"
                          >
                            {copiedJson ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedJson ? 'Copiado' : 'Copiar JSON'}</span>
                          </button>
                        </div>

                        <pre className="text-slate-300 text-[11px] leading-relaxed overflow-x-auto bg-[#04060d] p-3 rounded-lg border border-white/5">
{`{
  "remision_id": "REM-2026-992",
  "proveedor": "Argos Concretos S.A.",
  "resistencia_psi": 4000,
  "volumen_m3": 32.5,
  "asentamiento_slump_pulg": 6.5,
  "tiempo_transito_valido": true,
  "sap_matching_order": "PO-88190-OK"
}`}
                        </pre>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 font-mono">
                        <span className="flex items-center gap-1 text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Zero-Shot: Extrae sin plantillas rígidas
                        </span>
                        <span className="text-rose-400">Validado contra ERP</span>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 3: n8n / ERP Node Orchestration */}
                  {activeTab === 'workflow' && (
                    <motion.div
                      key="workflow-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-white/5 pb-2">
                        <span>ORQUESTADOR: n8n ENTERPRISE</span>
                        <span className="text-rose-400">LATENCIA TOTAL: 1.3s</span>
                      </div>

                      {/* Visual Flow Nodes */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs">
                          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            <Activity className="w-4 h-4" />
                          </div>
                          <div className="flex-1 font-mono">
                            <p className="text-white font-semibold text-[11px]">1. Evento Disparador (Webhook)</p>
                            <p className="text-slate-400 text-[10px]">Nueva cotización enviada por lead en WhatsApp</p>
                          </div>
                          <span className="text-[10px] font-mono text-emerald-400">200 OK</span>
                        </div>

                        <div className="w-0.5 h-2.5 bg-rose-500/50 mx-auto" />

                        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900 border border-rose-500/40 text-xs shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                          <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/40">
                            <Cpu className="w-4 h-4" />
                          </div>
                          <div className="flex-1 font-mono">
                            <p className="text-white font-semibold text-[11px]">2. Razonamiento LLM & Validación</p>
                            <p className="text-slate-400 text-[10px]">Cálculo de precio, descuento y scoring de lead</p>
                          </div>
                          <span className="text-[10px] font-mono text-rose-400">PROCESADO</span>
                        </div>

                        <div className="w-0.5 h-2.5 bg-amber-500/50 mx-auto" />

                        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs">
                          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                            <Database className="w-4 h-4" />
                          </div>
                          <div className="flex-1 font-mono">
                            <p className="text-white font-semibold text-[11px]">3. Sincronización ERP & HubSpot</p>
                            <p className="text-slate-400 text-[10px]">Creación de deal y notificación instantánea a Slack</p>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400">READY</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 4: RAG & Technical Regulations */}
                  {activeTab === 'rag' && (
                    <motion.div
                      key="rag-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-white/5 pb-2">
                        <span>BASE VECTORIAL: PGVECTOR / HNSW</span>
                        <span className="text-rose-400">SIMILITUD: 0.962</span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-900 border border-white/10 text-xs space-y-2 font-mono">
                        <div className="text-[10px] text-rose-400 uppercase tracking-wide">
                          Consulta Técnica Indexada:
                        </div>
                        <p className="text-slate-200 text-[11px]">
                          "¿Cuál es la deriva máxima admisible para pórticos de concreto con disipación especial de energía (DES)?"
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-950 border border-rose-500/30 text-xs space-y-2 shadow-sm">
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className="text-emerald-400 font-bold">Respuesta RAG Verificada:</span>
                          <span className="text-slate-400">NSR-10 Título A.6.4</span>
                        </div>
                        <p className="text-slate-300 text-[11px] leading-relaxed font-sans">
                          Para estructuras del grupo de uso I a IV con pórticos DES, la deriva máxima no debe exceder el **1.0% de la altura de entrepiso** bajo fuerzas de diseño reducidas.
                        </p>
                        <div className="text-[10px] font-mono text-rose-300/80 pt-1">
                          Fuente citada: Código Sismo Resistente NSR-10 · Página 48
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom Status Bar */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Encriptación AES-256 · ISO 27001 Ready</span>
                  </div>
                  <span className="text-rose-400 font-semibold">LGI Autonomous Core</span>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
