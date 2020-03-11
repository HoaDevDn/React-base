import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from 'locale/en';
import { vi } from 'locale/vi';
import rConfig from './rConfig';

let lang = localStorage.locale;
if (!Object.values(rConfig.lang).includes(lang)) lang = rConfig.lang.en;

i18n.use(initReactI18next).init({
  resources: {
    en: { translations: en },
    vi: { translations: vi },
  },
  fallbackLng: rConfig.lang.en,
  debug: false,
  ns: ['translations'],
  defaultNS: 'translations',
  keySeparator: '.',
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
  },
  react: { wait: true },
  lng: lang,
});

export default i18n;
