import React, { useEffect } from "react";
import useCountriesStore from "../context/useCountriesStore";
import CountryList from "../features/CountryList";
import FilterBar from "../features/FilterBar";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from "react-i18next";
import ClipLoader from "react-spinners/ClipLoader";

const Home = () => {
	const { countries, filteredCountries, loading, fetchCountries } =
		useCountriesStore();
	const { t } = useTranslation();

	useEffect(() => {
		try {
			if (countries.length === 0) {
				fetchCountries();
			}
		}
		catch (error) {
			console.log("Fetch countries error!");
			toast.error(t("fetch_countries_error"));
		}
	}, []);

	return (
		<div>
			<FilterBar />
			<div className="px-4 py-6 md:px-8 bg-white mt-4 rounded shadow">
				{loading ? (
					<div
						className="flex justify-center items-center h-screen w-full"
					>
						<ClipLoader
							color={"#3c507a"}
							loading={loading}
							size={80}
							aria-label="Loading Spinner"
							data-testid="loader"
						/>
					</div>
				) : (
					<CountryList countries={filteredCountries} />
				)}
			</div>
		</div>
	);
};

export default Home;
