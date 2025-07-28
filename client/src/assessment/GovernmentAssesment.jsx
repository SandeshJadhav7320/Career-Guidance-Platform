import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// ✅ Government job interest assessment questions

const governmentQuestions = [
  {
    question: "Which type of government job appeals to you the most?",
    options: [
      "Administrative services (IAS/IPS)",
      "Defense services (Army, Navy, Air Force)",
      "Finance & taxation (IRS, customs, audit)",
      "Law enforcement (police, paramilitary)",
      "Public sector undertakings (PSUs, banks, railways)"
    ],
  },
  {
    question: "What motivates you to pursue a government career?",
    options: [
      "Serving the nation",
      "Job security and benefits",
      "Leadership opportunities",
      "Influence in policymaking",
      "Work-life balance"
    ],
  },
  {
    question: "What type of work environment do you prefer?",
    options: [
      "Fieldwork and on-ground inspections",
      "Office-based administrative work",
      "Research and data analysis",
      "Leadership and decision-making roles",
      "Public interaction and community engagement"
    ],
  },
  {
    question: "How comfortable are you with working under strict rules and protocols?",
    options: [
      "Very comfortable",
      "Mostly comfortable",
      "Neutral",
      "Slightly uncomfortable",
      "Not comfortable"
    ],
  },
  {
    question: "Which skill describes you best?",
    options: [
      "Strategic thinking",
      "Physical endurance",
      "Analytical reasoning",
      "Law & order enforcement",
      "Public speaking and negotiation"
    ],
  },
  {
    question: "How do you handle stressful situations?",
    options: [
      "Stay calm and logical",
      "Take command and act quickly",
      "Analyze before reacting",
      "Seek support and advice",
      "Avoid conflict if possible"
    ],
  },
  {
    question: "Which subjects interest you the most?",
    options: [
      "Political science & governance",
      "History & current affairs",
      "Economics & finance",
      "Law & criminal justice",
      "Science & technology"
    ],
  },
  {
    question: "Would you be willing to relocate frequently for your job?",
    options: [
      "Yes, anytime",
      "Mostly yes",
      "Neutral",
      "Prefer stable posting",
      "No, I want to stay in one place"
    ],
  },
  {
    question: "How important is public interaction in your career choice?",
    options: [
      "Very important",
      "Important",
      "Neutral",
      "Less important",
      "Not important"
    ],
  },
  {
    question: "Which challenge excites you the most?",
    options: [
      "Solving complex administrative issues",
      "Leading teams in tough conditions",
      "Investigating fraud or crime",
      "Managing budgets and policies",
      "Implementing development schemes"
    ],
  },
  {
    question: "How do you prefer to work?",
    options: [
      "Alone on detailed tasks",
      "In a structured team with hierarchy",
      "Leading and managing teams",
      "In collaboration with other departments",
      "In public-facing roles"
    ],
  },
  {
    question: "Which exam type are you most comfortable with?",
    options: [
      "General knowledge and aptitude",
      "Physical fitness tests",
      "Interview and personality tests",
      "Subject-specific exams (finance, law)",
      "All-rounder tests (like UPSC)"
    ],
  },
  {
    question: "How do you keep up with current affairs?",
    options: [
      "Daily newspapers and news channels",
      "Government reports and updates",
      "Social media and discussion groups",
      "Reading books and journals",
      "Occasionally, not regularly"
    ],
  },
  {
    question: "What is your long-term goal in the government sector?",
    options: [
      "Become a high-ranking civil servant",
      "Serve in national defense forces",
      "Work in revenue/taxation departments",
      "Join police or paramilitary forces",
      "Grow in PSUs or national banks"
    ],
  },
  {
    question: "Which statement suits you the most?",
    options: [
      "I want to impact policymaking",
      "I want to protect the nation",
      "I want to ensure financial integrity",
      "I want to uphold law and order",
      "I want to contribute to national development"
    ],
  },
];

const GovernmentAssesment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  const handleAnswerClick = (index) => {
    setSelectedAnswer(index);
  };

  const handleNextQuestion = async () => {
    const updatedAnswers = [
      ...answers,
      governmentQuestions[currentQuestion].options[selectedAnswer],
    ];
    setAnswers(updatedAnswers);

    if (currentQuestion < governmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      try {
        const response = await fetch(
          "${API_BASE}/api/assessment/analyze",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              answers: updatedAnswers,
              type: "government",
            }),
          }
        );

        const result = await response.json();
        navigate("/careerpathpage", { state: { careerPaths: result } });
      } catch (error) {
        console.error("Error fetching career path:", error);
        alert("Something went wrong! Please try again.");
      }
    }
  };

  const progressPercent = ((currentQuestion + 1) / governmentQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-10">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Technical Career Assessment
      </h1>

      <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-lg text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {governmentQuestions[currentQuestion].question}
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {governmentQuestions[currentQuestion].options.map((option, index) => (
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

        <button
          className={`mt-6 px-6 py-3 rounded-md shadow transition ${
            selectedAnswer !== null
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-400 text-gray-100 cursor-not-allowed"
          }`}
          onClick={handleNextQuestion}
          disabled={selectedAnswer === null}
        >
          {currentQuestion < governmentQuestions.length - 1 ? "Next" : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default GovernmentAssesment;