'use client';

import { Navbar } from '@/components/navbar';
import { SkillBadge } from '@/components/skill-badge';
import { useLanguage } from '@/lib/language-context';
import { translations } from '@/lib/translations';
import { useEffect, useState } from 'react';

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: string;
}

export default function SkillsPage() {
  const { t, language } = useLanguage();
  const [skills, setSkills] = useState<Skill[]>([]);

  const skillsData = [
    // Languages
    { id: '1', name: 'Python', category: 'languages', proficiency: 'advanced' },
    { id: '2', name: 'Swift', category: 'languages', proficiency: 'advanced' },
    { id: '3', name: 'Kotlin', category: 'languages', proficiency: 'intermediate' },
    { id: '4', name: 'SQL', category: 'languages', proficiency: 'advanced' },

    // Databases
    { id: '5', name: 'PostgreSQL', category: 'databases', proficiency: 'advanced' },
    { id: '6', name: 'SQL Server', category: 'databases', proficiency: 'intermediate' },
    { id: '7', name: 'Supabase', category: 'databases', proficiency: 'advanced' },

    // Tools
    { id: '8', name: 'Git/GitHub', category: 'tools', proficiency: 'advanced' },
    { id: '9', name: 'Architect Enterprise', category: 'tools', proficiency: 'intermediate' },
    { id: '10', name: 'VS Code', category: 'tools', proficiency: 'expert' },
    { id: '11', name: 'XCode', category: 'tools', proficiency: 'expert' },
    { id: '12', name: 'Vercel', category: 'tools', proficiency: 'advanced' },
    { id: '13', name: 'Figma', category: 'tools', proficiency: 'advanced' },
    { id: '14', name: 'Adobe', category: 'tools', proficiency: 'advanced' },
    { id: '15', name: 'Power BI', category: 'tools', proficiency: 'advanced' },
    { id: '16', name: 'Excel', category: 'tools', proficiency: 'advanced' },
    { id: '17', name: 'Arduino', category: 'tools', proficiency: 'advanced' },
  ];

  useEffect(() => {
    // Map proficiency values to translated ones using current language
    const translatedSkills = skillsData.map((skill) => {
      const proficiencyText = (translations[language] as any).skills.proficiency[skill.proficiency];
      return {
        ...skill,
        proficiency: proficiencyText,
      };
    });
    setSkills(translatedSkills);
  }, [language]);

  const categoryKeys = ['languages', 'databases', 'tools'] as const;

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
          {categoryKeys.map((categoryKey) => (
            <div key={categoryKey} className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">{(translations[language] as any).skills.categories[categoryKey]}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills
                  .filter((skill) => skill.category === categoryKey)
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
