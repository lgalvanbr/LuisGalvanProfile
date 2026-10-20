// Technical plates for each case, drawn to drafting conventions:
// cut lines heavy, visible lines medium, hatching and dimensions thin, a title block per sheet.
// Ink = the physical problem. Marker = the system laid over it, revealed by `p` (0..1, tied to scroll).

import { motion, useTransform, type MotionValue } from 'motion/react';
import { useId, type ReactNode } from 'react';

type P = { p: MotionValue<number> };

const MK = 'var(--marker)';
const W = { cut: 2.2, line: 1.15, thin: 0.6 };

const ink = (w: number = W.line) => ({ fill: 'none', stroke: 'var(--ink)', strokeWidth: w, strokeLinecap: 'square' as const, strokeLinejoin: 'miter' as const });
const mk = (w = 1.4) => ({ fill: 'none', stroke: MK, strokeWidth: w, strokeLinecap: 'square' as const, strokeLinejoin: 'miter' as const });

/* ---------- shared defs (rendered once per page) ---------- */

export function PlateDefs() {
  const t = 'var(--ink)';
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <pattern id="h-soil" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0V7" stroke={t} strokeWidth="0.45" opacity="0.6" />
        </pattern>
        <pattern id="h-earth" width="16" height="10" patternUnits="userSpaceOnUse">
          <path d="M1 3h5M9 8h5" stroke={t} strokeWidth="0.5" opacity="0.55" />
          <circle cx="12" cy="3" r="0.6" fill={t} opacity="0.55" />
        </pattern>
        <pattern id="h-conc" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="4" r="0.7" fill={t} opacity="0.7" />
          <circle cx="10" cy="10" r="0.6" fill={t} opacity="0.7" />
          <path d="M8 2l2 3h-4z" fill="none" stroke={t} strokeWidth="0.45" opacity="0.7" />
          <path d="M2 10l1.6 2.4h-3.2z" fill="none" stroke={t} strokeWidth="0.45" opacity="0.7" />
        </pattern>
        <pattern id="h-brick" width="16" height="8" patternUnits="userSpaceOnUse">
          <path d="M0 0.25H16M0 4.25H16M4 0V4M12 4V8" stroke={t} strokeWidth="0.4" opacity="0.5" />
        </pattern>
        <pattern id="h-gravel" width="12" height="10" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.6" fill="none" stroke={t} strokeWidth="0.45" opacity="0.6" />
          <circle cx="9" cy="7.5" r="1.2" fill="none" stroke={t} strokeWidth="0.45" opacity="0.6" />
        </pattern>
        <pattern id="h-liquid" width="10" height="5" patternUnits="userSpaceOnUse">
          <path d="M1 2.5h5" stroke={t} strokeWidth="0.5" opacity="0.5" />
        </pattern>
        <pattern id="h-forest" width="18" height="16" patternUnits="userSpaceOnUse">
          <path d="M5 9a3 3 0 1 1 0.01 0M5 9v3M14 3a2.5 2.5 0 1 1 0.01 0M14 3v2.5" fill="none" stroke={t} strokeWidth="0.5" opacity="0.6" />
        </pattern>
        <pattern id="h-flood" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
          <path d="M0 0V6" stroke={MK} strokeWidth="0.7" opacity="0.55" />
        </pattern>
        <pattern id="h-poche" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0V5" stroke={t} strokeWidth="0.8" />
        </pattern>
      </defs>
    </svg>
  );
}

/* ---------- drafting primitives ---------- */

function TitleBlock({ title, scale, sheet }: { title: string; scale: string; sheet: string }) {
  return (
    <g className="tb">
      <path d="M0 330.5H480M318 330.5V360M400 330.5V360" {...ink(W.thin)} />
      <text x="8" y="349">{title}</text>
      <text x="326" y="349">{scale}</text>
      <text x="408" y="349">{sheet}</text>
    </g>
  );
}

/** Horizontal or vertical dimension line with architectural ticks. */
function Dim({ x1, y1, x2, y2, label, off = 0 }: { x1: number; y1: number; x2: number; y2: number; label: string; off?: number }) {
  const v = x1 === x2;
  const tick = (x: number, y: number) => `M${x - 3} ${y + 3}L${x + 3} ${y - 3}`;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  return (
    <g>
      <path d={`M${x1} ${y1}L${x2} ${y2}${tick(x1, y1)}${tick(x2, y2)}`} {...ink(W.thin)} />
      <text
        className="dim"
        x={v ? mx - 4 + off : mx}
        y={v ? my : my - 4 + off}
        textAnchor="middle"
        transform={v ? `rotate(-90 ${mx - 4 + off} ${my})` : undefined}
      >
        {label}
      </text>
    </g>
  );
}

function Axis({ x, y1, y2, id }: { x: number; y1: number; y2: number; id: string }) {
  return (
    <g>
      <path d={`M${x} ${y1 + 9}V${y2}`} {...ink(W.thin)} strokeDasharray="8 3 1.5 3" />
      <circle cx={x} cy={y1} r="8" {...ink(W.thin)} />
      <text className="axis" x={x} y={y1 + 3.5} textAnchor="middle">
        {id}
      </text>
    </g>
  );
}

function Level({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <path d={`M${x} ${y}h40M${x + 6} ${y - 7}l6 7 6-7z`} {...ink(W.thin)} />
      <text className="dim" x={x + 22} y={y - 3}>
        {label}
      </text>
    </g>
  );
}

function GroundLine({ x1, x2, y, depth = 40, fill = 'url(#h-earth)' }: { x1: number; x2: number; y: number; depth?: number; fill?: string }) {
  return (
    <g>
      <rect x={x1} y={y} width={x2 - x1} height={depth} fill={fill} />
      <path d={`M${x1} ${y}H${x2}`} {...ink(W.cut)} />
    </g>
  );
}

