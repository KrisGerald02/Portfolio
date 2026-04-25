# 🚀 Guía de Configuración Inicial

Sigue estos pasos para configurar tu portafolio completamente.

## Paso 1: Configurar Supabase

### 1.1 Crear Proyecto en Supabase
1. Ve a [supabase.com](https://supabase.com)
2. Haz click en "Start your project"
3. Crea una cuenta o inicia sesión
4. Crea un nuevo proyecto
5. Copia tu `Project URL` y `anon public key`

### 1.2 Crear Tablas
Copia y ejecuta el siguiente SQL en el editor de SQL de Supabase:

```sql
-- Tabla de Perfil
CREATE TABLE profile (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  bio TEXT,
  email VARCHAR(255),
  location VARCHAR(255),
  github_url VARCHAR(500),
  linkedin_url VARCHAR(500),
  twitter_url VARCHAR(500),
  profile_image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Posts
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  image_url VARCHAR(500),
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Proyectos
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image_url VARCHAR(500),
  technologies TEXT[],
  github_url VARCHAR(500),
  live_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Habilidades
CREATE TABLE skills (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(255),
  proficiency INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Mensajes de Contacto
CREATE TABLE contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Paso 2: Configurar Variables de Entorno

### 2.1 En v0
1. Ve a **Settings** (engranaje en la esquina superior derecha)
2. Selecciona **Vars**
3. Agrega estas variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: Tu URL de Supabase
   - `SUPABASE_SERVICE_ROLE_KEY`: Tu Service Role Key (de Supabase > Settings > API Keys)

### 2.2 Obtener las Credenciales
En tu proyecto de Supabase:
1. Ve a **Settings** > **API**
2. Copia el **Project URL** (NEXT_PUBLIC_SUPABASE_URL)
3. Copia el **Service Role Key** (SUPABASE_SERVICE_ROLE_KEY)
   - ⚠️ Mantén esto privado, no lo compartas

## Paso 3: Inicializar Datos

### Opción A: Vía Supabase Dashboard
1. Ve a la tabla `profile`
2. Inserta tu información:
   ```
   name: Tu Nombre Completo
   bio: Breve descripción sobre ti
   email: tu@correo.com
   location: Tu Ciudad, País
   github_url: https://github.com/tuusuario
   linkedin_url: https://linkedin.com/in/tuusuario
   twitter_url: https://twitter.com/tuusuario
   profile_image_url: https://url-de-tu-imagen.jpg
   ```

### Opción B: Ejecutar Script (En tu máquina local)
```bash
# En tu computadora
node scripts/seed-data.js
```
(Primero configura las variables de entorno localmente)

## Paso 4: Personalizar tu Portafolio

### 4.1 Cambiar Colores
Edita `/app/globals.css` y busca `:root {`:

```css
--primary: oklch(0.7 0.15 330);      /* Cambiar aquí */
--accent: oklch(0.75 0.18 330);
--secondary: oklch(0.88 0.1 320);
```

Colores sugeridos:
- **Azul**: 260 (tonalidad)
- **Verde**: 140
- **Púrpura**: 290
- **Naranja**: 45
- **Rojo**: 10

### 4.2 Actualizar Información
1. Ve a tu tabla `profile` en Supabase
2. Actualiza todos los campos con tu información

### 4.3 Agregar Proyectos
1. Ve a la tabla `projects`
2. Haz click en "Insert row"
3. Llena los campos:
   - title: Nombre del proyecto
   - description: Descripción detallada
   - technologies: ['React', 'Next.js'] (array)
   - github_url: Link a GitHub
   - live_url: Link a sitio en vivo

### 4.4 Agregar Habilidades
1. Ve a la tabla `skills`
2. Inserta tus habilidades:
   - name: JavaScript
   - category: Lenguajes
   - proficiency: 90

## Paso 5: Probar Localmente

```bash
# Instala dependencias
pnpm install

# Crea .env.local con tus variables
echo "NEXT_PUBLIC_SUPABASE_URL=tu_url" > .env.local
echo "SUPABASE_SERVICE_ROLE_KEY=tu_key" >> .env.local

# Inicia servidor
pnpm dev

# Abre http://localhost:3000
```

## Paso 6: Desplegar en Vercel

### 6.1 Conectar Repositorio
1. Ve a [vercel.com](https://vercel.com)
2. Haz click en "Import Project"
3. Selecciona tu repositorio de GitHub

### 6.2 Configurar Variables
1. En Vercel, ve a **Settings** > **Environment Variables**
2. Agrega:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`

### 6.3 Deploy
Haz click en "Deploy" ¡Listo!

## Troubleshooting

### Error: "NEXT_PUBLIC_SUPABASE_URL is not set"
**Solución**: Asegúrate de haber agregado la variable en Settings > Vars

### Error: "Service Role Key is invalid"
**Solución**: Copia nuevamente la clave desde Supabase > Settings > API

### Las imágenes no cargan
**Solución**: 
1. Asegúrate que la URL sea accesible públicamente
2. O sube a un servicio como Imgur, Cloudinary o Supabase Storage

### Los posts/proyectos no aparecen
**Solución**:
1. Verifica que hayas insertado datos en las tablas
2. Abre DevTools y revisa la consola de errores
3. Verifica que Supabase responda correctamente

## Próximos Pasos

1. ✅ Configurado Supabase
2. ✅ Variables de entorno agregadas
3. ✅ Datos iniciales cargados
4. ✅ Personalizado colores y contenido
5. ✅ Desplegado en Vercel
6. **Ahora**: Actualiza regularmente tu portafolio con nuevos proyectos

## 📚 Recursos Útiles

- [Documentación Supabase](https://supabase.com/docs)
- [Documentación Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Vercel Deploy](https://vercel.com/docs)

## 💬 ¿Necesitas Ayuda?

- Lee el archivo `PERSONALIZATION.md`
- Revisa el `README.md`
- Consulta la documentación oficial de cada servicio

¡Felicidades por tu nuevo portafolio! 🎉
