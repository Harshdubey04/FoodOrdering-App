import React, { useContext } from 'react';
import { Theme } from '../Contexts/ThemeContext';

const Contact = () => {
  const { theme } = useContext(Theme);

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-8
      ${theme === "dark" ? "bg-black text-white" : "bg-gradient-to-br from-gray-100 to-gray-200 text-black"}`}>

      <div className={`w-full max-w-2xl p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl transition-all duration-300
        ${theme === "dark"
          ? "bg-[#111] border border-white/20 shadow-white/10"
          : "bg-white border border-gray-200"}`}>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-4 sm:mb-6 tracking-wide">
          Contact Us
        </h1>

        <p className={`text-center mb-6 sm:mb-8 text-base sm:text-lg
          ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
          We'd love to hear from you. Reach out anytime!
        </p>

        <div className="space-y-4">

          <div className={`p-4 sm:p-5 rounded-xl
            ${theme === "dark" ? "bg-white/5 border border-white/10" : "bg-gray-50 border border-gray-200"}`}>
            <p className="font-semibold text-sm sm:text-base">📧 Email</p>
            <p className="text-xs sm:text-sm opacity-80">support@foodapp.com</p>
          </div>

          <div className={`p-4 sm:p-5 rounded-xl
            ${theme === "dark" ? "bg-white/5 border border-white/10" : "bg-gray-50 border border-gray-200"}`}>
            <p className="font-semibold text-sm sm:text-base">📞 Phone</p>
            <p className="text-xs sm:text-sm opacity-80">+91 98765 43210</p>
          </div>

          <div className={`p-4 sm:p-5 rounded-xl
            ${theme === "dark" ? "bg-white/5 border border-white/10" : "bg-gray-50 border border-gray-200"}`}>
            <p className="font-semibold text-sm sm:text-base">📍 Address</p>
            <p className="text-xs sm:text-sm opacity-80">India</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;

