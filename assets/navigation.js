// Floating bottom navigation (pill buttons with icon + label) and progressive motion for every portfolio page.
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const source = document.getElementById('navMenu');
  if (source) buildDock(source);

  // Social links in the top-right corner of every page. Leave a URL empty to hide that icon.
  function buildSocials() {
    const links = [
      {name: 'GitHub', url: 'https://github.com/KrisGerald02', icon: '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>'},
      {name: 'LinkedIn', url: 'https://www.linkedin.com/in/kristel-villalta/', icon: '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 11v5M8 8v.01M12 16v-5M16 16v-3a2 2 0 0 0-4 0"/>'},
      {name: 'WhatsApp', url: 'https://wa.me/50576935552', icon: '<path d="m3 21 1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>'}
    ];
    const bar = document.createElement('div');
    bar.className = 'socials';
    links.filter(link => link.url).forEach(link => {
      const a = document.createElement('a');
      a.href = link.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.title = link.name;
      a.setAttribute('aria-label', link.name);
      a.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${link.icon}</svg>`;
      bar.append(a);
    });
    document.body.prepend(bar);
  }

  // Bottom bar with four views (About me, Projects, Services, Contact) plus the language switch.
  // On the home page each pill shows only its view; on the category pages the pills link back to home.
  function buildDock(oldNav) {
    const isEs = () => document.documentElement.lang === 'es';
    const svg = path => `<span class="dock-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${path}</svg></span>`;
    const items = [
      {view: 'sobre', es: 'Sobre mí', en: 'About me', icon: svg('<circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5"/>')},
      {view: 'proyectos', es: 'Proyectos', en: 'Projects', icon: svg('<rect x="3.5" y="7.5" width="17" height="12" rx="2.5"/><path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5"/><path d="M3.5 12.5h17"/>')},
      {view: 'servicios', es: 'Servicios', en: 'Services', icon: svg('<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17"/><path d="M12 3.5c2.3 2.4 3.4 5.2 3.4 8.5s-1.1 6.1-3.4 8.5c-2.3-2.4-3.4-5.2-3.4-8.5s1.1-6.1 3.4-8.5Z"/>')},
      {view: 'contacto', es: 'Contacto', en: 'Contact', icon: svg('<rect x="3.5" y="5.5" width="17" height="13" rx="2.5"/><path d="m4.5 7 7.5 6 7.5-6"/>')}
    ];
    // Which view each home-page section belongs to.
    const sectionView = {hero: 'sobre', sobre: 'sobre', cv: 'sobre', skills: 'sobre', kgtech: 'sobre', proyectos: 'proyectos', servicios: 'servicios', contacto: 'contacto'};
    const onIndex = !!document.getElementById('hero');

    const nav = document.createElement('nav');
    nav.className = 'dock';
    items.forEach(item => {
      const a = document.createElement('a');
      a.href = (onIndex ? '' : 'index.html') + '#' + item.view;
      a.dataset.view = item.view;
      a.innerHTML = item.icon + '<span class="dock-label"></span>';
      item.el = a;
      nav.append(a);
    });
    const langBtn = document.getElementById('langBtn');
    if (langBtn) nav.append(langBtn);
    // The light/dark switch was removed; the site stays light. The top header is hidden.
    const themeBtn = document.getElementById('themeBtn');
    if (themeBtn) themeBtn.remove();
    const header = document.querySelector('body > header');
    if (header) header.hidden = true;
    buildSocials();
    // The old header menu and hamburger are replaced by the bar (their listeners are already attached, so removing is safe).
    oldNav.remove();
    const oldToggle = document.getElementById('navToggle');
    if (oldToggle) oldToggle.remove();
    const wrap = document.createElement('div');
    wrap.className = 'dock-wrap';
    wrap.append(nav);
    document.body.append(wrap);

    function syncLabels() {
      nav.setAttribute('aria-label', isEs() ? 'Navegación principal' : 'Main navigation');
      items.forEach(item => {
        const text = isEs() ? item.es : item.en;
        item.el.querySelector('.dock-label').textContent = text;
        item.el.title = text;
        item.el.setAttribute('aria-label', text);
      });
      if (langBtn) {
        langBtn.dataset.short = isEs() ? 'EN' : 'ES';
        langBtn.title = isEs() ? 'Cambiar idioma a inglés' : 'Switch language to Spanish';
        langBtn.setAttribute('aria-label', langBtn.title);
      }
    }
    syncLabels();
    new MutationObserver(syncLabels).observe(document.documentElement, {attributes: true, attributeFilter: ['lang']});

    const setActive = view => items.forEach(item => {
      const on = item.view === view;
      item.el.classList.toggle('is-active', on);
      if (on) item.el.setAttribute('aria-current', 'page'); else item.el.removeAttribute('aria-current');
    });

  // Entrance animation: when a view (or a category page) opens, each item waits hidden
  // and animates in only once it scrolls into the screen.
  const animItems = '#hero > div, .cv-card, .sec-head, .serv-tile, .serv-cta, .proj-cat, .tool, .skill-card, .contact-item, .contact-form, .about-text, .query-card, .proj-card, .kg-service, .kgtech-head, .tl-item';
  const animObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    let n = 0;
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.style.setProperty('--i', Math.min(n++, 12));
      el.classList.remove('anim-wait');
      el.classList.add('anim-in');
      animObserver.unobserve(el);
    });
  }, {threshold: 0.12, rootMargin: '0px 0px -30px 0px'}) : null;
  function animateIn(list) {
    if (reduced.matches || !animObserver) return;
    list.forEach(section => {
      section.querySelectorAll(animItems).forEach(el => {
        el.classList.remove('anim-in', 'reveal-ready');
        el.classList.add('anim-wait');
        animObserver.observe(el);
      });
    });
  }
  const whenReady = fn => {
    if (document.getElementById('siteLauncher')) document.addEventListener('portfolio-ready', fn, {once: true});
    else fn();
  };

    if (!onIndex) { setActive('proyectos'); whenReady(() => animateIn(document.querySelectorAll('main > section'))); return; }

    // Home page: show one view at a time, chosen by the URL hash.
    const sections = Object.keys(sectionView).map(id => document.getElementById(id)).filter(Boolean);
    sections.forEach(section => { section.dataset.view = sectionView[section.id]; });
    document.body.classList.add('has-views');
    const brand = document.querySelector('header .brand');
    function show(scroll) {
      const id = decodeURIComponent(location.hash.slice(1));
      const view = sectionView[id] || 'sobre';
      sections.forEach(section => section.classList.toggle('view-active', section.dataset.view === view));
      sections.forEach(section => section.classList.remove('view-first'));
      const first = sections.find(section => section.dataset.view === view);
      if (first) first.classList.add('view-first');
      setActive(view);
      if (scroll) animateIn(sections.filter(section => section.dataset.view === view));
      if (!scroll) return;
      const target = document.getElementById(id);
      // A pill opens its view from the top; links to a section inside a view (e.g. #skills) go to that section.
      if (target && id !== view) target.scrollIntoView({block: 'start'});
      else window.scrollTo({top: 0});
    }
    window.addEventListener('hashchange', () => show(true));
    show(false);
    whenReady(() => animateIn(sections.filter(section => section.classList.contains('view-active'))));
    if (brand) {
      brand.style.cursor = 'pointer';
      brand.addEventListener('click', () => { location.hash = 'sobre'; });
    }
  }

  // Reveal once on entry, using only opacity and translation (no blur or timers).
  if ('IntersectionObserver' in window && !reduced.matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      });
    }, {threshold: 0, rootMargin: '0px 0px -24px 0px'});
    const items = document.querySelectorAll('#hero > div, .category-hero, .skill-card, .proj-card, .tl-item, .kg-service, .query-card, .about-text, .kgtech-head, .contact-row');
    items.forEach(element => {
      element.classList.add('reveal-ready');
    });
    const startReveals = () => items.forEach(element => observer.observe(element));
    if (document.getElementById('siteLauncher')) document.addEventListener('portfolio-ready', startReveals, {once: true});
    else startReveals();
    reduced.addEventListener('change', () => {
      if (reduced.matches) {
        observer.disconnect();
        items.forEach(element => element.classList.add('reveal-visible'));
      }
    });
  }

})();

