// Shared mobile navigation (same pattern as the KG Tech site) and progressive motion for every portfolio page.
(() => {
  const toggle = document.getElementById('navToggle');
  const source = document.getElementById('navMenu');
  if (!toggle || !source) return;
  const mobile = matchMedia('(max-width: 860px)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const langBtn = document.getElementById('langBtn');
  const isEs = () => document.documentElement.lang === 'es';
  const t = (es, en) => (isEs() ? es : en);

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
      </div>
    </div>`;
  document.body.append(panel);
  const closeButton = panel.querySelector('.mobile-menu-close');
  const list = panel.querySelector('.mobile-menu-nav ul');
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
  // Rebuild translated labels whenever the page language changes.
  new MutationObserver(() => {
    syncLabels();
    if (opened) {
      const keep = projectsOpen;
      buildLinks();
      projectsOpen = keep;
      const group = list.querySelector('.mobile-menu-group-toggle');
      if (group) { group.setAttribute('aria-expanded', String(keep)); list.querySelector('#mobileProjects').hidden = !keep; }
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
