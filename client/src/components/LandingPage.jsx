import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import heroImage from "../assets/hero.png";
import { googleAuth } from "../api";


const LandingPage = () => {
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("OAuth Success:", tokenResponse);

      // The access token is provided by Google OAuth
      const accessToken = tokenResponse.access_token;

      // Send the access token to your backend to verify and fetch user details
      const response = await googleAuth(accessToken);
      console.log("Backend Response:", response);

      // Store user data in local storage and redirect
      localStorage.setItem("user-info", JSON.stringify(response));
      window.location.href = "/dashboard"; // Redirect after login
    },
    onError: () => console.error("Login Failed"),
  });

  return (
    <>
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <div className="text-2xl font-bold text-blue-600">
          Career<span className="text-black">Guide</span> AI
        </div>

        {/* Log In Button Directly Opens Google OAuth */}
        <button onClick={() => googleLogin()} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Log In
        </button>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center px-6 py-12 bg-gray-100">
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
        <div className="md:w-1/2">
          <img src={heroImage} alt="AI Career Guidance" className="w-full h-auto rounded-md shadow-lg" />
        </div>
      </section>
    </>
  );
};

export default LandingPage;
