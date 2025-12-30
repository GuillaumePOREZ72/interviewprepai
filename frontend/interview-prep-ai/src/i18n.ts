import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "../locales/en/common.json";
import fr from "../locales/fr/common.json";
import moment from "moment";
import "moment/locale/fr";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: en },
      fr: { common: fr },
    },
    fallbackLng: "en",
    ns: ["common"],
    defaultNS: "common",
    debug: false,
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

// Initial sync of moment locale
const initialLng = i18n.language?.split("-")[0] || "en";
moment.locale(initialLng);

// Listen to language changes and update moment locale accordingly
i18n.on("languageChanged", (lng: string) => {
  const short = (lng || "en").split("-")[0];
  moment.locale(short);
});

export default i18n;
