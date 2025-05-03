import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-blue-500 text-white shadow-md">
        <h1 className="text-xl font-bold">CareerGuide AI</h1>
        <div className="space-x-6">
          <a href="#about" className="hover:underline">About</a>
          <a href="#contact" className="hover:underline">Contact</a>
          <button className="bg-white text-blue-500 px-4 py-2 rounded shadow-md hover:bg-gray-200">Log In</button>
        </div>
      </nav>

      {/* Welcome Section */}
      <section className="text-center py-20 px-6">
        <h2 className="text-4xl font-bold text-gray-900">Find Your Perfect Career Path with AI</h2>
        <p className="mt-4 text-lg text-gray-600">Smart career assessments, job matching, and mentorship all in one platform.</p>
        <button className="mt-6 bg-blue-500 text-white px-6 py-3 rounded shadow-md hover:bg-blue-600">Get Started</button>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-8 py-10 text-center">
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900">Career Assessment</h3>
          <p className="text-gray-600 mt-2">AI-powered insights to discover your ideal profession.</p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900">Job Matching</h3>
          <p className="text-gray-600 mt-2">Find job openings suited to your skills.</p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900">Skill Development</h3>
          <p className="text-gray-600 mt-2">Get learning resources to grow professionally.</p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900">Mentorship Support</h3>
          <p className="text-gray-600 mt-2">Connect with experts to guide your career journey.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-gray-300">
        <p className="text-gray-700">© 2025 CareerGuide AI | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Home;
