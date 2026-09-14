import { useState, useId, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { 
  Calendar, 
  Send, 
  Clock, 
  Video, 
  CheckCircle2, 
  Sparkles, 
  Building, 
  User, 
  Mail, 
  Phone, 
  MessageSquare, 
  ArrowRight,
  ShieldAlert
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

interface BookingQuoteSectionProps {
  initialRoiNotes?: string;
}

export default function BookingQuoteSection({ initialRoiNotes = '' }: BookingQuoteSectionProps) {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  // Tab State
  const [activeTab, setActiveTab] = useState<'booking' | 'quote'>('booking');

  // Generate dynamic upcoming days
  const days = Array.from({ length: 4 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + (i + 1));
    const dayName = d.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { weekday: 'long' });
    const capitalizedDay = dayName.charAt(0).toUpperCase() + dayName.slice(1);
    const dateFormatted = d.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { month: 'short', day: 'numeric' });
    return { day: capitalizedDay, date: dateFormatted };
  });

  // Booking Widget State
  const [selectedDay, setSelectedDay] = useState<string>(days[0]?.day || 'Mañana');
  const [selectedSlot, setSelectedSlot] = useState<string>('10:30 AM');

  // Form State
  const [quoteData, setQuoteData] = useState({
    name: '',
    company: '',
    contact: '',
    solution: 'Agentes IA WhatsApp / Web',
    companySize: '11-50 colaboradores',
    timeline: 'Inmediato (< 2 semanas)',
    details: initialRoiNotes,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  // Sync ROI calculator data when received from parent
  useEffect(() => {
    if (initialRoiNotes) {
      setQuoteData((prev) => ({ ...prev, details: initialRoiNotes }));
      setActiveTab('quote');
    }
  }, [initialRoiNotes]);

  // Accessible IDs
  const nameId = useId();
  const companyId = useId();
  const contactId = useId();
  const detailsId = useId();

  const timeSlots = ['09:30 AM', '10:30 AM', '02:00 PM', '03:30 PM', '05:00 PM'];

  const handleBookingConfirm = () => {
    const text = `Hola Luis / LGI AI, deseo agendar una llamada diagnóstica de 30 min para el día ${selectedDay} a las ${selectedSlot}. Mi empresa requiere evaluar soluciones de automatización con IA.`;
    window.open(`https://wa.me/573022687981?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*SOLICITUD DE COTIZACIÓN LGI AI*\n\n` +
      `• *Nombre:* ${quoteData.name}\n` +
      `• *Empresa:* ${quoteData.company}\n` +
      `• *Contacto:* ${quoteData.contact}\n` +
      `• *Solución:* ${quoteData.solution}\n` +
      `• *Tamaño de Empresa:* ${quoteData.companySize}\n` +
      `• *Plazo Estimado:* ${quoteData.timeline}\n` +
      (quoteData.details ? `• *Detalles/Diagnóstico ROI:* ${quoteData.details}\n` : '');

    window.open(`https://wa.me/573022687981?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    setFormSubmitted(true);
  };

  return (
    <section id="agendar" className="py-24 bg-[#050508] relative">
      <div id="cotizar" className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-mono uppercase tracking-wider mb-4 shadow-sm shadow-rose-950/50">
            <Sparkles className="w-3.5 h-3.5 text-[#ff1e42]" aria-hidden="true" />
            {language === 'es' ? 'Siguiente Paso Operativo' : 'Next Operational Step'}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            {language === 'es' ? 'Comienza a Transformar tus Operaciones' : 'Start Modernizing Your Operations'}
          </h2>
          <p className="text-base text-slate-300">
            {language === 'es'
              ? 'Elige la vía más cómoda para tu equipo: reserva una llamada de 30 minutos de diagnóstico o arma tu requerimiento en el cotizador.'
              : 'Choose the best route for your team: book a focused 30-minute diagnostic session or specify your project scope.'}
          </p>
        </div>

        {/* Tab Switcher con layoutId */}
        <div className="flex justify-center mb-10">
          <div 
            role="tablist" 
            aria-label={language === 'es' ? 'Modalidad de contacto' : 'Contact mode'}
            className="inline-flex p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 relative shadow-inner"
          >
            <button
              role="tab"
              aria-selected={activeTab === 'booking'}
              onClick={() => setActiveTab('booking')}
              className={`min-h-[44px] px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors relative z-10 flex items-center gap-2 cursor-pointer ${
                activeTab === 'booking' ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {activeTab === 'booking' && (
                <motion.span
                  layoutId="booking-quote-tab"
                  transition={springSnappy}
                  className="absolute inset-0 bg-gradient-to-r from-[#ff1e42] via-rose-600 to-rose-700 rounded-xl -z-10 shadow-md shadow-rose-950/60"
                />
              )}
              <Video className="w-4 h-4" aria-hidden="true" />
              <span>{language === 'es' ? 'Agendar Diagnóstico (30m)' : 'Schedule Diagnostic (30m)'}</span>
            </button>

            <button
              role="tab"
              aria-selected={activeTab === 'quote'}
              onClick={() => setActiveTab('quote')}
              className={`min-h-[44px] px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors relative z-10 flex items-center gap-2 cursor-pointer ${
                activeTab === 'quote' ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {activeTab === 'quote' && (
                <motion.span
                  layoutId="booking-quote-tab"
                  transition={springSnappy}
                  className="absolute inset-0 bg-gradient-to-r from-[#ff1e42] via-rose-600 to-rose-700 rounded-xl -z-10 shadow-md shadow-rose-950/60"
                />
              )}
              <MessageSquare className="w-4 h-4" aria-hidden="true" />
              <span>{language === 'es' ? 'Cotizador a la Medida' : 'Custom Project Quote'}</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          {activeTab === 'booking' ? (
            <motion.div
              key="booking-tab"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={springGentle}
            >
              <SpotlightCard
                spotlightColor="rgba(255, 30, 66, 0.12)"
                borderColor="rgba(255, 30, 66, 0.35)"
                className="p-6 sm:p-10 shadow-2xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Info izquierda */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="space-y-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-rose-400">
                        {language === 'es' ? 'Sesión Estratégica 1 a 1' : '1-on-1 Strategy Session'}
                      </span>
                      <h3 className="text-2xl font-bold text-white">
                        {language === 'es' ? 'Diagnóstico de Arquitectura con Luis Galvan' : 'Architecture Audit with Luis Galvan'}
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {language === 'es'
                          ? 'Analizamos tus cuellos de botella actuales, determinamos la viabilidad de agentes autónomos y definimos la arquitectura óptima sin compromiso.'
                          : 'We evaluate your business workflows, assess autonomous agent feasibility, and map out your optimal architecture.'}
                      </p>
                    </div>

                    <div className="space-y-3 font-mono text-xs text-slate-300">
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-rose-400 shrink-0" aria-hidden="true" />
                        <span>{language === 'es' ? 'Duración: 30 minutos • Zona: COT (UTC-5)' : 'Duration: 30 minutes • Zone: COT (UTC-5)'}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Video className="w-4 h-4 text-rose-400 shrink-0" aria-hidden="true" />
                        <span>Google Meet / Teams (Enlace directo al confirmar)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                        <span>{language === 'es' ? 'Entrega de minuta y mapa de arquitectura' : 'Summary notes & architecture roadmap included'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Selector interactivo de slots */}
                  <div className="lg:col-span-7 bg-slate-950/80 p-6 rounded-2xl border border-slate-800">
                    
                    {/* Días */}
                    <div className="space-y-2 mb-6">
                      <span className="text-xs text-slate-400 font-mono uppercase">
                        {language === 'es' ? 'Días Disponibles' : 'Available Days'}
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {days.map((item, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedDay(`${item.day} (${item.date})`)}
                            className={`min-h-[44px] p-2.5 rounded-xl text-center border transition-all cursor-pointer ${
                              selectedDay.includes(item.day)
                                ? 'bg-rose-950/60 border-rose-500 text-rose-200 font-bold shadow-sm shadow-rose-950/40'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                            }`}
                          >
                            <span className="block text-xs font-semibold">{item.day}</span>
                            <span className="block text-[10px] font-mono text-slate-400">{item.date}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Franjas de Hora */}
                    <div className="space-y-2 mb-6">
                      <span className="text-xs text-slate-400 font-mono uppercase">
                        {language === 'es' ? 'Horarios Disponibles' : 'Available Time Slots'}
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {timeSlots.map((slot, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedSlot(slot)}
                            className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-mono font-medium border transition-all cursor-pointer ${
                              selectedSlot === slot
                                ? 'bg-[#ff1e42] text-white font-bold border-[#ff1e42] shadow-md shadow-rose-950/50'
                                : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Botón de Confirmación */}
                    <motion.button
                      onClick={handleBookingConfirm}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={springSnappy}
                      className="min-h-[48px] w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#ff1e42] via-rose-600 to-rose-700 text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 hover:shadow-rose-600/50 transition-all focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:outline-none cursor-pointer"
                    >
                      <span>{language === 'es' ? 'Agendar Diagnóstico vía WhatsApp' : 'Book Diagnostic via WhatsApp'}</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </motion.button>
                    <p className="text-center text-xs text-slate-400 mt-2">
                      {language === 'es' ? 'Se confirmará al instante vía WhatsApp con el enlace de reunión' : 'Instant confirmation via WhatsApp with meeting link'}
                    </p>
                  </div>

                </div>
              </SpotlightCard>
            </motion.div>
          ) : (
            <motion.div
              key="quote-tab"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={springGentle}
            >
              <SpotlightCard
                spotlightColor="rgba(255, 30, 66, 0.12)"
                borderColor="rgba(255, 30, 66, 0.35)"
                className="p-6 sm:p-10 shadow-2xl"
              >
                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={springSnappy}
                    className="text-center py-12 px-4 space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-rose-500/20 text-[#ff1e42] flex items-center justify-center mx-auto border border-rose-500/30 shadow-lg shadow-rose-950/50">
                      <CheckCircle2 size={36} />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {language === 'es' ? '¡Solicitud de Cotización Preparada!' : 'Quote Request Prepared!'}
                    </h3>
                    <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      {language === 'es'
                        ? 'Se abrió tu solicitud técnica vía WhatsApp. Revisaremos los requerimientos de tu empresa y te responderemos en menos de 4 horas hábiles.'
                        : 'Your quote details were formatted and opened via WhatsApp. We will evaluate your scope and respond within 4 business hours.'}
                    </p>
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => setFormSubmitted(false)}
                        className="min-h-[44px] px-6 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-mono font-semibold transition-all border border-rose-500/40 cursor-pointer"
                      >
                        {language === 'es' ? 'Enviar otro requerimiento' : 'Send another request'}
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleQuoteSubmit} className="space-y-6">
                    
                    {/* Paso 1: Selección de Solución */}
                    <div>
                      <label className="block text-sm font-semibold text-white mb-3">
                        {language === 'es' ? '1. ¿Qué solución requiere tu empresa prioritariamente?' : '1. What solution does your business prioritize?'}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {[
                          'Agentes IA WhatsApp / Web',
                          'Workflows Make / n8n',
                          'Extracción Documental OCR',
                          'Consultoría & Arquitectura Integral'
                        ].map((sol, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setQuoteData({ ...quoteData, solution: sol })}
                            className={`min-h-[44px] p-3 text-left rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                              quoteData.solution === sol
                                ? 'bg-rose-950/60 border-rose-500 text-rose-200 font-bold shadow-sm shadow-rose-950/50'
                                : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            {sol}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Paso 2: Inputs de Contacto */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor={nameId} className="block text-xs font-medium text-slate-300 mb-1.5">
                          {language === 'es' ? 'Nombre y Apellido *' : 'Full Name *'}
                        </label>
                        <input
                          id={nameId}
                          required
                          type="text"
                          placeholder={language === 'es' ? 'Ej. Roberto Gómez' : 'e.g. Robert Smith'}
                          value={quoteData.name}
                          onChange={(e) => setQuoteData({ ...quoteData, name: e.target.value })}
                          className="w-full min-h-[44px] px-4 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label htmlFor={companyId} className="block text-xs font-medium text-slate-300 mb-1.5">
                          {language === 'es' ? 'Empresa / Industria *' : 'Company / Industry *'}
                        </label>
                        <input
                          id={companyId}
                          required
                          type="text"
                          placeholder="Acme Corp / Logística"
                          value={quoteData.company}
                          onChange={(e) => setQuoteData({ ...quoteData, company: e.target.value })}
                          className="w-full min-h-[44px] px-4 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label htmlFor={contactId} className="block text-xs font-medium text-slate-300 mb-1.5">
                          {language === 'es' ? 'WhatsApp o Correo Corporativo *' : 'WhatsApp or Work Email *'}
                        </label>
                        <input
                          id={contactId}
                          required
                          type="text"
                          placeholder="+57 300 000 0000"
                          value={quoteData.contact}
                          onChange={(e) => setQuoteData({ ...quoteData, contact: e.target.value })}
                          className="w-full min-h-[44px] px-4 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Paso 3: Tamaño de Empresa & Plazo Estimado */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5">
                          {language === 'es' ? 'Tamaño del Equipo / Empresa' : 'Company / Team Size'}
                        </label>
                        <select
                          value={quoteData.companySize}
                          onChange={(e) => setQuoteData({ ...quoteData, companySize: e.target.value })}
                          className="w-full min-h-[44px] px-4 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                        >
                          <option value="1-10">{language === 'es' ? '1 a 10 colaboradores' : '1 to 10 employees'}</option>
                          <option value="11-50">{language === 'es' ? '11 a 50 colaboradores' : '11 to 50 employees'}</option>
                          <option value="51-200">{language === 'es' ? '51 a 200 colaboradores' : '51 to 200 employees'}</option>
                          <option value="200+">{language === 'es' ? 'Más de 200 colaboradores' : '200+ employees'}</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5">
                          {language === 'es' ? 'Plazo Deseado de Despliegue' : 'Desired Deployment Timeline'}
                        </label>
                        <select
                          value={quoteData.timeline}
                          onChange={(e) => setQuoteData({ ...quoteData, timeline: e.target.value })}
                          className="w-full min-h-[44px] px-4 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                        >
                          <option value="Inmediato (< 2 semanas)">{language === 'es' ? 'Inmediato (< 2 semanas)' : 'Immediate (< 2 weeks)'}</option>
                          <option value="1 mes">{language === 'es' ? 'Próximo mes' : 'Next month'}</option>
                          <option value="1 a 3 meses">{language === 'es' ? '1 a 3 meses' : '1 to 3 months'}</option>
                          <option value="Exploratorio">{language === 'es' ? 'Exploratorio / En planeación' : 'Exploratory / Planning'}</option>
                        </select>
                      </div>
                    </div>

                    {/* Paso 4: Detalles y Estimaciones */}
                    <div>
                      <label htmlFor={detailsId} className="block text-xs font-medium text-slate-300 mb-1.5">
                        {language === 'es' ? 'Detalles del proyecto o volumen de datos a automatizar' : 'Project details or data volume to automate'}
                      </label>
                      <textarea
                        id={detailsId}
                        rows={3}
                        placeholder={language === 'es' ? 'Ej: Procesamos 800 órdenes de compra por semana y queremos conectarlas directo a SAP sin intervención manual...' : 'E.g., We process 800 purchase orders weekly and want direct sync with SAP...'}
                        value={quoteData.details}
                        onChange={(e) => setQuoteData({ ...quoteData, details: e.target.value })}
                        className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none font-sans resize-none"
                      />
                    </div>

                    {/* Botón de Envío */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                      <span className="text-xs text-slate-400">
                        {language === 'es' ? 'Respuesta técnica garantizada desde cotizaciones@luisgalvan.me en menos de 4 horas hábiles.' : 'Technical response guaranteed from cotizaciones@luisgalvan.me within 4 business hours.'}
                      </span>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={springSnappy}
                        className="min-h-[48px] w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-[#ff1e42] via-rose-600 to-rose-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 hover:shadow-rose-600/50 focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:outline-none cursor-pointer"
                      >
                        <span>{language === 'es' ? 'Enviar Solicitud de Cotización' : 'Send Quote Request'}</span>
                        <Send className="w-4 h-4" aria-hidden="true" />
                      </motion.button>
                    </div>

                  </form>
                )}
              </SpotlightCard>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
