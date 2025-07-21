import React, { useEffect, useState } from "react";
import Dashboard_Navbar from "../Dashboard_Components/Dashboard_Navbar";

function SelectedCarrerPath() {
  const [careerPaths, setCareerPaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("user-id");

    if (!userId) {
      setError("User not logged in.");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8080/api/get-career-path?userId=${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch saved career paths.");
        return res.json();
      })
      .then((data) => {
        setCareerPaths(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching career paths:", err);
        setError(err.message || "Something went wrong.");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Dashboard_Navbar />
      <div className="p-6 md:p-12 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
          Your Selected Career Paths
        </h1>

        {loading && (
          <div className="text-center text-gray-500">Loading...</div>
        )}

        {error && (
          <div className="text-center text-red-600 font-semibold">{error}</div>
        )}

        {!loading && !error && careerPaths.length === 0 && (
          <div className="text-center text-gray-500">
            No career paths selected yet.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careerPaths.map((career, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-bold text-blue-700 mb-2">
                {career.title}
              </h2>
              <p className="text-gray-700 whitespace-pre-line line-clamp-5">
                {career.overview || "No overview available."}
              </p>
              {/* Add more fields if needed */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SelectedCarrerPath;
