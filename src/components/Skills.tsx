import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const skills = [
    { name: t('skills.s1'), level: 95, color: "bg-white" },
    { name: t('skills.s2'), level: 90, color: "bg-zinc-300" },
    { name: t('skills.s3'), level: 85, color: "bg-zinc-400" },
    { name: t('skills.s4'), level: 90, color: "bg-zinc-200" },
    { name: t('skills.s5'), level: 85, color: "bg-emerald-400" },
    { name: t('skills.s6'), level: 85, color: "bg-zinc-300" }
  ];

  return (
    <section id="habilidades" className="py-24 px-6 md:px-12 lg:px-24 bg-[#0d0d11] relative border-t border-white/5">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{t('skills.title')}</h2>
            <div className="h-px bg-white/15 flex-1"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between items-center text-xs sm:text-sm font-mono">
                  <span className="text-zinc-200 font-medium">{skill.name}</span>
                  <span className="text-zinc-400 font-semibold">{skill.level}%</span>
                </div>
                <div className="h-2 w-full bg-white/[0.05] rounded-full overflow-hidden border border-white/10">
                  <motion.div
                    className={`h-full ${skill.color} rounded-full`}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1.2, delay: index * 0.08, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
