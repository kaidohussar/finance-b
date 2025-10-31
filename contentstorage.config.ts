import { defineConfig } from '@contentstorage/core';

export default defineConfig({
  // Content key from ContentStorage
  contentKey: 'test-app-2024',

  // Supported languages
  languageCodes: ['EN', 'FR', 'ES'],

  // Output configuration
  output: {
    // Directory for storing pulled content
    contentDir: 'src/locales/content',

    // Path for generated TypeScript types
    typesPath: 'src/types/translations.d.ts',
  },
});
