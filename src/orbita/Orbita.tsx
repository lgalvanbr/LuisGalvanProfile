import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion, type Variants } from 'motion/react';
import { LINKS, chapters, path, ui, type Case } from '../story/content';
import { PlateDefs } from '../story/drawings';
import { DetailBody, Count, useOverlay } from '../shared/Detail';
import { BgVideo } from '../shared/BgVideo';
import type { Mission } from '../space/data';
import { SCENES, S } from './hubScenes';
import { MORE_SCENES } from './moreScenes';
import { CARDS, SCALES, type Card, type Scale } from './projects';
import './orbita.css';

const ALL_SCENES = { ...SCENES, ...MORE_SCENES } as Record<string, (svg: SVGSVGElement) => void>;
const ease = [0.16, 1, 0.3, 1] as const;
const up: Variants = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } };
const cases: Case[] = chapters.flatMap((c) => c.cases);
const caseById = (id?: string) => cases.find((c) => c.id === id);

const FIGURES = [
  { s: { value: 1.77, decimals: 2, suffix: ' M', label: { es: 'edificaciones en Bogotá 3D', en: '' } }, card: 'Bogotá 3D' },
  { s: { value: 31343, label: { es: 'contratos ambientales cruzados con satélite', en: '' } }, card: 'Contratos y satélite' },
  { s: { value: 389, label: { es: 'rutas SITP afectadas por el Metro L1', en: '' } }, card: 'Mapa del sistema de Bogotá' },
  { s: { value: 4096, label: { es: 'entornos de entrenamiento del G1 en paralelo', en: '' } }, card: 'Unitree G1 en Isaac Lab' },
];

const FEATURED = [
  { id: 'destacado-robot', eyebrow: 'Robótica de inspección', title: 'Un humanoide entrenado en simulación para inspeccionar edificaciones', body: 'Unitree G1 en Isaac Lab: marcha, escaleras de 15 cm, empujones de 0,6 m/s y recuperación tras caídas, en una oficina fotorrealista con RGB, profundidad y LiDAR.', video: '/media/bg/g1-levantarse', card: 'Unitree G1 en Isaac Lab' },
  { id: 'destacado-bogota', eyebrow: 'Ciudad', title: 'Bogotá completa en 3D a partir de datos abiertos', body: '1,77 millones de construcciones del Catastro con su número de pisos, terreno, vías, árboles, red de acueducto y tráfico, en el navegador.', video: '/media/bg/bogota-vuelo', card: 'Bogotá 3D' },
  { id: 'destacado-territorio', eyebrow: 'Territorio', title: 'Inversión ambiental frente al daño medido desde el espacio', body: 'Contratos públicos de 25 corporaciones cruzados con pérdida de bosque, minería clasificada con Sentinel-2 y zonas inundables. Valledupar y el río Guatapurí, 2018–2025.', image: '/media/valledupar-2025.webp', card: 'Contratos y satélite' },
];

function toMission(card: Card): Mission | null {
  const c = caseById(card.caseId);
  if (!c) return null;
  return { c, code: '', name: card.name, line: { es: card.description, en: card.description }, caps: [], orbit: 0 };
}

