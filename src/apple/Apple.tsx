import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion, useMotionValue, type Variants } from 'motion/react';
import { LINKS, path, type Lang } from '../story/content';
import { drawings, PlateDefs } from '../story/drawings';
import { caps, missions, type Mission } from '../space/data';
import { Count, DetailBody, labels, useOverlay } from '../shared/Detail';
import { BgVideo } from '../shared/BgVideo';
import './apple.css';

const ease = [0.25, 0.1, 0.25, 1] as const;
const up: Variants = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } };

const copy = {
  es: {
    nav: ['Proyectos', 'Robótica', 'Capacidades', 'Contacto'],
    eyebrow: 'Ingeniero civil y de sistemas · Universidad de los Andes',
    h1: 'Luis Carlos Galvan',
    sub: 'Software, datos e inteligencia artificial para infraestructura: monitoreo estructural, ciudades y robótica de inspección.',
    cta: 'Ver proyectos',
    cta2: 'Contacto',
    pause: 'Pausar video',
    play: 'Reproducir video',
    films: [
      { i: '01', eyebrow: 'Robótica de inspección', title: 'Robots humanoides entrenados para inspeccionar edificaciones', desc: 'Unitree G1 entrenado con aprendizaje por refuerzo en Isaac Lab: marcha, recuperación tras caídas y ensayos en una oficina fotorrealista.', id: 'robot' },
      { i: '02', eyebrow: 'Ciudad', title: 'Bogotá completa en 3D a partir de datos abiertos', desc: '1,77 millones de edificaciones, red de acueducto, arbolado y transporte integrados en un visor web con WebGL y WebGPU.', id: 'bogota3d' },
      { i: '03', eyebrow: 'Patrimonio y exposición sísmica', title: 'Fachadas caracterizadas desde fotografías de calle', desc: 'Segmentación y estimación de profundidad sobre imágenes de Mapillary para modelar fachadas edificio por edificio. Piloto en La Candelaria.', id: 'bogota3d' },
    ],
    between: ['De la robótica al modelo de ciudad', 'Del modelo de ciudad al edificio'],
    labTitle: 'Laboratorio de robótica.',
    labSub: 'Ensayos en simulación con el humanoide Unitree G1.',
    lab: [
      { k: 'escaleras', t: 'Escaleras', d: 'Ascenso y descenso de escalones de hasta 15 cm.' },
      { k: 'empujones', t: 'Robustez', d: 'Recuperación ante empujones laterales de 0,6 m/s.' },
      { k: 'levantarse', t: 'Recuperación', d: 'Incorporación autónoma después de una caída.' },
    ],
    sensors: 'Percepción: cámara RGB, profundidad de 0 a 6 m y LiDAR MID-360, sincronizados durante el recorrido.',
    projTitle: 'Proyectos.',
    projSub: 'Seleccione un proyecto para ver el detalle técnico.',
    numsTitle: 'En cifras.',
    capsTitle: 'Capacidades.',
    capsSub: 'Ingeniería civil e ingeniería de sistemas aplicadas a un mismo problema.',
    pathTitle: 'Trayectoria.',
    endTitle: 'Contacto.',
    endSub: 'Disponible para proyectos de consultoría, investigación y desarrollo.',
    mail: 'Enviar correo',
    more: 'Ver proyecto',
    lang: 'EN',
    langLabel: 'Ver en inglés',
    foot: 'Diseño y desarrollo: Luis Carlos Galvan. Bogotá, Colombia.',
  },
  en: {
    nav: ['Projects', 'Robotics', 'Capabilities', 'Contact'],
    eyebrow: 'Civil and systems engineer · Universidad de los Andes',
    h1: 'Luis Carlos Galvan',
    sub: 'Software, data and artificial intelligence for infrastructure: structural monitoring, cities and inspection robotics.',
    cta: 'View projects',
    cta2: 'Contact',
    pause: 'Pause video',
    play: 'Play video',
    films: [
      { i: '01', eyebrow: 'Inspection robotics', title: 'Humanoid robots trained to inspect buildings', desc: 'Unitree G1 trained with reinforcement learning in Isaac Lab: walking, fall recovery and tests in a photorealistic office.', id: 'robot' },
      { i: '02', eyebrow: 'City', title: 'All of Bogotá in 3D from open data', desc: '1.77 million buildings, water network, trees and transit integrated in a web viewer built on WebGL and WebGPU.', id: 'bogota3d' },
      { i: '03', eyebrow: 'Heritage and seismic exposure', title: 'Facades characterised from street-level photos', desc: 'Segmentation and depth estimation on Mapillary imagery to model facades building by building. Pilot in La Candelaria.', id: 'bogota3d' },
    ],
    between: ['From robotics to the city model', 'From the city model to the building'],
    labTitle: 'Robotics lab.',
    labSub: 'Simulation tests with the Unitree G1 humanoid.',
    lab: [
      { k: 'escaleras', t: 'Stairs', d: 'Climbing and descending steps up to 15 cm.' },
      { k: 'empujones', t: 'Robustness', d: 'Recovery from 0.6 m/s lateral pushes.' },
      { k: 'levantarse', t: 'Recovery', d: 'Autonomous stand-up after a fall.' },
    ],
    sensors: 'Perception: RGB camera, 0–6 m depth and MID-360 LiDAR, synchronised along the route.',
    projTitle: 'Projects.',
    projSub: 'Select a project to see the technical details.',
    numsTitle: 'By the numbers.',
    capsTitle: 'Capabilities.',
    capsSub: 'Civil and systems engineering applied to the same problem.',
    pathTitle: 'Path.',
    endTitle: 'Contact.',
    endSub: 'Available for consulting, research and development projects.',
    mail: 'Send email',
    more: 'View project',
    lang: 'ES',
    langLabel: 'Ver en español',
    foot: 'Design and development: Luis Carlos Galvan. Bogotá, Colombia.',
  },
};

