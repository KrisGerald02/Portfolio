# Portafolio de Kristel Villalta 🐰

Portafolio interactivo hecho en HTML, CSS y JavaScript puro (sin frameworks, sin necesidad de instalar nada raro).

## Estructura del proyecto

```
portfolio-kristel/
├── index.html          → estructura y contenido de la página
├── assets/
│   ├── styles.css       → todos los estilos (colores, tipografía, animaciones)
│   └── script.js        → interactividad (terminal, traductor, modal de proyectos)
└── README.md            → este archivo
```

## Cómo abrirlo y editarlo en Visual Studio Code

1. **Descomprime** el archivo `.zip` en la carpeta donde quieras trabajar (por ejemplo `Documentos/portfolio-kristel`).
2. Abre **Visual Studio Code**.
3. Ve a `Archivo → Abrir carpeta...` (o `File → Open Folder...`) y selecciona la carpeta `portfolio-kristel` que descomprimiste.
4. En el panel izquierdo verás los 3 archivos: `index.html`, `assets/styles.css`, `assets/script.js`. Ábrelos con doble clic para editarlos.

## Cómo "compilarlo" / verlo en el navegador

Este proyecto **no necesita compilación** (no es React, Vue, etc.) — es HTML puro, así que el navegador lo lee directamente. Tienes dos formas de verlo:

### Opción A — La más simple
Haz doble clic sobre `index.html` desde el explorador de archivos de tu computadora. Se abrirá directo en tu navegador (Chrome, Edge, etc.).

### Opción B — Recomendada (con Live Server, se actualiza solo al guardar)
1. Dentro de VS Code, ve al ícono de extensiones (el de los cuadraditos, barra izquierda) o `Ctrl+Shift+X`.
2. Busca **"Live Server"** (de Ritwick Dey) e instálala.
3. Con `index.html` abierto, haz clic derecho sobre el archivo → **"Open with Live Server"** (o el botón "Go Live" abajo a la derecha).
4. Se abrirá tu portafolio en el navegador en una dirección tipo `http://127.0.0.1:5500`, y **cada vez que guardes un cambio, la página se refresca sola**. Ideal para editar y ver resultados al instante.

## Cosas fáciles de editar

| Quiero cambiar... | Dónde |
|---|---|
| Textos (Sobre mí, experiencia, proyectos, etc.) | `index.html` — busca el texto directamente |
| Colores del sitio | `assets/styles.css` — arriba de todo, en la sección `:root { ... }` (variables como `--pink-primary`) |
| Correo, teléfono, WhatsApp | `index.html` — búscalos con `Ctrl+F` (`krisvilalta02@gmail.com`, `50575151790`) |
| Traducciones al inglés | `assets/script.js` — objeto `enDict` (para textos generales) y `responses` (para la terminal) |
| Proyectos del modal "Ver dashboard" | `assets/script.js` — objeto `projects` |
| Servicios de KG Tech | `index.html` — sección `<section id="kgtech">` |

## Publicarlo gratis en internet (cuando esté listo)

Cuando quieras que cualquier persona pueda ver tu portafolio con un link, las opciones más fáciles y gratuitas son:
- **GitHub Pages**: sube la carpeta a un repositorio de GitHub y actívalo en Settings → Pages.
- **Netlify** o **Vercel**: arrastras la carpeta a su sitio web y te dan un link al instante.

---
Hecho con 🐰 — cualquier duda sobre el código, aquí estoy.
