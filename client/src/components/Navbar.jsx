import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white">
      <div className="text-2xl font-bold text-blue-600">CareerGuide <span className="text-indigo-400">AI</span></div>
      <ul className="flex gap-6">
        <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
        <li><Link to="/about" className="hover:text-blue-600">About</Link></li>
        <li><Link to="/contact" className="hover:text-blue-600">Contact</Link></li>
      </ul>
      <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded">Log In</Link>
    </nav>
  );
};

export default Navbar;
