import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AnimatePresence,
  MotionConfig,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from 'motion/react';
import { LINKS, ui as storyUi, type Lang, type Stat } from '../story/content';
import { drawings, PlateDefs } from '../story/drawings';
import { caps, copy, missions, type CapId, type Mission } from './data';
import './space.css';

const ease = [0.16, 1, 0.3, 1] as const;
const snappy = { type: 'spring', stiffness: 420, damping: 32 } as const;
const rise: Variants = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } };
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };

/* ------------------------------------------------------------------ */

export default function Space() {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const s = localStorage.getItem('lang');
      if (s === 'es' || s === 'en') return s;
    } catch {}
    return 'es';
  });
  const [open, setOpen] = useState<number | null>(null);
  const [cap, setCap] = useState<CapId | null>(null);
  const t = copy[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.body.classList.add('space-body');
    try {
      localStorage.setItem('lang', lang);
    } catch {}
    return () => document.body.classList.remove('space-body');
  }, [lang]);

  const lit = useMemo(() => new Set(cap ? missions.filter((m) => m.caps.includes(cap)).map((m) => m.c.id) : []), [cap]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="space">
        <PlateDefs />
        <Starfield />
        <Cursor />
        <div className="scanlines" aria-hidden="true" />
        <Hud lang={lang} setLang={setLang} />

        <main>
          <section className="hero" id="top">
            <div className="hero-copy">
              <motion.p className="kicker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
                {t.role}
              </motion.p>
              <h1 className="name">
                <Scramble text="Luis Carlos" delay={300} />
                <br />
                <Scramble text="Galvan" delay={520} className="name-accent" />
              </h1>
              <motion.p className="lede" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8, ease }}>
                {t.lede}
              </motion.p>
              <motion.div className="hero-cta" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { delayChildren: 1.3, staggerChildren: 0.08 } } }}>
                <motion.a variants={rise} href="#proyectos" className="btn btn-glow" whileTap={{ scale: 0.97 }}>
                  {t.explore}
                </motion.a>
                <motion.a variants={rise} href="#contacto" className="btn" whileTap={{ scale: 0.97 }}>
                  {t.contact}
                </motion.a>
              </motion.div>
            </div>

            <Orbit lang={lang} lit={lit} cap={cap} onOpen={setOpen} />

            <motion.div className="caps" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { delayChildren: 1.6, staggerChildren: 0.06 } } }}>
              <motion.p className="caps-title" variants={rise}>
                <span>{t.capsTitle}</span> {t.capsHint}
              </motion.p>
              <div className="caps-row" role="group" aria-label={t.capsTitle} onMouseLeave={() => setCap(null)}>
                {caps.map((c) => (
                  <motion.button
                    key={c.id}
                    variants={rise}
                    className={`cap${cap === c.id ? ' on' : ''}`}
                    onMouseEnter={() => setCap(c.id)}
                    onFocus={() => setCap(c.id)}
                    onClick={() => setCap(cap === c.id ? null : c.id)}
                    aria-pressed={cap === c.id}
                  >
                    {cap === c.id && <motion.span layoutId="cap-on" className="cap-bg" transition={snappy} />}
                    <span className="cap-name">{c.name[lang]}</span>
                    <span className="cap-tools">{c.tools}</span>
                  </motion.button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                {cap && (
                  <motion.p key={cap} className="cap-body" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
                    {caps.find((c) => c.id === cap)!.body[lang]}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </section>

          <section className="missions" id="proyectos">
            <SectionHead index="02" title={t.missionsTitle} />
            <motion.ul className="grid" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
              {missions.map((m, i) => (
                <Tile key={m.c.id} m={m} lang={lang} dim={!!cap && !lit.has(m.c.id)} onOpen={() => setOpen(i)} />
              ))}
            </motion.ul>
          </section>

          <Contact lang={lang} />
        </main>

        <footer className="foot">
          <span>
            © {new Date().getFullYear()} {t.footer}
          </span>
          <a href="/lgi">{t.lgi}</a>
        </footer>

        <AnimatePresence>
          {open !== null && <Dossier key="dossier" index={open} lang={lang} onClose={() => setOpen(null)} onGo={setOpen} />}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

/* ------------------------------------------------------------------ */
/* Ambient: starfield, cursor, HUD                                      */
/* ------------------------------------------------------------------ */

function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext('2d')!;
    let w = 0,
      h = 0,
      dpr = 1,
      raf = 0;
    const N = 520;
    const stars = Array.from({ length: N }, () => ({ x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random() }));
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let speed = reduce ? 0 : 0.045; // warp-in, decays to a drift
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth;
      h = cv.clientHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const onMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / w - 0.5) * 2;
      mouse.ty = (e.clientY / h - 0.5) * 2;
    };
    const frame = () => {
      speed += ((reduce ? 0 : 0.0009) - speed) * 0.035;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2 - mouse.x * 24;
      const cy = h / 2 - mouse.y * 24;
      const f = Math.max(w, h) * 0.5;
      for (const s of stars) {
        const pz = s.z;
        s.z -= speed;
        if (s.z <= 0.02) {
          s.x = Math.random() * 2 - 1;
          s.y = Math.random() * 2 - 1;
          s.z = 1;
          continue;
        }
        const sx = cx + (s.x / s.z) * f;
        const sy = cy + (s.y / s.z) * f;
        if (sx < -10 || sx > w + 10 || sy < -10 || sy > h + 10) continue;
        const a = Math.min(1, (1 - s.z) * 1.3);
        const size = (1 - s.z) * 1.8 + 0.3;
        if (speed > 0.004) {
          const px = cx + (s.x / pz) * f;
          const py = cy + (s.y / pz) * f;
          ctx.strokeStyle = `rgba(160,235,255,${a})`;
          ctx.lineWidth = size;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(sx, sy);
          ctx.stroke();
        } else {
          ctx.fillStyle = s.z < 0.25 ? `rgba(61,242,255,${a})` : `rgba(220,228,255,${a * 0.85})`;
          ctx.fillRect(sx, sy, size, size);
        }
      }
      raf = requestAnimationFrame(frame);
    };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
    };
  }, [reduce]);
  return <canvas ref={ref} className="stars" aria-hidden="true" />;
}

