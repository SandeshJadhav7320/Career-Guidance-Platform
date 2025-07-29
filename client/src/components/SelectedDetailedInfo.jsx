import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Dashboard_Navbar from "../Dashboard_Components/Dashboard_Navbar";
import { marked } from "marked";

function SelectedDetailedInfo() {
  const { id } = useParams();
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://career-guidance-platform.onrender.com/api/get-career-path-by-id?id=${id}`)

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

  const renderMarkdown = (markdownText) => {
    return (
      <div
        className="prose prose-blue max-w-full"
        dangerouslySetInnerHTML={{ __html: marked.parse(markdownText || "") }}
      />
    );
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <>
      <Dashboard_Navbar />
      <div className="p-6 md:p-12 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">{career.title}</h1>
        <div className="space-y-6 text-base leading-relaxed text-gray-800">

          <div><strong>Overview:</strong> {renderMarkdown(career.overview)}</div>
          <div><strong>Required Skills:</strong> {renderMarkdown(career.requiredSkills)}</div>
          <div><strong>Educational Path:</strong> {renderMarkdown(career.educationalPath)}</div>
          <div><strong>Certifications:</strong> {renderMarkdown(career.certifications)}</div>
          <div><strong>Tools & Technologies:</strong> {renderMarkdown(career.toolsAndTechnologies)}</div>
          <div><strong>Career Growth:</strong> {renderMarkdown(career.careerGrowth)}</div>
          <div><strong>Resources:</strong> {renderMarkdown(career.resources)}</div>
          <div><strong>Projects:</strong> {renderMarkdown(career.projects)}</div>
          <div><strong>Communities:</strong> {renderMarkdown(career.communities)}</div>

        </div>
      </div>
    </>
  );
}

export default SelectedDetailedInfo;