/* ---------- motion primitives (marker layer) ---------- */

/** Precise marker line drawn between a..b. */
function Draw({ p, d, a = 0, b = 1, w = 1.4, dash }: P & { d: string; a?: number; b?: number; w?: number; dash?: string }) {
  const len = useTransform(p, [a, b], [0, 1]);
  const op = useTransform(p, [a, a + 0.01], [0, 1]);
  const id = 'm' + useId().replace(/[^a-zA-Z0-9_-]/g, '');
  if (!dash) return <motion.path d={d} {...mk(w)} style={{ pathLength: len, opacity: op }} />;
  // pathLength owns stroke-dasharray, so dashed lines are revealed through a mask instead.
  return (
    <g>
      <mask id={id} maskUnits="userSpaceOnUse" x="-20" y="-20" width="520" height="400">
        <motion.path d={d} fill="none" stroke="#fff" strokeWidth={w + 8} style={{ pathLength: len }} />
      </mask>
      <motion.path d={d} {...mk(w)} strokeDasharray={dash} mask={`url(#${id})`} style={{ opacity: op }} />
    </g>
  );
}

/** Fades a group in between a..a+0.06, with a 3px settle. */
function Show({ p, at, children }: P & { at: number; children: ReactNode }) {
  const op = useTransform(p, [at, at + 0.06], [0, 1]);
  const y = useTransform(p, [at, at + 0.06], [3, 0]);
  return <motion.g style={{ opacity: op, y }}>{children}</motion.g>;
}

/** Square sensor node: solid core + ring. */
function Sensor({ p, x, y, at }: P & { x: number; y: number; at: number }) {
  const op = useTransform(p, [at, at + 0.04], [0, 1]);
  const ring = useTransform(p, [at, at + 0.1, at + 0.2], [0, 1, 0.35]);
  return (
    <motion.g style={{ opacity: op }}>
      <motion.rect x={x - 7} y={y - 7} width="14" height="14" {...mk(0.8)} style={{ opacity: ring }} />
      <rect x={x - 3.5} y={y - 3.5} width="7" height="7" fill={MK} />
    </motion.g>
  );
}

/** Callout label: leader from (x,y) to a boxed tag. */
function Callout({ p, x, y, tx, ty, at, text, anchor = 'start' }: P & { x: number; y: number; tx: number; ty: number; at: number; text: string; anchor?: 'start' | 'end' }) {
  const w = text.length * 6.1 + 12;
  const bx = anchor === 'start' ? tx : tx - w;
  return (
    <g>
      <Draw p={p} d={`M${x} ${y}L${tx} ${ty}`} a={at} b={at + 0.05} w={0.8} />
      <Show p={p} at={at + 0.04}>
        <rect x={bx} y={ty - 9} width={w} height="18" fill="var(--plate)" stroke={MK} strokeWidth="0.9" />
        <text className="tag" x={bx + 6} y={ty + 3.5}>
          {text}
        </text>
      </Show>
    </g>
  );
}

/** Instrument readout panel with live values. */
function Readout({ p, x, y, w, rows, at, title }: P & { x: number; y: number; w: number; at: number; title: string; rows: { k: string; v: MotionValue<string> | string }[] }) {
  const h = 22 + rows.length * 15;
  return (
    <Show p={p} at={at}>
      <rect x={x} y={y} width={w} height={h} fill="var(--plate)" stroke={MK} strokeWidth="1.1" />
      <rect x={x} y={y} width={w} height="16" fill={MK} />
      <text className="ro-h" x={x + 6} y={y + 11.5}>
        {title}
      </text>
      {rows.map((r, i) => (
        <g key={r.k}>
          <text className="ro-k" x={x + 6} y={y + 30 + i * 15}>
            {r.k}
          </text>
          <motion.text className="ro-v" x={x + w - 6} y={y + 30 + i * 15} textAnchor="end">
            {r.v}
          </motion.text>
        </g>
      ))}
    </Show>
  );
}

/** A thin scan line that sweeps the sheet once as the layer starts. */
function Scan({ p }: P) {
  const x = useTransform(p, [0, 0.35], [0, 480]);
  const op = useTransform(p, [0, 0.02, 0.33, 0.35], [0, 0.9, 0.9, 0]);
  return (
    <motion.g style={{ x, opacity: op }}>
      <rect x="-24" y="0" width="24" height="330" fill={MK} opacity="0.06" />
      <path d="M0 0V330" stroke={MK} strokeWidth="0.8" />
    </motion.g>
  );
}

const useNum = (p: MotionValue<number>, a: number, b: number, to: number, fmt: (v: number) => string) =>
  useTransform(p, (v) => fmt(to * Math.min(1, Math.max(0, (v - a) / (b - a)))));
const es = (d = 0) => (v: number) => v.toLocaleString('es-CO', { minimumFractionDigits: d, maximumFractionDigits: d });

