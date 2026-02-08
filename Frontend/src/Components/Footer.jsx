import React, { useContext } from 'react'
import { FaRegCopyright } from "react-icons/fa6";
import { Theme } from '../Contexts/ThemeContext';

const Footer = () => {

  //  Theme Context
  const { theme } = useContext(Theme);

  return (
    <div
      className={`mt-10 w-full border rounded-2xl p-4
      flex flex-col gap-6 items-center
      sm:flex-row sm:justify-around sm:items-start
      ${theme==="dark"
        ?"border-gray-700 bg-gradient-to-r from-gray-950 via-black to-gray-900 text-gray-200"
        :"border-gray-300 bg-gray-200"}`}
    >
      
      {/* Copyright Section */}
      <div className='flex items-center gap-1 text-center sm:text-left'>
        <FaRegCopyright className={`${theme==="dark"?"text-gray-300":""}`} />
        <p className={`font-bold ${theme==="dark"?"text-gray-100":"text-black"}`}>
          Copyright reserved to Harsh
        </p>
      </div>

      {/*  Footer Links */}
      <div>
        <ul
          className={`flex flex-col gap-2
          items-center sm:items-start
          ${theme==="dark"?"text-gray-400":""}`}
        >
          
          <a href="/">
            <li className={`${theme==="dark"?"hover:text-green-400 transition":"hover:underline"}`}>
              Contact
            </li>
          </a>

          <a href="/">
            <li className={`${theme==="dark"?"hover:text-green-400 transition":"hover:underline"}`}>
              Partner with us
            </li>
          </a>

          <a href="">
            <li className={`${theme==="dark"?"hover:text-green-400 transition":"hover:underline"}`}>
              Career
            </li>
          </a>

          <a href="">
            <li className={`${theme==="dark"?"hover:text-green-400 transition":"hover:underline"}`}>
              Teams
            </li>
          </a>

          <a href="">
            <li className={`${theme==="dark"?"hover:text-green-400 transition":"hover:underline"}`}>
              Help and Support
            </li>
          </a>

        </ul>
      </div>
    </div>
  )
}

export default Footer;


