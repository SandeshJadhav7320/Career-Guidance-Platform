import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-6 text-center">
      <div className="flex justify-center space-x-6">
        <a href="#" className="text-gray-600">About</a>
        <a href="#" className="text-gray-600">Privacy Policy</a>
        <a href="#" className="text-gray-600">Terms</a>
      </div>
      <p className="mt-4 text-gray-500">© {new Date().getFullYear()} CareerGuide AI | All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
