import { useState } from 'react';
import { motion } from 'motion/react';
import { Building2, Cpu, Activity, Code2, Layers, Map, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import WhatsAppButton from '../components/WhatsAppButton';
import HubNavbar from '../components/HubNavbar';
import EngineeringCinematicShowcase from '../components/engineering/EngineeringCinematicShowcase';
import logoImg from '../assets/logo.jpeg';

export default function LGI() {
  const { t, language } = useLanguage();

  const services = [
    {
      icon: <Building2 size={32} className="text-tech-blue" />,
      title: t('lgi.services.s1.title'),
      desc: t('lgi.services.s1.desc'),
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop"
    },
    {
      icon: <Cpu size={32} className="text-neon-blue" />,
      title: t('lgi.services.s2.title'),
      desc: t('lgi.services.s2.desc'),
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop"
    },
    {
      icon: <Activity size={32} className="text-purple-500" />,
      title: t('lgi.services.s3.title'),
      desc: t('lgi.services.s3.desc'),
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
    },
    {
      icon: <Code2 size={32} className="text-orange-500" />,
      title: t('lgi.services.s4.title'),
      desc: t('lgi.services.s4.desc'),
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"
    },
    {
      icon: <Layers size={32} className="text-green-500" />,
      title: t('lgi.services.s5.title'),
      desc: t('lgi.services.s5.desc'),
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop"
    },
    {
      icon: <Map size={32} className="text-yellow-500" />,
      title: t('lgi.services.s6.title'),
      desc: t('lgi.services.s6.desc'),
      image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=800&auto=format&fit=crop"
    }
  ];

  const [quoteForm, setQuoteForm] = useState({
    name: '',
    service: 'Gemelos Digitales',
    details: ''
  });

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = language === 'es'
      ? `Hola LGI Ingeniería, soy ${quoteForm.name}. Me interesa el servicio de: ${quoteForm.service}. Detalles: ${quoteForm.details}`
      : `Hello LGI Engineering, I am ${quoteForm.name}. I am interested in: ${quoteForm.service}. Details: ${quoteForm.details}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/573022687981?text=${encodedText}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-[#0a0a0e] min-h-screen text-slate-300 font-sans selection:bg-white/20 selection:text-white overflow-x-clip">
      {/* Universal LGI Hub Navbar */}
      <HubNavbar />

      <main>
        {/* Hero Section */}
        <section id="lgi-hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0e] via-[#0a0a0e]/80 to-[#0a0a0e]"></div>
          
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img src={logoImg} alt="LGI Ingeniería Logo" className="h-28 md:h-36 w-auto mx-auto rounded-2xl mb-8 border border-white/10 shadow-2xl object-contain filter grayscale hover:grayscale-0 transition-all duration-300" />
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 text-white">
                {t('lgi.hero.title')}
              </h1>
              <h2 className="text-xl sm:text-2xl font-mono text-zinc-300 mb-8 font-normal">
                {t('lgi.hero.subtitle')}
              </h2>
              <p className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                {t('lgi.hero.description')}
              </p>
              
              <a
                href="#lgi-services"
                className="inline-flex items-center gap-2 px-8 py-4 bg-tech-blue hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,123,255,0.4)] text-lg"
              >
                {t('lgi.hero.cta')}
              </a>
            </motion.div>
          </div>

          <motion.div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown size={32} />
          </motion.div>
        </section>

        {/* Dual Chapter Ultra-HD Drone & IoT Cinematic Keynote Showcase */}
        <EngineeringCinematicShowcase />

        {/* Services Section */}
        <section id="lgi-services" className="py-24 px-6 md:px-12 lg:px-24 bg-slate-800/50 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{t('lgi.services.title')}</h2>
              <div className="w-24 h-1 bg-tech-blue mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-900 rounded-2xl border border-white/5 hover:border-tech-blue/30 transition-colors group overflow-hidden flex flex-col"
                >
                  <div className="h-48 w-full overflow-hidden relative">
                    <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-transparent transition-colors z-10"></div>
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="mb-6 p-3 bg-slate-800 rounded-xl inline-block w-fit group-hover:scale-110 transition-transform shadow-lg">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                    <p className="text-slate-400 leading-relaxed text-base flex-1">
                      {service.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About LGI Section */}
        <section id="lgi-about" className="py-24 px-6 md:px-12 lg:px-24 bg-slate-900 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 p-12 rounded-3xl border border-white/10 shadow-2xl"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t('lgi.about.title')}</h2>
              <p className="text-xl text-slate-300 leading-relaxed">
                {t('lgi.about.desc')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact / Quote Section */}
        <section id="lgi-contact" className="py-24 px-6 md:px-12 lg:px-24 bg-slate-800 relative">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{t('lgi.quote.title')}</h2>
                <p className="text-xl text-slate-400 mb-10">
                  {t('lgi.quote.desc')}
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-slate-300">
                    <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-tech-blue">
                      <Building2 size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">LGI Ingeniería</h4>
                      <p className="text-sm">Bogotá, Colombia</p>
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-slate-900 p-8 rounded-2xl border border-white/10 shadow-2xl"
              >
                <form onSubmit={handleQuoteSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2">{t('lgi.quote.form.name')}</label>
                    <input 
                      type="text" 
                      required
                      value={quoteForm.name}
                      onChange={(e) => setQuoteForm({...quoteForm, name: e.target.value})}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-colors"
                      placeholder={language === 'es' ? 'Ej. Roberto Gómez / Constructora XYZ' : 'e.g. Robert Smith / XYZ Construction'}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2">{t('lgi.quote.form.service')}</label>
                    <select 
                      value={quoteForm.service}
                      onChange={(e) => setQuoteForm({...quoteForm, service: e.target.value})}
                      className="w-full bg-[#121217] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-colors"
                    >
                      <option value="Gemelos Digitales">{language === 'es' ? 'Gemelos Digitales (Digital Twins)' : 'Digital Twins'}</option>
                      <option value="Sistemas IoT & Telemetría">{language === 'es' ? 'Sistemas IoT & Telemetría Industrial' : 'Industrial IoT & Telemetry'}</option>
                      <option value="Data Science & Machine Learning">Data Science & Machine Learning</option>
                      <option value="Arquitectura de Software">{language === 'es' ? 'Arquitectura de Software a Medida (AEC)' : 'Custom AEC Software'}</option>
                      <option value="Automatización BIM">{language === 'es' ? 'Automatización BIM & Scripts Revit' : 'BIM Automation & Scripts'}</option>
                      <option value="Smart Cities">{language === 'es' ? 'Infraestructura Inteligente (Smart Cities)' : 'Smart Infrastructure'}</option>
                      <option value="Otro">{language === 'es' ? 'Otro' : 'Other'}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2">{t('lgi.quote.form.details')}</label>
                    <textarea 
                      required
                      value={quoteForm.details}
                      onChange={(e) => setQuoteForm({...quoteForm, details: e.target.value})}
                      rows={4}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-colors resize-none"
                      placeholder={language === 'es' ? 'Describe brevemente tu proyecto o necesidad técnica...' : 'Briefly describe your project scope or technical requirements...'}
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-white hover:bg-zinc-200 text-zinc-950 font-bold font-mono text-sm py-4 rounded-xl transition-all shadow-lg cursor-pointer"
                  >
                    {t('lgi.quote.form.submit')}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 py-12 border-t border-white/5 text-center text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <img src={logoImg} alt="LGI Logo" className="h-8 w-auto rounded-sm grayscale hover:grayscale-0 transition-all" />
            <span className="font-bold text-white">LGI Ingeniería</span>
          </div>
          <p>&copy; {new Date().getFullYear()} LGI Ingeniería. Todos los derechos reservados.</p>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
}
