import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CountryCard = ({ country }) => {
	const { t } = useTranslation();
	return (
		<Link to={`/country/${country.cca3}`} className="block">
			<div className="country-card bg-[#e0e1e6] p-4 rounded-lg shadow-md flex flex-col items-center relative group">
				<div className="w-40 h-24 sm:w-48 sm:h-28 md:w-56 md:h-32 lg:w-64 lg:h-36 overflow-hidden flex justify-center items-center mb-4">
					<img
						className="max-w-[80%] max-h-[80%] object-contain"
						src={country.flags.png}
						alt={country.name.common}
					/>
				</div>

				<div className="absolute top-16 left-1/2 -translate-x-1/2 w-64 text-sm text-gray-500 bg-white border border-gray-200 rounded-lg shadow-md p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
					<p className="text-base font-semibold text-gray-900">
						{t("country_info")}
					</p>
					<p className="text-sm">
						<b>{t("region")}:</b> {country.region}
					</p>
					<p className="text-sm">
						<b>{t("subregion")}:</b> {country.subregion}
					</p>
					<p className="text-sm">
						<b>{t("capital")}:</b>{" "}
						{country.capital
							? Object.values(country.capital).map((cap, i, arr) => (
								<span key={`${country.cca3}-${cap}`}>
									{cap}
									{i !== arr.length - 1 ? ", " : ""}
								</span>
							))
							: t("n_a")}
					</p>
					<p className="text-sm">
						<b>{t("currencies")}:</b>{" "}
						{country.currencies ? (
							Object.entries(country.currencies).map(([code, curr], i, arr) => (
								<span key={code}>
									{curr.name} - {curr.symbol}
									{i !== arr.length - 1 ? ", " : ""}
								</span>
							))
						) : (
							t("n_a")
						)}
					</p>
				</div>

				<h3 className="text-lg font-bold">{country.name.common}</h3>
				<p className="text-sm text-gray-700">
					{t("population")}: {country.population.toLocaleString()}
				</p>
				<p className="text-sm text-gray-700">
					{t("continents")}: {country.continents.join(", ")}
				</p>
			</div>
		</Link>
	);
};

export default CountryCard;
