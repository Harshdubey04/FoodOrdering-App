import React from "react";

const LoginHeader = () => {
  return (
    <header className="absolute top-0 inset-x-0 px-6 sm:px-10 py-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        
        {/* Logo */}
        <h1 className="text-xl sm:text-2xl font-extrabold text-green-600">
          Food Delivery 🍽️
        </h1>
      </div>
    </header>
  );
};

export default LoginHeader;

