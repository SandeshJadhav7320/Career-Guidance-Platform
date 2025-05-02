import React from "react";

const Home = () => {
  return (
    <div className="px-6 py-12">
      <h1 className="text-4xl font-bold mb-4">Discover Your Perfect Career Path with AI</h1>
      <p className="text-lg text-gray-600 mb-6">
        Take the smart career assessment and find jobs and mentors aligned with your future.
      </p>
      <button className="bg-blue-600 text-white px-6 py-2 rounded">Get Started</button>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
        {/* Card Items */}
        <div>
          <h2 className="font-semibold">Personalized Career Assessment</h2>
          <p className="text-sm text-gray-600">Take the smart career assessment</p>
        </div>
        <div>
          <h2 className="font-semibold">Job Matching</h2>
          <p className="text-sm text-gray-600">Find your ideal job opportunities</p>
        </div>
        <div>
          <h2 className="font-semibold">Learning Path</h2>
          <p className="text-sm text-gray-600">Guide through your dev journey</p>
        </div>
        <div>
          <h2 className="font-semibold">Mentorship Support</h2>
          <p className="text-sm text-gray-600">Connect with experienced mentors</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
