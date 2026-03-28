import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = "573022687981";
  const message = "Hola Luis Carlos, me gustaría hablar contigo sobre un proyecto.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] hover:scale-110 hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={28} />
      <span className="absolute right-full mr-4 bg-dark-surface text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-white/10 shadow-lg pointer-events-none">
        ¡Hablemos!
      </span>
    </a>
  );
}
