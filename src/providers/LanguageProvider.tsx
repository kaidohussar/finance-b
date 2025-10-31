import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../contexts/LanguageContext';
import type { Language } from '../types/language';

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<Language>('EN');

  const setLanguage = (language: Language) => {
    const lowerCaseLanguage = language.toLowerCase();
    setCurrentLanguage(language);
    i18n.changeLanguage(lowerCaseLanguage);
    localStorage.setItem('selectedLanguage', lowerCaseLanguage);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      const upperCaseLanguage = savedLanguage.toUpperCase() as Language;
      setCurrentLanguage(upperCaseLanguage);
      i18n.changeLanguage(savedLanguage);
    } else {
      // Set initial language from i18n
      const currentLng = i18n.language.toUpperCase() as Language;
      setCurrentLanguage(currentLng);
    }
  }, [i18n]);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
