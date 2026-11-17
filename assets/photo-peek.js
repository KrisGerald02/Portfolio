/* La conejita se asoma detrás de la foto de perfil, se esconde y reaparece por otro lado. */
(() => {
  const peek = document.getElementById('photoPeek'), photo = document.getElementById('photoBtn');
  if (!peek || !photo) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const spots = [[74, 0, 9], [26, 0, -9], [100, 52, 38], [0, 58, -38]];
  let index = 0, timer = 0, swap = 0;
  const up = () => peek.classList.add('is-up');
  function next() {
    clearTimeout(timer); clearTimeout(swap);
    peek.classList.remove('is-up');
    swap = setTimeout(() => {
      index = (index + 1) % spots.length;
      const [x, y, r] = spots[index];
      peek.classList.toggle('coat-tan'); peek.classList.toggle('coat-grey');
      peek.style.setProperty('--x', x + '%'); peek.style.setProperty('--y', y + '%'); peek.style.setProperty('--r', r + 'deg');
      void peek.offsetWidth; up();
      if (!reduce) timer = setTimeout(next, 3000);
    }, reduce ? 0 : 420);
  }
  function start() { up(); if (!reduce) timer = setTimeout(next, 3000); }
  photo.addEventListener('click', next);
  if (document.getElementById('siteLauncher')) document.addEventListener('portfolio-ready', () => setTimeout(start, 350), { once: true });
  else setTimeout(start, 350);
})();
