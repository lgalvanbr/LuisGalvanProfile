import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function WhatsAppButton() {
  const { language } = useLanguage();
  const phoneNumber = "573022687981";
  
  const message = language === 'es'
    ? "Hola Luis Carlos, me gustaría consultar contigo sobre un proyecto técnico."
    : "Hello Luis Carlos, I would like to discuss a technical project with you.";
    
  const tooltipText = language === 'es' ? "¡Hablemos!" : "Let's talk!";
  const ariaLabel = language === 'es' ? "Contactar a Luis por WhatsApp" : "Contact Luis via WhatsApp";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] hover:scale-110 hover:shadow-xl transition-all duration-300 flex items-center justify-center group focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
      aria-label={ariaLabel}
    >
      <MessageCircle size={26} />
      <span className="absolute right-full mr-3.5 bg-[#121217] text-white text-xs font-mono font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap border border-white/10 shadow-xl pointer-events-none">
        {tooltipText}
      </span>
    </a>
  );
}
