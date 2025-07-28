import React, { useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../api";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL;

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user-info");
    if (user) navigate("/dashboard");
  }, [navigate]);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const accessToken = tokenResponse.access_token;

        const res = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const profile = await res.json();

        const userData = {
          googleId: profile.sub,
          email: profile.email,
          name: profile.name,
          image: profile.picture,
        };

        const backendResponse = await googleAuth(userData);
        localStorage.setItem("user-info", JSON.stringify(backendResponse));
        window.location.href = "/dashboard";
      } catch (error) {
        console.error("❌ Login or backend communication failed:", error);
      }
    },
    onError: () => console.error("❌ Google login failed"),
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
    >
      {/* NAVBAR */}
      <motion.nav
        className="bg-gray-100 shadow-md py-4 px-6 flex items-center justify-between"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center">
          <img
            src={careerSymbol}
            alt="Career Guide AI Logo"
            className="w-15 h-auto rounded-md shadow-lg bg-gray-100"
          />
        </div>
        <motion.button
          onClick={() => googleLogin()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-5 py-2 rounded-md shadow-md hover:shadow-lg transition duration-300"
        >
          <FaSignInAlt /> Log In
        </motion.button>
      </motion.nav>

      {/* HERO */}
      <motion.section
        className="flex flex-col md:flex-row items-center px-6 py-16 bg-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-bold text-gray-800 mb-6 leading-tight min-h-[130px]">
            <Typewriter
              options={{
                strings: [
                  "Discover Your Perfect Career Path with AI",
                  "Discover roadmap  ",
                  "Shape Your Future Smartly with AI",
                  "Connect with Mentors"
                ],
                autoStart: true,
                loop: true,
                delay: 50,
              }}
            />
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Take the smart career assessment and find jobs and mentors aligned with your future.
          </p>
          <motion.button
            onClick={() => googleLogin()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:shadow-xl transition duration-300"
          >
            Get Started
          </motion.button>
        </motion.div>

        <motion.div
          className="md:w-1/2"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.img
            src={heroImage}
            alt="AI Career Guidance"
            className="w-full h-auto rounded-md shadow-xl"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
          />
        </motion.div>
      </motion.section>

      {/* WHY CHOOSE SECTION */}
      <motion.section
        className="py-16 bg-gray-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Why Choose CareerGuide AI?</h2>
          <p className="text-gray-600 text-lg mb-12">
            Get personalized career insights powered by AI assessments.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[FaQuestionCircle, FaBrain, FaUsers].map((Icon, index) => (
              <motion.div
                key={index}
                className="p-8 bg-gray-100 rounded-xl shadow-md hover:shadow-lg transition"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Icon className="text-blue-600 text-5xl mb-4 mx-auto" />
                <h3 className="text-2xl font-semibold text-blue-600 mb-2">
                  {["Smart Career Assessment", "Job Recommendations", "Expert Mentorship"][index]}
                </h3>
                <p className="text-gray-600">
                  {
                    [
                      "AI analyzes your skills and interests to suggest ideal career paths.",
                      "Find job opportunities that match your strengths and ambitions.",
                      "Connect with mentors who guide your career growth.",
                    ][index]
                  }
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CONTACT FORM */}
      <motion.section
        className="py-16 bg-gray-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Contact Us</h2>
          <p className="text-gray-600 text-lg mb-12">Have questions? Feel free to reach out!</p>
          <form className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md">
            <input type="text" placeholder="Your Name" className="w-full p-3 mb-6 border rounded-md" required />
            <input type="email" placeholder="Your Email" className="w-full p-3 mb-6 border rounded-md" required />
            <textarea placeholder="Your Message" className="w-full p-3 mb-6 border rounded-md" rows="4" required></textarea>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </motion.section>

      {/* FOOTER */}
      <motion.footer
        className="bg-gray-900 text-white py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
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
      </motion.footer>
    </motion.div>
  );
};

export default LandingPage;


