const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const projectsDropdown = document.getElementById('projectsDropdown');
const projectsToggle = document.getElementById('projectsToggle');
const langBtn = document.getElementById('langBtn');
const langLabel = document.getElementById('langLabel');
const themeBtn = document.getElementById('themeBtn');
const themeIcon = document.getElementById('themeIcon');

function applyTheme(theme){
  const isDark = theme === 'dark';
  document.documentElement.dataset.theme = theme;
  themeIcon.textContent = isDark ? '☀' : '☾';
  themeBtn.setAttribute('aria-pressed', String(isDark));
  themeBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  themeBtn.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
}

let savedTheme = 'light';
try { savedTheme = localStorage.getItem('portfolio-theme') || 'light'; } catch(error) {}
applyTheme('light');

themeBtn.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
  try { localStorage.setItem('portfolio-theme', nextTheme); } catch(error) {}
});

window.addEventListener('storage', event => {
  if(event.key === 'portfolio-theme') applyTheme(event.newValue === 'dark' ? 'dark' : 'light');
  if(event.key === 'portfolio-lang') setLang(event.newValue === 'es' ? 'es' : 'en', false);
});

const translations = {
  en: {
    nav_about:'About', nav_skills:'Skills', nav_projects:'Projects', nav_contact:'Contact',
    nav_data:'Data Analysis', nav_automation:'Automations', nav_robotics:'Electronics & Robotics',
    nav_mobile:'Mobile Apps', nav_web:'Web Apps', nav_sites:'Websites', nav_design:'Designs', back:'← Back to home', eyebrow:'projects',
    data_title:'Data Analysis', data_desc:'Dashboards and Business Intelligence solutions that turn operational data into clear indicators for decision-making.',
    robotics_title:'Electronics & Robotics', robotics_desc:'Prototypes with sensors, microcontrollers and interactive physical systems.',
    mobile_title:'Mobile Apps', mobile_desc:'Mobile applications developed for iOS and Android with clear, functional experiences.',
    sites_title:'Websites', sites_desc:'Websites developed with WordPress.', lo_desc:'Lo Nuestro is a digital platform and cultural magazine dedicated to documenting, showcasing and sharing the work of Nicaraguan artisans. Through stories, photographs and profiles, we share their crafts, materials, territories and the knowledge they have passed down from generation to generation.', visit_site:'Visit website →', web_title:'Web Apps', web_desc:'Web applications and experiences focused on solving real needs with accessible interfaces.',
    design_title:'Designs', design_desc:'Interfaces, visual pieces and concepts created with Figma, Photoshop, Illustrator and Canva.',
    automation_title:'Automations', automation_desc:'Solutions that connect tools, reduce repetitive work and keep information updated automatically.',
    river_title:'River Monitoring System in Nicaragua',
    river_desc:'Dashboard for identifying historical overflow patterns, auditing records and analyzing each station over time.',
    vet_title:'VetPlus 2026 Historical Analysis',
    vet_desc:'Sales dashboard with customer geolocation, sales force performance and product inventory.',
    marry_title:'Elite Marry Me Profit Analysis',
    marry_desc:'Dashboard for tracking business proposals and analyzing revenue performance.',
    project_four:'Project 4', project_five:'Project 5', placeholder_logo:'Your project here',
    placeholder_desc:'Space ready to add the description, visuals and technologies for your next data project.',
    robotics_project:'WRO Nicaragua 2024', robotics_project_desc:'Robot developed for the 2024 National Robotics Olympiad challenge in Nicaragua.',
    arduino_project:'Arduino Projects Collection', arduino_project_desc:'Collection of Arduino experiments with sensors, motors, Bluetooth modules, displays and interactive circuits.',
    mobile_project:'UAM Courses', mobile_project_desc:'iOS application for exploring, organizing and managing the Universidad Americana course catalog.',
    web_project:'EffiDuino Production Efficiency Monitor', web_project_desc:'Web application for monitoring production efficiency in real time using data collected by an Arduino system.',
    design_project:'Gerald Shop Brand Identity', design_project_desc:'Brand identity for a shipping agency connecting customers in Nicaragua with products from the United States.',
    automation_project:'Weekly Sales Performance Automation', automation_project_desc:'Weekly sales report automated with Google Apps Script using data from BigQuery and HubSpot, then delivered through Gmail.',
    junk_title:'Junk Rescue Monthly Marketing Performance', junk_desc:'Monthly marketing dashboard for monitoring performance using Excel and the Vonigo CRM as data sources.',
    wash_title:'WashBunny Car Wash', wash_desc:'Car wash dashboard that consolidates Excel and CSV data for operational analysis and reporting.',
    view_project:'View project', view_presentation:'Download presentation', view_repo:'View GitHub repository', coming_soon:'Coming soon', technical:'Technical highlights', footer:'Geraldine.io © 2026'
  },
  es: {
    nav_about:'Sobre mí', nav_skills:'Habilidades', nav_projects:'Proyectos', nav_contact:'Contacto',
    nav_data:'Análisis de Datos', nav_automation:'Automatizaciones', nav_robotics:'Electrónica y Robótica',
    nav_mobile:'Mobile Apps', nav_web:'Web Apps', nav_sites:'Páginas web', nav_design:'Diseños', back:'← Volver al inicio', eyebrow:'proyectos',
    data_title:'Análisis de Datos', data_desc:'Dashboards y soluciones de Business Intelligence que convierten datos operativos en indicadores claros para tomar decisiones.',
    robotics_title:'Electrónica y Robótica', robotics_desc:'Prototipos con sensores, microcontroladores y sistemas físicos interactivos.',
    mobile_title:'Mobile Apps', mobile_desc:'Aplicaciones móviles desarrolladas para iOS y Android con experiencias claras y funcionales.',
    sites_title:'Páginas web', sites_desc:'Sitios web desarrollados con WordPress.', lo_desc:'Lo Nuestro es una plataforma digital y revista cultural dedicada a documentar, visibilizar y difundir el trabajo de los artesanos nicaragüenses. A través de historias, fotografías y perfiles, damos a conocer sus oficios, sus materiales, sus territorios y los saberes que han transmitido de generación en generación.', visit_site:'Visitar sitio web →', web_title:'Web Apps', web_desc:'Aplicaciones y experiencias web enfocadas en resolver necesidades reales con interfaces accesibles.',
    design_title:'Diseños', design_desc:'Interfaces, piezas visuales y conceptos creados con Figma, Photoshop, Illustrator y Canva.',
    automation_title:'Automatizaciones', automation_desc:'Soluciones que conectan herramientas, reducen tareas repetitivas y mantienen la información actualizada automáticamente.',
    river_title:'Sistema de Monitoreo de Ríos en Nicaragua',
    river_desc:'Panel para identificar patrones históricos en desbordamientos, auditar registros y analizar cada estación a través del tiempo.',
    vet_title:'Análisis Histórico 2026 VetPlus',
    vet_desc:'Dashboard de ventas con geolocalización de clientes, desempeño de la fuerza comercial e inventario de productos.',
    marry_title:'Análisis de Ganancias Elite Marry Me',
    marry_desc:'Dashboard para dar seguimiento a propuestas de negocio y analizar el rendimiento de los ingresos.',
    project_four:'Proyecto 4', project_five:'Proyecto 5', placeholder_logo:'Tu proyecto aquí',
    placeholder_desc:'Espacio listo para agregar la descripción, imágenes y tecnologías de tu próximo proyecto de datos.',
    robotics_project:'WRO Nicaragua 2024', robotics_project_desc:'Robot desarrollado para el desafío de la Olimpiada Nacional de Robótica 2024 en Nicaragua.',
    arduino_project:'Colección de Proyectos Arduino', arduino_project_desc:'Colección de experimentos Arduino con sensores, motores, módulos Bluetooth, pantallas y circuitos interactivos.',
    mobile_project:'UAM Courses', mobile_project_desc:'Aplicación iOS para explorar, organizar y gestionar el catálogo de cursos de la Universidad Americana.',
    web_project:'Monitor de Eficiencia Productiva EffiDuino', web_project_desc:'Aplicación web para monitorear la eficiencia de producción en tiempo real mediante datos recopilados por un sistema Arduino.',
    design_project:'Identidad de Marca Gerald Shop', design_project_desc:'Identidad de marca para una agencia de envíos que conecta a clientes en Nicaragua con productos de Estados Unidos.',
    automation_project:'Automatización de Rendimiento Semanal de Ventas', automation_project_desc:'Reporte semanal de ventas automatizado con Google Apps Script usando datos de BigQuery y HubSpot, y enviado por Gmail.',
    junk_title:'Rendimiento Mensual de Marketing de Junk Rescue', junk_desc:'Dashboard mensual de marketing para monitorear el rendimiento usando Excel y el CRM Vonigo como fuentes de datos.',
    wash_title:'Autolavado WashBunny', wash_desc:'Dashboard para autolavado que consolida datos de Excel y CSV para el análisis operativo y la elaboración de reportes.',
    view_project:'Ver proyecto', view_presentation:'Descargar presentación', view_repo:'Ver repositorio en GitHub', coming_soon:'Próximamente', technical:'Aspectos técnicos', footer:'Geraldine.io © 2026'
  }
};

