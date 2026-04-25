'use client';

import { Navbar } from '@/components/navbar';
import { SkillBadge } from '@/components/skill-badge';
import { useLanguage } from '@/lib/language-context';
import { useEffect, useState } from 'react';

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: 'Principiante' | 'Intermedio' | 'Avanzado' | 'Experto';
}

export default function SkillsPage() {
  const { t } = useLanguage();
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    // Mock data for demonstration
    setSkills([
      // Lenguajes
      { id: '1', name: 'JavaScript', category: 'Lenguajes', proficiency: 'Avanzado' },
      { id: '2', name: 'TypeScript', category: 'Lenguajes', proficiency: 'Avanzado' },
      { id: '3', name: 'Python', category: 'Lenguajes', proficiency: 'Intermedio' },
      { id: '4', name: 'SQL', category: 'Lenguajes', proficiency: 'Avanzado' },
      { id: '5', name: 'HTML/CSS', category: 'Lenguajes', proficiency: 'Experto' },
      { id: '6', name: 'Java', category: 'Lenguajes', proficiency: 'Intermedio' },

      // Frontend
      { id: '7', name: 'React', category: 'Frontend', proficiency: 'Avanzado' },
      { id: '8', name: 'Next.js', category: 'Frontend', proficiency: 'Avanzado' },
      { id: '9', name: 'Tailwind CSS', category: 'Frontend', proficiency: 'Experto' },
      { id: '10', name: 'Vue.js', category: 'Frontend', proficiency: 'Intermedio' },
      { id: '11', name: 'Responsive Design', category: 'Frontend', proficiency: 'Avanzado' },

      // Backend
      { id: '12', name: 'Node.js', category: 'Backend', proficiency: 'Avanzado' },
      { id: '13', name: 'Express.js', category: 'Backend', proficiency: 'Avanzado' },
      { id: '14', name: 'REST APIs', category: 'Backend', proficiency: 'Avanzado' },
      { id: '15', name: 'GraphQL', category: 'Backend', proficiency: 'Intermedio' },

      // Bases de Datos
      { id: '16', name: 'PostgreSQL', category: 'Bases de Datos', proficiency: 'Avanzado' },
      { id: '17', name: 'MongoDB', category: 'Bases de Datos', proficiency: 'Intermedio' },
      { id: '18', name: 'Supabase', category: 'Bases de Datos', proficiency: 'Avanzado' },

      // Herramientas
      { id: '19', name: 'Git/GitHub', category: 'Herramientas', proficiency: 'Avanzado' },
      { id: '20', name: 'Docker', category: 'Herramientas', proficiency: 'Intermedio' },
      { id: '21', name: 'VS Code', category: 'Herramientas', proficiency: 'Experto' },
      { id: '22', name: 'Vercel', category: 'Herramientas', proficiency: 'Avanzado' },
    ]);
  }, []);

  const categories = ['Lenguajes', 'Frontend', 'Backend', 'Bases de Datos', 'Herramientas'];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-background via-white to-background">
        {/* Header */}
        <div className="bg-gradient-to-r from-accent to-secondary py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-foreground mb-4">{t('skills.title')}</h1>
            <p className="text-lg text-primary max-w-2xl">
              {t('skills.subtitle')}
            </p>
          </div>
        </div>

        {/* Skills by Category */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          {categories.map((category) => (
            <div key={category} className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill) => (
                    <SkillBadge key={skill.id} {...skill} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
