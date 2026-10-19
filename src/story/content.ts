// All copy for the home page lives here, in both languages.
// The page is told as a borehole log: each chapter is a stratum, deeper = later.

export type Lang = 'es' | 'en';
export type Soil = 'fill' | 'sand' | 'clay' | 'silt' | 'gravel' | 'rock';
type T = Record<Lang, string>;

export interface Stratum {
  id: string;
  top: number; // m
  bottom: number; // m
  soil: Soil;
  soilName: T;
  when: T;
  title: T;
  body: T[];
  note?: T; // hand-written field note in the margin
  link?: { href: string; label: T };
}

export interface Sample {
  code: string;
  name: string;
  what: T;
  where: T;
  stack: string;
  href: string;
}

export const LINKS = {
  email: 'cotizaciones@luisgalvan.me',
  linkedin: 'https://www.linkedin.com/in/luis-carlos-galvan-vergel-15696230a/',
  github: 'https://github.com/lgalvanbr',
  whatsapp: 'https://wa.me/573022687981',
};

export const ui = {
  es: {
    lang: 'English',
    langLabel: 'Ver en inglés',
    navStory: 'Historia',
    navSamples: 'Proyectos',
    navContact: 'Contacto',
    boreholeName: 'Sondeo LG-01',
    boreholeMeta: 'Bogotá, Colombia',
    depth: 'Profundidad',
    name: 'Luis Carlos Galván',
    lede: 'Ingeniero civil y de sistemas. Mido lo que se mueve, se agrieta o se inunda, y escribo el software que avisa a tiempo.',
    photoCaption: 'Muestra SB Sec4 a 35 kPa, laboratorio de suelos de la Universidad de los Andes.',
    scrollCue: 'Bajemos por el sondeo',
    samplesTitle: 'Muestras recuperadas',
    samplesIntro: 'Lo que salió del sondeo: aplicaciones que están en línea y se pueden abrir hoy.',
    open: 'Abrir',
    lgiTitle: 'Si buscas a LGI',
    lgiBody: 'LGI es la firma desde la que hago consultoría. Cada línea tiene su página:',
    lgiLinks: [
      { href: '/lgi', label: 'Ingeniería, gemelos digitales e IoT' },
      { href: '/ia', label: 'IA y automatización' },
      { href: '/solar', label: 'Energía solar' },
    ],
    endTitle: 'Fin del sondeo',
    endBody: 'Aquí no hay roca firme todavía. Si tienes una estructura que vigilar, una obra que medir o un equipo que necesita a alguien entre el concreto y el código, escríbeme.',
    contactEmail: 'Escribir un correo',
    contactWhatsapp: 'WhatsApp',
    footer: 'Diseñado y construido por Luis Carlos Galván.',
  },
  en: {
    lang: 'Español',
    langLabel: 'Ver en español',
    navStory: 'Story',
    navSamples: 'Projects',
    navContact: 'Contact',
    boreholeName: 'Borehole LG-01',
    boreholeMeta: 'Bogotá, Colombia',
    depth: 'Depth',
    name: 'Luis Carlos Galván',
    lede: 'Civil and systems engineer. I measure things that move, crack or flood, and write the software that warns people in time.',
    photoCaption: 'Sample SB Sec4 at 35 kPa, soils lab at Universidad de los Andes.',
    scrollCue: 'Let’s go down the borehole',
    samplesTitle: 'Recovered samples',
    samplesIntro: 'What came out of the borehole: applications that are live and you can open today.',
    open: 'Open',
    lgiTitle: 'Looking for LGI',
    lgiBody: 'LGI is the firm I consult through. Each line has its own page:',
    lgiLinks: [
      { href: '/lgi', label: 'Engineering, digital twins and IoT' },
      { href: '/ia', label: 'AI and automation' },
      { href: '/solar', label: 'Solar energy' },
    ],
    endTitle: 'End of borehole',
    endBody: 'No bedrock yet. If you have a structure to watch, a site to measure, or a team that needs someone between concrete and code, write to me.',
    contactEmail: 'Send an email',
    contactWhatsapp: 'WhatsApp',
    footer: 'Designed and built by Luis Carlos Galván.',
  },
};

