// The site always uses the light theme (the dark mode switch was removed).
document.documentElement.dataset.theme = 'light';
try { localStorage.removeItem('portfolio-theme'); } catch(error) {}
