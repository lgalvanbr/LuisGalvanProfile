// Every project card on the Órbita page: the hub's cards plus the portfolio's own,
// each placed on a scale (equipo → territorio) and, when a long-form case exists, linked to it.
import { HUB } from './hubProjects';

export type Scale = 'equipo' | 'edificacion' | 'obra' | 'ciudad' | 'territorio';

export interface Card {
  name: string;
  url: string;
  description: string;
  tags: string[];
  cta: string;
  hint?: string;
  scene?: string;
  label?: string;
  check?: boolean; // ping the URL and show "en línea"
  stamp?: string; // fixed status when there is nothing to ping
  scale: Scale;
  caseId?: string; // id in story/content.ts for the full technical sheet
}

export const SCALES: { id: Scale; name: string; note: string }[] = [
  { id: 'equipo', name: 'Equipo', note: 'Sensores e instrumentación' },
  { id: 'edificacion', name: 'Edificación', note: 'Estructuras, BIM y robótica' },
  { id: 'obra', name: 'Obra', note: 'Seguimiento en campo y energía' },
  { id: 'ciudad', name: 'Ciudad', note: 'Bogotá, movilidad y planes parciales' },
  { id: 'territorio', name: 'Territorio', note: 'Cuencas, corredores y satélite' },
];

const hubScale: Record<string, Scale> = {
  'Sinergia Workshop': 'edificacion',
  'Plan Parcial Wanchaq': 'ciudad',
  'Plan Parcial Teusaquillo': 'ciudad',
  'Modelos LiDAR': 'edificacion',
  'Mapa del sistema de Bogotá': 'ciudad',
  'Bogotá 3D': 'ciudad',
  'Tráfico y emisiones': 'ciudad',
  'Vía Sumapaz: Bogotá–Girardot': 'territorio',
  'Visor de la Vía Sumapaz': 'territorio',
  'Movilidad de Bogotá 3D': 'ciudad',
  'Rutas y buses del SITP': 'ciudad',
  'Obras del IDU 3D': 'obra',
  'Bogotá 3D: OpenStreetMap y Esri': 'ciudad',
  'Casa modelo a escala 3D': 'edificacion',
  'Cuenca del río Sinú 3D': 'territorio',
  'Río Sinú en datos': 'territorio',
  'Cuencas de Cundinamarca': 'territorio',
};

const hubCase: Record<string, string> = {
  'Mapa del sistema de Bogotá': 'buses',
  'Bogotá 3D': 'bogota3d',
};

const portfolio: Card[] = [
  {
    name: 'InspectorEstructural',
    url: 'https://inspector-estructural.vercel.app',
    description: 'Triaje de viviendas después de un sismo: el propietario reporta con fotografías y un ingeniero de la Universidad de los Andes emite el dictamen con NSR-10 y FEMA 154.',
    tags: ['Sismo', 'Mapa de triaje', 'Computador y celular'],
    cta: 'Entrar a InspectorEstructural',
    scene: 'inspector',
    label: 'Vivienda de dos pisos en la que se dibuja una grieta diagonal, un pin de reporte y el dictamen en el teléfono.',
    check: true,
    scale: 'edificacion',
    caseId: 'sismo',
  },
  {
    name: 'ciamAR',
    url: 'https://ciam-ar.vercel.app',
    description: 'Modelos estructurales del CIAM en realidad aumentada a escala 1:1, desde el navegador del teléfono y sin instalación.',
    tags: ['Realidad aumentada', 'WebXR', 'Celular'],
    cta: 'Entrar a ciamAR',
    scene: 'ciamar',
    label: 'Pórtico estructural que se dibuja en la obra mientras un teléfono lo proyecta a escala real.',
    check: true,
    scale: 'edificacion',
    caseId: 'gemelo',
  },
  {
    name: 'Unitree G1 en Isaac Lab',
    url: '#destacado-robot',
    description: 'Humanoide entrenado con aprendizaje por refuerzo para inspeccionar edificaciones: escaleras de 15 cm, empujones de 0,6 m/s y recuperación tras caídas, con RGB, profundidad y LiDAR.',
    tags: ['Robótica', 'Isaac Lab', 'LiDAR'],
    cta: 'Ver los ensayos',
    scene: 'robot',
    label: 'Humanoide que recorre una oficina mientras el LiDAR deja puntos sobre los muros.',
    stamp: 'simulación',
    scale: 'edificacion',
    caseId: 'robot',
  },
  {
    name: 'Telemetría de tanques',
    url: 'https://eds-roble-caribe.vercel.app',
    description: 'Sensores de presión hidrostática y ESP32 para medir el nivel de tanques enterrados y detectar pérdidas al conciliar con las ventas.',
    tags: ['IoT', 'ESP32', 'Combustible'],
    cta: 'Entrar a Roble Caribe Analytics',
    scene: 'tanque',
    label: 'Corte de un tanque enterrado cuyo nivel sube y baja mientras el sensor transmite al ESP32.',
    stamp: 'desde 2022',
    scale: 'equipo',
    caseId: 'tanque',
  },
  {
    name: 'Visión en obra',
    url: '#ficha-vision',
    description: 'Detección de personas y elementos de protección en cámaras de obra con YOLO y ByteTrack, con alerta cuando falta el casco.',
    tags: ['Visión por computador', 'Seguridad', 'CIAM'],
    cta: 'Ver la ficha',
    scene: 'vision',
    label: 'Frente de obra con cajas de detección sobre los trabajadores y uno marcado sin casco.',
    stamp: 'investigación',
    scale: 'obra',
    caseId: 'vision',
  },
  {
    name: 'LGI Solar',
    url: '/solar',
    description: 'Sistema fotovoltaico de más de 30 kWp en Pailitas, Cesar, con equipos Growatt y JA Solar y expediente técnico ante la UPME.',
    tags: ['Energía solar', 'UPME', 'LGI'],
    cta: 'Entrar a LGI Solar',
    scene: 'solar',
    label: 'Bodega en la que aparecen paneles solares y la energía fluye hacia el inversor.',
    stamp: 'instalado',
    scale: 'obra',
    caseId: 'solar',
  },
  {
    name: 'Contratos y satélite',
    url: 'https://corpocesar.vercel.app',
    description: '531 contratos de Corpocesar y 31.343 de 25 corporaciones cruzados con pérdida de bosque, minería Sentinel-2 y un modelo propio de zonas inundables.',
    tags: ['Sentinel-2', 'HAND', 'SECOP'],
    cta: 'Entrar al estudio',
    scene: 'corpocesar',
    label: 'Cuenca con río, bosque, una mina y contratos, barrida por un satélite.',
    check: true,
    scale: 'territorio',
    caseId: 'corpocesar',
  },
];

export const CARDS: Card[] = [
  ...portfolio,
  // Solo los proyectos propios del hub, publicados en su dominio *.cuadreb.com
  ...(HUB as Omit<Card, 'scale'>[])
    .filter((p) => /^https:\/\/[^/]+\.cuadreb\.com\//.test(p.url))
    .map((p) => ({ ...p, scale: hubScale[p.name] ?? 'ciudad', caseId: hubCase[p.name] })),
];