export default function Orbita() {
  const [scale, setScale] = useState<Scale | 'todos'>('todos');
  const [q, setQ] = useState('');
  const [sheet, setSheet] = useState<Card | null>(null);

  useEffect(() => {
    document.documentElement.lang = 'es';
    document.body.classList.add('ob-page');
    return () => document.body.classList.remove('ob-page');
  }, []);

  const visible = useMemo(() => {
    const term = q.trim().toLowerCase();
    return CARDS.filter((c) => (scale === 'todos' || c.scale === scale) && (!term || `${c.name} ${c.description} ${c.tags.join(' ')}`.toLowerCase().includes(term)));
  }, [scale, q]);

  const sheetable = useMemo(() => CARDS.filter((c) => caseById(c.caseId)), []);
  const openByName = (name: string) => {
    const card = CARDS.find((c) => c.name === name);
    if (card && caseById(card.caseId)) setSheet(card);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="ob">
        <PlateDefs />
        <header className="ob-nav">
          <a href="#top" className="ob-mark">Luis Carlos Galvan</a>
          <nav aria-label="Secciones">
            <a href="#proyectos">Proyectos</a>
            <a href="#destacados">Destacados</a>
            <a href="#trayectoria">Trayectoria</a>
            <a href="#contacto">Contacto</a>
          </nav>
        </header>

        <main>
          <section className="ob-hero" id="top">
            <BgVideo src="/media/bg/g1-estudio.mp4" poster="/media/bg/g1-estudio.jpg" eager />
            <div className="ob-scrim" />
            <div className="ob-hero-in">
              <motion.p className="ob-telemetry" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
                BOGOTÁ · 4.6097° N 74.0817° W · UNIVERSIDAD DE LOS ANDES
              </motion.p>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.1 }}>
                Luis Carlos Galvan
              </motion.h1>
              <motion.p className="ob-lede" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.25 }}>
                Ingeniero civil y de sistemas. Sistemas de medición, modelación y monitoreo para infraestructura, del sensor al territorio.
              </motion.p>
              <motion.div className="ob-ctas" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45, duration: 0.8 }}>
                <a className="ob-btn" href="#proyectos">Explorar los {CARDS.length} proyectos</a>
                <a className="ob-btn ghost" href="#contacto">Contacto</a>
              </motion.div>
            </div>
          </section>

          <section className="ob-figs" aria-label="Cifras">
            {FIGURES.map((f) => (
              <button key={f.card} className="ob-fig" onClick={() => openByName(f.card)}>
                <InView>{(on) => (on ? <Count s={f.s} lang="es" delay={0} /> : <span>&nbsp;</span>)}</InView>
                <span>{f.s.label.es}</span>
              </button>
            ))}
          </section>

          <section className="ob-sec" id="proyectos">
            <div className="ob-head">
              <p className="ob-meta">{CARDS.length} PROYECTOS · ORDENADOS POR ESCALA</p>
              <h2>Proyectos</h2>
              <p>Todas las herramientas en línea, del sensor al territorio. Cada tarjeta abre la aplicación; las que tienen ficha técnica muestran el problema, la solución y las cifras.</p>
            </div>
            <div className="ob-filter">
              <div className="ob-chips" role="group" aria-label="Escala">
                {[{ id: 'todos' as const, name: 'Todas', note: '' }, ...SCALES].map((s) => {
                  const n = s.id === 'todos' ? CARDS.length : CARDS.filter((c) => c.scale === s.id).length;
                  const on = scale === s.id;
                  return (
                    <button key={s.id} className={on ? 'on' : ''} aria-pressed={on} onClick={() => setScale(s.id)}>
                      {on && <motion.span layoutId="ob-chip" className="ob-chip-bg" transition={{ type: 'spring', stiffness: 450, damping: 34 }} />}
                      <span>{s.name}</span>
                      <small>{n}</small>
                    </button>
                  );
                })}
              </div>
              <label className="ob-search">
                <span className="sr">Buscar proyecto</span>
                <input id="ob-q" type="search" placeholder="Buscar: LiDAR, SITP, Sinú…" value={q} onChange={(e) => setQ(e.target.value)} />
              </label>
            </div>
            {SCALES.filter((s) => scale === 'todos' || s.id === scale).map((s) => {
              const items = visible.filter((c) => c.scale === s.id);
              if (!items.length) return null;
              return (
                <div key={s.id} className="ob-scale">
                  <div className="ob-scale-head">
                    <span className="ob-meta">{String(SCALES.indexOf(s) + 1).padStart(2, '0')} · {s.name.toUpperCase()}</span>
                    <span>{s.note}</span>
                  </div>
                  <motion.div layout className="ob-grid">
                    <AnimatePresence mode="popLayout">
                      {items.map((c) => (
                        <SceneCard key={c.name} card={c} onSheet={caseById(c.caseId) ? () => setSheet(c) : undefined} />
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </div>
              );
            })}
            {!visible.length && <p className="ob-empty">Ningún proyecto coincide con «{q}». Pruebe con otra palabra o elija «Todas».</p>}
          </section>

          <section id="destacados">
            {FEATURED.map((f, i) => (
              <div className="ob-film" id={f.id} key={f.id}>
                <div className="ob-film-pin">
                  {f.video ? <BgVideo src={`${f.video}.mp4`} poster={`${f.video}.jpg`} /> : <div className="ob-film-img" style={{ backgroundImage: `url(${f.image})` }} />}
                  <div className="ob-film-scrim" />
                  <p className="ob-meta ob-film-top">0{i + 1} · {f.eyebrow.toUpperCase()}</p>
                  <motion.div className="ob-film-copy" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: 0.5 }} transition={{ duration: 0.8, ease }}>
                    <h2>{f.title}</h2>
                    <p>{f.body}</p>
                    <button className="ob-btn" onClick={() => openByName(f.card)}>Ver ficha técnica</button>
                  </motion.div>
                </div>
              </div>
            ))}
          </section>

          <section className="ob-sec" id="trayectoria">
            <div className="ob-head">
              <p className="ob-meta">MÉTODO Y TRAYECTORIA</p>
              <h2>Cómo trabajo</h2>
            </div>
            <ol className="ob-method">
              {ui.es.method.map((m, i) => (
                <motion.li key={m.t} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }} variants={up} transition={{ delay: i * 0.06 }}>
                  <span className="ob-meta">0{i + 1}</span>
                  <b>{m.t}</b>
                  <p>{m.d}</p>
                </motion.li>
              ))}
            </ol>
            <ol className="ob-path">
              {path.map((s, i) => (
                <li key={i}>
                  <span>{s.year}</span>
                  <p>{s.es}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="ob-sec" id="contacto">
            <div className="ob-head">
              <p className="ob-meta">CONTACTO</p>
              <h2>Tres formas de trabajar juntos</h2>
            </div>
            <div className="ob-doors">
              <div>
                <h3>Investigación y colaboración</h3>
                <p>Proyectos académicos, coautoría y laboratorio.</p>
                <a className="ob-btn" href={`mailto:${LINKS.email}`}>Escribir un correo</a>
                <p className="ob-meta ob-sel">{LINKS.email}</p>
              </div>
              <div>
                <h3>Consultoría LGI</h3>
                <p>Ingeniería, monitoreo, IoT, IA y energía solar.</p>
                <a className="ob-btn" href={LINKS.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
                <a className="ob-link" href="/lgi">Conocer LGI</a>
              </div>
              <div>
                <h3>Perfil profesional</h3>
                <p>Trayectoria, publicaciones y código.</p>
                <a className="ob-btn" href={LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                <a className="ob-link" href={LINKS.github} target="_blank" rel="noreferrer">GitHub</a>
              </div>
            </div>
          </section>
        </main>

        <footer className="ob-foot">© {new Date().getFullYear()} Luis Carlos Galvan · Laboratorio SinergIA y LGI</footer>

        <AnimatePresence>
          {sheet && <Sheet key="sheet" card={sheet} list={sheetable} onClose={() => setSheet(null)} onGo={setSheet} />}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

function InView({ children }: { children: (on: boolean) => React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setOn(true), { threshold: 0.5 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return <b ref={ref}>{children(on)}</b>;
}

/* Card with the hub's structure: animated isometric scene, name + status, description, tags, hint, actions. */
function SceneCard({ card, onSheet }: { card: Card; onSheet?: () => void }) {
  const stage = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'checking' | 'ok' | 'off' | null>(card.check ? 'checking' : null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const host = stage.current;
    const draw = card.scene && ALL_SCENES[card.scene];
    if (!host || !draw) return;
    const svg = S('svg', { viewBox: '0 0 400 240', role: 'img', 'aria-label': card.label || card.name }, undefined) as SVGSVGElement;
    draw(svg);
    host.replaceChildren(svg);
    // only animate while on screen
    const io = new IntersectionObserver(([e]) => {
      svg.classList.toggle('paused', !e.isIntersecting);
      if (e.isIntersecting) svg.unpauseAnimations?.();
      else svg.pauseAnimations?.();
    });
    io.observe(host);
    return () => io.disconnect();
  }, [card.scene, card.label, card.name]);

  useEffect(() => {
    if (!card.check) return;
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 6000);
    fetch(card.url, { mode: 'no-cors', cache: 'no-store', signal: ctrl.signal })
      .then(() => setState('ok'))
      .catch(() => setState('off'))
      .finally(() => clearTimeout(t));
    return () => ctrl.abort();
  }, [card.check, card.url]);

  const external = card.url.startsWith('http');
  const primary = card.url.startsWith('#ficha') && onSheet;

  return (
    <motion.article layout className="ob-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.4, ease }}>
      {card.scene && <div className="ob-stage" ref={stage} />}
      <div className="ob-body">
        <h3>
          {card.name}
          {state && <span className="ob-status" data-state={state}>{state === 'checking' ? 'comprobando…' : state === 'ok' ? 'en línea' : 'fuera de línea'}</span>}
          {!state && card.stamp && <span className="ob-stamp">{card.stamp}</span>}
        </h3>
        <p>{card.description}</p>
        <div className="ob-tags">
          {card.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        {card.hint && <p className="ob-hint">{card.hint}</p>}
        <div className="ob-actions">
          {primary ? (
            <button className="ob-btn" onClick={onSheet}>{card.cta}</button>
          ) : (
            <a className="ob-btn" href={card.url} target={external ? '_blank' : undefined} rel="noreferrer">
              {card.cta}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
          )}
          {onSheet && !primary ? (
            <button className="ob-btn ghost" onClick={onSheet}>Ver ficha</button>
          ) : (
            external && (
              <button
                className="ob-btn ghost"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(card.url);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  } catch {}
                }}
              >
                {copied ? 'Enlace copiado' : 'Copiar enlace'}
              </button>
            )
          )}
        </div>
      </div>
    </motion.article>
  );
}

function Sheet({ card, list, onClose, onGo }: { card: Card; list: Card[]; onClose: () => void; onGo: (c: Card) => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const i = list.indexOf(card);
  const go = useCallback((d: number) => onGo(list[(i + d + list.length) % list.length]), [i, list, onGo]);
  useOverlay(onClose, go, closeRef);
  const m = toMission(card);
  if (!m) return null;
  return (
    <motion.div className="ob-veil" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        className="ob-sheet"
        role="dialog"
        aria-modal="true"
        aria-label={card.name}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 32 }}
      >
        <div className="ob-sheet-bar">
          <span className="ob-meta">FICHA {String(i + 1).padStart(2, '0')} / {String(list.length).padStart(2, '0')}</span>
          <div>
            <button onClick={() => go(-1)} aria-label="Anterior">‹</button>
            <button onClick={() => go(1)} aria-label="Siguiente">›</button>
            <button ref={closeRef} onClick={onClose} aria-label="Cerrar">✕</button>
          </div>
        </div>
        <div className="ob-sheet-body" key={card.name}>
          <DetailBody m={m} lang="es" />
          {card.url.startsWith('http') && !m.c.link && (
            <a className="ob-btn" href={card.url} target="_blank" rel="noreferrer">{card.cta}</a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
