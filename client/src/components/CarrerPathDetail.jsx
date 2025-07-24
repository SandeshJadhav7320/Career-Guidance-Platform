import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Dashboard_Navbar from "../Dashboard_Components/Dashboard_Navbar";
import {
  Loader2,
  ArrowLeft,
  BookOpen,
  Star,
  Code,
  ListChecks,
} from "lucide-react";

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

  const getIconForHeader = (headerText) => {
    const lower = headerText.toLowerCase();
    if (lower.includes("roadmap"))
      return <ListChecks className="inline mr-2 text-green-600" size={20} />;
    if (lower.includes("skills"))
      return <Star className="inline mr-2 text-yellow-500" size={20} />;
    if (lower.includes("resources"))
      return <BookOpen className="inline mr-2 text-blue-600" size={20} />;
    if (lower.includes("technologies") || lower.includes("tools"))
      return <Code className="inline mr-2 text-purple-600" size={20} />;
    return null;
  };

  const emphasizeHeader = (headingText) => {
    const keywords = [
      "Overview",
      "Required Skills",
      "Educational Path",
      "Certifications",
      "Tools",
      "Technologies",
      "Free and Paid Resources",
      "Resources",
      "Career Growth Opportunities",
      "Real-world Projects",
      "Communities to Join",
    ];

    for (const keyword of keywords) {
      const regex = new RegExp(`\\b(${keyword})\\b`, "gi");
      headingText = headingText.replace(regex, "<strong>$1</strong>");
    }

    return headingText;
  };

  const handleSelectCareerPath = () => {
  const userInfoRaw = localStorage.getItem("user-info");

  if (!userInfoRaw) {
    alert("Please log in before selecting a career path.");
    return;
  }

  let userId = "";
  try {
    const userInfo = JSON.parse(userInfoRaw);
    userId = userInfo?.id?.toString();

    if (!userId) {
      throw new Error("Missing user ID in user-info.");
    }

    console.log("✅ Using userId:", userId);
  } catch (err) {
    console.error("❌ Failed to parse user-info or missing ID:", err);
    alert("Invalid user data. Please log in again.");
    return;
  }

  // Parse content into sections
  const sections = {
    overview: "",
    requiredSkills: "",
    educationalPath: "",
    certifications: "",
    toolsAndTechnologies: "",
    resources: "",
    careerGrowth: "",
    projects: "",
    communities: "",
  };

  let current = "";

  careerInfo.split("\n").forEach((line) => {
    const clean = line.trim().toLowerCase();
    if (clean.includes("overview")) current = "overview";
    else if (clean.includes("required skills")) current = "requiredSkills";
    else if (clean.includes("educational path")) current = "educationalPath";
    else if (clean.includes("certifications")) current = "certifications";
    else if (clean.includes("tools") || clean.includes("technologies")) current = "toolsAndTechnologies";
    else if (clean.includes("resources")) current = "resources";
    else if (clean.includes("career growth")) current = "careerGrowth";
    else if (clean.includes("projects")) current = "projects";
    else if (clean.includes("communities")) current = "communities";
    else if (current) sections[current] += line + "\n";
  });

  const payload = {
    userId, // ✅ Always from localStorage "user-info"
    title,
    ...sections,
  };

  console.log("📤 Sending payload:", payload);

  fetch("http://localhost:8080/api/save-career-path", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      if (res.ok) {
        alert(`Career path "${title}" saved successfully.`);
      } else {
        res.text().then((msg) => {
          console.error("❌ Server error:", msg);
          alert("Failed to save career path.");
        });
      }
    })
    .catch((err) => {
      console.error("❌ Fetch error:", err);
      alert("An error occurred while saving.");
    });
};



  return (
    <>
      <Dashboard_Navbar />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 px-6 py-8 md:px-12 lg:px-32">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-green-700 hover:underline"
          >
            <ArrowLeft size={20} />
            Back
          </button>
        </div>

        <h1 className="text-4xl font-bold text-green-800 mb-10 text-center">
          {title}
        </h1>

        {loading && (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin text-green-600" size={32} />
          </div>
        )}

        {error && (
          <div className="text-red-600 text-center text-lg">{error}</div>
        )}

        {!loading && !error && careerInfo && (
          <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-gray-200 space-y-4 leading-relaxed text-gray-800 transition-all">
            {(() => {
              const lines = careerInfo.split("\n");
              let insideResourcesSection = false;
              const elements = [];

              lines.forEach((line, index) => {
                const cleanedLine = line.trim();

                if (/^#\s+/.test(cleanedLine)) {
                  const heading = cleanedLine.replace(/^#\s+/, "");
                  const emphasizedHeading = emphasizeHeader(heading);
                  elements.push(
                    <h1
                      key={index}
                      className="text-3xl font-extrabold text-gray-900 mt-6 mb-4 flex items-center"
                    >
                      {getIconForHeader(heading)}
                      <span dangerouslySetInnerHTML={{ __html: emphasizedHeading }} />
                    </h1>
                  );
                  return;
                }

                if (/^##\s+/.test(cleanedLine)) {
                  const heading = cleanedLine.replace(/^##\s+/, "");
                  insideResourcesSection = heading.toLowerCase().includes("resources");
                  const emphasizedHeading = emphasizeHeader(heading);
                  elements.push(
                    <h2
                      key={index}
                      className="text-2xl font-semibold text-gray-800 mt-5 mb-3 flex items-center"
                    >
                      {getIconForHeader(heading)}
                      <span dangerouslySetInnerHTML={{ __html: emphasizedHeading }} />
                    </h2>
                  );
                  return;
                }

                if (insideResourcesSection && /^[-*]\s/.test(cleanedLine)) {
                  const match = cleanedLine.match(/\[(.+?)\]\((https?:\/\/[^\s]+)\)/);
                  if (match) {
                    const [_, linkText, url] = match;
                    elements.push(
                      <div
                        key={index}
                        className="border border-gray-300 p-4 rounded-xl bg-white shadow-md hover:shadow-lg transition hover:-translate-y-1"
                      >
                        <h3 className="text-lg font-semibold text-green-700 mb-1">
                          {linkText}
                        </h3>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Visit Course →
                        </a>
                      </div>
                    );
                    return;
                  }
                }

                if (/^[-*]\s/.test(cleanedLine)) {
                  elements.push(
                    <ul key={index} className="list-disc list-inside ml-6">
                      <li>{cleanedLine.replace(/^[-*]\s/, "")}</li>
                    </ul>
                  );
                  return;
                }

                if (cleanedLine.length > 0) {
  const parsedLine = cleanedLine.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    '<a href="$2" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  elements.push(
    <p
      key={index}
      className="text-gray-700 mb-3 text-base"
      dangerouslySetInnerHTML={{ __html: parsedLine }}
    />
  );
}

              });

              return elements;
            })()}
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <button
            onClick={handleSelectCareerPath}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition"
          >
            Select this Career Path
          </button>
        </div>
      </div>
    </>
  );
};

export default CareerPathDetail;
