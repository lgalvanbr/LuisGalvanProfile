import CyberBackground from '../components/ui/CyberBackground';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import EcosystemSection from '../components/EcosystemSection';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import InteractiveSection from '../components/InteractiveSection';
import Contact from '../components/Contact';
import WhatsAppButton from '../components/WhatsAppButton';

import { useLanguage } from '../context/LanguageContext';

export default function Portfolio() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen text-text-light font-sans selection:bg-white/20 selection:text-white relative bg-[#0d0d11] overflow-x-clip">
      {/* Deep Atmospheric Cyber Background */}
      <CyberBackground />

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <EcosystemSection />
        <Projects />
        <Skills />
        <InteractiveSection />
        <Contact />
      </main>
      
      <footer className="relative z-10 py-10 border-t border-white/5 text-center text-sm text-zinc-400 font-mono bg-[#09090d]/80 backdrop-blur-md">
        <p>
          &copy; {new Date().getFullYear()} Luis Carlos Galvan · LGI Engineering & AI Technologies. {language === 'es' ? 'Diseñado con rigor y código.' : 'Built with engineering rigor & code.'}
        </p>
        <p className="text-xs text-zinc-500 mt-2">
          {language === 'es' 
            ? 'Doble Titulación Universidad de los Andes (Ing. Civil & Ing. de Sistemas)' 
            : 'Double Degree Universidad de los Andes (Civil & Systems Engineering)'}
        </p>
      </footer>
      
      <WhatsAppButton />
    </div>
  );
}
