import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Dashboard_Navbar from "../Dashboard_Components/Dashboard_Navbar";

const CareerPathDetail = () => {
  const location = useLocation();
  const { title } = location.state || {};

  const [careerInfo, setCareerInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (title) {
      setLoading(true);
      fetch("http://localhost:8080/api/title", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      })
        .then((res) => res.text())
        .then((data) => {
          setCareerInfo(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error:", err);
          setError("Failed to fetch career information.");
          setLoading(false);
        });
    }
  }, [title]);

  return (
    <>
      <Dashboard_Navbar />
      <div className="min-h-screen bg-gray-50 px-6 py-10">
        <h1 className="text-4xl font-bold text-green-700 text-center mb-8">
          {title}
        </h1>

        {loading && (
          <div className="flex justify-center items-center h-40">
            <p className="text-lg text-gray-500 animate-pulse">Loading...</p>
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center h-40">
            <p className="text-red-500 text-center text-lg">{error}</p>
          </div>
        )}

        {!loading && !error && careerInfo && (
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Career Path Information
            </h2>
            <div className="text-gray-700 leading-relaxed whitespace-pre-line max-h-[600px] overflow-y-auto pr-2">
              {careerInfo}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CareerPathDetail;
