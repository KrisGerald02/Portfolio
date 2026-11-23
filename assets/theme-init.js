// The site always uses the light theme (the dark mode switch was removed).
document.documentElement.dataset.theme = 'light';
try { localStorage.removeItem('portfolio-theme'); } catch(error) {}

// First-visit language: Spanish for visitors whose browser language is Spanish or who are in a
// Spanish-speaking time zone, English for everyone else. The language button saves the visitor's
// own choice in localStorage, and that choice always wins over this guess.
window.portfolioDefaultLang = (() => {
  try {
    const langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
    if (langs.some(l => /^es\b/i.test(l))) return 'es';
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const esZones = /^(America\/(Managua|Mexico_City|Cancun|Merida|Monterrey|Matamoros|Chihuahua|Ciudad_Juarez|Ojinaga|Mazatlan|Bahia_Banderas|Hermosillo|Tijuana|Guatemala|El_Salvador|Tegucigalpa|Costa_Rica|Panama|Havana|Santo_Domingo|Puerto_Rico|Bogota|Caracas|Lima|Guayaquil|La_Paz|Santiago|Punta_Arenas|Asuncion|Montevideo|Argentina\/.*|Buenos_Aires|Cordoba|Mendoza)|Europe\/Madrid|Atlantic\/Canary|Africa\/(Ceuta|Malabo)|Pacific\/Galapagos)$/;
    if (esZones.test(tz)) return 'es';
  } catch (error) {}
  return 'en';
})();
