import { motion } from 'motion/react';
import { Code2, HardHat, Cpu, Cloud, Database } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import profileImg from '../assets/profile.jpeg';

export default function About() {
  const { t } = useLanguage();
  const tools = [
    { name: 'Python', icon: <Code2 size={24} />, color: 'text-yellow-400' },
    { name: 'AWS', icon: <Cloud size={24} />, color: 'text-orange-500' },
    { name: 'C#', icon: <Code2 size={24} />, color: 'text-purple-500' },
    { name: 'C++', icon: <Code2 size={24} />, color: 'text-blue-500' },
    { name: 'IoT', icon: <Cpu size={24} />, color: 'text-green-400' },
  ];

  return (
    <section id="sobre-mi" className="py-24 px-6 md:px-12 lg:px-24 bg-dark-surface relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white">{t('about.title')}</h2>
            <div className="h-px bg-white/20 flex-1"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 text-lg text-text-light leading-relaxed">
              <p>
                {t('about.p1_1')}<span className="text-tech-blue font-semibold">{t('about.p1_2')}</span>{t('about.p1_3')}
              </p>
              <p>
                {t('about.p2_1')}<span className="text-neon-blue font-mono">{t('about.p2_2')}</span>{t('about.p2_3')}<span className="text-neon-blue font-mono">{t('about.p2_4')}</span>{t('about.p2_5')}
              </p>
              <p>
                {t('about.p3')}
              </p>
              
              <div className="pt-6 border-t border-white/10">
                <h3 className="text-sm font-mono text-tech-blue mb-4 uppercase tracking-wider">{t('about.stack')}</h3>
                <div className="flex flex-wrap gap-3">
                  {tools.map((tool, index) => (
                    <div key={index} className="flex items-center gap-2 bg-dark-bg border border-white/10 px-3 py-2 rounded-lg text-sm">
                      <span className={tool.color}>{tool.icon}</span>
                      <span>{tool.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative group">
              {/* Glowing Aura Effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-tech-blue via-neon-blue to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-700 group-hover:duration-300 z-0"></div>
              
              <div className="aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative z-10 bg-dark-bg transition-transform duration-500 group-hover:scale-[1.02]">
                <img 
                  src={profileImg} 
                  alt="Luis Carlos Galvan" 
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-transparent opacity-90 group-hover:opacity-20 transition-opacity duration-700"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="bg-tech-blue/20 backdrop-blur-md border border-tech-blue/30 p-4 rounded-xl shadow-[0_0_15px_rgba(0,123,255,0.3)]">
                    <p className="font-mono text-tech-blue text-sm mb-1">&gt; Status</p>
                    <p className="text-white font-medium">{t('about.status')}</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-tech-blue/20 rounded-full blur-2xl z-0 group-hover:bg-tech-blue/50 transition-colors duration-700"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-neon-blue/20 rounded-full blur-2xl z-0 group-hover:bg-neon-blue/50 transition-colors duration-700"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
