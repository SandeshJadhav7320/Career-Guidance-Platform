import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";
import Contact from "../components/Contact";

function Home() {
  return (
    <div>
        <Navbar/>
      <HeroSection />
      <Features />
      <HowItWorks />
      <Contact />
      <Footer />
      
    </div>
  );
}

export default Home;
