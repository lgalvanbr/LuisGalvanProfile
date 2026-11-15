// @ts-nocheck
// Scenes for portfolio projects that are not on the hub, drawn with the hub's own isometric engine
// and animation classes so every card reads as one set.
import { S, P, makeIso, box } from './hubScenes';

const MONO = 'Atkinson Hyperlegible Mono, monospace';

function floorGrid(svg, iso, n = 120, step = 20) {
  const g = S('g', { stroke: '#24302c', 'stroke-width': 1 }, svg);
  for (let k = -n; k <= n; k += step) {
    S('line', { x1: iso(k, -n)[0], y1: iso(k, -n)[1], x2: iso(k, n)[0], y2: iso(k, n)[1] }, g);
    S('line', { x1: iso(-n, k)[0], y1: iso(-n, k)[1], x2: iso(n, k)[0], y2: iso(n, k)[1] }, g);
  }
}

function worker(svg, helmet = 'var(--amber)', vest = '#ff8a3d') {
  const w = S('g', {}, svg);
  S('ellipse', { cx: 0, cy: 1, rx: 6, ry: 2.5, fill: '#000', opacity: 0.3 }, w);
  S('rect', { x: -3.5, y: -13, width: 7, height: 13, rx: 3, fill: vest }, w);
  S('circle', { cx: 0, cy: -16, r: 3.6, fill: '#e2b48c' }, w);
  if (helmet) S('path', { d: 'M-4.5 -17 A4.5 4.5 0 0 1 4.5 -17 Z', fill: helmet }, w);
  return w;
}

function tag(svg, x, y, text, color, cls) {
  const g = S('g', cls ? { class: cls } : {}, svg);
  const w = text.length * 6.4 + 10;
  S('rect', { x, y, width: w, height: 16, rx: 3, fill: '#121816', stroke: color }, g);
  S('text', { x: x + 5, y: y + 11.5, fill: color, 'font-size': 10.5, 'font-family': MONO }, g).textContent = text;
  return g;
}

function phone(svg, x, y, w = 62, h = 112) {
  const g = S('g', { transform: `translate(${x} ${y})` }, svg);
  S('rect', { x: 0, y: 0, width: w, height: h, rx: 10, fill: '#0e1311', stroke: '#56655f', 'stroke-width': 1.5 }, g);
  S('rect', { x: 5, y: 9, width: w - 10, height: h - 18, rx: 4, fill: '#1a2220' }, g);
  return g;
}

