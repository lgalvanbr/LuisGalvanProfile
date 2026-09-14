import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Building2, Bot, Sun, Radio, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const springGentle = {
  type: "spring" as const,
  stiffness: 220,
  damping: 24,
  mass: 0.8,
};

export default function EcosystemSection() {
  const { t, language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const units = [
    {
      id: 'aiLabs',
      title: t('ecosystem.units.aiLabs.title'),
      tag: t('ecosystem.units.aiLabs.tag'),
      desc: t('ecosystem.units.aiLabs.desc'),
      metrics: t('ecosystem.units.aiLabs.metrics'),
      icon: <Bot className="w-7 h-7 text-zinc-200" />,
      href: '/ia',
      badge: language === 'es' ? 'División IA' : 'AI Division',
      isNew: true,
      buttonText: language === 'es' ? 'Explorar Soluciones IA' : 'Explore AI Solutions'
    },
    {
      id: 'engineering',
      title: t('ecosystem.units.engineering.title'),
      tag: t('ecosystem.units.engineering.tag'),
      desc: t('ecosystem.units.engineering.desc'),
      metrics: t('ecosystem.units.engineering.metrics'),
      icon: <Building2 className="w-7 h-7 text-zinc-200" />,
      href: '/lgi',
      badge: language === 'es' ? 'División Civil' : 'Civil Division',
      isNew: false,
      buttonText: language === 'es' ? 'Ver Servicios de Ingeniería' : 'View Engineering Services'
    },
    {
      id: 'iot',
      title: t('ecosystem.units.iot.title'),
      tag: t('ecosystem.units.iot.tag'),
      desc: t('ecosystem.units.iot.desc'),
      metrics: t('ecosystem.units.iot.metrics'),
      icon: <Radio className="w-7 h-7 text-zinc-200" />,
      href: '#iot',
      badge: language === 'es' ? 'División IoT' : 'IoT Division',
      isNew: true,
      buttonText: language === 'es' ? 'Ver Redes de Sensores' : 'View Sensor Networks'
    },
    {
      id: 'solar',
      title: t('ecosystem.units.solar.title'),
      tag: t('ecosystem.units.solar.tag'),
      desc: t('ecosystem.units.solar.desc'),
      metrics: t('ecosystem.units.solar.metrics'),
      icon: <Sun className="w-7 h-7 text-zinc-200" />,
      href: '/solar',
      badge: language === 'es' ? 'División Solar' : 'Solar Division',
      isNew: true,
      buttonText: language === 'es' ? 'Ver Keynote & Scrollytelling' : 'View Keynote & Scrollytelling'
    }
  ];

  return (
    <section id="ecosistema" className="py-24 px-6 md:px-12 lg:px-24 bg-[#0d0d11] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={springGentle}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium uppercase tracking-wider bg-white/[0.04] text-zinc-300 border border-white/10 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
            {language === 'es' ? 'Ecosistema de Soluciones' : 'Solutions Ecosystem'}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
            {t('ecosystem.title')}
          </h2>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-normal">
            {t('ecosystem.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {units.map((unit, index) => (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...springGentle, delay: index * 0.1 }}
              whileHover={{ y: shouldReduceMotion ? 0 : -6 }}
              className="rounded-2xl border border-white/10 hover:border-white/25 bg-[#13141a]/90 relative overflow-hidden flex flex-col p-8 transition-all duration-300 group shadow-lg"
            >
              {/* Sutil gradiente neutro de fondo */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-300" />

              {/* Header */}
              <div className="flex items-start justify-between mb-6 relative z-10">
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 group-hover:scale-105 transition-transform duration-300">
                  {unit.icon}
                </div>
                <span className="text-[11px] font-mono uppercase px-2.5 py-1 rounded-full font-medium bg-white/[0.04] text-zinc-300 border border-white/10">
                  {unit.badge}
                </span>
              </div>

              {/* Content */}
              <div className="relative z-10 flex-1 flex flex-col">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2 block">
                  {unit.tag}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-zinc-200 transition-colors">
                  {unit.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1 font-normal">
                  {unit.desc}
                </p>

                {/* Metrics pill */}
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs font-mono text-zinc-300 mb-6">
                  {unit.metrics}
                </div>

                {/* CTA Link */}
                {unit.href.startsWith('#') ? (
                  <a
                    href={`https://wa.me/573022687981?text=${encodeURIComponent(
                      language === 'es' 
                        ? 'Hola Luis, me gustaría cotizar un proyecto de energía solar.' 
                        : 'Hi Luis, I would like to inquire about a solar energy project.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/[0.05] hover:bg-white hover:text-zinc-950 text-white text-sm font-medium border border-white/10 hover:border-white transition-all min-h-[44px] cursor-pointer"
                  >
                    <span>{unit.buttonText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                ) : (
                  <Link
                    to={unit.href}
                    className="mt-auto inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/[0.05] hover:bg-white hover:text-zinc-950 text-white text-sm font-medium border border-white/10 hover:border-white transition-all min-h-[44px] cursor-pointer"
                  >
                    <span>{unit.buttonText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
