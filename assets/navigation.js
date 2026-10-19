// Shared mobile navigation and progressive motion for every portfolio page.
(() => {
  const toggle = document.getElementById('navToggle');
  const source = document.getElementById('navMenu');
  if (!toggle || !source) return;
  const mobile = matchMedia('(max-width: 860px)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const panel = document.createElement('dialog');
  panel.id = 'mobileMenu';
  panel.className = 'mobile-menu';
  panel.setAttribute('aria-modal', 'true');
  panel.setAttribute('aria-labelledby', 'mobileMenuTitle');
  panel.innerHTML = `
    <div class="mobile-menu-top">
      <a class="brand display" href="index.html" aria-label="Geraldine.io">🐇 Geraldine<span>.io</span></a>
      <button class="mobile-menu-close" type="button"><span aria-hidden="true">×</span></button>
    </div>
    <p class="mobile-menu-kicker" id="mobileMenuTitle"></p>
    <div class="mobile-menu-links"></div>
    <div class="mobile-menu-footer">
      <p class="mobile-menu-note"></p>
      <div class="mobile-menu-contact">
        <a href="mailto:kgtechdigital@gmail.com"><span aria-hidden="true">✉</span> Email</a>
        <a href="https://wa.me/50576935552" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">☏</span> WhatsApp</a>
        <a href="https://github.com/KrisGerald02" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.58 9.58 0 0 1 12 6.82c.85 0 1.71.11 2.51.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.69-4.58 4.94.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg> GitHub</a>
      </div>
    </div>`;
  document.body.append(panel);
  const closeButton = panel.querySelector('.mobile-menu-close');
  const links = panel.querySelector('.mobile-menu-links');
  toggle.setAttribute('aria-controls', panel.id);
  let closingTimer;
  let savedOverflow = '';
  let savedRootOverflow = '';
  let savedInert = [];
  let opened = false;

  function closeMenu(restoreFocus = true, immediate = false) {
    if (!opened || panel.classList.contains('is-closing')) return;
    toggle.setAttribute('aria-expanded', 'false');
    panel.classList.add('is-closing');
    panel.classList.remove('is-open');
    const finish = () => {
      panel.close();
      panel.classList.remove('is-closing');
      document.body.style.overflow = savedOverflow;
      document.documentElement.style.overflow = savedRootOverflow;
      savedInert.forEach(([element, value]) => { element.inert = value; });
      savedInert = [];
      opened = false;
      if (restoreFocus && mobile.matches) toggle.focus({preventScroll: true});
    };
    clearTimeout(closingTimer);
    if (reduced.matches || immediate) finish();
    else closingTimer = setTimeout(finish, 180);
  }

  function openMenu() {
    if (!mobile.matches || opened) return;
    const es = document.documentElement.lang === 'es';
    panel.querySelector('#mobileMenuTitle').textContent = es ? 'EXPLORA MI PORTAFOLIO' : 'EXPLORE MY PORTFOLIO';
    panel.querySelector('.mobile-menu-note').textContent = es ? 'Convirtamos tus ideas en soluciones digitales.' : 'Let’s turn your ideas into digital solutions.';
    closeButton.setAttribute('aria-label', es ? 'Cerrar menú' : 'Close menu');
    toggle.setAttribute('aria-label', es ? 'Abrir menú' : 'Open menu');
    const home = document.createElement('a');
    home.href = 'index.html';
    home.textContent = es ? 'Inicio' : 'Home';
    links.replaceChildren(home);
    source.querySelectorAll('a').forEach(original => {
      const link = original.cloneNode(true);
      link.removeAttribute('data-i18n');
      links.append(link);
    });
    const current = location.pathname.split('/').pop() || 'index.html';
    links.querySelectorAll('a').forEach(link => {
      const url = new URL(link.href);
      link.removeAttribute('aria-current');
      if ((url.pathname.split('/').pop() || 'index.html') === current && (!url.hash || url.hash === location.hash)) {
        link.setAttribute('aria-current', url.hash ? 'location' : 'page');
      }
    });
    panel.querySelectorAll('.mobile-menu-top, .mobile-menu-kicker, .mobile-menu-links a, .mobile-menu-footer').forEach((el, i) => {
      el.style.setProperty('--menu-delay', `${Math.min(i * 15, 90)}ms`);
    });
    savedOverflow = document.body.style.overflow;
    savedRootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    savedInert = Array.from(document.body.children).filter(el => el !== panel).map(el => [el, el.inert]);
    savedInert.forEach(([el]) => { el.inert = true; });
    opened = true;
    panel.showModal();
    toggle.setAttribute('aria-expanded', 'true');
    panel.classList.add('is-open');
    home.focus({preventScroll: true});
  }

  toggle.addEventListener('click', openMenu);
  closeButton.addEventListener('click', () => closeMenu());
  panel.addEventListener('cancel', event => { event.preventDefault(); closeMenu(); });
  panel.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  panel.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const focusable = Array.from(panel.querySelectorAll('a[href], button'));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  mobile.addEventListener('change', () => { if (!mobile.matches) closeMenu(false, true); });
  window.addEventListener('pagehide', () => closeMenu(false, true));
  window.addEventListener('pageshow', () => { toggle.setAttribute('aria-expanded', 'false'); });

})();