let currentLang = 'en';
let activeProjectIndex = null;

function setLang(lang, persist = true){
  currentLang = lang;
  document.documentElement.lang = lang;
  langLabel.textContent = lang === 'en' ? 'Change language · ES' : 'Cambiar idioma · EN';
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.dataset.i18n;
    if(translations[lang][key]) element.textContent = translations[lang][key];
  });
  if(activeProjectIndex !== null && !document.getElementById('projectDetail')) openProject(activeProjectIndex);
  if(document.getElementById('projectDetail')) renderProjectDetail();
  if(persist){
    try { localStorage.setItem('portfolio-lang', lang); } catch(error) {}
  }
}

function closeProjectsMenu(){
  projectsDropdown.classList.remove('open');
  projectsToggle.setAttribute('aria-expanded', 'false');
}

projectsToggle.addEventListener('click', () => {
  const isOpen = projectsDropdown.classList.toggle('open');
  projectsToggle.setAttribute('aria-expanded', String(isOpen));
});

document.addEventListener('click', event => {
  if(!projectsDropdown.contains(event.target)) closeProjectsMenu();
});

projectsDropdown.addEventListener('keydown', event => {
  if(event.key === 'Escape'){
    closeProjectsMenu();
    projectsToggle.focus();
  }
});

langBtn.addEventListener('click', () => setLang(currentLang === 'en' ? 'es' : 'en'));

