import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion, useMotionValue, useScroll, useTransform, type Variants } from 'motion/react';
import { LINKS, path, type Lang } from '../story/content';
import { drawings, PlateDefs } from '../story/drawings';
import { caps, missions, type Mission } from '../space/data';
import { Count, DetailBody, labels, useOverlay } from '../shared/Detail';
import './apple.css';

const ease = [0.25, 0.1, 0.25, 1] as const;
const up: Variants = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } };

const copy = {
  es: {
    nav: ['Proyectos', 'Capacidades', 'Trayectoria', 'Contacto'],
    eyebrow: 'Ingeniero civil y de sistemas',
    h1a: 'Infraestructura.',
    h1b: 'Ahora con software.',
    sub: 'Diseño sistemas que miden, modelan y vigilan obras, ciudades y territorio. Desde el sensor enterrado hasta el satélite.',
    cta: 'Ver proyectos',
    cta2: 'Escribirme',
    showTitle: 'Bogotá 3D.',
    showSub: 'La ciudad entera en el navegador, construida desde datos abiertos.',
    projTitle: 'Proyectos.',
    projSub: 'Toca cualquiera para ver cómo funciona.',
    numsTitle: 'En cifras.',
    capsTitle: 'Capacidades.',
    capsSub: 'Dos carreras, una forma de trabajar.',
    pathTitle: 'Del sensor al satélite.',
    endTitle: 'Hablemos.',
    endSub: '¿Una estructura que vigilar, una obra que medir, datos que nadie ha cruzado?',
    mail: 'Escribir un correo',
    more: 'Ver más',
    lang: 'EN',
    langLabel: 'Ver en inglés',
    foot: 'Diseñado y construido por Luis Carlos Galvan en Bogotá.',
  },
  en: {
    nav: ['Projects', 'Capabilities', 'Path', 'Contact'],
    eyebrow: 'Civil and systems engineer',
    h1a: 'Infrastructure.',
    h1b: 'Now with software.',
    sub: 'I design systems that measure, model and watch over construction sites, cities and land. From the buried sensor to the satellite.',
    cta: 'See projects',
    cta2: 'Write to me',
    showTitle: 'Bogotá 3D.',
    showSub: 'The whole city in the browser, built from open data.',
    projTitle: 'Projects.',
    projSub: 'Tap any of them to see how it works.',
    numsTitle: 'By the numbers.',
    capsTitle: 'Capabilities.',
    capsSub: 'Two degrees, one way of working.',
    pathTitle: 'From sensor to satellite.',
    endTitle: 'Let’s talk.',
    endSub: 'A structure to watch, a site to measure, data nobody has crossed yet?',
    mail: 'Send an email',
    more: 'Learn more',
    lang: 'ES',
    langLabel: 'Ver en español',
    foot: 'Designed and built by Luis Carlos Galvan in Bogotá.',
  },
};

const nums = [
  { s: { value: 1.77, decimals: 2, suffix: ' M', label: { es: 'edificaciones en Bogotá 3D', en: 'buildings in Bogotá 3D' } }, span: 2, dark: true },
  { s: { value: 31343, label: { es: 'contratos ambientales cruzados con satélite', en: 'environmental contracts crossed with satellite data' } }, span: 1 },
  { s: { value: 389, label: { es: 'rutas SITP afectadas por el Metro L1', en: 'SITP routes affected by Metro L1' } }, span: 1 },
  { s: { value: 2.5, decimals: 1, suffix: ' m/s', label: { es: 'corriendo, robot G1 en simulación', en: 'running, G1 robot in simulation' } }, span: 1, dark: true },
  { s: { value: 30, suffix: '+ kWp', label: { es: 'solares en Pailitas, Cesar', en: 'of solar in Pailitas, Cesar' } }, span: 1 },
];

