import { useEffect, useRef, useState } from 'react';
import {
  MotionConfig,
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from 'motion/react';
import profileImg from '../assets/profile.jpeg';
import { LINKS, chapters, more, path, tools, ui, type Case, type Lang, type Media, type Stat } from './content';
import { drawings, CityDrawing } from './drawings';
import './story.css';

const ease = [0.16, 1, 0.3, 1] as const;
const snappy = { type: 'spring', stiffness: 450, damping: 32, mass: 0.8 } as const;
const roman = ['I', 'II', 'III', 'IV', 'V', 'VI'];

const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const allCases = chapters.flatMap((c) => c.cases);

export default function Story() {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem('lang');
      if (saved === 'es' || saved === 'en') return saved;
    } catch {}
    return 'es';
  });
  const t = ui[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.body.classList.add('story-body');
    try {
      localStorage.setItem('lang', lang);
    } catch {}
    return () => document.body.classList.remove('story-body');
  }, [lang]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="story">
        <a className="skip" href="#casos">
          {t.nav.cases}
        </a>
        <ScrollBar />
        <Header lang={lang} setLang={setLang} />
        <main>
          <Hero lang={lang} />
          <Method lang={lang} />
          <section id="casos" aria-label={t.nav.cases}>
            {chapters.map((ch, i) => (
              <div key={ch.id} className="chapter">
                <ChapterHead index={i} title={ch.title[lang]} intro={ch.intro[lang]} />
                {ch.cases.map((c) => (
                  <CaseBlock key={c.id} c={c} lang={lang} n={allCases.indexOf(c) + 1} flip={allCases.indexOf(c) % 2 === 1} />
                ))}
              </div>
            ))}
          </section>
          <CaseRail lang={lang} />
          <Path lang={lang} />
          <Tools lang={lang} />
          <More lang={lang} />
          <Contact lang={lang} />
        </main>
        <footer className="foot">
          <p>
            © {new Date().getFullYear()} {t.footer}
          </p>
        </footer>
      </div>
    </MotionConfig>
  );
}

/* ---------- chrome ---------- */

function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.4 });
  return <motion.div className="scrollbar" style={{ scaleX }} aria-hidden="true" />;
}

function Header({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const t = ui[lang];
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240);
    setSolid(y > 20);
  });
  const items = [
    ['#casos', t.nav.cases],
    ['#trayectoria', t.nav.path],
    ['#herramientas', t.nav.tools],
    ['#contacto', t.nav.contact],
  ];
  const [hover, setHover] = useState<string | null>(null);
  return (
    <motion.header
      className={`bar${solid ? ' bar-solid' : ''}`}
      animate={{ y: hidden ? '-110%' : '0%' }}
      transition={{ duration: 0.35, ease }}
    >
      <a href="#top" className="bar-id">
        <span className="bar-mark" aria-hidden="true">
          <i />
          <i />
        </span>
        Luis Carlos Galván
      </a>
      <nav className="bar-nav" aria-label="Secciones" onMouseLeave={() => setHover(null)}>
        {items.map(([href, label]) => (
          <a key={href} href={href} onMouseEnter={() => setHover(href)}>
            {hover === href && <motion.span layoutId="nav-hover" className="nav-hover" transition={snappy} />}
            <span>{label}</span>
          </a>
        ))}
      </nav>
      <motion.button
        className="bar-lang"
        onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
        aria-label={t.langLabel}
        whileTap={{ scale: 0.95 }}
      >
        {t.lang}
      </motion.button>
    </motion.header>
  );
}

/* ---------- hero ---------- */

function Words({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(' ');
  return (
    <motion.span
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.025, delayChildren: delay } } }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="word"
          variants={{ hidden: { opacity: 0, y: '0.5em', filter: 'blur(4px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease } } }}
        >
          {w}{' '}
        </motion.span>
      ))}
    </motion.span>
  );
}

