# 🎨 Guía de Personalización del Portafolio

Bienvenido a tu portafolio de red social. Aquí te mostramos cómo personalizarlo con tu información.

## 📋 Índice
1. [Información de Perfil](#información-de-perfil)
2. [Agregar Proyectos](#agregar-proyectos)
3. [Agregar Posts](#agregar-posts)
4. [Agregar Habilidades](#agregar-habilidades)
5. [Colores y Estilos](#colores-y-estilos)

## 🙋 Información de Perfil

Tu información de perfil se almacena en Supabase. Para actualizarla:

1. Ve al dashboard de Supabase
2. En la tabla `profile`, actualiza:
   - `name`: Tu nombre completo
   - `bio`: Tu biografía corta
   - `email`: Tu correo de contacto
   - `location`: Tu ubicación
   - `github_url`: Tu perfil de GitHub
   - `linkedin_url`: Tu perfil de LinkedIn
   - `twitter_url`: Tu perfil de Twitter
   - `profile_image_url`: URL de tu foto de perfil

O edita directamente en el código en `/vercel/share/v0-project/scripts/seed-data.js`

## 📁 Agregar Proyectos

### Vía API
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Nombre del Proyecto",
    "description": "Descripción del proyecto",
    "image_url": "https://...",
    "technologies": ["React", "Next.js"],
    "github_url": "https://github.com/usuario/proyecto",
    "live_url": "https://proyecto-demo.com"
  }'
```

### Vía Supabase
1. Ve a la tabla `projects` en Supabase
2. Inserta una nueva fila con:
   - `title`: Nombre del proyecto
   - `description`: Descripción detallada
   - `image_url`: URL de la imagen (opcional)
   - `technologies`: Array de tecnologías usadas
   - `github_url`: Link a GitHub (opcional)
   - `live_url`: Link a sitio en vivo (opcional)

## 💬 Agregar Posts

### Vía API
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Título del Post",
    "content": "Contenido del post",
    "image_url": "https://..."
  }'
```

### Vía Supabase
1. Ve a la tabla `posts` en Supabase
2. Inserta una nueva fila con:
   - `title`: Título del post
   - `content`: Contenido del post
   - `image_url`: URL de imagen (opcional)

## 🚀 Agregar Habilidades

### Vía Supabase
1. Ve a la tabla `skills`
2. Inserta una nueva fila con:
   - `name`: Nombre de la habilidad
   - `category`: Categoría (Frontend, Backend, DevOps, etc.)
   - `proficiency`: Nivel de 0-100

Categorías sugeridas:
- Lenguajes
- Frontend
- Backend
- Bases de Datos
- DevOps
- Herramientas

## 🎨 Colores y Estilos

Los colores del portafolio están configurados en `/vercel/share/v0-project/app/globals.css`

### Cambiar la Paleta Rosa Pastel

Edita las variables CSS en globals.css:

```css
:root {
  --primary: oklch(0.7 0.15 330);      /* Rosa principal */
  --accent: oklch(0.75 0.18 330);      /* Rosa más clara */
  --secondary: oklch(0.88 0.1 320);    /* Rosa suave */
  --background: oklch(0.99 0.01 275);  /* Fondo casi blanco */
}
```

Para cambiar a otros colores, reemplaza los valores:
- Primer número (0.7): Brillo (0-1)
- Segundo número (0.15): Saturación (0-0.37)
- Tercer número (330): Tonalidad en grados (0-360)

Ejemplos de tonalidades:
- Rojo: 0-30
- Naranja: 30-60
- Amarillo: 60-90
- Verde: 90-180
- Cian: 180-240
- Azul: 240-280
- Púrpura: 280-330
- Magenta: 330-360

## 🚀 Desplegar

Para desplegar tu portafolio en Vercel:

1. Conecta tu repositorio de GitHub
2. Configura las variables de entorno de Supabase
3. Haz click en Deploy

Variables necesarias:
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## 📞 Soporte de Contacto

Los mensajes de contacto se guardan en la tabla `contact_messages` de Supabase.

Para configurar notificaciones por email:
1. Usa Supabase Edge Functions
2. O integra con un servicio como SendGrid o Nodemailer

¡Diviértete personalizando tu portafolio! 🎉
