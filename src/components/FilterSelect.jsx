import React from "react";
import Select from "react-select";
import { useTranslation } from "react-i18next";

const FilterSelects = ({
	selectedFilters,
	handleFilterChange,
	continents,
	populations,
	languages,
}) => {
	const { t } = useTranslation();
	return (
		<div className="flex flex-col md:flex-row">
			<Select
				options={continents}
				value={selectedFilters.continent}
				onChange={(selectedOption) =>
					handleFilterChange("continent", selectedOption)
				}
				isClearable
				placeholder={t("filter_continent")}
				className={"w-full md:w-48 lg:w-64 text-sm me-2 mb-2 md:mb-0"}
				classNames={{
					control: () => "border rounded-lg p-1 shadow-sm",
					menu: () => "bg-white border border-gray-200 shadow-lg rounded-md",
					option: ({ isFocused }) =>
						isFocused
							? "bg-blue-500 text-white p-2 cursor-pointer"
							: "p-2 cursor-pointer",
				}}
			/>
			<Select
				options={populations}
				value={selectedFilters.population}
				onChange={(selectedOption) =>
					handleFilterChange("population", selectedOption)
				}
				isClearable
				placeholder={t("filter_population")}
				className={"w-full md:w-48 lg:w-64 text-sm me-2 mb-2 md:mb-0"}
				classNames={{
					control: () => "border rounded-lg p-1 shadow-sm",
					menu: () => "bg-white border border-gray-200 shadow-lg rounded-md",
					option: ({ isFocused }) =>
						isFocused
							? "bg-blue-500 text-white p-2 cursor-pointer"
							: "p-2 cursor-pointer",
				}}
			/>
			<Select
				options={languages}
				value={selectedFilters.language}
				onChange={(selectedOption) =>
					handleFilterChange("language", selectedOption)
				}
				isClearable
				placeholder={t("filter_language")}
				className={"w-full md:w-48 lg:w-64 text-sm"}
				classNames={{
					control: () => "border rounded-lg p-1 shadow-sm",
					menu: () => "bg-white border border-gray-200 shadow-lg rounded-md",
					option: ({ isFocused }) =>
						isFocused
							? "bg-blue-500 text-white p-2 cursor-pointer"
							: "p-2 cursor-pointer",
				}}
			/>
		</div>
	);
};

export default FilterSelects;
