// Technical line drawings for each case.
// Ink layer = the physical problem (civil). Marker layer = the system drawn on top (software).
// The marker layer is driven by `p`, a 0..1 MotionValue tied to scroll.

import { motion, useTransform, type MotionValue } from 'motion/react';
import type { ReactNode } from 'react';

type P = { p: MotionValue<number> };

const INK = 'var(--ink)';
const MK = 'var(--marker)';

/** A marker stroke that draws itself between progress a..b. */
function Trace({ p, d, a = 0, b = 1, dash, w = 2 }: P & { d: string; a?: number; b?: number; dash?: boolean; w?: number }) {
  const len = useTransform(p, [a, b], [0, 1]);
  const op = useTransform(p, [a, a + 0.02], [0, 1]);
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={MK}
      strokeWidth={w}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dash ? '1 6' : undefined}
      style={{ pathLength: len, opacity: op }}
    />
  );
}

/** A sensor/node that pops in at progress `at`. */
function Node({ p, x, y, at, r = 6 }: P & { x: number; y: number; at: number; r?: number }) {
  const s = useTransform(p, [at, at + 0.06], [0, 1]);
  return (
    <motion.g style={{ scale: s, originX: `${x}px`, originY: `${y}px` }}>
      <circle cx={x} cy={y} r={r + 6} fill={MK} opacity={0.15} />
      <circle cx={x} cy={y} r={r} fill={MK} />
    </motion.g>
  );
}

/** Marker label that fades in at `at`. */
function Tag({ p, x, y, at, children, anchor = 'start' }: P & { x: number; y: number; at: number; children: ReactNode; anchor?: 'start' | 'middle' | 'end' }) {
  const op = useTransform(p, [at, at + 0.08], [0, 1]);
  const ty = useTransform(p, [at, at + 0.08], [6, 0]);
  return (
    <motion.text x={x} y={y} textAnchor={anchor} className="dw-tag" style={{ opacity: op, y: ty }}>
      {children}
    </motion.text>
  );
}

/** Marker shape (rect/box) that fades + scales in. */
function Pop({ p, at, children, ox, oy }: P & { at: number; children: ReactNode; ox: number; oy: number }) {
  const s = useTransform(p, [at, at + 0.08], [0.85, 1]);
  const op = useTransform(p, [at, at + 0.05], [0, 1]);
  return <motion.g style={{ scale: s, opacity: op, originX: `${ox}px`, originY: `${oy}px` }}>{children}</motion.g>;
}

const ink = { fill: 'none', stroke: INK, strokeWidth: 1.6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const };
const thin = { ...ink, strokeWidth: 1 };

function Ground({ y, x1 = 0, x2 = 480 }: { y: number; x1?: number; x2?: number }) {
  const ticks = [];
  for (let x = x1 + 6; x < x2; x += 14) ticks.push(`M${x} ${y + 2}l-8 9`);
  return (
    <g>
      <path d={`M${x1} ${y}H${x2}`} {...ink} strokeWidth={2} />
      <path d={ticks.join('')} {...thin} opacity={0.55} />
    </g>
  );
}

