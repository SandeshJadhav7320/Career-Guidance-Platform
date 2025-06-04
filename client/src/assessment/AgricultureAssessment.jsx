import React, { useState } from "react";

// ✅ Corrected: Stored questions in a separate variable (not an array component!)
const agricultureQuestions = [
  {
    question: "Which activities do you enjoy doing in your free time?",
    options: ["Working with plants and soil", "Operating farming equipment", "Analyzing agricultural data", "Learning about organic farming"],
    answer: 0,
    explanation: "Your preference will determine whether you’re best suited for hands-on farming, agricultural engineering, research, or sustainability-focused roles.",
  },
  {
    question: "How comfortable are you with outdoor work?",
    options: ["I enjoy working outdoors daily", "I prefer occasional outdoor work", "I would rather work in an office/research lab", "I prefer a mix of outdoor and desk work"],
    answer: 0,
    explanation: "This helps analyze if you're suited for farm management, agribusiness, or research-based roles.",
  },
  {
    question: "What aspect of agriculture interests you the most?",
    options: ["Crop cultivation and soil health", "Agriculture technology (AI, automation)", "Business and agricultural trading", "Organic farming and sustainability"],
    answer: 0,
    explanation: "Your interest aligns with careers like Farm Manager, Precision Agriculture Engineer, Agribusiness Expert, or Organic Farming Specialist.",
  }
];

const AgricultureAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerClick = (index) => {
    setSelectedAnswer(index);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === agricultureQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }

    if (currentQuestion < agricultureQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-10">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Agriculture Career Assessment</h1>

      {!quizCompleted ? (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-lg text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {agricultureQuestions[currentQuestion].question}
          </h2>
          
          <div className="grid grid-cols-1 gap-4">
            {agricultureQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`px-6 py-3 rounded-md text-lg transition ${
                  selectedAnswer === index ? "bg-green-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => handleAnswerClick(index)}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-300 h-2 rounded-full mt-4">
            <div className="bg-green-600 h-2 rounded-full" style={{ width: `${((currentQuestion + 1) / agricultureQuestions.length) * 100}%` }}></div>
          </div>

          <button
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
          >
            {currentQuestion < agricultureQuestions.length - 1 ? "Next" : "Submit"}
          </button>
        </div>
      ) : (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-lg text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Your Score: {score} / {agricultureQuestions.length}</h2>
          <p className="text-gray-600 mt-4">
            Based on your answers, here are some suggested **career paths** in agriculture:
          </p>

          {score >= 3 ? (
            <p className="text-green-600 font-bold mt-4">🌾 You might be suited for **Agricultural Research & Technology!** 🚜</p>
          ) : score === 2 ? (
            <p className="text-blue-600 font-bold mt-4">🚜 Consider **Farm Management & Agribusiness!**</p>
          ) : (
            <p className="text-red-600 font-bold mt-4">🍃 Explore **Organic Farming or Sustainable Agriculture!**</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AgricultureAssessment; // ✅ Fixed the export (Now exporting the actual React component!)
