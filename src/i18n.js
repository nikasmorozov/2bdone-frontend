import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from './i18n/translations/en.json';
import lt from './i18n/translations/lt.json';
import ru from './i18n/translations/ru.json';



// the translations
const resources = {
  en,
  lt,
  ru
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    // lng: "en",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;