import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import local translation files
import enTranslations from './locales/en.json';
import esTranslations from './locales/es.json';
import frTranslations from './locales/fr.json';

// Initialize i18next with local resources
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // Use local translation files as resources
    resources: {
      en: {
        translation: enTranslations,
      },
      es: {
        translation: esTranslations,
      },
      fr: {
        translation: frTranslations,
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    supportedLngs: ['en', 'es', 'fr'],
    interpolation: {
      // React already escapes by default, so we disable i18next's escaping
      // This is essential for the Trans component to work properly with JSX
      escapeValue: false,
    },
    // Enable React Suspense mode for better loading states
    react: {
      useSuspense: true,
      // Bind i18n instance to component tree
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added removed',
      // Trans component options
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'em', 'b', 'p'],
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'selectedLanguage',
    },
  })
  .catch((error) => {
    console.error('Failed to initialize i18n:', error);
  });

export default i18n;