export default function Apple() {
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
    document.body.classList.add('apple-body');
    try {
      localStorage.setItem('lang', lang);
    } catch {}
    return () => document.body.classList.remove('apple-body');
  }, [lang]);

  const ids = ['proyectos', 'capacidades', 'trayectoria', 'contacto'];

  return (
    <MotionConfig reducedMotion="user">
      <div className="ap">
        <PlateDefs />
        <header className="ap-nav">
          <div className="ap-nav-in">
            <a href="#top" className="ap-logo">
              Luis Carlos Galvan
            </a>
            <nav>
              {t.nav.map((n, i) => (
                <a key={n} href={`#${ids[i]}`}>
                  {n}
                </a>
              ))}
            </nav>
            <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} aria-label={t.langLabel}>
              {t.lang}
            </button>
          </div>
        </header>

        <main>
          <section className="ap-hero" id="top">
            <motion.p className="ap-eyebrow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
              {t.eyebrow}
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 0.1 }}>
              {t.h1a}
              <br />
              <span className="ap-grad">{t.h1b}</span>
            </motion.h1>
            <motion.p className="ap-sub" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.25 }}>
              {t.sub}
            </motion.p>
            <motion.div className="ap-ctas" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.45 }}>
              <a className="ap-pill" href="#proyectos">
                {t.cta}
              </a>
              <a className="ap-link" href="#contacto">
                {t.cta2}
              </a>
            </motion.div>
          </section>

          <Showcase lang={lang} onOpen={() => setOpen(missions.findIndex((m) => m.c.id === 'bogota3d'))} />

          <section className="ap-sec" id="proyectos">
            <Head title={t.projTitle} sub={t.projSub} />
            <Carousel lang={lang} onOpen={setOpen} />
          </section>

          <section className="ap-sec ap-gray">
            <Head title={t.numsTitle} />
            <motion.div className="ap-bento" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={{ show: { transition: { staggerChildren: 0.08 } } }}>
              {nums.map((n, i) => (
                <motion.div key={i} variants={up} className={`ap-num${n.dark ? ' dark' : ''}`} style={{ gridColumn: `span ${n.span}` }}>
                  <InViewCount s={n.s} lang={lang} />
                  <p>{n.s.label[lang]}</p>
                </motion.div>
              ))}
            </motion.div>
          </section>

          <section className="ap-sec" id="capacidades">
            <Head title={t.capsTitle} sub={t.capsSub} />
            <motion.div className="ap-caps" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={{ show: { transition: { staggerChildren: 0.07 } } }}>
              {caps.map((c) => (
                <motion.article key={c.id} variants={up}>
                  <h3>{c.name[lang]}</h3>
                  <p>{c.body[lang]}</p>
                  <small>{c.tools}</small>
                </motion.article>
              ))}
            </motion.div>
          </section>

          <section className="ap-sec ap-gray" id="trayectoria">
            <Head title={t.pathTitle} />
            <ol className="ap-path">
              {path.map((s, i) => (
                <motion.li key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.7, ease }}>
                  <span>{lang === 'en' && s.yearEn ? s.yearEn : s.year}</span>
                  <p>{s[lang]}</p>
                </motion.li>
              ))}
            </ol>
          </section>

          <section className="ap-end" id="contacto">
            <motion.h2 initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease }}>
              {t.endTitle}
            </motion.h2>
            <p className="ap-sub">{t.endSub}</p>
            <div className="ap-ctas">
              <a className="ap-pill" href={`mailto:${LINKS.email}`}>
                {t.mail}
              </a>
            </div>
            <p className="ap-mail">{LINKS.email}</p>
            <div className="ap-social">
              <a href={LINKS.linkedin} target="_blank" rel="noreferrer">
                LinkedIn ›
              </a>
              <a href={LINKS.github} target="_blank" rel="noreferrer">
                GitHub ›
              </a>
              <a href={LINKS.whatsapp} target="_blank" rel="noreferrer">
                WhatsApp ›
              </a>
              <a href="/lgi">LGI ›</a>
            </div>
          </section>
        </main>

        <footer className="ap-foot">
          <p>
            © {new Date().getFullYear()} {t.foot}
          </p>
        </footer>

        <AnimatePresence>{open !== null && <Modal key="m" index={open} lang={lang} onClose={() => setOpen(null)} onGo={setOpen} />}</AnimatePresence>
      </div>
    </MotionConfig>
  );
}

function Head({ title, sub }: { title: string; sub?: string }) {
  return (
    <motion.div className="ap-head" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.6 }} variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
      <motion.h2 variants={up}>{title}</motion.h2>
      {sub && <motion.p variants={up}>{sub}</motion.p>}
    </motion.div>
  );
}

