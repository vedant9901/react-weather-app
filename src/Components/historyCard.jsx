import React from "react";

const SearchHistory = ({ searches, handlePrevSearchClick }) => {
   const handleSearchClick = (city) => {
      handlePrevSearchClick(city);
   };
   return (
      <>
         {searches.length > 0 && <p className="flex font-semibold justify-center py-2">Previous Searches</p>}

         <div className="flex gap-2">
            {searches.map((search, index) => (
               <div className="flex gap-2">
                  <div className="relative grid select-none items-center whitespace-nowrap rounded-full border border-gray-900 py-1.5 px-3 font-sans text-xs font-bold uppercase text-gray-700" key={index}>
                     <span
                     className="cursor-pointer"
                        onClick={() => {
                           handleSearchClick(search);
                        }}
                     >
                        {search}
                     </span>
                  </div>
               </div>
            ))}
         </div>
      </>
   );
};

export default SearchHistory;
