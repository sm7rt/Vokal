import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import XHR from 'i18next-xhr-backend';

// EN
import translationCommonEng from './common/locales/en/translation.json';
import translationAuthenticationEng from './features/authentication/locales/en/translation.json';
import translationSettingsEng from './features/settings/locales/en/translation.json';
import translationEventsEng from './features/events/locales/en/translation.json';
import translationUsersEng from './features/users/locales/en/translation.json';
import translationCashGamesEng from './features/cashgames/locales/en/translation.json';
import moment from 'moment';

i18n
  .use(XHR)
  .use(LanguageDetector)
  .init({
    debug: process.env.NODE_ENV === 'development',
    lng: 'en',
    fallbackLng: 'en', // use en if detected lng is not available

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
      format: function(value, format, lng) {
        if (format === 'uppercase') return value.toUpperCase();
        if (value instanceof Date) return moment(value).format(format);
        return value;
      }
    },

    resources: {
      en: {
        translations: {
          ...translationCommonEng,
          ...translationAuthenticationEng,
          ...translationSettingsEng,
          ...translationEventsEng,
          ...translationUsersEng,
          ...translationCashGamesEng
        }
      }
    },
    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations'
  });

export default i18n;