/* =================================================================== */
/* 1. Underground fuel tank — cross section                             */
/* =================================================================== */
export function TankDrawing({ p }: P) {
  const level = useNum(p, 0.35, 0.75, 1.42, (v) => `${es(2)(v)} m`);
  const vol = useNum(p, 0.35, 0.75, 5830, (v) => `${es(0)(Math.round(v / 10) * 10)} L`);
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label="Corte de un tanque de combustible enterrado con un sensor de presión conectado a un ESP32">
      {/* soil + excavation backfill */}
      <rect x="0" y="112" width="480" height="218" fill="url(#h-earth)" />
      <rect x="120" y="128" width="200" height="190" fill="var(--plate)" />
      <rect x="120" y="128" width="200" height="190" fill="url(#h-gravel)" />
      <path d="M120 112V318H320V112" {...ink(W.thin)} strokeDasharray="4 3" />
      {/* slab */}
      <rect x="0" y="100" width="480" height="12" fill="var(--plate)" />
      <rect x="0" y="100" width="480" height="12" fill="url(#h-conc)" />
      <path d="M0 100H480M0 112H480" {...ink(W.cut)} />
      {/* tank shell (double wall) */}
      <circle cx="220" cy="225" r="72" fill="var(--plate)" {...ink(W.cut)} />
      <circle cx="220" cy="225" r="67" {...ink(W.thin)} />
      <clipPath id="tank-liquid">
        <circle cx="220" cy="225" r="66" />
      </clipPath>
      <rect x="150" y="237" width="140" height="60" fill="url(#h-liquid)" clipPath="url(#tank-liquid)" />
      <path d="M155 237H285" {...ink(W.thin)} />
      <path d="M150 233l5 4-5 4" {...ink(W.thin)} />
      {/* riser + manhole */}
      <path d="M208 153V100M232 153V100" {...ink(W.line)} />
      <rect x="198" y="92" width="44" height="8" fill="var(--ink)" />
      {/* dispenser */}
      <rect x="360" y="50" width="34" height="50" {...ink(W.line)} />
      <path d="M366 58h22v14h-22zM394 64h8v22" {...ink(W.thin)} />
      <path d="M220 160V100" {...ink(W.thin)} strokeDasharray="6 3 1.5 3" />
      <Dim x1={24} y1={100} x2={24} y2={297} label="3,00" />
      <Dim x1={148} y1={312} x2={292} y2={312} label="Ø 2,40" off={14} />
      <text className="note" x="300" y="248">COMBUSTIBLE</text>
      <TitleBlock title="CORTE A-A'  TANQUE SUBTERRÁNEO" scale="ESC 1:50" sheet="LG-01" />

      {/* marker layer */}
      <Scan p={p} />
      <Sensor p={p} x={220} y={288} at={0.1} />
      <Draw p={p} d="M220 288V120H340V140H420" a={0.14} b={0.36} />
      <Show p={p} at={0.34}>
        <rect x="420" y="128" width="46" height="26" fill="var(--plate)" stroke={MK} strokeWidth="1.2" />
        <text className="tag" x="443" y="145" textAnchor="middle">ESP32</text>
        <path d="M456 128V114M450 110a8 8 0 0 1 12 0M446 106a14 14 0 0 1 20 0" {...mk(0.9)} />
      </Show>
      <Callout p={p} x={226} y={290} tx={300} ty={292} at={0.16} text="sensor de presión" />
      <Readout
        p={p}
        x={330}
        y={170}
        w={140}
        at={0.4}
        title="TANQUE 1  EN VIVO"
        rows={[
          { k: 'nivel', v: level },
          { k: 'volumen', v: vol },
          { k: 'fuga', v: 'sin alerta' },
        ]}
      />
    </svg>
  );
}

/* =================================================================== */
/* 2. Two-storey confined masonry house after an earthquake — elevation */
/* =================================================================== */
export function QuakeDrawing({ p }: P) {
  const ipt = useNum(p, 0.55, 0.8, 64, (v) => `${Math.round(v)} / 100`);
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label="Fachada de una vivienda de mampostería confinada de dos pisos con grietas diagonales y la ficha de inspección">
      <GroundLine x1={0} x2={480} y={296} depth={34} />
      {/* masonry panels */}
      <rect x="44" y="96" width="240" height="200" fill="url(#h-brick)" />
      {/* openings */}
      <rect x="74" y="232" width="56" height="40" fill="var(--plate)" {...ink(W.line)} />
      <rect x="196" y="226" width="40" height="70" fill="var(--plate)" {...ink(W.line)} />
      <rect x="74" y="132" width="56" height="40" fill="var(--plate)" {...ink(W.line)} />
      <rect x="196" y="132" width="56" height="40" fill="var(--plate)" {...ink(W.line)} />
      <path d="M78 236h48v32h-48zM78 136h48v32h-48zM200 136h48v32h-48z" {...ink(W.thin)} />
      {/* confining columns + beams (concrete) */}
      {[44, 160, 276].map((x) => (
        <g key={x}>
          <rect x={x} y="96" width="10" height="200" fill="var(--plate)" />
          <rect x={x} y="96" width="10" height="200" fill="url(#h-conc)" />
          <rect x={x} y="96" width="10" height="200" {...ink(W.line)} />
        </g>
      ))}
      {[192, 88].map((y) => (
        <g key={y}>
          <rect x="40" y={y} width="250" height="10" fill="var(--plate)" />
          <rect x="40" y={y} width="250" height="10" fill="url(#h-conc)" />
          <rect x="40" y={y} width="250" height="10" {...ink(W.cut)} />
        </g>
      ))}
      {/* stepped diagonal cracks along mortar joints */}
      <path d="M140 204h-4v6h-8v6h-6v6h-8v6h-6v6h-8v6M140 290v-6h-6v-6h-8v-6h-6v-6h-6v-6" {...ink(1.5)} />
      <path d="M232 106l6 8h-4l6 10h-4l7 9" {...ink(1.3)} />
      <Axis x={49} y1={60} y2={300} id="A" />
      <Axis x={165} y1={60} y2={300} id="B" />
      <Axis x={281} y1={60} y2={300} id="C" />
      <Level x={300} y={296} label="N+0,00" />
      <Level x={300} y={197} label="N+2,60" />
      <Level x={300} y={93} label="N+5,20" />
      <TitleBlock title="FACHADA PRINCIPAL  POST-SISMO" scale="ESC 1:75" sheet="LG-02" />

      <Scan p={p} />
      <Sensor p={p} x={120} y={236} at={0.1} />
      <Sensor p={p} x={238} y={118} at={0.16} />
      <Sensor p={p} x={104} y={268} at={0.2} />
      <Callout p={p} x={120} y={236} tx={30} ty={218} at={0.22} text="G-01  diagonal, 3 mm" />
      <Callout p={p} x={238} y={118} tx={300} ty={60} at={0.28} text="G-02  en dintel" />
      <Readout
        p={p}
        x={344}
        y={206}
        w={128}
        at={0.42}
        title="INSPECCIÓN 0142"
        rows={[
          { k: 'pisos', v: '2' },
          { k: 'sistema', v: 'mamp. conf.' },
          { k: 'índice IPT', v: ipt },
          { k: 'estado', v: 'restringido' },
        ]}
      />
      <Show p={p} at={0.78}>
        <text className="tag" x="344" y="160">NSR-10 / FEMA 154</text>
      </Show>
    </svg>
  );
}

