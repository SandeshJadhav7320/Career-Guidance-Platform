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

      <div className="min-h-screen bg-white px-6 py-10">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Your Suggested Career Paths
        </h1>

        {careerPaths.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careerPaths.map((path, index) => (
              <div
                key={index}
                className="relative bg-gray-100 p-6 rounded-lg shadow-md flex flex-col justify-between"
              >
                {/* ✅ Match Percentage Badge */}
              <span className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {`${path.match}% Match`}
              </span>


                {/* ✅ Title */}
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  {path.title}
                </h2>

                {/* ✅ Summary/Description */}
                <p className="text-gray-700 mb-4">{path.summary}</p>

                {/* ✅ Skills */}
                {Array.isArray(path.skills) && path.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {path.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* ✅ Learn More Button */}
                <button
                  onClick={() => alert(`More Details:\n\n${path.details}`)}
                  className="mt-auto px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
                >
                  Learn More
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">
            No career paths available.
          </p>
        )}

        {/* ✅ Back Button */}
        <div className="text-center mt-10">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gray-600 text-white rounded-md shadow hover:bg-gray-700 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </>
  );
};

export default CareerPathPage;
