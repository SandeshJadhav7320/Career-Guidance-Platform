import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// ✅ Administrative questions
const administrativeQuestions = [
  {
    question: "What aspect of public service appeals to you most?",
    options: [
      "Creating and implementing government policies",
      "Ensuring law and order in society",
      "Managing large-scale government programs",
      "Improving community services and welfare",
      "Handling administrative or clerical functions",
    ],
  },
  {
    question: "Which work environment do you prefer?",
    options: [
      "Central government offices",
      "District-level field postings",
      "Policy think tanks or planning bodies",
      "Municipal or local government offices",
      "Departments handling internal admin work",
    ],
  },
  {
    question: "How do you handle decision-making?",
    options: [
      "I analyze policies and long-term impact",
      "I act quickly to maintain control and order",
      "I evaluate resources and logistics before acting",
      "I consult stakeholders to ensure inclusivity",
      "I follow standard procedures strictly",
    ],
  },
  {
    question: "Which administrative challenge interests you?",
    options: [
      "Shaping economic or development policies",
      "Disaster response and crisis management",
      "Resource planning and budget allocation",
      "Public health and education delivery",
      "Managing office records and staff",
    ],
  },
  {
    question: "What motivates you in an administrative career?",
    options: [
      "Bringing systemic change to governance",
      "Serving people and ensuring safety",
      "Leading large government teams",
      "Improving service delivery efficiency",
      "Maintaining effective internal systems",
    ],
  },
  {
    question: "How comfortable are you with handling public complaints?",
    options: [
      "Very comfortable – I’m diplomatic and fair",
      "Comfortable – I’m firm and confident",
      "I prefer managing internal issues over public-facing ones",
      "I like resolving them via structured processes",
      "I’d rather assist senior officers who handle them",
    ],
  },
  {
    question: "Which skill do you want to improve the most?",
    options: [
      "Policy analysis and governance",
      "Leadership and enforcement",
      "Operations and logistics",
      "Communication with diverse communities",
      "Documentation and office workflow",
    ],
  },
  {
    question: "How do you deal with pressure and crisis situations?",
    options: [
      "Stay calm and evaluate all sides",
      "Act immediately to restore order",
      "Coordinate teams and act on available data",
      "Seek input and prioritize public welfare",
      "Follow contingency protocols",
    ],
  },
  {
    question: "Which role would you be most comfortable in?",
    options: [
      "Policy advisor or planning officer",
      "District magistrate or police superintendent",
      "Administrative operations head",
      "Welfare or rural development officer",
      "Clerical or section officer",
    ],
  },
  {
    question: "How do you prefer to solve administrative problems?",
    options: [
      "Use data and impact reports",
      "Direct field intervention",
      "Work with planning and budgeting tools",
      "Engage stakeholders and citizens",
      "Refer to rulebooks and precedents",
    ],
  },
  {
    question: "How important is ethics and integrity in your work?",
    options: [
      "Extremely – it’s the core of governance",
      "Very – especially in law enforcement",
      "Important – for effective implementation",
      "Essential – to earn public trust",
      "Important – especially for documentation and audits",
    ],
  },
  {
    question: "Which of these situations would you prefer to manage?",
    options: [
      "Drafting a new national development policy",
      "Handling law and order during a protest",
      "Managing flood relief operations",
      "Overseeing a government education scheme",
      "Conducting official record audits",
    ],
  },
  {
    question: "How do you like to interact with people?",
    options: [
      "High-level policy discussions",
      "Leading teams and enforcing rules",
      "Coordinating between departments",
      "Interacting with citizens and NGOs",
      "Assisting with admin processes",
    ],
  },
  {
    question: "What kind of training excites you the most?",
    options: [
      "Public policy and governance training",
      "Field training in administration and law enforcement",
      "Workshops on logistics and planning",
      "Communication and public relations programs",
      "Office procedure and documentation sessions",
    ],
  },
  {
    question: "Where do you see yourself in 5 years?",
    options: [
      "Working in a national policy-making body",
      "Heading a district or enforcement unit",
      "Managing a major administrative department",
      "Leading a social impact program",
      "Overseeing administrative sections in a ministry",
    ],
  },
];

const AdministrativeAssesment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAnswerClick = (index) => {
    setSelectedAnswer(index);
  };

  const handleNextQuestion = async () => {
    const updatedAnswers = [
      ...answers,
      administrativeQuestions[currentQuestion].options[selectedAnswer],
    ];
    setAnswers(updatedAnswers);

    if (currentQuestion < administrativeQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setIsLoading(true);
      try {
        const response = await fetch(
          "http://localhost:8080/api/assessment/analyze",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              answers: updatedAnswers,
              type: "administrative", // corrected type
            }),
          }
        );

        const result = await response.json();
        navigate("/careerpathpage", { state: { careerPaths: result } });
      } catch (error) {
        console.error("Error fetching career path:", error);
        alert("Something went wrong! Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const progressPercent =
    ((currentQuestion + 1) / administrativeQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-10">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Administrative Career Assessment
      </h1>

      <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-lg text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {administrativeQuestions[currentQuestion].question}
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {administrativeQuestions[currentQuestion].options.map(
            (option, index) => (
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
            )
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-300 h-2 rounded-full mt-6">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {Math.round(progressPercent)}% complete
        </p>

        {/* Submit or Loading */}
        {isLoading ? (
          <div className="mt-6 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-blue-600 font-medium">
              Analyzing your results...
            </span>
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
            {currentQuestion < administrativeQuestions.length - 1
              ? "Next"
              : "Submit"}
          </button>
        )}
      </div>
    </div>
  );
};

export default AdministrativeAssesment;
