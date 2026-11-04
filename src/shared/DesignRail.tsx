// Side switcher between the home-page designs. Only shown on the design routes.
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import './rail.css';

export const designs = [
  { path: '/', key: 'A', name: 'Apple', note: 'Principal' },
  { path: '/comic', key: 'C', name: 'Cómic', note: 'Viñetas' },
  { path: '/espacial', key: 'E', name: 'Espacial', note: 'Órbita' },
  { path: '/laminas', key: 'L', name: 'Láminas', note: 'Planos técnicos' },
];

export default function DesignRail() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  if (!designs.some((d) => d.path === pathname)) return null;
  return (
    <nav className={`drail${open ? ' open' : ''}`} aria-label="Diseños" onMouseLeave={() => setOpen(false)}>
      <button className="drail-toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open} onMouseEnter={() => setOpen(true)}>
        <span className="drail-grid" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className="drail-title">Diseños</span>
      </button>
      <ul>
        {designs.map((d) => {
          const on = d.path === pathname;
          return (
            <li key={d.path}>
              <Link to={d.path} className={on ? 'on' : ''} aria-current={on ? 'page' : undefined} onClick={() => window.scrollTo(0, 0)}>
                {on && <motion.span layoutId="drail-on" className="drail-on" transition={{ type: 'spring', stiffness: 450, damping: 34 }} />}
                <span className="drail-key">{d.key}</span>
                <AnimatePresence>
                  {open && (
                    <motion.span className="drail-label" initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }} transition={{ duration: 0.15 }}>
                      <b>{d.name}</b>
                      <small>{d.note}</small>
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
