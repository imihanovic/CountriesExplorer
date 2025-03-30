import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaGlobeAmericas } from "react-icons/fa";
import { useTranslation } from "react-i18next"; // Importiraj useTranslation hook
import useCountriesStore from "../context/useCountriesStore";

const Header = () => {
	const { t, i18n } = useTranslation();
	const { setFilter } = useCountriesStore();
	const location = useLocation();

	const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State za kontrolu dropdowna

	const handleSearch = (event) => {
		setFilter("search", event.target.value);
	};

	const showSearchBar = location.pathname === "/";

	const handleLanguageChange = (lang) => {
		i18n.changeLanguage(lang);
		setIsDropdownOpen(false); // Zatvaranje dropdowna nakon promjene jezika
	};

	return (
		<header className="bg-[#3c507a] text-white py-4 shadow-md">
			<div className="w-full flex flex-col md:flex-row justify-between items-center px-4">
				<div className="flex items-center space-x-2 pl-2">
					<FaGlobeAmericas className="text-3xl" />
					<h1>
						<Link to="/" className="text-2xl font-bold hover:text-gray-200">
							Countries Explorer
						</Link>
					</h1>
				</div>

				<div className="flex items-center space-x-4 mt-4 md:mt-0">
					{showSearchBar && (
						<input
							type="text"
							name="search"
							placeholder={t("search_placeholder")}
							onChange={handleSearch}
							className="border p-2 rounded-lg text-black w-full sm:w-96 md:w-72"
						/>
					)}

					<div className="relative">
						<button
							type="button"s
							onClick={() => setIsDropdownOpen(!isDropdownOpen)}
							className="bg-[#38618b] text-white p-2 rounded-lg focus:outline-none w-10"
						>
							<b>{i18n.language.toUpperCase()}</b>
						</button>

						{isDropdownOpen && (
							<div className="absolute right-0 bg-white text-black rounded-lg shadow-lg mt-2 w-32 z-50">
								<div className="space-y-2 p-2">
									<button
										type="button"
										onClick={() => handleLanguageChange("en")}
										onKeyDown={(e) => e.key === "Enter" && handleLanguageChange("en")}
										className="cursor-pointer hover:bg-gray-200 p-2 rounded w-full text-left"
									>
										EN
									</button>
									<button
										type="button"
										onClick={() => handleLanguageChange("hr")}
										onKeyDown={(e) => e.key === "Enter" && handleLanguageChange("hr")}
										className="cursor-pointer hover:bg-gray-200 p-2 rounded w-full text-left"
									>
										HR
									</button>
								</div>
							</div>
						)}


					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
