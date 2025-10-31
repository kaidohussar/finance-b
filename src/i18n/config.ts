import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ContentStorageBackend from '@contentstorage/i18next-plugin';
import contentStorageConfig from '../../contentstorage.config';

i18n
  .use(ContentStorageBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      contentKey: contentStorageConfig.contentKey,
      loadPath: (lng: string) => {
        return `https://cdn.contentstorage.app/${contentStorageConfig.contentKey}/content/${lng.toUpperCase()}.json`;
      },
    },

    lng: 'en',
    fallbackLng: 'en',
    supportedLngs: contentStorageConfig.languageCodes.map((code: string) =>
      code.toLowerCase()
    ),
    interpolation: {
      escapeValue: false,
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
