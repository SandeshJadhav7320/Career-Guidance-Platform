import React from "react";

const steps = ["Create your free account", "Take the career assessment test", "Receive career suggestions"];

const HowItWorks = () => {
  return (
    <section className="py-12 px-6 md:px-20 text-center">
      <h2 className="text-3xl font-bold mb-8">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="p-6 bg-gray-100 rounded-md shadow-md">
            <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center">
              {index + 1}
            </div>
            <p className="font-semibold">{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
