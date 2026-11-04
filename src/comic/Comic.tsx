import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion, useMotionValue, animate } from 'motion/react';
import profileImg from '../assets/profile.jpeg';
import { LINKS, type Lang } from '../story/content';
import { drawings, PlateDefs } from '../story/drawings';
import { caps, missions, type Mission } from '../space/data';
import { DetailBody, labels, useOverlay } from '../shared/Detail';
import './comic.css';

// Category tag shown on each panel.
const sfx: Record<string, string> = {
  tanque: 'IoT',
  sismo: 'Sismo',
  vision: 'Visión',
  gemelo: 'AR',
  solar: 'Energía',
  bogota3d: '3D',
  buses: 'Movilidad',
  corpocesar: 'Satélite',
  robot: 'Robótica',
};

// Page layout: which panels are wide/tall, to break the grid like a real comic page.
const size: Record<string, string> = {
  sismo: 'wide',
  bogota3d: 'tall',
  corpocesar: 'wide',
  robot: 'wide',
};

const copy = {
  es: {
    issue: 'Portafolio profesional · Bogotá, 2026',
    title: 'Luis Carlos Galvan',
    subtitle: 'Ingeniería civil y de sistemas',
    bubble: 'Desarrollo software, datos e inteligencia artificial para medir, modelar y monitorear infraestructura.',
    caption: 'Universidad de los Andes · Investigador y consultor (LGI)',
    burst: '2026',
    pageTitle: 'Proyectos',
    pageHint: 'Seleccione un proyecto para ver el detalle técnico.',
    powersTitle: 'Capacidades',
    endTitle: 'Contacto',
    endBubble: 'Disponible para proyectos de consultoría, investigación y desarrollo.',
    lang: 'EN',
    langLabel: 'Ver en inglés',
    foot: 'Diseño y desarrollo: Luis Carlos Galvan.',
    read: 'Ver',
  },
  en: {
    issue: 'Professional portfolio · Bogotá, 2026',
    title: 'Luis Carlos Galvan',
    subtitle: 'Civil and systems engineering',
    bubble: 'I develop software, data and artificial intelligence to measure, model and monitor infrastructure.',
    caption: 'Universidad de los Andes · Researcher and consultant (LGI)',
    burst: '2026',
    pageTitle: 'Projects',
    pageHint: 'Select a project to see the technical details.',
    powersTitle: 'Capabilities',
    endTitle: 'Contact',
    endBubble: 'Available for consulting, research and development projects.',
    lang: 'ES',
    langLabel: 'Ver en español',
    foot: 'Design and development: Luis Carlos Galvan.',
    read: 'View',
  },
};

const pop = { type: 'spring', stiffness: 380, damping: 16 } as const;

