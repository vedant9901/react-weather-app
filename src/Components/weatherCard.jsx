// text-blue-500: Sets the text color to a shade of blue if the temperature is below freezing.
// text-green-500: Sets the text color to a shade of green if the temperature is between 0 and 25.
// text-red-500: Sets the text color to a shade of red if the temperature is above 25.

import React from "react";

const WeatherCard =({ weatherData, unit })=> {
  let fakeTemp = 200;
    let fakeHum = "Humid"
  return (
    <div className="grid gap-4 justify-items-center p-4 w-full">
      <div className="text-center bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-2">
          Current Weather in{" "}
          <p className="text-indigo-500 uppercase">ahmedabad</p>{" "}
          {weatherData?.name}
        </h2>
        <p
          className={`${
            fakeTemp < 0
              ? "text-indigo-500"
              : fakeTemp <= 25
              ? "text-green-600"
              : "text-indigo-500"
          }`}
        >
          Temperature: {weatherData?.main?.temp} {fakeTemp} &deg;{unit === "metric" ? "C" : "F"}
        </p>
        <p className="text-gray-600">
          Weather: {weatherData?.weather[0]?.description} {fakeHum}
        </p>
        <p className="text-gray-600">
          Wind Speed: {weatherData?.wind?.speed} m/s
        </p>
      </div>
    </div>
  );
}

export default WeatherCard;
