import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Dashboard_Navbar from "./Dashboard_Navbar";

const CareerPathPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const careerPath = location.state?.careerPath || "No career path available.";

  return (
    <>
    <Dashboard_Navbar></Dashboard_Navbar>
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-10">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Your Suggested Career Path</h1>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-lg text-center">
        <p className="text-lg text-gray-800 whitespace-pre-line">{careerPath}</p>
      </div>
      <button
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
    </>
    
  );
};

export default CareerPathPage;
