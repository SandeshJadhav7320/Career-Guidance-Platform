import React from "react";
import { FaQuestionCircle, FaBrain, FaUsers } from "react-icons/fa"; // Importing icons from react-icons

const HowItWorks = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-screen-lg mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">How It Works</h2>
        <p className="text-gray-600 mb-8">Follow these simple steps to discover your best career options.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="p-6 bg-white rounded-lg shadow-md transform hover:scale-105 transition-all duration-300">
            <FaQuestionCircle className="text-blue-600 text-4xl mb-3 mx-auto" />
            <h3 className="text-xl font-semibold text-blue-600 mb-2">1. Take the Career Quiz</h3>
            <p className="text-gray-600">Answer simple questions about your interests and skills.</p>
          </div>

          {/* Step 2 */}
          <div className="p-6 bg-white rounded-lg shadow-md transform hover:scale-105 transition-all duration-300">
            <FaBrain className="text-blue-600 text-4xl mb-3 mx-auto" />
            <h3 className="text-xl font-semibold text-blue-600 mb-2">2. Get AI-Powered Insights</h3>
            <p className="text-gray-600">AI analyzes your responses and suggests tailored career paths.</p>
          </div>

          {/* Step 3 */}
          <div className="p-6 bg-white rounded-lg shadow-md transform hover:scale-105 transition-all duration-300">
            <FaUsers className="text-blue-600 text-4xl mb-3 mx-auto" />
            <h3 className="text-xl font-semibold text-blue-600 mb-2">3. Explore Jobs & Mentors</h3>
            <p className="text-gray-600">Find real job opportunities and connect with industry experts.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
