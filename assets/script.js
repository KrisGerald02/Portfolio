// ---------- mobile nav ----------
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  navToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
  navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navMenu.classList.remove('open')));

  // ---------- hero typewriter (bilingual) ----------
  const typedEl = document.getElementById('typed');
  const heroTexts = {
    es: `> whoami
Ingeniera en Sistemas de Información
> especialidad
Bases de datos + Business Intelligence
> status
Lista para el próximo reto 🐇`,
    en: `> whoami
Systems Information Engineer
> specialty
Databases + Business Intelligence
> status
Ready for the next challenge 🐇`
  };
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let typingTimer = null;
  function typeHero(lang, animate){
    clearTimeout(typingTimer);
    const fullText = heroTexts[lang];
    if(prefersReduced || !animate){ typedEl.textContent = fullText; return; }
    let i = 0;
    function typeChar(){
      if(i <= fullText.length){
        typedEl.textContent = fullText.slice(0, i);
        i++;
        typingTimer = setTimeout(typeChar, 22);
      }
    }
    typeChar();
  }
  // ---------- i18n ----------
  const enDict = {
    nav_sobre:"About", nav_skills:"Skills", nav_terminal:"Terminal", nav_experiencia:"Experience",
    nav_proyectos:"Projects", nav_logros:"Achievements", nav_kgtech:"KG Tech", nav_contacto:"Contact",
    cv_btn:"Contact me",
    hero_eyebrow:"available for internships &amp; freelance projects",
    hero_title:'Hi, I\'m Kristel <span class="accent">🐰</span><br>I turn data into <span class="accent">decisions</span>.',
    hero_role:"Systems Information Engineering student, focused on database administration and data visualization with Power BI, Looker Studio and SQL. Managua, Nicaragua.",
    cta_primary:"View projects →", cta_ghost:"Let's talk",
    tbl_campo:"field", tbl_valor:"value", tbl_nombre_k:"name", tbl_uni_k:"university",
    tbl_enfoque_k:"focus", tbl_enfoque_v:"Databases &amp; BI", tbl_ubi_k:"location",
    tbl_footer:"1 row affected · 0.02s",
    sobre_eyebrow:"about me", sobre_title:"From raw data to a dashboard people actually understand",
    sobre_p1:"I'm a 3rd-year <strong>Systems Information Engineering</strong> student at UAM. I specialize in <strong>database administration</strong> (PostgreSQL, SQL Server, Oracle, BigQuery) and turning that data into <strong>reports and dashboards</strong> with Power BI and Looker Studio that support decision-making.",
    sobre_p2:"I've worked cleaning and modeling data, writing SQL queries, designing KPIs with DAX, and automating ETL processes from platforms like Google Ads, ADP and various CRMs. I love finding the insight hiding among thousands of rows.",
    sobre_p3:"Outside of data analysis, I also explore mobile development (Swift, Kotlin) and enjoy innovation challenges: two first places in my university's research and innovation events prove it 🐇.",
    skills_eyebrow:"tech stack", skills_title:"Tools I work with",
    skills_desc:"From the database to the final dashboard, this is the path I follow with data.",
    skill_h1:"🗄️ Databases", skill_h2:"📊 BI &amp; Visualization", skill_h3:"💻 Programming", skill_h4:"🧠 Other skills",
    chip_equipo:"Teamwork", chip_com:"Communication", chip_idiomas:"Spanish / English",
    term_eyebrow:"interactive", term_title:"Ask my terminal 🐾",
    term_desc:"Type a command and press Enter. Try <code class=\"mono\">help</code>.",
    term_placeholder:"type 'help'…",
    term_hint:"Commands: <code>help</code> · <code>whoami</code> · <code>skills</code> · <code>experiencia</code> · <code>proyectos</code> · <code>logros</code> · <code>kgtech</code> · <code>contacto</code> · <code>sudo abraza-conejo</code> · <code>clear</code>",
    exp_eyebrow:"experience", exp_title:"Where this bunny has hopped 🐇",
    exp1_h:"Junior Data Analyst Intern", exp1_meta:"Algoritmia · May – November 2026",
    exp1_l1:"Administration and creation of data structures in Google BigQuery for a scalable analytics environment.",
    exp1_l2:"ETL processes from multiple CRM platforms: Vonigo, ADP, Google Ads, Local Services, Bloom and Wonolo.",
    exp1_l3:"Development of advanced dashboards in Power BI and Looker Studio, turning raw data into strategic visualizations.",
    exp1_l4:"Monitoring weekly and monthly performance metrics for clients.",
    exp2_h:"BI Developer Intern", exp2_meta:"INETER · January – March 2026",
    exp2_l1:"SQL queries in PostgreSQL for data extraction and cleaning.",
    exp2_l2:"Design of reports in Power BI Report Server for internal analysis.",
    exp2_l3:"Creation of relational models and DAX formulas for KPIs.",
    proj_eyebrow:"projects", proj_title:"Featured work",
    proj_desc:"Click \"View project\" for a preview of each work.",
    proj1_hi:"River Monitoring System in Nicaragua",
    proj1_des:"Dashboard dedicated to identifying historical overflow patterns, enabling the auditing of reading records and temporal analysis by station.",
    proj2_hello:"VetPlus 2026 Historical Analysis",
    proj2_p:"Dashboard for operational sales monitoring in the veterinary and supermarket sectors. This solution provides traceability throughout the sales cycle, from customer geolocation to detailed analysis of sales force performance and product inventory.",
    proj3_ho:"Elite Marry Me Profit Analysis",
    proj3_p:"This dashboard enables the tracking of business proposals and revenue performance.",
    chip_powerBI:"Power BI", chip_soread:"Spreadsheets", chip_analisi:"Power BI", chip_invet:"Looker Studio", chip_big:"BigQuery", chip_spread:"Spreadsheets",
    chip_analisis:"UI design", chip_invest:"Services", chip_ui:"UI design", chip_management:"Management", chip_mobile:"Mobile",
    proj_btn:"View project",
    logros_eyebrow:"achievements", logros_title:"Recognition",
    badge1_h:"1st place · Junior Researchers Conference", badge1_p:"UAM, 2024 — research on preference for the Apple ecosystem.",
    badge2_h:"1st place UAM campus · Social Innovation", badge2_p:'Representative at the "Nicaragua Innova 2024" National Innovation Rally.',
    badge3_h:"Nicaragua Innova 2024 Recognition", badge3_p:"National Commission for Creative Economy, for outstanding participation.",
    edu_eyebrow:"education", edu_title:"Education", edu_actual:"Present",
    edu1_h:"Systems Information Engineering",
    edu2_h:"iOS Mobile App Development Diploma",
    edu3_h:"Arduino Platform Training", edu3_p:"Universidad Americana (UAM) · 48 hours",
    edu4_h:"Microcomputer Operator / Advanced Excel",
    edu5_h:"Bilingual, English Language", edu5_p:"English Language Institute (ANS)",
    edu6_h:"High School Diploma, Sciences and Humanities",
    kg_title:"KG Tech · Digital Solutions",
    kg_tagline:"My data solutions venture: dashboards, databases and report automation so your business makes better decisions, faster.",
    kg_s1_h:"Dashboards &amp; BI", kg_s1_p:"Design of interactive dashboards in Power BI and Looker Studio tailored to your KPIs.",
    kg_s2_h:"Database Administration", kg_s2_p:"Design, modeling and maintenance in PostgreSQL, SQL Server, Oracle and BigQuery.",
    kg_s3_h:"Report Automation (ETL)", kg_s3_p:"Connecting and cleaning data from multiple sources for always up-to-date reports.",
    kg_s4_h:"Data Consulting", kg_s4_p:"Support for small businesses looking to start using their data to their advantage.",
    kg_cta1:"Request a quote", kg_cta2:"Request a quote", kg_cta3:"Visit my website",
    kg_note:"*Sample services — tell me more about your venture and I'll tailor them.",
    contact_eyebrow:"contact", contact_title:"Let's build your next dashboard?",
    contact_desc:"I'm available for internships and freelance data analysis / BI projects. Write to me, this bunny replies fast 🐇.",
    footer_text:"Made with 🐰 and lots of coffee ·"
  };

  let currentLang = 'en';
  let activeProjectIndex = null;
  const esCache = {};
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    esCache[key] = el.innerHTML;
  });
  const esPlaceholders = {};
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    esPlaceholders[key] = el.getAttribute('placeholder');
  });

  function setLang(lang){
    currentLang = lang;
    document.getElementById('htmlRoot').lang = lang;
    document.getElementById('langLabel').textContent = lang === 'es' ? 'EN' : 'ES';
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.innerHTML = lang === 'en' ? (enDict[key] || esCache[key]) : esCache[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.setAttribute('placeholder', lang === 'en' ? (enDict[key] || esPlaceholders[key]) : esPlaceholders[key]);
    });
    typeHero(lang, false);
    if(activeProjectIndex !== null) openProject(activeProjectIndex);
  }
  document.getElementById('langBtn').addEventListener('click', () => setLang(currentLang === 'es' ? 'en' : 'es'));
  setLang('en');

  // ---------- project modal ----------
  const projects = [
    {
      tag: {es:"Business Intelligence", en:"Business Intelligence"},
      title: {es:"Sistema de Monitoreo de Ríos en Nicaragua", en:"River Monitoring System in Nicaragua"},
      images: [
        {src:"assets/img/INETER/view1.png", alt:"Dashboard INETER - vista 1"},
        {src:"assets/img/INETER/view2.png", alt:"Dashboard INETER - vista 2"},
        {src:"assets/img/INETER/view3.png", alt:"Dashboard INETER - vista 3"},
        {src:"assets/img/INETER/view4.png", alt:"Dashboard INETER - vista 4"},
        {src:"assets/img/INETER/view5.png", alt:"Dashboard INETER - vista 5"}
      ],
      desc: {
        es:"Panel dedicado a la identificación de patrones históricos en desbordamientos, facilitando la auditoría de registros de lectura y el análisis temporal por estación.",
        en:"Dashboard dedicated to identifying historical overflow patterns, enabling the auditing of reading records and temporal analysis by station."
      },
      kpis: [
        {n:"SQL", l:{es:"consultas", en:"queries"}},
        {n:"DAX", l:{es:"KPIs", en:"KPIs"}},
        {n:"PBI", l:{es:"reportes", en:"reports"}}
      ],
      bullets: {
        es:["Integración de geovisores (claro y satelital) para el despliegue dinámico de estaciones a nivel nacional","Tablero de control","Visualización de tendencias de desbordamiento","Control de niveles de alerta"],
        en:["Integration of standard and satellite geoviewers for the dynamic display of stations nationwide","Control dashboard","Overflow trend visualization","Alert level monitoring"]
      }
    },
    {
      tag: {es:"Aplicación móvil", en:"Mobile app"},
      title: {es:"Análisis Histórico 2026 VetPlus", en:"VetPlus 2026 Historical Analysis"},
      images: [
        {src:"assets/img/VetPlus/view1.png", alt:"VetPlus - vista 1"},
        {src:"assets/img/VetPlus/view2.png", alt:"VetPlus - vista 2"},
        {src:"assets/img/VetPlus/view3.png", alt:"VetPlus - vista 3"},
        {src:"assets/img/VetPlus/view4.png", alt:"VetPlus - vista 4"}
      ],
      desc: {
        es:"Dashboard para el monitoreo operativo de ventas en el sector de veterinarias y supermercados. Esta solución permite la trazabilidad del ciclo de ventas, desde la geolocalización de clientes hasta el análisis detallado del desempeño de la fuerza de ventas y el inventario de productos.",
        en:"Dashboard for operational sales monitoring in the veterinary and supermarket sectors. This solution provides traceability throughout the sales cycle, from customer geolocation to detailed analysis of sales force performance and product inventory."
      },
      kpis: [
        {n:"4", l:{es:"vistas", en:"views"}},
        {n:"UI", l:{es:"diseño", en:"design"}},
        {n:"Vet", l:{es:"gestión", en:"management"}}
      ],
      bullets: {
        es:["KPIs de rendimiento","Geovisualización","Análisis multidimensional de producto"],
        en:["Performance KPIs","Geovisualization","Multidimensional product analysis"]
      }
    },
    {
      tag: {es:"Aplicación móvil", en:"Mobile app"},
      title: {es:"Análisis de Ganancias Elite Marry Me", en:"Elite Marry Me Profit Analysis"},
      images: [
        {src:"assets/img/Marry Me/view1.png", alt:"Elite Marry Me - vista 1"},
        {src:"assets/img/Marry Me/view2.png", alt:"Elite Marry Me - vista 2"}
      ],
      desc: {
        es:"Este dashboard permite el seguimiento de propuestas de negocio y rendimiento de ingresos.",
        en:"This dashboard enables the tracking of business proposals and revenue performance."
      },
      kpis: [
        {n:"2", l:{es:"vistas", en:"views"}},
        {n:"UX", l:{es:"experiencia", en:"experience"}},
        {n:"VIP", l:{es:"servicios", en:"services"}}
      ],
      bullets: {
        es:["Análisis de rendimiento comercial","Análisis de rendimiento comercial","Atribución de canales de venta"],
        en:["Commercial performance analysis","Commercial performance analysis","Sales channel attribution"]
      }
    }
  ];

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
  function openProject(i){
    activeProjectIndex = i;
    const p = projects[i];
    document.getElementById('modalTitle').textContent = p.title[currentLang];
    document.getElementById('modalDesc').textContent = p.desc[currentLang];
    document.getElementById('modalDashLabel').textContent = currentLang === 'es' ? '// vista previa ilustrativa del dashboard' : '// illustrative dashboard preview';
    document.getElementById('modalStackH').textContent = currentLang === 'es' ? 'Aspectos técnicos' : 'Technical highlights';
    const gallery = document.getElementById('modalGallery');
    const images = p.images || [];
    activeImages = images;
    activeImageIndex = 0;
    gallery.hidden = images.length === 0;
    gallery.innerHTML = images.length ? `
      <div class="carousel-stage">
        <img class="carousel-image" id="carouselImage" src="${images[0].src}" alt="${images[0].alt}">
        <button class="carousel-nav prev" type="button" aria-label="Imagen anterior">‹</button>
        <button class="carousel-nav next" type="button" aria-label="Imagen siguiente">›</button>
        <span class="carousel-counter" id="carouselCounter">1 / ${images.length}</span>
        <button class="carousel-zoom" type="button" aria-label="Ampliar imagen">🔍 ${currentLang === 'es' ? 'Ampliar' : 'Zoom'}</button>
      </div>
      <div class="carousel-thumbs" aria-label="Miniaturas">
        ${images.map((img, index) => `<button class="carousel-thumb${index === 0 ? ' active' : ''}" type="button" data-index="${index}" aria-label="Ver imagen ${index + 1}"><img src="${img.src}" alt=""></button>`).join('')}
      </div>` : '';
    document.querySelector('.dash-preview').hidden = images.length > 0;
    if(images.length){
      gallery.querySelector('.carousel-nav.prev').addEventListener('click', () => showCarouselImage(activeImageIndex - 1));
      gallery.querySelector('.carousel-nav.next').addEventListener('click', () => showCarouselImage(activeImageIndex + 1));
      gallery.querySelector('.carousel-image').addEventListener('click', openLightbox);
      gallery.querySelector('.carousel-zoom').addEventListener('click', openLightbox);
      gallery.querySelectorAll('.carousel-thumb').forEach(thumb => thumb.addEventListener('click', () => showCarouselImage(Number(thumb.dataset.index))));
    }
    const kpiWrap = document.getElementById('modalKpis');
    kpiWrap.innerHTML = p.kpis.map(k => `<div class="dash-kpi"><div class="num">${k.n}</div><div class="lbl">${k.l[currentLang]}</div></div>`).join('');
    const ul = document.getElementById('modalBullets');
    ul.innerHTML = p.bullets[currentLang].map(b => `<li>${b}</li>`).join('');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeProject(){ activeProjectIndex = null; modal.classList.remove('open'); lightbox.classList.remove('open'); document.body.style.overflow = ''; }
  modal.addEventListener('click', (e) => { if(e.target === modal) closeProject(); });
  document.getElementById('lightboxClose').addEventListener('click', () => lightbox.classList.remove('open'));
  document.getElementById('lightboxPrev').addEventListener('click', () => moveLightbox(-1));
  document.getElementById('lightboxNext').addEventListener('click', () => moveLightbox(1));
  lightbox.addEventListener('click', (e) => { if(e.target === lightbox) lightbox.classList.remove('open'); });
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') lightbox.classList.contains('open') ? lightbox.classList.remove('open') : closeProject();
    if((modal.classList.contains('open') || lightbox.classList.contains('open')) && e.key === 'ArrowLeft') lightbox.classList.contains('open') ? moveLightbox(-1) : showCarouselImage(activeImageIndex - 1);
    if((modal.classList.contains('open') || lightbox.classList.contains('open')) && e.key === 'ArrowRight') lightbox.classList.contains('open') ? moveLightbox(1) : showCarouselImage(activeImageIndex + 1);
  });
