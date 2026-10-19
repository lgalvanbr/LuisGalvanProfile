import { useEffect, useRef, useState } from 'react';
import profileImg from '../assets/profile.jpeg';
import { LINKS, TOTAL_DEPTH, samples, strata, ui, type Lang } from './content';
import './story.css';

const fmt = (m: number) => m.toFixed(1).replace('.', ',');

function useDepth(refs: React.MutableRefObject<(HTMLElement | null)[]>) {
  const [depth, setDepth] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      // Read depth at the viewport's upper third, interpolated inside the stratum under it.
      const probe = window.innerHeight * 0.35;
      let d = 0;
      refs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const s = strata[i];
        if (r.top <= probe) {
          const p = Math.min(1, Math.max(0, (probe - r.top) / r.height));
          d = s.top + (s.bottom - s.top) * p;
        }
      });
      setDepth(d);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [refs]);
  return depth;
}

export default function Story() {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem('lang');
      if (saved === 'es' || saved === 'en') return saved;
    } catch {}
    return 'es';
  });
  const t = ui[lang];
  const refs = useRef<(HTMLElement | null)[]>([]);
  const depth = useDepth(refs);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.body.classList.add('story-body');
    try {
      localStorage.setItem('lang', lang);
    } catch {}
    return () => document.body.classList.remove('story-body');
  }, [lang]);

  return (
    <div className="story">
      <a className="skip" href="#historia">
        {t.navStory}
      </a>

      <header className="bar">
        <div className="bar-id">
          <strong>{t.boreholeName}</strong>
          <span>{t.boreholeMeta}</span>
        </div>
        <nav className="bar-nav" aria-label="Secciones">
          <a href="#historia">{t.navStory}</a>
          <a href="#muestras">{t.navSamples}</a>
          <a href="#contacto">{t.navContact}</a>
        </nav>
        <div className="bar-depth" aria-hidden="true">
          <span>{t.depth}</span>
          <output className="tnum">{depth > 0.05 ? `−${fmt(depth)}` : fmt(0)} m</output>
        </div>
        <button
          className="bar-lang"
          onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
          aria-label={t.langLabel}
        >
          {t.lang}
        </button>
      </header>

      <main>
        <section className="hero">
          <div className="hero-text">
            <h1 className="hero-name">{t.name}</h1>
            <p className="hero-lede">{t.lede}</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#contacto">
                {t.navContact}
              </a>
              <a className="btn" href="#historia">
                {t.scrollCue}
              </a>
            </div>
          </div>
          <figure className="hero-photo">
            <img
              src={profileImg}
              alt={
                lang === 'es'
                  ? 'Luis Carlos Galván con bata de laboratorio sosteniendo una caja de muestra de suelo'
                  : 'Luis Carlos Galván in a lab coat holding a soil sample box'
              }
              width={960}
              height={1280}
            />
            <figcaption className="tape">{t.photoCaption}</figcaption>
          </figure>
        </section>

        <section id="historia" className="log" aria-label={t.navStory}>
          {strata.map((s, i) => (
            <article
              key={s.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className="stratum"
              aria-labelledby={`t-${s.id}`}
            >
              <div className="ruler" aria-hidden="true">
                <span className="ruler-top tnum">{fmt(s.top)} m</span>
              </div>
              <div className={`column soil-${s.soil}`} aria-hidden="true">
                <span className="soil-name">{s.soilName[lang]}</span>
              </div>
              <div className="stratum-body">
                <p className="when">
                  <span className="sr-only">
                    {fmt(s.top)} – {fmt(s.bottom)} m, {s.soilName[lang]}.{' '}
                  </span>
                  {s.when[lang]}
                </p>
                <h2 id={`t-${s.id}`}>{s.title[lang]}</h2>
                {s.body.map((p, k) => (
                  <p key={k} className="prose">
                    {p[lang]}
                  </p>
                ))}
                {s.link && (
                  <a className="inline-link" href={s.link.href} target="_blank" rel="noreferrer">
                    {s.link.label[lang]}
                  </a>
                )}
                {s.note && <p className="note">{s.note[lang]}</p>}
              </div>
            </article>
          ))}
          <div className="log-end" aria-hidden="true">
            <div className="ruler">
              <span className="ruler-top tnum">{fmt(TOTAL_DEPTH)} m</span>
            </div>
            <div className="column column-end" />
          </div>
        </section>

        <section id="muestras" className="samples">
          <div className="samples-head">
            <h2>{t.samplesTitle}</h2>
            <p className="prose">{t.samplesIntro}</p>
          </div>
          <ul className="sample-list">
            {samples.map((s) => (
              <li key={s.code} className="sample">
                <span className="sample-code tnum">{s.code}</span>
                <div className="sample-main">
                  <h3>
                    <a href={s.href} target="_blank" rel="noreferrer">
                      {s.name}
                    </a>
                  </h3>
                  <p>{s.what[lang]}</p>
                </div>
                <p className="sample-where">{s.where[lang]}</p>
                <p className="sample-stack">{s.stack}</p>
                <span className="sample-open" aria-hidden="true">
                  {t.open}
                </span>
              </li>
            ))}
          </ul>
          <aside className="lgi">
            <h3>{t.lgiTitle}</h3>
            <p>{t.lgiBody}</p>
            <ul>
              {t.lgiLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <section id="contacto" className="end">
          <h2>{t.endTitle}</h2>
          <p className="end-body">{t.endBody}</p>
          <a className="end-mail" href={`mailto:${LINKS.email}`}>
            {LINKS.email}
          </a>
          <ul className="end-links">
            <li>
              <a href={LINKS.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={LINKS.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href={LINKS.whatsapp} target="_blank" rel="noreferrer">
                {t.contactWhatsapp}
              </a>
            </li>
          </ul>
        </section>
      </main>

      <footer className="foot">
        <p>
          © {new Date().getFullYear()} {t.footer}
        </p>
      </footer>
    </div>
  );
}
