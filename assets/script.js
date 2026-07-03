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
  typeHero('es', true);

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
    proj_desc:"Click \"View dashboard\" for a preview of each project.",
    proj1_tag:"Business Intelligence", proj1_h:"BI Reports for INETER",
    proj1_p:"Relational data modeling and reports in Power BI Report Server built from SQL queries on PostgreSQL, with KPIs calculated in DAX for internal analysis.",
    proj2_tag:"ETL &amp; Dashboards", proj2_h:"Multi-CRM panel at Algoritmia",
    proj2_p:"Integration of data from six different platforms (Vonigo, ADP, Google Ads, among others) into BigQuery, with dashboards in Power BI and Looker Studio for client metric tracking.",
    proj3_tag:"Research", proj3_h:"Apple ecosystem &amp; social preference",
    proj3_p:"Research on the psychosocial factors influencing preference for the Apple ecosystem, awarded 1st place at the UAM 2024 Junior Researchers Conference.",
    chip_analisis:"Data analysis", chip_invest:"Research",
    proj_btn:"View dashboard",
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
    kg_cta1:"Request a quote", kg_cta2:"Message me on WhatsApp",
    kg_note:"*Sample services — tell me more about your venture and I'll tailor them.",
    contact_eyebrow:"contact", contact_title:"Let's build your next dashboard?",
    contact_desc:"I'm available for internships and freelance data analysis / BI projects. Write to me, this bunny replies fast 🐇.",
    footer_text:"Made with 🐰 and lots of coffee · Kristel Villalta © 2026"
  };

  let currentLang = 'es';
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
  }
  document.getElementById('langBtn').addEventListener('click', () => setLang(currentLang === 'es' ? 'en' : 'es'));

  // ---------- project modal ----------
  const projects = [
    {
      tag: {es:"Business Intelligence", en:"Business Intelligence"},
      title: {es:"Reportes BI para INETER", en:"BI Reports for INETER"},
      images: [
        {src:"assets/img/dashboard-ineter-1.png", alt:"Dashboard INETER - vista 1"},
        {src:"assets/img/dashboard-ineter-2.png", alt:"Dashboard INETER - vista 2"},
        {src:"assets/img/dashboard-ineter-3.png", alt:"Dashboard INETER - vista 3"}
      ],
      desc: {
        es:"Modelado de datos relacional y reportes en Power BI Report Server a partir de consultas SQL sobre PostgreSQL, con KPIs calculados en DAX para análisis interno.",
        en:"Relational data modeling and reports in Power BI Report Server built from SQL queries on PostgreSQL, with KPIs calculated in DAX for internal analysis."
      },
      kpis: [
        {n:"SQL", l:{es:"consultas", en:"queries"}},
        {n:"DAX", l:{es:"KPIs", en:"KPIs"}},
        {n:"PBI", l:{es:"reportes", en:"reports"}}
      ],
      bullets: {
        es:["Extracción y limpieza de datos con consultas SQL en PostgreSQL","Modelos relacionales para análisis interno","Reportes publicados en Power BI Report Server","KPIs calculados mediante fórmulas DAX"],
        en:["Data extraction and cleaning with SQL queries on PostgreSQL","Relational models for internal analysis","Reports published on Power BI Report Server","KPIs calculated using DAX formulas"]
      }
    },
    {
      tag: {es:"ETL & Dashboards", en:"ETL & Dashboards"},
      title: {es:"Panel multi-CRM en Algoritmia", en:"Multi-CRM panel at Algoritmia"},
      images: [
        {src:"assets/img/dashboard-algoritmia-1.png", alt:"Panel multi-CRM - vista 1"},
        {src:"assets/img/dashboard-algoritmia-2.png", alt:"Panel multi-CRM - vista 2"},
        {src:"assets/img/dashboard-algoritmia-3.png", alt:"Panel multi-CRM - vista 3"}
      ],
      desc: {
        es:"Integración de datos de seis plataformas distintas en BigQuery, con dashboards en Power BI y Looker Studio para seguimiento de métricas de clientes.",
        en:"Integration of data from six different platforms into BigQuery, with dashboards in Power BI and Looker Studio for client metric tracking."
      },
      kpis: [
        {n:"6", l:{es:"fuentes CRM", en:"CRM sources"}},
        {n:"BQ", l:{es:"BigQuery", en:"BigQuery"}},
        {n:"2", l:{es:"herramientas BI", en:"BI tools"}}
      ],
      bullets: {
        es:["Estructuras de datos escalables en Google BigQuery","ETL desde Vonigo, ADP, Google Ads, Local Services, Bloom y Wonolo","Dashboards estratégicos en Power BI y Looker Studio","Monitoreo semanal y mensual de métricas de clientes"],
        en:["Scalable data structures in Google BigQuery","ETL from Vonigo, ADP, Google Ads, Local Services, Bloom and Wonolo","Strategic dashboards in Power BI and Looker Studio","Weekly and monthly client metric monitoring"]
      }
    },
    {
      tag: {es:"Investigación", en:"Research"},
      title: {es:"Ecosistema Apple & preferencia social", en:"Apple ecosystem & social preference"},
      images: [
        {src:"assets/img/dashboard-investigacion-1.png", alt:"Investigacion Apple - vista 1"},
        {src:"assets/img/dashboard-investigacion-2.png", alt:"Investigacion Apple - vista 2"},
        {src:"assets/img/dashboard-investigacion-3.png", alt:"Investigacion Apple - vista 3"}
      ],
      desc: {
        es:"Investigación sobre los factores psicosociales que influyen en la preferencia por el ecosistema Apple, ganadora del 1er lugar en la Jornada de Investigadores Junior UAM 2024.",
        en:"Research on the psychosocial factors influencing preference for the Apple ecosystem, awarded 1st place at the UAM 2024 Junior Researchers Conference."
      },
      kpis: [
        {n:"#1", l:{es:"lugar UAM", en:"place UAM"}},
        {n:"2024", l:{es:"jornada", en:"conference"}},
        {n:"BI", l:{es:"análisis", en:"analysis"}}
      ],
      bullets: {
        es:["Diseño de encuesta y recolección de datos","Análisis estadístico de factores psicosociales","Presentación de hallazgos ante jurado académico","1er lugar en la Jornada de Investigadores Junior UAM"],
        en:["Survey design and data collection","Statistical analysis of psychosocial factors","Findings presentation to an academic panel","1st place at the UAM Junior Researchers Conference"]
      }
    }
  ];

  const modal = document.getElementById('projectModal');
  function openProject(i){
    const p = projects[i];
    document.getElementById('modalTag').textContent = p.tag[currentLang];
    document.getElementById('modalTitle').textContent = p.title[currentLang];
    document.getElementById('modalDesc').textContent = p.desc[currentLang];
    document.getElementById('modalDashLabel').textContent = currentLang === 'es' ? '// vista previa ilustrativa del dashboard' : '// illustrative dashboard preview';
    document.getElementById('modalStackH').textContent = currentLang === 'es' ? 'Aspectos técnicos' : 'Technical highlights';
    const gallery = document.getElementById('modalGallery');
    gallery.innerHTML = p.images.map(img => `<img src="${img.src}" alt="${img.alt}" onerror="this.remove()">`).join('');
    gallery.querySelectorAll('img').forEach(img => {
      img.addEventListener('click', () => {
        const first = gallery.querySelector('img');
        if(!first || first === img) return;
        const firstSrc = first.src;
        const firstAlt = first.alt;
        first.src = img.src;
        first.alt = img.alt;
        img.src = firstSrc;
        img.alt = firstAlt;
      });
    });
    const kpiWrap = document.getElementById('modalKpis');
    kpiWrap.innerHTML = p.kpis.map(k => `<div class="dash-kpi"><div class="num">${k.n}</div><div class="lbl">${k.l[currentLang]}</div></div>`).join('');
    const ul = document.getElementById('modalBullets');
    ul.innerHTML = p.bullets[currentLang].map(b => `<li>${b}</li>`).join('');
    modal.classList.add('open');
  }
  function closeProject(){ modal.classList.remove('open'); }
  modal.addEventListener('click', (e) => { if(e.target === modal) closeProject(); });
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeProject(); });
