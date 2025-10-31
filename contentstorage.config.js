/** @type {{ languageCodes: string[], contentKey: string }} */
const config = {
  languageCodes: ['EN', 'ES', 'FR'],
  contentKey:
    import.meta.env.VITE_CONTENTSTORAGE_KEY ||
    '108541025900791613826/febe906c-7a8b-4b58-b792-77556c093dba',
};

export default config;
