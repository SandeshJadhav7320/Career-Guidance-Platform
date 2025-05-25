import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram,FaQuestionCircle, FaBrain, FaUsers } from "react-icons/fa"; // Importing social media icons
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/hero.png"; // Make sure the path is correct

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <div className="text-2xl font-bold text-blue-600">
          Career<span className="text-black">Guide</span> AI
        </div>
        <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <a href="#" className="hover:text-blue-600">Home</a>
          <a href="#" className="hover:text-blue-600">About</a>
          <a href="#" className="hover:text-blue-600">Contact</a>
        </div>
        <button
          onClick={() => navigate("/oauth-login")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Log In
        </button>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center px-6 py-12 bg-gray-100">
        {/* Left Side: Text */}
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Your Perfect Career Path with AI
          </h1>
          <p className="text-gray-600 mb-6">
            Take the smart career assessment and find jobs and mentors aligned with your future.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
            Get Started
          </button>
        </div>

        {/* Right Side: Image */}
        <div className="md:w-1/2">
          <img
            src={heroImage}
            alt="AI Career Guidance"
            className="w-full h-auto rounded-md shadow-lg"
          />
        </div>
      </section>

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

        <section className="py-12 bg-gray-100">
      <div className="max-w-screen-lg mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>
        <p className="text-gray-600 mb-8">Have questions? Feel free to reach out!</p>

        <form className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <input type="text" placeholder="Your Name" className="w-full p-3 mb-4 border rounded-md" required />
          <input type="email" placeholder="Your Email" className="w-full p-3 mb-4 border rounded-md" required />
          <textarea placeholder="Your Message" className="w-full p-3 mb-4 border rounded-md" rows="4" required></textarea>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
            Send Message
          </button>
        </form>
      </div>
    </section>

    <footer className="bg-gray-900 text-white py-6">
          <div className="max-w-screen-lg mx-auto text-center">
            {/* Copyright */}
            <p className="text-lg font-semibold">CareerGuide AI © 2025</p>
    
            {/* Links */}
            <div className="flex justify-center space-x-6 mt-4">
              <a href="#" className="hover:text-blue-400">Privacy Policy</a>
              <a href="#" className="hover:text-blue-400">Terms of Service</a>
              <a href="#" className="hover:text-blue-400">Contact Us</a>
            </div>
    
            {/* Social Media Icons */}
            <div className="flex justify-center space-x-6 mt-6">
              <a href="#" className="text-xl hover:text-blue-400">
                <FaFacebook />
              </a>
              <a href="#" className="text-xl hover:text-blue-400">
                <FaTwitter />
              </a>
              <a href="#" className="text-xl hover:text-blue-400">
                <FaLinkedin />
              </a>
              <a href="#" className="text-xl hover:text-blue-400">
                <FaInstagram />
              </a>
            </div>
          </div>
        </footer>
    </>
  );
};

export default LandingPage;
