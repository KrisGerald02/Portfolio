'use client';

import { Navbar } from '@/components/navbar';
import { ProjectCard } from '@/components/project-card';
import { useLanguage } from '@/lib/language-context';
import { useEffect, useState } from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
}

export default function ProjectsPage() {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Mock data for demonstration
    setProjects([
      {
        id: '1',
        title: 'Sistema de Gestión de Tareas',
        description: 'Aplicación web para gestionar tareas personales con interfaz moderna y base de datos integrada.',
        technologies: ['React', 'Next.js', 'Supabase', 'Tailwind CSS'],
        githubUrl: 'https://github.com',
        demoUrl: 'https://example.com',
      },
      {
        id: '2',
        title: 'E-commerce Platform',
        description: 'Plataforma de comercio electrónico con carrito de compras, pagos y gestión de inventario.',
        technologies: ['Next.js', 'PostgreSQL', 'Stripe', 'TypeScript'],
        githubUrl: 'https://github.com',
        demoUrl: 'https://example.com',
      },
      {
        id: '3',
        title: 'Blog Personal',
        description: 'Blog dinámico con funcionalidad de comentarios, categorías y búsqueda avanzada.',
        technologies: ['Next.js', 'Markdown', 'Supabase', 'Tailwind CSS'],
        githubUrl: 'https://github.com',
        demoUrl: 'https://example.com',
      },
      {
        id: '4',
        title: 'API REST de Usuarios',
        description: 'API RESTful con autenticación JWT, validación de datos y documentación completa.',
        technologies: ['Node.js', 'Express', 'PostgreSQL', 'JWT'],
        githubUrl: 'https://github.com',
      },
      {
        id: '5',
        title: 'Dashboard Analítico',
        description: 'Dashboard interactivo con gráficos en tiempo real y análisis de datos.',
        technologies: ['React', 'Recharts', 'TypeScript', 'CSS Modules'],
        githubUrl: 'https://github.com',
        demoUrl: 'https://example.com',
      },
      {
        id: '6',
        title: 'Chat en Tiempo Real',
        description: 'Aplicación de chat con WebSockets, notificaciones en tiempo real y persistencia de datos.',
        technologies: ['Next.js', 'Socket.io', 'MongoDB', 'React'],
        githubUrl: 'https://github.com',
        demoUrl: 'https://example.com',
      },
      {
        id: '7',
        title: 'Sistema de Autenticación',
        description: 'Sistema de autenticación seguro con OAuth2, 2FA y gestión de sesiones.',
        technologies: ['Next.js', 'NextAuth.js', 'PostgreSQL', 'Bcrypt'],
        githubUrl: 'https://github.com',
      },
      {
        id: '8',
        title: 'Generador de QR',
        description: 'Aplicación web para generar códigos QR personalizados con opciones de descarga.',
        technologies: ['React', 'qrcode.react', 'Tailwind CSS'],
        githubUrl: 'https://github.com',
        demoUrl: 'https://example.com',
      },
    ]);
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-background via-white to-background">
        {/* Header */}
        <div className="bg-gradient-to-r from-accent to-secondary py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-foreground mb-4">{t('projects.title')}</h1>
            <p className="text-lg text-primary max-w-2xl">
              {t('projects.subtitle')}
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
