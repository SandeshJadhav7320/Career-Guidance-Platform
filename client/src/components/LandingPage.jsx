import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import heroImage from "../assets/hero.png";
import { googleAuth } from "../api";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaQuestionCircle, FaBrain, FaUsers ,FaSignInAlt} from "react-icons/fa";
import careerSymbol from "../assets/career-symbol.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user-info");
    if (user) {
      navigate("/dashboard"); // ✅ Redirect logged-in users to Dashboard
    }
  }, [navigate]); 

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("OAuth Success:", tokenResponse);
      const accessToken = tokenResponse.access_token;

      const response = await googleAuth(accessToken);
      console.log("Backend Response:", response);

      localStorage.setItem("user-info", JSON.stringify(response));
      window.location.href = "/dashboard";
    },
    onError: () => console.error("Login Failed"),
  });

  return (
    <>
      {/* Navigation Bar */}
      <nav className="bg-gray-100 shadow-md py-4 px-6 flex items-center justify-between">
      {/* Logo Section */}
      <div className="flex items-center">
  {/* Logo Image */}
  <img src={careerSymbol} alt="Career Guide AI Logo" className="w-15 h-auto rounded-md shadow-lg bg-gray-100" />
</div>


      {/* Login Button */}
      <button
        onClick={() => googleLogin()}
        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-5 py-2 rounded-md shadow-md hover:shadow-lg transition duration-300"
      >
        <FaSignInAlt /> Log In
      </button>
    </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center px-6 py-16 bg-gray-100">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Discover Your Perfect Career Path with <span className="text-blue-600">AI</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Take the smart career assessment and find jobs and mentors aligned with your future.
          </p>
          <button onClick={() => googleLogin()}className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:shadow-xl transition duration-300">
            Get Started
          </button>
        </div>

        <div className="md:w-1/2">
          <img
            src={heroImage}
            alt="AI Career Guidance"
            className="w-full h-auto rounded-md shadow-xl"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Why Choose CareerGuide AI?</h2>
          <p className="text-gray-600 text-lg mb-12">Get personalized career insights powered by AI assessments.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 bg-gray-100 rounded-xl shadow-md hover:shadow-lg transition">
              <FaQuestionCircle className="text-blue-600 text-5xl mb-4 mx-auto" />
              <h3 className="text-2xl font-semibold text-blue-600 mb-2">Smart Career Assessment</h3>
              <p className="text-gray-600">AI analyzes your skills and interests to suggest ideal career paths.</p>
            </div>

            <div className="p-8 bg-gray-100 rounded-xl shadow-md hover:shadow-lg transition">
              <FaBrain className="text-blue-600 text-5xl mb-4 mx-auto" />
              <h3 className="text-2xl font-semibold text-blue-600 mb-2">Job Recommendations</h3>
              <p className="text-gray-600">Find job opportunities that match your strengths and ambitions.</p>
            </div>

            <div className="p-8 bg-gray-100 rounded-xl shadow-md hover:shadow-lg transition">
              <FaUsers className="text-blue-600 text-5xl mb-4 mx-auto" />
              <h3 className="text-2xl font-semibold text-blue-600 mb-2">Expert Mentorship</h3>
              <p className="text-gray-600">Connect with mentors who guide your career growth.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Contact Us</h2>
          <p className="text-gray-600 text-lg mb-12">Have questions? Feel free to reach out!</p>

          <form className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md">
            <input type="text" placeholder="Your Name" className="w-full p-3 mb-6 border rounded-md" required />
            <input type="email" placeholder="Your Email" className="w-full p-3 mb-6 border rounded-md" required />
            <textarea placeholder="Your Message" className="w-full p-3 mb-6 border rounded-md" rows="4" required></textarea>
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-screen-lg mx-auto text-center">
          <p className="text-lg font-semibold">CareerGuide AI © 2025</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="hover:text-blue-400">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400">Terms of Service</a>
            <a href="#" className="hover:text-blue-400">Contact Us</a>
          </div>
          <div className="flex justify-center space-x-6 mt-6 text-xl">
            <FaFacebook className="hover:text-blue-400 cursor-pointer" />
            <FaTwitter className="hover:text-blue-400 cursor-pointer" />
            <FaLinkedin className="hover:text-blue-400 cursor-pointer" />
            <FaInstagram className="hover:text-blue-400 cursor-pointer" />
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
