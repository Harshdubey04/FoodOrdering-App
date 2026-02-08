import React, { useContext } from 'react'
import { Theme } from '../Contexts/ThemeContext'

const Error = () => {


  const { theme } = useContext(Theme);

  return (
    //Wrapper
    <div className={`min-h-screen flex flex-col items-center justify-center px-4
      ${theme === "dark" ? "bg-black text-white" : "bg-gradient-to-br from-gray-100 to-gray-200 text-black"}`}>

      {/* Error Icon */}
      <div className="text-6xl mb-6">
        ⚠️
      </div>

      {/* Error Heading */}
      <h1 className="text-4xl font-extrabold mb-4 text-center">
        Oops! Page Not Found
      </h1>

      {/*  Description */}
      <p className={`text-center mb-6 text-lg
        ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
        The page you are looking for doesn't exist or an error occurred.
      </p>

      {/*  Go Home Button */}
      <a 
        href="/"
        className={`px-6 py-3 rounded-xl font-semibold text-lg transition
        ${theme === "dark" 
          ? "bg-green-600 text-black hover:bg-green-500" 
          : "bg-black text-white hover:bg-gray-800"}`}>
        Go to Home
      </a>

    </div>
  )
}

export default Error
