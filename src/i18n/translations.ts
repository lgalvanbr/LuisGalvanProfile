export type Language = 'es' | 'en';

export const translations = {
  es: {
    nav: {
      about: 'Sobre Mí',
      projects: 'Soluciones',
      skills: 'Stack',
      ecosystem: 'Ecosistema LGI',
      aiLanding: 'LGI AI & Automatización',
      study: 'Estudio',
      contact: 'Contacto'
    },
    study: {
      title: 'Estudio Técnico',
      subtitle: 'Material interactivo de consulta sobre Infraestructura de Comunicaciones, Redes y Sistemas Distribuidos. 45 preguntas organizadas por tema con respuestas expandibles.'
    },
    hero: {
      greeting: 'Hola, soy',
      name: 'Luis Carlos Galvan',
      tagline: 'LCG — Consultor Principal & Arquitecto de Sistemas Físico-Digitales',
      role: 'Ingeniero Civil & de Sistemas · Investigador IA',
      roleSubtitle: 'Especialista en IA Aplicada, Gemelos Digitales & Telemetría IoT',
      subtitle: 'Cerramos la brecha entre la física estructural y la inteligencia computacional. Diseño y pongo en producción gemelos digitales en 3D, redes de telemetría IoT de alta disponibilidad y agentes de IA autónomos para empresas que exigen cero tolerancia al fallo.',
      viewProjects: 'Ver Casos de Éxito',
      viewCv: 'Ficha Ejecutiva (CV)',
      contactMe: 'Iniciar Conversación',
      doubleDegree: 'Doble Titulación - Universidad de los Andes'
    },
    about: {
      title: 'La Ventaja Híbrida',
      badge: 'Perfil & Trayectoria',
      p1_1: 'La mayoría de empresas se ven obligadas a elegir entre ingenieros civiles tradicionales o desarrolladores de software que desconocen el mundo físico. Mi propuesta de valor radica en operar con maestría ',
      p1_2: 'en la intersección exacta de ambos mundos.',
      p1_3: ' Integro desde el análisis estático y dinámico en ETABS hasta el diseño de firmwares embebidos en C++ para telemetría en tiempo real sobre hardware industrial.',
      p2_1: 'Como ',
      p2_2: 'Fundador y Director de LGI',
      p2_3: ', lidero un ecosistema enfocado en generar valor medible: construyendo Gemelos Digitales, automatizando operaciones empresariales con agentes de IA y diseñando plantas fotovoltaicas de alto rendimiento. Además, soy ',
      p2_4: 'Investigador de Posgrado',
      p2_5: ' en IA y Visión Artificial aplicada a infraestructuras críticas (incluyendo investigación vinculada al Metro de Bogotá y grupos INGECO / CIIA en la Universidad de los Andes).',
      p3: 'El resultado para su organización: una contraparte técnica unificada capaz de auditar un problema complejo, diseñar su arquitectura digital completa y ponerla en producción sin capas intermedias.',
      stack: 'Capacidades Operativas',
      status: 'Consultor Independiente & Fundador'
    },
    ecosystem: {
      title: 'Ecosistema LGI',
      subtitle: 'Tres divisiones especializadas unidas por una misma visión de rigor técnico, datos en tiempo real y retorno de inversión.',
      units: {
        engineering: {
          tag: 'Infraestructura & Físico',
          title: 'LGI Ingeniería',
          desc: 'Gemelos digitales en Unity, monitoreo de salud estructural (SHM), telemetría IoT industrial y automatización BIM para proyectos que exigen cero tolerancia al fallo.',
          metrics: '99.9% Uptime Telemetría · Reducción de sobrecostos en obra'
        },
        aiLabs: {
          tag: 'Digitalización & IA',
          title: 'LGI AI & Automatización',
          desc: 'Agentes autónomos de IA, flujos de automatización con n8n/Make, asistentes inteligentes omnicanal para WhatsApp y modelos de visión artificial orientados a la rentabilidad.',
          metrics: '+60% de eficiencia operativa · Procesamiento 24/7 sin latencia'
        },
        solar: {
          tag: 'Energía & Sostenibilidad',
          title: 'LGI Solar',
          desc: 'Ingeniería, montaje y monitoreo en tiempo real de sistemas solares fotovoltaicos comerciales e industriales. Soberanía energética con retorno de inversión garantizado.',
          metrics: 'Hasta 70% de ahorro en tarifa eléctrica · Monitoreo continuo'
        },
        iot: {
          tag: 'Sensores & Telemetría',
          title: 'LGI IoT & Hardware',
          desc: 'Redes de sensores inalámbricos (acelerómetros triaxiales, inclinómetros, galgas extensométricas) para monitoreo de salud estructural (SHM), alerta sísmica y telemetría industrial en tiempo real.',
          metrics: 'Latencia <50ms · Detección temprana de fallas críticas'
        }
      }
    },
    projects: {
      title: 'Proyectos & Casos de Éxito',
      viewCode: 'Ver Código',
      liveDemo: 'Demo en Vivo',
      p1: {
        title: 'Gemelo Digital para Coordinación Constructiva',
        desc: 'Réplica virtual interactiva desarrollada en Unity e integrada con modelos BIM. Detección temprana de interferencias en espacio inmersivo y simulación multiagente para optimizar tiempos y costos de ejecución.',
        type: 'AEC Tech / Investigación INGECO'
      },
      p2: {
        title: 'Inteligencia Predictiva de Calidad Hídrica (ML)',
        desc: 'Pipeline completo de Machine Learning sobre 57 estaciones de monitoreo del Río Bogotá. Modelado de patrones no lineales para la emisión de alertas hidrológicas y toma de decisiones en infraestructura urbana.',
        type: 'Data Science / Investigación CIIA'
      },
      p3: {
        title: 'Telemetría IoT para Almacenamiento de Combustible',
        desc: 'Arquitectura industrial completa con microcontroladores ESP32 y sensores de presión. Transmisión continua de niveles de inventario por MQTT, eliminando inspecciones manuales y riesgos operativos.',
        type: 'Sistemas Embebidos / LGI Ingeniería'
      }
    },
    skills: {
      title: 'Stack Tecnológico & Dominios',
      s1: 'Análisis Estructural & Modelación BIM (ETABS, SAP2000, Revit)',
      s2: 'Telemetría IoT Industrial & Firmware C++ (ESP32, MQTT, FreeRTOS)',
      s3: 'Arquitectura de Software Full-Stack (React, TypeScript, Node, Python)',
      s4: 'Gemelos Digitales & Sistemas Inmersivos 3D (Unity, Three.js, WebGL)',
      s5: 'Inteligencia Artificial & Visión Computacional (PyTorch, YOLO, LLMs)',
      s6: 'Automatización de Procesos & Flujos Autónomos (n8n, Make, APIs REST)',
      cat1: 'Análisis Estructural & BIM (ETABS, SAP2000, Revit)',
      cat2: 'Telemetría & Sistemas IoT en Tiempo Real (ESP32, C++, MQTT)',
      cat3: 'Arquitectura de Software Full-Stack (React, TypeScript, Node, Python)',
      cat4: 'Sistemas Inmersivos & Gemelos Digitales (Unity, C#, Simulación)',
      cat5: 'Inteligencia Artificial & Automatización (PyTorch, LLMs, n8n, OpenCV)'
    },
    aiLanding: {
      badge: 'Soluciones Autónomas B2B',
      heroTitle: 'Multiplique la Capacidad Operativa de su Empresa sin Aumentar su Nómina',
      heroSubtitle: 'Diseñamos e implementamos agentes de Inteligencia Artificial a medida, automatizaciones de procesos n8n/Make y asistentes conversacionales que ejecutan tareas críticas 24/7 con precisión milimétrica.',
      ctaAudit: 'Agendar Auditoría de Procesos',
      ctaCases: 'Explorar Soluciones de IA',
      stats: {
        timeSaved: 'Hasta 40 hrs/semana',
        timeSavedDesc: 'Ahorradas en tareas repetitivas por colaborador',
        availability: '24/7/365',
        availabilityDesc: 'Atención y procesamiento continuo sin demoras',
        roi: '< 60 Días',
        roiDesc: 'Retorno de inversión promedio en automatización'
      },
      services: {
        title: 'Capacidades de IA Diseñadas para su Negocio',
        subtitle: 'Cero hype tecnológico. Solo sistemas probados que aumentan sus ventas y reducen costos operativos.',
        s1Title: 'Agentes Autónomos de Venta & WhatsApp',
        s1Desc: 'Chatbots con IA conectados a su CRM. Califican prospectos, responden dudas complejas de su catálogo, cotizan en tiempo real y agendan citas automáticamente.',
        s2Title: 'Automatización de Flujos (n8n & Make)',
        s2Desc: 'Integración fluida entre ERPs, hojas de cálculo, sistemas de facturación y correos. Erradicamos la duplicidad manual de datos en su organización.',
        s3Title: 'Visión Artificial & Extracción Documental',
        s3Desc: 'Extracción inteligente de información en planos, contratos y facturas mediante OCR avanzado y modelos visuales entrenados para la industria.',
        s4Title: 'Asistentes de Conocimiento Corporativo (RAG)',
        s4Desc: 'El cerebro de su empresa al alcance de todo su equipo. Preguntas y respuestas inmediatas basadas en sus manuales, normativas y políticas internas con total privacidad.'
      },
      process: {
        title: 'De Diagnóstico a Producción en 14 Días',
        subtitle: 'Un método estructurado que minimiza la fricción y asegura un impacto inmediato.',
        step1: '1. Diagnóstico de Fricción Operativa',
        step1Desc: 'Mapeamos sus flujos de trabajo actuales y cuantificamos el impacto económico de cada automatización antes de comenzar.',
        step2: '2. Arquitectura de Agentes & Guardrails',
        step2Desc: 'Diseño de la lógica, conexión de APIs e implementación de reglas de seguridad para evitar cualquier respuesta fuera de lugar.',
        step3: '3. Pruebas de Carga & Calibración',
        step3Desc: 'Validamos el comportamiento con datos reales y retroalimentación de su equipo en un entorno de pruebas seguro.',
        step4: '4. Lanzamiento & Supervisión en Vivo',
        step4Desc: 'Despliegue en canales de producción con monitoreo de rendimiento, analítica en vivo y soporte técnico garantizado.'
      },
      faq: {
        title: 'Preguntas Frecuentes',
        q1: '¿Cómo garantizan que la IA no entregue datos incorrectos a mis clientes?',
        a1: 'Utilizamos técnicas de generación aumentada por recuperación (RAG) con límites estrictos: el modelo solo responde basándose en los documentos y bases de datos que usted autorice. Si una consulta supera sus atribuciones, se transfiere de inmediato a un asesor humano.',
        q2: '¿Cuánto tiempo toma ver resultados en la operación?',
        a2: 'Nuestros primeros flujos automatizados entran en funcionamiento entre el día 10 y el día 14. Desde la primera semana de despliegue notará una reducción drástica en tiempos de respuesta y carga de trabajo manual.',
        q3: '¿Mis datos confidenciales estarán protegidos?',
        a3: 'Absolutamente. Empleamos arquitecturas empresariales con cifrado de grado bancario y modelos cerrados que no utilizan la información de su negocio para fines de entrenamiento público.'
      }
    },
    contact: {
      title: 'Iniciemos una Conversación Técnica',
      subtitle: '¿Tiene un desafío de infraestructura, desarrollo de gemelos digitales o automatización con IA? Conversemos sobre viabilidad, arquitectura y plazos.',
      location: 'Bogotá, Colombia (Alcance Global)',
      name: 'Nombre y Cargo',
      email: 'Correo Electrónico Corporativo',
      serviceInterest: 'Área de Interés',
      message: 'Detalles del Proyecto o Desafío',
      send: 'Enviar Consulta Técnica',
      sending: 'Enviando consulta...',
      successTitle: 'Consulta Enviada con Éxito',
      successMessage: 'Gracias por ponerte en contacto. Recibimos tus requerimientos y te responderemos en menos de 24 horas hábiles.',
      resetForm: 'Enviar otra consulta',
      directChat: 'Escribir directamente por WhatsApp'
    },
    lgi: {
      nav: {
        home: 'Inicio',
        services: 'Servicios',
        about: 'Nosotros',
        contact: 'Contacto',
        backToPortfolio: 'Volver a LuisGalvan.me'
      },
      hero: {
        title: 'LGI Ingeniería',
        subtitle: 'Tecnología de Alta Precisión para la Infraestructura Física',
        description: 'Cerramos la brecha entre la ingeniería civil tradicional y los sistemas de software modernos. Desplegamos Gemelos Digitales, telemetría IoT industrial y analítica predictiva para organizaciones que exigen rigor operativo.',
        cta: 'Explorar Servicios de Ingeniería'
      },
      services: {
        title: 'Líneas de Servicio Especializado',
        s1: {
          title: 'Gemelos Digitales (Digital Twins)',
          desc: 'Réplicas virtuales precisas de infraestructura física construidas sobre motores 3D interactivos. Simulaciones en tiempo real para optimizar cronogramas de obra, detectar interferencias y gestionar activos durante su ciclo de vida.'
        },
        s2: {
          title: 'Telemetría IoT & Monitoreo Estructural (SHM)',
          desc: 'Diseño e instalación de redes de sensores industriales para monitoreo continuo de deformaciones, presiones, temperaturas y vibraciones con pipelines de datos seguros por MQTT.'
        },
        s3: {
          title: 'Analítica Predictiva & Machine Learning',
          desc: 'Transformamos lecturas de sensores y registros operativos en modelos predictivos de mantenimiento, evaluación de riesgo hidrológico y optimización de recursos en campo.'
        },
        s4: {
          title: 'Arquitectura de Software Especializada en AEC',
          desc: 'Plataformas web, móviles y APIs robustas concebidas para las condiciones reales de obra: tolerancia a pérdida de conectividad, interfaces limpias y alta velocidad.'
        },
        s5: {
          title: 'Automatización BIM & Diseño Computacional',
          desc: 'Desarrollo de scripts y plugins a medida para Revit, AutoCAD y Dynamo. Automatización de cubicaciones, validación de normativas y generación automatizada de entregables.'
        },
        s6: {
          title: 'Infraestructura Inteligente & Ciudades Conectadas',
          desc: 'Asesoría técnica para integrar capas de sensórica, control y analítica en proyectos urbanos y de servicios públicos.'
        }
      },
      quote: {
        title: 'Cotice su Proyecto',
        desc: 'Describa las especificaciones y necesidades de su organización. Le remitiremos una propuesta técnica y comercial detallada con cronograma de ejecución.',
        form: {
          name: 'Nombre / Empresa',
          service: 'Línea de Interés',
          details: 'Alcance y Requerimientos Técnicos',
          submit: 'Solicitar Propuesta vía WhatsApp'
        }
      },
      about: {
        title: 'La Ventaja LGI',
        desc: 'En LGI no improvisamos con código desconectado de la realidad. Nuestros líderes poseen formación dual en ingeniería estructural y sistemas computacionales. Cada plataforma, sensor y algoritmo que entregamos está cimentado en las leyes físicas, la normativa técnica y las exigencias financieras de la industria.'
      },
      contact: {
        title: 'Hablemos de su Próxima Obra o Despliegue',
        desc: '¿Listo para incorporar telemetría, gemelos digitales o energía solar en sus operaciones? Coordinemos una reunión técnica inicial.',
        cta: 'Solicitar Reunión Técnica'
      }
    }
  },
  en: {
    nav: {
      about: 'About',
      projects: 'Solutions',
      skills: 'Stack',
      ecosystem: 'LGI Ecosystem',
      aiLanding: 'LGI AI & Automation',
      study: 'Study Notes',
      contact: 'Contact'
    },
    study: {
      title: 'Technical Study Notes',
      subtitle: 'Interactive reference material on Network Infrastructure, Telecommunications, and Distributed Systems. 45 questions organized by topic with expandable answers.'
    },
    hero: {
      greeting: 'Hello, I am',
      name: 'Luis Carlos Galvan',
      tagline: 'LCG — Principal Consultant & Physical-Digital Systems Architect',
      role: 'Civil & Systems Engineer · AI Researcher',
      roleSubtitle: 'Applied AI, Digital Twins & Industrial IoT Telemetry Specialist',
      subtitle: 'Bridging structural physics with computational intelligence. Designing and deploying real-time 3D digital twins, industrial IoT telemetry, and autonomous AI agents for operations requiring zero margin for error.',
      viewProjects: 'View Case Studies',
      viewCv: 'Executive Resume (CV)',
      contactMe: 'Technical Consultation',
      doubleDegree: 'Double Degree - Universidad de los Andes'
    },
    about: {
      title: 'The Hybrid Advantage',
      badge: 'Background & Mission',
      p1_1: 'Most organizations are forced to choose between traditional civil engineers or software developers who know nothing of the physical world. My value proposition is operating with fluency ',
      p1_2: 'at the exact intersection of both domains.',
      p1_3: ' I design structural systems and write real-time embedded firmware — from structural load analysis in ETABS to C++ telemetry pipelines on industrial microcontrollers.',
      p2_1: 'As ',
      p2_2: 'Founder and Principal at LGI',
      p2_3: ', I lead an engineering ecosystem dedicated to tangible operational ROI: deploying Digital Twins, automating business operations through AI agents, and engineering commercial solar systems. Additionally, I serve as ',
      p2_4: 'Graduate Researcher',
      p2_5: ' in AI & Computer Vision applied to critical civil infrastructure (including research linked to the Bogotá Metro Project and INGECO / CIIA labs at Universidad de los Andes).',
      p3: 'The outcome for your business: a single technical counterpart capable of scoping complex physical challenges, engineering their complete software architecture, and deploying them to production with zero translation loss.',
      stack: 'Core Capabilities',
      status: 'Independent Consultant & Founder'
    },
    ecosystem: {
      title: 'LGI Ecosystem',
      subtitle: 'Three specialized operating divisions driven by engineering rigor, live telemetry, and direct business ROI.',
      units: {
        engineering: {
          tag: 'Physical Infrastructure & IoT',
          title: 'LGI Engineering',
          desc: 'Interactive Digital Twins in Unity, Structural Health Monitoring (SHM), industrial telemetry networks, and BIM automation for mission-critical assets.',
          metrics: '99.9% Telemetry Uptime · Direct project overhead reduction'
        },
        aiLabs: {
          tag: 'Autonomous Systems & AI',
          title: 'LGI AI & Automation',
          desc: 'Autonomous AI agents, enterprise workflow automation (n8n/Make), high-converting WhatsApp assistants, and production computer vision pipelines.',
          metrics: '+60% Operational Efficiency · 24/7 Zero-latency execution'
        },
        solar: {
          tag: 'Clean Energy & Resilience',
          title: 'LGI Solar',
          desc: 'Turnkey engineering, installation, and real-time IoT monitoring for commercial and industrial solar photovoltaic plants. Guaranteed energy sovereignty.',
          metrics: 'Up to 70% electricity bill savings · Continuous telemetry'
        },
        iot: {
          tag: 'Sensors & Telemetry',
          title: 'LGI IoT & Hardware',
          desc: 'Wireless mesh sensor networks (triaxial accelerometers, inclinometers, strain gauges) for structural health monitoring (SHM), early seismic alert, and real-time industrial telemetry.',
          metrics: '<50ms Latency · Early critical failure detection'
        }
      }
    },
    projects: {
      title: 'Selected Case Studies & Solutions',
      viewCode: 'View Source',
      liveDemo: 'Live Demo',
      p1: {
        title: 'Immersive Digital Twin for Construction Coordination',
        desc: 'Interactive virtual replica engineered in Unity and connected to BIM pipelines. Enables immersive multidisciplinary clash detection and agent-based simulation to prevent field rework and schedule overruns.',
        type: 'AEC Tech / INGECO Research'
      },
      p2: {
        title: 'Hydrological Risk Analytics Pipeline (ML)',
        desc: 'Supervised and unsupervised ML pipeline analyzing sensor data across 57 monitoring stations along the Bogotá River. Detects non-linear water quality anomalies for municipal early-warning decisions.',
        type: 'Data Engineering / CIIA Research'
      },
      p3: {
        title: 'Industrial Fuel Telemetry & Monitoring (IoT)',
        desc: 'End-to-end industrial IoT telemetry deployed on fuel storage tanks using ESP32 controllers and pressure transducers. Continuous MQTT telemetry streaming eliminates manual gauge reading and operational hazards.',
        type: 'Embedded Systems / LGI Engineering'
      }
    },
    skills: {
      title: 'Technical Stack & Expertise',
      s1: 'Structural Analysis & BIM Modeling (ETABS, SAP2000, Revit)',
      s2: 'Industrial IoT Telemetry & C++ Firmware (ESP32, MQTT, FreeRTOS)',
      s3: 'Full-Stack Software Architecture (React, TypeScript, Node, Python)',
      s4: 'Digital Twins & 3D Immersive Systems (Unity, Three.js, WebGL)',
      s5: 'Applied AI & Computer Vision (PyTorch, YOLO, LLMs)',
      s6: 'Process Automation & Autonomous Workflows (n8n, Make, REST APIs)',
      cat1: 'Structural Analysis & BIM (ETABS, SAP2000, Revit)',
      cat2: 'Real-Time Telemetry & Industrial IoT (ESP32, C++, MQTT)',
      cat3: 'Full-Stack Software Architecture (React, TypeScript, Node, Python)',
      cat4: 'Immersive Systems & Digital Twins (Unity, C#, Agent Simulation)',
      cat5: 'Applied AI & Automation (PyTorch, LLMs, n8n, Computer Vision)'
    },
    aiLanding: {
      badge: 'B2B Autonomous Systems',
      heroTitle: "Multiply Your Company's Operating Capacity Without Inflating Headcount",
      heroSubtitle: 'We architect and deploy custom AI agents, end-to-end workflow automations (n8n/Make), and conversational assistants that execute mission-critical operations 24/7 with zero human latency.',
      ctaAudit: 'Book a Free Process Audit',
      ctaCases: 'Explore AI Capabilities',
      stats: {
        timeSaved: 'Up to 40 hrs/wk',
        timeSavedDesc: 'Saved per employee on repetitive workflows',
        availability: '24/7/365',
        availabilityDesc: 'Continuous lead response and task execution',
        roi: '< 60 Days',
        roiDesc: 'Average time to full automation ROI'
      },
      services: {
        title: 'Engineered AI Capabilities for Real Business Needs',
        subtitle: 'Zero hype. Pure operational systems built to drive revenue and eliminate bottlenecks.',
        s1Title: 'Autonomous Sales & WhatsApp Agents',
        s1Desc: 'LLM-powered assistants integrated directly with your CRM. They qualify leads, answer technical catalog inquiries, quote projects, and book calendar appointments instantly.',
        s2Title: 'Enterprise Workflow Automation (n8n & Make)',
        s2Desc: 'Frictionless orchestration between ERPs, databases, spreadsheets, and messaging platforms. Eliminate manual data entry and spreadsheet errors across your organization.',
        s3Title: 'Computer Vision & Intelligent Document Extraction',
        s3Desc: 'Automated data extraction from architectural blueprints, legal contracts, and field invoices via fine-tuned OCR and visual inspection models.',
        s4Title: 'Enterprise Knowledge Brains (Private RAG)',
        s4Desc: 'Centralize technical manuals, standard operating procedures (SOPs), and compliance codes into an ultra-fast, private internal knowledge agent with strict data isolation.'
      },
      process: {
        title: 'From Diagnosis to Production in 14 Days',
        subtitle: 'A structured engineering methodology delivering immediate operational impact.',
        step1: '1. Friction & Workflow Audit',
        step1Desc: 'We inspect your current workflows, identify recurring manual bottlenecks, and calculate your projected ROI before writing any code.',
        step2: '2. Agent Architecture & Guardrails',
        step2Desc: 'Logic design, API orchestration, and implementation of strict deterministic boundaries to ensure 100% reliable responses.',
        step3: '3. Stress Testing & Validation',
        step3Desc: 'Sandbox testing with synthetic and historical company data, fine-tuning accuracy alongside your operational team.',
        step4: '4. Live Deployment & Telemetry',
        step4Desc: 'Launch across official channels (WhatsApp, Web, ERP) backed by automated failure alerts, real-time analytics, and ongoing support.',
      },
      faq: {
        title: 'Frequently Asked Questions',
        q1: 'How do you prevent the AI from hallucinating or sharing incorrect data?',
        a1: 'We implement Retrieval-Augmented Generation (RAG) bounded by deterministic logic: the model is strictly limited to verified knowledge bases provided by your team. If an inquiry falls outside scope, it gracefully escalates to a designated human.',
        q2: 'How fast will our team see measurable impact?',
        a2: 'Our initial automation pipelines go live between Day 10 and Day 14. From the first week in production, your team will notice dramatic reductions in backlog, response times, and manual friction.',
        q3: 'Is our proprietary and customer data kept secure?',
        a3: 'Yes. All deployments utilize enterprise-grade encrypted connections and private API endpoints where your business data is never stored or used to train public foundation models.'
      }
    },
    contact: {
      title: 'Start a Technical Consultation',
      subtitle: 'Have a project involving structural telemetry, digital twin simulations, or operational AI? Let us examine feasibility, architecture, and deployment schedules.',
      location: 'Bogota, Colombia (Serving Global Clients)',
      name: 'Full Name & Title',
      email: 'Corporate Email',
      serviceInterest: 'Primary Area of Interest',
      message: 'Project Scope or Technical Challenge',
      send: 'Submit Inquiry',
      sending: 'Submitting inquiry...',
      successTitle: 'Inquiry Sent Successfully',
      successMessage: 'Thank you for reaching out. We received your project requirements and will reply within 24 business hours.',
      resetForm: 'Send another inquiry',
      directChat: 'Direct WhatsApp Chat'
    },
    lgi: {
      nav: {
        home: 'Home',
        services: 'Services',
        about: 'About Us',
        contact: 'Contact',
        backToPortfolio: 'Back to LuisGalvan.me'
      },
      hero: {
        title: 'LGI Engineering',
        subtitle: 'Precision Technology for Physical Infrastructure',
        description: 'We bridge the divide between physical civil engineering and modern digital systems. Deploying Digital Twins, industrial IoT telemetry networks, and predictive analytics for enterprises that require measurable operational excellence.',
        cta: 'Explore Engineering Capabilities'
      },
      services: {
        title: 'Specialized Service Lines',
        s1: {
          title: 'Digital Twins & Construction Simulation',
          desc: 'Precise virtual replicas of physical infrastructure built on real-time 3D simulation engines. Built for construction sequencing, clash elimination, and lifecycle asset tracking against BIM baselines.'
        },
        s2: {
          title: 'Industrial IoT & Structural Telemetry (SHM)',
          desc: 'End-to-end industrial sensor network design for continuous measurement of strain, pressure, temperature, and vibration over secure MQTT data pipelines.'
        },
        s3: {
          title: 'Predictive Analytics & ML for Civil Systems',
          desc: 'Transforming sensor readings and operational logs into predictive maintenance schedules, flood/hydrological risk warnings, and site resource forecasting.'
        },
        s4: {
          title: 'Custom AEC Software Architecture',
          desc: 'Web, mobile, and API platforms purpose-built for jobsite realities: resilient against intermittent connectivity, intuitive for field crews, and enterprise-grade.'
        },
        s5: {
          title: 'BIM Automation & Parametric Scripting',
          desc: 'Bespoke plugins and automated scripts for Revit, AutoCAD, and Dynamo. Eliminating manual repetition across drafting, quantity takeoffs, and design review.'
        },
        s6: {
          title: 'Smart Infrastructure Advisory',
          desc: 'Consulting on sensor integration, communication topologies, and centralized monitoring dashboards for utilities and municipal projects.'
        }
      },
      quote: {
        title: 'Request a Project Proposal',
        desc: 'Provide your technical parameters and operational goals. We will prepare a detailed technical and commercial roadmap with execution timelines.',
        form: {
          name: 'Name / Organization',
          service: 'Service Line',
          details: 'Scope & Technical Requirements',
          submit: 'Request Proposal via WhatsApp'
        }
      },
      about: {
        title: 'The LGI Advantage',
        desc: 'LGI never isolates software from reality. Our leadership holds dual expertise across structural engineering and modern computer systems. Every digital twin, telemetry device, and algorithmic model we deploy is anchored in the physical laws, technical codes, and financial metrics of real-world infrastructure.'
      },
      contact: {
        title: 'Discuss Your Next Project or Deployment',
        desc: 'Ready to introduce real-time telemetry, digital twins, or solar generation into your business? Let us connect for an initial technical review.',
        cta: 'Book a Technical Consultation'
      }
    }
  }
};
