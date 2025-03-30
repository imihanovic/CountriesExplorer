import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import CountryDetails from "./pages/CountryDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
	return (
		<Router>
			<div className="app font-sans bg-gray-100 min-h-screen">
				<Header />
				<div className="px-4 py-6 md:px-8">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/country/:countryCode" element={<CountryDetails />} />
					</Routes>
				</div>
			</div>
			<ToastContainer />
		</Router>
	);
};

export default App;