export default function Comic() {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const s = localStorage.getItem('lang');
      if (s === 'es' || s === 'en') return s;
    } catch {}
    return 'es';
  });
  const [open, setOpen] = useState<number | null>(null);
  const t = copy[lang];
  useEffect(() => {
    document.documentElement.lang = lang;
    document.body.classList.add('comic-body');
    try {
      localStorage.setItem('lang', lang);
    } catch {}
    return () => document.body.classList.remove('comic-body');
  }, [lang]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="cx">
        <PlateDefs />
        <header className="cx-mast">
          <span className="cx-issue">{t.issue}</span>
          <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} aria-label={t.langLabel}>
            {t.lang}
          </button>
        </header>

        <main>
          <section className="cx-cover">
            <motion.div className="cx-title" initial={{ y: -40, rotate: -4, opacity: 0 }} animate={{ y: 0, rotate: -2, opacity: 1 }} transition={pop}>
              <h1>{t.title}</h1>
              <p>{t.subtitle}</p>
            </motion.div>

            <motion.figure className="cx-hero panel" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ ...pop, delay: 0.15 }}>
              <img src={profileImg} alt={lang === 'es' ? 'Luis Carlos Galvan en el laboratorio de suelos' : 'Luis Carlos Galvan in the soils lab'} />
              <motion.span className="cx-cap" initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ ...pop, delay: 0.5 }}>
                {t.caption}
              </motion.span>
              <motion.span className="cx-bubble cx-bubble-hero" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ ...pop, delay: 0.8 }}>
                {t.bubble}
              </motion.span>
              <motion.span className="cx-burst" initial={{ scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: 12 }} transition={{ ...pop, delay: 1.1 }}>
                {t.burst}
              </motion.span>
            </motion.figure>
          </section>

          <section className="cx-page">
            <h2 className="cx-h2">
              <span>{t.pageTitle}</span>
            </h2>
            <p className="cx-hint">{t.pageHint}</p>
            <div className="cx-grid">
              {missions.map((m, i) => (
                <Panel key={m.c.id} m={m} lang={lang} onOpen={() => setOpen(i)} />
              ))}
            </div>
          </section>

          <section className="cx-page">
            <h2 className="cx-h2">
              <span>{t.powersTitle}</span>
            </h2>
            <div className="cx-powers">
              {caps.map((c, i) => (
                <motion.article
                  key={c.id}
                  className="cx-card"
                  initial={{ y: 40, rotate: 0, opacity: 0 }}
                  whileInView={{ y: 0, rotate: i % 2 ? 2 : -2, opacity: 1 }}
                  whileHover={{ rotate: 0, y: -6, scale: 1.03 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ ...pop, delay: i * 0.06 }}
                >
                  <span className="cx-card-n">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{c.name[lang]}</h3>
                  <p>{c.body[lang]}</p>
                  <small>{c.tools}</small>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="cx-end">
            <motion.div className="cx-end-panel panel" initial={{ scale: 0.92, rotate: -1, opacity: 0 }} whileInView={{ scale: 1, rotate: 0, opacity: 1 }} viewport={{ once: true, amount: 0.4 }} transition={pop}>
              <h2>{t.endTitle}</h2>
              <span className="cx-bubble">{t.endBubble}</span>
              <a className="cx-mail" href={`mailto:${LINKS.email}`}>
                {LINKS.email}
              </a>
              <div className="cx-links">
                <a href={LINKS.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <a href={LINKS.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
                <a href={LINKS.whatsapp} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </section>
        </main>

        <footer className="cx-foot">
          © {new Date().getFullYear()} {t.foot}
        </footer>

        <AnimatePresence>{open !== null && <Page key="p" index={open} lang={lang} onClose={() => setOpen(null)} onGo={setOpen} />}</AnimatePresence>
      </div>
    </MotionConfig>
  );
}

function Panel({ m, lang, onOpen }: { m: Mission; lang: Lang; onOpen: () => void }) {
  const p = useMotionValue(0);
  const ref = useRef<HTMLButtonElement>(null);
  const Drawing = drawings[m.c.drawing];
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!seen) return;
    const a = animate(p, 1, { duration: 2.2, ease: 'easeInOut' });
    return () => a.stop();
  }, [seen, p]);
  return (
    <motion.button
      ref={ref}
      className={`cx-panel panel ${size[m.c.id] ?? ''}`}
      onClick={onOpen}
      initial={{ opacity: 0, y: 30, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => setSeen(true)}
      viewport={{ once: true, amount: 0.35 }}
      whileHover={{ scale: 1.02, rotate: -0.6 }}
      whileTap={{ scale: 0.98 }}
      transition={pop}
      aria-label={`${m.name}: ${m.line[lang]}`}
    >
      <span className="cx-panel-cap">{m.name}</span>
      <span className="cx-panel-art">
        <Drawing p={p} />
      </span>
      <motion.span className="cx-sfx" initial={{ scale: 0, rotate: -20 }} animate={seen ? { scale: 1, rotate: -8 } : {}} transition={{ ...pop, delay: 0.4 }}>
        {sfx[m.c.id]}
      </motion.span>
      <span className="cx-bubble cx-bubble-panel">{m.line[lang]}</span>
    </motion.button>
  );
}

function Page({ index, lang, onClose, onGo }: { index: number; lang: Lang; onClose: () => void; onGo: (i: number) => void }) {
  const m = missions[index];
  const closeRef = useRef<HTMLButtonElement>(null);
  const go = useCallback((d: number) => onGo((index + d + missions.length) % missions.length), [index, onGo]);
  useOverlay(onClose, go, closeRef);
  const t = labels[lang];
  return (
    <motion.div className="cx-veil" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        className="cx-sheet panel"
        role="dialog"
        aria-modal="true"
        aria-label={m.name}
        onClick={(e) => e.stopPropagation()}
        initial={{ rotate: -6, scale: 0.85, y: 60, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, y: 0, opacity: 1 }}
        exit={{ rotate: 4, scale: 0.9, y: 40, opacity: 0 }}
        transition={pop}
      >
        <div className="cx-sheet-bar">
          <span className="cx-sfx cx-sfx-static">{sfx[m.c.id]}</span>
          <div>
            <button onClick={() => go(-1)} aria-label={t.prev}>
              ◀
            </button>
            <button onClick={() => go(1)} aria-label={t.next}>
              ▶
            </button>
            <button ref={closeRef} onClick={onClose} aria-label={t.close}>
              ✕
            </button>
          </div>
        </div>
        <div className="cx-sheet-body" key={m.c.id}>
          <DetailBody m={m} lang={lang} />
        </div>
      </motion.div>
    </motion.div>
  );
}
