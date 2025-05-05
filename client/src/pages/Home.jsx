import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";

const Home = () => {
  return (
    
    <div>
      <div className="bg-green-1000 text-red p-1 text-center">
  🔥 Tailwind test box! If red, Tailwind is working.
</div>
      <Navbar />
      <HeroSection />
      <Features />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Home;
