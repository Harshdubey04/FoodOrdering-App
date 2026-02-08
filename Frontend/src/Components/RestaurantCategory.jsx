import React, { useContext } from 'react'
import AccordianBodyItems from './AccordianBodyItems';
import { Theme } from '../Contexts/ThemeContext';

const RestaurantCategory = ({ data, showMenu, setshowIndex }) => {

  const { theme } = useContext(Theme);

  const handleClick = () => {
    setshowIndex();
  };

  return (
    (data?.itemCards?.length &&
    <div>

      {/*  Category Container */}
      <div className={`flex flex-col p-5 md:p-6 mb-5 rounded-2xl transition duration-300
        ${theme === "dark"
          ? "bg-gray-900 border border-gray-700 shadow-md hover:shadow-green-500/10"
          : "bg-white border border-gray-200 shadow-sm hover:shadow-md"}`}>

        {/*  Category Name & Item Count */}
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={handleClick}
        >
          <span className={`font-bold text-base md:text-lg tracking-wide
            ${theme === "dark" ? "text-gray-100" : "text-gray-800"}`}>
            {data?.title} ({data?.itemCards?.length || 0})
          </span>

          {/* Dropdown Icon */}
          <span className={`text-xl transition-transform duration-300
            ${showMenu ? "rotate-180" : ""}
            ${theme === "dark" ? "text-green-400" : "text-gray-600"}`}>
            🔽
          </span>
        </div>

        {/* Accordion Body */}
        <div className="mt-3">
          {showMenu && <AccordianBodyItems items={data?.itemCards} />}
        </div>

      </div>
    </div>
  ));
};

export default RestaurantCategory;