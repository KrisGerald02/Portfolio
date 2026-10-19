(() => {
  const launcher = document.getElementById('siteLauncher');
  if (!launcher) return;
  const finish = () => {
    if (!launcher.isConnected) return;
    launcher.remove();
    document.dispatchEvent(new Event('portfolio-ready'));
  };
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    finish();
    return;
  }
  launcher.addEventListener('animationend', event => {
    if (event.target === launcher && event.animationName === 'launcher-away') finish();
  });
  // A failed stylesheet must never leave the entrance covering the page.
  setTimeout(finish, 1600);
})();
