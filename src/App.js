// use this two values 'metric' for Celsius, 'imperial' for Fahrenheit
import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import WeatherCard from "./Components/weatherCard";
import WeatherErrorCard from "./Components/weatherErrorCard";
import { addSearchHistory } from "./redux/actions";
import SearchHistory from "./Components/historyCard";
import { API_KEY, dummyCelsiusData } from "./Utils/constants";

function App() {
   const [city, setCity] = useState("");
   const [unit, setUnit] = useState("metric");
   const [weatherData, setWeatherData] = useState(null);
   const [hasError, setHasError] = useState(false);
   const [isNotValidError, setIsNotValidError] = useState(false);
   const [errorMessage, setErrorMessage] = useState("");
   const [loadStaticData, setLoadStaticData] = useState(false);
   const dispatch = useDispatch();
   const history = useSelector((state) => state.searchHistory);

   const handleSearch = async (handleSearch, value = "metric") => {
      if (city) {
         try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${value}&appid=${API_KEY}`);
            setWeatherData(response.data);
            {
               !handleSearch && dispatch(addSearchHistory(city));
            }
            setHasError(false);
         } catch (error) {
            console.error("Error fetching weather data:", error);
            if (error?.response?.data?.message === "city not found") {
               setHasError(true);
            } else if (error?.code === "ERR_BAD_REQUEST") {
               setErrorMessage("API key not valid");
            }
            //dispatch(addSearchHistory(city));
            setWeatherData(null);
         }
      }
   };

   const handlePrevSearchClick = async (city) => {
      if (city) {
         setCity(city);
         try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`);
            setWeatherData(response.data);
            dispatch(addSearchHistory(city));
            setHasError(false);
         } catch (error) {
            console.error("Error fetching weather data:", error?.response?.data?.message);
            if (error?.response?.data?.message === "city not found") {
               setHasError(true);
            } else if (error?.code === "ERR_BAD_REQUEST") {
               setErrorMessage("API key not valid");
            }

            setWeatherData(null);
         }
      }
   };
   const handleInputChange = (e) => {
      const inputValue = e.target.value;
      // Regular expression to match only letters and spaces
      const onlyLettersRegex = /^[a-zA-Z\s]+$/;

      if (onlyLettersRegex.test(inputValue) || inputValue === "") {
         setCity(inputValue);
         setIsNotValidError(false);
      } else {
         setIsNotValidError(true);
      }
   };

   const handleLoadStaticData = async (e, message) => {
      if ((e !== undefined && e.target.checked === true) || message === "reloadData") {
         try {
            const response = dummyCelsiusData;
            setWeatherData(response);
            message !== "reloadData" && dispatch(addSearchHistory(city));
            setHasError(false);
         } catch (error) {
            console.error("Error fetching weather data:", error?.response?.data?.message);
            if (error?.response?.data?.message === "city not found") {
               setHasError(true);
            } else if (error?.code === "ERR_BAD_REQUEST") {
               setErrorMessage("API key not valid");
            }
            setWeatherData(null);
         }
      } else {
         setWeatherData(null);
         message !== "reloadData" && dispatch(addSearchHistory(city));
      }
   };

   return (
    <div className="sm:mx-2 md:mx-4 lg:mx-8 lg:w-screen md:w-screen xl:mx-auto xl:px-4 xl:w-screen">
    {/* Container for the Weather App */}
    <div className="sm:flex sm:justify-center md:flex md:justify-center lg:flex lg:justify-center xl:flex xl:justify-center">
       {/* Title for the Weather App */}
       <h1 className="text-3xl font-bold mb-4 text-yellow-50">Weather App</h1>
    </div>
    {/* Container for the main content */}
    <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md p-5">
       {/* Checkbox for loading static data (for testing purposes) */}
       {errorMessage !== "" && (
          <div className="flex items-center">
             <span>
                <div className="flex items-center">
                   <input
                      id="checked-checkbox"
                      type="checkbox"
                      value={loadStaticData}
                      onChange={(e) => {
                         handleLoadStaticData(e);
                      }}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                   />
                   <label for="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Load Static Data (Testing only)
                   </label>
                </div>
             </span>
          </div>
       )}
       {/* Input field for city search */}
       <div className="flex items-center">
          <label htmlFor="simple-search" className="sr-only">
             Search
          </label>
          <div className="relative w-full">
             <input
                type="text"
                id="city-search"
                className="bg-gray-50 border capitalize border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search city name..."
                value={city}
                onChange={(e) => {
                   setCity(e.target.value);
                   setHasError(false);
                   handleInputChange(e);
                }}
             />
          </div>
          {/* Button for initiating search */}
          <button
             type="submit"
             className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
             onClick={() => {
                handleSearch();
             }}
             disabled={isNotValidError}
          >
             {/* Search icon */}
             <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
             </svg>
             <span className="sr-only">Search</span>
          </button>
       </div>
       {/* Checkbox for selecting temperature unit (metric or imperial) */}
       {weatherData && (
          <div className="flex flex-col md:flex-row lg:flex-row mt-3 justify-start ">
             <label className="relative inline-flex items-center cursor-pointer mb-2 md:mb-0 lg:mb-0 md:mr-4 lg:mr-4">
                <input
                   type="checkbox"
                   value={unit}
                   className="sr-only peer"
                   onClick={(e) => {
                      const newUnit = e.target.checked ? "imperial" : "metric";
                      setUnit(newUnit);
                      if (errorMessage !== "") {
                         handleLoadStaticData(undefined, "reloadData");
                      } else {
                         handleSearch("unitChanged", newUnit);
                      }
                   }}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{unit === "metric" ? "Celcius" : "Fahrenheit"}</span>
             </label>
          </div>
       )}
       {/* Error message for invalid input */}
       <div>{isNotValidError && <p className="text-red-500">Please enter only letters and spaces.</p>}</div>
       {/* Display weather card or error card based on search result */}
       <div className="block mt-3">
          {weatherData && !hasError && <WeatherCard weatherData={weatherData} unit={unit} errorMessage={errorMessage} />}
          {(!weatherData && hasError) || (errorMessage !== "" && <WeatherErrorCard city={city} errorMessage={errorMessage} />)}
          {/* Separator line */}
          <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700" />
          {/* Display search history */}
          {history && <SearchHistory searches={history} handlePrevSearchClick={handlePrevSearchClick} />}
       </div>
    </div>
 </div>
 
   );
}

export default App;
