import { useTranslation } from "react-i18next";

export const populations = [
	{ value: "<1M", label: "Less than 1M" },
	{ value: "1M-10M", label: "1M-10M" },
	{ value: "10M-50M", label: "10M-50M" },
	{ value: ">50M", label: "More than 50M" },
];

export const continents = [
	{ value: "Africa", label: "Africa" },
	{ value: "Asia", label: "Asia" },
	{ value: "Europe", label: "Europe" },
	{ value: "North America", label: "North America" },
	{ value: "South America", label: "South America" },
	{ value: "Oceania", label: "Oceania" },
	{ value: "Antarctica", label: "Antarctica" },
];

const useSortOptions = () => {
	const { t } = useTranslation();

	return [
		{ value: "name_asc", label: t("name_asc") },
		{ value: "name_desc", label: t("name_desc") },
		{ value: "population_asc", label: t("population_asc") },
		{ value: "population_desc", label: t("population_desc") },
		{ value: "area_asc", label: t("area_asc") },
		{ value: "area_desc", label: t("area_desc") }
	];
};

export default useSortOptions;