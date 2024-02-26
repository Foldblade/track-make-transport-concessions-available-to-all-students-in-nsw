import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// ...
import translationEN from "../public/locales/en/translation.json";
import translationZHCN from "../public/locales/zh-CN/translation.json";
import translationZHTW from "../public/locales/zh-TW/translation.json";

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  "zh-CN": {
    translation: translationZHCN,
  },
  "zh-TW": {
    translation: translationZHTW,
  },
  "zh-HK": {
    translation: translationZHTW,
  },
};

// ...
// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    // lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    // supportedLngs: ["en", "zh-Hans", "zh-Hant"],
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
