import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import useCountriesStore from "../context/useCountriesStore";
import { useTranslation } from "react-i18next";
import FilterSelects from "../components/FilterSelect";
import SortSelect from "../components/SortSelect";
import { continents, populations } from "../constants/constants";
import { toast } from "react-toastify";

const FilterBar = () => {
	const { setFilter, languages, fetchLanguages, setSortOrder, errorMessage } =
		useCountriesStore();
	const [isOpen, setIsOpen] = useState(false);
	const [selectedFilters, setSelectedFilters] = useState({
		continent: null,
		population: null,
		language: null,
	});

	const { t } = useTranslation();

	useEffect(() => {
		fetchLanguages();
	}, [fetchLanguages]);

	useEffect(() => {
		if (errorMessage) {
			toast.error(errorMessage);
		}
	}, []);

	const handleFilterChange = (name, selectedOption) => {
		setSelectedFilters((prev) => ({
			...prev,
			[name]: selectedOption,
		}));
		setFilter(name, selectedOption ? selectedOption.value : "");
	};

	const resetFilters = () => {
		setSelectedFilters({
			continent: null,
			population: null,
			language: null,
		});
		setFilter("continent", "");
		setFilter("population", "");
		setFilter("language", "");
	};

	return (
		<div className="px-4 py-6 bg-white shadow-md md:px-6 lg:px-8 rounded">
			<button
				type="button"
				className="xl:hidden flex items-center gap-2 px-4 py-2 bg-[#3c507a] text-white rounded-lg shadow-md mb-2"
				onClick={() => setIsOpen(!isOpen)}
			>
				<IoFilterSharp />
				<span>{t("filters")}</span>
			</button>

			<div
				className={`${isOpen ? "block" : "hidden"} xl:flex flex-col xl:flex-row bg-white rounded-lg mt-2 md:mt-0`}
			>
				<div className="flex flex-wrap gap-2 flex-col xl:flex-row">
					<FilterSelects
						selectedFilters={selectedFilters}
						handleFilterChange={handleFilterChange}
						continents={continents}
						populations={populations}
						languages={languages}
						isOpen={isOpen}
					/>

					<button
						type="button"
						onClick={resetFilters}
						className={`px-4 py-2 bg-red-500 text-white rounded flex items-center gap-2 w-28 ${isOpen ? "mb-2" : "mb-0"}`}
					>
						<FaTimes />
						{t("reset")}
					</button>
				</div>
				<div className="ml-auto">
					<SortSelect setSortOrder={setSortOrder} />
				</div>
			</div>
		</div>
	);
};

export default FilterBar;
