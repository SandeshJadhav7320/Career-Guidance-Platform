import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard_Navbar from "../Dashboard_Components/Dashboard_Navbar";

const Profile = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // ✅ Manage modal state

  useEffect(() => {
    const handleBackNavigation = () => {
      navigate("/", { replace: true });
    };

    window.addEventListener("popstate", handleBackNavigation);
    return () => window.removeEventListener("popstate", handleBackNavigation);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user-info"); // ✅ Remove session
    navigate("/", { replace: true }); // ✅ Redirect to home
  };

  return (
    <>
     <Dashboard_Navbar/>
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-700">Profile Page</h1>
      <p className="text-gray-600">Welcome to your profile!</p>

      {/* Logout Button: Opens Modal */}
      <button
        onClick={() => setShowModal(true)}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700 transition-all"
      >
        Logout 🚪
      </button>

      {/* Logout Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-bold text-gray-700">Confirm Logout</h2>
            <p className="text-gray-600 mb-4">Are you sure you want to log out?</p>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    
    </>
    
  );
};

export default Profile;