function Hero({ lang }: { lang: Lang }) {
  const t = ui[lang];
  const [layer, setLayer] = useState<'phys' | 'dig'>('phys');
  const p = useMotionValue(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const id = setTimeout(() => setLayer('dig'), 1400);
    return () => clearTimeout(id);
  }, []);
  useEffect(() => {
    const c = animate(p, layer === 'dig' ? 1 : 0, { duration: reduce ? 0 : layer === 'dig' ? 2.4 : 0.6, ease: layer === 'dig' ? 'easeInOut' : 'easeOut' });
    return () => c.stop();
  }, [layer, p, reduce]);

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <section className="hero" id="top" ref={ref}>
      <motion.div className="hero-text" style={{ opacity: fade }}>
        <h1 className="hero-name">
          {['Luis Carlos', 'Galván'].map((line, i) => (
            <span className="line-mask" key={line}>
              <motion.span
                className="line"
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease, delay: 0.1 + i * 0.12 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p className="hero-role" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}>
          {t.role}
        </motion.p>
        <p className="hero-lede">
          <Words text={t.lede} delay={0.55} />
        </p>
        <motion.div className="hero-actions" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 1.1 } } }}>
          <motion.a variants={rise} className="btn btn-primary" href="#casos" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
            {t.ctaCases}
          </motion.a>
          <motion.a variants={rise} className="btn" href="#contacto" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
            {t.ctaContact}
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.figure
        className="hero-plate"
        style={{ y }}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease, delay: 0.25 }}
      >
        <div className="plate-head">
          <div className="seg" role="radiogroup" aria-label="Capa">
            {(['phys', 'dig'] as const).map((k) => (
              <button key={k} role="radio" aria-checked={layer === k} onClick={() => setLayer(k)} className={layer === k ? 'on' : ''}>
                {layer === k && <motion.span layoutId="seg-pill" className="seg-pill" transition={snappy} />}
                <span>{k === 'phys' ? t.layerPhysical : t.layerDigital}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="plate-draw">
          <CityDrawing p={p} />
        </div>
        <figcaption>{t.layerHint}</figcaption>
      </motion.figure>
    </section>
  );
}

/* ---------- method ---------- */

function Method({ lang }: { lang: Lang }) {
  const t = ui[lang];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.6'] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  return (
    <section className="method" ref={ref}>
      <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.6 }} variants={rise}>
        {t.methodTitle}
      </motion.h2>
      <div className="method-track">
        <motion.span className="method-line" style={{ scaleX: line }} aria-hidden="true" />
        <motion.ol initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger}>
          {t.method.map((m, i) => (
            <motion.li key={m.t} variants={rise}>
              <span className="method-n tnum">{i + 1}</span>
              <h3>{m.t}</h3>
              <p>{m.d}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}

/* ---------- chapters & cases ---------- */

function ChapterHead({ index, title, intro }: { index: number; title: string; intro: string }) {
  return (
    <motion.header
      className="chapter-head"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      variants={stagger}
    >
      <motion.span className="chapter-n" variants={rise} aria-hidden="true">
        {roman[index]}
      </motion.span>
      <div>
        <h2 className="line-mask">
          <motion.span className="line" variants={{ hidden: { y: '105%' }, show: { y: 0, transition: { duration: 0.8, ease } } }}>
            {title}
          </motion.span>
        </h2>
        <motion.p variants={rise}>{intro}</motion.p>
      </div>
    </motion.header>
  );
}

function CaseBlock({ c, lang, n, flip }: { c: Case; lang: Lang; n: number; flip: boolean }) {
  const t = ui[lang];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.85'] });
  const raw = useTransform(scrollYProgress, [0, 0.55], [0, 1]);
  const p = useSpring(raw, { stiffness: 90, damping: 22, mass: 0.6 });
  const Drawing = drawings[c.drawing];

  return (
    <article id={`caso-${c.id}`} ref={ref} className={`case${flip ? ' case-flip' : ''}`} aria-labelledby={`h-${c.id}`}>
      <div className="case-plate">
        <div className="plate sticky-plate">
          <div className="plate-meta">
            <span className="tnum">
              {t.caseOf} {String(n).padStart(2, '0')}
            </span>
            <PlateLegend p={p} lang={lang} />
          </div>
          <Drawing p={p} />
        </div>
      </div>

      <motion.div className="case-body" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.12 }} variants={stagger}>
        <motion.p className="case-place" variants={rise}>
          {c.place[lang]}
        </motion.p>
        <motion.p className="case-label" variants={rise}>
          {t.problem}
        </motion.p>
        <motion.h3 id={`h-${c.id}`} className="case-problem" variants={rise}>
          {c.problem[lang]}
        </motion.h3>
        <motion.p className="prose" variants={rise}>
          {c.context[lang]}
        </motion.p>

        <motion.p className="case-label case-label-mk" variants={rise}>
          {t.built}
        </motion.p>
        <motion.p className="prose" variants={rise}>
          {c.built[lang]}
        </motion.p>

        <motion.ol className="how" variants={stagger}>
          {c.how.map((h, i) => (
            <motion.li key={i} variants={rise}>
              <span className="tnum">{i + 1}</span>
              {h[lang]}
            </motion.li>
          ))}
        </motion.ol>

        {c.stats && (
          <motion.dl className={`stats stats-n${c.stats.length}`} variants={stagger}>
            {c.stats.map((s, i) => (
              <motion.div key={i} variants={rise}>
                <dt>{s.label[lang]}</dt>
                <dd>
                  <Counter s={s} lang={lang} />
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        )}

        {c.media && <MediaBlock m={c.media} lang={lang} />}

        <motion.p className="stack" variants={rise}>
          {c.stack}
        </motion.p>
        {c.note && (
          <motion.p className="case-note" variants={rise}>
            {c.note[lang]}
          </motion.p>
        )}
        {c.link && (
          <motion.a
            variants={rise}
            className="case-link"
            href={c.link.href}
            target={c.link.href.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            whileHover="hover"
            whileTap={{ scale: 0.97 }}
          >
            <span>{c.link.label[lang]}</span>
            <motion.svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" variants={{ hover: { x: 3, y: -3 } }} transition={snappy}>
              <path d="M4 12L12 4M6 4h6v6" fill="none" stroke="currentColor" strokeWidth="1.8" />
            </motion.svg>
          </motion.a>
        )}
      </motion.div>
    </article>
  );
}

function PlateLegend({ p, lang }: { p: MotionValue<number>; lang: Lang }) {
  const t = ui[lang];
  const op = useTransform(p, [0, 0.15], [0.35, 1]);
  return (
    <span className="legend">
      <span className="legend-ink">{t.layerPhysical}</span>
      <motion.span className="legend-mk" style={{ opacity: op }}>
        {t.layerDigital}
      </motion.span>
    </span>
  );
}

function Counter({ s, lang }: { s: Stat; lang: Lang }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const fmt = (v: number) =>
    v.toLocaleString(lang === 'es' ? 'es-CO' : 'en-US', {
      minimumFractionDigits: s.decimals ?? 0,
      maximumFractionDigits: s.decimals ?? 0,
    }) + (s.suffix ?? '');
  const [text, setText] = useState(fmt(s.value));
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, s.value, { duration: 1.6, ease, onUpdate: (v) => setText(fmt(v)) });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, lang]);
  return (
    <span ref={ref} className="tnum">
      {text}
    </span>
  );
}

function MediaBlock({ m, lang }: { m: Media; lang: Lang }) {
  return (
    <motion.figure
      className="media"
      variants={{
        hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 0.4 },
        show: { clipPath: 'inset(0 0 0% 0)', opacity: 1, transition: { duration: 1, ease } },
      }}
    >
      {m.kind === 'video' && <AutoVideo src={m.src} poster={m.poster} label={m.alt[lang]} />}
      {m.kind === 'image' && <img src={m.src} alt={m.alt[lang]} loading="lazy" />}
      {m.kind === 'compare' && m.before && m.after && (
        <Compare before={m.before.src} after={m.after.src} bl={m.before.label[lang]} al={m.after.label[lang]} alt={m.alt[lang]} />
      )}
      <figcaption>{m.caption[lang]}</figcaption>
    </motion.figure>
  );
}

