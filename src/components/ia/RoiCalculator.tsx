import { useState, useId } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { 
  Calculator, 
  DollarSign, 
  Clock, 
  Users, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  CheckCircle,
  Building2,
  Briefcase,
  Flame,
  Truck
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import SpotlightCard from '../ui/SpotlightCard';

const springSnappy = {
  type: "spring" as const,
  stiffness: 450,
  damping: 28,
};

const springGentle = {
  type: "spring" as const,
  stiffness: 220,
  damping: 24,
  mass: 0.8,
};

interface RoiCalculatorProps {
  onTransferData?: (data: { teamSize: number; hoursPerWeek: number; hourlyRate: number; currency: 'USD' | 'COP'; annualSavings: number }) => void;
}

export default function RoiCalculator({ onTransferData }: RoiCalculatorProps) {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  // IDs accesibles
  const teamId = useId();
  const hoursId = useId();
  const rateId = useId();

  // Parámetros de la calculadora
  const [teamSize, setTeamSize] = useState<number>(8);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(14);
  const [currency, setCurrency] = useState<'USD' | 'COP'>('USD');
  const [hourlyRateUSD, setHourlyRateUSD] = useState<number>(18);
  const [hourlyRateCOP, setHourlyRateCOP] = useState<number>(45000);

  const currentRate = currency === 'USD' ? hourlyRateUSD : hourlyRateCOP;

  // Fórmulas de cálculo
  const monthlyTotalHoursSpent = teamSize * hoursPerWeek * 4.33;
  const monthlyHoursSaved = Math.round(monthlyTotalHoursSpent * 0.75);
  const monthlyTraditionalCost = Math.round(monthlyTotalHoursSpent * currentRate);
  const monthlySavings = Math.round(monthlyHoursSaved * currentRate);
  const annualSavings = monthlySavings * 12;
  const capacityFTE = (monthlyHoursSaved / 160).toFixed(1); // 160 hrs = 1 Full Time Equivalent
  const traditionalAnnualCost = monthlyTraditionalCost * 12;
  const automatedAnnualCost = traditionalAnnualCost - annualSavings;

  const formatCurrency = (val: number) => {
    if (currency === 'USD') {
      return `$${val.toLocaleString('en-US')} USD`;
    }
    return `$${val.toLocaleString('es-CO')} COP`;
  };

  const applyPreset = (preset: { size: number; hours: number; usd: number; cop: number }) => {
    setTeamSize(preset.size);
    setHoursPerWeek(preset.hours);
    setHourlyRateUSD(preset.usd);
    setHourlyRateCOP(preset.cop);
  };

  const presets = [
    {
      label: language === 'es' ? 'Constructora / Obra' : 'Construction Firm',
      icon: <Building2 className="w-3.5 h-3.5 text-amber-400" />,
      size: 15,
      hours: 16,
      usd: 20,
      cop: 50000
    },
    {
      label: language === 'es' ? 'Estación Combustible' : 'Gas Station / Fuel',
      icon: <Flame className="w-3.5 h-3.5 text-rose-400" />,
      size: 8,
      hours: 12,
      usd: 14,
      cop: 35000
    },
    {
      label: language === 'es' ? 'Consultoría & Peritaje' : 'Audit & Consulting',
      icon: <Briefcase className="w-3.5 h-3.5 text-rose-400" />,
      size: 6,
      hours: 18,
      usd: 28,
      cop: 70000
    },
    {
      label: language === 'es' ? 'Distribución & Retail' : 'Logistics & Retail',
      icon: <Truck className="w-3.5 h-3.5 text-emerald-400" />,
      size: 22,
      hours: 14,
      usd: 15,
      cop: 38000
    }
  ];

  const handleExport = () => {
    if (onTransferData) {
      onTransferData({
        teamSize,
        hoursPerWeek,
        hourlyRate: currentRate,
        currency,
        annualSavings,
      });
    }
    const element = document.getElementById('cotizar');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="calculadora" className="py-24 bg-transparent relative overflow-hidden">
      {/* Glow ambiental: Sith Crimson laser */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-rose-600/10 blur-[120px] rounded-full"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header de la Calculadora */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-rose-500/30 text-rose-400 text-xs font-mono uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(244,63,94,0.2)]">
            <Calculator className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{language === 'es' ? 'Simulador de Retorno de Inversión' : 'ROI & Efficiency Simulator'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            {language === 'es' ? '¿Cuánto Dinero y Tiempo Pierde tu Equipo al Mes?' : 'How Much Time & Money is Your Team Losing Monthly?'}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
            {language === 'es'
              ? 'Ajusta los controles según tu operación actual o selecciona un perfil de industria para descubrir el impacto directo de automatizar el 75% de las tareas manuales.'
              : 'Tune the sliders or click an industry preset to discover the bottom-line impact of automating 75% of repetitive operational tasks.'}
          </p>

          {/* Quick Presets Ribbon */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <span className="text-xs font-mono text-slate-400 mr-1 hidden sm:inline">Presets:</span>
            {presets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => applyPreset(preset)}
                className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 hover:border-rose-500/40 text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                {preset.icon}
                <span>{preset.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Columna Izquierda: Parámetros y Sliders (7 cols) con SpotlightCard */}
          <SpotlightCard
            spotlightColor="rgba(244, 63, 94, 0.12)"
            borderColor="rgba(244, 63, 94, 0.3)"
            className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between"
          >
            <div className="space-y-8">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
                  {language === 'es' ? '1. Parámetros de tu Equipo' : '1. Team Parameters'}
                </span>
                {/* Selector de Moneda */}
                <div className="inline-flex rounded-lg bg-slate-950 p-1 border border-slate-800">
                  <button
                    onClick={() => setCurrency('USD')}
                    className={`min-h-[34px] px-3 rounded-md text-xs font-mono font-medium transition-all cursor-pointer ${
                      currency === 'USD' ? 'bg-gradient-to-r from-[#ff1e42] to-[#e11d48] text-white font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    USD ($)
                  </button>
                  <button
                    onClick={() => setCurrency('COP')}
                    className={`min-h-[34px] px-3 rounded-md text-xs font-mono font-medium transition-all cursor-pointer ${
                      currency === 'COP' ? 'bg-gradient-to-r from-[#ff1e42] to-[#e11d48] text-white font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    COP ($)
                  </button>
                </div>
              </div>

              {/* Slider 1: Colaboradores */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label htmlFor={teamId} className="flex items-center gap-2 text-sm font-medium text-slate-200">
                    <Users className="w-4 h-4 text-rose-400" aria-hidden="true" />
                    <span>{language === 'es' ? 'Colaboradores en operaciones / administración' : 'Team members in manual/admin tasks'}</span>
                  </label>
                  <span className="font-mono text-base font-bold text-rose-300 bg-rose-950/60 px-3 py-1 rounded-lg border border-rose-500/30">
                    {teamSize} {language === 'es' ? 'personas' : 'people'}
                  </span>
                </div>
                <input
                  id={teamId}
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  aria-valuemin={1}
                  aria-valuemax={50}
                  aria-valuenow={teamSize}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <div className="flex justify-between text-xs text-slate-400 font-mono">
                  <span>1 colaborador</span>
                  <span>25</span>
                  <span>50+ colaboradores</span>
                </div>
              </div>

              {/* Slider 2: Horas repetitivas por semana */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label htmlFor={hoursId} className="flex items-center gap-2 text-sm font-medium text-slate-200">
                    <Clock className="w-4 h-4 text-purple-400" aria-hidden="true" />
                    <span>{language === 'es' ? 'Horas semanales en tareas repetitivas por persona' : 'Weekly hours in repetitive tasks per person'}</span>
                  </label>
                  <span className="font-mono text-base font-bold text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-500/30">
                    {hoursPerWeek} hrs / sem
                  </span>
                </div>
                <input
                  id={hoursId}
                  type="range"
                  min="2"
                  max="35"
                  step="1"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                  aria-valuemin={2}
                  aria-valuemax={35}
                  aria-valuenow={hoursPerWeek}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <div className="flex justify-between text-xs text-slate-400 font-mono">
                  <span>2 hrs/sem (Mínimo)</span>
                  <span>18 hrs</span>
                  <span>35 hrs/sem (Crítico)</span>
                </div>
              </div>

              {/* Slider 3: Costo por hora */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label htmlFor={rateId} className="flex items-center gap-2 text-sm font-medium text-slate-200">
                    <DollarSign className="w-4 h-4 text-amber-400" aria-hidden="true" />
                    <span>{language === 'es' ? 'Costo por hora promedio / colaborador' : 'Average hourly cost / team member'}</span>
                  </label>
                  <span className="font-mono text-base font-bold text-amber-300 bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-500/30">
                    {currency === 'USD' ? `$${hourlyRateUSD} USD` : `$${hourlyRateCOP.toLocaleString('es-CO')} COP`} / hr
                  </span>
                </div>
                {currency === 'USD' ? (
                  <input
                    id={rateId}
                    type="range"
                    min="5"
                    max="60"
                    step="1"
                    value={hourlyRateUSD}
                    onChange={(e) => setHourlyRateUSD(Number(e.target.value))}
                    aria-valuemin={5}
                    aria-valuemax={60}
                    aria-valuenow={hourlyRateUSD}
                    className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                ) : (
                  <input
                    id={rateId}
                    type="range"
                    min="15000"
                    max="150000"
                    step="5000"
                    value={hourlyRateCOP}
                    onChange={(e) => setHourlyRateCOP(Number(e.target.value))}
                    aria-valuemin={15000}
                    aria-valuemax={150000}
                    aria-valuenow={hourlyRateCOP}
                    className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                )}
                <div className="flex justify-between text-xs text-slate-400 font-mono">
                  <span>{currency === 'USD' ? '$5' : '$15,000'}</span>
                  <span>{currency === 'USD' ? '$30' : '$80,000'}</span>
                  <span>{currency === 'USD' ? '$60+' : '$150,000+'}</span>
                </div>
              </div>

            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-rose-400 shrink-0" aria-hidden="true" />
              <span>
                {language === 'es'
                  ? 'Cálculo basado en una tasa de automatización estándar del 75% sobre tareas mecánicas identificadas.'
                  : 'Calculation based on an industry standard 75% automation capture rate on identified manual flows.'}
              </span>
            </div>
          </SpotlightCard>

          {/* Columna Derecha: Tarjeta de Resultados e Impacto Financiero con Comparador Visual */}
          <SpotlightCard
            spotlightColor="rgba(244, 63, 94, 0.18)"
            borderColor="rgba(244, 63, 94, 0.4)"
            className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-slate-950/90"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" aria-hidden="true" />
                  {language === 'es' ? 'Impacto Proyectado Estimado' : 'Projected Business Impact'}
                </span>
                <span className="text-xs bg-rose-950/80 text-rose-300 border border-rose-500/40 px-2.5 py-0.5 rounded font-mono font-semibold">
                  +75% RETORNO
                </span>
              </div>

              {/* Métrica 1: Horas ahorradas */}
              <div className="mb-6">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  {language === 'es' ? 'Horas de trabajo recuperadas al mes' : 'Monthly work hours recaptured'}
                </span>
                <div className="text-4xl sm:text-5xl font-extrabold font-mono text-white mt-1">
                  {monthlyHoursSaved.toLocaleString()} <span className="text-xl font-normal text-rose-400">hrs / mes</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  {language === 'es' 
                    ? `Equivalente a sumar +${capacityFTE} personas de tiempo completo a tu equipo.`
                    : `Equivalent to adding +${capacityFTE} full-time contributors to your team.`}
                </p>
              </div>

              {/* Visual Comparison Bar Chart */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3 mb-6">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  {language === 'es' ? 'Comparativo de Costo Anual' : 'Annual Cost Comparison'}
                </span>
                
                {/* Traditional Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-rose-300">{language === 'es' ? 'Proceso Manual' : 'Manual Cost'}</span>
                    <span className="text-slate-300">{formatCurrency(traditionalAnnualCost)}</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden">
                    <div className="h-full bg-rose-500/80 rounded-full w-full" />
                  </div>
                </div>

                {/* Automated Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-amber-400 font-semibold">{language === 'es' ? 'Con Agentes LGI AI' : 'With LGI AI Agents'}</span>
                    <span className="text-amber-400 font-semibold">{formatCurrency(automatedAnnualCost)}</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-[#ff1e42] to-amber-400 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.6)]" 
                      style={{ width: '25%' }}
                      animate={{ width: '25%' }}
                    />
                  </div>
                </div>
              </div>

              {/* Métrica 2: Ahorro financiero mensual y anual */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">{language === 'es' ? 'Ahorro mensual directo:' : 'Direct monthly savings:'}</span>
                  <span className="font-mono font-bold text-white text-base">{formatCurrency(monthlySavings)}</span>
                </div>
                <div className="h-px bg-slate-800 w-full" />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-300">{language === 'es' ? 'Ahorro anual neto:' : 'Net annual savings:'}</span>
                  <span className="font-mono font-extrabold text-rose-400 text-lg sm:text-xl">
                    {formatCurrency(annualSavings)}
                  </span>
                </div>
              </div>

              {/* Payback badge */}
              <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/20 text-xs text-rose-200 flex items-center justify-between mb-8">
                <span>{language === 'es' ? 'Tiempo estimado de amortización (Payback):' : 'Estimated payback timeline:'}</span>
                <span className="font-mono font-bold text-rose-300">30 a 60 días</span>
              </div>
            </div>

            {/* Botón de acción para transferir datos */}
            <motion.button
              onClick={handleExport}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={springSnappy}
              className="min-h-[48px] w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#ff1e42] via-[#e11d48] to-[#be123c] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-rose-500/30 transition-all focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-none cursor-pointer"
            >
              <span>{language === 'es' ? 'Aplicar estos Datos a mi Cotización' : 'Apply These Figures to My Quote'}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </motion.button>

          </SpotlightCard>

        </div>

      </div>
    </section>
  );
}
