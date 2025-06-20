import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// ✅ Technical questions for all engineering domains
const technicalQuestions = [
  {
    question: "Which type of engineering work appeals to you the most?",
    options: [
      "Designing machines or mechanical systems",
      "Planning and constructing buildings/infrastructure",
      "Working with electronics or circuits",
      "Developing software and applications",
      "Analyzing large datasets or AI models",
    ],
  },
  {
    question: "Which tools or subjects do you enjoy?",
    options: [
      "CAD tools, thermodynamics",
      "Surveying, structural analysis",
      "Circuit design, microcontrollers",
      "Programming languages and frameworks",
      "Data visualization tools and ML libraries",
    ],
  },
  {
    question: "What type of work environment do you prefer?",
    options: [
      "Workshops or factories",
      "On-site at construction areas",
      "Labs with electronics testing equipment",
      "Office or remote software teams",
      "Data centers or research labs",
    ],
  },
  {
    question: "Which task sounds most interesting to you?",
    options: [
      "Improving machine efficiency",
      "Designing safe bridges and roads",
      "Building smart devices",
      "Creating web/mobile apps",
      "Finding trends in big data",
    ],
  },
  {
    question: "How do you feel about working outdoors?",
    options: [
      "Sometimes, for machinery checks",
      "Yes, I like on-site supervision",
      "Mostly indoor lab work",
      "Prefer indoor coding environment",
      "Indoor research or analysis",
    ],
  },
  {
    question: "What challenges excite you the most?",
    options: [
      "Solving mechanical faults",
      "Designing sustainable structures",
      "Creating energy-efficient electronics",
      "Building robust software systems",
      "Developing predictive AI models",
    ],
  },
  {
    question: "Which industry would you like to work in?",
    options: [
      "Automotive or aerospace",
      "Urban development or construction",
      "Consumer electronics or IoT",
      "Tech companies or startups",
      "Research institutes or analytics firms",
    ],
  },
  {
    question: "How do you prefer to learn new concepts?",
    options: [
      "Hands-on machine experiments",
      "Site visits and project work",
      "Circuit prototyping",
      "Online coding practice",
      "Data experiments and case studies",
    ],
  },
  {
    question: "How comfortable are you with design tools?",
    options: [
      "Very comfortable with CAD, SolidWorks",
      "Use AutoCAD, Revit for plans",
      "Use PCB design or circuit simulators",
      "Use IDEs, version control tools",
      "Use Jupyter, ML frameworks",
    ],
  },
  {
    question: "Do you enjoy teamwork?",
    options: [
      "Yes, in workshops and production teams",
      "Yes, on construction projects",
      "Yes, in electronics labs",
      "Yes, in agile dev teams",
      "Yes, in research collaborations",
    ],
  },
  {
    question: "What motivates you most in engineering?",
    options: [
      "Building reliable machinery",
      "Creating safe and aesthetic structures",
      "Developing innovative devices",
      "Building apps users love",
      "Solving complex data problems",
    ],
  },
  {
    question: "Which additional fields interest you?",
    options: [
      "Robotics and automation",
      "Smart cities and urban planning",
      "IoT and embedded systems",
      "AI and cloud computing",
      "Sustainable energy solutions",
    ],
  },
  {
    question: "How do you feel about maintenance work?",
    options: [
      "I like maintaining machines",
      "Inspecting and repairing structures",
      "Troubleshooting electronic devices",
      "Debugging and maintaining code",
      "Maintaining data pipelines and models",
    ],
  },
  {
    question: "Which domain would you enjoy researching?",
    options: [
      "Advanced manufacturing techniques",
      "Earthquake-resistant buildings",
      "Next-gen sensors and circuits",
      "Cutting-edge software solutions",
      "Deep learning and AI ethics",
    ],
  },
  {
    question: "Which statement describes you best?",
    options: [
      "Hands-on problem solver",
      "Detail-oriented planner",
      "Curious tinkerer",
      "Logical coder",
      "Insightful data analyst",
    ],
  },
  {
    question: "Which future project excites you?",
    options: [
      "Designing electric vehicles",
      "Building smart sustainable cities",
      "Creating wearable tech",
      "Developing fintech apps",
      "Building intelligent recommendation systems",
    ],
  },
  {
    question: "How do you approach technical problems?",
    options: [
      "Break it into mechanical parts",
      "Analyze structural impact",
      "Test electronic connections",
      "Debug code step-by-step",
      "Explore data patterns",
    ],
  },
  {
    question: "Which soft skill would you improve?",
    options: [
      "Time management for project deadlines",
      "Communication with stakeholders",
      "Attention to tiny circuit details",
      "Collaboration in large dev teams",
      "Storytelling with data",
    ],
  },
  {
    question: "How do you feel about sustainability?",
    options: [
      "Want to build greener machines",
      "Design eco-friendly buildings",
      "Develop energy-saving electronics",
      "Write efficient, sustainable code",
      "Apply AI for climate solutions",
    ],
  },
  {
    question: "Where do you see yourself in 5 years?",
    options: [
      "Senior mechanical engineer or manager",
      "Civil engineer managing big projects",
      "Electronics design lead",
      "Full-stack developer or tech lead",
      "Data scientist or AI specialist",
    ],
  },
];

const TechnicalAssessment = () => {
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
      technicalQuestions[currentQuestion].options[selectedAnswer],
    ];
    setAnswers(updatedAnswers);

    if (currentQuestion < technicalQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
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
              type: "technical",
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

  const progressPercent = ((currentQuestion + 1) / technicalQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-10">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Technical Career Assessment
      </h1>

      <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-lg text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {technicalQuestions[currentQuestion].question}
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {technicalQuestions[currentQuestion].options.map((option, index) => (
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
          {currentQuestion < technicalQuestions.length - 1 ? "Next" : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default TechnicalAssessment;