export const MORE_SCENES = {
  // Vivienda de dos pisos con una grieta diagonal, un pin de reporte y el dictamen en el teléfono
  inspector(svg) {
    const iso = makeIso(150, 150);
    floorGrid(svg, iso, 100);
    S('polygon', { points: P([iso(-46, -36), iso(52, -36), iso(52, 40), iso(-46, 40)]), fill: '#000', opacity: 0.28 }, svg);
    const H = 30;
    for (let i = 0; i < 2; i++) {
      const z0 = i * H, z1 = z0 + H - 3;
      const f = box(iso, svg, [-40, -30, 46, 34, z0, z1], ['#e7d8c8', '#9a5a3c', '#c27a52'], { class: 'drop', style: `animation-delay:${0.15 + i * 0.25}s` });
      // ventanas en la fachada frontal
      const win = S('g', { fill: '#2a3330' }, f);
      for (const x of [-26, 0, 24]) {
        const a = iso(x, 34, z0 + 8), b = iso(x + 12, 34, z0 + 8), c = iso(x + 12, 34, z1 - 6), d = iso(x, 34, z1 - 6);
        S('polygon', { points: P([a, b, c, d]) }, win);
      }
      // viga de confinamiento
      S('polyline', { points: P([iso(-40, 34, z1), iso(46, 34, z1), iso(46, -30, z1)]), fill: 'none', stroke: '#ecede6', 'stroke-width': 2 }, f);
    }
    // cubierta inclinada
    box(iso, svg, [-44, -34, 50, 38, 2 * H - 3, 2 * H + 1], ['#6f4a3a', '#4a3027', '#5c3b2f'], { class: 'drop', style: 'animation-delay:.7s' });
    // grieta escalonada que se dibuja
    const c = [iso(-10, 34, 52), iso(-4, 34, 46), iso(-4, 34, 40), iso(4, 34, 34), iso(4, 34, 28), iso(12, 34, 20), iso(12, 34, 12)];
    S('polyline', { points: P(c), fill: 'none', stroke: 'var(--coral)', 'stroke-width': 2.5, 'stroke-linejoin': 'round', pathLength: 1, class: 'draw-loop' }, svg);
    // pin de reporte
    const pp = iso(4, 34, 34);
    S('circle', { cx: pp[0], cy: pp[1], r: 6, fill: 'none', stroke: 'var(--coral)', 'stroke-width': 2, class: 'ring' }, svg);
    const pin = S('g', { class: 'pin' }, svg);
    const top = iso(20, -10, 2 * H + 6);
    S('line', { x1: top[0], y1: top[1], x2: top[0], y2: top[1] - 16, stroke: 'var(--coral)', 'stroke-width': 2 }, pin);
    S('circle', { cx: top[0], cy: top[1] - 23, r: 9, fill: 'var(--coral)' }, pin);
    S('text', { x: top[0], y: top[1] - 19, 'text-anchor': 'middle', fill: '#2a0d0a', 'font-size': 12, 'font-weight': 700, 'font-family': 'Atkinson Hyperlegible Next, sans-serif' }, pin).textContent = '!';
    // teléfono con el dictamen
    const ph = phone(svg, 300, 62);
    S('rect', { x: 11, y: 18, width: 40, height: 26, rx: 3, fill: '#24302c' }, ph);
    S('path', { d: 'M16 38 L24 28 L30 33 L38 24 L46 36', fill: 'none', stroke: 'var(--sky)', 'stroke-width': 1.5 }, ph);
    [['var(--teal)', 58], ['var(--amber)', 58], ['var(--coral)', 58]].forEach(([fill], k) => {
      S('circle', { cx: 17 + k * 14, cy: 58, r: 5, fill, opacity: k === 1 ? 1 : 0.3 }, ph);
    });
    S('rect', { x: 9, y: 70, width: 44, height: 14, rx: 3, fill: 'var(--amber)', class: 'hit' }, ph);
    S('text', { x: 31, y: 80, 'text-anchor': 'middle', fill: '#2a1d05', 'font-size': 8, 'font-family': MONO }, ph).textContent = 'RESTRINGIDO';
    S('line', { x1: pp[0] + 4, y1: pp[1], x2: 300, y2: 110, stroke: 'var(--coral)', 'stroke-width': 1.5, 'stroke-dasharray': '4 4', class: 'flow' }, svg);
    tag(svg, 24, 20, 'NSR-10 · FEMA 154', 'var(--muted)');
  },

  // Edificio en la obra y su modelo proyectado a escala 1:1 desde el teléfono
  ciamar(svg) {
    const iso = makeIso(150, 150);
    floorGrid(svg, iso, 100);
    const cols = [[-40, -30], [40, -30], [-40, 30], [40, 30]];
    // pórtico estructural en alambre
    const fr = S('g', { stroke: 'var(--sky)', 'stroke-width': 2, fill: 'none' }, svg);
    for (const [x, y] of cols) {
      const a = iso(x, y, 0), b = iso(x, y, 84);
      S('line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1], pathLength: 1, class: 'draw-loop' }, fr);
    }
    for (const z of [28, 56, 84]) {
      S('polygon', { points: P([iso(-40, -30, z), iso(40, -30, z), iso(40, 30, z), iso(-40, 30, z)]), pathLength: 1, class: 'draw-loop', style: `animation-delay:${z / 140}s` }, fr);
    }
    // losas que se materializan
    for (const [i, z] of [28, 56, 84].entries()) {
      S('polygon', { points: P([iso(-40, -30, z), iso(40, -30, z), iso(40, 30, z), iso(-40, 30, z)]), fill: 'rgba(95,178,230,.22)', class: 'meshin', style: `animation-delay:${i * 0.4}s` }, svg);
    }
    // teléfono que proyecta
    const ph = phone(svg, 296, 70, 58, 104);
    const mini = S('g', { stroke: 'var(--sky)', 'stroke-width': 1.4, fill: 'none' }, ph);
    S('path', { d: 'M16 80 V40 L29 33 L42 40 V80 M16 60 H42 M16 40 L29 47 L42 40 M29 47 V87' }, mini);
    S('text', { x: 29, y: 25, 'text-anchor': 'middle', fill: 'var(--sky)', 'font-size': 9, 'font-family': MONO }, ph).textContent = 'AR 1:1';
    const t1 = iso(40, -30, 84), t2 = iso(40, 30, 0);
    S('line', { x1: 296, y1: 96, x2: t1[0], y2: t1[1], stroke: 'var(--violet)', 'stroke-width': 1.5, class: 'laser' }, svg);
    S('line', { x1: 296, y1: 150, x2: t2[0], y2: t2[1], stroke: 'var(--violet)', 'stroke-width': 1.5, class: 'laser' }, svg);
    const p = worker(svg, 'var(--amber)');
    p.setAttribute('transform', `translate(${iso(70, 60)[0]} ${iso(70, 60)[1]})`);
  },

  // Tanque enterrado bajo la losa: el nivel sube y baja, el sensor transmite
  tanque(svg) {
    // corte del suelo
    S('rect', { x: 0, y: 92, width: 400, height: 148, fill: '#1b211f' }, svg);
    const soil = S('g', { fill: '#2a3330' }, svg);
    for (let i = 0; i < 70; i++) S('circle', { cx: (i * 53) % 400, cy: 104 + ((i * 37) % 130), r: 1.4 }, soil);
    S('rect', { x: 0, y: 84, width: 400, height: 10, fill: '#56655f' }, svg);
    // surtidor
    S('rect', { x: 292, y: 40, width: 30, height: 44, rx: 3, fill: '#2a3330', stroke: '#56655f' }, svg);
    S('rect', { x: 298, y: 48, width: 18, height: 12, rx: 2, fill: 'var(--teal)', opacity: 0.7 }, svg);
    // tanque (corte longitudinal)
    S('rect', { x: 90, y: 120, width: 200, height: 92, rx: 46, fill: '#121816', stroke: '#b4b8ae', 'stroke-width': 2 }, svg);
    const clip = S('clipPath', { id: 'tq-clip' }, svg);
    S('rect', { x: 92, y: 122, width: 196, height: 88, rx: 44 }, clip);
    const liq = S('g', { 'clip-path': 'url(#tq-clip)' }, svg);
    S('rect', { x: 90, y: 150, width: 200, height: 70, fill: 'rgba(242,184,75,.55)', class: 'rise-loop' }, liq);
    S('line', { x1: 160, y1: 94, x2: 160, y2: 122, stroke: '#b4b8ae', 'stroke-width': 6 }, svg);
    // sensor en el fondo y cable al ESP32
    S('rect', { x: 186, y: 200, width: 10, height: 10, fill: 'var(--teal)' }, svg);
    S('polyline', { points: '191,200 191,110 250,110 250,70 340,70', fill: 'none', stroke: 'var(--teal)', 'stroke-width': 1.6, 'stroke-dasharray': '4 4', class: 'flow' }, svg);
    S('rect', { x: 340, y: 58, width: 40, height: 24, rx: 4, fill: '#121816', stroke: 'var(--teal)', 'stroke-width': 1.5 }, svg);
    S('text', { x: 360, y: 74, 'text-anchor': 'middle', fill: 'var(--teal)', 'font-size': 9.5, 'font-family': MONO }, svg).textContent = 'ESP32';
    S('circle', { cx: 360, cy: 46, r: 6, fill: 'none', stroke: 'var(--teal)', 'stroke-width': 1.5, class: 'ring' }, svg);
    tag(svg, 18, 20, 'nivel 1,42 m · sin fuga', 'var(--amber)');
  },

  // Bodega con paneles que aparecen en la cubierta, sol que gira y energía hacia el inversor
  solar(svg) {
    const iso = makeIso(170, 120);
    floorGrid(svg, iso, 110);
    box(iso, svg, [-60, -40, 60, 40, 0, 44], ['#3a4541', '#24302c', '#2f3b37'], { class: 'drop' });
    const panels = S('g', { class: 'solar' }, svg);
    for (let x = -54; x < 54; x += 18) {
      for (let y = -34; y < 34; y += 22) {
        S('polygon', { points: P([iso(x, y, 46), iso(x + 15, y, 46), iso(x + 15, y + 18, 46), iso(x, y + 18, 46)]), fill: '#1f4f8a', stroke: '#5fb2e6', 'stroke-width': 0.8 }, panels);
      }
    }
    // sol
    const sun = S('g', { transform: 'translate(340 40)' }, svg);
    S('circle', { r: 14, fill: 'var(--amber)' }, sun);
    const rays = S('g', { class: 'spin', style: 'transform-origin: 340px 40px', stroke: 'var(--amber)', 'stroke-width': 2 }, svg);
    for (let k = 0; k < 8; k++) {
      const a = (k / 8) * Math.PI * 2;
      S('line', { x1: 340 + Math.cos(a) * 20, y1: 40 + Math.sin(a) * 20, x2: 340 + Math.cos(a) * 28, y2: 40 + Math.sin(a) * 28 }, rays);
    }
    // energía al inversor
    const a = iso(60, 0, 20);
    S('polyline', { points: `${a[0]},${a[1]} 330,${a[1]} 330,190`, fill: 'none', stroke: 'var(--amber)', 'stroke-width': 2, 'stroke-dasharray': '5 5', class: 'flow' }, svg);
    S('rect', { x: 312, y: 190, width: 36, height: 30, rx: 4, fill: '#121816', stroke: 'var(--amber)', 'stroke-width': 1.5 }, svg);
    S('path', { d: 'M320 205 q4 -8 8 0 t8 0', fill: 'none', stroke: 'var(--amber)', 'stroke-width': 1.5 }, svg);
    tag(svg, 18, 20, '30+ kWp · Pailitas', 'var(--amber)');
  },

  // Humanoide recorriendo una oficina escaneada; el LiDAR va dejando puntos en los muros
  robot(svg) {
    const iso = makeIso(200, 86);
    S('polygon', { points: P([iso(0, 0), iso(150, 0), iso(150, 130), iso(0, 130)]), fill: '#1b2321' }, svg);
    box(iso, svg, [0, 0, 150, 6, 0, 50], ['#3f4b47', '#2a3330', '#34403c']);
    box(iso, svg, [0, 0, 6, 130, 0, 50], ['#3f4b47', '#2a3330', '#34403c']);
    box(iso, svg, [70, 50, 110, 70, 0, 18], ['#5c3b2f', '#3d2820', '#4a3027']);
    // puntos LiDAR sobre los muros
    const pts = S('g', { fill: 'var(--lime)' }, svg);
    for (let i = 0; i < 46; i++) {
      const onBack = i % 2 === 0;
      const u = 8 + ((i * 29) % 136), z = 6 + ((i * 17) % 40);
      const p = onBack ? iso(u, 6, z) : iso(6, u, z);
      S('circle', { cx: p[0], cy: p[1], r: 1.3, class: 'scanpt', style: `animation-delay:${(i % 23) * 0.12}s` }, pts);
    }
    // ruta y robot
    const route = `M${P([iso(30, 110)])} L${P([iso(30, 30)])} L${P([iso(130, 30)])} L${P([iso(130, 110)])} Z`;
    S('path', { d: route, fill: 'none', stroke: 'var(--sky)', 'stroke-width': 1.5, 'stroke-dasharray': '4 5', opacity: 0.7 }, svg);
    const r = S('g', {}, svg);
    S('ellipse', { cx: 0, cy: 1, rx: 8, ry: 3, fill: '#000', opacity: 0.35 }, r);
    S('circle', { cx: 0, cy: -10, r: 26, fill: 'rgba(200,226,60,.08)', stroke: 'var(--lime)', 'stroke-width': 1, class: 'ring' }, r);
    S('line', { x1: -3, y1: 0, x2: -3, y2: -12, stroke: '#ecede6', 'stroke-width': 3, 'stroke-linecap': 'round' }, r);
    S('line', { x1: 3, y1: 0, x2: 3, y2: -12, stroke: '#ecede6', 'stroke-width': 3, 'stroke-linecap': 'round' }, r);
    S('rect', { x: -6, y: -26, width: 12, height: 15, rx: 4, fill: '#ecede6' }, r);
    S('circle', { cx: 0, cy: -31, r: 4.5, fill: '#ecede6' }, r);
    S('rect', { x: -3, y: -33, width: 6, height: 3, rx: 1.5, fill: '#121816' }, r);
    S('animateMotion', { path: route, dur: '16s', repeatCount: 'indefinite' }, r);
    tag(svg, 18, 210, 'Unitree G1 · Isaac Lab', 'var(--lime)');
  },

  // Cuenca con río, bosque, mina a cielo abierto y contratos; un satélite barre la escena
  corpocesar(svg) {
    S('rect', { x: 0, y: 0, width: 400, height: 240, fill: '#1b2321' }, svg);
    // curvas de nivel
    const ct = S('g', { fill: 'none', stroke: '#2a3330', 'stroke-width': 1 }, svg);
    for (let k = 0; k < 6; k++) S('path', { d: `M-10 ${40 + k * 16} C120 ${20 + k * 20} 240 ${90 + k * 8} 410 ${30 + k * 22}` }, ct);
    // zona inundable
    S('path', { d: 'M-10 120 C80 124 110 176 170 178 S262 148 300 200 382 250 410 248 L410 240 L-10 240 Z', fill: 'rgba(95,178,230,.16)', stroke: 'var(--sky)', 'stroke-width': 1, 'stroke-dasharray': '5 4' }, svg);
    // río
    S('path', { d: 'M-10 140 C80 146 100 196 170 198 S270 166 300 218 380 260 410 258', fill: 'none', stroke: 'var(--sky)', 'stroke-width': 4, pathLength: 1, class: 'draw-loop' }, svg);
    // bosque
    const fo = S('g', {}, svg);
    for (let i = 0; i < 22; i++) {
      const x = 20 + ((i * 47) % 130), y = 168 + ((i * 23) % 60);
      S('circle', { cx: x, cy: y, r: 6, fill: 'var(--green)', opacity: i % 5 === 0 ? 0.25 : 0.85, class: i % 5 === 0 ? 'blink' : '' }, fo);
    }
    // mina con bancos
    const mine = S('g', {}, svg);
    S('polygon', { points: '250,40 340,40 330,96 262,96', fill: '#5c4a2a', stroke: 'var(--amber)', 'stroke-width': 1.5 }, mine);
    for (const [i, y] of [52, 66, 80].entries()) S('line', { x1: 252 + i * 3, y1: y, x2: 338 - i * 3, y2: y, stroke: '#a07c3a', 'stroke-width': 1 }, mine);
    // contratos
    for (const [x, y, d] of [[120, 160, '0s'], [210, 150, '.4s'], [60, 120, '.8s']]) {
      const g = S('g', { class: 'pin', style: `animation-delay:${d}` }, svg);
      S('rect', { x: x - 9, y: y - 9, width: 18, height: 18, rx: 3, fill: 'var(--coral)' }, g);
      S('text', { x, y: y + 4.5, 'text-anchor': 'middle', fill: '#2a0d0a', 'font-size': 12, 'font-weight': 700, 'font-family': MONO }, g).textContent = '$';
    }
    // barrido del satélite
    const band = S('g', { class: 'scanband' }, svg);
    S('rect', { x: 0, y: 0, width: 40, height: 240, fill: 'rgba(236,237,230,.06)' }, band);
    S('line', { x1: 40, y1: 0, x2: 40, y2: 240, stroke: 'rgba(236,237,230,.35)', 'stroke-width': 1 }, band);
    const sat = S('g', { class: 'drift' }, svg);
    S('rect', { x: 186, y: 10, width: 16, height: 10, rx: 2, fill: '#ecede6' }, sat);
    S('rect', { x: 166, y: 12, width: 18, height: 6, fill: 'var(--sky)' }, sat);
    S('rect', { x: 204, y: 12, width: 18, height: 6, fill: 'var(--sky)' }, sat);
    tag(svg, 18, 18, 'Sentinel-2 · HAND · SECOP', 'var(--muted)');
  },

  // Frente de obra visto por una cámara: cajas de detección y un trabajador sin casco
  vision(svg) {
    const iso = makeIso(200, 110);
    floorGrid(svg, iso, 110);
    // andamio
    const sc = S('g', { stroke: '#56655f', 'stroke-width': 2 }, svg);
    for (const x of [-20, 30, 80]) {
      const a = iso(x, -60, 0), b = iso(x, -60, 90);
      S('line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1] }, sc);
    }
    for (const z of [30, 60, 90]) {
      const a = iso(-20, -60, z), b = iso(80, -60, z);
      S('line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1] }, sc);
    }
    box(iso, svg, [-70, 10, -20, 40, 0, 12], ['#8a9088', '#56655f', '#6b7470']);
    // trabajadores
    const people = [
      [iso(0, 30), 'var(--amber)', 'var(--lime)', 'persona 0,94', 'hit'],
      [iso(40, 40), 'var(--sky)', 'var(--lime)', 'persona 0,91', 'hit'],
      [iso(30, -40, 30), null, 'var(--coral)', 'sin casco', 'blink-box'],
    ];
    for (const [[x, y], helmet, color, label] of people) {
      const w = worker(svg, helmet);
      w.setAttribute('transform', `translate(${x} ${y})`);
      const g = S('g', { class: 'hit' }, svg);
      S('rect', { x: x - 9, y: y - 24, width: 18, height: 27, fill: 'none', stroke: color, 'stroke-width': 1.6 }, g);
      S('rect', { x: x - 9, y: y - 36, width: label.length * 5.6 + 6, height: 11, fill: color }, g);
      S('text', { x: x - 6, y: y - 27.5, fill: '#121816', 'font-size': 8.5, 'font-family': MONO }, g).textContent = label;
    }
    // cámara
    S('line', { x1: 40, y1: 220, x2: 40, y2: 60, stroke: '#56655f', 'stroke-width': 3 }, svg);
    S('rect', { x: 28, y: 46, width: 30, height: 18, rx: 3, fill: '#2a3330', stroke: '#8a9088' }, svg);
    S('circle', { cx: 52, cy: 55, r: 3, fill: 'var(--coral)', class: 'blink' }, svg);
    tag(svg, 300, 20, 'YOLO · ByteTrack', 'var(--lime)');
  },
};
