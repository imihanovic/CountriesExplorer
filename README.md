# Countries Explorer App
## Initial Setup

Before starting, ensure that you have **node.js** and **npm** installed on your machine. You can check if they're installed by running:

node -v   (v20.18.0) \
npm -v   (10.8.2)

If not, you can download and install Node.js (which includes npm) from [here](https://nodejs.org/en).

## Clone the repository

git clone https://github.com/imihanovic/CountriesExplorerApp.git

## Install dependencies from the root folder

npm install

## Run the development server 

npm run dev

You should be able to see something like this: 

VITE v6.2.2  ready in 525 ms

  ➜  Local:   http://localhost:5173/  \
  ➜  Network: use --host to expose  
  ➜  press h + enter to show help
  
Open your browser and go to http://localhost:5173. You should be able to see the Countries Explorer App interface running in your browser.

## Technologies
### 📌 Frontend
- **Vite**
- **React Router** – Navigation between pages
- **Zustand** – Managing global app state
- **React Select** – Advanced dropdown components
- **Flowbite + Flowbite React** – UI components based on TailwindCSS
- **React Toastify** – Displaying notifications to users

### 🎨 Styling
- **Tailwind CSS** – Utility-first CSS framework for responsive design
- **PostCSS** – CSS processing and optimization

### 🌍 Maps
- **Leaflet.js** – Displaying interactive maps
- **React Leaflet** – Integrating Leaflet maps into React applications

### ✅ Testing
- **Vitest** – Fast testing for React applications
- **@testing-library/react** – Testing React components
- **JSDOM** – Simulating the DOM for testing

### 🛠 Tools and Configuration
- **@biomejs/biome** – Code formatting, linting, and static analysis
- **TailwindCSS Select2 Theme** – Customizing styles for Select2 components

### 🚀 Build and Development
- **Vite** – Fast development server and build tool
- **@vitejs/plugin-react** – Optimizing React applications for Vite



## Project Structure

```bash
/src
│── /api
│   │── client.js
│   │── CountriesApi.js
│
│── /components
│   │── CountryCard.jsx
│   │── FilterSelect.jsx
│   │── Header.jsx
│   │── SortSelect.jsx
│
│── /constants
│   │── constants.jsx
│
│── /context
│   │── useCountriesStore.jsx
│
│── /features
│   │── CountryList.jsx
│   │── FilterBar.jsx
│   │── GoogleMap.jsx
│   │── OpenStreetMap.jsx
│
│── /locales
│   │── en.json
│   │── hr.json
│
│── /pages
│   │── CountryDetails.jsx
│   │── Home.jsx
│
│── App.css
│── App.jsx
│── i18n.js
│── index.css
│── main.jsx
```

### Folder and File Explanation

1. **`/api`**: 
   - Files related to API communication. `CountriesApi.js` handles the logic for fetching country data from the API, while `client.js` sets up the basic configuration for making API calls.

2. **`/components`**: 
   - Reusable UI components:
     - `CountryCard.jsx` for displaying individual country in the list.
     - `FilterSelect.jsx` for filter dropdowns.
     - `SortSelect.jsx` for sorting options.
     - `Header.jsx` for the app's header containing search bar.

3. **`/constants`**: 
   - Constant values for sorting options as for population and continent filters.

4. **`/context`**: 
   - Contains `useCountriesStore.jsx`, a custom React hook that uses **Zustand** to manage the global state for the countries list and filters.

5. **`/features`**: 
     - `CountryList.jsx` for displaying the list of countries.
     - `FilterBar.jsx` for handling the sort and filter functionality.
     - `GoogleMap.jsx` and `OpenStreetMap.jsx` for showing maps with different mapping services.

6. **`/locales`**: 
   - JSON files with translations for different languages (English and Croatian in this project).

7. **`/pages`**: 
     - `CountryDetails.jsx` for displaying details of each country.
     - `Home.jsx` for the main page displaying the list of countries.

8. **Global files**: 
   - `App.jsx` contains the main structure of the application, rendering core elements like the Header, routing setup with Routes and Route for navigation, and the ToastContainer for displaying notifications.
   - `App.css` contains the global CSS styles.
   - `i18n.js` handles the internationalization setup.
   - `index.css` includes the base styles and imports for the app.
   - `main.jsx` is the entry point for the application where React mounts the App.jsx component to the DOM and starts the app.


## Upgrade possibilities

### 1. Expanding API functionality
- **Adding pagination**: Although pagination would be useful, the RestCountries API does not support pagination. Eventhough it is possible to implement pagination on the client side, it would be more efficient if pagination was handled on the backend as well. Backend pagination would reduce the amount of data transferred and improve performance.

### 2. UI and User Experience enhancements
- **Dark mode**: Implementing dark mode has become a popular feature in modern web applications. By utilizing `useState` or `useContext`, it would be easily enabled to switch between light and dark themes, enhancing the overall user experience.

- **Favorites or Tags**: Allow users to mark their favorite countries and store that data in `localStorage` or `indexedDB`.

### 3. Scalability and performance optimization
- **Lazy Loading and Code Splitting**: Load components like `GoogleMap.jsx` when they're actually needed.
- **Search delay**: Prevent too many API calls when typing in the search filters (`FilterBar.jsx`).

### 4. Geolocation and interactive features
- **Displaying user's current location**: Adding location detection and show the nearest country and bordering countries (`navigator.geolocation`).
- **Interactive Maps**: Using interactive maps to select a country and automatically open its details (`OpenStreetMap.jsx`).

### 5. Multilingual support and accessibility
- **Adding new languages**: Adding additional languages in `/locales`.
- **Improving Accessibility (a11y)**: `aria-label` attributes for better keyboard navigation and screen reader support.

### 6. Offline access
- **Service Worker for PWA support**: Offline access to the app through Progressive Web App standards.
