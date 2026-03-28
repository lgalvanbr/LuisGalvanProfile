export type Language = 'es' | 'en';

export const translations = {
  es: {
    nav: {
      about: 'Sobre Mí',
      projects: 'Proyectos',
      skills: 'Habilidades',
      contact: 'Contacto'
    },
    hero: {
      greeting: 'Hola, soy',
      role: 'Ingeniero de Sistemas y Civil',
      subtitle: 'Construyendo el futuro a través de código e infraestructura.',
      viewProjects: 'Ver Proyectos',
      contactMe: 'Contactar',
      doubleDegree: 'Doble Titulación - Universidad de los Andes'
    },
    about: {
      title: 'Sobre Mí',
      p1_1: 'Soy un profesional con un perfil híbrido único: ',
      p1_2: 'Ingeniero de Sistemas y Civil',
      p1_3: ' en la Universidad de los Andes. Mi pasión radica en unir la lógica abstracta del software con la realidad tangible de la construcción y la infraestructura.',
      p2_1: 'Actualmente me desempeño como ',
      p2_2: 'Asistente de Investigación',
      p2_3: ' en el grupo INGECO (Gemelos Digitales y Simulación) y en el grupo CIIA (Análisis de Datos y Machine Learning). Además, soy ',
      p2_4: 'Fundador y Project Engineer',
      p2_5: ' en LGI Ingeniería.',
      p3: 'Me especializo en diseñar arquitecturas robustas, aplicar Inteligencia Artificial para resolver problemas complejos, y desarrollar soluciones IoT que conectan el mundo físico con el digital.',
      stack: 'Stack Principal',
      status: 'Investigador & Desarrollador'
    },
    projects: {
      title: 'Proyectos Destacados',
      viewCode: 'Ver Código',
      liveDemo: 'Demo en Vivo',
      p1: {
        title: 'Gemelo Digital para Procesos de Construcción',
        desc: 'Desarrollo de un gemelo digital basado en actividades y flujos utilizando Unity y simulación basada en agentes para optimizar tiempo y recursos.',
        type: 'Investigación / INGECO'
      },
      p2: {
        title: 'Análisis de Calidad de Agua con Machine Learning',
        desc: 'Análisis exploratorio y modelado ML para identificar patrones no lineales en datos de calidad del agua del Río Bogotá usando 57 estaciones de monitoreo.',
        type: 'Data Science / CIIA'
      },
      p3: {
        title: 'Sistema IoT de Monitoreo de Combustible',
        desc: 'Diseño e implementación de un sistema IoT end-to-end para tanques de almacenamiento usando sensores de presión industriales y controladores ESP32.',
        type: 'Ingeniería / LGI'
      }
    },
    skills: {
      title: 'Habilidades Técnicas',
      s1: 'Software Dev (Python, Java, C#)',
      s2: 'Data Analysis & Machine Learning',
      s3: 'Frontend & Backend (React, Angular, Node)',
      s4: 'Simulación & Digital Twins (Unity)',
      s5: 'IoT & Embedded Systems (ESP32)',
      s6: 'Ingeniería Civil (AutoCAD, Revit)'
    },
    contact: {
      title: 'Trabajemos Juntos',
      subtitle: '¿Tienes un proyecto en mente que combine software e infraestructura? Me encantaría escucharlo.',
      location: 'Bogotá, Colombia',
      name: 'Nombre',
      email: 'Correo Electrónico',
      message: 'Mensaje',
      send: 'Enviar Mensaje'
    },
    lgi: {
      nav: {
        home: 'Inicio',
        services: 'Servicios',
        about: 'Nosotros',
        contact: 'Contacto',
        backToPortfolio: 'Volver al Portafolio'
      },
      hero: {
        title: 'LGI Ingeniería',
        subtitle: 'Soluciones Integrales en Tecnología e Infraestructura',
        description: 'Potenciamos el sector de la construcción y la ingeniería civil mediante la integración de tecnologías de vanguardia. Desde Gemelos Digitales hasta sistemas IoT de alta precisión.',
        cta: 'Explorar Servicios'
      },
      services: {
        title: 'Nuestros Servicios Especializados',
        s1: {
          title: 'Gemelos Digitales (Digital Twins)',
          desc: 'Desarrollamos réplicas virtuales precisas de infraestructuras físicas. Optimizamos la planificación, ejecución y mantenimiento de proyectos mediante simulaciones avanzadas en tiempo real. Ideal para monitoreo de obras y predicción de escenarios de riesgo.'
        },
        s2: {
          title: 'Sistemas IoT & Telemetría Industrial',
          desc: 'Diseño e implementación de redes de sensores para el monitoreo continuo de variables críticas (presión, deformación, temperatura). Datos en vivo para decisiones estratégicas y alertas tempranas en estructuras.'
        },
        s3: {
          title: 'Data Science & Machine Learning',
          desc: 'Transformamos datos crudos en inteligencia de negocio. Modelos predictivos para mantenimiento estructural, análisis de riesgos hidrológicos y optimización de recursos en obra.'
        },
        s4: {
          title: 'Arquitectura de Software a Medida',
          desc: 'Creamos plataformas web y móviles robustas, escalables y seguras, diseñadas específicamente para resolver los retos operativos del sector de la ingeniería y construcción.'
        },
        s5: {
          title: 'Automatización BIM & Scripts',
          desc: 'Desarrollo de plugins y scripts personalizados para plataformas como Revit y AutoCAD. Automatizamos tareas repetitivas de diseño, extracción de cantidades y validación de modelos.'
        },
        s6: {
          title: 'Infraestructura Inteligente (Smart Cities)',
          desc: 'Consultoría e integración de tecnologías para modernizar la infraestructura urbana. Conectamos obras civiles con sistemas de gestión centralizada para ciudades más eficientes.'
        }
      },
      quote: {
        title: 'Cotiza tu Proyecto',
        desc: 'Cuéntanos sobre tus necesidades. Ya sea un sistema IoT, un gemelo digital o software a medida, te enviaremos una propuesta técnica y comercial detallada.',
        form: {
          name: 'Nombre / Empresa',
          service: 'Servicio de Interés',
          details: 'Detalles del Proyecto',
          submit: 'Solicitar Cotización por WhatsApp'
        }
      },
      about: {
        title: 'El Valor de LGI Ingeniería',
        desc: 'En LGI Ingeniería no solo escribimos código; entendemos la física, los materiales y los procesos constructivos. Nuestra ventaja competitiva radica en la fusión del rigor de la ingeniería civil tradicional con la agilidad y escalabilidad del desarrollo de software moderno. Construimos las herramientas digitales que el sector necesita para evolucionar.'
      },
      contact: {
        title: 'Impulsa tu próximo proyecto',
        desc: '¿Listo para integrar tecnología de punta en tu infraestructura? Contáctanos y diseñemos la solución ideal.',
        cta: 'Contactar a LGI'
      }
    }
  },
  en: {
    nav: {
      about: 'About',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact'
    },
    hero: {
      greeting: "Hi, I'm",
      role: 'Systems & Civil Engineer',
      subtitle: 'Building the future through code and infrastructure.',
      viewProjects: 'View Projects',
      contactMe: 'Contact Me',
      doubleDegree: 'Double Degree - Universidad de los Andes'
    },
    about: {
      title: 'About Me',
      p1_1: 'I am a professional with a unique hybrid profile: ',
      p1_2: 'Systems and Civil Engineer',
      p1_3: ' from Universidad de los Andes. My passion lies in bridging the abstract logic of software with the tangible reality of construction and infrastructure.',
      p2_1: 'I currently work as a ',
      p2_2: 'Research Assistant',
      p2_3: ' in the INGECO group (Digital Twins and Simulation) and the CIIA group (Data Analysis and Machine Learning). Additionally, I am the ',
      p2_4: 'Founder and Project Engineer',
      p2_5: ' at LGI Ingeniería.',
      p3: 'I specialize in designing robust architectures, applying Artificial Intelligence to solve complex problems, and developing IoT solutions that connect the physical world with the digital one.',
      stack: 'Main Stack',
      status: 'Researcher & Developer'
    },
    projects: {
      title: 'Featured Projects',
      viewCode: 'View Code',
      liveDemo: 'Live Demo',
      p1: {
        title: 'Digital Twin for Construction Processes',
        desc: 'Development of an activity and flow-based digital twin using Unity and agent-based simulation to optimize time and resources.',
        type: 'Research / INGECO'
      },
      p2: {
        title: 'Water Quality Analysis with Machine Learning',
        desc: 'Exploratory analysis and ML modeling to identify non-linear patterns in Bogotá River water quality data using 57 monitoring stations.',
        type: 'Data Science / CIIA'
      },
      p3: {
        title: 'IoT Fuel Monitoring System',
        desc: 'Design and implementation of an end-to-end IoT system for storage tanks using industrial pressure sensors and ESP32 controllers.',
        type: 'Engineering / LGI'
      }
    },
    skills: {
      title: 'Technical Skills',
      s1: 'Software Dev (Python, Java, C#)',
      s2: 'Data Analysis & Machine Learning',
      s3: 'Frontend & Backend (React, Angular, Node)',
      s4: 'Simulation & Digital Twins (Unity)',
      s5: 'IoT & Embedded Systems (ESP32)',
      s6: 'Civil Engineering (AutoCAD, Revit)'
    },
    contact: {
      title: "Let's Work Together",
      subtitle: "Have a project in mind that combines software and infrastructure? I'd love to hear about it.",
      location: 'Bogota, Colombia',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send Message'
    },
    lgi: {
      nav: {
        home: 'Home',
        services: 'Services',
        about: 'About Us',
        contact: 'Contact',
        backToPortfolio: 'Back to Portfolio'
      },
      hero: {
        title: 'LGI Engineering',
        subtitle: 'Comprehensive Technology and Infrastructure Solutions',
        description: 'We empower the construction and civil engineering sector by integrating cutting-edge technologies. From Digital Twins to high-precision IoT systems.',
        cta: 'Explore Services'
      },
      services: {
        title: 'Our Specialized Services',
        s1: {
          title: 'Digital Twins',
          desc: 'We develop precise virtual replicas of physical infrastructures. We optimize project planning, execution, and maintenance through advanced real-time simulations. Ideal for site monitoring and risk scenario prediction.'
        },
        s2: {
          title: 'IoT & Industrial Telemetry',
          desc: 'Design and implementation of sensor networks for continuous monitoring of critical variables (pressure, deformation, temperature). Live data for strategic decisions and early warnings in structures.'
        },
        s3: {
          title: 'Data Science & Machine Learning',
          desc: 'We transform raw data into business intelligence. Predictive models for structural maintenance, hydrological risk analysis, and resource optimization on site.'
        },
        s4: {
          title: 'Custom Software Architecture',
          desc: 'We create robust, scalable, and secure web and mobile platforms, specifically designed to solve the operational challenges of the engineering and construction sector.'
        },
        s5: {
          title: 'BIM Automation & Scripts',
          desc: 'Development of custom plugins and scripts for platforms like Revit and AutoCAD. We automate repetitive design tasks, quantity extraction, and model validation.'
        },
        s6: {
          title: 'Smart Infrastructure (Smart Cities)',
          desc: 'Consulting and technology integration to modernize urban infrastructure. We connect civil works with centralized management systems for more efficient cities.'
        }
      },
      quote: {
        title: 'Quote Your Project',
        desc: 'Tell us about your needs. Whether it\'s an IoT system, a digital twin, or custom software, we will send you a detailed technical and commercial proposal.',
        form: {
          name: 'Name / Company',
          service: 'Service of Interest',
          details: 'Project Details',
          submit: 'Request Quote via WhatsApp'
        }
      },
      about: {
        title: 'The Value of LGI Engineering',
        desc: 'At LGI Engineering, we don\'t just write code; we understand physics, materials, and construction processes. Our competitive advantage lies in merging the rigor of traditional civil engineering with the agility and scalability of modern software development. We build the digital tools the sector needs to evolve.'
      },
      contact: {
        title: 'Boost your next project',
        desc: 'Ready to integrate cutting-edge technology into your infrastructure? Contact us and let\'s design the ideal solution.',
        cta: 'Contact LGI'
      }
    }
  }
};
