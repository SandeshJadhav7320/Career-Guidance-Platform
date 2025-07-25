import React, { useState, useEffect } from "react";
import Dashboard_Navbar from "../Dashboard_Components/Dashboard_Navbar";
import dashboardImage from "../assets/dashboardimage.png";
import { FaMapMarkerAlt, FaBriefcase, FaHandshake } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const letterAnimation = {
  hidden: { y: 50, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.05 },
  }),
};

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
      <motion.div
        className="flex justify-center items-center h-screen text-gray-600 text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="w-12 h-12 border-4 border-blue-500 border-dotted rounded-full animate-spin"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        />
        <span className="ml-4">Loading user information...</span>
      </motion.div>
    );
  }

  const renderAnimatedText = (text) =>
    text.split("").map((letter, i) => (
      <motion.span key={i} custom={i} variants={letterAnimation} initial="hidden" animate="visible">
        {letter}
      </motion.span>
    ));

  return (
    <AnimatePresence>
      <motion.div
        className="min-h-screen bg-gray-100 flex flex-col"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.7 }}
      >
        <Dashboard_Navbar />

        {/* Main Section */}
        <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto py-16 px-6 md:px-10 gap-7">
          {/* Left Text */}
          <motion.div
            className="w-full md:w-1/2 text-left space-y-4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 flex flex-wrap">
              {renderAnimatedText(`Welcome, ${user.name}`)}
            </h1>
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Personalized Career Assessment
            </motion.h2>
            <motion.p
              className="text-xl text-gray-700 max-w-md"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Take our AI-powered assessment tailored to your strengths and interests to find your ideal career path.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-8 py-4 bg-blue-600 text-white text-xl rounded-md shadow hover:bg-blue-700 transition"
            >
              Start Assessment
            </motion.button>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.img
              src={dashboardImage}
              alt="AI Career Guidance"
              className="w-full max-w-md h-auto object-contain rounded-lg bg-gray-100 shadow-md"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
        </div>

        {/* Cards Section */}
        <motion.div
          className="max-w-5xl mx-auto py-10 px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center items-center">
            {[
              {
                icon: <FaMapMarkerAlt />,
                title: "Career Suggestions",
                desc1: "Discover careers that match your profile.",
                desc2: "Receive personalized recommendations based on your interests.",
              },
              {
                icon: <FaBriefcase />,
                title: "Find Jobs",
                desc1: "Explore available job opportunities.",
                desc2: "Apply to top companies and accelerate your career growth.",
              },
              {
                icon: <FaHandshake />,
                title: "Connect with Mentors",
                desc1: "Get guidance from industry professionals.",
                desc2: "Build meaningful connections and learn from experts.",
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 h-[300px] w-[270px] rounded-lg shadow-md flex flex-col items-center text-center hover:shadow-xl transition-all"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 24px rgba(0, 0, 255, 0.2)",
                }}
                transition={{ duration: 0.5 }}
              >
                <motion.div className="text-blue-600 text-7xl mb-10">
                  {card.icon}
                </motion.div>
                <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
                <p className="text-gray-600 text-sm">{card.desc1}</p>
                <p className="text-gray-500 text-sm">{card.desc2}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Dashboard;
