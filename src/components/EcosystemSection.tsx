import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { HardHat, Bot, Sun, Radio, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const springGentle = {
  type: "spring" as const,
  stiffness: 260,
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
      icon: <Bot className="w-7 h-7 text-purple-400" />,
      href: '/ia',
      badge: language === 'es' ? 'División IA' : 'AI Division',
      buttonText: language === 'es' ? 'Explorar Soluciones IA' : 'Explore AI Solutions',
      borderColor: 'border-purple-500/25 hover:border-purple-400/80',
      bgHoverGradient: 'from-purple-950/30 via-[#130f1e] to-[#0e0d14]',
      iconBg: 'bg-purple-500/15 border-purple-500/30 text-purple-400',
      badgeStyle: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
      glowShadow: 'hover:shadow-[0_8px_30px_rgba(168,85,247,0.22)]',
      btnStyle: 'bg-purple-500/10 hover:bg-purple-600 text-purple-200 hover:text-white border-purple-500/30 hover:border-purple-500',
    },
    {
      id: 'engineering',
      title: t('ecosystem.units.engineering.title'),
      tag: t('ecosystem.units.engineering.tag'),
      desc: t('ecosystem.units.engineering.desc'),
      metrics: t('ecosystem.units.engineering.metrics'),
      icon: <HardHat className="w-7 h-7 text-cyan-400" />,
      href: '/lgi',
      badge: language === 'es' ? 'División Civil' : 'Civil Division',
      buttonText: language === 'es' ? 'Ver Servicios de Ingeniería' : 'View Engineering Services',
      borderColor: 'border-cyan-500/25 hover:border-cyan-400/80',
      bgHoverGradient: 'from-cyan-950/30 via-[#0d161e] to-[#0d0f14]',
      iconBg: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-400',
      badgeStyle: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
      glowShadow: 'hover:shadow-[0_8px_30px_rgba(6,182,212,0.22)]',
      btnStyle: 'bg-cyan-500/10 hover:bg-cyan-600 text-cyan-200 hover:text-white border-cyan-500/30 hover:border-cyan-500',
    },
    {
      id: 'solar',
      title: t('ecosystem.units.solar.title'),
      tag: t('ecosystem.units.solar.tag'),
      desc: t('ecosystem.units.solar.desc'),
      metrics: t('ecosystem.units.solar.metrics'),
      icon: <Sun className="w-7 h-7 text-amber-400" />,
      href: '/solar',
      badge: language === 'es' ? 'División Solar' : 'Solar Division',
      buttonText: language === 'es' ? 'Ver Keynote & Scrollytelling' : 'View Keynote & Scrollytelling',
      borderColor: 'border-amber-500/25 hover:border-amber-400/80',
      bgHoverGradient: 'from-amber-950/30 via-[#18140c] to-[#0e0e12]',
      iconBg: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
      badgeStyle: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      glowShadow: 'hover:shadow-[0_8px_30px_rgba(245,158,11,0.22)]',
      btnStyle: 'bg-amber-500/10 hover:bg-amber-600 text-amber-200 hover:text-white border-amber-500/30 hover:border-amber-500',
    },
    {
      id: 'iot',
      title: t('ecosystem.units.iot.title'),
      tag: t('ecosystem.units.iot.tag'),
      desc: t('ecosystem.units.iot.desc'),
      metrics: t('ecosystem.units.iot.metrics'),
      icon: <Radio className="w-7 h-7 text-emerald-400" />,
      href: '#iot',
      badge: language === 'es' ? 'División IoT' : 'IoT Division',
      buttonText: language === 'es' ? 'Ver Redes de Sensores' : 'View Sensor Networks',
      borderColor: 'border-emerald-500/25 hover:border-emerald-400/80',
      bgHoverGradient: 'from-emerald-950/30 via-[#0d1814] to-[#0d0f14]',
      iconBg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
      badgeStyle: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      glowShadow: 'hover:shadow-[0_8px_30px_rgba(16,185,129,0.22)]',
      btnStyle: 'bg-emerald-500/10 hover:bg-emerald-600 text-emerald-200 hover:text-white border-emerald-500/30 hover:border-emerald-500',
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
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium uppercase tracking-wider bg-white/[0.04] text-zinc-300 border border-white/10 mb-4">
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
              className={`rounded-2xl border ${unit.borderColor} bg-gradient-to-b ${unit.bgHoverGradient} relative overflow-hidden flex flex-col p-8 transition-all duration-300 group shadow-lg ${unit.glowShadow}`}
            >
              {/* Header con icono diferenciado y badge temático */}
              <div className="flex items-start justify-between mb-6 relative z-10">
                <div className={`p-3 rounded-xl ${unit.iconBg} border group-hover:scale-110 transition-transform duration-300 shadow-xs`}>
                  {unit.icon}
                </div>
                <span className={`text-[11px] font-mono uppercase px-2.5 py-1 rounded-full font-semibold border ${unit.badgeStyle}`}>
                  {unit.badge}
                </span>
              </div>

              {/* Content */}
              <div className="relative z-10 flex-1 flex flex-col">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2 block">
                  {unit.tag}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-zinc-100 transition-colors">
                  {unit.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1 font-normal">
                  {unit.desc}
                </p>

                {/* Metrics pill */}
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs font-mono text-zinc-300 mb-6">
                  {unit.metrics}
                </div>

                {/* CTA Link con altura táctil mínima de 44px */}
                {unit.href.startsWith('#') ? (
                  <a
                    href={`https://wa.me/573022687981?text=${encodeURIComponent(
                      language === 'es' 
                        ? 'Hola Luis, me gustaría cotizar una solución de telemetría y sensores IoT.' 
                        : 'Hi Luis, I would like to inquire about telemetry and IoT sensor networks.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-auto inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold border transition-all min-h-[44px] cursor-pointer ${unit.btnStyle}`}
                  >
                    <span>{unit.buttonText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                ) : (
                  <Link
                    to={unit.href}
                    className={`mt-auto inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold border transition-all min-h-[44px] cursor-pointer ${unit.btnStyle}`}
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
