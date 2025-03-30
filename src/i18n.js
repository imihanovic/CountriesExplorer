import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import hr from "./locales/hr.json";

i18n.use(initReactI18next).init({
	resources: {
		en: {
			translation: en,
		},
		hr: {
			translation: hr,
		},
	},
	lng: "en",
	fallbackLng: "en",
	debug: true,
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
