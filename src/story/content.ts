// All copy for the home page lives here, in both languages.
// The page walks through real problems (civil) and the systems built for them (software).

export type Lang = 'es' | 'en';
type T = Record<Lang, string>;

export type DrawingId = 'tank' | 'quake' | 'vision' | 'twin' | 'solar' | 'city' | 'transit' | 'robot' | 'river';

export interface Stat {
  value: number;
  decimals?: number;
  suffix?: string;
  label: T;
}

export interface Media {
  kind: 'video' | 'image' | 'compare';
  before?: { src: string; label: T };
  after?: { src: string; label: T };
  src: string;
  poster?: string;
  alt: T;
  caption: T;
}

export interface Case {
  id: string;
  drawing: DrawingId;
  place: T; // where / when, short
  problem: T; // the real-world question, told plainly
  context: T;
  built: T; // what was built
  how: T[]; // 2-4 steps
  stats?: Stat[];
  media?: Media;
  stack: string;
  link?: { href: string; label: T };
  note?: T;
}

export interface Chapter {
  id: string;
  title: T;
  intro: T;
  cases: Case[];
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
    nav: { cases: 'Casos', path: 'Trayectoria', tools: 'Herramientas', contact: 'Contacto' },
    name: 'Luis Carlos Galvan',
    role: 'Ingeniero civil y de sistemas, Universidad de los Andes',
    lede: 'Desarrollo sistemas de medición, modelación y monitoreo para infraestructura: estructuras, obras, ciudades y territorio.',
    ctaCases: 'Ver proyectos',
    ctaContact: 'Contacto',
    layerPhysical: 'Capa física',
    layerDigital: 'Capa digital',
    layerHint: 'Cada proyecto se presenta en dos capas: el problema físico y el sistema desarrollado para resolverlo.',
    methodTitle: 'Metodología',
    method: [
      { t: 'Diagnóstico', d: 'Visita técnica y levantamiento de información en obra, laboratorio o instalación para definir el problema y sus usuarios.' },
      { t: 'Medición', d: 'Instrumentación, registro fotográfico, cámaras e integración de datos abiertos verificables.' },
      { t: 'Modelación', d: 'Análisis conforme a norma (NSR-10, análisis estructural, hidráulica) complementado con modelos de IA cuando aportan.' },
      { t: 'Implementación', d: 'Herramientas en producción que el equipo usa en su operación diaria, con documentación y soporte.' },
    ],
    problem: 'Problema',
    built: 'Solución',
    how: 'Cómo funciona',
    open: 'Abrir la app',
    caseOf: 'Proyecto',
    pathTitle: 'Trayectoria',
    pathIntro: 'Formación en ingeniería civil y de sistemas, con experiencia en instrumentación, investigación aplicada y consultoría.',
    photoCaption: 'Muestra SB Sec4 a 35 kPa, laboratorio de suelos de la Universidad de los Andes.',
    toolsTitle: 'Herramientas',
    toolsCivil: 'Ingeniería civil',
    toolsSystems: 'Ingeniería de sistemas',
    moreTitle: 'Más proyectos',
    lgiTitle: 'LGI',
    lgiBody: 'LGI es la firma de consultoría que dirijo. Cada línea de servicio tiene su página.',
    lgiLinks: [
      { href: '/lgi', label: 'Ingeniería, gemelos digitales e IoT' },
      { href: '/ia', label: 'IA y automatización' },
      { href: '/solar', label: 'Energía solar' },
    ],
    endTitle: 'Contacto',
    endBody: 'Disponible para proyectos de consultoría, investigación y desarrollo en monitoreo estructural, datos geoespaciales y robótica de inspección.',
    contactWhatsapp: 'WhatsApp',
    footer: 'Diseñado y construido por Luis Carlos Galvan.',
    sim: 'Simulación',
  },
  en: {
    lang: 'Español',
    langLabel: 'Ver en español',
    nav: { cases: 'Cases', path: 'Path', tools: 'Tools', contact: 'Contact' },
    name: 'Luis Carlos Galvan',
    role: 'Civil and systems engineer, Universidad de los Andes',
    lede: 'I develop measurement, modelling and monitoring systems for infrastructure: structures, construction sites, cities and land.',
    ctaCases: 'View projects',
    ctaContact: 'Contact',
    layerPhysical: 'Physical layer',
    layerDigital: 'Digital layer',
    layerHint: 'Each project is shown in two layers: the physical problem and the system developed to solve it.',
    methodTitle: 'Methodology',
    method: [
      { t: 'Assessment', d: 'Site visit and data collection on site, in the lab or at the facility to define the problem and its users.' },
      { t: 'Measurement', d: 'Instrumentation, photographic records, cameras and verifiable open data.' },
      { t: 'Modelling', d: 'Code-compliant analysis (building codes, structural analysis, hydraulics) complemented by AI models where they add value.' },
      { t: 'Implementation', d: 'Production tools the team uses in daily operations, with documentation and support.' },
    ],
    problem: 'Problem',
    built: 'Solution',
    how: 'How it works',
    open: 'Open the app',
    caseOf: 'Project',
    pathTitle: 'Path',
    pathIntro: 'Training in civil and systems engineering, with experience in instrumentation, applied research and consulting.',
    photoCaption: 'Sample SB Sec4 at 35 kPa, soils lab at Universidad de los Andes.',
    toolsTitle: 'Tools',
    toolsCivil: 'Civil engineering',
    toolsSystems: 'Systems engineering',
    moreTitle: 'More projects',
    lgiTitle: 'LGI',
    lgiBody: 'LGI is the consulting firm I lead. Each service line has its own page.',
    lgiLinks: [
      { href: '/lgi', label: 'Engineering, digital twins and IoT' },
      { href: '/ia', label: 'AI and automation' },
      { href: '/solar', label: 'Solar energy' },
    ],
    endTitle: 'Contact',
    endBody: 'Available for consulting, research and development projects in structural monitoring, geospatial data and inspection robotics.',
    contactWhatsapp: 'WhatsApp',
    footer: 'Designed and built by Luis Carlos Galvan.',
    sim: 'Simulation',
  },
};

