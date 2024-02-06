// text-blue-500: Sets the text color to a shade of blue if the temperature is below freezing.
// text-green-500: Sets the text color to a shade of green if the temperature is between 0 and 25.
// text-red-500: Sets the text color to a shade of red if the temperature is above 25.

import React from "react";
import * as moment from 'moment';

const WeatherCard = ({ weatherData, unit, errorMessage }) => {


  const getTemperatureColor = (temperature) => {
  if (unit === "metric") {
    if (temperature >= 30) {
      return "text-red-500";
    } else if (temperature >= 20) {
      return "text-yellow-500";
    } else if (temperature >= 10) {
      return "text-green-500";
    } else {
      return "text-blue-500";
    }
  } else {
    // For imperial unit
    const temperatureF = (temperature * 9) / 5 + 32;
    if (temperatureF >= 86) {
      return "text-red-500";
    } else if (temperatureF >= 68) {
      return "text-yellow-500";
    } else if (temperatureF >= 50) {
      return "text-green-500";
    } else {
      return "text-blue-500";
    }
  }
  };

   return (
      <div className="flex items-center justify-center mt-12">
       {errorMessage !== "" && (<div className="flex flex-col bg-white rounded p-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        <div className="font-bold text-xl">{weatherData?.name}</div>
        <div className="text-sm text-gray-500">{moment().format('MMMM Do YYYY')}</div>
        <div className="flex flex-row items-center justify-center mt-6">
          <div className="font-medium text-5xl">{unit === "metric" ? Math.round(weatherData?.main?.temperature) :  Math.round(weatherData?.main?.temp * (9 / 5) + 32)} &deg;{unit === "metric" ? "C" : "F"}</div>
        </div>
        <div className="flex flex-row justify-between mt-6">
          <div className="flex flex-col items-center">
            <div className="font-medium text-sm">Wind</div>
            <div className="text-sm text-gray-800 font-medium">{weatherData?.wind?.speed} m/s</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="font-medium text-sm">Humidity</div>
            <div className="text-sm text-gray-800 font-medium">{weatherData?.main?.humidity}%</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="font-medium text-sm">Visibility</div>
            <div className="text-sm text-gray-800 font-medium">{Math.round(weatherData?.visibility / 100) / 10} km</div>
          </div>
        </div>
      </div>)}


      {errorMessage === "" && (
      <div className="flex flex-col  bg-white rounded p-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        <div className="font-bold justify-center flex text-4xl">{weatherData?.name}</div>
        <div className=" justify-center flex text-sm text-gray-500">{moment().format('MMMM Do YYYY')}</div>
        <div className="flex flex-row items-center justify-center mt-6">
          <div  className={`${getTemperatureColor(Math.round(weatherData?.main?.temp))} font-medium text-5xl`}>{Math.round(weatherData?.main?.temp)} &deg;{unit === "metric" ? "C" : "F"}</div>
        </div>
        <div className="flex flex-row justify-between mt-6">
          <div className="flex flex-col items-center">
            <div className="font-medium text-sm">Wind</div>
            <div className="text-sm text-gray-800 font-medium">{weatherData?.wind?.speed} m/s</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="font-medium text-sm">Humidity</div>
            <div className="text-sm text-gray-800 font-medium">{weatherData?.main?.humidity}%</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="font-medium text-sm">Visibility</div>
            <div className="text-sm text-gray-800 font-medium">{Math.round(weatherData?.visibility / 100) / 10} km</div>
          </div>
        </div>
      </div>)}


    </div>
    
   );
};

export default WeatherCard;
