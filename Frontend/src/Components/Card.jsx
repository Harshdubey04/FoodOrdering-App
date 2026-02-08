import React, { useContext } from 'react'
import { CDN_URL } from '../utils/constant';
import { Theme } from '../Contexts/ThemeContext';

const Card = (props) => {

  const { theme } = useContext(Theme);
  let { rest_name, rating, deliver_time, cuisines, location, image_id } = props;

  return (
    <div className={`flex flex-col border rounded-2xl cursor-pointer
      mt-5 p-3 w-60 sm:w-64 transition duration-300 hover:scale-[1.03]
      ${theme === "dark"
        ? "bg-gray-900 border-gray-700 shadow-md hover:shadow-green-500/20 text-gray-200"
        : "bg-white border-gray-300 hover:shadow-xl"}`}>

      {/* Image */}
      <div className="overflow-hidden rounded-2xl">
        <img
          src={CDN_URL + image_id}
          className='rounded-2xl h-44 sm:h-48 w-full object-cover'
          alt={rest_name}
        />
      </div>

      {/* Details */}
      <div className="flex flex-col gap-1 mt-2">

        <p className={`font-bold text-left text-base truncate
          ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
          {rest_name}
        </p>

        <div className='flex justify-between w-full text-sm'>
          <p className={`${theme === "dark" ? "text-yellow-400 font-semibold" : "text-gray-700"}`}>
            ⭐ {rating}
          </p>
          <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            {deliver_time}
          </p>
        </div>

        <p className={`text-sm truncate
          ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          {cuisines.join(", ")}
        </p>

        <p className={`text-sm
          ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
          {location}
        </p>
      </div>

    </div>
  )
}

export default Card;

