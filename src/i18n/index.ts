import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import zh from './locales/zh.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      'zh-CN': { translation: zh },
    },
    fallbackLng: 'en',
    supportedLngs: ['zh-CN', 'en'],
    load: 'currentOnly',
    lng: 'zh-CN',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage'],
      lookupLocalStorage: 'terax-language',
      caches: ['localStorage'],
    },
  });

export default i18n;
