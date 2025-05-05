import React from "react";
import { FaBullseye, FaBriefcase, FaBook, FaHandshake } from "react-icons/fa";

const features = [
  { icon: <FaBullseye />, title: "Career Assessment", description: "Take the smart career assessment." },
  { icon: <FaBriefcase />, title: "Job Matching", description: "Find your ideal job opportunities." },
  { icon: <FaBook />, title: "Learning Path", description: "Guide through professional development." },
  { icon: <FaHandshake />, title: "Mentorship Support", description: "Connect with experienced mentors." }
];

const Features = () => {
  return (
    <section className="bg-gray-50 py-12 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        {features.map((feature, index) => (
          <div key={index} className="p-6 bg-white shadow-md rounded-md">
            <div className="text-3xl text-blue-600">{feature.icon}</div>
            <h3 className="font-bold text-lg mt-2">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
