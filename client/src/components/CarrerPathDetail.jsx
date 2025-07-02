import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Dashboard_Navbar from "../Dashboard_Components/Dashboard_Navbar";
import { Loader2, ArrowLeft } from "lucide-react";

const CareerPathDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
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

  // Convert lines starting with - or * to <li> items
  const renderFormattedSection = (text) => {
    const lines = text.trim().split("\n");
    const isBulletList = lines.every((line) => /^[-*]\s/.test(line));

    if (isBulletList) {
      return (
        <ul className="list-disc list-inside space-y-1">
          {lines.map((line, idx) => (
            <li key={idx}>{line.replace(/^[-*]\s/, "")}</li>
          ))}
        </ul>
      );
    }

    return <p>{text}</p>;
  };

  return (
    <>
      <Dashboard_Navbar />

      <div className="min-h-screen bg-white px-6 py-8 md:px-12 lg:px-32">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-green-700 hover:underline"
          >
            <ArrowLeft size={20} />
            Back
          </button>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">
          {title}
        </h1>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin text-green-600" size={32} />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-red-600 text-center text-lg">{error}</div>
        )}

        {/* Career Info */}
        {!loading && !error && careerInfo && (
          <div className="bg-gray-50 p-6 rounded-2xl shadow-md border border-gray-200 space-y-6 leading-relaxed text-gray-800 whitespace-pre-line">
            {careerInfo.split("\n\n").map((section, index) => {
              const [heading, ...body] = section.split(":");
              const content = body.join(":").trim();

              return (
                <div key={index} className="space-y-2">
                  {body.length > 0 ? (
                    <>
                      <h2 className="text-xl font-bold text-green-700">
                        {heading.trim()}:
                      </h2>
                      {renderFormattedSection(content)}
                    </>
                  ) : (
                    <p>{section}</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default CareerPathDetail;