function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40 });
  const sy = useSpring(y, { stiffness: 500, damping: 40 });
  const [hot, setHot] = useState(false);
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    setFine(mq.matches);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement;
      setHot(!!el.closest('a, button'));
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [x, y]);
  if (!fine) return null;
  return (
    <motion.div className={`cursor${hot ? ' hot' : ''}`} style={{ x: sx, y: sy }} aria-hidden="true">
      <i />
      <i />
    </motion.div>
  );
}

function Hud({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const t = copy[lang];
  const [now, setNow] = useState('');
  useEffect(() => {
    const tick = () =>
      setNow(new Date().toLocaleTimeString('es-CO', { timeZone: 'America/Bogota', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <motion.header className="hud" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6, ease }}>
      <a href="#top" className="mark" aria-label="Luis Carlos Galvan">
        <svg viewBox="0 0 28 28" width="26" height="26" aria-hidden="true">
          <circle cx="14" cy="14" r="4" fill="var(--c)" />
          <ellipse cx="14" cy="14" rx="12" ry="5" fill="none" stroke="var(--fg)" strokeWidth="1.2" transform="rotate(-24 14 14)" />
        </svg>
        <span>LCG</span>
      </a>
      <span className="hud-meta">
        <i className="dot" /> {t.online}
        <span className="sep" />
        4.6097° N 74.0817° W
        <span className="sep" />
        {t.local} <b className="tnum">{now}</b>
      </span>
      <nav className="hud-nav">
        <a href="#proyectos">{t.missionsTitle}</a>
        <a href="#contacto">{t.contact}</a>
        <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} aria-label={t.langLabel}>
          {t.lang}
        </button>
      </nav>
    </motion.header>
  );
}

/* Text that decodes from random glyphs into its final value. */
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&@/<>[]=+*';
function Scramble({ text, delay = 0, className, replay }: { text: string; delay?: number; className?: string; replay?: number }) {
  const [out, setOut] = useState(text.replace(/\S/g, ' '));
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) {
      setOut(text);
      return;
    }
    let raf = 0;
    const start = performance.now() + delay;
    const dur = 700 + text.length * 35;
    const step = (now: number) => {
      const k = Math.max(0, (now - start) / dur);
      const done = Math.floor(k * text.length);
      setOut(
        text
          .split('')
          .map((ch, i) => (ch === ' ' ? ' ' : i < done ? ch : k > 0 ? GLYPHS[(Math.random() * GLYPHS.length) | 0] : ' '))
          .join(''),
      );
      if (k < 1) raf = requestAnimationFrame(step);
      else setOut(text);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [text, delay, reduce, replay]);
  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{out}</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Orbit                                                              */
/* ------------------------------------------------------------------ */

const RINGS = [0.25, 0.37, 0.49];
const SPEED = [0.11, -0.075, 0.05]; // rad/s, alternating direction
const TILT = 0.34;

function Orbit({ lang, lit, cap, onOpen }: { lang: Lang; lit: Set<string>; cap: CapId | null; onOpen: (i: number) => void }) {
  const box = useRef<HTMLDivElement>(null);
  const sats = useRef<(HTMLButtonElement | null)[]>([]);
  const beam = useRef<SVGLineElement>(null);
  const [size, setSize] = useState({ w: 720, h: 460 });
  const [hover, setHover] = useState<number | null>(null);
  const hoverRef = useRef<number | null>(null);
  hoverRef.current = hover;
  const reduce = useReducedMotion();

  useEffect(() => {
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    if (box.current) ro.observe(box.current);
    return () => ro.disconnect();
  }, []);

  // phase per satellite: spread evenly on its ring
  const phases = useMemo(() => {
    const count = [0, 0, 0];
    return missions.map((m) => {
      const k = count[m.orbit]++;
      return (k / 3) * Math.PI * 2 + m.orbit * 0.9;
    });
  }, []);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let clock = 0;
    let rate = 1;
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const target = reduce ? 0 : hoverRef.current !== null ? 0.12 : 1;
      rate += (target - rate) * 0.06;
      clock += dt * rate;
      const { w, h } = size;
      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w * (w < 600 ? 0.86 : 1), h / TILT / 1.15);
      missions.forEach((m, i) => {
        const el = sats.current[i];
        if (!el) return;
        const a = phases[i] + clock * SPEED[m.orbit];
        const rx = RINGS[m.orbit] * R;
        const x = cx + Math.cos(a) * rx;
        const y = cy + Math.sin(a) * rx * TILT;
        const depth = (Math.sin(a) + 1) / 2; // 0 back, 1 front
        el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${0.78 + depth * 0.32})`;
        el.style.zIndex = depth > 0.5 ? '4' : '1';
        el.style.setProperty('--depth', depth.toFixed(3));
        if (hoverRef.current === i && beam.current) {
          beam.current.setAttribute('x2', String(x));
          beam.current.setAttribute('y2', String(y));
        }
      });
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [size, phases, reduce]);

  const R = Math.min(size.w * (size.w < 600 ? 0.86 : 1), size.h / TILT / 1.15);
  const t = copy[lang];

  return (
    <div className="orbit-wrap">
      <motion.div
        className="orbit"
        ref={box}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1.4, ease }}
      >
        <svg className="rings" width={size.w} height={size.h} aria-hidden="true">
          <defs>
            <radialGradient id="core-glow">
              <stop offset="0" stopColor="var(--c)" stopOpacity="0.55" />
              <stop offset="1" stopColor="var(--c)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx={size.w / 2} cy={size.h / 2} r={R * 0.2} fill="url(#core-glow)" />
          {RINGS.map((r, i) => (
            <g key={i}>
              <ellipse cx={size.w / 2} cy={size.h / 2} rx={r * R} ry={r * R * TILT} className="ring" />
              <motion.ellipse
                cx={size.w / 2}
                cy={size.h / 2}
                rx={r * R}
                ry={r * R * TILT}
                className="ring-arc"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.6 + i * 0.25, duration: 1.6, ease }}
              />
            </g>
          ))}
          {hover !== null && <line ref={beam} x1={size.w / 2} y1={size.h / 2} x2={size.w / 2} y2={size.h / 2} className="beam" />}
        </svg>

        <div className="core" aria-hidden="true">
          <span className="core-ring" />
          <span className="core-dot" />
        </div>

        {missions.map((m, i) => {
          const on = !cap || lit.has(m.c.id);
          return (
            <button
              key={m.c.id}
              ref={(el) => {
                sats.current[i] = el;
              }}
              className={`sat${on ? '' : ' off'}${cap && on ? ' lit' : ''}${hover === i ? ' hov' : ''}`}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              onClick={() => onOpen(i)}
              aria-label={`${m.name}: ${m.line[lang]}`}
            >
              <span className="sat-node" />
              <span className="sat-code">{m.code}</span>
              <span className="sat-card">
                <b>{m.name}</b>
                <span>{m.line[lang]}</span>
              </span>
            </button>
          );
        })}
      </motion.div>
      <motion.p className="orbit-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}>
        {t.hint}
      </motion.p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Project tiles                                                       */
/* ------------------------------------------------------------------ */

function SectionHead({ index, title }: { index: string; title: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  return (
    <div className="shead">
      <span className="shead-i">{index}</span>
      <h2 ref={ref}>{inView ? <Scramble text={title} /> : <span style={{ opacity: 0 }}>{title}</span>}</h2>
      <span className="shead-line" />
    </div>
  );
}

function Tile({ m, lang, dim, onOpen }: { m: Mission; lang: Lang; dim: boolean; onOpen: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const p = useMotionValue(0);
  const Drawing = drawings[m.c.drawing];
  const onMove = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    ref.current!.style.setProperty('--mx', `${e.clientX - r.left}px`);
    ref.current!.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <motion.li variants={rise} animate={{ opacity: dim ? 0.28 : 1 }} transition={{ duration: 0.3 }}>
      <button
        ref={ref}
        className="tile"
        onClick={onOpen}
        onPointerMove={onMove}
        onMouseEnter={() => animate(p, 1, { duration: 1.8, ease: 'easeInOut' })}
        onMouseLeave={() => animate(p, 0, { duration: 0.5 })}
        onFocus={() => animate(p, 1, { duration: 1.8 })}
      >
        <span className="tile-glow" aria-hidden="true" />
        <span className="tile-top">
          <span className="tile-code">{m.code}</span>
          <span className="tile-caps">
            {m.caps.map((c) => (
              <i key={c} title={caps.find((x) => x.id === c)!.name[lang]} />
            ))}
          </span>
        </span>
        <span className="tile-sheet sheet" aria-hidden="true">
          <Drawing p={p} />
        </span>
        <span className="tile-name">{m.name}</span>
        <span className="tile-line">{m.line[lang]}</span>
      </button>
    </motion.li>
  );
}

/* ------------------------------------------------------------------ */
/* Dossier                                                             */
/* ------------------------------------------------------------------ */

function Dossier({ index, lang, onClose, onGo }: { index: number; lang: Lang; onClose: () => void; onGo: (i: number) => void }) {
  const m = missions[index];
  const c = m.c;
  const t = copy[lang];
  const st = storyUi[lang];
  const p = useMotionValue(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const Drawing = drawings[c.drawing];

  const go = useCallback((d: number) => onGo((index + d + missions.length) % missions.length), [index, onGo]);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      prev?.focus?.();
    };
  }, [onClose, go]);

  useEffect(() => {
    p.set(0);
    bodyRef.current?.scrollTo({ top: 0 });
    const a = animate(p, 1, { duration: 2.6, delay: 0.35, ease: 'easeInOut' });
    return () => a.stop();
  }, [index, p]);

  return (
    <>
      <motion.div className="veil" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
      <motion.aside
        className="dossier"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dossier-title"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 260, damping: 34 }}
      >
        <div className="d-bar">
          <span className="d-code">{m.code}</span>
          <div className="d-nav">
            <button onClick={() => go(-1)} aria-label={t.prev}>
              ←
            </button>
            <span className="tnum">
              {String(index + 1).padStart(2, '0')} / {String(missions.length).padStart(2, '0')}
            </span>
            <button onClick={() => go(1)} aria-label={t.next}>
              →
            </button>
            <button ref={closeRef} onClick={onClose} className="d-close" aria-label={t.close}>
              ✕
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={c.id}
            ref={bodyRef}
            className="d-body"
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, x: -20, transition: { duration: 0.15 } }}
            variants={stagger}
          >
            <motion.p className="d-place" variants={rise}>
              {c.place[lang]}
            </motion.p>
            <motion.h2 id="dossier-title" className="d-name" variants={rise}>
              {m.name}
            </motion.h2>
            <motion.div className="d-sheet sheet" variants={rise}>
              <span className="d-sheet-label">
                <span>{st.layerPhysical}</span>
                <span className="mk">{st.layerDigital}</span>
              </span>
              <Drawing p={p} />
            </motion.div>

            <motion.p className="d-label" variants={rise}>
              {t.problem}
            </motion.p>
            <motion.h3 className="d-problem" variants={rise}>
              {c.problem[lang]}
            </motion.h3>
            <motion.p className="d-text" variants={rise}>
              {c.context[lang]}
            </motion.p>

            <motion.p className="d-label mk" variants={rise}>
              {t.built}
            </motion.p>
            <motion.p className="d-text" variants={rise}>
              {c.built[lang]}
            </motion.p>

            <motion.ol className="d-how" variants={stagger}>
              {c.how.map((h, i) => (
                <motion.li key={i} variants={rise}>
                  <span className="tnum">0{i + 1}</span>
                  {h[lang]}
                </motion.li>
              ))}
            </motion.ol>

            {c.stats && (
              <motion.dl className="d-stats" variants={stagger}>
                {c.stats.map((s, i) => (
                  <motion.div key={i} variants={rise}>
                    <dd>
                      <Count s={s} lang={lang} />
                    </dd>
                    <dt>{s.label[lang]}</dt>
                  </motion.div>
                ))}
              </motion.dl>
            )}

            {c.media && (
              <motion.figure className="d-media" variants={rise}>
                {c.media.kind === 'video' && <video src={c.media.src} poster={c.media.poster} muted loop playsInline autoPlay aria-label={c.media.alt[lang]} />}
                {c.media.kind === 'image' && <img src={c.media.src} alt={c.media.alt[lang]} />}
                {c.media.kind === 'compare' && c.media.before && c.media.after && (
                  <Compare before={c.media.before.src} after={c.media.after.src} bl={c.media.before.label[lang]} al={c.media.after.label[lang]} alt={c.media.alt[lang]} />
                )}
                <figcaption>{c.media.caption[lang]}</figcaption>
              </motion.figure>
            )}

            <motion.p className="d-stack" variants={rise}>
              {c.stack}
            </motion.p>
            {c.note && (
              <motion.p className="d-note" variants={rise}>
                {c.note[lang]}
              </motion.p>
            )}
            {c.link && (
              <motion.a variants={rise} className="btn btn-glow d-link" href={c.link.href} target={c.link.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                {c.link.label[lang]} ↗
              </motion.a>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.aside>
    </>
  );
}

function Count({ s, lang }: { s: Stat; lang: Lang }) {
  const fmt = (v: number) =>
    v.toLocaleString(lang === 'es' ? 'es-CO' : 'en-US', { minimumFractionDigits: s.decimals ?? 0, maximumFractionDigits: s.decimals ?? 0 }) + (s.suffix ?? '');
  const [txt, setTxt] = useState(fmt(0));
  useEffect(() => {
    const a = animate(0, s.value, { duration: 1.4, delay: 0.4, ease, onUpdate: (v) => setTxt(fmt(v)), onComplete: () => setTxt(fmt(s.value)) });
    return () => a.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s.value, lang]);
  return <span className="tnum">{txt}</span>;
}

function Compare({ before, after, bl, al, alt }: { before: string; after: string; bl: string; al: string; alt: string }) {
  const [pct, setPct] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const drag = useRef(false);
  const set = (x: number) => {
    const r = box.current!.getBoundingClientRect();
    setPct(Math.max(0, Math.min(100, ((x - r.left) / r.width) * 100)));
  };
  return (
    <div
      className="cmp"
      ref={box}
      onPointerDown={(e) => {
        drag.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        set(e.clientX);
      }}
      onPointerMove={(e) => drag.current && set(e.clientX)}
      onPointerUp={() => (drag.current = false)}
    >
      <img src={after} alt={alt} draggable={false} />
      <img src={before} alt="" aria-hidden="true" draggable={false} style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }} />
      <span className="cmp-t l">{bl}</span>
      <span className="cmp-t r">{al}</span>
      <span className="cmp-h" style={{ left: `${pct}%` }} />
      <input type="range" min={0} max={100} value={Math.round(pct)} onChange={(e) => setPct(+e.target.value)} aria-label={`${bl} / ${al}`} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

function Contact({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [n, setN] = useState(0);
  return (
    <section className="contact" id="contacto">
      <SectionHead index="03" title={t.endTitle} />
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={stagger}>
        <motion.p className="c-body" variants={rise}>
          {t.endBody}
        </motion.p>
        <motion.a variants={rise} className="c-mail" href={`mailto:${LINKS.email}`} onMouseEnter={() => setN((k) => k + 1)}>
          <Scramble text={LINKS.email} replay={n} />
        </motion.a>
        <motion.div className="c-links" variants={stagger}>
          {[
            [LINKS.linkedin, 'LinkedIn'],
            [LINKS.github, 'GitHub'],
            [LINKS.whatsapp, 'WhatsApp'],
          ].map(([href, label]) => (
            <motion.a key={href} variants={rise} href={href} target="_blank" rel="noreferrer" className="btn" whileTap={{ scale: 0.97 }}>
              {label}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
