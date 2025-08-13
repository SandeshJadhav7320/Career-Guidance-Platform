import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Mail, User, LogOut } from "lucide-react";
import Dashboard_Navbar from "../Dashboard_Components/Dashboard_Navbar";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const defaultAvatar = "https://www.svgrepo.com/show/105517/user-icon.svg";

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

      fetch(`https://career-guidance-platform.onrender.com/api/users/${parsedUser.email}`)
        .then(res => {
          if (!res.ok) {
            // Don't parse empty body
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.text(); // read raw text first
        })
        .then(text => text ? JSON.parse(text) : null) // only parse JSON if not empty
        .then(data => {
          if (data) {
            setUser(data);
            setFormData(data);
            localStorage.setItem("user-info", JSON.stringify(data));
          }
        })
        .catch(err => console.error("Error fetching user:", err));
    } catch (error) {
      console.error("Error parsing user info:", error);
    }
  }
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

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedUser = { ...user, avatar: reader.result };
        setUser(updatedUser);
        setFormData(prev => ({ ...prev, avatar: reader.result }));
        localStorage.setItem("user-info", JSON.stringify(updatedUser));
      };
      reader.readAsDataURL(file);
    }
  };

const handleSaveChanges = async () => {
  if (!user?.email) {
    alert("Email not loaded yet. Please try again.");
    return;
  }

  const updatedData = {
    email: user.email, // required for backend update
    name: formData.name,
    bio: formData.bio,
    education: formData.education,
    portfolio: formData.portfolio
  };

  try {
    const response = await fetch("https://career-guidance-platform.onrender.com/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const savedUser = await response.json();
    setUser(savedUser);
    localStorage.setItem("user-info", JSON.stringify(savedUser));
    setEditModal(false);
  } catch (error) {
    console.error("Error saving user:", error);
    alert("Failed to save changes. Please try again.");
  }
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
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-200 py-12 px-4">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-500 mt-1">Manage your personal info</p>
        </div>

        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl p-8 space-y-6 text-center">
          <div className="flex flex-col items-center space-y-3">
            <div className="relative group">
              <img
                src={user.avatar || defaultAvatar}
                alt="User Avatar"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg transition duration-300 hover:scale-105"
              />
              <input
                type="file"
                accept="image/*"
                id="avatarUpload"
                className="hidden"
                onChange={handleAvatarUpload}
              />
              <div
                className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition"
                title="Change Profile Picture"
                onClick={() => document.getElementById("avatarUpload").click()}
              >
                <User size={18} className="text-gray-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-500 italic">{user.bio || "Tell us about yourself."}</p>
            <p>
              <span className="font-semibold text-gray-700">Education:</span>{" "}
              {user.education || "Not added yet"}
            </p>
            <p>
              <span className="font-semibold text-gray-700">Portfolio:</span>{" "}
              {user.portfolio ? (
                <a
                  href={user.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {user.portfolio}
                </a>
              ) : "Not added yet"}
            </p>
          </div>

          <div className="text-gray-600 flex items-center justify-center gap-2 text-sm">
            <Mail size={18} />
            <span>{user.email}</span>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => setEditModal(true)}
              className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md transition"
            >
              <Pencil size={18} />
              Edit Profile
            </button>
            <button
              onClick={() => setShowLogoutModal(true)}
              className="flex items-center gap-2 px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-md transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* 🔐 Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-80 text-center space-y-4 animate-fade-in">
            <h2 className="text-xl font-bold text-gray-800">Confirm Logout</h2>
            <p className="text-gray-600">Are you sure you want to log out?</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✏️ Edit Profile Modal */}
      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg space-y-4 animate-fade-in">
            <h2 className="text-xl font-bold text-gray-800">Edit Your Info</h2>
            <div className="grid grid-cols-1 gap-4">
              <input name="name" value={formData.name || ""} onChange={handleChange} className="px-3 py-2 border rounded-md" placeholder="Full Name" />
              <textarea name="bio" value={formData.bio || ""} onChange={handleChange} className="px-3 py-2 border rounded-md" placeholder="Short Bio" />
              <input name="education" value={formData.education || ""} onChange={handleChange} className="px-3 py-2 border rounded-md" placeholder="Education" />
              <input name="portfolio" value={formData.portfolio || ""} onChange={handleChange} className="px-3 py-2 border rounded-md" placeholder="Portfolio / LinkedIn URL" />
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
