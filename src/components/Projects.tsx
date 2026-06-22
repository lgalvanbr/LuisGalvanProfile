import { motion } from 'motion/react';
import { Camera, Activity, Glasses, ExternalLink, Github, Cpu } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import simulationImg from '../assets/simulation.jpeg';

export default function Projects() {
  const { t } = useLanguage();
  const projects = [
    {
      title: t('projects.p1.title'),
      description: t('projects.p1.desc'),
      icon: <Glasses size={32} className="text-tech-blue" />,
      tags: ["Unity 3D", "C#", "Simulación", "Digital Twin"],
      type: t('projects.p1.type'),
      image: simulationImg
    },
    {
      title: t('projects.p2.title'),
      description: t('projects.p2.desc'),
      icon: <Activity size={32} className="text-neon-blue" />,
      tags: ["Python", "Machine Learning", "Data Analysis", "Dashboards"],
      type: t('projects.p2.type'),
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: t('projects.p3.title'),
      description: t('projects.p3.desc'),
      icon: <Cpu size={32} className="text-purple-500" />,
      tags: ["ESP32", "IoT", "Hardware", "Cloud Dashboards"],
      type: t('projects.p3.type'),
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <section id="proyectos" className="py-24 px-6 md:px-12 lg:px-24 bg-dark-bg relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white">{t('projects.title')}</h2>
            <div className="h-px bg-white/20 flex-1"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-dark-surface rounded-2xl overflow-hidden border border-white/10 hover:border-tech-blue/50 transition-all duration-300 shadow-lg hover:shadow-[0_10px_30px_rgba(0,123,255,0.15)] flex flex-col h-full"
              >
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-dark-bg/60 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 z-20 bg-dark-bg/80 backdrop-blur-sm p-2 rounded-lg border border-white/10">
                    {project.icon}
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <span className="text-xs font-mono text-tech-blue uppercase tracking-wider mb-2 block">
                    {project.type}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-tech-blue transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-text-muted text-sm mb-6 flex-1">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="text-xs font-mono px-2 py-1 bg-white/5 text-text-light rounded border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-tech-blue/30 rounded-2xl pointer-events-none transition-colors duration-300"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
