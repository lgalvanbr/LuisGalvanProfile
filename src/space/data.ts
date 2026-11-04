// Space home: short labels per case and the capability map.
// Long-form case content stays in ../story/content.ts and is shown in the dossier.

import { chapters, type Case, type Lang } from '../story/content';

type T = Record<Lang, string>;

export type CapId = 'struct' | 'geo' | 'ai' | 'iot' | 'xr';

export interface Mission {
  c: Case;
  code: string;
  name: string;
  line: T;
  caps: CapId[];
  orbit: 0 | 1 | 2; // inner, middle, outer ring
}

const meta: Record<string, Omit<Mission, 'c'>> = {
  sismo: { code: 'IE-01', name: 'InspectorEstructural', line: { es: 'Triaje post-sismo en el teléfono', en: 'Post-earthquake triage on a phone' }, caps: ['struct', 'geo'], orbit: 0 },
  gemelo: { code: 'AR-02', name: 'ciamAR', line: { es: 'Estructuras en realidad aumentada 1:1', en: 'Structures in 1:1 augmented reality' }, caps: ['struct', 'xr'], orbit: 0 },
  tanque: { code: 'IO-03', name: 'Telemetría de tanques', line: { es: 'Telemetría de nivel y detección de fugas', en: 'Level telemetry and leak detection' }, caps: ['iot'], orbit: 0 },
  bogota3d: { code: 'B3-04', name: 'Bogotá 3D', line: { es: 'La ciudad entera desde datos abiertos', en: 'The whole city from open data' }, caps: ['geo', 'xr', 'ai'], orbit: 1 },
  buses: { code: 'TM-05', name: 'Metro L1 × SITP', line: { es: 'Rediseño de rutas con datos reales', en: 'Route redesign with real data' }, caps: ['geo', 'ai'], orbit: 1 },
  vision: { code: 'CV-06', name: 'Visión en obra', line: { es: 'YOLO + ByteTrack sobre cámaras de obra', en: 'YOLO + ByteTrack on site cameras' }, caps: ['ai'], orbit: 1 },
  corpocesar: { code: 'SA-07', name: 'Contratos y satélite', line: { es: 'Contratación ambiental y teledetección', en: 'Environmental contracts and remote sensing' }, caps: ['geo', 'ai'], orbit: 2 },
  solar: { code: 'PV-08', name: 'LGI Solar', line: { es: '30+ kWp en Pailitas, Cesar', en: '30+ kWp in Pailitas, Cesar' }, caps: ['iot'], orbit: 2 },
  robot: { code: 'G1-09', name: 'Unitree G1', line: { es: 'Robótica humanoide para inspección', en: 'Humanoid robotics for inspection' }, caps: ['ai', 'xr', 'iot'], orbit: 2 },
};

export const missions: Mission[] = chapters
  .flatMap((ch) => ch.cases)
  .filter((c) => meta[c.id])
  .map((c) => ({ c, ...meta[c.id] }));

export const caps: { id: CapId; name: T; body: T; tools: string }[] = [
  {
    id: 'struct',
    name: { es: 'Estructuras y sismo', en: 'Structures & seismic' },
    body: { es: 'Análisis y diseño con NSR-10, evaluación post-sismo y vulnerabilidad.', en: 'Analysis and design to NSR-10, post-earthquake assessment and vulnerability.' },
    tools: 'ETABS · SAP2000 · NSR-10 · FEMA 154',
  },
  {
    id: 'geo',
    name: { es: 'Datos geoespaciales', en: 'Geospatial data' },
    body: { es: 'Satélite, catastro, transporte y redes cruzados en un mismo mapa.', en: 'Satellite, cadastre, transit and networks crossed on one map.' },
    tools: 'PostGIS · MapLibre · Sentinel · GTFS',
  },
  {
    id: 'ai',
    name: { es: 'IA y visión', en: 'AI & vision' },
    body: { es: 'Detección, clasificación y apoyo a la decisión con verificación humana.', en: 'Detection, classification and decision support with human review.' },
    tools: 'PyTorch · YOLO · SegFormer · LLMs locales',
  },
  {
    id: 'iot',
    name: { es: 'IoT, energía y robots', en: 'IoT, energy & robots' },
    body: { es: 'Firmware de sensores, sistemas fotovoltaicos y robótica de inspección.', en: 'Sensor firmware, photovoltaic systems and inspection robotics.' },
    tools: 'ESP32 · C++ · Isaac Lab · ROS 2',
  },
  {
    id: 'xr',
    name: { es: '3D, gemelos y XR', en: '3D, twins & XR' },
    body: { es: 'Modelos urbanos y estructurales en el navegador y en realidad aumentada.', en: 'Urban and structural models in the browser and in augmented reality.' },
    tools: 'Three.js · WebGPU · WebXR · LiDAR',
  },
];

export const copy = {
  es: {
    role: 'Ingeniero civil y de sistemas · Universidad de los Andes',
    lede: 'Software, datos e inteligencia artificial aplicados a la infraestructura.',
    hint: 'Cada punto representa un proyecto. Selecciónelo para ver el detalle.',
    explore: 'Ver proyectos',
    contact: 'Contacto',
    capsTitle: 'Capacidades',
    capsHint: 'Seleccione una para resaltar los proyectos relacionados.',
    missionsTitle: 'Proyectos',
    problem: 'Problema',
    built: 'Solución',
    how: 'Cómo funciona',
    open: 'Abrir',
    close: 'Cerrar',
    next: 'Siguiente',
    prev: 'Anterior',
    endTitle: 'Contacto',
    endBody: 'Consultoría, investigación y desarrollo en monitoreo estructural, datos geoespaciales y robótica.',
    lang: 'EN',
    langLabel: 'Ver en inglés',
    online: 'BOGOTÁ',
    local: 'HORA BOGOTÁ',
    footer: 'Diseñado y construido por Luis Carlos Galvan.',
    lgi: 'Consultoría LGI',
  },
  en: {
    role: 'Civil & systems engineer · Universidad de los Andes',
    lede: 'Software, data and artificial intelligence applied to infrastructure.',
    hint: 'Each point is a project. Select it to see the details.',
    explore: 'View projects',
    contact: 'Contact',
    capsTitle: 'Capabilities',
    capsHint: 'Select one to highlight related projects.',
    missionsTitle: 'Projects',
    problem: 'Problem',
    built: 'Solution',
    how: 'How it works',
    open: 'Open',
    close: 'Close',
    next: 'Next',
    prev: 'Previous',
    endTitle: 'Contact',
    endBody: 'Consulting, research and development in structural monitoring, geospatial data and robotics.',
    lang: 'ES',
    langLabel: 'Ver en español',
    online: 'BOGOTÁ',
    local: 'BOGOTÁ TIME',
    footer: 'Designed and built by Luis Carlos Galvan.',
    lgi: 'LGI consulting',
  },
};