function AutoVideo({ src, poster, label }: { src: string; poster?: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion();
  useEffect(() => {
    const v = ref.current;
    if (!v || reduce) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView, reduce]);
  return <video ref={ref} src={src} poster={poster} muted loop playsInline preload="metadata" aria-label={label} controls={!!reduce} />;
}

function Compare({ before, after, bl, al, alt }: { before: string; after: string; bl: string; al: string; alt: string }) {
  const [pct, setPct] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const x = useSpring(50, { stiffness: 500, damping: 40 });
  useEffect(() => x.set(pct), [pct, x]);
  const clip = useTransform(x, (v) => `inset(0 ${100 - v}% 0 0)`);
  const left = useTransform(x, (v) => `${v}%`);
  const dragging = useRef(false);
  const fromEvent = (clientX: number) => {
    const r = box.current!.getBoundingClientRect();
    setPct(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };
  // Sweep once when it first appears so people notice it is draggable.
  const inView = useInView(box, { once: true, amount: 0.6 });
  useEffect(() => {
    if (!inView) return;
    const seq = [20, 80, 50];
    let i = 0;
    const id = setInterval(() => {
      setPct(seq[i++]);
      if (i >= seq.length) clearInterval(id);
    }, 550);
    return () => clearInterval(id);
  }, [inView]);
  return (
    <div
      className="compare"
      ref={box}
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        fromEvent(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && fromEvent(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
    >
      <img src={after} alt={alt} loading="lazy" draggable={false} />
      <motion.img src={before} alt="" aria-hidden="true" loading="lazy" draggable={false} style={{ clipPath: clip }} />
      <span className="cmp-tag cmp-l">{bl}</span>
      <span className="cmp-tag cmp-r">{al}</span>
      <motion.span className="cmp-handle" style={{ left }} aria-hidden="true">
        <i />
      </motion.span>
      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(pct)}
        onChange={(e) => setPct(Number(e.target.value))}
        aria-label={`${bl} / ${al}`}
        className="cmp-range"
      />
    </div>
  );
}

/* Side index of cases: shows where you are and jumps between them. */
function CaseRail({ lang }: { lang: Lang }) {
  const [active, setActive] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const els = allCases.map((c) => document.getElementById(`caso-${c.id}`)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id.replace('caso-', ''));
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    els.forEach((el) => io.observe(el));
    const sec = document.getElementById('casos');
    const io2 = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: '-30% 0px -30% 0px' });
    if (sec) io2.observe(sec);
    return () => {
      io.disconnect();
      io2.disconnect();
    };
  }, []);
  return (
    <motion.nav
      className="rail"
      aria-label={ui[lang].nav.cases}
      initial={false}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 16, pointerEvents: visible ? 'auto' : 'none' }}
      transition={{ duration: 0.3, ease }}
    >
      {allCases.map((c, i) => (
        <a key={c.id} href={`#caso-${c.id}`} className={active === c.id ? 'on' : ''} aria-current={active === c.id ? 'true' : undefined}>
          <span className="rail-dot">{active === c.id && <motion.span layoutId="rail-on" className="rail-on" transition={snappy} />}</span>
          <span className="rail-label">
            {String(i + 1).padStart(2, '0')} {c.problem[lang].length > 46 ? c.problem[lang].slice(0, 44) + '…' : c.problem[lang]}
          </span>
        </a>
      ))}
    </motion.nav>
  );
}