export const chapters: Chapter[] = [
  {
    id: 'oculto',
    title: { es: 'Instrumentación y evaluación', en: 'Instrumentation and assessment' },
    intro: {
      es: 'Medición de variables que no son visibles a simple vista: niveles en tanques enterrados y daño estructural después de un sismo.',
      en: 'Measuring what is not visible: levels in buried tanks and structural damage after an earthquake.',
    },
    cases: [
      {
        id: 'tanque',
        drawing: 'tank',
        place: { es: 'Estación de combustible, 2022', en: 'Fuel station, 2022' },
        problem: { es: 'Medición continua de nivel y detección de fugas en tanques subterráneos.', en: 'Continuous level measurement and leak detection in underground tanks.' },
        context: {
          es: 'La medición se hacía con varilla una vez al día y se registraba a mano, por lo que una pérdida solo se detectaba semanas después en la conciliación contable.',
          en: 'Levels were measured with a dipstick once a day and logged by hand, so a loss was only detected weeks later during accounting reconciliation.',
        },
        built: {
          es: 'Sistema de telemetría con sensores de presión hidrostática, microcontrolador ESP32 programado en C++ y base de datos que genera alertas cuando el nivel disminuye sin una venta asociada.',
          en: 'Telemetry system with hydrostatic pressure sensors, an ESP32 microcontroller programmed in C++ and a database that raises alerts when the level drops without an associated sale.',
        },
        how: [
          { es: 'La presión en el fondo da la altura del líquido.', en: 'Pressure at the bottom gives the liquid height.' },
          { es: 'El ESP32 registra la lectura y la transmite por WiFi.', en: 'The ESP32 records the reading and transmits it over WiFi.' },
          { es: 'La lectura se concilia con las ventas para detectar pérdidas.', en: 'Readings are reconciled with sales to detect losses.' },
        ],
        stack: 'ESP32, C++, MQTT, SQL',
        note: {
          es: 'En 2026 el trabajo se amplió con analítica horaria de ventas e inventario para una estación de servicio (Roble Caribe Analytics).',
          en: 'In 2026 the work was extended with hourly sales and inventory analytics for a fuel station (Roble Caribe Analytics).',
        },
        link: { href: 'https://eds-roble-caribe.vercel.app', label: { es: 'Ver Roble Caribe Analytics', en: 'See Roble Caribe Analytics' } },
      },
      {
        id: 'sismo',
        drawing: 'quake',
        place: { es: 'Después del sismo del 10 de agosto', en: 'After the August 10 earthquake' },
        problem: { es: 'Evaluación rápida de habitabilidad de viviendas después de un sismo.', en: 'Rapid post-earthquake habitability assessment of homes.' },
        context: {
          es: 'Tras un sismo, la demanda de inspecciones supera la capacidad de los ingenieros disponibles. Los formatos en papel son lentos y no permiten priorizar las visitas.',
          en: 'After an earthquake, demand for inspections exceeds the available engineers. Paper forms are slow and do not allow visits to be prioritised.',
        },
        built: {
          es: 'InspectorEstructural: plataforma donde el propietario reporta la vivienda con fotografías del daño; un ingeniero de la Universidad de los Andes emite el dictamen con criterios de la NSR-10 y el FEMA 154, y cada caso se ubica en un mapa de priorización.',
          en: 'InspectorEstructural: a platform where owners report their home with photos of the damage; a Universidad de los Andes engineer issues the verdict using NSR-10 and FEMA 154 criteria, and each case is placed on a prioritisation map.',
        },
        how: [
          { es: 'Reporte con ubicación, pisos y síntomas.', en: 'Report with location, floors and symptoms.' },
          { es: 'Compresión de fotografías para conexiones de baja calidad.', en: 'Photo compression for low-quality connections.' },
          { es: 'Dictamen del ingeniero y mapa de triaje.', en: 'Engineer’s verdict and triage map.' },
        ],
        media: {
          kind: 'image',
          src: '/media/inspector.webp',
          alt: { es: 'Página de inicio de InspectorEstructural', en: 'InspectorEstructural home page' },
          caption: { es: 'InspectorEstructural en línea, con el CIAM de Uniandes.', en: 'InspectorEstructural live, with Uniandes’ CIAM.' },
        },
        stack: 'React, Supabase PostGIS, MapLibre',
        link: { href: 'https://inspector-estructural.vercel.app', label: { es: 'Abrir InspectorEstructural', en: 'Open InspectorEstructural' } },
      },
    ],
  },
  {
    id: 'obra',
    title: { es: 'Construcción', en: 'Construction' },
    intro: {
      es: 'Digitalización del seguimiento en obra: seguridad, modelos estructurales y energía.',
      en: 'Digital tools for site follow-up: safety, structural models and energy.',
    },
    cases: [
      {
        id: 'vision',
        drawing: 'vision',
        place: { es: 'CIAM Lab, Uniandes, 2026', en: 'CIAM Lab, Uniandes, 2026' },
        problem: { es: 'Supervisión continua del uso de elementos de protección personal en obra.', en: 'Continuous monitoring of personal protective equipment on site.' },
        context: {
          es: 'Las cámaras de obra graban de forma continua, pero la revisión de seguridad se hace por muestreo y depende de la presencia del supervisor.',
          en: 'Site cameras record continuously, but safety review is done by sampling and depends on the supervisor being present.',
        },
        built: {
          es: 'Modelos de visión por computador con YOLO y ByteTrack que detectan personas, siguen su trayectoria y marcan cuándo falta el equipo de protección. Los mismos modelos cuentan tráfico vehicular.',
          en: 'Computer vision models with YOLO and ByteTrack that detect people, track their path and flag missing protective gear. The same models count vehicle traffic.',
        },
        how: [
          { es: 'Detección cuadro a cuadro.', en: 'Frame-by-frame detection.' },
          { es: 'Seguimiento de cada persona en el tiempo.', en: 'Each person tracked over time.' },
          { es: 'Alerta cuando falta el casco o el chaleco.', en: 'Alert when a helmet or vest is missing.' },
        ],
        stack: 'Python, YOLO, ByteTrack, OpenCV',
      },
      {
        id: 'gemelo',
        drawing: 'twin',
        place: { es: 'CIAM, Uniandes', en: 'CIAM, Uniandes' },
        problem: { es: 'Llevar el modelo estructural a la obra sin software especializado.', en: 'Bringing the structural model to site without specialised software.' },
        context: {
          es: 'En obra se trabaja con planos impresos mientras el modelo tridimensional permanece en ETABS, lo que dificulta la comunicación con personal no técnico.',
          en: 'Sites work from printed drawings while the 3D model stays in ETABS, which makes communication with non-technical staff difficult.',
        },
        built: {
          es: 'ciamAR: visualización de los modelos del laboratorio en realidad aumentada a escala 1:1, desde el navegador del teléfono y sin instalación.',
          en: 'ciamAR: the lab’s models in augmented reality at 1:1 scale, from the phone’s browser with nothing to install. You can rotate, inspect and project them on site.',
        },
        how: [
          { es: 'Modelos optimizados en GLB con compresión Draco.', en: 'Models optimised as GLB with Draco compression.' },
          { es: 'WebXR en Android e iOS.', en: 'WebXR on Android and iOS.' },
          { es: 'Incluye la casa de mampostería confinada de la mesa vibratoria del CIAM.', en: 'Includes the confined-masonry house from CIAM’s shake table.' },
        ],
        media: {
          kind: 'image',
          src: '/media/ciamar.webp',
          alt: { es: 'ciamAR mostrando el puente San Pedro en 3D', en: 'ciamAR showing the San Pedro bridge in 3D' },
          caption: { es: 'ciamAR en el navegador: girar, inspeccionar y abrir en AR.', en: 'ciamAR in the browser: rotate, inspect and open in AR.' },
        },
        stack: 'WebXR, model-viewer, Three.js',
        link: { href: 'https://ciam-ar.vercel.app', label: { es: 'Abrir ciamAR', en: 'Open ciamAR' } },
      },
      {
        id: 'solar',
        drawing: 'solar',
        place: { es: 'Pailitas, Cesar', en: 'Pailitas, Cesar' },
        problem: { es: 'Reducción del costo energético de una instalación comercial.', en: 'Reducing the energy cost of a commercial facility.' },
        context: {
          es: 'El Cesar tiene alto recurso solar y tarifas elevadas; el beneficio depende de un dimensionamiento correcto y del registro del sistema ante la UPME.',
          en: 'Cesar has a strong solar resource and high tariffs; the benefit depends on correct sizing and registering the system with UPME.',
        },
        built: {
          es: 'A través de LGI se modeló un sistema fotovoltaico de más de 30 kW con equipos Growatt y JA Solar, y se preparó el expediente técnico para su radicación ante la UPME.',
          en: 'Through LGI, a 30+ kW photovoltaic system was modelled with Growatt and JA Solar equipment, and the technical file was prepared for registration with UPME.',
        },
        how: [
          { es: 'Consumo real y recurso solar del sitio.', en: 'Real consumption and on-site solar resource.' },
          { es: 'Dimensionamiento de paneles e inversor.', en: 'Panel and inverter sizing.' },
          { es: 'Expediente técnico ante la UPME.', en: 'Technical filing with UPME.' },
        ],
        stats: [{ value: 30, suffix: '+ kW', label: { es: 'instalados', en: 'installed' } }],
        stack: 'Modelación energética, Growatt, JA Solar',
        link: { href: '/solar', label: { es: 'Ver LGI Solar', en: 'See LGI Solar' } },
      },
    ],
  },
  {
    id: 'ciudad',
    title: { es: 'Ciudad', en: 'City' },
    intro: {
      es: 'Integración de datos abiertos de Bogotá para análisis urbano y de movilidad.',
      en: 'Integrating Bogotá’s open data for urban and mobility analysis.',
    },
    cases: [
      {
        id: 'bogota3d',
        drawing: 'city',
        place: { es: 'Bogotá, datos abiertos', en: 'Bogotá, open data' },
        problem: { es: 'Integrar catastro, terreno, arbolado, acueducto y transporte en un solo modelo de ciudad.', en: 'Integrating cadastre, terrain, trees, water network and transit into one city model.' },
        context: {
          es: 'La información de la ciudad está distribuida en portales independientes y no existe una vista tridimensional que integre redes, edificaciones y movilidad.',
          en: 'To understand a neighbourhood you have to open five different portals and cross them by hand. None shows the city as it is: in 3D, with what lies beneath and what moves on top.',
        },
        built: {
          es: 'Bogotá 3D: la ciudad entera en el navegador, construida desde datos abiertos. Edificios del catastro sobre el terreno, red de acueducto bajo las calles, aviones en vivo, buses en sus rutas y sol real según la hora. Las fachadas se leen de fotos de calle con IA.',
          en: 'Bogotá 3D: the whole city in the browser, built from open data. Cadastre buildings on real terrain, the water network under the streets, live aircraft, buses on their routes and a real sun for the time of day. Facades are read from street photos with AI.',
        },
        how: [
          { es: 'Pipeline en Python que descarga, compila y parte la ciudad en teselas.', en: 'Python pipeline that downloads, compiles and tiles the city.' },
          { es: 'Render propio en WebGL y WebGPU con Three.js.', en: 'Custom WebGL and WebGPU rendering with Three.js.' },
          { es: 'Segmentación y profundidad sobre fotos de Mapillary para las fachadas.', en: 'Segmentation and depth on Mapillary photos for facades.' },
        ],
        stats: [
          { value: 1.77, decimals: 2, suffix: ' M', label: { es: 'edificaciones', en: 'buildings' } },
          { value: 1.47, decimals: 2, suffix: ' M', label: { es: 'árboles del censo', en: 'census trees' } },
          { value: 291938, label: { es: 'tramos de acueducto', en: 'water pipe segments' } },
          { value: 922, label: { es: 'rutas de transporte', en: 'transit routes' } },
        ],
        media: {
          kind: 'video',
          src: '/media/bogota-3d.mp4',
          poster: '/media/bogota-3d.jpg',
          alt: { es: 'Vuelo sobre Bogotá 3D con aviones en vivo', en: 'Fly-through of Bogotá 3D with live aircraft' },
          caption: { es: 'Vuelo sobre la ciudad con aviones en tiempo real.', en: 'Fly-through with real-time aircraft.' },
        },
        stack: 'Three.js, WebGPU, Python, SegFormer, Depth Anything',
      },
      {
        id: 'buses',
        drawing: 'transit',
        place: { es: 'Bogotá, Metro Línea 1 y Av. 68', en: 'Bogotá, Metro Line 1 and Av. 68' },
        problem: { es: 'Impacto de la Línea 1 del Metro sobre las rutas del SITP.', en: 'Impact of Metro Line 1 on SITP bus routes.' },
        context: {
          es: 'Las obras del Metro y de la Avenida 68 modifican la operación de cientos de rutas del SITP que se superponen con el trazado.',
          en: 'Metro and Avenida 68 works change the operation of hundreds of SITP routes that overlap the alignment.',
        },
        built: {
          es: 'Un mapa del sistema de transporte con buses programados, GPS real y validaciones de TuLlave, la encuesta de movilidad 2023 y un panel para rediseñar las rutas afectadas.',
          en: 'A transit-system map with scheduled buses, real GPS and TuLlave fare validations, the 2023 mobility survey, and a panel to redesign the affected routes.',
        },
        how: [
          { es: 'GTFS y validaciones procesadas con DuckDB.', en: 'GTFS and fare data processed with DuckDB.' },
          { es: 'Rutas afectadas cruzadas con el trazado del metro.', en: 'Affected routes crossed with the metro alignment.' },
          { es: 'Propuestas de rediseño revisadas una a una.', en: 'Redesign proposals reviewed one by one.' },
        ],
        stats: [
          { value: 693, label: { es: 'rutas analizadas', en: 'routes analysed' } },
          { value: 389, label: { es: 'rutas SITP afectadas', en: 'affected SITP routes' } },
          { value: 231, label: { es: 'propuestas de rediseño', en: 'redesign proposals' } },
          { value: 9446, label: { es: 'buses en el pico (18:15)', en: 'buses at peak (18:15)' } },
        ],
        media: {
          kind: 'image',
          src: '/media/bogota-buses.webp',
          alt: { es: 'Mapa de buses de Bogotá con indicadores del sistema', en: 'Bogotá bus map with system indicators' },
          caption: { es: 'Buses en ruta, rutas en servicio y curva del día.', en: 'Buses running, routes in service and the daily curve.' },
        },
        stack: 'MapLibre, DuckDB, Python, GTFS',
      },
    ],
  },
  {
    id: 'territorio',
    title: { es: 'Territorio', en: 'Territory' },
    intro: {
      es: 'Seguimiento ambiental con imágenes satelitales y contratación pública.',
      en: 'Environmental monitoring with satellite imagery and public procurement data.',
    },
    cases: [
      {
        id: 'corpocesar',
        drawing: 'river',
        place: { es: 'Cesar y el país, investigación independiente', en: 'Cesar and nationwide, independent research' },
        problem: { es: 'Correspondencia entre la inversión ambiental y el daño medido en el territorio.', en: 'Matching environmental spending with measured damage on the ground.' },
        context: {
          es: 'Las corporaciones autónomas regionales suscriben miles de contratos al año, pero su ubicación rara vez se compara con indicadores medibles de daño ambiental.',
          en: 'Regional environmental agencies sign thousands of contracts a year, but their location is rarely compared with measurable indicators of environmental damage.',
        },
        built: {
          es: 'Cruce de los contratos públicos de Corpocesar con imágenes satelitales: pérdida de bosque, minería a cielo abierto clasificada con Sentinel-2, inundaciones con radar y un modelo propio de zonas inundables. El método se extendió a las corporaciones de todo el país.',
          en: 'Corpocesar’s public contracts were crossed with satellite imagery: forest loss, open-pit mining classified with Sentinel-2, radar-derived flooding and a custom flood-zone model. The method was extended to agencies nationwide.',
        },
        how: [
          { es: 'Contratos de SECOP en PostGIS.', en: 'SECOP contracts in PostGIS.' },
          { es: 'Sentinel-1, Sentinel-2 y Hansen para medir el daño.', en: 'Sentinel-1, Sentinel-2 and Hansen to measure damage.' },
          { es: 'Modelo HAND de zonas inundables, validado con eventos del IDEAM.', en: 'HAND flood-zone model, validated against IDEAM events.' },
        ],
        stats: [
          { value: 531, label: { es: 'contratos activos revisados', en: 'active contracts reviewed' } },
          { value: 104539, suffix: ' ha', label: { es: 'de huella minera en el Cesar', en: 'of mining footprint in Cesar' } },
          { value: 31343, label: { es: 'contratos de 25 corporaciones', en: 'contracts from 25 agencies' } },
          { value: 1108, label: { es: 'municipios con modelo de inundación', en: 'municipalities with flood model' } },
        ],
        media: {
          kind: 'compare',
          src: '/media/valledupar-2025.webp',
          before: { src: '/media/valledupar-2018.webp', label: { es: '2018', en: '2018' } },
          after: { src: '/media/valledupar-2025.webp', label: { es: '2025', en: '2025' } },
          alt: { es: 'Imagen Sentinel-2 de Valledupar y el río Guatapurí en 2018 y 2025', en: 'Sentinel-2 image of Valledupar and the Guatapurí river in 2018 and 2025' },
          caption: { es: 'Valledupar y el río Guatapurí, Sentinel-2. Arrastra para comparar 2018 y 2025.', en: 'Valledupar and the Guatapurí river, Sentinel-2. Drag to compare 2018 and 2025.' },
        },
        stack: 'PostGIS, Python, Sentinel-1/2, Copernicus GLO-30',
        link: { href: 'https://corpocesar.vercel.app', label: { es: 'Abrir el estudio de Corpocesar', en: 'Open the Corpocesar study' } },
      },
    ],
  },
  {
    id: 'futuro',
    title: { es: 'Robótica', en: 'Robotics' },
    intro: {
      es: 'Robots humanoides para inspección de edificaciones, entrenados en simulación.',
      en: 'Humanoid robots for building inspection, trained in simulation.',
    },
    cases: [
      {
        id: 'robot',
        drawing: 'robot',
        place: { es: 'Universidad de los Andes, 2026', en: 'Universidad de los Andes, 2026' },
        problem: { es: 'Inspección robótica de edificaciones en espacios de riesgo.', en: 'Robotic building inspection in hazardous spaces.' },
        context: {
          es: 'Un robot humanoide no puede entrenarse por ensayo y error en el mundo real sin riesgo para el equipo. El entrenamiento debe hacerse en simulación, en un entorno que reproduzca el edificio real.',
          en: 'A humanoid robot cannot be trained by trial and error in the real world without risking the hardware. Training has to happen in simulation, in an environment that reproduces the real building.',
        },
        built: {
          es: 'Entrenamiento del humanoide Unitree G1 con aprendizaje por refuerzo en Isaac Lab: marcha, giro, carrera, escaleras, recuperación tras caídas y resistencia a empujones. Los ensayos se ejecutan en una oficina fotorrealista con cámara RGB, profundidad y LiDAR, y el mismo controlador opera la simulación y el robot físico.',
          en: 'Training the Unitree G1 humanoid with reinforcement learning in Isaac Lab: walking, turning, running, stairs, fall recovery and push resistance. Tests run in a photorealistic office with RGB, depth and LiDAR sensing, and the same controller drives both the simulation and the physical robot.',
        },
        how: [
          { es: 'Entrenamiento masivo en paralelo en GPU (4.096 entornos).', en: 'Massively parallel GPU training (4,096 environments).' },
          { es: 'Ensayos en oficina simulada con RGB, profundidad y LiDAR MID-360.', en: 'Tests in a simulated office with RGB, depth and MID-360 LiDAR.' },
          { es: 'Controlador único para simulación y robot físico vía DDS.', en: 'Single controller for simulation and physical robot over DDS.' },
        ],
        stats: [
          { value: 2.5, decimals: 1, suffix: ' m/s', label: { es: 'velocidad de carrera', en: 'running speed' } },
          { value: 15, suffix: ' cm', label: { es: 'altura de escalón superada', en: 'step height handled' } },
          { value: 0.6, decimals: 1, suffix: ' m/s', label: { es: 'empujón lateral resistido', en: 'lateral push withstood' } },
          { value: 4096, label: { es: 'entornos de entrenamiento en paralelo', en: 'parallel training environments' } },
        ],
        media: {
          kind: 'video',
          src: '/media/bg/g1-lobby.mp4',
          poster: '/media/bg/g1-lobby.jpg',
          alt: { es: 'Robot humanoide G1 caminando en una oficina simulada', en: 'G1 humanoid robot walking in a simulated office' },
          caption: { es: 'Unitree G1 en Isaac Sim, oficina fotorrealista. Políticas propias sobre la base de código de Unitree.', en: 'Unitree G1 in Isaac Sim, photorealistic office. Custom policies built on Unitree’s base code.' },
        },
        stack: 'Isaac Lab, PyTorch, ROS 2 / DDS, LiDAR',
      },
    ],
  },
];