/* =================================================================== */
/* 3. Construction front seen by a fixed camera                         */
/* =================================================================== */
function Person({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  // ISO-style pictogram: solid head + body, no stick figures.
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="var(--ink)">
      <circle cx="0" cy="-58" r="7" />
      <path d="M-11 -48h22l3 26h-6l-1 22h-6l-2-16-2 16h-6l-1-22h-6z" />
    </g>
  );
}
function Helmet({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return <path transform={`translate(${x} ${y}) scale(${s})`} d="M-9 -60a9 8 0 0 1 18 0h2v2h-22v-2z" fill="var(--ink)" />;
}

export function VisionDrawing({ p }: P) {
  const fps = useNum(p, 0.05, 0.3, 24, (v) => `${Math.round(v)}`);
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label="Vista de una cámara fija sobre un frente de obra; el modelo detecta personas y marca a quien no lleva casco">
      <GroundLine x1={0} x2={480} y={290} depth={40} />
      {/* scaffold elevation */}
      <path d="M250 290V70M330 290V70M410 290V70M250 70H410M250 145H410M250 220H410" {...ink(W.line)} />
      <path d="M250 145L330 70M330 220L410 145M250 290L330 220" {...ink(W.thin)} />
      <rect x="246" y="141" width="168" height="8" fill="url(#h-poche)" />
      <rect x="246" y="216" width="168" height="8" fill="url(#h-poche)" />
      {/* formwork + slab edge */}
      <rect x="30" y="200" width="150" height="10" fill="var(--plate)" />
      <rect x="30" y="200" width="150" height="10" fill="url(#h-conc)" />
      <path d="M30 200h150v10H30zM40 210v80M170 210v80" {...ink(W.line)} />
      <Person x={70} y={290} />
      <Helmet x={70} y={290} />
      <Person x={125} y={290} />
      <Helmet x={125} y={290} />
      <Person x={290} y={216} s={0.72} />
      <TitleBlock title="FRENTE DE OBRA  CÁMARA CAM-02" scale="VISTA" sheet="LG-03" />

      <Scan p={p} />
      {/* HUD */}
      <Show p={p} at={0.04}>
        <path d="M12 26v-12h12M468 26v-12h-12M12 304v12h12M468 304v12h-12" {...mk(1.2)} />
        <text className="tag" x="30" y="30">CAM-02  REC</text>
        <circle cx="22" cy="26" r="3" fill="#c8402f" />
      </Show>
      <Readout p={p} x={368} y={14} w={100} at={0.06} title="YOLO + BYTETRACK" rows={[{ k: 'fps', v: fps }, { k: 'personas', v: '3' }]} />
      {/* detections */}
      <Box p={p} x={54} y={222} w={34} h={70} at={0.22} label="ID 07  0,94" />
      <Box p={p} x={109} y={222} w={34} h={70} at={0.3} label="ID 08  0,91" up />
      <Box p={p} x={277} y={170} w={26} h={50} at={0.38} label="ID 11  SIN CASCO" warn />
      {/* track history for ID 08 */}
      <Draw p={p} d="M126 296H150V280H176V296H200" a={0.48} b={0.66} w={1.2} dash="2 3" />
      {[150, 176, 200].map((x, i) => (
        <Show key={x} p={p} at={0.5 + i * 0.06}>
          <rect x={x - 2.5} y={(i === 1 ? 280 : 296) - 2.5} width="5" height="5" fill={MK} />
        </Show>
      ))}
    </svg>
  );
}

function Box({ p, x, y, w, h, at, label, warn, up }: P & { x: number; y: number; w: number; h: number; at: number; label: string; warn?: boolean; up?: boolean }) {
  const c = warn ? '#c8402f' : MK;
  const draw = useTransform(p, [at, at + 0.06], [0, 1]);
  const lw = label.length * 6.1 + 10;
  const ly = up ? y - 30 : y - 16;
  return (
    <g>
      <motion.rect x={x} y={y} width={w} height={h} fill="none" stroke={c} strokeWidth="1.4" style={{ pathLength: draw }} />
      <Show p={p} at={at + 0.04}>
        {up && <path d={`M${x} ${y}V${ly + 14}`} stroke={c} strokeWidth="0.8" />}
        <rect x={x} y={ly} width={lw} height="14" fill={c} />
        <text className="tag tag-inv" x={x + 5} y={ly + 10.5}>
          {label}
        </text>
      </Show>
    </g>
  );
}

