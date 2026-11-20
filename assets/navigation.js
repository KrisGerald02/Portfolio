// Floating bottom navigation (pill buttons with icon + label) and progressive motion for every portfolio page.
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const source = document.getElementById('navMenu');
  if (source) buildDock(source);

  function buildDock(nav) {
    const isEs = () => document.documentElement.lang === 'es';
    const t = (es, en) => (isEs() ? es : en);
    const svg = path => `<span class="dock-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${path}</svg></span>`;
    const icons = {
      home: svg('<path d="M4 10.5 12 4l8 6.5"/><path d="M6 9v10.5h4.5V15h3v4.5H18V9"/>'),
      about: svg('<circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5"/>'),
      skills: svg('<path d="m8.5 8-4 4 4 4"/><path d="m15.5 8 4 4-4 4"/><path d="m13.5 5-3 14"/>'),
      projects: svg('<rect x="3.5" y="7.5" width="17" height="12" rx="2.5"/><path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5"/><path d="M3.5 12.5h17"/>'),
      kgtech: svg('<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9 9h6v6H9z"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/>'),
      contact: svg('<rect x="3.5" y="5.5" width="17" height="13" rx="2.5"/><path d="m4.5 7 7.5 6 7.5-6"/>')
    };
    const iconFor = href => {
      const hash = (href.split('#')[1] || '').toLowerCase();
      if (hash === 'sobre') return icons.about;
      if (hash === 'skills') return icons.skills;
      if (hash === 'kgtech') return icons.kgtech;
      if (hash === 'contacto') return icons.contact;
      return icons.home;
    };
    // Put the icon next to the text, and move data-i18n onto the text so translations don't erase the icon.
    const decorate = (el, icon) => {
      let label = el.querySelector('[data-i18n]');
      if (!label) {
        label = document.createElement('span');
        if (el.dataset.i18n) { label.dataset.i18n = el.dataset.i18n; el.removeAttribute('data-i18n'); }
        label.textContent = el.textContent.trim();
        el.textContent = '';
        el.append(label);
      }
      label.classList.add('dock-label');
      el.insertAdjacentHTML('afterbegin', icon);
    };

    const onIndex = !!document.getElementById('hero');
    const home = document.createElement('a');
    home.href = onIndex ? '#hero' : 'index.html';
    home.dataset.dockHome = '';
    home.innerHTML = '<span class="dock-label"></span>';
    nav.prepend(home);
    Array.from(nav.children).forEach(child => {
      if (child === home) return home.insertAdjacentHTML('afterbegin', icons.home);
      if (child.matches('a')) decorate(child, iconFor(child.getAttribute('href')));
      if (child.matches('.nav-dropdown')) decorate(child.querySelector('.nav-dropdown-toggle'), icons.projects);
    });

    // The language switch becomes the last pill of the bar, like the reference; the old hamburger is no longer needed.
    const langBtn = document.getElementById('langBtn');
    if (langBtn) nav.append(langBtn);
    const oldToggle = document.getElementById('navToggle');
    if (oldToggle) oldToggle.remove();

    nav.classList.remove('category-nav');
    nav.classList.add('dock');
    const wrap = document.createElement('div');
    wrap.className = 'dock-wrap';
    wrap.append(nav);
    document.body.append(wrap);

    const pills = () => Array.from(nav.querySelectorAll(':scope > a, :scope > .nav-dropdown > .nav-dropdown-toggle'));
    function syncLabels() {
      home.querySelector('.dock-label').textContent = t('Inicio', 'Home');
      nav.setAttribute('aria-label', t('Navegación principal', 'Main navigation'));
      pills().forEach(el => {
        const text = el.querySelector('.dock-label').textContent.trim();
        el.title = text;
        el.setAttribute('aria-label', text);
      });
      if (langBtn) {
        langBtn.dataset.short = isEs() ? 'EN' : 'ES';
        langBtn.title = t('Cambiar idioma a inglés', 'Switch language to Spanish');
        langBtn.setAttribute('aria-label', langBtn.title);
      }
    }
    // Translations run after this script on some pages, so wait one frame before reading labels.
    requestAnimationFrame(syncLabels);
    new MutationObserver(() => requestAnimationFrame(syncLabels)).observe(document.documentElement, {attributes: true, attributeFilter: ['lang']});

    // Active pill.
    const dropdown = nav.querySelector('.nav-dropdown');
    const setActive = el => {
      nav.querySelectorAll(':scope > a').forEach(a => {
        a.classList.toggle('is-active', a === el);
        if (a === el) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
      });
      if (dropdown) dropdown.classList.toggle('is-active', el === dropdown);
    };
    if (!onIndex) {
      // Category pages live under "Proyectos".
      setActive(dropdown && dropdown.querySelector('[aria-current="page"]') ? dropdown : null);
      return;
    }
    const targets = [['hero', home]];
    nav.querySelectorAll(':scope > a[href^="#"]').forEach(a => targets.push([a.getAttribute('href').slice(1), a]));
    if (dropdown) targets.push(['proyectos', dropdown]);
    const sections = targets.map(([id, el]) => [document.getElementById(id), el]).filter(([section]) => section)
      .sort((a, b) => (a[0].compareDocumentPosition(b[0]) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
    let ticking = false;
    const update = () => {
      ticking = false;
      const line = window.innerHeight * 0.35;
      let current = sections[0];
      sections.forEach(entry => { if (entry[0].getBoundingClientRect().top <= line) current = entry; });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = sections.find(([s]) => s.id === 'contacto') || current;
      setActive(current ? current[1] : null);
    };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, {passive: true});
    window.addEventListener('resize', update);
    update();
    home.addEventListener('click', event => {
      event.preventDefault();
      history.pushState(null, '', location.pathname);
      window.scrollTo({top: 0, behavior: reduced.matches ? 'auto' : 'smooth'});
    });
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
    const target = Array.from(document.querySelectorAll('header a, header button')).find(el => el.offsetParent !== null);
    if (target) target.focus({preventScroll: true});
  });
  update();
})();

// When arriving with #section in the URL (for example "Volver al inicio" → #proyectos),
// jump there again once fonts, images and the entrance screen are done, so late layout shifts don't leave you elsewhere.
(() => {
  if (!location.hash) return;
  const jump = () => {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) target.scrollIntoView({block: 'start'});
  };
  if (document.getElementById('siteLauncher')) document.addEventListener('portfolio-ready', jump, {once: true});
  if (document.readyState === 'complete') jump(); else window.addEventListener('load', jump, {once: true});
})();