export const path = [
  { year: '2022', es: 'Sistema de telemetría IoT para tanques de combustible con ESP32.', en: 'IoT telemetry system for fuel tanks with ESP32.' },
  { year: '2022', es: 'Inicio de Ingeniería Civil en la Universidad de los Andes.', en: 'Began Civil Engineering at Universidad de los Andes.' },
  { year: '2024', es: 'Inicio de Ingeniería de Sistemas y Computación (doble programa).', en: 'Began Systems and Computing Engineering (double degree).' },
  { year: '2026', es: 'Asistente de investigación en CIAM Lab y monitor del curso de herramientas de IA.', en: 'Research assistant at CIAM Lab and teaching assistant for the AI tools course.' },
  { year: '2026', es: 'Grado en Ingeniería Civil y fundación de LGI, firma de consultoría.', en: 'B.Sc. in Civil Engineering and founding of LGI, a consulting firm.' },
  { year: 'Hoy', yearEn: 'Now', es: 'Maestría en Ingeniería Civil (IA y analítica para infraestructura) e investigador en el Laboratorio SinergIA.', en: 'M.Sc. in Civil Engineering (AI and analytics for infrastructure) and researcher at SinergIA Lab.' },
] as { year: string; yearEn?: string; es: string; en: string }[];

export const tools = {
  civil: ['ETABS y SAP2000', 'Revit y BIM', 'NSR-10 y FEMA 154', 'Laboratorio de suelos', 'Hidráulica e hidrología', 'Energía solar y UPME'],
  systems: ['Python y PyTorch', 'React y TypeScript', 'C++ y ESP32', 'PostGIS, MapLibre y GIS', 'Three.js y WebGPU', 'YOLO, Isaac Lab y LLMs locales'],
};

export const more = [
  { name: 'CIAM Lab', what: { es: 'Portal y gemelos digitales del laboratorio.', en: 'Lab portal and digital twins.' }, href: 'https://ciam-lab.vercel.app' },
  { name: 'SinergIA', what: { es: 'Laboratorio de IA para ciudades e infraestructura, Uniandes.', en: 'AI lab for cities and infrastructure, Uniandes.' }, href: 'https://sinergia-kappa.vercel.app' },
  { name: 'Roble Caribe Analytics', what: { es: 'Ventas e inventario de tanques por hora.', en: 'Hourly sales and tank inventory.' }, href: 'https://eds-roble-caribe.vercel.app' },
  { name: 'Lenguajes y máquinas', what: { es: 'Simulador de autómatas y gramáticas formales.', en: 'Automata and formal grammar simulator.' }, href: 'https://lenguajes-y-maquinas.vercel.app' },
];
