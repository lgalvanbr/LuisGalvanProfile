import { AnimatePresence } from 'motion/react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import InteractiveSection from '../components/InteractiveSection';
import Contact from '../components/Contact';
import WhatsAppButton from '../components/WhatsAppButton';

export default function Portfolio() {
  return (
    <div className="bg-dark-bg min-h-screen text-text-light font-sans selection:bg-tech-blue selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <InteractiveSection />
        <Contact />
      </main>
      
      <footer className="bg-dark-bg py-8 border-t border-white/5 text-center text-sm text-text-muted font-mono">
        <p>&copy; {new Date().getFullYear()} Luis Carlos Galvan. Diseñado con precisión y código.</p>
      </footer>
      
      <WhatsAppButton />
    </div>
  );
}
