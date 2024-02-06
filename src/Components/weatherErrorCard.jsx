import React from "react";

const WeatherErrorCard = ({ city, errorMessage }) => {
   return (
      <div className="flex mt-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
         {errorMessage === "" ? (
            <>
               <strong className="font-bold">Opps ! </strong>
               <span className="block sm:inline">{city} is not valid search..</span>
            </>
         ) : (
            <>
               <strong className="font-bold">Opps ! </strong>
               <span className="block sm:inline">{errorMessage}</span>
              
            </>
         )}
      </div>
   );
};

export default WeatherErrorCard;
