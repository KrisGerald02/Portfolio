'use client';

import { LanguageProvider } from '@/lib/language-context';
import type { ReactNode } from 'react';

interface ClientLayoutProps {
  children: ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  );
}