// Round arrow button that appears after scrolling down and returns to the top.
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'back-to-top';
  button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const label = () => {
    const text = document.documentElement.lang === 'es' ? 'Volver arriba' : 'Back to top';
    button.setAttribute('aria-label', text);
    button.title = text;
  };
  label();
  new MutationObserver(label).observe(document.documentElement, {attributes: true, attributeFilter: ['lang']});
  document.body.append(button);
  let ticking = false;
  const update = () => {
    ticking = false;
    const show = window.scrollY > Math.max(400, window.innerHeight * 0.6);
    button.classList.toggle('is-visible', show);
    button.tabIndex = show ? 0 : -1;
    button.setAttribute('aria-hidden', String(!show));
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, {passive: true});
  button.addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: reduced.matches ? 'auto' : 'smooth'});
    const target = Array.from(document.querySelectorAll('.dock a, .dock button')).find(el => el.offsetParent !== null);
    if (target) target.focus({preventScroll: true});
  });
  update();
})();

// When arriving with #section in the URL (for example "Volver al inicio" → #proyectos),
// jump there again once fonts, images and the entrance screen are done, so late layout shifts don't leave you elsewhere.
(() => {
  if (!location.hash) return;
  const jump = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    // On the home page a view name (#proyectos, #servicios…) opens that view from the top instead.
    if (document.body.classList.contains('has-views') && ['sobre', 'proyectos', 'servicios', 'contacto'].includes(id)) return;
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({block: 'start'});
  };
  if (document.getElementById('siteLauncher')) document.addEventListener('portfolio-ready', jump, {once: true});
  if (document.readyState === 'complete') jump(); else window.addEventListener('load', jump, {once: true});
})();

// CV buttons: if a PDF has not been uploaded yet, the button shows "Soon" instead of a broken download.
(() => {
  document.querySelectorAll('a[data-cv]').forEach(link => {
    fetch(link.getAttribute('href'), {method: 'HEAD', cache: 'no-store'})
      .then(res => { if (!res.ok) throw new Error(res.status); })
      .catch(() => {
        link.classList.add('cv-missing');
        link.setAttribute('aria-disabled', 'true');
        link.removeAttribute('download');
        link.addEventListener('click', event => event.preventDefault());
      });
  });
})();