/* =================================================================== */
/* 4. Three-storey RC frame — elevation, deformed shape, AR handoff     */
/* =================================================================== */
export function TwinDrawing({ p }: P) {
  const drift = useNum(p, 0.1, 0.4, 0.8, (v) => `${es(2)(v)} %`);
  const cols = [60, 160, 260];
  const levels = [290, 220, 150, 80];
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label="Pórtico de concreto de tres pisos con su deformada por sismo y el modelo enviado a realidad aumentada">
      <GroundLine x1={0} x2={480} y={298} depth={32} />
      {/* footings */}
      {cols.map((x) => (
        <g key={x}>
          <rect x={x - 18} y="298" width="36" height="14" fill="var(--plate)" />
          <rect x={x - 18} y="298" width="36" height="14" fill="url(#h-conc)" />
          <rect x={x - 18} y="298" width="36" height="14" {...ink(W.line)} />
        </g>
      ))}
      {/* columns (double lines) */}
      {cols.map((x) => (
        <path key={x} d={`M${x - 5} 298V${levels[3]}M${x + 5} 298V${levels[3]}`} {...ink(W.line)} />
      ))}
      {/* beams */}
      {levels.slice(1).map((y) => (
        <g key={y}>
          <rect x="52" y={y} width="216" height="10" fill="var(--plate)" />
          <rect x="52" y={y} width="216" height="10" fill="url(#h-conc)" />
          <rect x="52" y={y} width="216" height="10" {...ink(W.cut)} />
        </g>
      ))}
      <Axis x={60} y1={52} y2={300} id="1" />
      <Axis x={160} y1={52} y2={300} id="2" />
      <Axis x={260} y1={52} y2={300} id="3" />
      <Level x={276} y={298} label="N+0,00" />
      <Level x={276} y={220} label="N+3,00" />
      <Level x={276} y={150} label="N+6,00" />
      <Level x={276} y={80} label="N+9,00" />
      <Dim x1={60} y1={318} x2={160} y2={318} label="5,00" off={12} />
      <Dim x1={160} y1={318} x2={260} y2={318} label="5,00" off={12} />
      <TitleBlock title="PÓRTICO EJE B  MODELO ETABS" scale="ESC 1:100" sheet="LG-04" />

      <Scan p={p} />
      {/* deformed shape, exaggerated */}
      {cols.map((x, i) => (
        <Draw key={x} p={p} d={`M${x} 298C${x + 2} 250 ${x + 8} 180 ${x + 18} 85`} a={0.1 + i * 0.03} b={0.34 + i * 0.03} w={1.6} />
      ))}
      <Draw p={p} d="M66 225H166H266M72 155H172H272M78 85H178H278" a={0.24} b={0.42} w={1.6} />
      <Draw p={p} d="M60 66H82M76 61l6 5-6 5" a={0.4} b={0.46} w={1} />
      <Readout p={p} x={342} y={30} w={130} at={0.44} title="ANÁLISIS SÍSMICO" rows={[{ k: 'deriva máx.', v: drift }, { k: 'límite NSR-10', v: '1,00 %' }, { k: 'estado', v: 'cumple' }]} />
      {/* AR handoff */}
      <Show p={p} at={0.6}>
        <rect x="372" y="138" width="78" height="150" rx="12" fill="var(--plate)" stroke={MK} strokeWidth="1.3" />
        <path d="M398 270V200l14-8 14 8v70M398 236h28M398 200l14 8 14-8M412 208v62" {...mk(1)} />
        <text className="tag" x="411" y="160" textAnchor="middle">AR 1:1</text>
      </Show>
      <Draw p={p} d="M300 180H372" a={0.62} b={0.72} w={1} dash="3 3" />
    </svg>
  );
}

/* =================================================================== */
/* 5. Commercial roof with PV array — section                           */
/* =================================================================== */
export function SolarDrawing({ p }: P) {
  const kw = useNum(p, 0.45, 0.75, 30, (v) => `${Math.round(v)}+ kWp`);
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label="Corte de una bodega con paneles solares en cubierta, cableado al inversor y medidor">
      <GroundLine x1={0} x2={480} y={296} depth={34} />
      {/* building section */}
      <path d="M40 296V170M320 296V170" {...ink(W.cut)} />
      <path d="M30 172L180 130L330 172" {...ink(W.cut)} />
      <path d="M40 170L180 136L320 170M40 170H320" {...ink(W.thin)} />
      {[70, 110, 150, 210, 250, 290].map((x) => (
        <path key={x} d={`M${x} 170L${x} ${170 - (x < 180 ? (x - 40) * 0.243 : (320 - x) * 0.243)}`} {...ink(W.thin)} />
      ))}
      {/* PV modules on south pitch */}
      {[0, 1, 2, 3].map((i) => {
        const x = 52 + i * 30;
        const y = 166 - i * 8.2;
        return <path key={i} d={`M${x} ${y}l26 -7.1l2 4l-26 7.1z`} fill="var(--ink)" />;
      })}
      {/* sun angle */}
      <circle cx="430" cy="52" r="12" {...ink(W.line)} />
      <path d="M418 62L120 150" {...ink(W.thin)} strokeDasharray="6 3" />
      <path d="M150 140a34 34 0 0 1 6 -14" {...ink(W.thin)} />
      <text className="dim" x="160" y="122">α 10°</text>
      <Dim x1={40} y1={312} x2={320} y2={312} label="24,00" off={12} />
      <TitleBlock title="CORTE BODEGA  PAILITAS, CESAR" scale="ESC 1:200" sheet="LG-05" />

      <Scan p={p} />
      <Draw p={p} d="M90 152V180H300V240H352" a={0.12} b={0.38} />
      <Show p={p} at={0.36}>
        <rect x="352" y="222" width="44" height="36" fill="var(--plate)" stroke={MK} strokeWidth="1.2" />
        <path d="M362 240c4 -8 8 -8 12 0s8 8 12 0" {...mk(1)} />
      </Show>
      <Callout p={p} x={396} y={240} tx={420} ty={210} at={0.4} text="inversor" />
      <Draw p={p} d="M374 258V280H210V266" a={0.44} b={0.56} />
      <Show p={p} at={0.54}>
        <rect x="186" y="244" width="48" height="22" fill="var(--plate)" stroke={MK} strokeWidth="1.2" />
        <text className="tag" x="210" y="259" textAnchor="middle">kWh</text>
      </Show>
      <Readout p={p} x={20} y={20} w={140} at={0.5} title="SISTEMA FV" rows={[{ k: 'potencia', v: kw }, { k: 'módulos', v: 'JA Solar' }, { k: 'inversor', v: 'Growatt' }, { k: 'trámite', v: 'UPME' }]} />
    </svg>
  );
}

