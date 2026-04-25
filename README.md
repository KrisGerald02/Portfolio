# 🌸 Portafolio Red Social - Ingeniería en Sistemas

Un portafolio personal de estilo red social. Construido con **Next.js 16**, **React 19**, **Tailwind CSS** y **Supabase**.

## 🚀 Inicio Rápido

### Requisitos
- Node.js 18+
- Una cuenta en Supabase

### Instalación

1. **Clona o descarga el proyecto**
```bash
cd tu-portafolio
```

2. **Instala dependencias**
```bash
pnpm install
```

3. **Configura variables de entorno**
Crea un archivo `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=tu_url_supabase
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
```

4. **Inicia el servidor de desarrollo**
```bash
pnpm dev
```

5. **Abre en tu navegador**
```
http://localhost:3000
```

## 📁 Estructura del Proyecto

```
/app
  /api              # Rutas API
    /posts         # GET/POST posts
    /projects      # GET/POST proyectos
    /profile       # GET perfil
    /contact       # POST mensajes
  /projects        # Página de proyectos
  /skills          # Página de habilidades
  /contact         # Página de contacto
  page.tsx         # Página de inicio

/components        # Componentes reutilizables
  navbar.tsx
  profile-header.tsx
  post-card.tsx
  project-card.tsx
  skill-badge.tsx

/lib
  supabase.ts      # Cliente de Supabase

/scripts
  setup-db.js      # Script de inicialización
  seed-data.js     # Datos de ejemplo

/public
  profile.jpg      # Foto de perfil
```

## 🎨 Personalización

Lee el archivo `PERSONALIZATION.md` para aprender a:
- Cambiar tu información de perfil
- Agregar proyectos y posts
- Personalizar los colores
- Configurar habilidades

## 🗄️ Tablas de Base de Datos

### profile
```sql
- id: serial (PK)
- name: varchar
- bio: text
- email: varchar
- location: varchar
- github_url: varchar
- linkedin_url: varchar
- twitter_url: varchar
- profile_image_url: varchar
```

### posts
```sql
- id: serial (PK)
- title: varchar
- content: text
- image_url: varchar
- likes_count: integer
- created_at: timestamp
```

### projects
```sql
- id: serial (PK)
- title: varchar
- description: text
- image_url: varchar
- technologies: text[]
- github_url: varchar
- live_url: varchar
- created_at: timestamp
```

### skills
```sql
- id: serial (PK)
- name: varchar
- category: varchar
- proficiency: integer
- created_at: timestamp
```

### contact_messages
```sql
- id: serial (PK)
- name: varchar
- email: varchar
- subject: varchar
- message: text
- created_at: timestamp
```

## 📚 Páginas

### Home (/)
- Perfil del usuario con foto
- Feed de posts
- Estadísticas rápidas
- Enlaces a redes sociales

### Proyectos (/projects)
- Galería de proyectos
- Filtros por tecnología
- Links a GitHub y demo en vivo

### Habilidades (/skills)
- Grid de tecnologías
- Nivel de proficiencia
- Categorización

### Contacto (/contact)
- Formulario de contacto
- Enlaces sociales
- Información de ubicación

## 🔧 Tecnologías

- **Frontend**: React 19, Next.js 16, Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Base de Datos**: Supabase (PostgreSQL)
- **Iconos**: Lucide React
- **Tipado**: TypeScript
- **Herramientas**: pnpm, Turbopack

## 📦 Scripts Disponibles

```bash
pnpm dev        # Inicia servidor de desarrollo
pnpm build      # Compila para producción
pnpm start      # Inicia servidor de producción
pnpm lint       # Ejecuta linter
```

## 🚀 Despliegue

### En Vercel (Recomendado)

1. Conecta tu repositorio de GitHub a Vercel
2. Configura las variables de entorno
3. Haz click en Deploy

### Variables de Entorno Necesarias
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

---

**Hecho con ❤️ **
