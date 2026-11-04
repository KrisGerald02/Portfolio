// Shared mobile navigation (same pattern as the KG Tech site) and progressive motion for every portfolio page.
(() => {
  const toggle = document.getElementById('navToggle');
  const source = document.getElementById('navMenu');
  if (!toggle || !source) return;
  const mobile = matchMedia('(max-width: 860px)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const langBtn = document.getElementById('langBtn');
  const themeBtn = document.getElementById('themeBtn');
  const isEs = () => document.documentElement.lang === 'es';
  const t = (es, en) => (isEs() ? es : en);
  const GITHUB_PATH = 'M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.58 9.58 0 0 1 12 6.82c.85 0 1.71.11 2.51.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.69-4.58 4.94.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z';

  // Header button: three bars plus a "Menú" label, like KG Tech.
  toggle.innerHTML = '<span class="menu-bars" aria-hidden="true"><span></span><span></span><span></span></span><span class="menu-label"></span>';
  toggle.setAttribute('aria-haspopup', 'dialog');

  const panel = document.createElement('dialog');
  panel.id = 'mobileMenu';
  panel.className = 'mobile-menu';
  panel.setAttribute('aria-labelledby', 'mobileMenuTitle');
  panel.innerHTML = `
    <div class="mobile-menu-inner">
      <div class="mobile-menu-top">
        <a class="brand display" href="index.html"><span class="paw" aria-hidden="true">🐇</span><span>Geraldine<span class="brand-dot">.io</span></span></a>
        <button class="mobile-menu-close" type="button"><span aria-hidden="true">✕</span></button>
      </div>
      <p class="mobile-menu-eyebrow" id="mobileMenuTitle"></p>
      <nav class="mobile-menu-nav"><ul></ul></nav>
      <div class="mobile-menu-bottom">
        <a class="mobile-menu-cta" href="index.html#contacto"></a>
        <div class="mobile-switch" role="group" data-switch="lang">
          <span class="mobile-switch-label"></span>
          <button type="button" data-value="es" lang="es">ES</button>
          <button type="button" data-value="en" lang="en">EN</button>
        </div>
        <div class="mobile-switch" role="group" data-switch="theme">
          <span class="mobile-switch-label"></span>
          <button type="button" data-value="light"><span aria-hidden="true">☾</span><span class="mobile-switch-text"></span></button>
          <button type="button" data-value="dark"><span aria-hidden="true">☀</span><span class="mobile-switch-text"></span></button>
        </div>
        <p class="mobile-menu-note"></p>
        <div class="mobile-menu-contact">
          <a href="https://wa.me/50576935552" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">☏</span> WhatsApp</a>
          <a href="https://github.com/KrisGerald02" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${GITHUB_PATH}"/></svg> GitHub</a>
        </div>
      </div>
    </div>`;
  document.body.append(panel);
  const closeButton = panel.querySelector('.mobile-menu-close');
  const list = panel.querySelector('.mobile-menu-nav ul');
  const langSwitch = panel.querySelector('[data-switch="lang"]');
  const themeSwitch = panel.querySelector('[data-switch="theme"]');
  toggle.setAttribute('aria-controls', panel.id);
  let closingTimer;
  let savedOverflow = '';
  let savedRootOverflow = '';
  let savedInert = [];
  let opened = false;
  let projectsOpen = false;

  const currentFile = () => location.pathname.split('/').pop() || 'index.html';
  function isCurrent(href) {
    const url = new URL(href, location.href);
    const file = url.pathname.split('/').pop() || 'index.html';
    if (file !== currentFile()) return false;
    return url.hash ? url.hash === location.hash : !location.hash;
  }
  function makeItem(href, text) {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = href;
    link.textContent = text;
    if (isCurrent(href)) link.setAttribute('aria-current', 'page');
    li.append(link);
    return li;
  }

  function buildLinks() {
    list.replaceChildren(makeItem('index.html', t('Inicio', 'Home')));
    const dropdown = source.querySelector('.nav-dropdown');
    Array.from(source.children).forEach(child => {
      if (child.matches('a')) list.append(makeItem(child.getAttribute('href'), child.textContent.trim()));
      if (child === dropdown) {
        // "Proyectos" opens an accordion with the categories instead of one long list.
        const li = document.createElement('li');
        li.className = 'mobile-menu-group';
        const label = dropdown.querySelector('.nav-dropdown-toggle [data-i18n]');
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'mobile-menu-group-toggle';
        button.setAttribute('aria-controls', 'mobileProjects');
        button.innerHTML = '<span></span><span class="mobile-menu-chevron" aria-hidden="true">⌄</span>';
        button.firstChild.textContent = label ? label.textContent.trim() : t('Proyectos', 'Projects');
        const sub = document.createElement('ul');
        sub.id = 'mobileProjects';
        sub.className = 'mobile-menu-sub';
        dropdown.querySelectorAll('.nav-dropdown-menu a').forEach(a => sub.append(makeItem(a.getAttribute('href'), a.textContent.trim())));
        const hasCurrent = !!sub.querySelector('[aria-current]');
        if (hasCurrent) projectsOpen = true;
        button.classList.toggle('has-current', hasCurrent);
        const sync = () => { button.setAttribute('aria-expanded', String(projectsOpen)); sub.hidden = !projectsOpen; };
        button.addEventListener('click', () => { projectsOpen = !projectsOpen; sync(); });
        sync();
        li.append(button, sub);
        list.append(li);
      }
    });
    if (list.querySelector('a[aria-current]:not([href="index.html"])')) list.querySelector('a[href="index.html"]').removeAttribute('aria-current');
    list.querySelectorAll(':scope > li').forEach((li, i) => li.style.setProperty('--entry-delay', `${90 + i * 40}ms`));
  }

  function syncLabels() {
    toggle.querySelector('.menu-label').textContent = t('Menú', 'Menu');
    toggle.setAttribute('aria-label', t('Abrir menú', 'Open menu'));
    closeButton.setAttribute('aria-label', t('Cerrar menú', 'Close menu'));
    panel.querySelector('#mobileMenuTitle').textContent = t('EXPLORA MI PORTAFOLIO', 'EXPLORE MY PORTFOLIO');
    panel.querySelector('.mobile-menu-nav').setAttribute('aria-label', t('Navegación móvil', 'Mobile navigation'));
    panel.querySelector('.mobile-menu-cta').textContent = t('Hablemos →', 'Let’s talk →');
    langSwitch.setAttribute('aria-label', t('Idioma', 'Language'));
    langSwitch.querySelector('.mobile-switch-label').textContent = t('Idioma', 'Language');
    themeSwitch.setAttribute('aria-label', t('Tema', 'Theme'));
    themeSwitch.querySelector('.mobile-switch-label').textContent = t('Tema', 'Theme');
    const texts = themeSwitch.querySelectorAll('.mobile-switch-text');
    texts[0].textContent = t('Claro', 'Light');
    texts[1].textContent = t('Oscuro', 'Dark');
    panel.querySelector('.mobile-menu-note').textContent = t('Convirtamos tus ideas en soluciones digitales.', 'Let’s turn your ideas into digital solutions.');
    const lang = isEs() ? 'es' : 'en';
    const theme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    langSwitch.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.value === lang)));
    themeSwitch.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.value === theme)));
    if (langBtn) langBtn.dataset.short = isEs() ? 'EN' : 'ES';
  }

  function closeMenu(restoreFocus = true, immediate = false, then) {
    if (!opened || panel.classList.contains('is-closing')) return;
    toggle.setAttribute('aria-expanded', 'false');
    panel.classList.remove('is-visible');
    panel.classList.add('is-closing');
    const finish = () => {
      panel.close();
      panel.classList.remove('is-closing');
      document.body.style.overflow = savedOverflow;
      document.documentElement.style.overflow = savedRootOverflow;
      savedInert.forEach(([element, value]) => { element.inert = value; });
      savedInert = [];
      opened = false;
      if (restoreFocus && mobile.matches) toggle.focus({preventScroll: true});
      if (then) then();
    };
    clearTimeout(closingTimer);
    if (reduced.matches || immediate) finish();
    else closingTimer = setTimeout(finish, 230);
  }

  function openMenu() {
    if (!mobile.matches || opened) return;
    projectsOpen = false;
    buildLinks();
    syncLabels();
    savedOverflow = document.body.style.overflow;
    savedRootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    savedInert = Array.from(document.body.children).filter(el => el !== panel).map(el => [el, el.inert]);
    savedInert.forEach(([el]) => { el.inert = true; });
    opened = true;
    panel.showModal();
    panel.scrollTop = 0;
    toggle.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => panel.classList.add('is-visible'));
    (list.querySelector('a[aria-current]') || list.querySelector('a')).focus({preventScroll: true});
  }

  toggle.addEventListener('click', openMenu);
  closeButton.addEventListener('click', () => closeMenu());
  panel.addEventListener('cancel', event => { event.preventDefault(); closeMenu(); });
  panel.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link) return;
    if (link.target === '_blank') return;
    event.preventDefault();
    const url = new URL(link.href, location.href);
    const samePage = url.pathname === location.pathname;
    if (!samePage) { closeMenu(false, false, () => location.assign(url.href)); return; }
    // Same page: close first so the page is unlocked, then scroll to the section.
    closeMenu(false, false, () => {
      if (!url.hash) { history.pushState(null, '', url.pathname); window.scrollTo({top: 0, behavior: reduced.matches ? 'auto' : 'smooth'}); toggle.focus({preventScroll: true}); return; }
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      history.pushState(null, '', url.hash);
      if (target) {
        target.scrollIntoView({behavior: reduced.matches ? 'auto' : 'smooth', block: 'start'});
        target.setAttribute('tabindex', '-1');
        target.focus({preventScroll: true});
      }
    });
  });
  langSwitch.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button || button.getAttribute('aria-pressed') === 'true') return;
    langBtn?.click();
  });
  themeSwitch.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button || button.getAttribute('aria-pressed') === 'true') return;
    themeBtn?.click();
    syncLabels();
  });
  // Rebuild translated labels whenever the page language changes.
  new MutationObserver(() => {
    syncLabels();
    if (opened) {
      const keep = projectsOpen;
      buildLinks();
      projectsOpen = keep;
      const group = list.querySelector('.mobile-menu-group-toggle');
      if (group) { group.setAttribute('aria-expanded', String(keep)); list.querySelector('#mobileProjects').hidden = !keep; }
      langSwitch.querySelector('[aria-pressed="true"]').focus({preventScroll: true});
    }
  }).observe(document.documentElement, {attributes: true, attributeFilter: ['lang']});

  panel.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const focusable = Array.from(panel.querySelectorAll('a[href], button')).filter(el => el.offsetParent !== null);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  mobile.addEventListener('change', () => { if (!mobile.matches) closeMenu(false, true); });
  window.addEventListener('pagehide', () => closeMenu(false, true));
  window.addEventListener('pageshow', () => { toggle.setAttribute('aria-expanded', 'false'); });
  syncLabels();

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
