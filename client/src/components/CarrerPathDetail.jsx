import React from "react";
import { useLocation } from "react-router-dom";
import Dashboard_Navbar from "../Dashboard_Components/Dashboard_Navbar";

const CareerPathDetail = () => {
  const location = useLocation();
  const path = location.state?.path;

  return (
    <>
      <Dashboard_Navbar />

      <div className="min-h-screen bg-white px-6 py-10">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
          Career Path Detail
        </h1>

        {path ? (
          <div className="bg-gray-100 p-6 rounded-lg text-center shadow-md">
            <h2 className="text-2xl font-semibold mb-4  text-gray-800 ">
              {path.title}
            </h2>
            {/* You can add more details below if needed */}
          </div>
        ) : (
          <p className="text-gray-600">No career path selected.</p>
        )}
      </div>
    </>
  );
};

export default CareerPathDetail;
