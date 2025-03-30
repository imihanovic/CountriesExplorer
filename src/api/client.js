const BASE_URL = "https://restcountries.com/v3.1";

class ApiClient {
	async fetch(endpoint, options = {}) {
		try {
			const response = await fetch(`${BASE_URL}${endpoint}`, {
				...options,
				headers: {
					"Content-Type": "application/json",
					...options.headers,
				},
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			return await response.json();
		} catch (error) {
			console.error(`API request failed: ${error.message}`);
			throw error;
		}
	}

	async get(endpoint) {
		return this.fetch(endpoint, { method: "GET" });
	}
}

export const apiClient = new ApiClient();