/* =================================================================== */
/* 6. Urban section: buildings, street, utilities (also the hero)       */
/* =================================================================== */
export function CityDrawing({ p }: P) {
  const b = useNum(p, 0.55, 0.85, 1.77, (v) => `${es(2)(v)} M`);
  const t = useNum(p, 0.6, 0.9, 1.47, (v) => `${es(2)(v)} M`);
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label="Corte urbano de una calle de Bogotá con edificios, andenes y redes de acueducto; la capa digital lo convierte en modelo 3D con datos">
      <rect x="0" y="232" width="480" height="98" fill="url(#h-earth)" />
      <path d="M0 226H120V232H360V226H480" {...ink(W.cut)} />
      <path d="M150 229h20M200 229h20M260 229h20M310 229h20" {...ink(W.line)} />
      {/* buildings with floor lines */}
      {[
        [10, 90, 100],
        [56, 50, 60],
        [370, 110, 70],
        [420, 60, 50],
      ].map(([x, top, w], i) => (
        <g key={i}>
          <rect x={x} y={top} width={w} height={226 - top} fill="var(--plate)" {...ink(W.line)} />
          {Array.from({ length: Math.floor((226 - top) / 22) }, (_, k) => (
            <path key={k} d={`M${x} ${226 - (k + 1) * 22}h${w}`} {...ink(W.thin)} />
          ))}
        </g>
      ))}
      {/* trees */}
      {[140, 340].map((x) => (
        <g key={x}>
          <circle cx={x} cy="196" r="14" {...ink(W.thin)} />
          <path d={`M${x} 210v16`} {...ink(W.line)} />
        </g>
      ))}
      {/* utilities */}
      <circle cx="240" cy="272" r="13" fill="var(--plate)" {...ink(W.cut)} />
      <circle cx="240" cy="272" r="9" {...ink(W.thin)} />
      <circle cx="170" cy="258" r="6" fill="var(--plate)" {...ink(W.line)} />
      <circle cx="310" cy="258" r="6" fill="var(--plate)" {...ink(W.line)} />
      <Dim x1={120} y1={318} x2={360} y2={318} label="24,00  calzada + andenes" off={12} />
      <TitleBlock title="CORTE URBANO  BOGOTÁ D.C." scale="ESC 1:250" sheet="LG-06" />

      <Scan p={p} />
      {/* 3D extrusion hints */}
      <Draw p={p} d="M10 90l14-12h100l-14 12M110 90l14-12V214l-14 12M56 50l10-8h60l-10 8M370 110l14-12h70l-14 12M440 110l14-12V214l-14 12" a={0.08} b={0.36} w={1.1} />
      {/* network trace */}
      <Draw p={p} d="M0 272H227M253 272H480" a={0.3} b={0.5} />
      <Draw p={p} d="M170 264V246H310V264" a={0.4} b={0.54} w={1.1} dash="3 3" />
      <Sensor p={p} x={240} y={272} at={0.48} />
      <Callout p={p} x={246} y={272} tx={300} ty={300} at={0.5} text="acueducto  Ø 600" />
      {/* flight track */}
      <Draw p={p} d="M0 30H180L200 18H480" a={0.36} b={0.6} w={1} dash="6 4" />
      <Show p={p} at={0.58}>
        <path d="M196 14l10 4-10 4 2-4z" fill={MK} />
        <text className="tag" x="210" y="14">AVA9349  10 900 ft</text>
      </Show>
      <Readout p={p} x={330} y={36} w={140} at={0.56} title="BOGOTÁ 3D" rows={[{ k: 'edificaciones', v: b }, { k: 'árboles', v: t }]} />
    </svg>
  );
}

