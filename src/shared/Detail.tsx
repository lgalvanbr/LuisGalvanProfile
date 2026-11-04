// Project detail body shared by the Apple and comic designs. Each design styles the `pd-*` classes.
import { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, type Variants } from 'motion/react';
import { ui as storyUi, type Lang, type Stat } from '../story/content';
import { drawings } from '../story/drawings';
import type { Mission } from '../space/data';
import './detail.css';

const ease = [0.16, 1, 0.3, 1] as const;
const rise: Variants = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } };
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } } };

export const labels = {
  es: { problem: 'El problema', built: 'La solución', how: 'Cómo funciona', close: 'Cerrar', next: 'Siguiente', prev: 'Anterior' },
  en: { problem: 'The problem', built: 'The solution', how: 'How it works', close: 'Close', next: 'Next', prev: 'Previous' },
};

export function DetailBody({ m, lang, headFirst = true }: { m: Mission; lang: Lang; headFirst?: boolean }) {
  const c = m.c;
  const t = labels[lang];
  const p = useMotionValue(0);
  const Drawing = drawings[c.drawing];
  useEffect(() => {
    p.set(0);
    const a = animate(p, 1, { duration: 2.4, delay: 0.35, ease: 'easeInOut' });
    return () => a.stop();
  }, [c.id, p]);

  return (
    <motion.div className="pd" initial="hidden" animate="show" variants={stagger} key={c.id}>
      {headFirst && (
        <>
          <motion.p className="pd-place" variants={rise}>
            {c.place[lang]}
          </motion.p>
          <motion.h2 className="pd-name" variants={rise}>
            {m.name}
          </motion.h2>
        </>
      )}
      <motion.div className="pd-sheet" variants={rise}>
        <span className="pd-sheet-key">
          <span>{storyUi[lang].layerPhysical}</span>
          <span className="pd-mk">{storyUi[lang].layerDigital}</span>
        </span>
        <Drawing p={p} />
      </motion.div>

      <motion.p className="pd-label" variants={rise}>
        {t.problem}
      </motion.p>
      <motion.h3 className="pd-problem" variants={rise}>
        {c.problem[lang]}
      </motion.h3>
      <motion.p className="pd-text" variants={rise}>
        {c.context[lang]}
      </motion.p>

      <motion.p className="pd-label pd-mk" variants={rise}>
        {t.built}
      </motion.p>
      <motion.p className="pd-text" variants={rise}>
        {c.built[lang]}
      </motion.p>

      <motion.ol className="pd-how" variants={stagger}>
        {c.how.map((h, i) => (
          <motion.li key={i} variants={rise}>
            <span>{i + 1}</span>
            {h[lang]}
          </motion.li>
        ))}
      </motion.ol>

      {c.stats && (
        <motion.dl className="pd-stats" variants={stagger}>
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
        <motion.figure className="pd-media" variants={rise}>
          {c.media.kind === 'video' && <video src={c.media.src} poster={c.media.poster} muted loop playsInline autoPlay aria-label={c.media.alt[lang]} />}
          {c.media.kind === 'image' && <img src={c.media.src} alt={c.media.alt[lang]} />}
          {c.media.kind === 'compare' && c.media.before && c.media.after && (
            <Compare before={c.media.before.src} after={c.media.after.src} bl={c.media.before.label[lang]} al={c.media.after.label[lang]} alt={c.media.alt[lang]} />
          )}
          <figcaption>{c.media.caption[lang]}</figcaption>
        </motion.figure>
      )}

      <motion.p className="pd-stack" variants={rise}>
        {c.stack}
      </motion.p>
      {c.note && (
        <motion.p className="pd-note" variants={rise}>
          {c.note[lang]}
        </motion.p>
      )}
      {c.link && (
        <motion.a variants={rise} className="pd-link" href={c.link.href} target={c.link.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
          {c.link.label[lang]}
        </motion.a>
      )}
    </motion.div>
  );
}

export function Count({ s, lang, delay = 0.4 }: { s: Stat; lang: Lang; delay?: number }) {
  const fmt = (v: number) =>
    v.toLocaleString(lang === 'es' ? 'es-CO' : 'en-US', { minimumFractionDigits: s.decimals ?? 0, maximumFractionDigits: s.decimals ?? 0 }) + (s.suffix ?? '');
  const [txt, setTxt] = useState(fmt(0));
  useEffect(() => {
    const a = animate(0, s.value, { duration: 1.4, delay, ease, onUpdate: (v) => setTxt(fmt(v)), onComplete: () => setTxt(fmt(s.value)) });
    return () => a.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s.value, lang]);
  return <span style={{ fontVariantNumeric: 'tabular-nums' }}>{txt}</span>;
}

export function Compare({ before, after, bl, al, alt }: { before: string; after: string; bl: string; al: string; alt: string }) {
  const [pct, setPct] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const drag = useRef(false);
  const set = (x: number) => {
    const r = box.current!.getBoundingClientRect();
    setPct(Math.max(0, Math.min(100, ((x - r.left) / r.width) * 100)));
  };
  return (
    <div
      className="pd-cmp"
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
      <span className="pd-cmp-t l">{bl}</span>
      <span className="pd-cmp-t r">{al}</span>
      <span className="pd-cmp-h" style={{ left: `${pct}%` }} />
      <input type="range" min={0} max={100} value={Math.round(pct)} onChange={(e) => setPct(+e.target.value)} aria-label={`${bl} / ${al}`} />
    </div>
  );
}

/** Esc / arrows / body-scroll lock / focus restore for an open project overlay. */
export function useOverlay(onClose: () => void, go: (d: number) => void, focusRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    focusRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    const o = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = o;
      prev?.focus?.();
    };
  }, [onClose, go, focusRef]);
}

