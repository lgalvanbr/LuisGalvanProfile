import { motion } from 'motion/react';
import { Code2, HardHat, Cpu, Cloud, Database } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import profileImg from '../assets/profile.jpeg';

export default function About() {
  const { t } = useLanguage();
  const tools = [
    { name: 'Python', icon: <Code2 size={20} />, color: 'text-zinc-300' },
    { name: 'AWS', icon: <Cloud size={20} />, color: 'text-zinc-300' },
    { name: 'C#', icon: <Code2 size={20} />, color: 'text-zinc-300' },
    { name: 'C++', icon: <Code2 size={20} />, color: 'text-zinc-300' },
    { name: 'IoT', icon: <Cpu size={20} />, color: 'text-zinc-300' },
  ];

  return (
    <section id="sobre-mi" className="py-24 px-6 md:px-12 lg:px-24 bg-[#0d0d11] relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{t('about.title')}</h2>
            <div className="h-px bg-white/15 flex-1"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
              <p>
                {t('about.p1_1')}<span className="text-white font-medium">{t('about.p1_2')}</span>{t('about.p1_3')}
              </p>
              <p>
                {t('about.p2_1')}<span className="text-white font-medium">{t('about.p2_2')}</span>{t('about.p2_3')}<span className="text-white font-medium">{t('about.p2_4')}</span>{t('about.p2_5')}
              </p>
              <p className="text-zinc-400">
                {t('about.p3')}
              </p>
              
              <div className="pt-6 border-t border-white/10">
                <h3 className="text-xs font-mono text-zinc-400 mb-4 uppercase tracking-wider">{t('about.stack')}</h3>
                <div className="flex flex-wrap gap-2.5">
                  {tools.map((tool, index) => (
                    <div key={index} className="flex items-center gap-2 bg-white/[0.04] border border-white/10 px-3.5 py-2 rounded-lg text-xs font-mono text-zinc-300">
                      <span className={tool.color}>{tool.icon}</span>
                      <span>{tool.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative group">
              {/* Sutil aura neutra y sobria */}
              <div className="absolute -inset-1 bg-gradient-to-b from-white/10 to-transparent rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500 z-0"></div>
              
              <div className="aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative z-10 bg-[#14141a] transition-transform duration-500 group-hover:scale-[1.01]">
                <img 
                  src={profileImg} 
                  alt="Luis Carlos Galvan" 
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d11] via-[#0d0d11]/30 to-transparent opacity-85 group-hover:opacity-25 transition-opacity duration-700"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="bg-[#101116]/90 backdrop-blur-md border border-white/15 p-4 rounded-xl shadow-lg">
                    <p className="font-mono text-zinc-400 text-xs mb-1 uppercase tracking-wider">&gt; Status</p>
                    <p className="text-white font-medium text-sm sm:text-base">{t('about.status')}</p>
                  </div>
                </div>
              </div>
              
              {/* Elementos de ambientación neutros */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/[0.03] rounded-full blur-2xl z-0"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/[0.02] rounded-full blur-2xl z-0"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