/* ---------- 1. Underground fuel tank ---------- */
export function TankDrawing({ p }: P) {
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label="Corte de un tanque de combustible enterrado con un sensor conectado a un tablero">
      {/* physical */}
      <Ground y={120} />
      <path d="M110 120V82h70v38M120 82V62h50v20" {...ink} />
      <path d="M145 62V44" {...ink} />
      <rect x="70" y="190" width="240" height="110" rx="55" {...ink} strokeWidth={2} />
      <path d="M86 238 Q 190 232 294 238" {...thin} strokeDasharray="5 5" />
      <path d="M100 250h200M96 262h208M98 274h204M106 286h188" {...thin} opacity={0.35} />
      <path d="M150 120v70M150 120h0" {...ink} />
      <text x="190" y="330" textAnchor="middle" className="dw-ink">tanque subterráneo, 3 m bajo la losa</text>
      {/* small leak drops */}
      <path d="M240 302c0 6 -5 8 -5 12a5 5 0 0 0 10 0c0-4-5-6-5-12zM262 314c0 4 -3 6 -3 8a3 3 0 0 0 6 0c0-2-3-4-3-8z" {...thin} />
      {/* digital */}
      <Node p={p} x={200} y={292} at={0.05} r={5} />
      <Trace p={p} d="M200 292V150h170" a={0.1} b={0.42} />
      <Pop p={p} at={0.4} ox={395} oy={150}>
        <rect x="370" y="134" width="50" height="32" rx="4" fill="var(--paper)" stroke={MK} strokeWidth={2} />
        <text x="395" y="155" textAnchor="middle" className="dw-chip">ESP32</text>
      </Pop>
      <Trace p={p} d="M395 132c-14-14-14-34 0-48M395 132c14-14 14-34 0-48" a={0.5} b={0.62} dash />
      <Pop p={p} at={0.62} ox={400} oy={40}>
        <rect x="340" y="14" width="120" height="66" rx="6" fill="var(--paper)" stroke={MK} strokeWidth={2} />
        <path d="M352 66 L370 52 L386 58 L404 38 L420 44 L448 30" fill="none" stroke={MK} strokeWidth={2} />
      </Pop>
      <Tag p={p} x={212} y={286} at={0.12}>sensor de presión</Tag>
      <Tag p={p} x={350} y={100} at={0.7} anchor="end">nivel en tiempo real</Tag>
    </svg>
  );
}

/* ---------- 2. House after an earthquake ---------- */
export function QuakeDrawing({ p }: P) {
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label="Fachada de una casa agrietada después de un sismo y un teléfono que la clasifica">
      <Ground y={300} x1={10} x2={330} />
      <path d="M40 300V150L150 80L260 150V300" {...ink} strokeWidth={2} />
      <path d="M40 150H260" {...thin} />
      <rect x="70" y="190" width="50" height="50" {...ink} />
      <rect x="180" y="200" width="44" height="100" {...ink} />
      <path d="M70 215h50M95 190v50" {...thin} />
      {/* cracks */}
      <path d="M120 190l14 18-6 10 16 22-4 12 12 20" {...ink} strokeWidth={1.4} />
      <path d="M70 240l-10 16 6 8-12 18" {...ink} strokeWidth={1.4} />
      <path d="M180 200l-12-14 4-10-14-16" {...ink} strokeWidth={1.4} />
      <path d="M8 310q20-8 40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0" {...thin} opacity={0.5} />
      <text x="150" y="340" textAnchor="middle" className="dw-ink">vivienda de mampostería, 2 pisos</text>
      {/* digital: inspection points */}
      <Node p={p} x={134} y={210} at={0.05} r={4} />
      <Node p={p} x={62} y={262} at={0.1} r={4} />
      <Node p={p} x={162} y={168} at={0.15} r={4} />
      <Trace p={p} d="M134 210C230 210 300 150 360 150" a={0.22} b={0.45} dash />
      <Trace p={p} d="M62 262C200 300 300 220 360 200" a={0.25} b={0.48} dash />
      <Trace p={p} d="M162 168C240 120 300 110 360 120" a={0.28} b={0.5} dash />
      <Pop p={p} at={0.48} ox={410} oy={180}>
        <rect x="360" y="70" width="100" height="200" rx="14" fill="var(--paper)" stroke={MK} strokeWidth={2} />
        <rect x="372" y="92" width="76" height="60" rx="3" fill="none" stroke={MK} strokeWidth={1.2} />
        <path d="M390 130l8-14 8 8 10-18 14 24" fill="none" stroke={MK} strokeWidth={1.2} />
        <circle cx="410" cy="118" r="4" fill={MK} />
      </Pop>
      <Pop p={p} at={0.62} ox={410} oy={200}>
        <circle cx="384" cy="180" r="8" fill="#2f8f5b" />
        <circle cx="410" cy="180" r="8" fill="#d9a521" />
        <circle cx="436" cy="180" r="8" fill="#c8402f" />
        <rect x="372" y="202" width="76" height="22" rx="4" fill={MK} />
        <text x="410" y="217" textAnchor="middle" className="dw-chip dw-chip-inv">restringido</text>
      </Pop>
      <Tag p={p} x={410} y={292} at={0.72} anchor="middle">NSR-10 · FEMA 154</Tag>
    </svg>
  );
}