export const strata: Stratum[] = [
  {
    id: 'tanque',
    top: 0,
    bottom: 2.4,
    soil: 'fill',
    soilName: { es: 'Relleno', en: 'Fill' },
    when: { es: '2022', en: '2022' },
    title: { es: 'Un tanque que nadie veía', en: 'A tank nobody could see' },
    body: [
      {
        es: 'El mismo año que entré a la universidad ya estaba enterrando sensores. Una estación de combustible necesitaba saber qué pasaba dentro de sus tanques subterráneos, y la respuesta era mirar una varilla de medición una vez al día.',
        en: 'The same year I started university I was already burying sensors. A fuel station needed to know what was happening inside its underground tanks, and the answer was a dipstick once a day.',
      },
      {
        es: 'Programé un ESP32 en C++, le conecté sensores de presión hidrostática y mandé las lecturas a una base de datos para detectar fugas en tiempo real. Ahí entendí algo que no me ha soltado: lo que más importa casi siempre está donde nadie lo ve.',
        en: 'I programmed an ESP32 in C++, wired it to hydrostatic pressure sensors and streamed the readings to a database to catch leaks in real time. That is where I learned the thing that has stuck with me since: what matters most is usually where nobody looks.',
      },
    ],
    note: { es: 'ESP32, C++, presión hidrostática', en: 'ESP32, C++, hydrostatic pressure' },
  },
  {
    id: 'suelo',
    top: 2.4,
    bottom: 6.8,
    soil: 'clay',
    soilName: { es: 'Arcilla', en: 'Clay' },
    when: { es: '2022 a 2026', en: '2022 to 2026' },
    title: { es: 'Aprender a leer el suelo', en: 'Learning to read the ground' },
    body: [
      {
        es: 'Entré a Ingeniería Civil en la Universidad de los Andes. Pasé horas en el laboratorio de suelos, modelé estructuras en SAP2000 y ETABS, y en el proyecto HydroSafe co-diseñé cimentaciones flotantes para zonas que se inundan.',
        en: 'I studied Civil Engineering at Universidad de los Andes. I spent hours in the soils lab, modelled structures in SAP2000 and ETABS, and on the HydroSafe project co-designed floating foundations for flood-prone areas.',
      },
      {
        es: 'Pero cada cálculo terminaba en una hoja de cálculo que nadie más podía usar. En 2024 empecé también Ingeniería de Sistemas: quería que lo que calculaba se convirtiera en herramientas, no en anexos.',
        en: 'But every calculation ended up in a spreadsheet nobody else could use. In 2024 I also started Systems Engineering: I wanted my calculations to become tools, not appendices.',
      },
    ],
    note: { es: 'Doble programa, Uniandes', en: 'Double degree, Uniandes' },
  },
  {
    id: 'ojos',
    top: 6.8,
    bottom: 10.5,
    soil: 'silt',
    soilName: { es: 'Limo', en: 'Silt' },
    when: { es: '2026', en: '2026' },
    title: { es: 'Darle ojos a la obra', en: 'Giving the site a pair of eyes' },
    body: [
      {
        es: 'En el CIAM Lab de Uniandes junté las dos carreras. Entrené modelos de visión por computador con YOLO y ByteTrack para contar tráfico y vigilar la seguridad en frentes de obra activos, y construí gemelos digitales de infraestructura urbana en investigación vinculada al Metro de Bogotá.',
        en: 'At Uniandes’ CIAM Lab the two degrees finally met. I trained computer vision models with YOLO and ByteTrack to count traffic and watch safety on active construction fronts, and built digital twins of urban infrastructure in research linked to the Bogotá Metro.',
      },
      {
        es: 'También soy monitor del curso de herramientas de IA: enseñar Python a ingenieros civiles me obligó a explicar sin jerga, y eso cambió cómo construyo.',
        en: 'I am also a teaching assistant for the AI tools course. Teaching Python to civil engineers forced me to explain without jargon, and that changed how I build.',
      },
    ],
    link: { href: 'https://ciam-ar.vercel.app', label: { es: 'Ver un modelo en realidad aumentada', en: 'See a model in augmented reality' } },
  },
  {
    id: 'sismo',
    top: 10.5,
    bottom: 13.2,
    soil: 'sand',
    soilName: { es: 'Arena suelta', en: 'Loose sand' },
    when: { es: 'Después de un sismo', en: 'After an earthquake' },
    title: { es: 'Los primeros quince minutos', en: 'The first fifteen minutes' },
    body: [
      {
        es: 'Tras un terremoto, la pregunta no es teórica: ¿esta casa se puede habitar esta noche? Los formularios de inspección existen, pero en papel y en campo son lentos.',
        en: 'After an earthquake the question is not academic: can people sleep in this house tonight? Inspection forms exist, but on paper and in the field they are slow.',
      },
      {
        es: 'InspectorEstructural lleva ese triaje al teléfono. Sigue la NSR-10 y el FEMA 154, ubica cada edificación en un mapa y clasifica el daño en segundos para que los inspectores decidan dónde ir primero.',
        en: 'InspectorEstructural puts that triage on a phone. It follows NSR-10 and FEMA 154, places every building on a map and classifies damage in seconds so inspectors can decide where to go first.',
      },
    ],
    link: { href: 'https://inspector-estructural.vercel.app', label: { es: 'Abrir InspectorEstructural', en: 'Open InspectorEstructural' } },
  },
  {
    id: 'lgi',
    top: 13.2,
    bottom: 17.0,
    soil: 'gravel',
    soilName: { es: 'Grava', en: 'Gravel' },
    when: { es: 'Desde junio de 2026', en: 'Since June 2026' },
    title: { es: 'Del laboratorio a los clientes', en: 'From the lab to clients' },
    body: [
      {
        es: 'Fundé LGI para hacer con clientes reales lo que venía haciendo en el laboratorio. Instalo instrumentación remota en tanques, modelé y radiqué ante la UPME un sistema solar de más de 30 kW en Pailitas, Cesar, y construyo el software que usan las obras.',
        en: 'I founded LGI to do for real clients what I had been doing in the lab. I install remote instrumentation in tanks, modelled and filed with UPME a 30+ kW solar system in Pailitas, Cesar, and build the software construction sites use.',
      },
      {
        es: 'InterventorIA lleva las actas y el avance del Consorcio Usaquén. Y cuatro años después del primer sensor volví a una estación de servicio, esta vez con analítica de ventas e inventario de combustible por hora.',
        en: 'InterventorIA tracks the progress reports of Consorcio Usaquén. And four years after that first sensor I was back at a fuel station, this time with hourly sales and fuel-inventory analytics.',
      },
    ],
    note: { es: 'Ingeniería, IoT, solar, IA', en: 'Engineering, IoT, solar, AI' },
  },
  {
    id: 'ahora',
    top: 17.0,
    bottom: 19.5,
    soil: 'rock',
    soilName: { es: 'Roca meteorizada', en: 'Weathered rock' },
    when: { es: 'Ahora', en: 'Now' },
    title: { es: 'Lo que sigo buscando', en: 'What I am still looking for' },
    body: [
      {
        es: 'Estoy cursando la Maestría en Ingeniería Civil con énfasis en IA y analítica de datos para infraestructura. Me interesa el monitoreo de salud estructural, los datos geoespaciales y los gemelos digitales que alguien usa de verdad, no los que solo se ven bien en una presentación.',
        en: 'I am doing an M.Sc. in Civil Engineering focused on AI and data analytics for infrastructure. I care about structural health monitoring, geospatial data and digital twins that people actually use, not ones that only look good in a slide deck.',
      },
    ],
  },
];

