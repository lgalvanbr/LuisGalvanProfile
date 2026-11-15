// @ts-nocheck
// Isometric scene engine and scenes ported verbatim from sinergiahub.cuadreb.com (hub.luisgalvan.me/index.html).
// Each scene draws into an <svg viewBox="0 0 400 240"> and animates with the classes defined in orbita.css.
const NS = 'http://www.w3.org/2000/svg';
const S = (tag, attrs = {}, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); parent?.append(e); return e; };
const P = (arr) => arr.map((p) => p.map((n) => n.toFixed(1)).join(',')).join(' ');
const makeIso = (ox, oy) => (x, y, z = 0) => [ox + (x - y) * 0.866, oy + (x + y) * 0.5 - z];
// Caja isométrica: caras superior, frontal izquierda y frontal derecha
function box(iso, g, [x0, y0, x1, y1, z0, z1], [top, left, right], extra = {}) {
  const b = S('g', extra, g);
  S('polygon', { points: P([iso(x0, y1, z0), iso(x1, y1, z0), iso(x1, y1, z1), iso(x0, y1, z1)]), fill: left }, b);
  S('polygon', { points: P([iso(x1, y0, z0), iso(x1, y1, z0), iso(x1, y1, z1), iso(x1, y0, z1)]), fill: right }, b);
  S('polygon', { points: P([iso(x0, y0, z1), iso(x1, y0, z1), iso(x1, y1, z1), iso(x0, y1, z1)]), fill: top }, b);
  return b;
}

