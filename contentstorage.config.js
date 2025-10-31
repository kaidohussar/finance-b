const config = {
  // Content key from ContentStorage
  contentKey: '108541025900791613826/febe906c-7a8b-4b58-b792-77556c093dba',

  // Supported languages
  languageCodes: ['EN', 'FR', 'ES'],

  // Output configuration
  output: {
    // Directory for storing pulled content
    contentDir: 'src/locales/content',

    // Path for generated TypeScript types
    typesPath: 'src/types/translations.d.ts',
  },
};

export default config;
