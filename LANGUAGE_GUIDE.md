# Guía de Sistema de Idiomas

## Descripción General

Tu portafolio ahora incluye un sistema de alternancia entre idiomas **inglés** y **español**. El sitio comienza en **inglés por defecto** y puedes cambiar a español haciendo clic en el botón de idioma ubicado en la barra de navegación.

## Cómo Funciona

### Botón de Cambio de Idioma
- Ubicado en la barra de navegación (Navbar) en la esquina derecha
- Muestra `ES | EN` (el idioma actual aparece destacado)
- Al hacer clic, alterna entre inglés y español
- La selección se guarda en `localStorage`, por lo que se recuerda en visitas futuras

### Estructura de Traducciones

Las traducciones están organizadas en el archivo `/lib/translations.ts`:

```typescript
translations = {
  es: { ... },  // Textos en español
  en: { ... }   // Textos en inglés
}
```

## Agregar Nuevas Traducciones

### Paso 1: Agregar la Clave en `translations.ts`

```typescript
export const translations = {
  es: {
    nav: {
      home: 'Inicio',
      // Agrega aquí tu nueva clave
      newFeature: 'Mi Nueva Función',
    },
    en: {
      nav: {
        home: 'Home',
        // Agrega aquí la traducción al inglés
        newFeature: 'My New Feature',
      },
    },
  },
};
```

### Paso 2: Usar la Traducción en tu Componente

```typescript
'use client';

import { useLanguage } from '@/lib/language-context';

export function MyComponent() {
  const { t } = useLanguage();

  return <h1>{t('nav.newFeature')}</h1>;
}
```

## Estructura de Archivos

```
/lib
├── translations.ts         # Todas las traducciones (ES/EN)
├── language-context.tsx    # Context y hook useLanguage

/components
├── language-toggle.tsx     # Botón de cambio de idioma
└── navbar.tsx              # Barra de navegación con botón

/app
├── page.tsx                # Página de inicio
├── projects/page.tsx       # Página de proyectos
├── skills/page.tsx         # Página de habilidades
└── contact/page.tsx        # Página de contacto
```

## Personalizar Traducciones

Para personalizar los textos:

1. Abre `/lib/translations.ts`
2. Busca la sección `es:` o `en:` según el idioma
3. Cambia los valores (no las claves) a tus textos personalizados

**Ejemplo:**
```typescript
es: {
  home: {
    title: 'Tu Nombre', // Cambia esto a tu nombre
    subtitle: 'Estudiante de Ingeniería en Sistemas',
  },
}
```

## Agregar un Nuevo Idioma

Si deseas agregar otro idioma (p. ej., portugués):

1. Agrega una nueva rama en `translations.ts`:
```typescript
export const translations = {
  es: { ... },
  en: { ... },
  pt: {  // Nuevo idioma
    nav: {
      home: 'Início',
      // ... resto de traducciones
    },
  },
};
```

2. Actualiza el tipo `Language`:
```typescript
export type Language = keyof typeof translations; // Se actualiza automáticamente
```

3. Modifica `language-context.tsx` para incluir lógica de ciclo entre 3 idiomas:
```typescript
const toggleLanguage = () => {
  setLanguage((prev) => {
    const languages: Language[] = ['en', 'es', 'pt'];
    const currentIndex = languages.indexOf(prev);
    const newLang = languages[(currentIndex + 1) % languages.length];
    localStorage.setItem('language', newLang);
    return newLang;
  });
};
```

## Variables de Traducción Disponibles

### Navegación (`nav`)
- `home` - Enlace de inicio
- `projects` - Enlace de proyectos
- `skills` - Enlace de habilidades
- `contact` - Enlace de contacto
- `portfolio` - Logo del portafolio

### Inicio (`home`)
- `title` - Nombre del usuario
- `subtitle` - Título profesional
- `bio` - Biografía
- `email` - Correo electrónico
- `location` - Ubicación
- `website` - Sitio web
- `recentPosts` - Posts recientes
- `noContent` - Sin contenido

### Proyectos (`projects`)
- `title` - Título de sección
- `subtitle` - Subtítulo
- `technologies` - Etiqueta de tecnologías
- `viewProject` - Botón de ver proyecto
- `noProjects` - Sin proyectos disponibles

### Habilidades (`skills`)
- `title` - Título de sección
- `subtitle` - Subtítulo
- `frontend` - Categoría Frontend
- `backend` - Categoría Backend
- `databases` - Categoría Bases de Datos
- `tools` - Categoría Herramientas
- `noSkills` - Sin habilidades disponibles

### Contacto (`contact`)
- `title` - Título de sección
- `subtitle` - Subtítulo
- `name` - Etiqueta de nombre
- `email` - Etiqueta de correo
- `subject` - Etiqueta de asunto
- `message` - Etiqueta de mensaje
- `send` - Botón enviar
- `sending` - Texto mientras se envía
- `success` - Mensaje de éxito
- `error` - Mensaje de error
- `socialLinks` - Enlaces sociales
- `linkedin` - LinkedIn
- `github` - GitHub
- `twitter` - Twitter
- `instagram` - Instagram

## Consejos

- Las traducciones se cachean en el navegador mediante `localStorage`
- El idioma se recuerda entre visitas
- Usa la estructura de punto (`nav.home`) para acceder a traducciones anidadas
- Siempre agrega ambas traducciones (ES y EN) al mismo tiempo para evitar inconsistencias
- Prueba ambos idiomas después de agregar nuevas traducciones

## Soporte

Si necesitas cambiar el idioma por defecto, edita `language-context.tsx`:

```typescript
const browserLang = navigator.language.startsWith('es') ? 'es' : 'en';
setLanguage('en'); // Cambia aquí el idioma por defecto
```
