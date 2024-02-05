// use this two values 'metric' for Celsius, 'imperial' for Fahrenheit
import "./App.css";
import { useEffect, useState } from "react";
import { API_KEY } from "./Utils/constants";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import WeatherCard from "./Components/weatherCard";

function App() {
  const [city, setCity] = useState("ahmedabad ");
  const [unit, setUnit] = useState("metric");
  const [weatherData, setWeatherData] = useState(null);
  // const dispatch = useDispatch();
  // const history = useSelector((state) => state.history);

  useEffect(() => {
    if (city?.trim() !== "") {
      handleSearch();
    }
  }, [unit]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://openweathermap.org/data/2.5/find?q=${city}&appid=${API_KEY}&units=${unit}`
      );
      setWeatherData(response.data);
      // dispatch(addToHistory(city));
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData(null);
    }
  };

  return (
    <div className=" mx-auto px-4 bg-[url('https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2076&q=80')] h-screen ">
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold mb-4 ">Weather App</h1>
      </div>
      <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md">
        <div className="flex items-center mb-4 p-3">
          <input
            type="text"
            placeholder="Search a city . . . "
            className="p-2 mr-2 border border-gray-300 rounded-xl w-screen focus:border-none"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              handleSearch(e.target.value);
            }}
          />
        </div>
        {/* {weatherData && ( */}
       <WeatherCard weatherData={weatherData} unit={unit}/>

        {/* )} */}

        <div class="p-4">
          <p>Data goes here</p>
        </div>
      </div>
    </div>
  );
}

export default App;
