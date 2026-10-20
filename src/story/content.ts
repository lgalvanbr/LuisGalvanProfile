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
    lede: 'Los problemas de la infraestructura son físicos: un tanque que gotea, una casa que se agrieta, una obra que nadie alcanza a revisar. Yo los mido y escribo el software que los resuelve.',
    ctaCases: 'Ver los casos',
    ctaContact: 'Escribirme',
    layerPhysical: 'Capa física',
    layerDigital: 'Capa digital',
    layerHint: 'Cada caso tiene dos capas: el problema en la obra y el sistema que le puse encima.',
    methodTitle: 'Cómo trabajo',
    method: [
      { t: 'Ir a ver el problema', d: 'En la obra, en el laboratorio o en el tanque. Antes de escribir código hay que entender qué falla y a quién le importa.' },
      { t: 'Medirlo', d: 'Sensores, fotos, cámaras, datos abiertos. Si no se mide, se discute por opinión.' },
      { t: 'Modelarlo', d: 'Con la ingeniería de siempre (NSR-10, análisis estructural, hidráulica) y con modelos de IA cuando suman.' },
      { t: 'Entregar una herramienta', d: 'Una app que alguien usa el lunes por la mañana, no un informe que se archiva.' },
    ],
    problem: 'El problema',
    built: 'Lo que construí',
    how: 'Cómo funciona',
    open: 'Abrir la app',
    caseOf: 'Caso',
    pathTitle: 'Trayectoria',
    pathIntro: 'Empecé enterrando sensores y terminé enseñando a robots a caminar. En el medio, dos carreras y un laboratorio.',
    photoCaption: 'Muestra SB Sec4 a 35 kPa, laboratorio de suelos de la Universidad de los Andes.',
    toolsTitle: 'Herramientas',
    toolsCivil: 'Lado civil',
    toolsSystems: 'Lado sistemas',
    moreTitle: 'Más proyectos',
    lgiTitle: 'LGI',
    lgiBody: 'LGI es la firma desde la que hago consultoría. Cada línea tiene su página.',
    lgiLinks: [
      { href: '/lgi', label: 'Ingeniería, gemelos digitales e IoT' },
      { href: '/ia', label: 'IA y automatización' },
      { href: '/solar', label: 'Energía solar' },
    ],
    endTitle: '¿Tienes un problema así?',
    endBody: 'Una estructura que vigilar, una obra que medir, datos de ciudad que nadie ha cruzado. Cuéntame qué está fallando y lo miramos juntos.',
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
    lede: 'Infrastructure problems are physical: a leaking tank, a cracked house, a construction site nobody has time to check. I measure them and write the software that solves them.',
    ctaCases: 'See the cases',
    ctaContact: 'Write to me',
    layerPhysical: 'Physical layer',
    layerDigital: 'Digital layer',
    layerHint: 'Every case has two layers: the problem on site and the system I built on top of it.',
    methodTitle: 'How I work',
    method: [
      { t: 'Go and see the problem', d: 'On site, in the lab or at the tank. Before writing code you need to know what fails and who cares.' },
      { t: 'Measure it', d: 'Sensors, photos, cameras, open data. If it is not measured, it is argued by opinion.' },
      { t: 'Model it', d: 'With classic engineering (building codes, structural analysis, hydraulics) and with AI models when they help.' },
      { t: 'Ship a tool', d: 'An app someone uses on Monday morning, not a report that gets filed away.' },
    ],
    problem: 'The problem',
    built: 'What I built',
    how: 'How it works',
    open: 'Open the app',
    caseOf: 'Case',
    pathTitle: 'Path',
    pathIntro: 'I started by burying sensors and ended up teaching robots to walk. In between, two degrees and a lab.',
    photoCaption: 'Sample SB Sec4 at 35 kPa, soils lab at Universidad de los Andes.',
    toolsTitle: 'Tools',
    toolsCivil: 'Civil side',
    toolsSystems: 'Systems side',
    moreTitle: 'More projects',
    lgiTitle: 'LGI',
    lgiBody: 'LGI is the firm I consult through. Each line has its own page.',
    lgiLinks: [
      { href: '/lgi', label: 'Engineering, digital twins and IoT' },
      { href: '/ia', label: 'AI and automation' },
      { href: '/solar', label: 'Solar energy' },
    ],
    endTitle: 'Got a problem like these?',
    endBody: 'A structure to watch, a site to measure, city data nobody has crossed yet. Tell me what is failing and we will look at it together.',
    contactWhatsapp: 'WhatsApp',
    footer: 'Designed and built by Luis Carlos Galvan.',
    sim: 'Simulation',
  },
};

