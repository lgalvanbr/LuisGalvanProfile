import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { 
  Sun, 
  BatteryCharging, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  Building2, 
  ArrowRight, 
  Radio, 
  Wrench, 
  FileCheck, 
  Cpu, 
  Layers, 
  Sparkles,
  Mail,
  Phone
} from 'lucide-react';
import HubNavbar from '../components/HubNavbar';
import CinematicShowcase from '../components/solar/CinematicShowcase';
import SolarCalculator from '../components/solar/SolarCalculator';
import WhatsAppButton from '../components/WhatsAppButton';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const springGentle = {
  type: "spring" as const,
  stiffness: 220,
  damping: 24,
  mass: 0.8,
};

export default function LgiSolar() {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const handleGeneralConsult = () => {
    const text = `*CONSULTA PROYECTO LGI SOLAR*\n\n` +
      `Hola Luis Galvan, deseo evaluar la viabilidad de un proyecto solar fotovoltaico para mi propiedad / empresa.\n\n` +
      `Por favor indícame los pasos para agendar una visita técnica o enviar mis facturas de energía.`;
    window.open(`https://wa.me/573022687981?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white selection:bg-[#ff1e42]/30 selection:text-white font-sans overflow-x-clip">
      
      {/* Navigation Hub */}
      <HubNavbar />

      {/* Dual Chapter Ultra-HD Cinematic Keynote Showcase */}
      <CinematicShowcase />

      {/* Engineering Pillars Bento Grid */}
      <section id="ingenieria-solar" className="py-24 px-6 md:px-12 lg:px-24 bg-[#08080c] relative border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium uppercase tracking-wider bg-rose-950/60 border border-rose-500/30 text-rose-300">
              <Sun className="w-3.5 h-3.5 text-[#ff1e42]" />
              {language === 'es' ? 'Ingeniería Fotovoltaica Tier-1' : 'Tier-1 Photovoltaic Engineering'}
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              {language === 'es' ? 'Tecnología Diseñada para Rendir 25+ Años' : 'Engineered for 25+ Years of Peak Performance'}
            </h2>
            <p className="text-slate-300 text-base md:text-lg">
              {language === 'es'
                ? 'No comercializamos kits genéricos. Diseñamos plantas solares a la medida con modelación de irradiación PVSyst, física estructural y telemetría IoT.'
                : 'Turnkey utility, commercial, and residential solar engineering. PVSyst simulation, structural wind analysis, and IoT telemetry.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Bento Card 1: Paneles Bifaciales TOPCon */}
            <div className="p-8 rounded-3xl bg-[#0e0f16] border border-slate-800 hover:border-rose-500/50 transition-all space-y-4 shadow-xl group">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-[#ff1e42] flex items-center justify-center">
                <Sun className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-rose-300 transition-colors">
                {language === 'es' ? 'Silicio Monocristalino Bifacial TOPCon' : 'Bifacial TOPCon Monocrystalline Cells'}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {language === 'es'
                  ? 'Captación de radiación por ambas caras de la celda. El albedo del suelo o techo reflectivo añade hasta un +25% de energía adicional sin ocupar más área.'
                  : 'Dual-sided photovoltaic absorption. Surface albedo provides up to +25% extra energy harvest without requiring additional mounting footprint.'}
              </p>
              <div className="pt-2 font-mono text-xs text-rose-400 flex items-center gap-4">
                <span>Eficiencia: &gt; 22.8%</span>
                <span>•</span>
                <span>Degradación: &lt; 0.4%/año</span>
              </div>
            </div>

            {/* Bento Card 2: Baterías LiFePO4 y Cero Apagones */}
            <div className="p-8 rounded-3xl bg-[#0e0f16] border border-slate-800 hover:border-rose-500/50 transition-all space-y-4 shadow-xl group">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-[#ff1e42] flex items-center justify-center">
                <BatteryCharging className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-rose-300 transition-colors">
                {language === 'es' ? 'Microredes Híbridas & Baterías LiFePO4' : 'Hybrid Microgrids & LiFePO4 Storage'}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {language === 'es'
                  ? 'Transferencia automática en menos de 10 milisegundos ante caídas de la red eléctrica pública. Sus servidores, maquinaria y hogares continúan encendidos sin parpadeos.'
                  : 'Ultra-fast transfer in under 10ms upon municipal grid failure. Zero flicker protection for industrial machinery, cold rooms, and IT infrastructure.'}
              </p>
              <div className="pt-2 font-mono text-xs text-rose-400 flex items-center gap-4">
                <span>Ciclos de Vida: &gt; 6,000</span>
                <span>•</span>
                <span>Transferencia: &lt; 10ms</span>
              </div>
            </div>

            {/* Bento Card 3: Bombeo Solar Agroindustrial */}
            <div className="p-8 rounded-3xl bg-[#0e0f16] border border-slate-800 hover:border-rose-500/50 transition-all space-y-4 shadow-xl group">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-[#ff1e42] flex items-center justify-center">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-rose-300 transition-colors">
                {language === 'es' ? 'Bombeo Solar Directo para Fincas & Pozos' : 'Direct Solar Water Pumping for Agriculture'}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {language === 'es'
                  ? 'Elimine el consumo de combustible diésel y el transporte de pipetas a zonas remotas. Extracción de agua a presión continua para sistemas de riego y abrevaderos con variadores solares.'
                  : 'Eliminate costly diesel generators and fuel logistics in rural areas. Continuous pressurized water pumping for automated crop irrigation and livestock wells.'}
              </p>
              <div className="pt-2 font-mono text-xs text-rose-400 flex items-center gap-4">
                <span>Ahorro Diésel: 100%</span>
                <span>•</span>
                <span>Pozos de hasta 200m</span>
              </div>
            </div>

            {/* Bento Card 4: Telemetría IoT LGI */}
            <div className="p-8 rounded-3xl bg-[#0e0f16] border border-slate-800 hover:border-rose-500/50 transition-all space-y-4 shadow-xl group">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-[#ff1e42] flex items-center justify-center">
                <Radio className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-rose-300 transition-colors">
                {language === 'es' ? 'Telemetría IoT String-by-String LGI' : 'LGI String-by-String IoT Telemetry'}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {language === 'es'
                  ? 'Monitoreo en la nube por microcontroladores industriales. Detección instantánea de suciedad en paneles, sombras o fallas en inversores con alertas directas a WhatsApp y correo.'
                  : 'Cloud-connected edge hardware analyzing voltage, current, and irradiance string-by-string. Instant alert notifications for soiling, shading, or inverter anomalies.'}
              </p>
              <div className="pt-2 font-mono text-xs text-rose-400 flex items-center gap-4">
                <span>Latencia: &lt; 500ms</span>
                <span>•</span>
                <span>Integración WhatsApp</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Interactive Sizing & ROI Calculator */}
      <SolarCalculator />

      {/* Fast Direct Consultation Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#050508] to-[#0d0e14] border-t border-white/5 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {language === 'es' ? '¿Listo para Evaluar la Viabilidad de tu Proyecto?' : 'Ready to Assess Your Solar Feasibility?'}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            {language === 'es'
              ? 'Envíanos tu última factura de energía o las coordenadas de tu predio. Luis Galvan y el equipo de ingeniería de LGI analizarán tu potencial solar sin costo inicial.'
              : 'Share your latest electric bill or project coordinates. Luis Galvan and the LGI engineering team will analyze your solar yield without upfront commitment.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <motion.button
              onClick={handleGeneralConsult}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="min-h-[50px] w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#ff1e42] via-rose-600 to-rose-700 text-white font-bold text-base flex items-center justify-center gap-2 shadow-xl shadow-rose-600/30 cursor-pointer"
            >
              <span>{language === 'es' ? 'Consultar Proyecto vía WhatsApp' : 'Consult Project via WhatsApp'}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <a
              href="mailto:cotizaciones@luisgalvan.me?subject=Cotizacion%20Proyecto%20Solar%20LGI"
              className="min-h-[50px] w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-base flex items-center justify-center gap-2 transition-colors"
            >
              <Mail className="w-4 h-4 text-rose-400" />
              <span>cotizaciones@luisgalvan.me</span>
            </a>
          </div>
        </div>
      </section>

      {/* Corporate Footer */}
      <footer className="py-12 px-6 border-t border-slate-800/80 bg-[#030305] text-slate-400 text-xs">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} LGI Solar & Engineering. Luis Galvan. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-6 font-mono text-[11px]">
            <Link to="/" className="hover:text-white transition-colors">Portafolio</Link>
            <Link to="/ia" className="hover:text-white transition-colors">LGI AI</Link>
            <Link to="/lgi" className="hover:text-white transition-colors">LGI Ingeniería</Link>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <WhatsAppButton />

    </div>
  );
}
