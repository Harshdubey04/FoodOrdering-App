import React, { useContext } from 'react'
import Card from './Card.jsx';
import Spinner from './Spinner.jsx';
import { NavLink } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus.js';
import useRestCard from '../utils/useRestCard.js';
import OfflineGame from './OfflineGames.jsx';
import { Theme } from '../Contexts/ThemeContext.jsx';
import { FaStar } from "react-icons/fa";

const Body = () => {

  const { theme } = useContext(Theme);

  const {
    settopRated,
    setfilteredRestaurant,
    setsearchedText,
    topRated,
    restData,
    filteredRestaurant,
    searchedText
  } = useRestCard();

  const filterTopRest = () => {
    settopRated(true);
    const topRestaurant = restData.filter((restaurant) => restaurant?.info?.avgRating >= 4.5);
    setfilteredRestaurant(topRestaurant);
  }

  const onlineStatus = useOnlineStatus();
  if (!onlineStatus) return <OfflineGame />;
  

  return restData?.length === 0 ? <Spinner /> : (
    <div className={`mt-2 p-2 h-full w-full 
      ${theme === "dark" ? "bg-gradient-to-b from-gray-950 via-black to-gray-900 text-gray-100" : ""}`}>

      {/* Search section */}
      <div
        className={`flex flex-col gap-3 p-4 mx-auto max-w-7xl border border-black rounded-md
        hover:shadow-2xl focus-within:shadow-2xl
        sm:flex-row sm:justify-around sm:items-center
        ${theme === "dark" ? "border-gray-700 bg-gray-900/60 backdrop-blur-md shadow-lg" : ""}`}
      >

        {/* Search input */}
        <input
          value={searchedText}
          onChange={(e) => setsearchedText(e.target.value)}
          type="text"
          placeholder="Search Dishes..."
          className={`border border-black rounded-md text-left p-2
          w-full sm:w-1/2
          ${theme === "dark"
            ? "border-gray-600 bg-gray-950 text-green-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            : ""}`}
        />

        {/* Search button */}
        <button
          onClick={() => {
            let baseData = restData;
            if (topRated) baseData = baseData.filter(r => r?.info?.avgRating >= 4.5);
            const filteredRest = baseData.filter(rest =>
              rest.info.name.toLowerCase().includes(searchedText.toLowerCase())
            );
            setfilteredRestaurant(filteredRest);
          }}
          className={`py-2 px-4 border border-black rounded-md cursor-pointer active:scale-95
          w-full sm:w-auto
          ${theme === "dark"
            ? "border-gray-600 bg-green-600 text-white hover:bg-green-500 transition duration-200"
            : "bg-black text-white"}`}
        >
          Search
        </button>

        {/* Top rated button */}
        <button
          className={`py-2 px-4 border rounded-md cursor-pointer active:scale-95
          flex items-center gap-2 justify-center
          w-full sm:w-auto
          ${theme === "dark"
            ? "border-gray-600 bg-gradient-to-r from-green-600 via-green-500 to-green-400 text-white font-semibold shadow-lg hover:scale-105 hover:from-green-500 hover:to-green-300 transition-all duration-300"
            : "border-black bg-white text-black"}`}
          onClick={filterTopRest}
        >
          <FaStar className="text-yellow-400" /> Top Rated Restaurants
        </button>
      </div>

      {/* Cards container */}
      <div className="mt-6 flex flex-wrap gap-4 justify-center max-w-7xl mx-auto">
        {filteredRestaurant?.map((restaurant) => {
          const rest_name = restaurant?.info?.name;
          const rating = restaurant?.info?.avgRating;
          const deliver_time = restaurant?.info?.slaString;
          const cusine = restaurant?.info?.cuisines;
          const location = restaurant?.info?.locality;

          return (
            <NavLink key={restaurant?.info?.id} to={`/browse/restaurants/`+ restaurant?.info?.id}>
              <Card
                rest_name={rest_name}
                rating={rating}
                deliver_time={deliver_time}
                cuisines={cusine}
                location={location}
                image_id={restaurant?.info?.cloudinaryImageId}
              />
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}

export default Body;