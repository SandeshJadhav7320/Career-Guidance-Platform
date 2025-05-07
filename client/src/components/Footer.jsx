import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-screen-lg mx-auto text-center">
        <p className="text-lg font-semibold">CareerGuide AI © 2025</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="hover:text-blue-400">Privacy Policy</a>
          <a href="#" className="hover:text-blue-400">Terms of Service</a>
          <a href="#" className="hover:text-blue-400">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
