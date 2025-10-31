export type Language = 'EN' | 'ES' | 'FR';

export interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}

export interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
}
