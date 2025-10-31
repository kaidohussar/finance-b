import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ContentStorageBackend, {
  ContentStoragePostProcessor,
} from '@contentstorage/i18next-plugin';
import contentStorageConfig from '../../contentstorage.config';

// Import local translation files as fallback
import enTranslations from '../content/json/EN.json';
import esTranslations from '../content/json/ES.json';
import frTranslations from '../content/json/FR.json';

// Initialize i18next with ContentStorage backend and local fallback
i18n
  .use(ContentStorageBackend)
  .use(new ContentStoragePostProcessor({ debug: true }))
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // ContentStorage backend configuration
    backend: {
      contentKey: contentStorageConfig.contentKey,
    },
    // Local translation files as fallback resources
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
    // Use local bundles as fallback if CDN fails
    partialBundledLanguages: true,
    lng: 'en',
    fallbackLng: 'en',
    supportedLngs: contentStorageConfig.languageCodes.map((code: string) =>
      code.toLowerCase()
    ),
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
