import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa"; // Importing social media icons

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-screen-lg mx-auto text-center">
        {/* Copyright */}
        <p className="text-lg font-semibold">CareerGuide AI © 2025</p>

        {/* Links */}
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="hover:text-blue-400">Privacy Policy</a>
          <a href="#" className="hover:text-blue-400">Terms of Service</a>
          <a href="#" className="hover:text-blue-400">Contact Us</a>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mt-6">
          <a href="#" className="text-xl hover:text-blue-400">
            <FaFacebook />
          </a>
          <a href="#" className="text-xl hover:text-blue-400">
            <FaTwitter />
          </a>
          <a href="#" className="text-xl hover:text-blue-400">
            <FaLinkedin />
          </a>
          <a href="#" className="text-xl hover:text-blue-400">
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
