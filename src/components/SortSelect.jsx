import React, { useState } from "react";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import useSortOptions from "../constants/constants";

const SortSelect = ({ setSortOrder }) => {
	const { t } = useTranslation();
	const [activeSort, setActiveSort] = useState("");

	const handleSortChange = (newSortOrder) => {
		setActiveSort(newSortOrder);
		setSortOrder(newSortOrder.value);
	};

	return (
		<Select
			options={useSortOptions()}
			value={activeSort}
			onChange={handleSortChange}
			isClearable
			isSearchable={false}
			placeholder={t("sortPlaceholder")}
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
	);
};

export default SortSelect;