function InViewCount({ s, lang }: { s: Parameters<typeof Count>[0]['s']; lang: Lang }) {
  const ref = useRef<HTMLDivElement>(null);
  const [go, setGo] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setGo(true), { threshold: 0.6 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className="ap-big">{go ? <Count s={s} lang={lang} delay={0} /> : ' '}</div>;
}

/* Video that grows into the viewport as you scroll, Apple product-page style. */
function Showcase({ lang, onOpen }: { lang: Lang; onOpen: () => void }) {
  const t = copy[lang];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.82, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [48, 22]);
  const vid = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.3 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <section className="ap-show" ref={ref}>
      <motion.div className="ap-show-frame" style={{ scale, borderRadius: radius }}>
        <video ref={vid} src="/media/bogota-3d.mp4" poster="/media/bogota-3d.jpg" muted loop playsInline preload="metadata" aria-label="Bogotá 3D" />
      </motion.div>
      <motion.div className="ap-show-cap" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.8 }} variants={up}>
        <h2>{t.showTitle}</h2>
        <p>{t.showSub}</p>
        <button className="ap-link" onClick={onOpen}>
          {t.more} ›
        </button>
      </motion.div>
    </section>
  );
}

function Carousel({ lang, onOpen }: { lang: Lang; onOpen: (i: number) => void }) {
  const track = useRef<HTMLUListElement>(null);
  const [at, setAt] = useState({ start: true, end: false });
  const onScroll = () => {
    const el = track.current!;
    setAt({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  };
  const step = (d: number) => {
    const el = track.current!;
    const card = el.querySelector('li') as HTMLElement;
    el.scrollBy({ left: d * (card.offsetWidth + 20), behavior: 'smooth' });
  };
  return (
    <div className="ap-car">
      <ul className="ap-track" ref={track} onScroll={onScroll}>
        {missions.map((m, i) => (
          <Card key={m.c.id} m={m} lang={lang} onOpen={() => onOpen(i)} />
        ))}
      </ul>
      <div className="ap-car-nav">
        <button onClick={() => step(-1)} disabled={at.start} aria-label={labels[lang].prev}>
          ‹
        </button>
        <button onClick={() => step(1)} disabled={at.end} aria-label={labels[lang].next}>
          ›
        </button>
      </div>
    </div>
  );
}

function Card({ m, lang, onOpen }: { m: Mission; lang: Lang; onOpen: () => void }) {
  const p = useMotionValue(1);
  const Drawing = drawings[m.c.drawing];
  const media = m.c.media;
  const img = media?.kind === 'video' ? media.poster : media?.kind === 'compare' ? media.after?.src : media?.src;
  return (
    <motion.li initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease }}>
      <button className="ap-card" onClick={onOpen} aria-label={`${m.name}: ${m.line[lang]}`}>
        <span className="ap-card-txt">
          <small>{m.c.place[lang]}</small>
          <b>{m.name}</b>
          <span>{m.line[lang]}</span>
        </span>
        <span className="ap-card-media">
          {img ? (
            <img src={img} alt="" loading="lazy" />
          ) : (
            <span className="ap-card-sheet">
              <Drawing p={p} />
            </span>
          )}
        </span>
        <span className="ap-plus" aria-hidden="true">
          +
        </span>
      </button>
    </motion.li>
  );
}

function Modal({ index, lang, onClose, onGo }: { index: number; lang: Lang; onClose: () => void; onGo: (i: number) => void }) {
  const m = missions[index];
  const closeRef = useRef<HTMLButtonElement>(null);
  const go = useCallback((d: number) => onGo((index + d + missions.length) % missions.length), [index, onGo]);
  useOverlay(onClose, go, closeRef);
  const t = labels[lang];
  return (
    <motion.div className="ap-modal-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        className="ap-modal"
        role="dialog"
        aria-modal="true"
        aria-label={m.name}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      >
        <div className="ap-modal-bar">
          <button onClick={() => go(-1)} aria-label={t.prev}>
            ‹
          </button>
          <button onClick={() => go(1)} aria-label={t.next}>
            ›
          </button>
          <button ref={closeRef} onClick={onClose} className="ap-x" aria-label={t.close}>
            ✕
          </button>
        </div>
        <div className="ap-modal-body" key={m.c.id}>
          <DetailBody m={m} lang={lang} />
        </div>
      </motion.div>
    </motion.div>
  );
}