/* ---------- 3. Construction site supervision ---------- */
export function SiteDrawing({ p }: P) {
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label="Planta de una obra con frentes de trabajo y pilas de actas, convertidas en un tablero de avance">
      {/* plan view */}
      <rect x="20" y="40" width="270" height="250" {...ink} strokeWidth={2} />
      <path d="M20 130H290M20 220H290M110 40V290M200 40V290" {...thin} strokeDasharray="4 6" />
      <path d="M30 60h60v50H30z" {...ink} />
      <path d="M120 140h70v70h-70z" {...ink} />
      <path d="M215 235h60v40h-60z" {...ink} />
      <path d="M36 66l48 38M84 66l-48 38" {...thin} opacity={0.5} />
      <text x="155" y="320" textAnchor="middle" className="dw-ink">43 frentes, un consorcio, actas por correo</text>
      {/* paper stack */}
      <g transform="translate(320 220)">
        <path d="M0 40h70v50H0z" {...ink} fill="var(--paper)" />
        <path d="M6 32h70v50H6z" {...ink} fill="var(--paper)" />
        <path d="M12 24h70v50H12z" {...ink} fill="var(--paper)" />
        <path d="M22 38h50M22 48h50M22 58h34" {...thin} />
      </g>
      {/* digital */}
      <Node p={p} x={60} y={85} at={0.05} r={4} />
      <Node p={p} x={155} y={175} at={0.1} r={4} />
      <Node p={p} x={245} y={255} at={0.15} r={4} />
      <Trace p={p} d="M60 85C200 40 300 40 330 60" a={0.2} b={0.42} dash />
      <Trace p={p} d="M155 175C250 150 300 110 330 100" a={0.22} b={0.44} dash />
      <Trace p={p} d="M245 255C300 220 310 160 330 140" a={0.24} b={0.46} dash />
      <Pop p={p} at={0.46} ox={395} oy={100}>
        <rect x="330" y="30" width="135" height="140" rx="6" fill="var(--paper)" stroke={MK} strokeWidth={2} />
        <text x="342" y="52" className="dw-chip">avance por frente</text>
      </Pop>
      <Bar p={p} x={344} y={70} w={110} v={0.82} at={0.55} />
      <Bar p={p} x={344} y={100} w={110} v={0.56} at={0.6} />
      <Bar p={p} x={344} y={130} w={110} v={0.31} at={0.65} />
    </svg>
  );
}

function Bar({ p, x, y, w, v, at }: P & { x: number; y: number; w: number; v: number; at: number }) {
  const width = useTransform(p, [at, at + 0.15], [0, w * v]);
  return (
    <g>
      <rect x={x} y={y} width={w} height={14} rx={2} fill="none" stroke={MK} strokeOpacity={0.35} />
      <motion.rect x={x} y={y} width={width} height={14} rx={2} fill={MK} />
    </g>
  );
}

