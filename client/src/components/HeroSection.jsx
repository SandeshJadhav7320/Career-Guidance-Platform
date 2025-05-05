import React from "react";
import heroImage from "../assets/hero.png"; // Make sure this image is inside src/assets/

const HeroSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center px-6 py-12 bg-gray-100">
      {/* Left Side: Text */}
      <div className="md:w-1/2">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Discover Your Perfect Career Path with AI
        </h1>
        <p className="text-gray-600 mb-6">
          Take the smart career assessment and find jobs and mentors aligned with your future.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
          Get Started
        </button>
      </div>

      {/* Right Side: Image */}
      <div className="md:w-1/2">
        <img src={heroImage} alt="AI Career Guidance" className="w-full h-auto rounded-md shadow-lg" />
      </div>
    </section>
  );
};

export default HeroSection;
