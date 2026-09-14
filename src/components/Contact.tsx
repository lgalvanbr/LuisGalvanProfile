import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Linkedin, Github, Mail, MapPin, Send, CheckCircle2, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const springSnappy = {
  type: "spring" as const,
  stiffness: 400,
  damping: 30,
};

export default function Contact() {
  const { t, language } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceInterest: 'LGI AI & Automatización',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contacts = [
    {
      icon: <Linkedin size={22} />,
      label: "LinkedIn",
      value: "Luis Carlos Galvan Vergel",
      href: "https://www.linkedin.com/in/luis-carlos-galvan-vergel-15696230a/",
      action: language === 'es' ? 'Conectar' : 'Connect'
    },
    {
      icon: <Github size={22} />,
      label: "GitHub",
      value: "github.com/lgalvanbr",
      href: "https://github.com/lgalvanbr",
      action: language === 'es' ? 'Explorar' : 'Explore'
    },
    {
      icon: <Mail size={22} />,
      label: "Email",
      value: "cotizaciones@luisgalvan.me",
      href: "mailto:cotizaciones@luisgalvan.me",
      action: language === 'es' ? 'Escribir' : 'Compose'
    },
    {
      icon: <MapPin size={22} />,
      label: t('contact.location').split(',')[0],
      value: t('contact.location'),
      href: "https://maps.google.com/?q=Bogota,+Colombia",
      action: language === 'es' ? 'Ver Mapa' : 'View Map'
    }
  ];

  const serviceOptions = [
    { id: 'ai', label: language === 'es' ? 'LGI AI & Automatización' : 'LGI AI & Automation' },
    { id: 'twins', label: language === 'es' ? 'LGI Ingeniería / Gemelos Digitales' : 'LGI Engineering / Digital Twins' },
    { id: 'iot', label: language === 'es' ? 'Telemetría IoT & Monitoreo SHM' : 'IoT Telemetry & Structural Health' },
    { id: 'solar', label: language === 'es' ? 'LGI Solar / Generación Fotovoltaica' : 'LGI Solar / Clean Energy' },
    { id: 'consulting', label: language === 'es' ? 'Consultoría Técnica de Alta Dirección' : 'Executive Technical Advisory' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const messageText = 
      `*NUEVA CONSULTA TÉCNICA - luisgalvan.me*\n\n` +
      `• *Nombre:* ${formData.name}\n` +
      `• *Correo:* ${formData.email}\n` +
      `• *Área de Interés:* ${formData.serviceInterest}\n` +
      `• *Detalles:* ${formData.message}\n`;

    // Open WhatsApp in parallel with the submission
    const whatsappUrl = `https://wa.me/573022687981?text=${encodeURIComponent(messageText)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      serviceInterest: 'LGI AI & Automatización',
      message: ''
    });
    setIsSubmitted(false);
  };

  return (
    <section id="contacto" className="py-24 px-6 md:px-12 lg:px-24 bg-[#0d0d11] relative border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 mb-6 backdrop-blur-sm">
            <Sparkles size={12} className="text-emerald-400" />
            <span>{language === 'es' ? 'Canales Directos de Comunicación' : 'Direct Communication Channels'}</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        {/* Dual Grid: Contact Details Cards + Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Access Cards & WhatsApp Quick CTA (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-4">
                {language === 'es' ? 'Perfiles & Enlaces Oficiales' : 'Profiles & Direct Links'}
              </h3>
              
              <div className="space-y-3">
                {contacts.map((contact, index) => (
                  <motion.a
                    key={index}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    transition={springSnappy}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-white/20 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2.5 bg-white/5 text-zinc-300 rounded-lg group-hover:text-white transition-colors shrink-0">
                        {contact.icon}
                      </div>
                      <div className="truncate">
                        <span className="block text-xs font-mono text-zinc-400">{contact.label}</span>
                        <span className="block text-sm font-medium text-zinc-200 group-hover:text-white transition-colors truncate">
                          {contact.value}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-zinc-400 group-hover:text-zinc-200 shrink-0 ml-2">
                      {contact.action} →
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Direct WhatsApp Callout Card */}
            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 text-left">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {language === 'es' ? '¿Prefieres atención inmediata?' : 'Need Immediate Assistance?'}
                  </h4>
                  <p className="text-xs text-zinc-400">
                    {language === 'es' ? 'Chat directo de alta prioridad con Luis' : 'Direct priority chat with Luis'}
                  </p>
                </div>
              </div>

              <a
                href="https://wa.me/573022687981?text=Hola%20Luis%20Carlos,%20me%20gustar%C3%ADa%20agendar%20una%20conversaci%C3%B3n%20t%C3%A9cnica."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 min-h-[44px] w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs font-mono tracking-wide transition-all shadow-lg shadow-emerald-950/40 cursor-pointer"
              >
                <span>{t('contact.directChat')}</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Full Interactive Contact Form (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm relative">
              
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success-banner"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={springSnappy}
                    className="text-center py-12 px-4 space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {t('contact.successTitle')}
                    </h3>
                    <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
                      {t('contact.successMessage')}
                    </p>
                    <div className="pt-4">
                      <button
                        onClick={handleReset}
                        className="min-h-[44px] px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono font-semibold transition-all cursor-pointer"
                      >
                        {t('contact.resetForm')}
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit}
                    className="space-y-5 text-left"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {/* Name & Title */}
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2">
                        {t('contact.name')} *
                      </label>
                      <input
                        id="contact-name"
                        required
                        type="text"
                        placeholder={language === 'es' ? 'Ej. Roberto Gómez — Director de Operaciones' : 'e.g. Robert Smith — Operations Director'}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full min-h-[44px] px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:border-white/30 focus:ring-1 focus:ring-white/30 focus:outline-none placeholder:text-zinc-600 font-sans"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2">
                        {t('contact.email')} *
                      </label>
                      <input
                        id="contact-email"
                        required
                        type="email"
                        placeholder="contacto@empresa.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full min-h-[44px] px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:border-white/30 focus:ring-1 focus:ring-white/30 focus:outline-none placeholder:text-zinc-600 font-sans"
                      />
                    </div>

                    {/* Service of Interest */}
                    <div>
                      <label htmlFor="contact-service" className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2">
                        {t('contact.serviceInterest')}
                      </label>
                      <select
                        id="contact-service"
                        value={formData.serviceInterest}
                        onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                        className="w-full min-h-[44px] px-4 py-3 rounded-xl bg-[#121217] border border-white/10 text-zinc-200 text-sm focus:border-white/30 focus:ring-1 focus:ring-white/30 focus:outline-none font-sans"
                      >
                        {serviceOptions.map((opt) => (
                          <option key={opt.id} value={opt.label} className="bg-[#121217] text-zinc-200">
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="contact-message" className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2">
                        {t('contact.message')} *
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={4}
                        placeholder={language === 'es' ? 'Describe los requerimientos, especificaciones o desafíos de tu organización...' : 'Describe your project scope, technical challenges, or requirements...'}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:border-white/30 focus:ring-1 focus:ring-white/30 focus:outline-none placeholder:text-zinc-600 font-sans resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        transition={springSnappy}
                        className="w-full min-h-[48px] px-6 py-3.5 rounded-xl bg-white text-zinc-950 font-semibold text-sm font-mono tracking-wide flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all cursor-pointer shadow-lg disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span>{t('contact.sending')}</span>
                        ) : (
                          <>
                            <span>{t('contact.send')}</span>
                            <Send size={15} />
                          </>
                        )}
                      </motion.button>
                      <p className="text-center text-xs text-zinc-400 mt-3 font-mono">
                        {language === 'es' ? 'Respuesta garantizada en menos de 24 horas hábiles.' : 'Guaranteed response within 24 business hours.'}
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
