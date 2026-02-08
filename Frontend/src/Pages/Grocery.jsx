import React, { useContext } from 'react';
import { Theme } from '../Contexts/ThemeContext';

const Grocery = () => {

  //Theme context (light / dark)
  const { theme } = useContext(Theme);

  return (
    // Wrapper
    <div className={`min-h-screen px-4 py-10 flex flex-col items-center
      ${theme === "dark" ? "bg-black text-white" : "bg-gray-100 text-black"}`}>

      {/*Container */}
      <div className={`w-full max-w-3xl p-8 rounded-3xl shadow-2xl transition-all duration-300
        ${theme === "dark"
          ? "bg-[#111] border border-white/20 shadow-white/10"
          : "bg-white border border-gray-200"}`}>

        {/*Heading */}
        <h1 className="text-4xl font-extrabold mb-4 text-center">
          Grocery Section
        </h1>

        {/*Description */}
        <p className={`text-center text-lg
          ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
          Comming Soon...
        </p>

      </div>
    </div>
  )
}

export default Grocery;
