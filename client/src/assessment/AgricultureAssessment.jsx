import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ for navigation
// ✅ Corrected: Stored questions in a separate variable (not an array component!)
const agricultureQuestions = [
  {
    question: "Which activities do you enjoy doing in your free time?",
    options: [
      "Working with plants and soil",
      "Operating farming equipment",
      "Analyzing agricultural data",
      "Learning about organic farming",
    ],
  },
  {
    question: "How comfortable are you with outdoor work?",
    options: [
      "I enjoy working outdoors daily",
      "I prefer occasional outdoor work",
      "I would rather work in an office/research lab",
      "I prefer a mix of outdoor and desk work",
    ],
  },
  {
    question: "What aspect of agriculture interests you the most?",
    options: [
      "Crop cultivation and soil health",
      "Agriculture technology (AI, automation)",
      "Business and agricultural trading",
      "Organic farming and sustainability",
    ],
  },
  {
    question: "How do you feel about working with technology in agriculture?",
    options: [
      "I enjoy using advanced tools and machinery",
      "I prefer traditional farming methods",
      "I like analyzing data for decision-making",
      "I’m interested in developing new technologies",
    ],
  },
  {
    question: "What type of work environment do you prefer?",
    options: [
      "Outdoors in the field",
      "In a lab or research facility",
      "In an office managing operations",
      "A mix of outdoor and indoor work",
    ],
  },
  {
    question: "How important is sustainability to you in agriculture?",
    options: [
      "Very important, I want to focus on organic farming",
      "Somewhat important, I prefer balancing profit and sustainability",
      "Not very important, I focus on maximizing yields",
      "I’m neutral about sustainability",
    ],
  },
  {
    question: "Do you enjoy working with animals?",
    options: [
      "Yes, I love working with livestock",
      "I prefer working with crops",
      "I’m interested in animal research",
      "I’m not comfortable working with animals",
    ],
  },
  {
    question: "How do you approach problem-solving in agriculture?",
    options: [
      "I prefer hands-on experimentation",
      "I rely on data and analysis",
      "I consult with experts and peers",
      "I use innovative and creative solutions",
    ],
  },
  {
    question: "What motivates you the most in your career?",
    options: [
      "Making a positive impact on the environment",
      "Achieving financial success",
      "Solving complex challenges",
      "Helping communities through agriculture",
    ],
  },
  {
    question: "How do you feel about managing people and resources?",
    options: [
      "I enjoy leading teams and managing operations",
      "I prefer working independently",
      "I like collaborating with others but not managing",
      "I’m not interested in management roles",
    ],
  },
  {
    question: "What is your preferred scale of work?",
    options: [
      "Small-scale, like organic farming",
      "Medium-scale, like managing a farm",
      "Large-scale, like agribusiness operations",
      "I’m open to any scale of work",
    ],
  },
  {
    question: "How do you feel about learning new skills in agriculture?",
    options: [
      "I’m eager to learn and adapt",
      "I prefer sticking to what I know",
      "I enjoy learning but only when necessary",
      "I’m not very interested in learning new skills",
    ],
  },
  {
    question: "What is your level of interest in agricultural research?",
    options: [
      "Very high, I want to contribute to new discoveries",
      "Moderate, I’m interested in applied research",
      "Low, I prefer practical work",
      "None, I’m not interested in research",
    ],
  },
  {
    question: "How do you feel about working in agribusiness?",
    options: [
      "I’m very interested in managing agricultural trade",
      "I prefer working on the production side",
      "I’m interested in both production and business",
      "I’m not interested in agribusiness",
    ],
  },
  {
    question: "What is your preferred method of learning?",
    options: [
      "Hands-on experience",
      "Reading and research",
      "Collaborating with others",
      "Using technology and tools",
    ],
  },
];


const AgricultureAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleAnswerClick = (index) => {
    setSelectedAnswer(index);
  };

 const handleNextQuestion = async () => {
  const updatedAnswers = [
    ...answers,
    agricultureQuestions[currentQuestion].options[selectedAnswer],
  ];
  setAnswers(updatedAnswers);

  if (currentQuestion < agricultureQuestions.length - 1) {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer(null);
  } else {
  setIsLoading(true); // Start loader

  try {
    const response = await fetch("${API_BASE}/api/assessment/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        answers: updatedAnswers,
        type: "agriculture",
      }),
    });

    const result = await response.json();
    navigate("/careerpathpage", { state: { careerPaths: result } });
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong!");
  } finally {
    setIsLoading(false); // Stop loader
  }
}

};


  // ✅ Enhanced progress bar calculation
  const progressPercent = Math.round(
    ((currentQuestion + 1) / agricultureQuestions.length) * 100
  );

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-10 relative">
      {isSubmitting && (
        <div className="fixed inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-blue-600 font-semibold">Submitting...</p>
        </div>
      )}

      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Agriculture Career Assessment
      </h1>

      <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-lg text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {agricultureQuestions[currentQuestion].question}
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {agricultureQuestions[currentQuestion].options.map(
            (option, index) => (
              <button
                key={index}
                className={`px-6 py-3 rounded-md text-lg transition ${
                  selectedAnswer === index
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => handleAnswerClick(index)}
                disabled={isSubmitting}
              >
                {option}
              </button>
            )
          )}
        </div>

        {/* ✅ Enhanced attractive progress bar */}
        <div className="relative w-full bg-gray-300 h-4 rounded-full mt-6 overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm font-medium text-gray-700">
            {progressPercent}%
          </span>
        </div>

        {isLoading ? (
  <div className="mt-6 flex justify-center items-center">
    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    <span className="ml-3 text-blue-600 font-medium">Analyzing your results...</span>
  </div>
) : (
  <button
    className={`mt-6 px-6 py-3 rounded-md shadow transition ${
      selectedAnswer !== null
        ? "bg-blue-600 text-white hover:bg-blue-700"
        : "bg-gray-400 text-gray-100 cursor-not-allowed"
    }`}
    onClick={handleNextQuestion}
    disabled={selectedAnswer === null}
  >
    {currentQuestion < agricultureQuestions.length - 1 ? "Next" : "Submit"}
  </button>
)}

      </div>
    </div>
  );
};

export default AgricultureAssessment;