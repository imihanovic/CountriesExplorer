import { apiClient } from "./client";

export const fetchCountries = async () => {
	try {
		return await apiClient.get("/all");
	} catch (error) {
		console.error("Error fetching countries:", error);
		throw error;
	}
};

export const fetchCountry = async (cca3) => {
	try {
		return await apiClient.get(`/alpha/${cca3}`);
	} catch (error) {
		console.error("Error fetching country:", error);
		throw error;
	}
};

export const fetchCountriesByLanguage = async (language) => {
	try {
		return await apiClient.get(`/lang/${language}`);
	} catch (error) {
		console.error("Error fetching countries by language:", error);
		throw error;
	}
};

export const fetchLanguages = async () => {
	try {
		const countries = await apiClient.get("/all?fields=languages");
		const languageSet = new Set();

		for (const country of countries) {
			if (country.languages) {
				for (const language of Object.values(country.languages)) {
					languageSet.add(language);
				}
			}
		}

		return Array.from(languageSet).map((lang) => ({
			value: lang,
			label: lang,
		}));
	} catch (error) {
		console.error("Error fetching languages:", error);
		throw error;
	}
};