const filmMedia = ['/media/bg/g1-levantarse', '/media/bg/bogota-vuelo', '/media/bg/bogota-fachadas'];

const nums = [
  { s: { value: 1.77, decimals: 2, suffix: ' M', label: { es: 'edificaciones en Bogotá 3D', en: 'buildings in Bogotá 3D' } }, span: 2, dark: true },
  { s: { value: 31343, label: { es: 'contratos ambientales cruzados con satélite', en: 'environmental contracts crossed with satellite data' } }, span: 1 },
  { s: { value: 389, label: { es: 'rutas SITP afectadas por el Metro L1', en: 'SITP routes affected by Metro L1' } }, span: 1 },
  { s: { value: 2.5, decimals: 1, suffix: ' m/s', label: { es: 'velocidad de carrera del G1 en simulación', en: 'G1 running speed in simulation' } }, span: 1, dark: true },
  { s: { value: 30, suffix: '+ kWp', label: { es: 'fotovoltaicos en Pailitas, Cesar', en: 'of photovoltaics in Pailitas, Cesar' } }, span: 1 },
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

  const ids = ['proyectos', 'robotica', 'capacidades', 'contacto'];
  const [heroPlay, setHeroPlay] = useState(true);
  const openId = (id: string) => setOpen(missions.findIndex((m) => m.c.id === id));

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
            <BgVideo src="/media/bg/g1-lobby.mp4" poster="/media/bg/g1-lobby.jpg" eager playing={heroPlay} />
            <div className="ap-scrim" />
            <div className="ap-hero-in">
              <motion.p className="ap-eyebrow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
                {t.eyebrow}
              </motion.p>
              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 0.1 }}>
                {t.h1}
              </motion.h1>
              <motion.p className="ap-sub" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.25 }}>
                {t.sub}
              </motion.p>
              <motion.div className="ap-ctas" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.45 }}>
                <a className="ap-pill ap-pill-w" href="#proyectos">
                  {t.cta}
                </a>
                <a className="ap-link ap-link-w" href="#contacto">
                  {t.cta2}
                </a>
              </motion.div>
            </div>
            <button className="ap-pp" onClick={() => setHeroPlay((v) => !v)} aria-label={heroPlay ? t.pause : t.play}>
              {heroPlay ? '❚❚' : '▶'}
            </button>
          </section>

          <div id="robotica">
            <Film lang={lang} n={0} onOpen={openId} />
            <RoboLab lang={lang} onOpen={() => openId('robot')} />
            <Between text={t.between[0]} />
            <Film lang={lang} n={1} onOpen={openId} />
            <Between text={t.between[1]} />
            <Film lang={lang} n={2} onOpen={openId} />
          </div>
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

function Head({ title, sub, dark }: { title: string; sub?: string; dark?: boolean }) {
  return (
    <motion.div className={`ap-head${dark ? ' ap-head-dark' : ''}`} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.6 }} variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
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

/* Pinned full-screen film chapter (SinergIA pattern): the video stays fixed while the copy scrolls over it. */
function Film({ lang, n, onOpen }: { lang: Lang; n: number; onOpen: (id: string) => void }) {
  const f = copy[lang].films[n];
  const base = filmMedia[n];
  return (
    <div className="ap-film">
      <div className="ap-film-pin">
        <BgVideo src={`${base}.mp4`} poster={`${base}.jpg`} />
        <div className="ap-film-scrim" />
        <div className="ap-film-top">
          <span>{f.i}</span>
          <i />
          <span>{f.eyebrow}</span>
        </div>
        <motion.div className="ap-film-copy" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: 0.6 }} transition={{ duration: 0.9, ease }}>
          <h2>{f.title}</h2>
          <p>{f.desc}</p>
          <button className="ap-link ap-link-w" onClick={() => onOpen(f.id)}>
            {copy[lang].more} ›
          </button>
        </motion.div>
      </div>
    </div>
  );
}

function Between({ text }: { text: string }) {
  return (
    <div className="ap-between">
      <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.8, ease }}>
        {text}
      </motion.h3>
    </div>
  );
}

function RoboLab({ lang, onOpen }: { lang: Lang; onOpen: () => void }) {
  const t = copy[lang];
  return (
    <section className="ap-lab">
      <Head title={t.labTitle} sub={t.labSub} dark />
      <div className="ap-lab-grid">
        {t.lab.map((c, i) => (
          <motion.figure key={c.k} className="ap-lab-cell" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease, delay: i * 0.08 }}>
            <div className="ap-lab-media">
              <BgVideo src={`/media/bg/g1-${c.k}.mp4`} poster={`/media/bg/g1-${c.k}.jpg`} />
            </div>
            <figcaption>
              <b>{c.t}</b>
              <span>{c.d}</span>
            </figcaption>
          </motion.figure>
        ))}
        <motion.figure className="ap-lab-cell ap-lab-wide" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease }}>
          <div className="ap-lab-media ap-lab-media-wide">
            <BgVideo src="/media/bg/g1-sensores.mp4" poster="/media/bg/g1-sensores.jpg" />
          </div>
          <figcaption>
            <span>{t.sensors}</span>
            <button className="ap-link ap-link-w" onClick={onOpen}>
              {t.more} ›
            </button>
          </figcaption>
        </motion.figure>
      </div>
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