/* =================================================================== */
/* 7. Avenue cross-section with metro viaduct + route diagram           */
/* =================================================================== */
export function TransitDrawing({ p }: P) {
  const routes = useNum(p, 0.55, 0.85, 389, (v) => `${Math.round(v)}`);
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label="Sección de una avenida con carriles de bus y el viaducto del metro; la capa digital muestra un diagrama de rutas desviadas">
      <rect x="0" y="252" width="480" height="78" fill="url(#h-earth)" />
      <path d="M0 246H60V252H420V246H480" {...ink(W.cut)} />
      {/* pile cap + piles */}
      <rect x="214" y="252" width="52" height="16" fill="var(--plate)" />
      <rect x="214" y="252" width="52" height="16" fill="url(#h-conc)" />
      <rect x="214" y="252" width="52" height="16" {...ink(W.line)} />
      <path d="M224 268V318M256 268V318" {...ink(W.line)} />
      {/* pier + box girder */}
      <path d="M232 252V170M248 252V170" {...ink(W.line)} />
      <path d="M196 170H284L276 152H204Z" fill="var(--plate)" {...ink(W.cut)} />
      <path d="M214 166h52l-4 -9h-44z" {...ink(W.thin)} />
      {/* train profile */}
      <path d="M200 152v-30h80v30M208 130h14M230 130h14M252 130h14" {...ink(W.line)} />
      {/* buses */}
      {[90, 320].map((x) => (
        <g key={x}>
          <rect x={x} y="222" width="70" height="24" rx="3" fill="var(--plate)" {...ink(W.line)} />
          <path d={`M${x + 6} 228h16v8h-16zM${x + 28} 228h16v8h-16zM${x + 50} 228h14v8h-14z`} {...ink(W.thin)} />
          <circle cx={x + 14} cy="248" r="5" fill="var(--ink)" />
          <circle cx={x + 56} cy="248" r="5" fill="var(--ink)" />
        </g>
      ))}
      <Dim x1={60} y1={282} x2={200} y2={282} label="troncal" off={12} />
      <Dim x1={280} y1={282} x2={420} y2={282} label="troncal" off={12} />
      <TitleBlock title="SECCIÓN AV. 68  CON VIADUCTO L1" scale="ESC 1:200" sheet="LG-07" />

      <Scan p={p} />
      {/* metro-style route diagram, 0/45/90° only */}
      <Draw p={p} d="M20 44H460" a={0.06} b={0.22} w={3} />
      <Draw p={p} d="M20 76H120L152 44H300L332 76H460" a={0.18} b={0.4} w={1.6} />
      <Draw p={p} d="M20 98H140L162 76H260L282 98H460" a={0.36} b={0.58} w={1.6} dash="5 3" />
      {[80, 240, 400].map((x, i) => (
        <Show key={x} p={p} at={0.14 + i * 0.04}>
          <circle cx={x} cy="44" r="5.5" fill="var(--plate)" stroke={MK} strokeWidth="2" />
        </Show>
      ))}
      <Show p={p} at={0.2}>
        <text className="tag" x="20" y="34">METRO L1</text>
      </Show>
      <Show p={p} at={0.6}>
        <text className="tag" x="20" y="114">ruta propuesta</text>
      </Show>
      <Readout p={p} x={330} y={112} w={140} at={0.56} title="IMPACTO L1" rows={[{ k: 'rutas SITP', v: routes }, { k: 'propuestas', v: '231' }]} />
    </svg>
  );
}

/* =================================================================== */
/* 8. LiDAR-scanned lab — floor plan with robot inspection route        */
/* =================================================================== */
const ROUTE: [number, number][] = [
  [60, 160],
  [220, 160],
  [220, 70],
  [400, 70],
  [400, 170],
  [320, 170],
  [320, 270],
  [190, 270],
];

function pointAt(t: number): [number, number] {
  const segs = ROUTE.slice(1).map((pt, i) => {
    const a = ROUTE[i];
    return { a, b: pt, len: Math.hypot(pt[0] - a[0], pt[1] - a[1]) };
  });
  const total = segs.reduce((s, x) => s + x.len, 0);
  let d = Math.min(1, Math.max(0, t)) * total;
  for (const s of segs) {
    if (d <= s.len) return [s.a[0] + ((s.b[0] - s.a[0]) * d) / s.len, s.a[1] + ((s.b[1] - s.a[1]) * d) / s.len];
    d -= s.len;
  }
  return ROUTE[ROUTE.length - 1];
}

// deterministic "point cloud" speckle along the walls
const frac = (v: number) => v - Math.floor(v);
const SPECK = Array.from({ length: 90 }, (_, i) => {
  const f = frac(Math.sin(i * 12.9898) * 43758.5453);
  const g = frac(Math.sin(i * 78.233) * 12345.678);
  const side = i % 4;
  if (side === 0) return [34 + f * 412, 36 + g * 6];
  if (side === 1) return [34 + f * 412, 288 - g * 6];
  if (side === 2) return [34 + g * 6, 40 + f * 250];
  return [440 - g * 6, 40 + f * 250];
});

export function RobotDrawing({ p }: P) {
  const t = useTransform(p, [0.1, 0.72], [0, 1]);
  const rx = useTransform(t, (v) => pointAt(v)[0]);
  const ry = useTransform(t, (v) => pointAt(v)[1]);
  const show = useTransform(p, [0.08, 0.12], [0, 1]);
  const d = 'M' + ROUTE.map(([x, y]) => `${x} ${y}`).join('L');
  const photos: [number, number, number, string][] = [
    [220, 70, 0.3, 'F1'],
    [400, 170, 0.48, 'F2'],
    [320, 270, 0.62, 'F3'],
  ];
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label="Planta de un laboratorio escaneado con LiDAR; la capa digital traza la ruta de inspección del robot y los puntos de foto">
      {/* walls as poché */}
      <path d="M20 24H460V306H20Z M30 34V296H450V34Z" fill="url(#h-poche)" fillRule="evenodd" />
      <path d="M20 24H460V306H20ZM30 34H450V296H30Z" {...ink(W.cut)} />
      <rect x="200" y="34" width="10" height="80" fill="url(#h-poche)" />
      <rect x="200" y="200" width="10" height="96" fill="url(#h-poche)" />
      <path d="M200 34h10v80h-10zM200 200h10v96h-10z" {...ink(W.line)} />
      {/* door swing */}
      <path d="M210 114h40M210 114a40 40 0 0 1 40 40" {...ink(W.thin)} />
      {/* furniture */}
      <path d="M50 54h110v40H50zM58 210h70v66H58zM250 104h120v28H250zM240 200h50v46h-50zM350 214h80v62h-80z" fill="var(--plate)" {...ink(W.line)} />
      <path d="M50 54l110 40M58 210l70 66M240 200l50 46" {...ink(W.thin)} />
      {SPECK.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="1.3" height="1.3" fill="var(--ink)" opacity="0.5" />
      ))}
      <path d="M440 318h-40M440 314v4M420 315v3M400 314v4" {...ink(W.thin)} />
      <text className="dim" x="420" y="312" textAnchor="middle">2 m</text>
      <TitleBlock title="PLANTA LAB  NUBE LIDAR 5,4 M PTS" scale="ESC 1:100" sheet="LG-08" />

      <Scan p={p} />
      <Draw p={p} d={d} a={0.1} b={0.72} w={1.8} />
      {photos.map(([x, y, at, k]) => (
        <g key={k}>
          <Show p={p} at={at}>
            <path d={`M${x} ${y}L${x + 30} ${y - 16}V${y + 16}Z`} fill={MK} opacity="0.14" stroke={MK} strokeWidth="0.6" />
            <rect x={x - 5} y={y - 5} width="10" height="10" fill="var(--plate)" stroke={MK} strokeWidth="1.4" />
          </Show>
          <Callout p={p} x={x} y={y} tx={x - 20} ty={y - 26} at={at + 0.02} text={`${k}  RGB-D`} anchor="end" />
        </g>
      ))}
      <motion.g style={{ opacity: show }}>
        <motion.circle cx={rx} cy={ry} r="11" fill={MK} opacity="0.18" />
        <motion.circle cx={rx} cy={ry} r="6" fill={MK} />
      </motion.g>
      <Callout p={p} x={60} y={160} tx={50} ty={130} at={0.06} text="G1  inicio" />
    </svg>
  );
}