const projects = [
  {
    title:{en:'River Monitoring System in Nicaragua', es:'Sistema de Monitoreo de Ríos en Nicaragua'},
    images:[
      {src:'assets/img/INETER/view1.webp', alt:'Dashboard INETER - vista 1'},
      {src:'assets/img/INETER/view2.webp', alt:'Dashboard INETER - vista 2'},
      {src:'assets/img/INETER/view3.webp', alt:'Dashboard INETER - vista 3'},
      {src:'assets/img/INETER/view4.webp', alt:'Dashboard INETER - vista 4'},
      {src:'assets/img/INETER/view5.webp', alt:'Dashboard INETER - vista 5'}
    ],
    desc:{en:'Dashboard for identifying historical overflow patterns, auditing reading records and analyzing each station over time.', es:'Panel dedicado a identificar patrones históricos de desbordamiento, auditar registros de lectura y analizar cada estación a través del tiempo.'},
    technologies:['PostgreSQL','Power BI','DAX'],
    bullets:{en:['National station geovisualization','Control dashboard','Overflow trend visualization','Alert level monitoring'], es:['Geovisualización nacional de estaciones','Tablero de control','Visualización de tendencias de desbordamiento','Control de niveles de alerta']}
  },
  {
    title:{en:'VetPlus 2026 Historical Analysis', es:'Análisis Histórico 2026 VetPlus'},
    images:[
      {src:'assets/img/VetPlus/view1.webp', alt:'VetPlus - vista 1'},
      {src:'assets/img/VetPlus/view2.webp', alt:'VetPlus - vista 2'},
      {src:'assets/img/VetPlus/view3.webp', alt:'VetPlus - vista 3'},
      {src:'assets/img/VetPlus/view4.webp', alt:'VetPlus - vista 4'}
    ],
    desc:{en:'Sales dashboard covering customer geolocation, sales force performance and product inventory.', es:'Dashboard de ventas con geolocalización de clientes, desempeño de la fuerza comercial e inventario de productos.'},
    technologies:['Power BI','BigQuery','Spreadsheets'],
    bullets:{en:['Performance KPIs','Geovisualization','Multidimensional product analysis'], es:['KPIs de rendimiento','Geovisualización','Análisis multidimensional de producto']}
  },
  {
    title:{en:'Elite Marry Me Profit Analysis', es:'Análisis de Ganancias Elite Marry Me'},
    images:[
      {src:'assets/img/Marry Me/view1.webp', alt:'Elite Marry Me - vista 1'},
      {src:'assets/img/Marry Me/view2.webp', alt:'Elite Marry Me - vista 2'}
    ],
    desc:{en:'Dashboard for tracking business proposals and analyzing revenue performance.', es:'Dashboard para dar seguimiento a propuestas de negocio y analizar el rendimiento de los ingresos.'},
    technologies:['Power BI','Looker Studio','BigQuery','Spreadsheets'],
    bullets:{en:['Commercial performance analysis','Business proposal tracking','Sales channel attribution'], es:['Análisis de rendimiento comercial','Seguimiento de propuestas de negocio','Atribución de canales de venta']}
  },
  {
    title:{en:'WRO Nicaragua 2024', es:'WRO Nicaragua 2024'}, images:[],
    desc:{en:'Robot developed for participation in Nicaragua\'s 2024 National Robotics Olympiad. The MicroPython control system was organized into modules for acceleration, turning, gyroscope readings and conditional sensor responses to meet the competition challenge.', es:'Robot desarrollado para participar en la Olimpiada Nacional de Robótica de Nicaragua 2024. El sistema de control en MicroPython se organizó en módulos de aceleración, giros, lectura del giroscopio y respuestas condicionales de sensores para cumplir el desafío de la competencia.'},
    technologies:['Python','Visual Studio Code','MicroPython','Robotics','Sensors','Gyroscope'],
    repo:'https://github.com/KrisGerald02/Olimpiada-Nacional-de-Robotica-Nicaragua-2024',
    bullets:{en:['Participation in the 2024 national robotics competition','Modular movement and acceleration control','Gyroscope-assisted orientation','Conditional responses using multiple sensors'],es:['Participación en la competencia nacional de robótica 2024','Control modular de movimiento y aceleración','Orientación asistida por giroscopio','Respuestas condicionales mediante múltiples sensores']}
  },
  {
    title:{en:'UAM Courses', es:'UAM Courses'},
    images:[
      {src:'assets/img/UAMCourses/Onboarding.webp', alt:'UAMCourses onboarding screen'},
      {src:'assets/img/UAMCourses/Register.webp', alt:'UAMCourses account registration screen'},
      {src:'assets/img/UAMCourses/Login.webp', alt:'UAMCourses login screen'},
      {src:'assets/img/UAMCourses/Favoritos.webp', alt:'UAMCourses course catalog and favorites'},
      {src:'assets/img/UAMCourses/Editar.webp', alt:'UAMCourses course detail screen'},
      {src:'assets/img/UAMCourses/Eliminar.webp', alt:'UAMCourses course editing controls'}
    ],
    desc:{en:'Native iOS application for managing the Universidad Americana course catalog. Students can explore and search courses, review schedules and requirements, save favorites and organize their academic options, while administrators can create and update course information.', es:'Aplicación nativa para iOS que gestiona el catálogo de cursos de la Universidad Americana. Los estudiantes pueden explorar y buscar cursos, consultar horarios y requisitos, guardar favoritos y organizar sus opciones académicas, mientras los administradores pueden crear y actualizar la información.'},
    technologies:['Swift','UIKit','MVVM','URLSession','UserDefaults'],
    repo:'https://github.com/KrisGerald02/UAMCourses',
    bullets:{en:['User authentication with login and registration','Course listing, search, details and favorites','Course creation and editing for administrators','MVVM architecture with local persistence and REST API communication'],es:['Autenticación de usuarios con inicio de sesión y registro','Listado, búsqueda, detalles y favoritos de cursos','Creación y edición de cursos para administradores','Arquitectura MVVM con persistencia local y comunicación mediante API REST']}
  },
  {
    title:{en:'EffiDuino Production Efficiency Monitor', es:'Monitor de Eficiencia Productiva EffiDuino'},
    images:[
      {src:'assets/img/EffiDuino/effiduino.webp', alt:'EffiDuino production monitoring web dashboard'},
      {src:'assets/img/EffiDuino/circuito.webp', alt:'EffiDuino Arduino circuit diagram'},
      {src:'assets/img/EffiDuino/presentation/page-1.webp', alt:'EffiDuino presentation cover'},
      {src:'assets/img/EffiDuino/presentation/page-2.webp', alt:'EffiDuino project introduction'},
      {src:'assets/img/EffiDuino/presentation/page-3.webp', alt:'EffiDuino project objectives'},
      {src:'assets/img/EffiDuino/presentation/page-4.webp', alt:'EffiDuino hardware components'},
      {src:'assets/img/EffiDuino/presentation/page-5.webp', alt:'EffiDuino Fritzing diagram'},
      {src:'assets/img/EffiDuino/presentation/page-6.webp', alt:'How EffiDuino works'},
      {src:'assets/img/EffiDuino/presentation/page-7.webp', alt:'EffiDuino impact in daily life'},
      {src:'assets/img/EffiDuino/presentation/page-8.webp', alt:'EffiDuino demonstration'},
      {src:'assets/img/EffiDuino/presentation/page-9.webp', alt:'EffiDuino presentation closing slide'}
    ],
    desc:{en:'Accessible production-efficiency monitoring system that combines Arduino hardware, infrared sensors and Bluetooth communication with a web application. The dashboard displays real-time production, efficiency, active time and historical performance.', es:'Sistema accesible para monitorear la eficiencia productiva que combina hardware Arduino, sensores infrarrojos y comunicación Bluetooth con una aplicación web. El dashboard muestra producción en tiempo real, eficiencia, tiempo activo y rendimiento histórico.'},
    technologies:['HTML','CSS','JavaScript'],
    file:'assets/img/EffiDuino/EffiDuino.pdf',
    fileLabel:{en:'Download presentation',es:'Descargar presentación'},
    repo:'https://github.com/KrisGerald02/Projects_ARDUINO/tree/main/Production%20Efficiency',
    bullets:{en:['Real-time production and efficiency dashboard','Bluetooth connection with the Arduino monitoring system','Interactive charts for minute, hourly and weekly performance','Exportable production information and responsive interface'],es:['Dashboard de producción y eficiencia en tiempo real','Conexión Bluetooth con el sistema de monitoreo Arduino','Gráficos interactivos de rendimiento por minuto, hora y semana','Información de producción exportable e interfaz adaptable']}
  },
  {
    title:{en:'Gerald Shop Brand Identity', es:'Identidad de Marca Gerald Shop'},
    images:[
      {src:'assets/img/GeraldShop/Propuesta%20de%20Marca%20Gerald%20Shop/slide-1.webp', alt:'Gerald Shop brand proposal cover'},
      {src:'assets/img/GeraldShop/Propuesta%20de%20Marca%20Gerald%20Shop/slide-7.webp', alt:'Gerald Shop product identity mockup'},
      {src:'assets/img/GeraldShop/Propuesta%20de%20Marca%20Gerald%20Shop/slide-11.webp', alt:'Gerald Shop brand description'},
      {src:'assets/img/GeraldShop/Propuesta%20de%20Marca%20Gerald%20Shop/slide-12.webp', alt:'Gerald Shop logo construction grid'},
      {src:'assets/img/GeraldShop/Propuesta%20de%20Marca%20Gerald%20Shop/slide-13.webp', alt:'Gerald Shop logo color variants'},
      {src:'assets/img/GeraldShop/Propuesta%20de%20Marca%20Gerald%20Shop/slide-15.webp', alt:'Gerald Shop brand colors'},
      {src:'assets/img/GeraldShop/Propuesta%20de%20Marca%20Gerald%20Shop/slide-19.webp', alt:'Gerald Shop social media stories'},
      {src:'assets/img/GeraldShop/Propuesta%20de%20Marca%20Gerald%20Shop/slide-20.webp', alt:'Gerald Shop social media posts'},
      {src:'assets/img/GeraldShop/Propuesta%20de%20Marca%20Gerald%20Shop/slide-25.webp', alt:'Gerald Shop delivery and apparel mockups'},
      {src:'assets/img/GeraldShop/Propuesta%20de%20Marca%20Gerald%20Shop/slide-26.webp', alt:'Gerald Shop promotional mockups'}
    ],
    desc:{en:'Complete brand identity for Gerald Shop, a shipping agency that helps customers in Nicaragua purchase products from the United States. The project includes the logo, visual system, social media pieces, promotional mockups and a full brand proposal.', es:'Identidad de marca completa para Gerald Shop, una agencia de envíos que ayuda a clientes en Nicaragua a comprar productos de Estados Unidos. El proyecto incluye el logo, sistema visual, piezas para redes sociales, mockups promocionales y una propuesta de marca completa.'},
    technologies:['Canva','Illustrator','Photoshop','PowerPoint'],
    file:'assets/img/GeraldShop/Propuesta%20de%20Marca%20Gerald%20Shop.pptx',
    fileLabel:{en:'Download brand proposal',es:'Descargar propuesta de marca'},
    bullets:{en:['Logo and visual identity design','Brand colors, typography and logo variants','Social media content and promotional pieces','Shipping, packaging and apparel mockups'],es:['Diseño de logo e identidad visual','Colores, tipografías y variantes del logo','Contenido para redes sociales y piezas promocionales','Mockups de envíos, empaques y prendas']}
  },
  {
    title:{en:'Weekly Sales Performance Automation', es:'Automatización de Rendimiento Semanal de Ventas'},
    images:[{src:'assets/img/Marry Me/gmail data weekly.webp', alt:'Reporte semanal automatizado de rendimiento de ventas'}],
    desc:{en:'Weekly sales performance report automated with Google Apps Script. It consolidates data from BigQuery and HubSpot and distributes the updated report through Gmail.', es:'Reporte semanal de rendimiento de ventas automatizado con Google Apps Script. Consolida datos de BigQuery y HubSpot y distribuye el reporte actualizado por Gmail.'},
    technologies:['Google Apps Script','BigQuery','HubSpot','Gmail'],
    bullets:{en:['Automated extraction and processing with Google Apps Script','BigQuery and HubSpot data integration','Weekly report delivery through Gmail','Week-over-week KPI comparison'],es:['Extracción y procesamiento automatizados con Google Apps Script','Integración de datos de BigQuery y HubSpot','Envío semanal del reporte mediante Gmail','Comparación de KPIs contra la semana anterior']}
  },
  {
    title:{en:'Junk Rescue Monthly Marketing Performance', es:'Rendimiento Mensual de Marketing de Junk Rescue'},
    images:[{src:'assets/img/Junk Rescue/view1.webp', alt:'Junk Rescue monthly marketing performance dashboard'}],
    desc:{en:'Monthly marketing data dashboard for Junk Rescue. It centralizes Excel and Vonigo CRM data to evaluate spend, leads, cost per lead and conversions by source.', es:'Dashboard mensual de datos de marketing para Junk Rescue. Centraliza información de Excel y del CRM Vonigo para evaluar inversión, leads, costo por lead y conversiones por fuente.'},
    technologies:['Excel','Vonigo CRM','Power BI','Marketing Analytics'],
    bullets:{en:['Monthly marketing performance update','Excel and Vonigo CRM data sources','Spend and leads analysis by source','Cost-per-lead and call conversion monitoring'],es:['Actualización mensual del rendimiento de marketing','Fuentes de datos Excel y CRM Vonigo','Análisis de inversión y leads por fuente','Monitoreo de costo por lead y conversión de llamadas']}
  },
  {
    title:{en:'WashBunny Car Wash', es:'Autolavado WashBunny'},
    images:[
      {src:'assets/img/WashBunny/view1.webp', alt:'WashBunny dashboard - view 1'},
      {src:'assets/img/WashBunny/view2.webp', alt:'WashBunny dashboard - view 2'},
      {src:'assets/img/WashBunny/view3.webp', alt:'WashBunny dashboard - view 3'}
    ],
    desc:{en:'Car wash dashboard that consolidates operational data from Excel and CSV files, with Power BI reporting and SharePoint-based collaboration.', es:'Dashboard para autolavado que consolida datos operativos provenientes de Excel y archivos CSV, con reportes en Power BI y colaboración mediante SharePoint.'},
    technologies:['Excel','CSV','Power BI','SharePoint'],
    bullets:{en:['Excel and CSV data sources','Interactive reporting in Power BI','Centralized file collaboration through SharePoint','Operational performance analysis for the car wash'],es:['Fuentes de datos Excel y CSV','Reportes interactivos en Power BI','Colaboración centralizada de archivos mediante SharePoint','Análisis del rendimiento operativo del autolavado']}
  },
  {
    title:{en:'Arduino Projects Collection', es:'Colección de Proyectos Arduino'}, images:[],
    desc:{en:'Repository of Arduino practices and prototypes covering temperature and humidity monitoring, Bluetooth communication, infrared and ultrasonic sensors, DC motors, traffic lights, RGB LEDs and small interactive systems.', es:'Repositorio de prácticas y prototipos Arduino que incluye monitoreo de temperatura y humedad, comunicación Bluetooth, sensores infrarrojos y ultrasónicos, motores DC, semáforos, LEDs RGB y pequeños sistemas interactivos.'},
    technologies:['Arduino','C++','Bluetooth','Sensors'],
    repo:'https://github.com/KrisGerald02/Projects_ARDUINO',
    bullets:{en:['Multiple documented Arduino experiments','Sensor integration and environmental monitoring','Bluetooth-controlled motors and circuits','Projects for Arduino UNO, Mega, UNO R4 Minima and WiFi boards'],es:['Múltiples experimentos Arduino documentados','Integración de sensores y monitoreo ambiental','Motores y circuitos controlados por Bluetooth','Proyectos para placas Arduino UNO, Mega, UNO R4 Minima y WiFi']}
  },
  {
    title:{en:'Lo Nuestro', es:'Lo Nuestro'},
    images:[],
    desc:{en:'Lo Nuestro is a digital platform and cultural magazine dedicated to documenting, showcasing and sharing the work of Nicaraguan artisans. Through stories, photographs and profiles, we share their crafts, materials, territories and the knowledge they have passed down from generation to generation.', es:'Lo Nuestro es una plataforma digital y revista cultural dedicada a documentar, visibilizar y difundir el trabajo de los artesanos nicaragüenses. A través de historias, fotografías y perfiles, damos a conocer sus oficios, sus materiales, sus territorios y los saberes que han transmitido de generación en generación.'},
    technologies:['WordPress'],
    site:'https://lonuestronic.com/',
    bullets:{en:['Cultural magazine built on WordPress','Artisan profiles with stories and photographs','Sections by craft, material and territory','Responsive design for phones and computers'],es:['Revista cultural construida en WordPress','Perfiles de artesanos con historias y fotografías','Secciones por oficio, material y territorio','Diseño adaptable a celulares y computadoras']}
  }
];

