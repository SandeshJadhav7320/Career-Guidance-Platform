import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-6 bg-white shadow-md">
      <div className="text-2xl font-bold text-blue-600">CareerGuide AI</div>
      <div className="space-x-4 hidden md:flex">
        <a href="#" className="text-gray-600 hover:text-blue-600">Home</a>
        <a href="#" className="text-gray-600 hover:text-blue-600">About</a>
        <a href="#" className="text-gray-600 hover:text-blue-600">Contact</a>
      </div>
      <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
        Log In
      </button>
    </nav>
  );
};

export default Navbar;
