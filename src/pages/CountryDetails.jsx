import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCountriesStore from "../context/useCountriesStore";
import { useTranslation } from "react-i18next";
import 'react-toastify/dist/ReactToastify.css';
import { IoFootball } from "react-icons/io5";
import { FaRoad } from "react-icons/fa";
import { FaCarRear } from "react-icons/fa6";
import GoogleMaps from "../features/GoogleMap";
import OpenStreetMaps from "../features/OpenStreetMap";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

const CountryDetails = () => {
	const { countryCode } = useParams();
	const { countries, chosenCountry, loading, fetchCountry, errorMessage } = useCountriesStore();
	const [country, setCountry] = useState(null);
	const { t } = useTranslation();

	useEffect(() => {
		const countryFound = countries.find((c) => c.cca3 === countryCode);
		if (countryFound) {
			setCountry(countryFound);
		}
		else {
			fetchCountry(countryCode);
		}
	}, [countryCode]);

	useEffect(() => {
		if (chosenCountry) {
			setCountry(chosenCountry);
		}
	}, [chosenCountry]);

	useEffect(() => {
		if (errorMessage) {
			toast.error(errorMessage);
		}
	}, [errorMessage]);

	if (errorMessage) {
		return <div>{t('not_found')}</div>
	}

	if (loading || !country) {
		return <div
			className="flex justify-center items-center h-screen w-full"
		>
			<ClipLoader
				color={"#3c507a"}
				loading={loading}
				size={80}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
		</div>;
	}

	return (
		<div className="p-4 md:p-8 max-w-6xl mx-auto">
			<div className="flex flex-col md:flex-row gap-6 items-start">
				<div className="w-full md:w-1/2">
					<img
						src={country.flags.png}
						alt={country.name.common}
						className="w-full max-h-64 object-contain border rounded-lg"
					/>
				</div>
				<div className="w-full md:w-1/2 space-y-4 md:ml-10">
					<h1 className="text-4xl font-bold">{country.name.common}</h1>
					<p className="text-lg text-gray-700">
						<span className="font-semibold">{t("official_name")}:</span>{" "}
						{country.name.official}
					</p>
					<div className="text-lg text-gray-700">
						<div className="flex">
							<span className="font-semibold whitespace-nowrap">
								{t("native_name")}:
							</span>
							<div className="flex flex-col pl-2">
								{country.name.nativeName
									? (() => {
										const nativeNames = Object.entries(
											country.name.nativeName,
										);
										const [firstLangCode, firstLang] = nativeNames[0];

										return (
											<>
												<span>
													<span className="font-medium">
														{firstLangCode.toUpperCase()}:
													</span>{" "}
													{firstLang.official} ({firstLang.common})
												</span>
												{nativeNames.length > 1 &&
													nativeNames.slice(1).map(([langCode, lang]) => (
														<span key={langCode}>
															<span className="font-medium">{langCode.toUpperCase()}:</span>{" "}
															{lang.official} ({lang.common})
														</span>
													))}
											</>
										);
									})()
									: t("n_a")}
							</div>
						</div>
					</div>
					{country.capital && (
						<p className="text-lg text-gray-700">
							<span className="font-semibold">{t("capital")}:</span>{" "}
							{country.capital?.[0]}
						</p>
					)}
					{country.region && (
						<p className="text-lg text-gray-700">
							<span className="font-semibold">{t("region")}:</span>{" "}
							{country.region}
						</p>
					)}
					{country.subregion && (
						<p className="text-lg text-gray-700">
							<span className="font-semibold">{t("subregion")}:</span>{" "}
							{country.subregion}
						</p>
					)}
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
				{country.languages && (
					<div>
						<h2 className="text-xl font-semibold">{t("languages")}</h2>
						<p className="text-gray-600">
							{Object.values(country.languages).join(", ")}
						</p>
					</div>
				)}
				{country.population && (
					<div>
						<h2 className="text-xl font-semibold">{t("population")}</h2>
						<p className="text-gray-600">{country.population.toLocaleString()}</p>
					</div>
				)}
				{country.area && (
					<div>
						<h2 className="text-xl font-semibold">{t("area")}</h2>
						<p className="text-gray-600">{country.area} km²</p>
					</div>
				)}
				{country.gini && (
					<div>
						<h2 className="text-xl font-semibold">{t("gini")}</h2>
						<p className="text-gray-600">
							{country.gini
								? Object.entries(country.gini)
									.map(([year, value]) => `${year}: ${value}`)
									.join(", ")
								: t("n_a")}
						</p>
					</div>
				)}
				<div>
					<h2 className="text-xl font-semibold">{t("independent")}</h2>
					<p className="text-sm"> {country.independent ? "✅" : "❌"}</p>
				</div>
				{country.currencies && (
					<div>
						<h2 className="text-xl font-semibold">{t("currencies")}</h2>
						<p className="text-gray-600">
							{Object.values(country.currencies)
								.map((curr) => `${curr.name} (${curr.symbol})`)
								.join(", ")}
						</p>
					</div>
				)}
				{country.borders && (
					<div>
						<h2 className="text-xl font-semibold">{t("borders")}</h2>
						<p className="text-gray-600">
							{country.borders?.length
								? country.borders.join(", ")
								: "No borders"}
						</p>
					</div>
				)}
				{country.latlng && (
					<div>
						<h2 className="text-xl font-semibold">{t("coordinates")}</h2>
						<p className="text-gray-600">
							{country.latlng?.length === 2
								? `${country.latlng[0].toFixed(4)}°, ${country.latlng[1].toFixed(4)}°`
								: t("n_a")}
						</p>
					</div>
				)}
				{country.timezones && (
					<div>
						<h2 className="text-xl font-semibold">{t("timezones")}</h2>
						<p className="text-gray-600">{country.timezones.join(", ")}</p>
					</div>
				)}
				{country.status && (
					<div>
						<h2 className="text-xl font-semibold">{t("status")}</h2>
						<p className="text-gray-600">{country.status}</p>
					</div>
				)}
				<div>
					<h2 className="text-xl font-semibold">{t("unMember")}</h2>
					<p className="text-sm"> {country.unMember ? "✅" : "❌"}</p>
				</div>
				{country.tld && (
					<div>
						<h2 className="text-xl font-semibold">{t("tld")}</h2>
						<p className="text-gray-600">
							{Object.values(country.tld).join(", ")}
						</p>
					</div>
				)}
				{country.fifa && (
					<div>
						<h2 className="text-xl font-semibold flex items-center gap-1">
							{t("fifa")}<IoFootball className="text-2xl relative top-0.5" />
						</h2>

						<p className="text-gray-600"> {country.fifa}</p>
					</div>
				)}
				{country.demonyms && (
					<div>
						<h2 className="text-xl font-semibold">{t("demonyms")}</h2>
						<p className="text-gray-600">
							{country.demonyms?.eng
								? `${t("male")}: ${country.demonyms.eng.m}, ${t("female")}: ${country.demonyms.eng.f}`
								: t("n_a")}
						</p>
					</div>
				)}
				{country.altSpellings && (
					<div>
						<h2 className="text-xl font-semibold">{t("altSpellings")}</h2>
						<p className="text-gray-600">
							{Object.values(country.altSpellings).join(", ")}
						</p>
					</div>
				)}
				<div>
					<h2 className="text-xl font-semibold">{t("landlocked")}</h2>
					<p className="text-sm"> {country.landlocked ? "✅" : "❌"}</p>
				</div>
				<div>
					<h2 className="text-xl font-semibold">{t("country_codes")}</h2>
					<ul className="text-gray-600">
						<li>
							{t("cca2")}: {country.cca2}
						</li>
						<li>
							{t("cca3")}: {country.cca3}
						</li>
						<li>
							{t("ccn3")}: {country.ccn3}
						</li>
						<li>
							{t("cioc")}: {country.cioc}
						</li>
					</ul>
				</div>
				<div>
					{country.car.side === "right" && (
						<h2 className="text-xl font-semibold flex items-center gap-1">
							{t("car")}
							<FaRoad className="relative top-0.5" />
							<FaCarRear className="relative top-0.5" /></h2>
					)}
					{country.car.side === "left" && (
						<h2 className="text-xl font-semibold flex items-center gap-1">
							{t("car")} <FaCarRear /><FaRoad /></h2>
					)}
					<div className="flex items-center gap-2">
						<p className="text-gray-600">
							{country.car?.signs?.length ? country.car.signs.join(", ") : t("n_a")}
						</p>
					</div>
				</div>
				<div>
					<div>
						<h2 className="text-xl font-semibold">{t("start_of_week")}</h2>
						<p className="text-gray-600">
							{country.startOfWeek ? country.startOfWeek : t("n_a")}
						</p>
					</div>
				</div>
				<div>
					<div>
						<h2 className="text-xl font-semibold">{t("capital_info")}</h2>
						<p className="text-gray-600">
							{country.capitalInfo?.latlng?.length
								? `${country.capitalInfo.latlng[0]}, ${country.capitalInfo.latlng[1]}`
								: t("n_a")}
						</p>
					</div>
				</div>
				<div>
					<div>
						<h2 className="text-xl font-semibold">{t("postal_code")}</h2>
						<p className="text-gray-600">
							{country.postalCode?.format && country.postalCode?.regex
								? `${country.postalCode.format} (${country.postalCode.regex})`
								: t("n_a")}
						</p>
					</div>
				</div>


				{country.idd && (
					<div>
						<h2 className="text-xl font-semibold">{t("idd")}</h2>
						<p className="text-gray-600">
							{country.idd?.root
								? country.idd.suffixes?.length
									? country.idd.suffixes.map((suffix) => `${country.idd.root}${suffix}`).join(", ")
									: country.idd.root
								: t("n_a")}
						</p>
					</div>
				)}
				{country.translations && (
					<div>
						<h2 className="text-xl font-semibold">{t("translations")}</h2>
						<ul className="text-gray-600">
							{Object.keys(country.translations).map((lang) => (
								<li key={lang}>
									{lang.toUpperCase()}: {country.translations[lang].common}
								</li>
							))}
						</ul>
					</div>
				)}
			</div>

			<div className="mt-8">
				<h2 className="text-2xl font-semibold">{t("maps")}</h2>
				<div className="mt-4">
					<p>
						<strong>Google {t("maps")}:</strong>{" "}
						<a
							href={country.maps.googleMaps}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-500"
						>
							{t("open")} Google {t("maps")}
						</a>
					</p>
					<div className="mt-4 mb-10 w-full h-80">
						<GoogleMaps
							lat={country.latlng[0]}
							lng={country.latlng[1]}
							name={country.name.common}
						/>
					</div>
					<p>
						<strong>OpenStreetMap:</strong>{" "}
						<a
							href={country.maps.openStreetMaps}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-500"
						>
							{t("open")} OpenStreetMap
						</a>
					</p>
					<div className="mt-4 w-full h-80">
						<OpenStreetMaps
							lat={country.latlng[0]}
							lng={country.latlng[1]}
							name={country.name.common}
						/>
					</div>
				</div>
			</div>
			<div className="mt-8 text-center">
				<h2 className="text-2xl font-semibold">Coat of Arms</h2>
				{country.coatOfArms?.png ? (
					<img
						src={country.coatOfArms.png}
						alt={`Coat of Arms of ${country.name.common}`}
						className="w-32 h-32 object-contain mx-auto mt-4"
					/>
				) : (
					<div className="w-32 h-32 bg-gray-200 flex justify-center items-center mx-auto mt-4 text-gray-500">
						<span>{t("n_a")}</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default CountryDetails;