const SCENES = {
  workshop(svg) {
    const iso = makeIso(200, 168);
    // piso cuadriculado
    const grid = S('g', { stroke: '#24302c', 'stroke-width': 1 }, svg);
    for (let k = -120; k <= 120; k += 20) {
      S('line', { x1: iso(k, -100)[0], y1: iso(k, -100)[1], x2: iso(k, 100)[0], y2: iso(k, 100)[1] }, grid);
      S('line', { x1: iso(-120, k)[0], y1: iso(-120, k)[1], x2: iso(120, k)[0], y2: iso(120, k)[1] }, grid);
    }
    S('polygon', { points: P([iso(-64, -44), iso(70, -44), iso(70, 52), iso(-64, 52)]), fill: '#000', opacity: .28 }, svg);
    // edificio: 4 pisos que caen en su lugar uno tras otro
    const H = 22;
    for (let i = 0; i < 4; i++) {
      const z0 = i * H, z1 = z0 + H - 2;
      const f = box(iso, svg, [-60, -40, 60, 40, z0, z1], ['#cfe0d8', '#1f6f66', '#2fa596'], { class: 'drop', style: `animation-delay:${0.15 + i * 0.22}s` });
      const mull = S('g', { stroke: 'rgba(255,255,255,.28)', 'stroke-width': 1 }, f);
      for (let x = -40; x <= 40; x += 20) { const a = iso(x, 40, z0 + 3), b = iso(x, 40, z1 - 3); S('line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1] }, mull); }
      for (let y = -20; y <= 20; y += 20) { const a = iso(60, y, z0 + 3), b = iso(60, y, z1 - 3); S('line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1] }, mull); }
      S('polyline', { points: P([iso(-60, 40, z1), iso(60, 40, z1), iso(60, -40, z1)]), fill: 'none', stroke: '#ecede6', 'stroke-width': 2 }, f);
    }
    box(iso, svg, [-30, -25, -5, 0, 4 * H - 2, 4 * H + 12], ['#ffd27a', '#c98f2a', '#f2b84b'], { class: 'drop', style: 'animation-delay:1.1s' });
    // elemento seleccionado (se ilumina cuando llega el láser)
    S('polygon', { points: P([iso(60, -40, 2 * H), iso(60, 40, 2 * H), iso(60, 40, 3 * H - 2), iso(60, -40, 3 * H - 2)]), fill: 'var(--lime)', class: 'hit' }, svg);
    // plano de corte que recorre el edificio
    const sec = S('g', { class: 'sweep' }, svg);
    S('polygon', { points: P([iso(-82, -60), iso(82, -60), iso(82, 60), iso(-82, 60)]), fill: 'rgba(255,107,94,.16)', stroke: 'var(--coral)', 'stroke-width': 1.5, 'stroke-dasharray': '5 4' }, sec);
    // gafas de VR con su láser
    const vr = S('g', { transform: 'translate(36 30)' }, svg);
    S('rect', { x: 0, y: 0, width: 46, height: 24, rx: 9, fill: 'var(--violet)' }, vr);
    S('rect', { x: 6, y: 6, width: 14, height: 12, rx: 5, fill: '#2b1f52' }, vr);
    S('rect', { x: 26, y: 6, width: 14, height: 12, rx: 5, fill: '#2b1f52' }, vr);
    S('rect', { x: 18, y: -6, width: 10, height: 8, rx: 3, fill: '#7c5ee0' }, vr);
    const tgt = iso(60, 0, 2.5 * H);
    S('line', { x1: 82, y1: 46, x2: tgt[0], y2: tgt[1], stroke: 'var(--violet)', 'stroke-width': 2.5, 'stroke-linecap': 'round', class: 'laser' }, svg);
    S('circle', { cx: tgt[0], cy: tgt[1], r: 5, fill: 'none', stroke: 'var(--lime)', 'stroke-width': 2, class: 'ring' }, svg);
    // medición sobre la arista del frente
    const m0 = iso(72, 40), m1 = iso(72, -40);
    S('line', { x1: m0[0], y1: m0[1], x2: m1[0], y2: m1[1], stroke: 'var(--lime)', 'stroke-width': 2.5, 'stroke-linecap': 'round', class: 'measure' }, svg);
    const ml = iso(80, 0);
    const lab = S('g', { class: 'measure-label' }, svg);
    S('rect', { x: ml[0] - 4, y: ml[1] - 1, width: 46, height: 17, rx: 4, fill: '#121816', stroke: 'var(--lime)' }, lab);
    S('text', { x: ml[0] + 19, y: ml[1] + 11.5, 'text-anchor': 'middle', fill: 'var(--lime)', 'font-size': 11, 'font-family': 'Atkinson Hyperlegible Mono, monospace' }, lab).textContent = '16,0 m';
    // observación (pin) sobre la cubierta
    const pp = iso(20, -20, 4 * H + 4);
    const pin = S('g', { class: 'pin' }, svg);
    S('line', { x1: pp[0], y1: pp[1], x2: pp[0], y2: pp[1] - 18, stroke: 'var(--coral)', 'stroke-width': 2 }, pin);
    S('circle', { cx: pp[0], cy: pp[1] - 25, r: 9, fill: 'var(--coral)' }, pin);
    S('text', { x: pp[0], y: pp[1] - 21, 'text-anchor': 'middle', fill: '#2a0d0a', 'font-size': 12, 'font-weight': 700, 'font-family': 'Atkinson Hyperlegible Next, sans-serif' }, pin).textContent = '!';
    // dos personas con casco caminando por el frente del edificio
    const route = `M${P([iso(-88, 62)])} L${P([iso(86, 62)])} L${P([iso(86, -62)])} L${P([iso(86, 62)])} Z`;
    [['var(--amber)', '0s'], ['var(--sky)', '-7s']].forEach(([helmet, begin]) => {
      const w = S('g', {}, svg);
      S('ellipse', { cx: 0, cy: 1, rx: 6, ry: 2.5, fill: '#000', opacity: .3 }, w);
      S('rect', { x: -3.5, y: -13, width: 7, height: 13, rx: 3, fill: '#ff8a3d' }, w);
      S('circle', { cx: 0, cy: -16, r: 3.6, fill: '#e2b48c' }, w);
      S('path', { d: 'M-4.5 -17 A4.5 4.5 0 0 1 4.5 -17 Z', fill: helmet }, w);
      S('animateMotion', { path: route, dur: '14s', begin, repeatCount: 'indefinite' }, w);
    });
  },

  wanchaq(svg) {
    const iso = makeIso(200, 42);
    const s = 50, r = 16, T = 3 * s + 2 * r;
    S('polygon', { points: P([iso(-8, -8), iso(T + 8, -8), iso(T + 8, T + 8), iso(-8, T + 8)]), fill: '#2b3431' }, svg);
    // ejes de las vías (líneas discontinuas)
    const lanes = S('g', { stroke: 'rgba(236,237,230,.35)', 'stroke-width': 1, 'stroke-dasharray': '4 5' }, svg);
    for (const c of [s + r / 2, 2 * s + 1.5 * r]) {
      S('line', { x1: iso(-8, c)[0], y1: iso(-8, c)[1], x2: iso(T + 8, c)[0], y2: iso(T + 8, c)[1] }, lanes);
      S('line', { x1: iso(c, -8)[0], y1: iso(c, -8)[1], x2: iso(c, T + 8)[0], y2: iso(c, T + 8)[1] }, lanes);
    }
    const USES = {
      res: { lot: 'rgba(242,184,75,.30)', edge: '#f2b84b', faces: ['#ffd88f', '#b98322', '#e8a93a'] },
      com: { lot: 'rgba(160,124,255,.28)', edge: '#a07cff', faces: ['#cdb8ff', '#6a4fc4', '#8e6cf2'] },
      eq: { lot: 'rgba(95,178,230,.28)', edge: '#5fb2e6', faces: ['#a9dcfa', '#2f7fb3', '#4ea2d8'] },
      park: { lot: 'rgba(143,212,90,.35)', edge: '#8fd45a' },
    };
    const plan = [['res', 'com', 'park'], ['com', 'eq', 'res'], ['res', 'park', 'com']];
    const blocks = S('g', {}, svg), cars = S('g', {}, svg);
    let delay = 0.1;
    // se dibujan de atrás hacia adelante para que los edificios se tapen bien
    const order = [];
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) order.push([i, j]);
    order.sort((a, b) => a[0] + a[1] - (b[0] + b[1]));
    for (const [i, j] of order) {
      const u = i * (s + r), v = j * (s + r), use = USES[plan[j][i]];
      S('polygon', { points: P([iso(u, v), iso(u + s, v), iso(u + s, v + s), iso(u, v + s)]), fill: use.lot, stroke: use.edge, 'stroke-width': 1.2 }, blocks);
      const kind = plan[j][i];
      if (kind === 'park') {
        for (const [a, b] of [[14, 14], [34, 18], [20, 34], [38, 38], [10, 40]]) {
          const t = iso(u + a, v + b);
          const tree = S('g', { class: 'sway', style: `animation-delay:${-(a + b) / 20}s` }, blocks);
          S('rect', { x: t[0] - 1, y: t[1] - 8, width: 2, height: 8, fill: '#6b4a2b' }, tree);
          S('circle', { cx: t[0], cy: t[1] - 11, r: 6, fill: '#5fbf4a' }, tree);
        }
        continue;
      }
      const lots = kind === 'res' ? [[6, 6, 22, 22, 26], [28, 26, 44, 44, 18], [28, 6, 44, 20, 34]]
        : kind === 'com' ? [[8, 8, 42, 42, 44]]
        : [[5, 10, 45, 40, 16]];
      if (i === 2 && j === 1) { // lote con intervención: anillo y edificio nuevo que se levanta en bucle
        const ring = S('polygon', { points: P([iso(u + 2, v + 2), iso(u + s - 2, v + 2), iso(u + s - 2, v + s - 2), iso(u + 2, v + s - 2)]), fill: 'none', stroke: 'var(--coral)', 'stroke-width': 2.5, class: 'lot-pulse' }, blocks);
        box(iso, blocks, [u + 10, v + 10, u + 40, v + 40, 0, 50], ['#ffb3a8', '#c94a3f', '#ff6b5e'], { class: 'rise-loop' });
        continue;
      }
      for (const [a0, b0, a1, b1, h] of lots) {
        box(iso, blocks, [u + a0, v + b0, u + a1, v + b1, 0, h], use.faces, { class: 'grow', style: `animation-delay:${delay}s` });
        delay += 0.12;
      }
    }
    // semáforo en un cruce
    const sp = iso(s + 2, s + 2);
    S('rect', { x: sp[0] - 1, y: sp[1] - 16, width: 2, height: 16, fill: '#8a9088' }, svg);
    S('circle', { cx: sp[0], cy: sp[1] - 18, r: 3.2, class: 'blink', fill: 'var(--green)' }, svg);
    // carros circulando por las vías
    const c1 = s + r / 2 - 3, c2 = 2 * s + 1.5 * r + 3;
    const paths = [
      [[-8, c1], [T + 8, c1]], [[T + 8, c2], [-8, c2]], [[c1 + 6, -8], [c1 + 6, T + 8]],
      [[c2 - 6, T + 8], [c2 - 6, -8]], [[-8, c2 - 6], [T + 8, c2 - 6]], [[c1, T + 8], [c1, -8]],
    ];
    const colors = ['#ff6b5e', '#f2b84b', '#5fb2e6', '#ecede6', '#a07cff', '#c8e23c'];
    paths.forEach(([a, b], k) => {
      const car = S('g', {}, cars);
      S('ellipse', { cx: 0, cy: 0, rx: 4.5, ry: 2.6, fill: colors[k] }, car);
      S('ellipse', { cx: 0, cy: -1, rx: 2.2, ry: 1.2, fill: 'rgba(255,255,255,.55)' }, car);
      S('animateMotion', { path: `M${P([iso(...a)])} L${P([iso(...b)])}`, dur: `${5 + (k % 3) * 1.5}s`, begin: `${-k * 1.3}s`, repeatCount: 'indefinite' }, car);
    });
  },

  bogota(svg) {
    // silueta de la ciudad
    S('polygon', { points: P([[150, 12], [232, 10], [272, 40], [262, 92], [282, 140], [252, 200], [204, 230], [150, 226], [118, 182], [108, 122], [124, 60]]), fill: '#1e2a27', stroke: '#3f4b47', 'stroke-width': 1.2 }, svg);
    const grid = S('g', { stroke: '#26322e', 'stroke-width': 1 }, svg);
    for (let x = 120; x <= 280; x += 20) S('line', { x1: x, y1: 14, x2: x, y2: 228 }, grid);
    for (let y = 20; y <= 220; y += 20) S('line', { x1: 110, y1: y, x2: 280, y2: y }, grid);
    // corredor de la Av. 68 (franja de análisis)
    const av68 = 'M168 22 C 150 80 146 140 176 220';
    S('path', { d: av68, fill: 'none', stroke: 'var(--amber)', 'stroke-width': 16, opacity: .18, 'stroke-linecap': 'round' }, svg);
    S('path', { d: av68, fill: 'none', stroke: 'var(--amber)', 'stroke-width': 2 }, svg);
    // rutas SITP que se dibujan
    const routes = [
      ['M120 150 C 160 140 200 120 268 128', 'var(--coral)'],
      ['M140 40 C 180 70 220 60 262 84', 'var(--sky)'],
      ['M130 200 C 170 170 200 190 250 196', 'var(--violet)'],
      ['M226 16 C 210 80 230 140 206 226', 'var(--lime)'],
      ['M114 100 C 160 110 190 90 236 30', 'var(--green)'],
    ];
    routes.forEach(([d, c], k) => {
      S('path', { d, pathLength: 1, fill: 'none', stroke: c, 'stroke-width': 2.5, 'stroke-linecap': 'round', class: 'draw-loop', style: `animation-delay:${k * 0.5}s` }, svg);
      const bus = S('g', {}, svg);
      S('rect', { x: -4, y: -2.5, width: 8, height: 5, rx: 1.5, fill: c, stroke: '#121816', 'stroke-width': 1 }, bus);
      S('animateMotion', { path: d, dur: `${6 + k}s`, begin: `${-k * 1.7}s`, repeatCount: 'indefinite', rotate: 'auto' }, bus);
    });
    // Metro L1 con sus estaciones
    const metro = [[128, 206], [160, 178], [188, 152], [212, 118], [246, 72]];
    S('polyline', { points: P(metro), fill: 'none', stroke: 'var(--teal)', 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
    metro.forEach(([x, y], k) => {
      S('circle', { cx: x, cy: y, r: 4.5, fill: '#ecede6', stroke: 'var(--teal)', 'stroke-width': 2 }, svg);
      if (k === 2) S('circle', { cx: x, cy: y, r: 7, fill: 'none', stroke: 'var(--teal)', 'stroke-width': 2, class: 'ring' }, svg);
    });
    // leyenda
    [['Metro L1', 'var(--teal)'], ['Av. 68', 'var(--amber)'], ['Rutas SITP', 'var(--coral)']].forEach(([t, c], k) => {
      S('rect', { x: 300, y: 168 + k * 20, width: 14, height: 4, rx: 2, fill: c }, svg);
      S('text', { x: 320, y: 173 + k * 20, fill: 'var(--muted)', 'font-size': 11, 'font-family': 'Atkinson Hyperlegible Next, sans-serif' }, svg).textContent = t;
    });
  },

  bogota3d(svg) {
    const iso = makeIso(200, 74);
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const n = 6, step = 26, w = 18, T = n * step;
    S('polygon', { points: P([iso(-6, -6), iso(T, -6), iso(T, T), iso(-6, T)]), fill: '#2b3431' }, svg);
    const cells = [];
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) cells.push([i, j]);
    cells.sort((a, b) => a[0] + a[1] - (b[0] + b[1]));
    const pick = [3, 2];
    for (const [i, j] of cells) {
      const u = i * step, v = j * step;
      const center = 1 - Math.hypot(i - 2.5, j - 2.5) / 3.6;
      const h = Math.round(6 + rnd() * 26 + center * 40);
      const hot = i === pick[0] && j === pick[1];
      const faces = hot ? ['#e6f59a', '#7f9418', '#a8c22a'] : h > 45 ? ['#bfe9dc', '#1f6f66', '#2fa596'] : h > 25 ? ['#d6ddd9', '#3e4c48', '#5b6e68'] : ['#c9c4b4', '#5a5446', '#776f5d'];
      box(iso, svg, [u, v, u + w, v + w, 0, hot ? 70 : h], faces, { class: 'grow', style: `animation-delay:${0.08 * (i + j)}s` });
    }
    // ficha del edificio seleccionado
    const top = iso(pick[0] * step + w / 2, pick[1] * step + w / 2, 70);
    const tag = S('g', { class: 'pin' }, svg);
    S('line', { x1: top[0], y1: top[1], x2: top[0], y2: top[1] - 16, stroke: 'var(--lime)', 'stroke-width': 1.5 }, tag);
    S('rect', { x: top[0] - 30, y: top[1] - 34, width: 60, height: 18, rx: 4, fill: '#121816', stroke: 'var(--lime)' }, tag);
    S('text', { x: top[0], y: top[1] - 21.5, 'text-anchor': 'middle', fill: 'var(--lime)', 'font-size': 11, 'font-family': 'Atkinson Hyperlegible Mono, monospace' }, tag).textContent = '23 pisos';
    // carros por las calles entre manzanas
    const lanes = [[[-6, step - 4], [T, step - 4]], [[T, 3 * step - 4], [-6, 3 * step - 4]], [[2 * step - 4, -6], [2 * step - 4, T]], [[4 * step - 4, T], [4 * step - 4, -6]]];
    const colors = ['#ff6b5e', '#f2b84b', '#5fb2e6', '#ecede6'];
    lanes.forEach(([a, b], k) => {
      const car = S('circle', { r: 2.6, fill: colors[k] }, svg);
      S('animateMotion', { path: `M${P([iso(...a)])} L${P([iso(...b)])}`, dur: `${5 + k}s`, begin: `${-k * 1.4}s`, repeatCount: 'indefinite' }, car);
    });
  },

  vialab(svg) {
    const iso = makeIso(200, 118);
    const MONO = 'Atkinson Hyperlegible Mono, monospace';
    S('polygon', { points: P([iso(-220, -34), iso(220, -34), iso(220, 34), iso(-220, 34)]), fill: '#3a4541' }, svg);
    S('polygon', { points: P([iso(-220, -24), iso(220, -24), iso(220, 24), iso(-220, 24)]), fill: '#2b3431' }, svg);
    S('line', { x1: iso(-220, 0)[0], y1: iso(-220, 0)[1], x2: iso(220, 0)[0], y2: iso(220, 0)[1], stroke: 'rgba(236,237,230,.45)', 'stroke-width': 1.5, 'stroke-dasharray': '8 10', class: 'flow' }, svg);
    // línea de conteo
    const c0 = iso(20, -30), c1 = iso(20, 30);
    S('line', { x1: c0[0], y1: c0[1], x2: c1[0], y2: c1[1], stroke: 'var(--coral)', 'stroke-width': 2, 'stroke-dasharray': '5 4' }, svg);
    // cámara en un poste, con su campo de visión
    const pole = iso(-30, -48);
    S('polygon', { points: P([[pole[0] + 6, pole[1] - 56], iso(70, -24), iso(70, 24), iso(-40, 24)]), fill: 'rgba(160,124,255,.10)' }, svg);
    S('line', { x1: pole[0], y1: pole[1], x2: pole[0], y2: pole[1] - 56, stroke: '#8a9088', 'stroke-width': 2.5 }, svg);
    S('rect', { x: pole[0] - 4, y: pole[1] - 64, width: 18, height: 10, rx: 2, fill: 'var(--violet)' }, svg);
    S('circle', { cx: pole[0] + 12, cy: pole[1] - 59, r: 2, fill: 'var(--coral)', class: 'hit' }, svg);
    // vehículos con su recuadro de detección y humo
    const fleet = [
      { lane: -12, dir: 1, color: '#ff6b5e', label: 'auto 0,94', w: 11, dur: 6, begin: 0 },
      { lane: -12, dir: 1, color: '#f2b84b', label: 'bus 0,97', w: 16, dur: 9, begin: -4 },
      { lane: 12, dir: -1, color: '#5fb2e6', label: 'moto 0,88', w: 7, dur: 5, begin: -1.5 },
      { lane: 12, dir: -1, color: '#ecede6', label: 'camión 0,91', w: 14, dur: 8, begin: -5.5 },
    ];
    for (const v of fleet) {
      const g = S('g', {}, svg);
      const back = v.dir > 0 ? [-v.w * 0.9, -3] : [v.w * 0.9, -3];
      [0, -0.55, -1.1].forEach((d) => S('circle', { cx: back[0], cy: back[1], r: 3, fill: '#8a9088', class: 'puff', style: `animation-delay:${d}s` }, g));
      S('ellipse', { cx: 0, cy: 1.5, rx: v.w, ry: v.w * 0.42, fill: '#000', opacity: .3 }, g);
      S('ellipse', { cx: 0, cy: -2, rx: v.w * 0.9, ry: v.w * 0.45, fill: v.color }, g);
      S('ellipse', { cx: 0, cy: -4, rx: v.w * 0.45, ry: v.w * 0.22, fill: 'rgba(255,255,255,.5)' }, g);
      S('rect', { x: -v.w - 4, y: -v.w * 0.45 - 9, width: 2 * v.w + 8, height: v.w * 0.9 + 12, fill: 'none', stroke: 'var(--lime)', 'stroke-width': 1.2 }, g);
      S('text', { x: -v.w - 4, y: -v.w * 0.45 - 12, fill: 'var(--lime)', 'font-size': 8.5, 'font-family': MONO }, g).textContent = v.label;
      const a = iso(-230 * v.dir, v.lane), b = iso(230 * v.dir, v.lane);
      S('animateMotion', { path: `M${P([a])} L${P([b])}`, dur: `${v.dur}s`, begin: `${v.begin}s`, repeatCount: 'indefinite' }, g);
    }
    // conteo y curva de CO₂
    const panel = S('g', {}, svg);
    S('rect', { x: 278, y: 12, width: 110, height: 60, rx: 6, fill: '#121816', stroke: '#3f4b47' }, panel);
    S('text', { x: 286, y: 26, fill: 'var(--faint)', 'font-size': 9, 'font-family': MONO }, panel).textContent = 'CO₂ g/km · 10 s';
    S('polyline', { points: '286,62 298,54 310,58 322,44 334,48 346,36 358,42 370,30 380,34', pathLength: 1, fill: 'none', stroke: 'var(--amber)', 'stroke-width': 2, 'stroke-linejoin': 'round', class: 'draw-loop' }, panel);
    S('rect', { x: 12, y: 202, width: 86, height: 26, rx: 6, fill: '#121816', stroke: '#3f4b47' }, svg);
    S('text', { x: 20, y: 219, fill: 'var(--coral)', 'font-size': 11, 'font-family': MONO }, svg).textContent = 'conteo 1.284';
  },

  sumapaz(svg) {
    const road = 'M14 64 C 60 66 76 108 116 100 S 170 66 204 108 S 252 160 292 150 S 352 188 388 196';
    S('polygon', { points: '0,120 40,60 80,90 120,40 170,80 220,50 270,100 320,80 360,120 400,110 400,240 0,240', fill: '#202a27', class: 'drift' }, svg);
    S('polygon', { points: '0,140 50,96 100,120 150,84 200,118 250,96 300,140 350,130 400,150 400,240 0,240', fill: '#27332f', class: 'drift', style: 'animation-delay:-4s' }, svg);
    S('path', { d: `${road} L 400 196 L 400 240 L 0 240 L 0 64 Z`, fill: '#2f3d38' }, svg);
    // curvas de nivel
    const lv = S('g', { stroke: 'rgba(236,237,230,.08)', 'stroke-width': 1 }, svg);
    for (const y of [80, 120, 160, 200]) S('line', { x1: 0, y1: y, x2: 400, y2: y }, lv);
    // río al fondo
    S('path', { d: 'M0 232 C 80 224 160 238 240 230 S 360 226 400 234', fill: 'none', stroke: 'var(--sky)', 'stroke-width': 3, 'stroke-dasharray': '10 8', class: 'flow' }, svg);
    // la vía
    S('path', { d: road, fill: 'none', stroke: '#121816', 'stroke-width': 7, 'stroke-linecap': 'round' }, svg);
    S('path', { d: road, fill: 'none', stroke: 'var(--amber)', 'stroke-width': 1.5, 'stroke-dasharray': '6 6', class: 'flow' }, svg);
    [['#ff6b5e', 5, 9, 0], ['#ecede6', 8, 13, -6]].forEach(([c, len, dur, begin]) => {
      const v = S('g', {}, svg);
      S('rect', { x: -len / 2, y: -3, width: len, height: 6, rx: 1.5, fill: c }, v);
      S('animateMotion', { path: road, dur: `${dur}s`, begin: `${begin}s`, repeatCount: 'indefinite', rotate: 'auto' }, v);
    });
    // nube y lluvia sobre la cordillera
    const cloud = S('g', { class: 'drift' }, svg);
    for (const [cx, cy, r] of [[170, 30, 13], [186, 24, 16], [204, 30, 13], [188, 34, 12]]) S('circle', { cx, cy, r, fill: '#5d6b66' }, cloud);
    const rain = S('g', { stroke: 'var(--sky)', 'stroke-width': 1.5, 'stroke-linecap': 'round' }, svg);
    for (let k = 0; k < 9; k++) S('line', { x1: 168 + k * 5, y1: 44, x2: 165 + k * 5, y2: 52, class: 'rain', style: `animation-delay:${-k * 0.13}s` }, rain);
    // extremos
    const lab = (x, y, t, anchor) => S('text', { x, y, 'text-anchor': anchor, fill: 'var(--ink)', 'font-size': 11, 'font-family': 'Atkinson Hyperlegible Mono, monospace' }, svg).textContent = t;
    S('circle', { cx: 14, cy: 64, r: 4, fill: 'var(--ink)' }, svg);
    lab(12, 50, 'Bogotá · 2.600 m', 'start');
    S('circle', { cx: 388, cy: 196, r: 4, fill: 'var(--ink)' }, svg);
    lab(388, 216, 'Girardot · 290 m', 'end');
  },

  concesion(svg) {
    // mosaico tipo imagen satelital
    const tiles = ['#24332b', '#2b3a2c', '#30392e', '#283530', '#33402f', '#2a3329'];
    for (let i = 0; i < 10; i++) for (let j = 0; j < 6; j++) S('rect', { x: i * 40, y: j * 40, width: 40, height: 40, fill: tiles[(i * 7 + j * 3) % tiles.length] }, svg);
    const cont = S('g', { fill: 'none', stroke: 'rgba(236,237,230,.07)', 'stroke-width': 1 }, svg);
    for (let k = 0; k < 5; k++) S('path', { d: `M0 ${30 + k * 36} C 100 ${10 + k * 36} 200 ${60 + k * 36} 400 ${24 + k * 36}` }, cont);
    // red de drenaje que se dibuja hacia el río principal
    const road = [[0, 132], [90, 120], [170, 142], [260, 116], [400, 128]];
    const roadY = (x) => { for (let k = 1; k < road.length; k++) if (x <= road[k][0]) { const [a, b] = [road[k - 1], road[k]]; return a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]); } };
    const streams = [56, 138, 214, 312];
    streams.forEach((x, k) => {
      S('polyline', { points: P([[x - 6, 6], [x + 8, 70], [x, roadY(x)], [x + 6, 204]]), pathLength: 1, fill: 'none', stroke: 'var(--sky)', 'stroke-width': 1.8, class: 'draw-loop', style: `animation-delay:${k * 0.4}s` }, svg);
      S('polyline', { points: P([[x + 30, 30], [x + 18, 56], [x + 6, 64]]), pathLength: 1, fill: 'none', stroke: 'var(--sky)', 'stroke-width': 1.2, opacity: .7, class: 'draw-loop', style: `animation-delay:${k * 0.4 + 0.3}s` }, svg);
    });
    S('path', { d: 'M0 210 C 100 198 200 216 400 202', fill: 'none', stroke: 'var(--sky)', 'stroke-width': 4, 'stroke-dasharray': '10 8', class: 'flow' }, svg);
    // corredor vial y cruces de agua
    S('polyline', { points: P(road), fill: 'none', stroke: '#121816', 'stroke-width': 6, 'stroke-linejoin': 'round' }, svg);
    S('polyline', { points: P(road), fill: 'none', stroke: 'var(--amber)', 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, svg);
    streams.forEach((x, k) => {
      S('circle', { cx: x, cy: roadY(x), r: 4, fill: 'var(--coral)' }, svg);
      S('circle', { cx: x, cy: roadY(x), r: 8, fill: 'none', stroke: 'var(--coral)', 'stroke-width': 2, class: 'ring', style: `animation-delay:${k * 0.6}s` }, svg);
    });
    // barrido de Sentinel-2
    S('rect', { x: 0, y: 0, width: 36, height: 240, fill: 'rgba(200,226,60,.10)', class: 'scanband' }, svg);
    // lluvia mensual
    const panel = S('g', {}, svg);
    S('rect', { x: 290, y: 10, width: 100, height: 54, rx: 6, fill: '#121816', stroke: '#3f4b47' }, panel);
    S('text', { x: 298, y: 23, fill: 'var(--faint)', 'font-size': 9, 'font-family': 'Atkinson Hyperlegible Mono, monospace' }, panel).textContent = 'lluvia mm/mes';
    [14, 20, 30, 34, 26, 12, 8, 10, 18, 32, 30, 18].forEach((h, k) => S('rect', { x: 298 + k * 7.4, y: 58 - h, width: 5, height: h, fill: 'var(--sky)', class: 'rise-loop', style: `animation-delay:${k * 0.08}s` }, panel));
  },

  teusaquillo(svg) {
    const iso = makeIso(196, 58);
    S('polygon', { points: P([iso(-40, -10), iso(204, -10), iso(204, 84), iso(-40, 84)]), fill: '#2b3431' }, svg);
    // Calle 26 con su carril de TransMilenio
    S('polygon', { points: P([iso(-60, 88), iso(220, 88), iso(220, 120), iso(-60, 120)]), fill: '#232b28' }, svg);
    S('line', { x1: iso(-60, 104)[0], y1: iso(-60, 104)[1], x2: iso(220, 104)[0], y2: iso(220, 104)[1], stroke: 'rgba(236,237,230,.4)', 'stroke-dasharray': '8 8', class: 'flow' }, svg);
    // casas de ladrillo con techo a dos aguas, de atrás hacia adelante
    const house = (u, v, k) => {
      const w = 28, d = 26, h = 20, r = 12;
      const g = S('g', { class: 'grow', style: `animation-delay:${0.1 + k * 0.1}s` }, svg);
      box(iso, g, [u, v, u + w, v + d, 0, h], ['#c9694f', '#8a3a2b', '#a84a36']);
      S('polygon', { points: P([iso(u, v, h), iso(u + w, v, h), iso(u + w, v + d / 2, h + r), iso(u, v + d / 2, h + r)]), fill: '#6e3328' }, g);
      S('polygon', { points: P([iso(u + w, v, h), iso(u + w, v + d, h), iso(u + w, v + d / 2, h + r)]), fill: '#b9583f' }, g);
      S('polygon', { points: P([iso(u, v + d, h), iso(u + w, v + d, h), iso(u + w, v + d / 2, h + r), iso(u, v + d / 2, h + r)]), fill: '#5a2a22' }, g);
      for (const x of [u + 6, u + 18]) { const a = iso(x, v + d, 5), b = iso(x + 5, v + d, 5); S('polygon', { points: P([a, b, iso(x + 5, v + d, 13), iso(x, v + d, 13)]), fill: '#ffd88f', opacity: .7 }, g); }
      const solar = S('polygon', { points: P([iso(u + 4, v + d - 2, h + 1.5), iso(u + w - 4, v + d - 2, h + 1.5), iso(u + w - 4, v + d / 2 + 2, h + r - 1.5), iso(u + 4, v + d / 2 + 2, h + r - 1.5)]), fill: '#2f6fb3', stroke: '#9fd0ff', 'stroke-width': .6, class: 'solar', style: `animation-delay:${k * 0.25}s` }, g);
    };
    let k = 0;
    for (const v of [0, 44]) for (const u of [0, 38, 76, 114]) house(u, v, k++);
    // edificio nuevo del plan que se levanta
    box(iso, svg, [158, 8, 192, 64, 0, 64], ['#bfe9dc', '#1f6f66', '#2fa596'], { class: 'rise-loop' });
    // árboles del separador
    for (const x of [-30, 10, 50, 90, 130, 170, 210]) {
      const t = iso(x, 86);
      const tree = S('g', { class: 'sway', style: `animation-delay:${-x / 40}s` }, svg);
      S('rect', { x: t[0] - 1, y: t[1] - 8, width: 2, height: 8, fill: '#6b4a2b' }, tree);
      S('circle', { cx: t[0], cy: t[1] - 11, r: 5.5, fill: '#5fbf4a' }, tree);
    }
    // TransMilenio y carros por la Calle 26
    const bus = S('g', {}, svg);
    S('rect', { x: -16, y: -4, width: 32, height: 8, rx: 2, fill: '#e3342f' }, bus);
    S('rect', { x: -13, y: -2.5, width: 26, height: 2.5, fill: 'rgba(255,255,255,.55)' }, bus);
    S('animateMotion', { path: `M${P([iso(-70, 96)])} L${P([iso(230, 96)])}`, dur: '7s', repeatCount: 'indefinite', rotate: 'auto' }, bus);
    [['#f2b84b', 5, -1], ['#5fb2e6', 6.5, -4], ['#ecede6', 5.5, -2.5]].forEach(([c, dur, begin]) => {
      const car = S('ellipse', { rx: 4.5, ry: 2.6, fill: c }, svg);
      S('animateMotion', { path: `M${P([iso(230, 113)])} L${P([iso(-70, 113)])}`, dur: `${dur}s`, begin: `${begin}s`, repeatCount: 'indefinite' }, car);
    });
  },

  lidar(svg) {
    const iso = makeIso(200, 128);
    let seed = 11;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const head = iso(30, 34, 34);
    const color = (z) => (z < 8 ? '#3ec8a8' : z < 30 ? '#5fb2e6' : z < 50 ? '#f2b84b' : '#ff6b5e');
    const pts = [];
    // piso, dos muros, una mesa y una columna (como el laboratorio escaneado)
    for (let i = 0; i < 150; i++) pts.push([-90 + rnd() * 180, -66 + rnd() * 132, 0]);
    for (let i = 0; i < 110; i++) pts.push([-90, -66 + rnd() * 132, rnd() * 78]);
    for (let i = 0; i < 110; i++) pts.push([-90 + rnd() * 180, -66, rnd() * 78]);
    for (let i = 0; i < 50; i++) pts.push([-30 + rnd() * 50, -20 + rnd() * 30, 24]);
    for (let i = 0; i < 30; i++) { const s = rnd() < .5; pts.push(s ? [20, -20 + rnd() * 30, rnd() * 24] : [-30 + rnd() * 50, 10, rnd() * 24]); }
    for (let i = 0; i < 40; i++) { const s = rnd() < .5; pts.push(s ? [60, -40 + rnd() * 12, rnd() * 78] : [48 + rnd() * 12, -28, rnd() * 78]); }
    // malla que se cierra al final del barrido
    const mesh = S('g', { class: 'meshin' }, svg);
    S('polygon', { points: P([iso(-90, -66), iso(90, -66), iso(90, 66), iso(-90, 66)]), fill: '#3ec8a8' }, mesh);
    S('polygon', { points: P([iso(-90, -66, 0), iso(-90, 66, 0), iso(-90, 66, 78), iso(-90, -66, 78)]), fill: '#5fb2e6' }, mesh);
    S('polygon', { points: P([iso(-90, -66, 0), iso(90, -66, 0), iso(90, -66, 78), iso(-90, -66, 78)]), fill: '#4ea2d8' }, mesh);
    box(iso, mesh, [-30, -20, 20, 10, 0, 24], ['#ffd88f', '#b98322', '#e8a93a']);
    box(iso, mesh, [48, -40, 60, -28, 0, 78], ['#ffb3a8', '#c94a3f', '#ff6b5e']);
    // puntos: cada uno aparece cuando el haz pasa por su dirección
    const cloud = S('g', {}, svg);
    pts.sort((a, b) => a[0] + a[1] - (b[0] + b[1]));
    for (const [x, y, z] of pts) {
      const [px, py] = iso(x, y, z);
      const f = ((Math.atan2(py - head[1], px - head[0]) / (2 * Math.PI)) + 1) % 1;
      S('circle', { cx: px, cy: py, r: 1.3, fill: color(z), class: 'scanpt', style: `animation-delay:${(f * 6).toFixed(2)}s` }, cloud);
    }
    // escáner sobre trípode con su haz giratorio
    const foot = iso(30, 34, 0);
    S('line', { x1: head[0], y1: head[1], x2: head[0] + 160, y2: head[1], stroke: 'rgba(200,226,60,.55)', 'stroke-width': 1.5, class: 'spin', style: `transform-origin:${head[0]}px ${head[1]}px` }, svg);
    const tri = S('g', { stroke: '#8a9088', 'stroke-width': 1.6 }, svg);
    for (const dx of [-9, 0, 9]) S('line', { x1: head[0], y1: head[1] + 6, x2: foot[0] + dx, y2: foot[1] + (dx === 0 ? 4 : 0) }, tri);
    S('rect', { x: head[0] - 5, y: head[1] - 9, width: 10, height: 14, rx: 3, fill: 'var(--violet)' }, svg);
    S('circle', { cx: head[0], cy: head[1] - 2, r: 2.2, fill: 'var(--lime)', class: 'hit' }, svg);
    S('circle', { cx: head[0], cy: head[1] - 2, r: 6, fill: 'none', stroke: 'var(--lime)', 'stroke-width': 1.5, class: 'ring' }, svg);
    S('rect', { x: 12, y: 12, width: 104, height: 26, rx: 6, fill: '#121816', stroke: '#3f4b47' }, svg);
    S('text', { x: 20, y: 29, fill: 'var(--lime)', 'font-size': 11, 'font-family': 'Atkinson Hyperlegible Mono, monospace' }, svg).textContent = '2,1 M puntos';
  },

  movilidad(svg) {
    const iso = makeIso(200, 100);
    const MONO = 'Atkinson Hyperlegible Mono, monospace';
    S('polygon', { points: P([iso(-60, -40), iso(160, -40), iso(160, 90), iso(-60, 90)]), fill: '#2b3431' }, svg);
    // montaña con TransMiCable
    S('polygon', { points: P([iso(-60, -40, 0), iso(60, -40, 0), iso(10, -40, 30), iso(-24, -40, 50), iso(-60, -40, 44)]), fill: '#33463b' }, svg);
    const top = iso(-26, -38, 48), low = iso(130, -30, 12);
    box(iso, svg, [124, -36, 138, -24, 0, 12], ['#ffd88f', '#b98322', '#e8a93a']);
    S('line', { x1: low[0], y1: low[1], x2: top[0], y2: top[1], stroke: '#ecede6', 'stroke-width': 1.2 }, svg);
    for (let k = 0; k < 4; k++) {
      const g = S('g', {}, svg);
      S('line', { x1: 0, y1: 0, x2: 0, y2: 6, stroke: '#ecede6', 'stroke-width': 1 }, g);
      S('rect', { x: -4, y: 6, width: 8, height: 7, rx: 2, fill: 'var(--amber)' }, g);
      S('animateMotion', { path: `M${P([low])} L${P([top])}`, dur: '8s', begin: `${-k * 2}s`, repeatCount: 'indefinite' }, g);
    }
    // Metro elevado
    for (let x = -50; x <= 150; x += 25) { const a = iso(x, 20, 0), b = iso(x, 20, 26); S('line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1], stroke: '#8a9088', 'stroke-width': 3 }, svg); }
    const d0 = iso(-60, 20, 26), d1 = iso(160, 20, 26);
    S('line', { x1: d0[0], y1: d0[1], x2: d1[0], y2: d1[1], stroke: '#5b6e68', 'stroke-width': 6 }, svg);
    const train = S('g', {}, svg);
    S('rect', { x: -22, y: -5, width: 44, height: 8, rx: 3, fill: 'var(--teal)' }, train);
    S('rect', { x: -18, y: -3.5, width: 36, height: 2.5, fill: 'rgba(255,255,255,.6)' }, train);
    S('animateMotion', { path: `M${P([iso(-80, 20, 30)])} L${P([iso(180, 20, 30)])}`, dur: '6s', repeatCount: 'indefinite', rotate: 'auto' }, train);
    // troncal de TransMilenio
    S('polygon', { points: P([iso(-60, 56), iso(160, 56), iso(160, 84), iso(-60, 84)]), fill: '#232b28' }, svg);
    [[64, 1, 0], [76, -1, -2.5]].forEach(([y, dir, begin]) => {
      const bus = S('g', {}, svg);
      S('rect', { x: -15, y: -3.5, width: 14, height: 7, rx: 1.5, fill: '#e3342f' }, bus);
      S('rect', { x: 1, y: -3.5, width: 14, height: 7, rx: 1.5, fill: '#e3342f' }, bus);
      S('animateMotion', { path: `M${P([iso(dir > 0 ? -80 : 180, y)])} L${P([iso(dir > 0 ? 180 : -80, y)])}`, dur: '5s', begin: `${begin}s`, repeatCount: 'indefinite', rotate: 'auto' }, bus);
    });
    [['Metro', 'var(--teal)', 300, 20], ['TransMiCable', 'var(--amber)', 300, 38], ['TransMilenio', '#e3342f', 300, 56]].forEach(([t, c, x, y]) => {
      S('rect', { x, y: y - 5, width: 12, height: 4, rx: 2, fill: c }, svg);
      S('text', { x: x + 18, y, fill: 'var(--muted)', 'font-size': 10.5, 'font-family': MONO }, svg).textContent = t;
    });
  },

  buses(svg) {
    const MONO = 'Atkinson Hyperlegible Mono, monospace';
    const grid = S('g', { stroke: '#26322e', 'stroke-width': 1 }, svg);
    for (let x = 10; x <= 390; x += 26) S('line', { x1: x, y1: 10, x2: x, y2: 146 }, grid);
    for (let y = 14; y <= 146; y += 22) S('line', { x1: 10, y1: y, x2: 390, y2: y }, grid);
    S('path', { d: 'M20 40 C 120 30 160 120 260 110 S 360 50 390 60', fill: 'none', stroke: 'rgba(95,178,230,.35)', 'stroke-width': 3 }, svg);
    const route = 'M24 128 C 80 128 90 70 150 66 S 230 110 290 92 S 360 30 382 26';
    S('path', { d: route, fill: 'none', stroke: 'var(--coral)', 'stroke-width': 3.5, 'stroke-linecap': 'round' }, svg);
    for (const [x, y] of [[24, 128], [96, 88], [150, 66], [214, 92], [290, 92], [346, 48], [382, 26]]) S('circle', { cx: x, cy: y, r: 4, fill: '#ecede6', stroke: 'var(--coral)', 'stroke-width': 2 }, svg);
    const bus = S('g', {}, svg);
    S('rect', { x: -9, y: -5, width: 18, height: 10, rx: 3, fill: 'var(--sky)', stroke: '#121816', 'stroke-width': 1.5 }, bus);
    S('animateMotion', { path: route, dur: '7s', repeatCount: 'indefinite', rotate: 'auto', calcMode: 'spline', keyPoints: '0;1', keyTimes: '0;1', keySplines: '.4 0 .6 1' }, bus);
    // validaciones por hora (5 a. m. a 10 p. m.)
    S('text', { x: 14, y: 166, fill: 'var(--faint)', 'font-size': 10, 'font-family': MONO }, svg).textContent = 'validaciones por hora';
    const vals = [22, 58, 70, 52, 34, 28, 30, 32, 30, 28, 34, 46, 64, 68, 50, 32, 20, 12];
    vals.forEach((h, k) => S('rect', { x: 14 + k * 20.6, y: 226 - h * 0.75, width: 14, height: h * 0.75, rx: 2, fill: h > 50 ? 'var(--coral)' : 'var(--teal)', class: 'rise-loop', style: `animation-delay:${k * 0.06}s` }, svg));
    const cur = S('rect', { x: 12, y: 170, width: 18, height: 58, rx: 3, fill: 'rgba(236,237,230,.10)', stroke: 'rgba(236,237,230,.35)' }, svg);
    S('animate', { attributeName: 'x', values: '12;362;12', dur: '9s', repeatCount: 'indefinite' }, cur);
  },

  obras(svg) {
    const iso = makeIso(190, 120);
    const MONO = 'Atkinson Hyperlegible Mono, monospace';
    S('polygon', { points: P([iso(-90, -60), iso(110, -60), iso(110, 80), iso(-90, 80)]), fill: '#2b3431' }, svg);
    S('polygon', { points: P([iso(-50, -30), iso(50, -30), iso(50, 30), iso(-50, 30)]), fill: '#3a352a' }, svg);
    // pisos en obra: losa y columnas
    for (let i = 0; i < 5; i++) {
      const z = i * 14;
      const f = S('g', { class: 'drop', style: `animation-delay:${0.2 + i * 0.25}s` }, svg);
      if (i < 4) for (const [x, y] of [[-36, 20], [0, 20], [36, 20], [36, -16], [36, 2]]) { const a = iso(x, y, z), b = iso(x, y, z + 14); S('line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1], stroke: '#b4b8ae', 'stroke-width': 2.5 }, f); }
      box(iso, f, [-40, -24, 40, 24, z, z + 3], ['#cfd3c8', '#7d8278', '#9da296']);
    }
    // grúa torre
    const base = iso(-72, 30, 0), mast = iso(-72, 30, 92);
    S('line', { x1: base[0], y1: base[1], x2: mast[0], y2: mast[1], stroke: 'var(--amber)', 'stroke-width': 3 }, svg);
    const jib = S('g', { class: 'swing', style: `transform-origin:${mast[0]}px ${mast[1]}px` }, svg);
    S('line', { x1: mast[0] - 30, y1: mast[1], x2: mast[0] + 120, y2: mast[1], stroke: 'var(--amber)', 'stroke-width': 3 }, jib);
    S('rect', { x: mast[0] - 34, y: mast[1] - 3, width: 12, height: 10, fill: '#8a9088' }, jib);
    const hook = S('g', { class: 'pin' }, jib);
    S('line', { x1: mast[0] + 96, y1: mast[1], x2: mast[0] + 96, y2: mast[1] + 40, stroke: '#ecede6', 'stroke-width': 1 }, hook);
    S('rect', { x: mast[0] + 88, y: mast[1] + 40, width: 16, height: 8, fill: '#9da296' }, hook);
    // conos y valla de obra
    for (let x = -70; x <= 90; x += 26) { const c = iso(x, 60); S('polygon', { points: `${c[0] - 4},${c[1]} ${c[0] + 4},${c[1]} ${c[0]},${c[1] - 10}`, fill: '#ff8a3d' }, svg); S('rect', { x: c[0] - 3, y: c[1] - 5, width: 6, height: 1.6, fill: '#fff' }, svg); }
    // avance de la obra
    S('rect', { x: 268, y: 14, width: 118, height: 40, rx: 6, fill: '#121816', stroke: '#3f4b47' }, svg);
    S('text', { x: 276, y: 29, fill: 'var(--faint)', 'font-size': 9.5, 'font-family': MONO }, svg).textContent = 'avance de obra';
    S('rect', { x: 276, y: 37, width: 102, height: 8, rx: 4, fill: '#2a3330' }, svg);
    S('rect', { x: 276, y: 37, width: 65, height: 8, rx: 4, fill: 'var(--lime)', class: 'progress' }, svg);
  },

  esri3d(svg) {
    const iso = makeIso(200, 54);
    let seed = 21;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const n = 5, step = 30, w = 21, cells = [];
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) cells.push([i, j, Math.round(8 + rnd() * 34 + (i === 2 && j === 2 ? 20 : 0))]);
    cells.sort((a, b) => a[0] + a[1] - (b[0] + b[1]));
    const city = (g, ground, street, faces) => {
      S('polygon', { points: P([iso(-8, -8), iso(n * step, -8), iso(n * step, n * step), iso(-8, n * step)]), fill: ground }, g);
      const st = S('g', { stroke: street, 'stroke-width': 3 }, g);
      for (let k = 1; k < n; k++) { const c = k * step - 4.5; S('line', { x1: iso(c, -8)[0], y1: iso(c, -8)[1], x2: iso(c, n * step)[0], y2: iso(c, n * step)[1] }, st); S('line', { x1: iso(-8, c)[0], y1: iso(-8, c)[1], x2: iso(n * step, c)[0], y2: iso(n * step, c)[1] }, st); }
      for (const [i, j, h] of cells) box(iso, g, [i * step, j * step, i * step + w, j * step + w, 0, h], faces(h));
    };
    const esri = S('g', {}, svg);
    city(esri, '#2c3b2f', '#4b524c', (h) => (h > 35 ? ['#9fb3c0', '#3d4b55', '#5d707c'] : ['#b5a68e', '#5e5446', '#7d7160']));
    const defs = S('defs', {}, svg);
    const clip = S('clipPath', { id: 'corte-osm' }, defs);
    const cr = S('rect', { x: 0, y: 0, width: 200, height: 240 }, clip);
    S('animate', { attributeName: 'width', values: '110;290;110', dur: '7s', repeatCount: 'indefinite' }, cr);
    const osm = S('g', { 'clip-path': 'url(#corte-osm)' }, svg);
    S('rect', { x: 0, y: 0, width: 400, height: 240, fill: '#e6e1d4' }, osm);
    city(osm, '#e6e1d4', '#ffffff', () => ['#f4efe4', '#b8b0a0', '#d4ccbb']);
    const line = S('line', { x1: 200, y1: 0, x2: 200, y2: 240, stroke: 'var(--lime)', 'stroke-width': 2 }, svg);
    S('animate', { attributeName: 'x1', values: '110;290;110', dur: '7s', repeatCount: 'indefinite' }, line);
    S('animate', { attributeName: 'x2', values: '110;290;110', dur: '7s', repeatCount: 'indefinite' }, line);
    const chip = (x, t, anchor) => { S('rect', { x: anchor === 'start' ? x : x - 64, y: 12, width: 64, height: 20, rx: 5, fill: '#121816', opacity: .85 }, svg); S('text', { x: anchor === 'start' ? x + 32 : x - 32, y: 26, 'text-anchor': 'middle', fill: 'var(--ink)', 'font-size': 10.5, 'font-family': 'Atkinson Hyperlegible Mono, monospace' }, svg).textContent = t; };
    chip(12, 'OSM', 'start');
    chip(388, 'Esri', 'end');
  },

  casa(svg) {
    const iso = makeIso(200, 150);
    const grid = S('g', { stroke: '#24302c', 'stroke-width': 1 }, svg);
    for (let k = -100; k <= 100; k += 20) { S('line', { x1: iso(k, -90)[0], y1: iso(k, -90)[1], x2: iso(k, 90)[0], y2: iso(k, 90)[1] }, grid); S('line', { x1: iso(-100, k)[0], y1: iso(-100, k)[1], x2: iso(100, k)[0], y2: iso(100, k)[1] }, grid); }
    box(iso, svg, [-74, -54, 74, 54, 0, 10], ['#5b6e68', '#2a3330', '#3e4c48']);
    const table = S('g', { class: 'shake' }, svg);
    box(iso, table, [-64, -46, 64, 46, 10, 17], ['#9fb3c0', '#3d4b55', '#5d707c']);
    const house = S('g', { class: 'shake', style: 'animation-delay:.06s' }, svg);
    box(iso, house, [-34, -24, 34, 24, 17, 41], ['#ecede6', '#8a9088', '#b4b8ae']);
    box(iso, house, [-36, -26, 36, 26, 41, 44], ['#cfd3c8', '#5b6e68', '#7d8278']);
    box(iso, house, [-34, -24, 34, 24, 44, 66], ['#ecede6', '#8a9088', '#b4b8ae']);
    const h = 66, r = 18, u = -36, v = -26, w = 72, d = 52;
    S('polygon', { points: P([iso(u, v + d, h), iso(u + w, v + d, h), iso(u + w, v + d / 2, h + r), iso(u, v + d / 2, h + r)]), fill: '#c94a3f' }, house);
    S('polygon', { points: P([iso(u + w, v, h), iso(u + w, v + d, h), iso(u + w, v + d / 2, h + r)]), fill: '#ff6b5e' }, house);
    for (const z of [23, 50]) for (const x of [-22, 4]) S('polygon', { points: P([iso(x, 24, z), iso(x + 14, 24, z), iso(x + 14, 24, z + 10), iso(x, 24, z + 10)]), fill: '#5fb2e6', opacity: .8 }, house);
    [[34, 24, 20], [34, -24, 44], [-34, 24, 66], [34, 24, 66]].forEach(([x, y, z], k) => { const c = iso(x, y, z); S('circle', { cx: c[0], cy: c[1], r: 3.2, fill: 'var(--lime)', class: 'hit', style: `animation-delay:${k * 0.5}s` }, house); });
    S('rect', { x: 270, y: 14, width: 116, height: 52, rx: 6, fill: '#121816', stroke: '#3f4b47' }, svg);
    S('text', { x: 278, y: 28, fill: 'var(--faint)', 'font-size': 9.5, 'font-family': 'Atkinson Hyperlegible Mono, monospace' }, svg).textContent = 'aceleración';
    let pts = []; for (let k = 0; k <= 50; k++) pts.push([278 + k * 2, 46 + Math.sin(k * 1.3) * 14 * Math.exp(-((k - 18) ** 2) / 160)]);
    S('polyline', { points: P(pts), pathLength: 1, fill: 'none', stroke: 'var(--coral)', 'stroke-width': 1.5, class: 'draw-loop' }, svg);
  },

  sinu(svg) {
    const iso = makeIso(132, 46);
    const NI = 20, NJ = 14, dx = 11, dy = 9;
    const hgt = (i, j) => {
      const mont = Math.max(0, 52 - i * 3.1) * (0.55 + 0.45 * Math.abs(Math.sin(j * 0.7 + i * 0.4)));
      return mont * Math.min(1, Math.abs(j - 7) / 4) + (i < 18 ? 3 : 0);
    };
    for (let j = 0; j <= NJ; j++) {
      const row = [];
      for (let i = 0; i <= NI; i++) row.push(iso(i * dx, j * dy, hgt(i, j)));
      const edge = Math.abs(j - 7) > 3 ? 'var(--amber)' : 'var(--green)';
      S('polygon', { points: P([...row, iso(NI * dx, j * dy, 0), iso(0, j * dy, 0)]), fill: '#1c2422', stroke: edge, 'stroke-width': 1, 'stroke-linejoin': 'round', class: 'grow', style: `animation-delay:${j * 0.07}s` }, svg);
      if (j === 7) {
        const river = []; for (let i = 0; i <= NI; i++) river.push(iso(i * dx, 7 * dy, hgt(i, 7) + 0.5));
        S('polyline', { points: P(river), fill: 'none', stroke: 'var(--sky)', 'stroke-width': 3, 'stroke-dasharray': '7 6', class: 'flow' }, svg);
      }
    }
    S('polygon', { points: P([iso(NI * dx, -6), iso(NI * dx + 30, -6), iso(NI * dx + 30, NJ * dy + 6), iso(NI * dx, NJ * dy + 6)]), fill: 'rgba(95,178,230,.35)' }, svg);
    const lab = (p, t) => S('text', { x: p[0], y: p[1], 'text-anchor': 'middle', fill: 'var(--ink)', 'font-size': 10.5, 'font-family': 'Atkinson Hyperlegible Mono, monospace' }, svg).textContent = t;
    lab([60, 22], 'Nudo de Paramillo');
    lab(iso(NI * dx + 16, NJ * dy + 20), 'Mar Caribe');
  },

  sinudatos(svg) {
    const MONO = 'Atkinson Hyperlegible Mono, monospace';
    const panel = (x, y, w, h, t) => { S('rect', { x, y, width: w, height: h, rx: 8, fill: '#121816', stroke: '#3f4b47' }, svg); S('text', { x: x + 10, y: y + 16, fill: 'var(--faint)', 'font-size': 9.5, 'font-family': MONO }, svg).textContent = t; };
    panel(12, 12, 230, 124, 'caudal · GloFAS (m³/s)');
    S('line', { x1: 22, y1: 58, x2: 232, y2: 58, stroke: 'var(--coral)', 'stroke-width': 1, 'stroke-dasharray': '4 4' }, svg);
    S('text', { x: 232, y: 54, 'text-anchor': 'end', fill: 'var(--coral)', 'font-size': 9, 'font-family': MONO }, svg).textContent = 'alerta';
    const q = [96, 92, 94, 86, 80, 70, 64, 52, 60, 74, 84, 90, 88, 76, 70, 66, 72, 80, 86, 92];
    const pts = q.map((y, k) => [22 + k * 11, y + 24]);
    S('polygon', { points: P([...pts, [231, 126], [22, 126]]), fill: 'rgba(95,178,230,.12)' }, svg);
    S('polyline', { points: P(pts), pathLength: 1, fill: 'none', stroke: 'var(--sky)', 'stroke-width': 2, 'stroke-linejoin': 'round', class: 'draw-loop' }, svg);
    panel(252, 12, 136, 124, 'Urrá · XM (MW)');
    const cx = 320, cy = 108;
    S('path', { d: `M${cx - 48} ${cy} A48 48 0 0 1 ${cx + 48} ${cy}`, fill: 'none', stroke: '#2a3330', 'stroke-width': 10 }, svg);
    S('path', { d: `M${cx - 48} ${cy} A48 48 0 0 1 ${cx + 34} ${cy - 34}`, fill: 'none', stroke: 'var(--teal)', 'stroke-width': 10 }, svg);
    const needle = S('g', { class: 'swing', style: `transform-origin:${cx}px ${cy}px` }, svg);
    S('line', { x1: cx, y1: cy, x2: cx, y2: cy - 40, stroke: 'var(--ink)', 'stroke-width': 2.5, 'stroke-linecap': 'round' }, needle);
    S('circle', { cx, cy, r: 5, fill: 'var(--ink)' }, svg);
    panel(12, 146, 376, 82, 'lluvia diaria · IDEAM (mm)');
    for (let k = 0; k < 30; k++) { const h = 6 + Math.abs(Math.sin(k * 0.9) * 30) * (k % 7 === 3 ? 1.6 : 1); S('rect', { x: 22 + k * 12.2, y: 220 - h, width: 8, height: h, rx: 1.5, fill: 'var(--teal)', class: 'rise-loop', style: `animation-delay:${k * 0.04}s` }, svg); }
  },

  cundinamarca(svg) {
    const basins = [
      [[90, 40], [170, 30], [180, 90], [120, 110], [80, 80]],
      [[170, 30], [260, 40], [250, 100], [180, 90]],
      [[260, 40], [330, 70], [320, 130], [250, 100]],
      [[80, 80], [120, 110], [110, 170], [60, 150]],
      [[120, 110], [180, 90], [250, 100], [230, 160], [170, 175], [110, 170]],
      [[250, 100], [320, 130], [300, 190], [230, 160]],
      [[110, 170], [170, 175], [230, 160], [300, 190], [220, 225], [130, 215]],
    ];
    const colors = ['#3ec8a8', '#5fb2e6', '#a07cff', '#f2b84b', '#ff6b5e', '#8fd45a', '#c8e23c'];
    basins.forEach((b, k) => S('polygon', { points: P(b), fill: colors[k], 'fill-opacity': .22, stroke: colors[k], 'stroke-width': 1.5, class: 'drop', style: `animation-delay:${0.15 + k * 0.18}s` }, svg));
    S('polyline', { points: P([[42, 8], [52, 80], [40, 150], [54, 232]]), fill: 'none', stroke: 'var(--sky)', 'stroke-width': 4, 'stroke-dasharray': '10 8', class: 'flow' }, svg);
    const rivers = [[[176, 50], [190, 110], [172, 150], [150, 200], [80, 222], [50, 226]], [[300, 70], [270, 120], [230, 150], [190, 110]], [[100, 60], [96, 120], [60, 150], [46, 150]], [[280, 170], [230, 180], [160, 200]]];
    rivers.forEach((r, k) => S('polyline', { points: P(r), pathLength: 1, fill: 'none', stroke: 'var(--sky)', 'stroke-width': k ? 1.6 : 2.6, 'stroke-linejoin': 'round', class: 'draw-loop', style: `animation-delay:${0.4 + k * 0.35}s` }, svg));
    S('circle', { cx: 196, cy: 124, r: 5, fill: 'var(--ink)' }, svg);
    S('circle', { cx: 196, cy: 124, r: 9, fill: 'none', stroke: 'var(--ink)', 'stroke-width': 2, class: 'ring' }, svg);
    S('text', { x: 206, y: 128, fill: 'var(--ink)', 'font-size': 11, 'font-family': 'Atkinson Hyperlegible Mono, monospace' }, svg).textContent = 'Bogotá';
    S('text', { x: 60, y: 20, fill: 'var(--faint)', 'font-size': 10, 'font-family': 'Atkinson Hyperlegible Mono, monospace' }, svg).textContent = 'río Magdalena';
  },
};

export { NS, S, P, makeIso, box, SCENES };