/* ---------- 4. Computer vision on site ---------- */
export function VisionDrawing({ p }: P) {
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label="Frente de obra con trabajadores y una cámara; el modelo dibuja cajas de detección sobre cada persona">
      <Ground y={290} x1={10} x2={470} />
      {/* scaffolding */}
      <path d="M250 290V90M330 290V90M410 290V90M250 90H410M250 160H410M250 225H410M250 160L330 90M330 225L410 160" {...ink} />
      {/* workers */}
      <Worker x={80} y={290} />
      <Worker x={150} y={290} />
      <Worker x={290} y={225} small />
      {/* camera on pole */}
      <path d="M30 290V60M30 60h26" {...ink} />
      <rect x="54" y="50" width="32" height="20" rx="3" {...ink} />
      <text x="240" y="330" textAnchor="middle" className="dw-ink">frente de obra activo, una cámara fija</text>
      {/* digital */}
      <Trace p={p} d="M86 64L160 200M86 64L420 120" a={0.02} b={0.2} dash w={1.4} />
      <Box p={p} x={56} y={212} w={50} h={80} at={0.22} label="0.94" />
      <Box p={p} x={126} y={212} w={50} h={80} at={0.3} label="0.91" />
      <Box p={p} x={274} y={172} w={34} h={55} at={0.38} label="sin casco" warn />
      <Trace p={p} d="M100 200c20-30 40-30 60-10s40 10 50-20" a={0.5} b={0.7} />
      <Tag p={p} x={96} y={150} at={0.72}>trayectoria (ByteTrack)</Tag>
    </svg>
  );
}

function Worker({ x, y, small }: { x: number; y: number; small?: boolean }) {
  const k = small ? 0.68 : 1;
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <circle cx="0" cy="-66" r="9" {...ink} />
      <path d="M-10 -72a10 10 0 0 1 20 0z" {...ink} fill={small ? 'none' : 'var(--ink)'} />
      <path d="M0 -57v32M0 -48l-14 14M0 -48l14 10M0 -25l-10 25M0 -25l10 25" {...ink} />
    </g>
  );
}

function Box({ p, x, y, w, h, at, label, warn }: P & { x: number; y: number; w: number; h: number; at: number; label: string; warn?: boolean }) {
  const op = useTransform(p, [at, at + 0.05], [0, 1]);
  const s = useTransform(p, [at, at + 0.08], [1.25, 1]);
  const c = warn ? '#c8402f' : MK;
  return (
    <motion.g style={{ opacity: op, scale: s, originX: `${x + w / 2}px`, originY: `${y + h / 2}px` }}>
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={c} strokeWidth={2} />
      <rect x={x} y={y - 15} width={label.length * 5.6 + 8} height={15} fill={c} />
      <text x={x + 4} y={y - 4} className="dw-chip dw-chip-inv">{label}</text>
    </motion.g>
  );
}

/* ---------- 5. Structural frame -> digital twin / AR ---------- */
export function TwinDrawing({ p }: P) {
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label="Pórtico estructural de tres pisos y su gemelo digital proyectado en un teléfono">
      <Ground y={300} x1={10} x2={300} />
      <path d="M40 300V90M150 300V90M260 300V90M40 90H260M40 160H260M40 230H260" {...ink} strokeWidth={2.2} />
      <path d="M40 300l-10 10h20zM150 300l-10 10h20zM260 300l-10 10h20z" {...ink} />
      <path d="M40 230L150 160M150 230L260 160" {...thin} strokeDasharray="3 5" />
      <text x="150" y="335" textAnchor="middle" className="dw-ink">pórtico de concreto, modelo en ETABS</text>
      {/* deformed shape (digital) */}
      <Trace p={p} d="M40 300C44 240 50 170 58 90M150 300C154 240 160 170 168 90M260 300C264 240 270 170 278 90" a={0.05} b={0.3} />
      <Trace p={p} d="M58 90H278M50 160H270M44 230H264" a={0.18} b={0.38} />
      <Tag p={p} x={286} y={86} at={0.36}>deriva</Tag>
      {/* phone with AR */}
      <Pop p={p} at={0.45} ox={400} oy={190}>
        <rect x="340" y="80" width="110" height="210" rx="16" fill="var(--paper)" stroke={MK} strokeWidth={2} />
        <path d="M360 250V140M395 250V140M430 250V140M360 140H430M360 177H430M360 214H430" fill="none" stroke={MK} strokeWidth={1.6} />
        <path d="M352 262h86" stroke={MK} strokeWidth={1} strokeDasharray="2 4" />
      </Pop>
      <Trace p={p} d="M262 120C300 110 320 120 340 140" a={0.55} b={0.7} dash />
      <Tag p={p} x={395} y={310} at={0.72} anchor="middle">escala 1:1 en obra</Tag>
    </svg>
  );
}

