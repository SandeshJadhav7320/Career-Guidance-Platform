import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// ✅ Technical questions for all engineering domains
const banckingQuestions = [
  {
    question: "Which area of finance interests you the most?",
    options: [
      "Investment banking and mergers",
      "Corporate finance and budgeting",
      "Personal financial advising",
      "Stock trading and markets",
      "Banking operations and compliance",
    ],
  },
  {
    question: "How do you prefer to work with numbers?",
    options: [
      "Analyzing large datasets",
      "Creating financial plans",
      "Managing risk and forecasting",
      "Tracking investments and performance",
      "Auditing or managing ledgers",
    ],
  },
  {
    question: "Which environment do you see yourself in?",
    options: [
      "Fast-paced trading floor",
      "Bank branch or office",
      "Consulting firm with clients",
      "Corporate finance department",
      "Government finance or policy division",
    ],
  },
  {
    question: "What motivates you in your work?",
    options: [
      "Helping clients grow their wealth",
      "Solving financial problems",
      "Achieving performance-based bonuses",
      "Ensuring accuracy and compliance",
      "Understanding global markets",
    ],
  },
  {
    question: "Which tool or skill do you enjoy using the most?",
    options: [
      "Excel and financial modeling",
      "Accounting software (e.g., Tally, SAP)",
      "Data visualization or BI tools",
      "Trading platforms",
      "Risk management tools",
    ],
  },
  {
    question: "What kind of decisions do you like making?",
    options: [
      "Where to invest for the best return",
      "How to allocate company resources",
      "How to save or manage personal money",
      "How to comply with financial regulations",
      "How to interpret financial trends",
    ],
  },
  {
    question: "How do you approach problems?",
    options: [
      "Evaluate risks and find safe solutions",
      "Use logic and modeling to predict outcomes",
      "Talk with clients to find the best path",
      "Analyze data to support a decision",
      "Ensure all rules and policies are followed",
    ],
  },
  {
    question: "Which financial topic do you find most engaging?",
    options: [
      "Cryptocurrency and fintech",
      "Interest rates and inflation",
      "Mutual funds and retirement plans",
      "Regulations and audit trails",
      "Mergers, acquisitions, and valuation",
    ],
  },
  {
    question: "What type of clients would you like to work with?",
    options: [
      "High-net-worth individuals",
      "Large corporations",
      "Retail banking customers",
      "Startups and entrepreneurs",
      "Government or NGOs",
    ],
  },
  {
    question: "Which of these best describes your work style?",
    options: [
      "Detail-oriented and cautious",
      "Persuasive and people-focused",
      "Strategic and big-picture thinker",
      "Fast decision-maker under pressure",
      "Structured and compliance-driven",
    ],
  },
  {
    question: "What kind of impact do you want to make?",
    options: [
      "Help individuals manage and grow wealth",
      "Improve business financial efficiency",
      "Ensure regulatory compliance and reduce fraud",
      "Drive stock or market performance",
      "Shape economic policy or strategy",
    ],
  },
  {
    question: "How do you handle pressure?",
    options: [
      "I thrive in fast-paced environments",
      "I prefer steady, structured work",
      "I enjoy solving problems under pressure",
      "I stay calm and methodical",
      "I communicate well during high-stress tasks",
    ],
  },
  {
    question: "Which career path sounds most exciting to you?",
    options: [
      "Investment banker or equity analyst",
      "Financial planner or wealth advisor",
      "Corporate finance manager",
      "Risk analyst or compliance officer",
      "Economic researcher or policy analyst",
    ],
  },
  {
    question: "How do you prefer to learn new skills?",
    options: [
      "Certifications like CFA, FRM, CFP",
      "Hands-on with data or software",
      "Case studies and real-world examples",
      "Mentorship and team collaboration",
      "Academic research and reports",
    ],
  },
  {
    question: "Where do you see yourself in 5 years?",
    options: [
      "Managing high-value investment portfolios",
      "Running your own financial advisory firm",
      "Leading a corporate finance team",
      "Auditing or ensuring regulatory compliance",
      "Influencing public finance or monetary policy",
    ],
  },
];


const BankingAssesment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);


  const handleAnswerClick = (index) => {
    setSelectedAnswer(index);
  };

  const handleNextQuestion = async () => {
    const updatedAnswers = [
      ...answers,
      banckingQuestions[currentQuestion].options[selectedAnswer],
    ];
    setAnswers(updatedAnswers);

    if (currentQuestion < banckingQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
  setIsLoading(true); // Start loader

  try {
    const response = await fetch("http://localhost:8080/api/assessment/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        answers: updatedAnswers,
        type: "bancking",
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

  const progressPercent = ((currentQuestion + 1) / banckingQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-10">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Bancking and finance Career Assessment
      </h1>

      <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-lg text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {banckingQuestions[currentQuestion].question}
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {banckingQuestions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className={`px-6 py-3 rounded-md text-lg transition ${
                selectedAnswer === index
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => handleAnswerClick(index)}
            >
              {option}
            </button>
          ))}
        </div>

        {/* ✅ Updated Progress Bar */}
        <div className="w-full bg-gray-300 h-2 rounded-full mt-6">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {Math.round(progressPercent)}% complete
        </p>

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
    {currentQuestion < banckingQuestions.length - 1 ? "Next" : "Submit"}
  </button>
)}

      </div>
    </div>
  );
};

export default BankingAssesment;