import React, { useState } from "react";

// ✅ Corrected: Stored questions in a separate variable (not an array component!)
const Technical = [
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
  },
  {
    question: "How do you feel about working with technology in agriculture?",
    options: ["I enjoy using advanced tools and machinery", "I prefer traditional farming methods", "I like analyzing data for decision-making", "I’m interested in developing new technologies"],
    answer: 0,
    explanation: "This helps determine if you're suited for roles in precision agriculture, agritech development, or traditional farming.",
  },
  {
    question: "What type of work environment do you prefer?",
    options: ["Outdoors in the field", "In a lab or research facility", "In an office managing operations", "A mix of outdoor and indoor work"],
    answer: 0,
    explanation: "Your work environment preference can guide you toward careers like farm management, agricultural research, or agribusiness.",
  },
  {
    question: "How important is sustainability to you in agriculture?",
    options: ["Very important, I want to focus on organic farming", "Somewhat important, I prefer balancing profit and sustainability", "Not very important, I focus on maximizing yields", "I’m neutral about sustainability"],
    answer: 0,
    explanation: "This question helps identify if you're inclined toward organic farming, agribusiness, or high-yield farming techniques.",
  },
  {
    question: "Do you enjoy working with animals?",
    options: ["Yes, I love working with livestock", "I prefer working with crops", "I’m interested in animal research", "I’m not comfortable working with animals"],
    answer: 0,
    explanation: "This helps determine if you're suited for careers in animal husbandry, veterinary science, or crop-focused roles.",
  },
  {
    question: "How do you approach problem-solving in agriculture?",
    options: ["I prefer hands-on experimentation", "I rely on data and analysis", "I consult with experts and peers", "I use innovative and creative solutions"],
    answer: 0,
    explanation: "Your problem-solving approach can guide you toward roles in research, agribusiness, or innovation-focused careers.",
  },
  {
    question: "What motivates you the most in your career?",
    options: ["Making a positive impact on the environment", "Achieving financial success", "Solving complex challenges", "Helping communities through agriculture"],
    answer: 0,
    explanation: "Your motivation can help identify if you're suited for sustainability, agribusiness, research, or community-focused roles.",
  },
  {
    question: "How do you feel about managing people and resources?",
    options: ["I enjoy leading teams and managing operations", "I prefer working independently", "I like collaborating with others but not managing", "I’m not interested in management roles"],
    answer: 0,
    explanation: "This helps determine if you're suited for leadership roles in farm management or agribusiness.",
  },
  {
    question: "What is your preferred scale of work?",
    options: ["Small-scale, like organic farming", "Medium-scale, like managing a farm", "Large-scale, like agribusiness operations", "I’m open to any scale of work"],
    answer: 0,
    explanation: "Your preference for scale can guide you toward careers in organic farming, farm management, or agribusiness.",
  },
  {
    question: "How do you feel about learning new skills in agriculture?",
    options: ["I’m eager to learn and adapt", "I prefer sticking to what I know", "I enjoy learning but only when necessary", "I’m not very interested in learning new skills"],
    answer: 0,
    explanation: "This question helps determine if you're suited for dynamic roles in agritech or traditional farming.",
  },
  {
    question: "What is your level of interest in agricultural research?",
    options: ["Very high, I want to contribute to new discoveries", "Moderate, I’m interested in applied research", "Low, I prefer practical work", "None, I’m not interested in research"],
    answer: 0,
    explanation: "Your interest in research can guide you toward careers in agricultural science or hands-on farming.",
  },
  {
    question: "How do you feel about working in agribusiness?",
    options: ["I’m very interested in managing agricultural trade", "I prefer working on the production side", "I’m interested in both production and business", "I’m not interested in agribusiness"],
    answer: 0,
    explanation: "This helps determine if you're suited for roles in agribusiness, farm management, or production-focused careers.",
  },
  {
    question: "What is your preferred method of learning?",
    options: ["Hands-on experience", "Reading and research", "Collaborating with others", "Using technology and tools"],
    answer: 0,
    explanation: "Your learning style can guide you toward careers in hands-on farming, research, or agritech development.",
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

export default Technical; // ✅ Fixed the export (Now exporting the actual React component!)
