import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-blue-500 text-white">
      <h1 className="text-xl font-bold">CareerGuide AI</h1>
      <div className="space-x-4">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <button className="bg-white text-blue-500 px-4 py-2 rounded">Log In</button>
      </div>
    </nav>
  );
};

export default Navbar;
