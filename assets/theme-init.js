try {
  document.documentElement.dataset.theme = localStorage.getItem('portfolio-theme') === 'dark' ? 'dark' : 'light';
} catch(error) {
  document.documentElement.dataset.theme = 'light';
}
