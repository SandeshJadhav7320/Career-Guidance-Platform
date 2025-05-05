import React from "react";

const Features = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-screen-lg mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose CareerGuide AI?</h2>
        <p className="text-gray-600 mb-8">Get personalized career insights based on AI-powered assessments.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Smart Career Assessment</h3>
            <p className="text-gray-600">AI analyzes your skills and interests to suggest ideal career paths.</p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Job Recommendations</h3>
            <p className="text-gray-600">Find job opportunities that match your strengths and ambitions.</p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Expert Mentorship</h3>
            <p className="text-gray-600">Connect with mentors who guide your career growth.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
;