export const chapters: Chapter[] = [
  {
    id: 'oculto',
    title: { es: 'Lo que no se ve', en: 'What nobody sees' },
    intro: {
      es: 'Las fallas más caras empiezan donde nadie mira: bajo tierra o detrás de una grieta.',
      en: 'The most expensive failures start where nobody looks: underground or behind a crack.',
    },
    cases: [
      {
        id: 'tanque',
        drawing: 'tank',
        place: { es: 'Estación de combustible, 2022', en: 'Fuel station, 2022' },
        problem: { es: '¿Cuánto combustible hay en el tanque, y se está perdiendo?', en: 'How much fuel is in the tank, and is it leaking?' },
        context: {
          es: 'Los tanques están enterrados bajo la losa. La medición era una varilla, una vez al día, anotada a mano. Una fuga se notaba semanas después, en la contabilidad.',
          en: 'The tanks sit under the slab. Measurement was a dipstick, once a day, written by hand. A leak showed up weeks later, in the books.',
        },
        built: {
          es: 'Un sistema de telemetría: sensores de presión hidrostática en el fondo del tanque, un ESP32 programado en C++ y una base de datos que avisa cuando el nivel baja sin una venta que lo explique.',
          en: 'A telemetry system: hydrostatic pressure sensors at the bottom of the tank, an ESP32 programmed in C++ and a database that flags when the level drops without a sale to explain it.',
        },
        how: [
          { es: 'La presión en el fondo da la altura del líquido.', en: 'Pressure at the bottom gives the liquid height.' },
          { es: 'El ESP32 la lee y la envía por WiFi.', en: 'The ESP32 reads it and sends it over WiFi.' },
          { es: 'Se cruza con las ventas para detectar pérdidas.', en: 'It is matched against sales to detect losses.' },
        ],
        stack: 'ESP32, C++, MQTT, SQL',
        note: {
          es: 'Cuatro años después volví a una estación de servicio, esta vez con analítica de ventas e inventario por hora (Roble Caribe).',
          en: 'Four years later I was back at a fuel station, this time with hourly sales and inventory analytics (Roble Caribe).',
        },
        link: { href: 'https://eds-roble-caribe.vercel.app', label: { es: 'Ver Roble Caribe Analytics', en: 'See Roble Caribe Analytics' } },
      },
      {
        id: 'sismo',
        drawing: 'quake',
        place: { es: 'Después del sismo del 10 de agosto', en: 'After the August 10 earthquake' },
        problem: { es: '¿Se puede dormir en esta casa esta noche?', en: 'Can people sleep in this house tonight?' },
        context: {
          es: 'Después de un sismo cientos de familias tienen la misma pregunta y hay pocos ingenieros para responderla. Los formatos de inspección existen, pero en papel son lentos y no dicen a qué casa ir primero.',
          en: 'After an earthquake hundreds of families ask the same question and there are few engineers to answer it. Inspection forms exist, but on paper they are slow and do not say which house to visit first.',
        },
        built: {
          es: 'InspectorEstructural: la familia reporta su vivienda y sube fotos de las grietas; un ingeniero de Uniandes revisa la evidencia con criterios de la NSR-10 y el FEMA 154, y cada caso queda en un mapa por prioridad.',
          en: 'InspectorEstructural: the family reports their home and uploads photos of the cracks; a Uniandes engineer reviews the evidence against NSR-10 and FEMA 154 criteria, and every case lands on a map by priority.',
        },
        how: [
          { es: 'Reporte con ubicación, pisos y síntomas.', en: 'Report with location, floors and symptoms.' },
          { es: 'Fotos comprimidas para que suban con mala señal.', en: 'Photos compressed so they upload on a weak signal.' },
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
    title: { es: 'La obra', en: 'The construction site' },
    intro: {
      es: 'En obra la información existe, pero vive en papel, en fotos sueltas y en la memoria del residente.',
      en: 'On site the information exists, but it lives on paper, in loose photos and in the site engineer’s memory.',
    },
    cases: [
      {
        id: 'vision',
        drawing: 'vision',
        place: { es: 'CIAM Lab, Uniandes, 2026', en: 'CIAM Lab, Uniandes, 2026' },
        problem: { es: '¿Quién está trabajando sin casco en este momento?', en: 'Who is working without a helmet right now?' },
        context: {
          es: 'Un frente de obra activo tiene una cámara fija que graba todo el día y nadie mira. La seguridad se revisa por muestreo, cuando alguien pasa.',
          en: 'An active construction front has a fixed camera recording all day that nobody watches. Safety is checked by sampling, when someone walks by.',
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
        problem: { es: 'El modelo estructural se queda en el computador de la oficina.', en: 'The structural model stays on the office computer.' },
        context: {
          es: 'En obra se discute sobre planos impresos mientras el modelo 3D completo está en ETABS, en otra parte. Quien no sabe leer planos no ve nada.',
          en: 'On site people argue over printed drawings while the full 3D model sits in ETABS somewhere else. Anyone who cannot read drawings sees nothing.',
        },
        built: {
          es: 'ciamAR: los modelos del laboratorio en realidad aumentada, a escala 1:1, desde el navegador del teléfono y sin instalar nada. Se puede girar, inspeccionar y proyectar en el sitio.',
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
        problem: { es: 'La factura de energía se come el margen del negocio.', en: 'The power bill eats the business’s margin.' },
        context: {
          es: 'En el Cesar el sol sobra y la energía es cara. Pero un sistema fotovoltaico mal dimensionado o sin papeles ante la UPME no sirve.',
          en: 'In Cesar sun is plentiful and power is expensive. But a badly sized solar system, or one without UPME paperwork, does not help.',
        },
        built: {
          es: 'Con LGI modelé un sistema solar de más de 30 kW con equipos Growatt y JA Solar, y armé el expediente técnico completo para radicarlo ante la UPME.',
          en: 'With LGI I modelled a 30+ kW solar system with Growatt and JA Solar equipment, and put together the full technical file to register it with UPME.',
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
    title: { es: 'La ciudad', en: 'The city' },
    intro: {
      es: 'Bogotá tiene datos abiertos de casi todo. El problema es que nadie los ha puesto en el mismo lugar.',
      en: 'Bogotá has open data on almost everything. The problem is that nobody has put it in one place.',
    },
    cases: [
      {
        id: 'bogota3d',
        drawing: 'city',
        place: { es: 'Bogotá, datos abiertos', en: 'Bogotá, open data' },
        problem: { es: 'Catastro, terreno, árboles, acueducto y transporte. Cada uno en su propio portal.', en: 'Cadastre, terrain, trees, water network and transit. Each in its own portal.' },
        context: {
          es: 'Para entender un barrio hay que abrir cinco portales distintos y cruzarlos a mano. Ninguno muestra la ciudad como es: en 3D, con lo que hay debajo y lo que se mueve encima.',
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
        problem: { es: 'Llega el metro. ¿Qué pasa con las rutas de bus que hoy van por ahí?', en: 'The metro is coming. What happens to the bus routes that run there today?' },
        context: {
          es: 'Las obras del Metro y de la Avenida 68 cambian por dónde puede pasar un bus. Cientos de rutas del SITP se cruzan con el trazado, y la discusión se da sin ver los datos.',
          en: 'Metro and Avenida 68 works change where a bus can go. Hundreds of SITP routes cross the alignment, and the debate happens without looking at the data.',
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
    title: { es: 'El territorio', en: 'The territory' },
    intro: {
      es: 'Desde el espacio se ve lo que no aparece en los contratos: el bosque que se pierde, la mina que crece, el río que se sale.',
      en: 'From space you can see what contracts never mention: forest being lost, mines growing, rivers overflowing.',
    },
    cases: [
      {
        id: 'corpocesar',
        drawing: 'river',
        place: { es: 'Cesar y el país, investigación independiente', en: 'Cesar and nationwide, independent research' },
        problem: { es: '¿El dinero ambiental se está gastando donde está el daño?', en: 'Is environmental money being spent where the damage is?' },
        context: {
          es: 'Las corporaciones autónomas regionales firman miles de contratos al año. El daño ambiental, en cambio, se mide en hectáreas y casi nunca se pone al lado de esos contratos.',
          en: 'Regional environmental agencies sign thousands of contracts a year. Environmental damage is measured in hectares, and almost never set next to those contracts.',
        },
        built: {
          es: 'Crucé los contratos públicos de Corpocesar con imagen satelital: pérdida de bosque, minería a cielo abierto clasificada con Sentinel-2, inundaciones con radar y un modelo propio de zonas inundables. Luego llevé el mismo método a las corporaciones de todo el país.',
          en: 'I crossed Corpocesar’s public contracts with satellite imagery: forest loss, open-pit mining classified with Sentinel-2, flooding from radar, and my own flood-zone model. Then I took the same method to agencies across the country.',
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
    title: { es: 'Lo que viene', en: 'What comes next' },
    intro: {
      es: 'Hay lugares a los que una persona no debería entrar a inspeccionar. Ahí estoy trabajando ahora.',
      en: 'Some places a person should not walk into to inspect. That is what I am working on now.',
    },
    cases: [
      {
        id: 'robot',
        drawing: 'robot',
        place: { es: 'Laboratorio, Uniandes, 2026', en: 'Lab, Uniandes, 2026' },
        problem: { es: '¿Puede un robot recorrer un edificio y tomar las fotos de la inspección?', en: 'Can a robot walk a building and take the inspection photos?' },
        context: {
          es: 'Un humanoide no se puede entrenar a prueba y error en el mundo real: cada caída cuesta. Primero tiene que aprender en simulación, dentro de una copia del lugar.',
          en: 'A humanoid cannot be trained by trial and error in the real world: every fall is costly. It first has to learn in simulation, inside a copy of the place.',
        },
        built: {
          es: 'Entreno al humanoide Unitree G1 con aprendizaje por refuerzo en Isaac Lab: caminar, girar, correr y moverse en terreno irregular. Escaneé el laboratorio con LiDAR y el robot planea una ruta de inspección por dentro, esquiva obstáculos y toma fotos RGB-D. El mismo controlador mueve la simulación y el robot real.',
          en: 'I train the Unitree G1 humanoid with reinforcement learning in Isaac Lab: walking, turning, running and rough terrain. I scanned the lab with LiDAR and the robot plans an inspection route inside it, avoids obstacles and takes RGB-D photos. The same controller drives the simulation and the real robot.',
        },
        how: [
          { es: 'Miles de robots entrenando en paralelo en GPU.', en: 'Thousands of robots training in parallel on GPU.' },
          { es: 'Laboratorio escaneado con LiDAR como escenario.', en: 'LiDAR-scanned lab as the scene.' },
          { es: 'Misión de inspección autónoma con fotos.', en: 'Autonomous inspection mission with photos.' },
        ],
        stats: [
          { value: 2.5, decimals: 1, suffix: ' m/s', label: { es: 'velocidad corriendo', en: 'running speed' } },
          { value: 4096, label: { es: 'entornos en paralelo', en: 'parallel environments' } },
          { value: 0, label: { es: 'caídas en 3 pruebas de carrera', en: 'falls in 3 running tests' } },
        ],
        media: {
          kind: 'video',
          src: '/media/g1-correr.mp4',
          poster: '/media/g1-correr.jpg',
          alt: { es: 'Robot humanoide G1 corriendo en simulación', en: 'G1 humanoid robot running in simulation' },
          caption: { es: 'Simulación en Isaac Sim. Política de carrera a 2,5 m/s, sobre código base de Unitree.', en: 'Isaac Sim simulation. Running policy at 2.5 m/s, built on Unitree’s base code.' },
        },
        stack: 'Isaac Lab, PyTorch, ROS 2 / DDS, LiDAR',
      },
    ],
  },
];

export const path = [
  { year: '2022', es: 'Primer sistema IoT: sensores en tanques de combustible con ESP32.', en: 'First IoT system: fuel-tank sensors with ESP32.' },
  { year: '2022', es: 'Entro a Ingeniería Civil en la Universidad de los Andes.', en: 'Start Civil Engineering at Universidad de los Andes.' },
  { year: '2024', es: 'Empiezo Ingeniería de Sistemas: quiero que los cálculos se vuelvan herramientas.', en: 'Start Systems Engineering: I want calculations to become tools.' },
  { year: '2026', es: 'CIAM Lab: visión por computador, gemelos digitales y monitor del curso de IA.', en: 'CIAM Lab: computer vision, digital twins and AI course TA.' },
  { year: '2026', es: 'Me gradúo de Ingeniería Civil y fundo LGI.', en: 'Graduate in Civil Engineering and found LGI.' },
  { year: 'Hoy', yearEn: 'Now', es: 'Maestría en Ingeniería Civil con énfasis en IA para infraestructura, y robótica en el laboratorio.', en: 'M.Sc. in Civil Engineering focused on AI for infrastructure, and robotics in the lab.' },
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