export const samples: Sample[] = [
  {
    code: 'M-01',
    name: 'InspectorEstructural',
    what: { es: 'Triaje de daño estructural después de un sismo, en el teléfono.', en: 'Post-earthquake structural damage triage, on a phone.' },
    where: { es: 'Gestión de riesgo, NSR-10 y FEMA 154', en: 'Risk management, NSR-10 and FEMA 154' },
    stack: 'React, Supabase PostGIS, MapLibre',
    href: 'https://inspector-estructural.vercel.app',
  },
  {
    code: 'M-02',
    name: 'CIAM Lab',
    what: { es: 'Gemelos digitales 3D de infraestructura urbana en el navegador.', en: '3D digital twins of urban infrastructure in the browser.' },
    where: { es: 'Investigación CIAM, Uniandes', en: 'CIAM research, Uniandes' },
    stack: 'React, Three.js, Firebase',
    href: 'https://ciam-lab.vercel.app',
  },
  {
    code: 'M-03',
    name: 'ciamAR',
    what: { es: 'Modelos estructurales en realidad aumentada, a escala 1:1, sin instalar nada.', en: 'Structural models in augmented reality at 1:1 scale, nothing to install.' },
    where: { es: 'Inspección en obra', en: 'On-site inspection' },
    stack: 'WebXR, model-viewer, Three.js',
    href: 'https://ciam-ar.vercel.app',
  },
  {
    code: 'M-04',
    name: 'InterventorIA',
    what: { es: 'Actas, control financiero y avance de obra para una interventoría.', en: 'Progress reports, budget control and site progress for a supervision firm.' },
    where: { es: 'Consorcio Usaquén', en: 'Consorcio Usaquén' },
    stack: 'React, Vite',
    href: 'https://interventor-ia.vercel.app',
  },
  {
    code: 'M-05',
    name: 'Roble Caribe Analytics',
    what: { es: 'Ventas, inventario de tanques y conciliación por hora en una estación de servicio.', en: 'Hourly sales, tank inventory and reconciliation for a fuel station.' },
    where: { es: 'EDS Roble Caribe', en: 'EDS Roble Caribe' },
    stack: 'React, TypeScript, Leaflet',
    href: 'https://eds-roble-caribe.vercel.app',
  },
  {
    code: 'M-06',
    name: 'SinergIA',
    what: { es: 'Laboratorio de IA para proyectos de territorio y transporte en Bogotá.', en: 'AI lab for land-use and transport projects in Bogotá.' },
    where: { es: 'Laboratorio SinergIA, Uniandes', en: 'SinergIA Lab, Uniandes' },
    stack: 'React, mapas',
    href: 'https://sinergia-kappa.vercel.app',
  },
  {
    code: 'M-07',
    name: 'Lenguajes y máquinas',
    what: { es: 'Simulador paso a paso de autómatas finitos y gramáticas formales.', en: 'Step-by-step simulator for finite automata and formal grammars.' },
    where: { es: 'Teoría de la computación, Uniandes', en: 'Theory of computation, Uniandes' },
    stack: 'JavaScript, Canvas',
    href: 'https://lenguajes-y-maquinas.vercel.app',
  },
];

export const TOTAL_DEPTH = strata[strata.length - 1].bottom;
