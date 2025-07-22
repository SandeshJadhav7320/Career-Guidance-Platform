import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Dashboard_Navbar from "../Dashboard_Components/Dashboard_Navbar";

function SelectedDetailedInfo() {
  const { id } = useParams();
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/api/get-career-path-by-id?id=${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch career path.");
        return res.json();
      })
      .then((data) => {
        setCareer(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error loading career:", err);
        setError(err.message || "Something went wrong.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <>
      <Dashboard_Navbar />
      <div className="p-6 md:p-12 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">{career.title}</h1>
        <div className="text-gray-800 space-y-4 whitespace-pre-line">
          <p><strong>Overview:</strong> {career.overview}</p>
          <p><strong>Required Skills:</strong> {career.requiredSkills}</p>
          <p><strong>Educational Path:</strong> {career.educationalPath}</p>
          <p><strong>Certifications:</strong> {career.certifications}</p>
          <p><strong>Tools & Technologies:</strong> {career.toolsAndTechnologies}</p>
          <p><strong>Career Growth:</strong> {career.careerGrowth}</p>
          <p><strong>Resources:</strong> {career.resources}</p>
          <p><strong>Projects:</strong> {career.projects}</p>
          <p><strong>Communities:</strong> {career.communities}</p>
        </div>
      </div>
    </>
  );
}

export default SelectedDetailedInfo;