if(!document.getElementById('projectModal')){
  document.body.insertAdjacentHTML('beforeend', `
    <div class="modal-overlay" id="projectModal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <div class="modal-card">
        <button class="modal-close" id="modalClose" type="button" aria-label="Close project">✕</button>
        <h3 id="modalTitle"></h3><p class="modal-desc" id="modalDesc"></p>
        <div class="modal-gallery" id="modalGallery"></div>
        <div class="modal-tech-list" id="modalKpis" aria-label="Project technologies"></div>
        <div class="modal-resource-links">
          <a class="project-file-link" id="modalFileLink" href="#" download hidden></a>
          <a class="project-file-link" id="modalRepoLink" href="#" target="_blank" rel="noopener" hidden></a>
        </div>
        <h4 id="modalTechnical">Technical highlights</h4><ul id="modalBullets"></ul>
      </div>
    </div>
    <div class="image-lightbox" id="imageLightbox" role="dialog" aria-modal="true" aria-label="Expanded image">
      <button class="lightbox-close" id="lightboxClose" type="button" aria-label="Close expanded image">✕</button>
      <button class="lightbox-nav prev" id="lightboxPrev" type="button" aria-label="Previous image">‹</button>
      <img id="lightboxImage" src="" alt="">
      <button class="lightbox-nav next" id="lightboxNext" type="button" aria-label="Next image">›</button>
      <div class="lightbox-counter" id="lightboxCounter"></div>
    </div>`);
}

const modal = document.getElementById('projectModal');
const lightbox = document.getElementById('imageLightbox');
let activeImages = [];
let activeImageIndex = 0;

function showCarouselImage(index){
  if(!activeImages.length) return;
  activeImageIndex = (index + activeImages.length) % activeImages.length;
  const image = activeImages[activeImageIndex];
  const main = document.getElementById('carouselImage');
  main.src = image.src;
  main.alt = image.alt;
  document.getElementById('carouselCounter').textContent = `${activeImageIndex + 1} / ${activeImages.length}`;
  document.querySelectorAll('.carousel-thumb').forEach((thumb, i) => {
    thumb.classList.toggle('active', i === activeImageIndex);
    thumb.setAttribute('aria-current', i === activeImageIndex ? 'true' : 'false');
  });
}

function openLightbox(){
  const image = activeImages[activeImageIndex];
  document.getElementById('lightboxImage').src = image.src;
  document.getElementById('lightboxImage').alt = image.alt;
  document.getElementById('lightboxCounter').textContent = `${activeImageIndex + 1} / ${activeImages.length}`;
  lightbox.classList.add('open');
}

function moveLightbox(step){
  document.getElementById('projectDetail') ? pdShow(activeImageIndex + step) : showCarouselImage(activeImageIndex + step);
  openLightbox();
}

// Project photos in Spanish or English. The English version of a photo sits next to it with "-en"
// before the extension (view1.webp -> view1-en.webp). The switch only shows when that file exists.
let photoLang = null;
const photoEnAvailable = {};
const enPhotoSrc = src => src.replace(/(\.[a-z0-9]+)$/i, '-en$1');
function projectPhotos(index){
  const images = projects[index].images;
  const lang = photoLang || currentLang;
  return lang === 'en' && photoEnAvailable[index] ? images.map(image => ({...image, src: enPhotoSrc(image.src)})) : images;
}
function checkEnglishPhotos(index){
  const images = projects[index].images;
  if(!images.length || index in photoEnAvailable) return;
  photoEnAvailable[index] = false;
  fetch(enPhotoSrc(images[0].src), {method: 'HEAD', cache: 'no-store'})
    .then(res => {
      if(!res.ok) return;
      photoEnAvailable[index] = true;
      if(activeProjectIndex === index) document.getElementById('projectDetail') ? renderProjectDetail() : openProject(index, activeImageIndex);
    })
    .catch(() => {});
}