/* ---------- 6. Solar on a roof ---------- */
export function SolarDrawing({ p }: P) {
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label="Cubierta con paneles solares, inversor y medidor de energía">
      <Ground y={300} x1={10} x2={470} />
      <path d="M40 300V170H300V300M30 170L170 110L310 170" {...ink} strokeWidth={2} />
      {/* panels */}
      <path d="M62 160L168 115l14 6L76 166zM180 120l14-6 104 44-14 6z" {...ink} fill="none" />
      <path d="M92 147l14 6M122 134l14 6M152 121l14 6M214 128l-14 6M244 141l-14 6M274 154l-14 6" {...thin} />
      {/* sun */}
      <circle cx="420" cy="60" r="20" {...ink} />
      <path d="M420 26v-10M420 104v-10M386 60h-10M464 60h-10M396 36l-7-7M451 91l-7-7M444 36l7-7M389 91l7-7" {...thin} />
      <text x="170" y="335" textAnchor="middle" className="dw-ink">cubierta comercial, Pailitas (Cesar)</text>
      {/* digital */}
      <Trace p={p} d="M400 75L250 130" a={0.02} b={0.16} dash w={1.4} />
      <Trace p={p} d="M290 160V230h60" a={0.2} b={0.4} />
      <Pop p={p} at={0.4} ox={375} oy={232}>
        <rect x="350" y="206" width="54" height="52" rx="4" fill="var(--paper)" stroke={MK} strokeWidth={2} />
        <path d="M362 232q8-12 15 0t15 0" fill="none" stroke={MK} strokeWidth={1.6} />
      </Pop>
      <Tag p={p} x={377} y={276} at={0.46} anchor="middle">inversor</Tag>
      <Trace p={p} d="M350 246H200V250" a={0.5} b={0.66} />
      <Pop p={p} at={0.66} ox={170} oy={250}>
        <rect x="140" y="230" width="62" height="40" rx="4" fill="var(--paper)" stroke={MK} strokeWidth={2} />
        <text x="171" y="255" textAnchor="middle" className="dw-chip">30 kW</text>
      </Pop>
    </svg>
  );
}

/* ---------- 7. City section: buildings, street, water network ---------- */
export function CityDrawing({ p }: P) {
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label="Corte de una manzana de Bogotá con edificios, calle y red de acueducto; la capa digital la convierte en un modelo 3D con datos">
      <path d="M0 220H480" {...ink} strokeWidth={2} />
      <path d="M20 220V120h60v100M90 220V80h50v140M150 220V140h40v80M300 220V100h70v120M380 220V150h80v70" {...ink} />
      <path d="M30 135h10M50 135h10M30 155h10M50 155h10M100 95h10M120 95h10M100 120h10M120 120h10M310 115h12M335 115h12M310 140h12M335 140h12" {...thin} />
      <path d="M200 220h90M210 214h20M250 214h20" {...thin} />
      {/* trees */}
      <circle cx="215" cy="196" r="12" {...thin} /><path d="M215 208v12" {...thin} />
      <circle cx="275" cy="196" r="12" {...thin} /><path d="M275 208v12" {...thin} />
      {/* underground */}
      <path d="M0 270H480" {...thin} strokeDasharray="2 5" opacity={0.6} />
      <circle cx="245" cy="270" r="10" {...ink} />
      <circle cx="120" cy="300" r="6" {...ink} />
      <circle cx="390" cy="300" r="6" {...ink} />
      <text x="240" y="345" textAnchor="middle" className="dw-ink">manzana, calle y tubería bajo el andén</text>
      {/* digital */}
      <Trace p={p} d="M20 120l20-14h60l-20 14M90 80l20-14h50l-20 14M300 100l20-14h70l-20 14M380 150l20-14h80" a={0.02} b={0.25} />
      <Trace p={p} d="M0 270H480" a={0.2} b={0.4} />
      <Trace p={p} d="M120 300C200 300 200 270 245 270S330 300 390 300" a={0.28} b={0.45} />
      <Node p={p} x={245} y={270} at={0.42} r={4} />
      <Trace p={p} d="M10 40C120 20 260 70 470 30" a={0.45} b={0.68} dash />
      <Pop p={p} at={0.66} ox={420} oy={36}>
        <path d="M410 36l22-6 4 2-10 6 10 8-4 1-12-5-8 3z" fill={MK} />
      </Pop>
      <Tag p={p} x={20} y={30} at={0.6}>vuelo en vivo</Tag>
      <Tag p={p} x={252} y={262} at={0.46}>red de acueducto</Tag>
      <Tag p={p} x={300} y={78} at={0.26}>catastro + terreno</Tag>
    </svg>
  );
}

