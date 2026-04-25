'use client';

import { Navbar } from '@/components/navbar';
import { ProjectCard } from '@/components/project-card';
import { useLanguage } from '@/lib/language-context';
import { translations } from '@/lib/translations';
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
  const { t, language } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const techStacks = [
      ['React', 'Next.js', 'Supabase', 'Tailwind CSS'],
      ['Next.js', 'PostgreSQL', 'Stripe', 'TypeScript'],
      ['Next.js', 'Markdown', 'Supabase', 'Tailwind CSS'],
      ['Node.js', 'Express', 'PostgreSQL', 'JWT'],
      ['React', 'Recharts', 'TypeScript', 'CSS Modules'],
      ['Next.js', 'Socket.io', 'MongoDB', 'React'],
      ['Next.js', 'NextAuth.js', 'PostgreSQL', 'Bcrypt'],
      ['React', 'qrcode.react', 'Tailwind CSS'],
    ];

    // Get projects from translations using the current language
    const projectsList = (translations[language] as any).projects.list;
    const projects = projectsList.map((project: any, index: number) => ({
      id: String(index + 1),
      title: project.title,
      description: project.description,
      technologies: techStacks[index] || [],
      githubUrl: 'https://github.com',
      demoUrl: index !== 3 && index !== 6 ? 'https://example.com' : undefined,
    }));

    setProjects(projects);
  }, [language]);

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