function openProject(index, keepImage){
  if(activeProjectIndex !== index) photoLang = null;
  activeProjectIndex = index;
  const project = {...projects[index], images: projectPhotos(index)};
  checkEnglishPhotos(index);
  const shownPhotoLang = photoLang || currentLang;
  document.getElementById('modalTitle').textContent = project.title[currentLang];
  document.getElementById('modalDesc').textContent = project.desc[currentLang];
  document.getElementById('modalTechnical').textContent = translations[currentLang].technical;
  activeImages = project.images;
  activeImageIndex = 0;
  const gallery = document.getElementById('modalGallery');
  gallery.hidden = project.images.length === 0;
  gallery.innerHTML = project.images.length ? `
    <div class="carousel-stage">
      <img decoding="async" class="carousel-image" id="carouselImage" src="${project.images[0].src}" alt="${project.images[0].alt}">
      <button class="carousel-nav prev" type="button" aria-label="Previous image">‹</button>
      <button class="carousel-nav next" type="button" aria-label="Next image">›</button>
      <span class="carousel-counter" id="carouselCounter">1 / ${project.images.length}</span>
      <button class="carousel-zoom" type="button">🔍 ${currentLang === 'en' ? 'Zoom' : 'Ampliar'}</button>
    </div>
    ${photoEnAvailable[index] ? `<div class="photo-lang" role="group" aria-label="${currentLang === 'en' ? 'Photo language' : 'Idioma de las fotos'}"><span>${currentLang === 'en' ? 'Photos in:' : 'Fotos en:'}</span><button type="button" data-photo-lang="es" aria-pressed="${shownPhotoLang === 'es'}">Español</button><button type="button" data-photo-lang="en" aria-pressed="${shownPhotoLang === 'en'}">English</button></div>` : ''}
    <div class="carousel-thumbs">
      ${project.images.map((image, i) => `<button class="carousel-thumb${i === 0 ? ' active' : ''}" type="button" data-index="${i}" aria-label="Image ${i + 1}"><img loading="lazy" decoding="async" src="${image.src}" data-fallback="${projects[index].images[i].src}" onerror="if(this.src.indexOf(this.dataset.fallback)<0)this.src=this.dataset.fallback" alt=""></button>`).join('')}
    </div>` : '';
  document.getElementById('modalKpis').innerHTML = project.technologies.map(technology => `<span class="modal-tech-pill">${technology}</span>`).join('');
  const fileLink = document.getElementById('modalFileLink');
  fileLink.hidden = !project.file;
  fileLink.href = project.file || '#';
  fileLink.textContent = project.fileLabel?.[currentLang] || translations[currentLang].view_presentation;
  const repoLink = document.getElementById('modalRepoLink');
  repoLink.hidden = !project.repo;
  repoLink.href = project.repo || '#';
  repoLink.textContent = translations[currentLang].view_repo;
  document.getElementById('modalBullets').innerHTML = project.bullets[currentLang].map(item => `<li>${item}</li>`).join('');
  if(project.images.length){
    modal.querySelector('.carousel-nav.prev').addEventListener('click', () => showCarouselImage(activeImageIndex - 1));
    modal.querySelector('.carousel-nav.next').addEventListener('click', () => showCarouselImage(activeImageIndex + 1));
    modal.querySelector('.carousel-image').addEventListener('click', openLightbox);
    modal.querySelector('.carousel-zoom').addEventListener('click', openLightbox);
    modal.querySelectorAll('.carousel-thumb').forEach(thumb => thumb.addEventListener('click', () => showCarouselImage(Number(thumb.dataset.index))));
    // A photo without its English copy falls back to the Spanish one.
    modal.querySelector('.carousel-image').addEventListener('error', event => {
      const original = projects[index].images[activeImageIndex].src;
      if(!event.target.src.endsWith(original)) event.target.src = original;
    });
    modal.querySelectorAll('[data-photo-lang]').forEach(button => button.addEventListener('click', () => {
      photoLang = button.dataset.photoLang;
      openProject(index, activeImageIndex);
    }));
    if(keepImage) showCarouselImage(keepImage);
  }
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProject(){
  activeProjectIndex = null;
  modal.classList.remove('open');
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

if(modal && lightbox){
  document.querySelectorAll('[data-project-index]').forEach(button => button.addEventListener('click', () => openProject(Number(button.dataset.projectIndex))));
  document.getElementById('modalClose').addEventListener('click', closeProject);
  modal.addEventListener('click', event => { if(event.target === modal) closeProject(); });
  document.getElementById('lightboxClose').addEventListener('click', () => lightbox.classList.remove('open'));
  document.getElementById('lightboxPrev').addEventListener('click', () => moveLightbox(-1));
  document.getElementById('lightboxNext').addEventListener('click', () => moveLightbox(1));
  lightbox.addEventListener('click', event => { if(event.target === lightbox) lightbox.classList.remove('open'); });
  document.addEventListener('keydown', event => {
    if(event.key === 'Escape') lightbox.classList.contains('open') ? lightbox.classList.remove('open') : closeProject();
    if(lightbox.classList.contains('open') && event.key === 'ArrowLeft') moveLightbox(-1);
    if(lightbox.classList.contains('open') && event.key === 'ArrowRight') moveLightbox(1);
  });
}


// ---------- Project cards and project detail page ----------
// Which category page each project belongs to, its logo, and the translation key of the category title.
const projectMeta = {
  0:{page:'analisis-datos.html', cat:'data_title', logo:'assets/img/INETER/INETER ICON.webp'},
  1:{page:'analisis-datos.html', cat:'data_title', logo:'assets/img/VetPlus/VETPLUS ICONN.webp', wide:true},
  2:{page:'analisis-datos.html', cat:'data_title', logo:'assets/img/Marry Me/ICON MARRY ME.webp'},
  8:{page:'analisis-datos.html', cat:'data_title', logo:'assets/img/Junk Rescue/jr logo.webp', wide:true},
  9:{page:'analisis-datos.html', cat:'data_title', logo:'assets/img/WashBunny/bunnywash_logo.webp', wide:true},
  7:{page:'automatizaciones.html', cat:'automation_title'},
  3:{page:'electronica-robotica.html', cat:'robotics_title'},
  10:{page:'electronica-robotica.html', cat:'robotics_title'},
  4:{page:'mobile-apps.html', cat:'mobile_title'},
  11:{page:'paginas-web.html', cat:'sites_title', logo:'assets/img/lo-nuestro.webp', wide:true},
  6:{page:'disenos.html', cat:'design_title', logo:'assets/img/GeraldShop/geraldshop_icon.webp', wide:true}
};
const catTitles = {
  data_title:{es:'Análisis de Datos', en:'Data Analysis'}, automation_title:{es:'Automatizaciones', en:'Automations'},
  robotics_title:{es:'Electrónica y Robótica', en:'Electronics & Robotics'}, mobile_title:{es:'Mobile Apps', en:'Mobile Apps'},
  design_title:{es:'Diseños', en:'Designs'}, sites_title:{es:'Páginas web', en:'Websites'}
};
const cssUrl = src => `url("${encodeURI(decodeURI(src))}")`;
const initials = text => text.split(/\s+/).filter(Boolean).slice(0, 2).map(word => word[0]).join('').toUpperCase();

// Category pages: each card becomes a cover image with a logo tile, title and short description,
// and the whole card links to the project's own page.
document.querySelectorAll('.category-projects .proj-card').forEach(card => {
  const button = card.querySelector('[data-project-index]');
  const external = card.querySelector('a.proj-btn[href]');
  const index = button ? Number(button.dataset.projectIndex) : null;
  const project = index !== null ? projects[index] : null;
  const meta = (index !== null && projectMeta[index]) || {};
  const title = card.querySelector('h3');
  const desc = card.querySelector('p');
  const logoImg = card.querySelector('.client-logo, .website-logo');
  const logoSrc = meta.logo || (logoImg && logoImg.getAttribute('src'));
  const coverSrc = project && project.images.length ? project.images[0].src : logoSrc;
  const href = index !== null ? `proyecto.html?p=${index}` : external.getAttribute('href');
  card.className = 'pcard';
  card.innerHTML = '';
  const link = document.createElement('a');
  link.className = 'pcard-link';
  link.href = href;
  if(index === null){ link.target = '_blank'; link.rel = 'noopener noreferrer'; }
  link.innerHTML = `<span class="pcard-cover${coverSrc ? '' : ' empty'}"${coverSrc ? ` style='background-image:${cssUrl(coverSrc)}'` : ''}></span>
    <span class="pcard-body">
      <span class="pcard-logo${meta.wide || (logoImg && logoImg.classList.contains('wide')) ? ' wide' : ''}">${logoSrc ? `<img src="${logoSrc}" alt="" loading="lazy">` : `<b>${initials(title.textContent)}</b>`}</span>
    </span>`;
  const body = link.querySelector('.pcard-body');
  body.appendChild(title);
  body.appendChild(desc);
  card.appendChild(link);
});

// Text for the project page: a one-line summary under the title, the second overview paragraph,
// and the problems the project solved (icon key + text). Written from each project's description.
const projectStory = {
  0:{tagline:{es:'Diseñé el dashboard para monitorear los ríos de Nicaragua y sus estaciones de lectura.', en:'I designed the dashboard to monitor Nicaragua\'s rivers and their reading stations.'},
     more:{es:'El dashboard reúne una geovisualización nacional de las estaciones, un tablero de control y el seguimiento de los niveles de alerta, para revisar cada estación a lo largo del tiempo y detectar tendencias de desbordamiento.', en:'The dashboard brings together a national geovisualization of the stations, a control panel and alert level tracking, to review each station over time and spot overflow trends.'},
     problems:[['files',{es:'Registros de lectura dispersos',en:'Scattered reading records'}],['eye',{es:'Sin vista nacional de las estaciones',en:'No national view of the stations'}],['alert',{es:'Niveles de alerta difíciles de seguir',en:'Alert levels hard to track'}],['chart',{es:'Patrones de desbordamiento ocultos',en:'Hidden overflow patterns'}],['clock',{es:'Historial de cada estación difícil de revisar',en:'Each station\'s history hard to review'}],['search',{es:'Errores de lectura difíciles de auditar',en:'Reading errors hard to audit'}]]},
  1:{tagline:{es:'Construí un dashboard en Power BI para analizar las ventas, clientes e inventario de VetPlus.', en:'I built a Power BI dashboard to analyze VetPlus\'s sales, customers and inventory.'},
     more:{es:'Integré los datos de ventas de hojas de cálculo y Google BigQuery y los modelé en Power BI con KPIs de rendimiento, un mapa de clientes y un análisis multidimensional de productos. El equipo comercial puede ver en un solo lugar cómo rinde cada vendedor y qué productos se mueven más.', en:'I integrated the sales data from spreadsheets and Google BigQuery and modeled it in Power BI with performance KPIs, a customer map and multidimensional product analysis. The sales team can see in one place how each salesperson performs and which products move the most.'},
     problems:[['files',{es:'Ventas en hojas de cálculo separadas',en:'Sales split across spreadsheets'}],['map',{es:'Sin ubicación de los clientes',en:'No view of customer locations'}],['users',{es:'Desempeño comercial difícil de medir',en:'Sales performance hard to measure'}],['box',{es:'Inventario sin seguimiento claro',en:'Inventory without clear tracking'}]]},
  2:{tagline:{es:'Construí un dashboard para dar seguimiento a las propuestas de negocio y los ingresos de Elite Marry Me.', en:'I built a dashboard to track Elite Marry Me\'s business proposals and revenue.'},
     more:{es:'Integré los datos en BigQuery y hojas de cálculo y los visualicé en Power BI y Looker Studio. El dashboard muestra el rendimiento comercial, el estado de cada propuesta y qué canales de venta generan más ingresos.', en:'I integrated the data in BigQuery and spreadsheets and visualized it in Power BI and Looker Studio. The dashboard shows commercial performance, the status of each proposal and which sales channels bring in the most revenue.'},
     problems:[['files',{es:'Propuestas sin seguimiento centralizado',en:'Proposals without central tracking'}],['chart',{es:'Ingresos difíciles de analizar',en:'Revenue hard to analyze'}],['eye',{es:'Canales de venta sin atribución',en:'Sales channels without attribution'}]]},
  3:{tagline:{es:'Programé en MicroPython un robot para competir en la Olimpiada Nacional de Robótica de Nicaragua 2024.', en:'I programmed a robot in MicroPython to compete in Nicaragua\'s 2024 National Robotics Olympiad.'},
     more:{es:'Dividí el control en módulos independientes de aceleración, giros, lectura del giroscopio y respuestas de los sensores, para probar y ajustar cada parte por separado. Esto permitió que el robot se orientara con precisión y reaccionara a lo que detectaban sus sensores durante el desafío.', en:'I split the control into independent modules for acceleration, turning, gyroscope readings and sensor responses, so each part could be tested and tuned on its own. This let the robot orient itself accurately and react to what its sensors detected during the challenge.'},
     problems:[['target',{es:'Movimientos que necesitaban precisión',en:'Movements that needed precision'}],['compass',{es:'Orientación en la pista',en:'Orientation on the track'}],['alert',{es:'Reaccionar a varios sensores a la vez',en:'Reacting to several sensors at once'}]]},
  4:{tagline:{es:'Desarrollé una app nativa para iOS que reúne el catálogo de cursos de la Universidad Americana.', en:'I developed a native iOS app that brings together Universidad Americana\'s course catalog.'},
     more:{es:'La construí en Swift con UIKit y arquitectura MVVM. Se comunica con una API REST mediante URLSession y guarda datos localmente con UserDefaults. Incluye inicio de sesión y registro, búsqueda y favoritos para estudiantes, y herramientas para que los administradores creen y editen cursos.', en:'I built it in Swift with UIKit and an MVVM architecture. It talks to a REST API through URLSession and stores data locally with UserDefaults. It includes login and registration, search and favorites for students, and tools for administrators to create and edit courses.'},
     problems:[['search',{es:'Cursos difíciles de encontrar',en:'Courses hard to find'}],['clock',{es:'Horarios y requisitos dispersos',en:'Scattered schedules and requirements'}],['edit',{es:'Actualizar la información era lento',en:'Updating information was slow'}]]},
  6:{tagline:{es:'Creé la identidad de marca completa de Gerald Shop, una agencia de envíos de Estados Unidos a Nicaragua.', en:'I created the full brand identity for Gerald Shop, a shipping agency from the United States to Nicaragua.'},
     more:{es:'Diseñé el logo y sus variantes, la paleta de colores y la tipografía, y con ese sistema visual preparé piezas para redes sociales y mockups de envíos, empaques y prendas. Todo quedó reunido en una propuesta de marca lista para presentar.', en:'I designed the logo and its variants, the color palette and typography, and used that visual system to prepare social media pieces and mockups for shipping, packaging and apparel. Everything came together in a brand proposal ready to present.'},
     problems:[['eye',{es:'Sin identidad visual',en:'No visual identity'}],['shuffle',{es:'Comunicación inconsistente en redes',en:'Inconsistent social media presence'}],['box',{es:'Empaques sin marca',en:'Unbranded packaging'}]]},
  7:{tagline:{es:'Automaticé con Google Apps Script el reporte semanal de ventas, desde los datos hasta el correo.', en:'I automated the weekly sales report with Google Apps Script, from the data to the email.'},
     more:{es:'El script extrae y procesa los datos de BigQuery y HubSpot, compara los KPIs con la semana anterior y envía el reporte actualizado por Gmail. El equipo recibe cada semana la misma información sin tener que armarla a mano.', en:'The script extracts and processes data from BigQuery and HubSpot, compares KPIs with the previous week and sends the updated report through Gmail. The team gets the same information every week without building it by hand.'},
     problems:[['hand',{es:'Reporte armado a mano cada semana',en:'Report built by hand every week'}],['files',{es:'Datos en BigQuery y HubSpot por separado',en:'Data split between BigQuery and HubSpot'}],['clock',{es:'Tiempo perdido en tareas repetitivas',en:'Time lost on repetitive tasks'}]]},
  8:{tagline:{es:'Construí un dashboard mensual de marketing para Junk Rescue con datos de Excel y su CRM.', en:'I built a monthly marketing dashboard for Junk Rescue with data from Excel and its CRM.'},
     more:{es:'Centralicé la información de Excel y del CRM Vonigo en Power BI para analizar la inversión y los leads por fuente, el costo por lead y la conversión de llamadas. Cada mes el reporte se actualiza y muestra qué canales funcionan mejor.', en:'I centralized the Excel and Vonigo CRM data in Power BI to analyze spend and leads by source, cost per lead and call conversion. Each month the report is updated and shows which channels perform best.'},
     problems:[['files',{es:'Datos de marketing dispersos',en:'Scattered marketing data'}],['money',{es:'Costo por lead desconocido',en:'Unknown cost per lead'}],['chart',{es:'Fuentes de leads sin comparar',en:'Lead sources not compared'}]]},
  9:{tagline:{es:'Construí un dashboard en Power BI para analizar la operación del autolavado WashBunny.', en:'I built a Power BI dashboard to analyze the WashBunny car wash operation.'},
     more:{es:'Consolidé los datos operativos de archivos Excel y CSV en reportes interactivos de Power BI, y organicé los archivos en SharePoint para que el equipo colaborara sobre la misma información. El resultado es una vista clara del rendimiento del autolavado.', en:'I consolidated operational data from Excel and CSV files into interactive Power BI reports, and organized the files in SharePoint so the team could collaborate on the same information. The result is a clear view of the car wash\'s performance.'},
     problems:[['files',{es:'Datos en muchos archivos Excel y CSV',en:'Data in many Excel and CSV files'}],['users',{es:'Equipo sin archivos compartidos',en:'Team without shared files'}],['eye',{es:'Rendimiento operativo poco visible',en:'Operational performance hard to see'}]]},
  10:{tagline:{es:'Reuní mis prácticas y prototipos con Arduino en un repositorio documentado.', en:'I gathered my Arduino practices and prototypes in a documented repository.'},
     more:{es:'Incluye proyectos con sensores de temperatura, humedad, infrarrojos y ultrasónicos, motores DC y circuitos controlados por Bluetooth, semáforos y LEDs RGB, en placas Arduino UNO, Mega, UNO R4 Minima y WiFi. Cada práctica está documentada para poder repetirla.', en:'It includes projects with temperature, humidity, infrared and ultrasonic sensors, Bluetooth-controlled DC motors and circuits, traffic lights and RGB LEDs, on Arduino UNO, Mega, UNO R4 Minima and WiFi boards. Each practice is documented so it can be repeated.'},
     problems:[['target',{es:'Aprender electrónica con práctica',en:'Learning electronics hands-on'}],['files',{es:'Experimentos sin documentar',en:'Undocumented experiments'}],['compass',{es:'Probar distintos sensores y placas',en:'Testing different sensors and boards'}]]}
};
projectStory[11] = {tagline:{es:'Desarrollé en WordPress el sitio de Lo Nuestro, una revista cultural sobre los artesanos nicaragüenses.', en:'I developed Lo Nuestro\'s WordPress site, a cultural magazine about Nicaraguan artisans.'},
  more:{es:'Organicé el sitio para que cada artesano tenga su perfil con historia, fotografías, oficio, materiales y territorio, y para que el equipo pueda publicar nuevas historias desde WordPress sin tocar código. El diseño se adapta a celulares y computadoras.', en:'I organized the site so each artisan has a profile with their story, photographs, craft, materials and territory, and so the team can publish new stories from WordPress without touching code. The design adapts to phones and computers.'},
  problems:[['eye',{es:'Artesanos con poca visibilidad',en:'Artisans with little visibility'}],['files',{es:'Historias y fotos sin un lugar propio',en:'Stories and photos without a home'}],['edit',{es:'Publicar contenido debía ser fácil',en:'Publishing had to be easy'}]]};
const problemIcons = {
  files:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
  eye:'<path d="M3 3l18 18"/><path d="M10.6 6.1A9.8 9.8 0 0 1 12 6c5 0 9 6 9 6a16 16 0 0 1-2.6 3.2M6.5 7.6C4.3 9.1 3 12 3 12s4 6 9 6a8.6 8.6 0 0 0 4-1"/><path d="M9.9 10a3 3 0 0 0 4.1 4.1"/>',
  alert:'<path d="M12 3 2 20h20L12 3Z"/><path d="M12 10v4M12 17v.01"/>',
  chart:'<path d="M3 3v18h18"/><path d="M8 16v-3M12 16V9M16 16v-6"/>',
  map:'<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
  users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/>',
  box:'<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/>',
  target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  compass:'<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  edit:'<path d="M4 20h4L19 9l-4-4L4 16v4Z"/><path d="m14 6 4 4"/>',
  shuffle:'<path d="M3 7h3c4 0 6 10 10 10h5M3 17h3c1.6 0 2.8-1.6 4-3.6M14 9.6C15 8 16 7 17.5 7H21M18 4l3 3-3 3M18 14l3 3-3 3"/>',
  hand:'<path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V12M11 11V4.5a1.5 1.5 0 0 1 3 0V12M14 11V6.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7h-.5a6 6 0 0 1-5-2.7L3 15.5a1.5 1.5 0 0 1 2.5-1.7L8 16"/>',
  money:'<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/>'
};

const detailRoot = document.getElementById('projectDetail');
// Logos for the "Technologies used" tiles (files in assets/img/tools). Others show as a text tile.
const techIcons = {
  'PostgreSQL':'postgresql','Power BI':'powerbi','Spreadsheets':'excel','Excel':'excel','Looker Studio':'lookerstudio',
  'BigQuery':'bigquery','Swift':'swift','Canva':'canva','Illustrator':'illustrator','Photoshop':'photoshop',
  'Google Apps Script':'appsscript','Arduino':'arduino','Python':'python','Visual Studio Code':'vscode','WordPress':'wordpress','PowerPoint':'office365','SharePoint':'office365','Gmail':'office365'
};
const pdIcons = [
  '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 6-6"/>',
  '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/>',
  '<path d="M12 3l2.6 5.6L20 9.3l-4 4 1 5.7-5-2.8-5 2.8 1-5.7-4-4 5.4-.7L12 3Z"/>',
  '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 21h8M12 18v3"/>',
  '<path d="M4 7h16M4 12h10M4 17h7"/>',
  '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>'
];
const svg = (paths, extra = '') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${extra}>${paths}</svg>`;

// Slide width is 64% of the gallery (86% on phones) with a 3% gap; the active slide sits in the centre.
function pdOffset(i){
  const w = window.matchMedia('(max-width:700px)').matches ? 86 : 64;
  return `translateX(${(100 - w) / 2 - i * (w + 3)}%)`;
}
window.addEventListener('resize', () => { const t = detailRoot && detailRoot.querySelector('.pd-track'); if(t) t.style.transform = pdOffset(activeImageIndex); });

function pdShow(index){
  if(!activeImages.length) return;
  const n = activeImages.length;
  activeImageIndex = (index + n) % n;
  const track = detailRoot.querySelector('.pd-track');
  if(track) track.style.transform = pdOffset(activeImageIndex);
  detailRoot.querySelectorAll('.pd-slide').forEach((slide, i) => slide.classList.toggle('active', i === activeImageIndex));
  document.getElementById('carouselCounter').textContent = `${activeImageIndex + 1} / ${n}`;
  detailRoot.querySelectorAll('.pd-dot').forEach((dot, i) => dot.classList.toggle('active', i === activeImageIndex));
}

function renderProjectDetail(){
  const index = Number(new URLSearchParams(location.search).get('p'));
  const project = projects[index];
  const es = currentLang === 'es';
  if(!project || !projectMeta[index]){
    detailRoot.innerHTML = `<section class="pd-wrap pd-missing"><a class="back-link" href="index.html#proyectos">← ${es ? 'Volver a proyectos' : 'Back to projects'}</a><h1>${es ? 'Proyecto no encontrado' : 'Project not found'}</h1></section>`;
    return;
  }
  const meta = projectMeta[index];
  const cat = catTitles[meta.cat][currentLang];
  if(detailRoot.dataset.shown) detailRoot.classList.add('pd-quiet');
  detailRoot.dataset.shown = '1';
  const title = project.title[currentLang];
  document.title = `${title} · Kristel Villalta`;
  if(activeProjectIndex !== index) photoLang = null;
  activeProjectIndex = index;
  checkEnglishPhotos(index);
  const images = projectPhotos(index);
  activeImages = images;
  if(activeImageIndex >= images.length) activeImageIndex = 0;
  const shownPhotoLang = photoLang || currentLang;
  const siblings = Object.keys(projectMeta).map(Number).filter(i => projectMeta[i].page === meta.page);
  const pos = siblings.indexOf(index);
  const next = siblings.length > 1 ? siblings[(pos + 1) % siblings.length] : null;
  const desc = project.desc[currentLang];
  const story = projectStory[index];
  const lead = (desc.match(/^.*?[.!?](\s|$)/) || [desc])[0].trim();
  const n = images.length;
  const at = offset => images[(activeImageIndex + offset + n) % n];
  const cover = n ? images[0].src : meta.logo;
  detailRoot.innerHTML = `
    <section class="pd-hero">
      ${cover ? `<span class="pd-hero-bg" style='background-image:${cssUrl(cover)}'></span>` : ''}
      <div class="pd-wrap pd-hero-in">
        <a class="back-link" href="${meta.page}">← ${cat}</a>
        <div class="pd-hero-row">
          <div class="pd-hero-text">
            <span class="pd-logo${meta.wide ? ' wide' : ''}">${meta.logo ? `<img src="${meta.logo}" alt="">` : `<b>${initials(project.title.en)}</b>`}</span>
            <h1>${title}</h1>
            <p>${story ? story.tagline[currentLang] : lead}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="pd-wrap pd-block pd-overview">
      <h2 class="pd-vlabel">${es ? 'Resumen' : 'Overview'}</h2>
      <div class="pd-block-body">
        <p>${desc}</p>
        ${story ? `<p>${story.more[currentLang]}</p>` : ''}
        <div class="pd-links">
          ${project.site ? `<a class="btn btn-primary" href="${project.site}" target="_blank" rel="noopener noreferrer">${es ? 'Visitar sitio web' : 'Visit website'} ↗</a>` : ''}
          ${project.repo ? `<a class="btn btn-primary" href="${project.repo}" target="_blank" rel="noopener noreferrer">${translations[currentLang].view_repo} ↗</a>` : ''}
          ${project.file ? `<a class="btn btn-ghost" href="${project.file}" download>${project.fileLabel?.[currentLang] || translations[currentLang].view_presentation} ↓</a>` : ''}
        </div>
      </div>
    </section>

    ${story ? `<section class="pd-wrap pd-block pd-problem">
      <ul class="pd-block-body">${story.problems.map(([icon, text]) => `<li><span class="pd-ico">${svg(problemIcons[icon])}</span><span>${text[currentLang]}</span></li>`).join('')}</ul>
      <h2 class="pd-vlabel">${es ? 'El problema' : 'The Problem'}</h2>
    </section>` : ''}

    <section class="pd-wrap pd-block pd-solution">
      <h2 class="pd-vlabel">${es ? 'La solución' : 'The Solution'}</h2>
      <ul class="pd-block-body">${project.bullets[currentLang].map((item, i) => `<li><span class="pd-ico">${svg(pdIcons[i % pdIcons.length])}</span><span>${item}</span></li>`).join('')}</ul>
    </section>

    ${n ? `
    <section class="pd-wrap pd-gallery">
      <h2>${es ? 'Así se ve' : 'How it looks'}</h2>
      <div class="pd-flow">
        <div class="pd-track" style="transform:${pdOffset(activeImageIndex)}">
          ${images.map((image, i) => `<button class="pd-slide${i === activeImageIndex ? ' active' : ''}" type="button" data-index="${i}" aria-label="${es ? 'Imagen' : 'Image'} ${i + 1}"><img decoding="async" src="${image.src}" data-fallback="${project.images[i].src}" onerror="if(this.src.indexOf(this.dataset.fallback)<0)this.src=this.dataset.fallback" alt="${image.alt}"></button>`).join('')}
        </div>
        <span class="carousel-counter" id="carouselCounter">${activeImageIndex + 1} / ${n}</span>
        <button class="carousel-zoom" type="button">🔍 ${es ? 'Ampliar' : 'Zoom'}</button>
        ${n > 1 ? `<button class="pd-arrow prev" type="button" aria-label="${es ? 'Imagen anterior' : 'Previous image'}">‹</button><button class="pd-arrow next" type="button" aria-label="${es ? 'Imagen siguiente' : 'Next image'}">›</button>` : ''}
      </div>
      ${n > 1 ? `<div class="pd-dots">${images.map((_, i) => `<button class="pd-dot${i === activeImageIndex ? ' active' : ''}" type="button" data-index="${i}" aria-label="${es ? 'Imagen' : 'Image'} ${i + 1}"></button>`).join('')}</div>` : ''}
      ${photoEnAvailable[index] ? `<div class="photo-lang" role="group" aria-label="${es ? 'Idioma de las fotos' : 'Photo language'}"><span>${es ? 'Fotos en:' : 'Photos in:'}</span><button type="button" data-photo-lang="es" aria-pressed="${shownPhotoLang === 'es'}">Español</button><button type="button" data-photo-lang="en" aria-pressed="${shownPhotoLang === 'en'}">English</button></div>` : ''}
    </section>` : ''}

    <section class="pd-wrap pd-tech">
      <h2>${es ? 'Tecnologías usadas' : 'Technologies used'}</h2>
      <ul>${[...project.technologies].sort((a, b) => !techIcons[a] - !techIcons[b]).map(t => `<li title="${t}">${techIcons[t] ? `<span class="pd-tech-ico" style="background-image:url('assets/img/tools/${techIcons[t]}.svg')"></span>` : ''}<span class="pd-tech-name">${t}</span></li>`).join('')}</ul>
    </section>

    <section class="pd-wrap pd-end">
      ${next !== null ? `<a class="pd-next" href="proyecto.html?p=${next}"><span>${es ? 'Siguiente proyecto' : 'Next project'}</span><strong>${projects[next].title[currentLang]} →</strong></a>` : ''}
    </section>`;
  if(n){
    detailRoot.querySelectorAll('.pd-slide').forEach(slide => slide.addEventListener('click', () => { const i = Number(slide.dataset.index); i === activeImageIndex ? openLightbox() : pdShow(i); }));
    detailRoot.querySelector('.carousel-zoom').addEventListener('click', openLightbox);
    detailRoot.querySelector('.pd-arrow.prev')?.addEventListener('click', () => pdShow(activeImageIndex - 1));
    detailRoot.querySelector('.pd-arrow.next')?.addEventListener('click', () => pdShow(activeImageIndex + 1));
    detailRoot.querySelectorAll('.pd-dot').forEach(dot => dot.addEventListener('click', () => pdShow(Number(dot.dataset.index))));
    let touchX = null;
    const flow = detailRoot.querySelector('.pd-flow');
    flow.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, {passive:true});
    flow.addEventListener('touchend', e => { if(touchX === null) return; const dx = e.changedTouches[0].clientX - touchX; if(Math.abs(dx) > 40) pdShow(activeImageIndex + (dx < 0 ? 1 : -1)); touchX = null; });
    detailRoot.querySelectorAll('[data-photo-lang]').forEach(button => button.addEventListener('click', () => {
      photoLang = button.dataset.photoLang;
      renderProjectDetail();
    }));
  }
}

let savedLang = 'en';
savedLang = window.portfolioDefaultLang || 'en';
try { savedLang = localStorage.getItem('portfolio-lang') || savedLang; } catch(error) {}
setLang(savedLang === 'es' ? 'es' : 'en', false);
