'use client';

import { useLanguage } from '@/lib/language-context';

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary hover:bg-accent text-foreground font-medium transition-colors text-sm"
      title={language === 'en' ? 'Cambiar a español' : 'Switch to English'}
    >
      {language === 'en' ? (
        <>
          <span>ES</span>
          <span className="text-xs opacity-70">|</span>
          <span className="opacity-50">EN</span>
        </>
      ) : (
        <>
          <span className="opacity-50">ES</span>
          <span className="text-xs opacity-70">|</span>
          <span>EN</span>
        </>
      )}
    </button>
  );
}
