'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations } from './translations';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string, defaultValue?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Obtener idioma del localStorage
    try {
      const savedLanguage = localStorage.getItem('language') as Language | null;
      if (savedLanguage === 'en' || savedLanguage === 'es') {
        setLanguage(savedLanguage);
      } else {
        setLanguage('en'); // Por defecto inglés
      }
    } catch (e) {
      setLanguage('en');
    }
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const newLang = prev === 'en' ? 'es' : 'en';
      try {
        localStorage.setItem('language', newLang);
      } catch (e) {
        console.error('Failed to save language preference', e);
      }
      return newLang;
    });
  };

  const t = (key: string, defaultValue: string = key): string => {
    try {
      const keys = key.split('.');
      let value: any = translations[language];
      
      for (const k of keys) {
        if (value && typeof value === 'object') {
          value = value[k];
        } else {
          return defaultValue;
        }
      }
      
      return typeof value === 'string' ? value : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage debe ser usado dentro de LanguageProvider');
  }
  return context;
}
