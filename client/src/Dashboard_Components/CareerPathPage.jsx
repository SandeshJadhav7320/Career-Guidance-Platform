import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Dashboard_Navbar from "./Dashboard_Navbar";

const CareerPathPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const careerPaths = location.state?.careerPaths || [];

  return (
    <>
      <Dashboard_Navbar />

      <div className="min-h-screen bg-white flex flex-col items-center px-6 py-10">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Your Suggested Career Paths</h1>

        {careerPaths.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            {careerPaths.map((path, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-green-700 mb-2">{path.title}</h2>
                <p className="text-gray-800 mb-4">{path.summary}</p>
                <button
                  onClick={() => alert(path.details)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
                >
                  More Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-800">No career paths available.</p>
        )}

        <button
          className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </>
  );
};

export default CareerPathPage;