/* ---------- 8. Road cross-section: bus lanes and metro viaduct ---------- */
export function TransitDrawing({ p }: P) {
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label="Sección de una avenida con carriles de bus y el viaducto del metro encima; la capa digital muestra rutas desviadas">
      <path d="M0 280H480" {...ink} strokeWidth={2} />
      <path d="M40 280v-8h60v8M380 280v-8h60v8" {...thin} />
      <path d="M140 280v-6M200 280v-6M280 280v-6M340 280v-6" {...thin} />
      {/* viaduct */}
      <path d="M230 280V170M250 280V170M200 170h80M190 160h100v10H190z" {...ink} strokeWidth={1.8} />
      <path d="M200 160v-28h80v28M210 140h14M234 140h14M258 140h14" {...ink} />
      {/* buses */}
      <rect x="110" y="246" width="70" height="26" rx="4" {...ink} />
      <circle cx="126" cy="274" r="5" {...ink} /><circle cx="164" cy="274" r="5" {...ink} />
      <rect x="300" y="246" width="70" height="26" rx="4" {...ink} />
      <circle cx="316" cy="274" r="5" {...ink} /><circle cx="354" cy="274" r="5" {...ink} />
      <text x="240" y="320" textAnchor="middle" className="dw-ink">avenida con troncal y viaducto del metro</text>
      {/* digital: route map overlay above */}
      <Trace p={p} d="M20 60H460" a={0.02} b={0.18} w={1.2} dash />
      <Trace p={p} d="M20 90C120 90 160 60 240 60" a={0.15} b={0.35} />
      <Trace p={p} d="M240 60C320 60 360 100 460 100" a={0.3} b={0.5} />
      <Trace p={p} d="M20 110C140 110 180 120 240 110S360 80 460 80" a={0.45} b={0.68} dash />
      <Node p={p} x={240} y={60} at={0.34} r={5} />
      <Node p={p} x={145} y={258} at={0.52} r={4} />
      <Node p={p} x={335} y={258} at={0.56} r={4} />
      <Tag p={p} x={248} y={50} at={0.38}>estación de metro</Tag>
      <Tag p={p} x={20} y={128} at={0.7}>ruta propuesta</Tag>
    </svg>
  );
}

