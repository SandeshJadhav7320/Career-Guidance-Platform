import React, { useState, useEffect } from "react";
import Dashboard_Navbar from "../Dashboard_Components/Dashboard_Navbar";
import dashboardImage from "../assets/dashboardimage.png"; // Use the image you uploaded
import { FaMapMarkerAlt, FaBriefcase, FaHandshake } from "react-icons/fa";


const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user-info");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user info from localStorage:", error);
      }
    }
  }, []);

  if (!user) {
    return (
      <div className="text-center py-20 text-lg text-gray-600">
        Loading user information...
      </div>
    );
  }

  return (
<div className="min-h-screen bg-gray-100 flex flex-col">
  <Dashboard_Navbar />

  {/* Main Content */}
  <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto py-16 px-6 md:px-10 gap-7">
    {/* Left Content */}
    <div className="w-full md:w-1/2 pl-0 ml-0 text-left space-y-4">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
        Welcome, {user.name}
      </h1>
      <h2 className="text-5xl md:text-6xl font-bold text-gray-900">
        Personalized <br />
        Career <br />
        Assessment
      </h2>
      <p className="text-xl text-gray-700 max-w-md">
        Take our AI-powered assessment tailored to your strengths and interests to find your ideal career path.
      </p>
      <button className="mt-4 px-8 py-4 bg-blue-600 text-white text-xl rounded-md shadow hover:bg-blue-700 transition">
        Start Assessment
      </button>
    </div>

    {/* Right Image */}
    <div className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0">
      <img
        src={dashboardImage}
        alt="AI Career Guidance"
        className="w-full h-auto object-contain scale-130 rounded-lg bg-gray-100"
      />
    </div> 
  </div>

  {/* Career Guidance Cards Section */}
<div className="max-w-5xl mx-auto py-6 px-4">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    
    {/* Card 1 - Career Suggestions */}
    <div className="bg-white p-6 h-[300px] w-[270px] rounded-lg shadow-md flex flex-col items-center text-center">
      <span className="text-blue-600 text-7xl mb-10">
        <FaMapMarkerAlt /> {/* Location Pin Icon */}
      </span>
      <h3 className="text-lg font-semibold text-gray-800">Career Suggestions</h3>
      <p className="text-gray-600 text-sm">Discover careers that match your profile.</p>
      <p className="text-gray-500 text-sm">Receive personalized recommendations based on your interests.</p>  
    </div>

    {/* Card 2 - Find Jobs */}
    <div className="bg-white p-6 h-[300px] w-[270px] rounded-lg shadow-md flex flex-col items-center text-center">
      <span className="text-blue-600 text-7xl mb-10">
        <FaBriefcase /> {/* Briefcase Icon */}
      </span>
      <h3 className="text-lg font-semibold text-gray-800">Find Jobs</h3>
      <p className="text-gray-600 text-sm">Explore available job opportunities.</p>
      <p className="text-gray-500 text-sm">Apply to top companies and accelerate your career growth.</p>  
    </div>

    {/* Card 3 - Connect with Mentors */}
    <div className="bg-white p-6 h-[300px] w-[270px] rounded-lg shadow-md flex flex-col items-center text-center">
      <span className="text-blue-600 text-7xl mb-10">
        <FaHandshake /> {/* Handshake Icon */}
      </span>
      <h3 className="text-lg font-semibold text-gray-800">Connect with Mentors</h3>
      <p className="text-gray-600 text-sm">Get guidance from industry professionals.</p>
      <p className="text-gray-500 text-sm">Build meaningful connections and learn from experts.</p>  
    </div>

  </div>
</div>


</div>

  );
};

export default Dashboard;
