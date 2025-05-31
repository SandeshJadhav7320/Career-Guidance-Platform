import React, { useState, useEffect } from "react";
import Dashboard_Navbar from "../Dashboard_Components/Dashboard_Navbar";
import dashboardImage from "../assets/dashboardimage.png"; // Use the image you uploaded

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
    <div className="min-h-screen bg-gray-100">
      <Dashboard_Navbar />

      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto py-16 px-6 md:px-10 gap-6">

       {/* Left Content */}
{/* Left Content */}
<div className="w-full md:w-1/2 pl-0 ml-0 text-left space-y-8">
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
    </div>
  );
};

export default Dashboard;
