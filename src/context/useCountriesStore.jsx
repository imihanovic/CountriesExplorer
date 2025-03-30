import { create } from "zustand";
import {
	fetchCountries,
	fetchCountriesByLanguage,
	fetchLanguages,
	fetchCountry
} from "../api/CountriesApi";

const sortCountries = (countries, sortOrder) => {
	switch (sortOrder) {
		case "name_asc":
			return countries.sort((a, b) =>
				a.name.common.localeCompare(b.name.common),
			);
		case "name_desc":
			return countries.sort((a, b) =>
				b.name.common.localeCompare(a.name.common),
			);
		case "population_asc":
			return countries.sort((a, b) => a.population - b.population);
		case "population_desc":
			return countries.sort((a, b) => b.population - a.population);
		case "area_asc":
			return countries.sort((a, b) => a.area - b.area);
		case "area_desc":
			return countries.sort((a, b) => b.area - a.area);
		default:
			return countries;
	}
};

const useCountriesStore = create((set) => ({
	countries: [],
	filteredCountries: [],
	languages: [],
	loading: true,
	filters: {
		continent: "",
		population: "",
		language: "",
		search: "",
	},
	sortOrder: "",
	errorMessage: "",
	country: [],


	fetchCountries: async () => {
		set({ loading: true });
		try {
			const data = await fetchCountries();
			set({ countries: data, filteredCountries: data, loading: false, errorMessage: "" });
		} catch (error) {
			console.error("Error fetching countries in store:", error);
			set({ loading: false, errorMessage: "Failed to fetch countries." });
		}
	},

	fetchCountry: async (cca3) => {
		set({ loading: true });
		try {
			const data = await fetchCountry(cca3);
			if (!data) {
				throw new Error("Country not found");
			}
			set({ chosenCountry: data[0], loading: false, errorMessage: "" });
		} catch (error) {
			console.error("Error fetching countries in store:", error);
			set({ loading: false, errorMessage: "Country not found" });
		}
	},

	fetchLanguages: async () => {
		set({ loading: true });
		try {
			const data = await fetchLanguages();
			set({ languages: data, loading: false, errorMessage: "" });
		} catch (error) {
			console.error("Error fetching languages in store:", error);
			set({ loading: false, errorMessage: "Failed to fetch languages" });
		}
	},

	setFilter: async (filterType, value) => {
		set((state) => ({
			filters: { ...state.filters, [filterType]: value },
			loading: true,
		}));

		try {
			let filteredCountries = useCountriesStore.getState().countries;
			const filtersChosen = useCountriesStore.getState().filters;

			if (filtersChosen.language) {
				const countriesByLanguage = await fetchCountriesByLanguage(
					filtersChosen.language,
				);
				const countryNames = new Set(
					countriesByLanguage.map((c) => c.name.common),
				);
				filteredCountries = filteredCountries.filter((country) =>
					countryNames.has(country.name.common),
				);
			}

			if (filtersChosen.continent) {
				filteredCountries = filteredCountries.filter((country) =>
					country.continents.includes(
						filtersChosen.continent,
					),
				);
			}

			if (filtersChosen.population) {
				const populationFilter =
					filtersChosen.population;
				filteredCountries = filteredCountries.filter((country) => {
					if (populationFilter === "<1M") return country.population < 1000000;
					if (populationFilter === "1M-10M")
						return (
							country.population >= 1000000 && country.population <= 10000000
						);
					if (populationFilter === "10M-50M")
						return (
							country.population >= 10000000 && country.population <= 50000000
						);
					if (populationFilter === ">50M") return country.population > 50000000;
					return true;
				});
			}

			if (filtersChosen.search) {
				const searchQuery = filtersChosen.search.toLowerCase();
				filteredCountries = filteredCountries.filter((country) =>
					country.name.common.toLowerCase().includes(searchQuery),
				);
			}

			const sortOrder = useCountriesStore.getState().sortOrder;
			if (sortOrder) {
				filteredCountries = sortCountries(filteredCountries, sortOrder);
			}

			set((state) => ({ filteredCountries, loading: false, errorMessage: "" }));
		} catch (error) {
			console.error("Error filtering countries:", error);
			set({ loading: false, errorMessage: "Failed to filter countries" });
		}
	},

	setSortOrder: (order) => {
		set({ sortOrder: order });
		set((state) => {
			const sortedCountries = sortCountries(state.filteredCountries, order);
			return { filteredCountries: sortedCountries };
		});
	},

	resetFilters: () => {
		set({
			filters: {
				continent: "",
				population: "",
				language: "",
				search: "",
			},
		});
		set({ filteredCountries: useCountriesStore.getState().countries });
	},
}));

export default useCountriesStore;
