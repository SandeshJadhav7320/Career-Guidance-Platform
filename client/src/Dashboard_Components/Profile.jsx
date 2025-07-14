import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Mail, User, LogOut } from "lucide-react";
import Dashboard_Navbar from "../Dashboard_Components/Dashboard_Navbar";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const defaultAvatar = "/default-avatar.png";

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    avatar: "",
    role: "",
    education: "",
    location: "",
    interests: "",
    skills: "",
    portfolio: ""
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user-info");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setFormData(parsedUser);
      } catch (error) {
        console.error("Error parsing user info:", error);
      }
    }

    const handleBackNavigation = () => {
      navigate("/", { replace: true });
    };

    window.addEventListener("popstate", handleBackNavigation);
    return () => window.removeEventListener("popstate", handleBackNavigation);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user-info");
    navigate("/", { replace: true });
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSaveChanges = () => {
    setUser(formData);
    localStorage.setItem("user-info", JSON.stringify(formData));
    setEditModal(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        Loading profile...
      </div>
    );
  }

  return (
    <>
      <Dashboard_Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 py-10 px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl p-8 space-y-6 text-center">
          <div className="flex flex-col items-center space-y-3">
            <div className="relative">
              <img
                src={user.avatar || defaultAvatar}
                alt="User Avatar"
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
              />
              <div
                className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md"
                title="Profile Picture"
              >
                <User size={18} className="text-gray-600" />
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-gray-800">{user.name}</h1>
            <p className="text-gray-500 italic">{user.bio || "Tell us about yourself."}</p>
          </div>

          <div className="text-gray-600 flex items-center justify-center gap-2 text-sm">
            <Mail size={18} />
            <span>{user.email}</span>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => setEditModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              <Pencil size={18} />
              Edit
            </button>
            <button
              onClick={() => setShowLogoutModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Confirm Logout</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal (without resume or image upload) */}
      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Edit Profile</h2>

            <div className="grid grid-cols-1 gap-4">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="px-3 py-2 border rounded-md"
                placeholder="Full Name"
              />
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="px-3 py-2 border rounded-md"
                placeholder="Short Bio"
              />
              <input
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="px-3 py-2 border rounded-md"
                placeholder="Current Role"
              />
              <input
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="px-3 py-2 border rounded-md"
                placeholder="Education"
              />
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="px-3 py-2 border rounded-md"
                placeholder="Location"
              />
              <input
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                className="px-3 py-2 border rounded-md"
                placeholder="Career Interests"
              />
              <input
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="px-3 py-2 border rounded-md"
                placeholder="Skills"
              />
              <input
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                className="px-3 py-2 border rounded-md"
                placeholder="Portfolio / LinkedIn URL"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
