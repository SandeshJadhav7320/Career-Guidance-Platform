import React, { useEffect, useState } from "react";
import { FaTractor, FaTools, FaLandmark, FaUniversity, FaBuilding } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Dashboard_Navbar from "./Dashboard_Navbar";

const CareerSelection = () => {
  const navigate = useNavigate();

  // State for fade-in effect
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 300);
  }, []);

  const careerOptions = [
    { title: "Agriculture", icon: <FaTractor />, path: "/agriculture" },
    { title: "Technical Jobs", icon: <FaTools />, path: "/technical" },
    { title: "Government Jobs", icon: <FaLandmark />, path: "/government" },
    { title: "Banking & Finance", icon: <FaUniversity />, path: "/banking" },
    { title: "Administrative Services", icon: <FaBuilding />, path: "/assessment/administrative" },
    { title: "General Knowledge", icon: <FaBuilding />, path: "/assessment/generalknowlwdge" },
  ];

  return (

    <>
    <Dashboard_Navbar></Dashboard_Navbar>
    <div className={`min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 transition-opacity duration-1000 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Select Your Career Path</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {careerOptions.map((career, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center cursor-pointer hover:scale-105 hover:bg-gray-200 transition-transform duration-300 w-full max-w-[400px]"
            onClick={() => navigate(career.path)}
          >
            <span className="text-blue-600 text-5xl mb-4">{career.icon}</span>
            <h3 className="text-xl font-semibold text-gray-800">{career.title}</h3>
            <p className="text-gray-600">Take an assessment tailored to this career.</p>
          </div>
        ))}
      </div>
    </div>
    </>
    
  );
};

export default CareerSelection;
