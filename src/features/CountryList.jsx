import React, { useEffect } from "react";
import { toast } from "react-toastify";
import CountryCard from "../components/CountryCard";
import useCountriesStore from "../context/useCountriesStore";
import { useTranslation } from "react-i18next";
import ClipLoader from "react-spinners/ClipLoader";

const CountryList = () => {
	const { filteredCountries, loading, errorMessage } =
		useCountriesStore();
	const { t } = useTranslation();

	useEffect(() => {
		if (errorMessage) {
			toast.error(errorMessage);
		}
	}, [errorMessage]);


	if (loading) return <div
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
	if (errorMessage) return <div>{errorMessage}</div>;

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			{filteredCountries.map((country) => (
				<CountryCard key={country.cca3} country={country} />
			))}
		</div>
	);
};

export default CountryList;