/* ---------- path ---------- */

function Path({ lang }: { lang: Lang }) {
  const t = ui[lang];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.7'] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });
  const photoY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  return (
    <section className="path" id="trayectoria" ref={ref}>
      <div className="path-side">
        <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={rise}>
          {t.pathTitle}
        </motion.h2>
        <motion.p className="prose" initial="hidden" whileInView="show" viewport={{ once: true }} variants={rise}>
          {t.pathIntro}
        </motion.p>
        <motion.figure className="path-photo" style={{ y: photoY }}>
          <img src={profileImg} alt={lang === 'es' ? 'Luis Carlos Galván con bata de laboratorio sosteniendo una caja de muestra de suelo' : 'Luis Carlos Galván in a lab coat holding a soil sample box'} loading="lazy" width={960} height={1280} />
          <motion.figcaption
            className="tape"
            initial={{ opacity: 0, rotate: -9, scale: 1.1 }}
            whileInView={{ opacity: 1, rotate: -2.2, scale: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ type: 'spring', stiffness: 260, damping: 14 }}
          >
            {t.photoCaption}
          </motion.figcaption>
        </motion.figure>
      </div>
      <div className="timeline">
        <span className="tl-rail" aria-hidden="true">
          <motion.span style={{ scaleY: line }} />
        </span>
        <ol>
          {path.map((s, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.6, ease }}
            >
              <motion.span className="tl-dot" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true, amount: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.1 }} />
              <span className="tl-year tnum">{lang === 'en' && s.yearEn ? s.yearEn : s.year}</span>
              <p>{s[lang]}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- tools ---------- */

function Tools({ lang }: { lang: Lang }) {
  const t = ui[lang];
  const cols: [string, string[], string][] = [
    [t.toolsCivil, tools.civil, 'ink'],
    [t.toolsSystems, tools.systems, 'mk'],
  ];
  return (
    <section className="tools" id="herramientas">
      <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={rise}>
        {t.toolsTitle}
      </motion.h2>
      <div className="tools-grid">
        {cols.map(([title, list, tone]) => (
          <motion.div key={title} className={`tools-col tools-${tone}`} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger}>
            <motion.h3 variants={rise}>{title}</motion.h3>
            <ul>
              {list.map((x) => (
                <motion.li key={x} variants={rise} whileHover={{ x: 6 }} transition={snappy}>
                  {x}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- more ---------- */

function More({ lang }: { lang: Lang }) {
  const t = ui[lang];
  const [hover, setHover] = useState<string | null>(null);
  return (
    <section className="more">
      <div className="more-list">
        <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={rise}>
          {t.moreTitle}
        </motion.h2>
        <ul onMouseLeave={() => setHover(null)}>
          {more.map((m) => (
            <li key={m.name} onMouseEnter={() => setHover(m.name)}>
              {hover === m.name && <motion.span layoutId="more-hover" className="more-hover" transition={snappy} />}
              <a href={m.href} target="_blank" rel="noreferrer">
                <strong>{m.name}</strong>
                <span>{m.what[lang]}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <aside className="lgi">
        <h3>{t.lgiTitle}</h3>
        <p>{t.lgiBody}</p>
        <ul>
          {t.lgiLinks.map((l) => (
            <li key={l.href}>
              <motion.a href={l.href} whileHover={{ x: 6 }} transition={snappy}>
                {l.label}
              </motion.a>
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
}

/* ---------- contact ---------- */

function Contact({ lang }: { lang: Lang }) {
  const t = ui[lang];
  return (
    <section id="contacto" className="end">
      <motion.div className="end-inner" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger}>
        <h2 className="line-mask">
          <motion.span className="line" variants={{ hidden: { y: '105%' }, show: { y: 0, transition: { duration: 0.8, ease } } }}>
            {t.endTitle}
          </motion.span>
        </h2>
        <motion.p className="end-body" variants={rise}>
          {t.endBody}
        </motion.p>
        <motion.a className="end-mail" href={`mailto:${LINKS.email}`} variants={rise} whileHover="hover">
          {LINKS.email}
          <motion.span className="end-underline" variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1, ease, delay: 0.3 } }, hover: { scaleX: 1.02 } }} />
        </motion.a>
        <motion.ul className="end-links" variants={stagger}>
          {[
            [LINKS.linkedin, 'LinkedIn'],
            [LINKS.github, 'GitHub'],
            [LINKS.whatsapp, t.contactWhatsapp],
          ].map(([href, label]) => (
            <motion.li key={href} variants={rise}>
              <motion.a href={href} target="_blank" rel="noreferrer" whileHover={{ y: -3 }} whileTap={{ scale: 0.96 }} transition={snappy}>
                {label}
              </motion.a>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
