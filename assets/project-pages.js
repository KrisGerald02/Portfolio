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
applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

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
  if(activeProjectIndex !== null) openProject(activeProjectIndex);
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
      {src:'assets/img/INETER/view1.png', alt:'Dashboard INETER - vista 1'},
      {src:'assets/img/INETER/view2.png', alt:'Dashboard INETER - vista 2'},
      {src:'assets/img/INETER/view3.png', alt:'Dashboard INETER - vista 3'},
      {src:'assets/img/INETER/view4.png', alt:'Dashboard INETER - vista 4'},
      {src:'assets/img/INETER/view5.png', alt:'Dashboard INETER - vista 5'}
    ],
    desc:{en:'Dashboard for identifying historical overflow patterns, auditing reading records and analyzing each station over time.', es:'Panel dedicado a identificar patrones históricos de desbordamiento, auditar registros de lectura y analizar cada estación a través del tiempo.'},
    technologies:['PostgreSQL','Power BI','DAX'],
    bullets:{en:['National station geovisualization','Control dashboard','Overflow trend visualization','Alert level monitoring'], es:['Geovisualización nacional de estaciones','Tablero de control','Visualización de tendencias de desbordamiento','Control de niveles de alerta']}
  },
  {
    title:{en:'VetPlus 2026 Historical Analysis', es:'Análisis Histórico 2026 VetPlus'},
    images:[
      {src:'assets/img/VetPlus/view1.png', alt:'VetPlus - vista 1'},
      {src:'assets/img/VetPlus/view2.png', alt:'VetPlus - vista 2'},
      {src:'assets/img/VetPlus/view3.png', alt:'VetPlus - vista 3'},
      {src:'assets/img/VetPlus/view4.png', alt:'VetPlus - vista 4'}
    ],
    desc:{en:'Sales dashboard covering customer geolocation, sales force performance and product inventory.', es:'Dashboard de ventas con geolocalización de clientes, desempeño de la fuerza comercial e inventario de productos.'},
    technologies:['Power BI','Spreadsheets'],
    bullets:{en:['Performance KPIs','Geovisualization','Multidimensional product analysis'], es:['KPIs de rendimiento','Geovisualización','Análisis multidimensional de producto']}
  },
  {
    title:{en:'Elite Marry Me Profit Analysis', es:'Análisis de Ganancias Elite Marry Me'},
    images:[
      {src:'assets/img/Marry Me/view1.png', alt:'Elite Marry Me - vista 1'},
      {src:'assets/img/Marry Me/view2.png', alt:'Elite Marry Me - vista 2'}
    ],
    desc:{en:'Dashboard for tracking business proposals and analyzing revenue performance.', es:'Dashboard para dar seguimiento a propuestas de negocio y analizar el rendimiento de los ingresos.'},
    technologies:['Power BI','Looker Studio','BigQuery','Spreadsheets'],
    bullets:{en:['Commercial performance analysis','Business proposal tracking','Sales channel attribution'], es:['Análisis de rendimiento comercial','Seguimiento de propuestas de negocio','Atribución de canales de venta']}
  },
  {
    title:{en:'WRO Nicaragua 2024', es:'WRO Nicaragua 2024'}, images:[],
    desc:{en:'Robot developed for participation in Nicaragua\'s 2024 National Robotics Olympiad. The MicroPython control system was organized into modules for acceleration, turning, gyroscope readings and conditional sensor responses to meet the competition challenge.', es:'Robot desarrollado para participar en la Olimpiada Nacional de Robótica de Nicaragua 2024. El sistema de control en MicroPython se organizó en módulos de aceleración, giros, lectura del giroscopio y respuestas condicionales de sensores para cumplir el desafío de la competencia.'},
    technologies:['MicroPython','Robotics','Sensors','Gyroscope'],
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
      {src:'assets/img/EffiDuino/effiduino.png', alt:'EffiDuino production monitoring web dashboard'},
      {src:'assets/img/EffiDuino/circuito.jpeg', alt:'EffiDuino Arduino circuit diagram'},
      {src:'assets/img/EffiDuino/presentation/page-1.png', alt:'EffiDuino presentation cover'},
      {src:'assets/img/EffiDuino/presentation/page-2.png', alt:'EffiDuino project introduction'},
      {src:'assets/img/EffiDuino/presentation/page-3.png', alt:'EffiDuino project objectives'},
      {src:'assets/img/EffiDuino/presentation/page-4.png', alt:'EffiDuino hardware components'},
      {src:'assets/img/EffiDuino/presentation/page-5.png', alt:'EffiDuino Fritzing diagram'},
      {src:'assets/img/EffiDuino/presentation/page-6.png', alt:'How EffiDuino works'},
      {src:'assets/img/EffiDuino/presentation/page-7.png', alt:'EffiDuino impact in daily life'},
      {src:'assets/img/EffiDuino/presentation/page-8.png', alt:'EffiDuino demonstration'},
      {src:'assets/img/EffiDuino/presentation/page-9.png', alt:'EffiDuino presentation closing slide'}
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
      {src:'assets/img/GeraldShop/Propuesta%20de%20Marca%20Gerald%20Shop/slide-1.png', alt:'Gerald Shop brand proposal cover'},
      {src:'assets/img/GeraldShop/Propuesta%20de%20Marca%20Gerald%20Shop/slide-7.png', alt:'Gerald Shop product identity mockup'},
      {src:'assets/img/GeraldShop/Propuesta%20de%20Marca%20Gerald%20Shop/slide-11.png', alt:'Gerald Shop brand description'},
      {src:'assets/img/GeraldShop/Propuesta%20de%20Marca%20Gerald%20Shop/slide-12.png', alt:'Gerald Shop logo construction grid'},
      {src:'assets/img/GeraldShop/Propuesta%20de%20Marca%20Gerald%20Shop/slide-13.png', alt:'Gerald Shop logo color variants'},
      {src:'assets/img/GeraldShop/Propuesta%20de%20Marca%20Gerald%20Shop/slide-15.png', alt:'Gerald Shop brand colors'},
      {src:'assets/img/GeraldShop/Propuesta%20de%20Marca%20Gerald%20Shop/slide-19.png', alt:'Gerald Shop social media stories'},
      {src:'assets/img/GeraldShop/Propuesta%20de%20Marca%20Gerald%20Shop/slide-20.png', alt:'Gerald Shop social media posts'},
      {src:'assets/img/GeraldShop/Propuesta%20de%20Marca%20Gerald%20Shop/slide-25.png', alt:'Gerald Shop delivery and apparel mockups'},
      {src:'assets/img/GeraldShop/Propuesta%20de%20Marca%20Gerald%20Shop/slide-26.png', alt:'Gerald Shop promotional mockups'}
    ],
    desc:{en:'Complete brand identity for Gerald Shop, a shipping agency that helps customers in Nicaragua purchase products from the United States. The project includes the logo, visual system, social media pieces, promotional mockups and a full brand proposal.', es:'Identidad de marca completa para Gerald Shop, una agencia de envíos que ayuda a clientes en Nicaragua a comprar productos de Estados Unidos. El proyecto incluye el logo, sistema visual, piezas para redes sociales, mockups promocionales y una propuesta de marca completa.'},
    technologies:['Canva','Illustrator','Photoshop','PowerPoint'],
    file:'assets/img/GeraldShop/Propuesta%20de%20Marca%20Gerald%20Shop.pptx',
    fileLabel:{en:'Download brand proposal',es:'Descargar propuesta de marca'},
    bullets:{en:['Logo and visual identity design','Brand colors, typography and logo variants','Social media content and promotional pieces','Shipping, packaging and apparel mockups'],es:['Diseño de logo e identidad visual','Colores, tipografías y variantes del logo','Contenido para redes sociales y piezas promocionales','Mockups de envíos, empaques y prendas']}
  },
  {
    title:{en:'Weekly Sales Performance Automation', es:'Automatización de Rendimiento Semanal de Ventas'},
    images:[{src:'assets/img/Marry Me/gmail data weekly.png', alt:'Automated weekly sales performance report'}],
    desc:{en:'Weekly sales performance report automated with Google Apps Script. It consolidates data from BigQuery and HubSpot and distributes the updated report through Gmail.', es:'Reporte semanal de rendimiento de ventas automatizado con Google Apps Script. Consolida datos de BigQuery y HubSpot y distribuye el reporte actualizado por Gmail.'},
    technologies:['Google Apps Script','BigQuery','HubSpot','Gmail'],
    bullets:{en:['Automated extraction and processing with Google Apps Script','BigQuery and HubSpot data integration','Weekly report delivery through Gmail','Week-over-week KPI comparison'],es:['Extracción y procesamiento automatizados con Google Apps Script','Integración de datos de BigQuery y HubSpot','Envío semanal del reporte mediante Gmail','Comparación de KPIs contra la semana anterior']}
  },
  {
    title:{en:'Junk Rescue Monthly Marketing Performance', es:'Rendimiento Mensual de Marketing de Junk Rescue'},
    images:[{src:'assets/img/Junk Rescue/view1.png', alt:'Junk Rescue monthly marketing performance dashboard'}],
    desc:{en:'Monthly marketing data dashboard for Junk Rescue. It centralizes Excel and Vonigo CRM data to evaluate spend, leads, cost per lead and conversions by source.', es:'Dashboard mensual de datos de marketing para Junk Rescue. Centraliza información de Excel y del CRM Vonigo para evaluar inversión, leads, costo por lead y conversiones por fuente.'},
    technologies:['Excel','Vonigo CRM','Power BI','Marketing Analytics'],
    bullets:{en:['Monthly marketing performance update','Excel and Vonigo CRM data sources','Spend and leads analysis by source','Cost-per-lead and call conversion monitoring'],es:['Actualización mensual del rendimiento de marketing','Fuentes de datos Excel y CRM Vonigo','Análisis de inversión y leads por fuente','Monitoreo de costo por lead y conversión de llamadas']}
  },
  {
    title:{en:'WashBunny Car Wash', es:'Autolavado WashBunny'},
    images:[
      {src:'assets/img/WashBunny/view1.png', alt:'WashBunny dashboard - view 1'},
      {src:'assets/img/WashBunny/view2.png', alt:'WashBunny dashboard - view 2'},
      {src:'assets/img/WashBunny/view3.png', alt:'WashBunny dashboard - view 3'}
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
  showCarouselImage(activeImageIndex + step);
  openLightbox();
}

function openProject(index){
  activeProjectIndex = index;
  const project = projects[index];
  document.getElementById('modalTitle').textContent = project.title[currentLang];
  document.getElementById('modalDesc').textContent = project.desc[currentLang];
  document.getElementById('modalTechnical').textContent = translations[currentLang].technical;
  activeImages = project.images;
  activeImageIndex = 0;
  const gallery = document.getElementById('modalGallery');
  gallery.hidden = project.images.length === 0;
  gallery.innerHTML = project.images.length ? `
    <div class="carousel-stage">
      <img class="carousel-image" id="carouselImage" src="${project.images[0].src}" alt="${project.images[0].alt}">
      <button class="carousel-nav prev" type="button" aria-label="Previous image">‹</button>
      <button class="carousel-nav next" type="button" aria-label="Next image">›</button>
      <span class="carousel-counter" id="carouselCounter">1 / ${project.images.length}</span>
      <button class="carousel-zoom" type="button">🔍 ${currentLang === 'en' ? 'Zoom' : 'Ampliar'}</button>
    </div>
    <div class="carousel-thumbs">
      ${project.images.map((image, i) => `<button class="carousel-thumb${i === 0 ? ' active' : ''}" type="button" data-index="${i}" aria-label="Image ${i + 1}"><img src="${image.src}" alt=""></button>`).join('')}
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

let savedLang = 'en';
try { savedLang = localStorage.getItem('portfolio-lang') || 'en'; } catch(error) {}
setLang(savedLang === 'es' ? 'es' : 'en', false);
