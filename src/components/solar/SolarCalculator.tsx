import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Calculator, Sun, DollarSign, Leaf, Zap, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const springSnappy = {
  type: "spring" as const,
  stiffness: 300,
  damping: 25,
};

export default function SolarCalculator() {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  // Monthly electricity bill in COP (default: 800,000 COP ~ $200 USD)
  const [billCOP, setBillCOP] = useState(1200000);
  const [propertyType, setPropertyType] = useState<'residential' | 'commercial' | 'agro'>('residential');

  // Constants for engineering estimates in Colombia / LatAm (average COP/kWh ~ $950)
  const TARIFF_PER_KWH = 950;
  const MONTHLY_KWH = billCOP / TARIFF_PER_KWH;
  
  // Sizing: 1 kWp produces approx 130 kWh/month in sunny regions (HSP ~ 4.3 kWh/m2/day)
  const REQUIRED_KWP = Math.max(1.5, Math.round((MONTHLY_KWH / 130) * 10) / 10);
  const PANEL_COUNT = Math.ceil((REQUIRED_KWP * 1000) / 580); // 580W TOPCon Bifacial panels

  // Economics
  const MONTHLY_SAVINGS = Math.round(billCOP * 0.88);
  const ANNUAL_SAVINGS = MONTHLY_SAVINGS * 12;
  
  // Turnkey installed system cost estimate (~ 3,800,000 COP per kWp installed with tier-1 hardware)
  const ESTIMATED_SYSTEM_COST = Math.round(REQUIRED_KWP * 3900000);
  const PAYBACK_YEARS = Math.max(2.8, Math.round((ESTIMATED_SYSTEM_COST / ANNUAL_SAVINGS) * 10) / 10);
  const CO2_TONS_PER_YEAR = Math.round((MONTHLY_KWH * 12 * 0.000164) * 10) / 10;

  const handleConsultQuote = () => {
    const text = `*SOLICITUD DE DIMENSIONAMIENTO SOLAR LGI*\n\n` +
      `• *Tipo de Proyecto:* ${propertyType.toUpperCase()}\n` +
      `• *Factura Mensual Actual:* $${billCOP.toLocaleString('es-CO')} COP\n` +
      `• *Consumo Estimado:* ${Math.round(MONTHLY_KWH)} kWh/mes\n` +
      `• *Capacidad Sugerida:* ${REQUIRED_KWP} kWp (~${PANEL_COUNT} paneles de 580W)\n` +
      `• *Ahorro Proyectado:* $${ANNUAL_SAVINGS.toLocaleString('es-CO')} COP/año\n` +
      `• *Retorno Estimado:* ${PAYBACK_YEARS} años\n\n` +
      `Deseo agendar una visita técnica de viabilidad o recibir cotización formal.`;

    window.open(`https://wa.me/573022687981?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="calculadora-solar" className="py-24 bg-[#050508] relative border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-mono uppercase tracking-wider mb-4 shadow-sm shadow-rose-950/50">
            <Calculator className="w-3.5 h-3.5 text-[#ff1e42]" aria-hidden="true" />
            {language === 'es' ? 'Simulador Financiero & Retorno de Inversión' : 'Financial Simulator & ROI'}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            {language === 'es' ? 'Calcula el Retorno de tu Planta Solar' : 'Calculate Your Solar Plant ROI'}
          </h2>
          <p className="text-base text-slate-300">
            {language === 'es'
              ? 'Estima la potencia requerida en paneles, el ahorro mensual y los años exactos para recuperar el 100% de la inversión.'
              : 'Estimate required system capacity, monthly utility savings, and exact payback timeline with Tier-1 engineering.'}
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Interactive Sliders & Presets */}
          <div className="lg:col-span-6 bg-[#0c0d12] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xl">
            
            {/* Property Type Toggle */}
            <div className="space-y-3">
              <label className="block text-xs font-mono uppercase text-slate-400">
                {language === 'es' ? '1. Tipo de Instalación' : '1. Installation Profile'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'residential', label: language === 'es' ? 'Residencial' : 'Residential', preset: 800000 },
                  { id: 'commercial', label: language === 'es' ? 'Comercial' : 'Commercial', preset: 3500000 },
                  { id: 'agro', label: language === 'es' ? 'Agro / Finca' : 'Agro / Farm', preset: 6000000 },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                      setPropertyType(type.id as any);
                      setBillCOP(type.preset);
                    }}
                    className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center ${
                      propertyType === type.id
                        ? 'bg-rose-950/70 border-rose-500 text-white shadow-md shadow-rose-950/50'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider Factura Mensual */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-white flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'es' ? 'Factura Mensual Promedio:' : 'Average Monthly Electric Bill:'}</span>
                </label>
                <span className="font-mono text-lg font-bold text-white bg-slate-900 px-3 py-1 rounded-xl border border-slate-800">
                  ${billCOP.toLocaleString('es-CO')} COP
                </span>
              </div>

              <input
                type="range"
                min="300000"
                max="25000000"
                step="100000"
                value={billCOP}
                onChange={(e) => setBillCOP(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#ff1e42]"
              />

              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>$300k COP</span>
                <span>$10M COP</span>
                <span>$25M+ COP</span>
              </div>
            </div>

            {/* Hardware Specification Highlights */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2.5 font-mono text-xs text-slate-300">
              <div className="flex items-center gap-2 text-rose-400 font-semibold">
                <Sun className="w-4 h-4" />
                <span>{language === 'es' ? 'Especificación Técnica LGI Solar' : 'LGI Solar Engineering Spec'}</span>
              </div>
              <div className="flex justify-between">
                <span>{language === 'es' ? 'Tecnología de Paneles:' : 'Panel Technology:'}</span>
                <span className="text-white font-medium">Bifacial N-Type TOPCon 580W</span>
              </div>
              <div className="flex justify-between">
                <span>{language === 'es' ? 'Inversores Certificados:' : 'Certified Inverters:'}</span>
                <span className="text-white font-medium">Growatt / Deye / Huawei Tier-1</span>
              </div>
              <div className="flex justify-between">
                <span>{language === 'es' ? 'Garantía de Rendimiento:' : 'Power Warranty:'}</span>
                <span className="text-emerald-400 font-medium">{language === 'es' ? '25 Años al 85%' : '25 Years at 85%'}</span>
              </div>
            </div>

          </div>

          {/* Right: Results Cards & CTA */}
          <div className="lg:col-span-6 bg-gradient-to-b from-[#13141c] to-[#0c0d12] border border-rose-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            
            {/* Subtle radial glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-rose-400">
                {language === 'es' ? 'Diagnóstico Energético Estimado' : 'Estimated Energy Assessment'}
              </span>
              <h3 className="text-2xl font-bold text-white">
                {language === 'es' ? 'Impacto Financiero de la Planta' : 'System Financial Impact'}
              </h3>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 font-mono">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                <span className="text-[11px] text-slate-400 block">{language === 'es' ? 'Ahorro Anual Proyectado' : 'Projected Annual Savings'}</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-400 block">
                  ${(ANNUAL_SAVINGS / 1000000).toFixed(1)}M <span className="text-xs text-slate-400">COP</span>
                </span>
                <span className="text-[10px] text-emerald-300">~88% factura actual</span>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                <span className="text-[11px] text-slate-400 block">{language === 'es' ? 'Tiempo de Retorno (ROI)' : 'Payback Period'}</span>
                <span className="text-xl sm:text-2xl font-black text-white block">
                  {PAYBACK_YEARS} <span className="text-xs text-slate-400">{language === 'es' ? 'Años' : 'Years'}</span>
                </span>
                <span className="text-[10px] text-slate-400">{language === 'es' ? '20+ años energía neta gratis' : '20+ yrs pure profit'}</span>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                <span className="text-[11px] text-slate-400 block">{language === 'es' ? 'Capacidad de Planta' : 'System Sizing'}</span>
                <span className="text-xl sm:text-2xl font-black text-amber-400 block">
                  {REQUIRED_KWP} <span className="text-xs text-slate-400">kWp</span>
                </span>
                <span className="text-[10px] text-slate-400">~{PANEL_COUNT} paneles fotovoltaicos</span>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                <span className="text-[11px] text-slate-400 block">{language === 'es' ? 'CO2 Evitado al Año' : 'Annual CO2 Mitigated'}</span>
                <span className="text-xl sm:text-2xl font-black text-teal-300 block">
                  {CO2_TONS_PER_YEAR} <span className="text-xs text-slate-400">Ton</span>
                </span>
                <span className="text-[10px] text-slate-400">Equivalente a {(CO2_TONS_PER_YEAR * 45).toFixed(0)} árboles</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <motion.button
                onClick={handleConsultQuote}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={springSnappy}
                className="min-h-[50px] w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#ff1e42] via-rose-600 to-rose-700 text-white font-bold text-base flex items-center justify-center gap-2 shadow-xl shadow-rose-600/30 hover:shadow-rose-600/50 cursor-pointer focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:outline-none"
              >
                <span>{language === 'es' ? 'Solicitar Propuesta de Ingeniería con este Diagnóstico' : 'Request Engineering Proposal with this Scope'}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              <p className="text-center text-xs text-slate-400 mt-2.5">
                {language === 'es'
                  ? 'Revisión técnica directa con Luis Galvan • cotizaciones@luisgalvan.me'
                  : 'Direct engineering review with Luis Galvan • cotizaciones@luisgalvan.me'}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
