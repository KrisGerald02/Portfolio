'use client';

import { Navbar } from '@/components/navbar';
import { PostCard } from '@/components/post-card';
import { ProfileHeader } from '@/components/profile-header';
import { useEffect, useState } from 'react';

interface Post {
  id: string;
  content: string;
  author: string;
  timestamp: string;
  likes: number;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Mock data for demonstration
    setPosts([
      {
        id: '1',
        author: 'Mi Nombre',
        content: 'Acabo de completar un proyecto en React y Next.js. Aprendí mucho sobre optimización de rendimiento y SSR. ¡Muy emocionado con los resultados!',
        timestamp: 'Hace 2 días',
        likes: 24,
      },
      {
        id: '2',
        author: 'Mi Nombre',
        content: 'Trabajando en un sistema de gestión de base de datos con PostgreSQL. Los índices y la optimización de queries son fascinantes.',
        timestamp: 'Hace 5 días',
        likes: 18,
      },
      {
        id: '3',
        author: 'Mi Nombre',
        content: 'Comenzó el nuevo semestre. Emocionado por aprender sobre arquitectura de sistemas y diseño de software.',
        timestamp: 'Hace 1 semana',
        likes: 42,
      },
    ]);
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-background via-white to-background">
        {/* Profile Header */}
        <ProfileHeader />

        {/* Feed Section */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Feed */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-foreground mb-6">Mi Feed</h2>
              <div className="space-y-6">
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    id={post.id}
                    author={post.author}
                    content={post.content}
                    timestamp={post.timestamp}
                    likes={post.likes}
                  />
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Quick Stats */}
              <div className="bg-card rounded-lg shadow-md border border-accent p-6 mb-6">
                <h3 className="text-xl font-bold text-foreground mb-4">Estadísticas</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-muted-foreground text-sm">Proyectos</p>
                    <p className="text-3xl font-bold text-primary">8</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Habilidades</p>
                    <p className="text-3xl font-bold text-primary">15+</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Semestre Actual</p>
                    <p className="text-3xl font-bold text-primary">5°</p>
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className="bg-card rounded-lg shadow-md border border-accent p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">Enlaces</h3>
                <div className="space-y-3">
                  <a
                    href="#"
                    className="block text-primary hover:text-accent font-medium transition-colors"
                  >
                    → GitHub
                  </a>
                  <a
                    href="#"
                    className="block text-primary hover:text-accent font-medium transition-colors"
                  >
                    → LinkedIn
                  </a>
                  <a
                    href="#"
                    className="block text-primary hover:text-accent font-medium transition-colors"
                  >
                    → Twitter
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