/* ---------- 9. Robot inspection route in a scanned lab ---------- */
export function RobotDrawing({ p }: P) {
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label="Planta de un laboratorio escaneado con obstáculos; la capa digital traza la ruta de inspección del robot y los puntos de foto">
      <rect x="20" y="30" width="440" height="270" {...ink} strokeWidth={2.2} />
      <path d="M200 30v90M200 180v120M200 120h-30" {...ink} strokeWidth={2} />
      <rect x="50" y="60" width="90" height="40" {...ink} />
      <rect x="60" y="200" width="60" height="60" {...ink} />
      <rect x="260" y="70" width="140" height="30" {...ink} />
      <rect x="250" y="190" width="50" height="50" {...ink} />
      <rect x="350" y="200" width="80" height="70" {...ink} />
      <path d="M50 60l90 40M140 60l-90 40M60 200l60 60M120 200l-60 60M250 190l50 50M300 190l-50 50" {...thin} opacity={0.4} />
      {/* point cloud speckle */}
      <path d="M30 40h1M36 46h1M44 38h1M450 40h1M444 50h1M30 290h1M38 284h1M452 290h1M446 284h1" {...ink} strokeWidth={2} />
      <text x="240" y="330" textAnchor="middle" className="dw-ink">laboratorio escaneado con LiDAR</text>
      {/* route */}
      <Node p={p} x={50} y={150} at={0.02} r={6} />
      <Trace p={p} d="M50 150H170C185 150 190 150 210 150H230C240 150 240 140 240 130V60H420V150C420 170 400 170 380 170H330C320 170 320 180 320 200V280H200" a={0.06} b={0.7} w={2.4} />
      <Node p={p} x={240} y={60} at={0.3} r={4} />
      <Node p={p} x={420} y={150} at={0.48} r={4} />
      <Node p={p} x={320} y={280} at={0.64} r={4} />
      <Tag p={p} x={56} y={140} at={0.04}>inicio</Tag>
      <Tag p={p} x={246} y={52} at={0.32}>foto RGB-D 1</Tag>
      <Tag p={p} x={414} y={142} at={0.5} anchor="end">foto 2</Tag>
      <Tag p={p} x={326} y={274} at={0.66}>foto 3</Tag>
    </svg>
  );
}

/* ---------- 10. River, forest, mine and contracts ---------- */
export function RiverDrawing({ p }: P) {
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label="Plano de un río con bosque y una mina a cielo abierto; la capa digital marca zonas inundables y contratos sobre el mapa">
      <path d="M-10 60C80 80 90 150 160 160S260 120 300 190 380 300 490 300" {...ink} strokeWidth={2.2} />
      <path d="M-10 74C80 94 84 162 158 174S250 136 290 200 374 314 490 314" {...ink} strokeWidth={1.2} />
      {/* forest */}
      {[[60, 200], [90, 230], [40, 250], [110, 270], [380, 80], [410, 110], [350, 120], [430, 60]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="11" {...thin} />
      ))}
      {/* mine pit */}
      <path d="M300 40h80l-10 50h-60z" {...ink} />
      <path d="M306 52h68M310 66h60M314 80h52" {...thin} />
      <text x="240" y="345" textAnchor="middle" className="dw-ink">río, bosque y una mina a cielo abierto</text>
      {/* digital */}
      <Trace p={p} d="M-10 40C80 50 110 120 170 130S270 100 320 170 400 270 490 270M-10 100C70 120 70 190 150 200S240 170 270 220 360 340 490 340" a={0.02} b={0.32} dash />
      <Tag p={p} x={180} y={122} at={0.3}>zona inundable (HAND)</Tag>
      <Trace p={p} d="M296 36h88l-12 58h-64z" a={0.32} b={0.46} />
      <Tag p={p} x={390} y={30} at={0.46} anchor="end">minería (Sentinel-2)</Tag>
      <Pin p={p} x={130} y={170} at={0.5} />
      <Pin p={p} x={250} y={150} at={0.56} />
      <Pin p={p} x={70} y={110} at={0.62} />
      <Tag p={p} x={22} y={134} at={0.68}>contratos ($)</Tag>
    </svg>
  );
}

function Pin({ p, x, y, at }: P & { x: number; y: number; at: number }) {
  const s = useTransform(p, [at, at + 0.06], [0, 1]);
  const ty = useTransform(p, [at, at + 0.06], [-14, 0]);
  return (
    <motion.g style={{ scale: s, y: ty, originX: `${x}px`, originY: `${y}px` }}>
      <path d={`M${x} ${y}c-8-10-12-14-12-20a12 12 0 0 1 24 0c0 6-4 10-12 20z`} fill={MK} />
      <circle cx={x} cy={y - 20} r="4" fill="var(--paper)" />
    </motion.g>
  );
}

export const drawings = {
  tank: TankDrawing,
  quake: QuakeDrawing,
  site: SiteDrawing,
  vision: VisionDrawing,
  twin: TwinDrawing,
  solar: SolarDrawing,
  city: CityDrawing,
  transit: TransitDrawing,
  robot: RobotDrawing,
  river: RiverDrawing,
};