/* =================================================================== */
/* 9. River basin plan: forest, mine, flood zone, contracts             */
/* =================================================================== */
export function RiverDrawing({ p }: P) {
  const ha = useNum(p, 0.4, 0.7, 104539, (v) => `${es(0)(Math.round(v))} ha`);
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label="Plano de una cuenca con río, bosque y mina a cielo abierto; la capa digital marca la zona inundable y los contratos">
      {/* contours */}
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M-10 ${36 + i * 14}C120 ${20 + i * 18} 220 ${90 + i * 6} 490 ${10 + i * 22}`} {...ink(W.thin)} opacity="0.55" />
      ))}
      {/* forest */}
      <path d="M20 190C60 170 120 200 130 250S60 320 20 300Z" fill="url(#h-forest)" />
      <path d="M340 220C380 200 450 210 470 250S420 320 360 300Z" fill="url(#h-forest)" />
      {/* mine pit with benches */}
      <path d="M300 40H400L388 104H312Z" fill="var(--plate)" {...ink(W.line)} />
      <path d="M306 56H394M309 72H391M312 88H388" {...ink(W.thin)} />
      {/* river: double line + flow arrow */}
      <path d="M-10 120C80 130 100 190 170 196S270 160 300 222 380 300 490 296" {...ink(W.cut)} />
      <path d="M-10 134C80 144 92 204 166 210S262 174 290 232 372 312 490 310" {...ink(W.line)} />
      <path d="M210 200l14 -4l-10 10" {...ink(W.line)} />
      {/* north + scale */}
      <path d="M452 30l8 22-8-6-8 6z" fill="var(--ink)" />
      <text className="axis" x="452" y="24" textAnchor="middle">N</text>
      <path d="M20 316h80M20 312v4M60 313v3M100 312v4" {...ink(W.thin)} />
      <text className="dim" x="60" y="308" textAnchor="middle">2 km</text>
      <TitleBlock title="CUENCA RÍO GUATAPURÍ  CESAR" scale="ESC 1:50 000" sheet="LG-09" />

      <Scan p={p} />
      <FloodZone p={p} />
      <Draw p={p} d="M296 36H404L390 108H310Z" a={0.32} b={0.46} w={1.6} />
      <Callout p={p} x={394} y={90} tx={472} ty={124} at={0.44} text="minería S-2" anchor="end" />
      {[
        [140, 176, 0.52],
        [250, 168, 0.58],
        [80, 152, 0.64],
      ].map(([x, y, at], i) => (
        <Show key={i} p={p} at={at}>
          <rect x={x - 9} y={y - 9} width="18" height="18" fill={MK} />
          <text className="tag tag-inv" x={x} y={y + 4} textAnchor="middle">$</text>
        </Show>
      ))}
      <Callout p={p} x={250} y={168} tx={262} ty={142} at={0.68} text="contratos SECOP" />
      <Readout p={p} x={20} y={20} w={150} at={0.48} title="CESAR  2017–2025" rows={[{ k: 'huella minera', v: ha }, { k: 'contratos activos', v: '531' }]} />
    </svg>
  );
}

function FloodZone({ p }: P) {
  const op = useTransform(p, [0.12, 0.3], [0, 1]);
  const d =
    'M-10 98C80 104 110 168 170 172S262 140 300 196 382 270 490 266L490 340C380 340 350 284 280 252S210 230 160 236 70 168 -10 160Z';
  return (
    <g>
      <motion.path d={d} fill="url(#h-flood)" style={{ opacity: op }} />
      <Draw p={p} d={d} a={0.1} b={0.32} w={1} dash="5 3" />
      <Callout p={p} x={120} y={200} tx={150} ty={286} at={0.3} text="zona inundable HAND" />
    </g>
  );
}

export const drawings = {
  tank: TankDrawing,
  quake: QuakeDrawing,
  vision: VisionDrawing,
  twin: TwinDrawing,
  solar: SolarDrawing,
  city: CityDrawing,
  transit: TransitDrawing,
  robot: RobotDrawing,
  river: RiverDrawing,
};
