'use client';

interface SkillBadgeProps {
  name: string;
  category: string;
  proficiency: 'Principiante' | 'Intermedio' | 'Avanzado' | 'Experto';
}

export function SkillBadge({ name, category, proficiency }: SkillBadgeProps) {
  const proficiencyColor = {
    'Principiante': 'bg-blue-100 text-blue-800',
    'Intermedio': 'bg-secondary text-foreground',
    'Avanzado': 'bg-primary text-white',
    'Experto': 'bg-accent text-foreground',
  };

  const categoryColor = {
    'Lenguajes': 'text-blue-600',
    'Frontend': 'text-purple-600',
    'Backend': 'text-green-600',
    'Herramientas': 'text-orange-600',
    'Bases de Datos': 'text-red-600',
  };

  return (
    <div className="bg-card rounded-lg shadow-md border border-accent p-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-bold text-foreground mb-1">{name}</h4>
          <p className={`text-sm font-medium mb-3 ${categoryColor[category as keyof typeof categoryColor] || 'text-muted-foreground'}`}>
            {category}
          </p>
        </div>
      </div>
      <span
        className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${proficiencyColor[proficiency]}`}
      >
        {proficiency}
      </span>
    </div>
  );
}
