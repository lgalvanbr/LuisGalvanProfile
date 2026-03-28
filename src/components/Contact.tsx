import { motion } from 'motion/react';
import { Linkedin, Github, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const contacts = [
    {
      icon: <Linkedin size={24} />,
      label: "LinkedIn",
      value: "linkedin.com/in/luiscarlosgalvan",
      href: "https://linkedin.com/in/luiscarlosgalvan",
      color: "hover:text-blue-500 hover:border-blue-500"
    },
    {
      icon: <Github size={24} />,
      label: "GitHub",
      value: "github.com/luiscarlosgalvan",
      href: "https://github.com/luiscarlosgalvan",
      color: "hover:text-white hover:border-white"
    },
    {
      icon: <Mail size={24} />,
      label: "Email",
      value: "luiskagalvan@gmail.com",
      href: "mailto:luiskagalvan@gmail.com",
      color: "hover:text-red-500 hover:border-red-500"
    },
    {
      icon: <MapPin size={24} />,
      label: t('contact.location').split(',')[0],
      value: t('contact.location'),
      href: "#",
      color: "hover:text-green-500 hover:border-green-500"
    }
  ];

  return (
    <section id="contacto" className="py-24 px-6 md:px-12 lg:px-24 bg-dark-surface relative border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{t('contact.title')}</h2>
          <p className="text-lg text-text-muted mb-16 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contacts.map((contact, index) => (
              <motion.a
                key={index}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.02 }}
                className={`flex items-center gap-4 p-6 bg-dark-bg rounded-2xl border border-white/10 transition-all duration-300 group ${contact.color}`}
              >
                <div className="p-4 bg-white/5 rounded-full text-text-muted group-hover:text-inherit transition-colors">
                  {contact.icon}
                </div>
                <div className="text-left">
                  <span className="block text-sm font-mono text-text-muted mb-1">{contact.label}</span>
                  <span className="block font-medium text-white group-hover:text-inherit transition-colors">{contact.value}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
