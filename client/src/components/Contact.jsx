import React from "react";

const Contact = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-screen-lg mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>
        <p className="text-gray-600 mb-8">Have questions? Feel free to reach out!</p>

        <form className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <input type="text" placeholder="Your Name" className="w-full p-3 mb-4 border rounded-md" required />
          <input type="email" placeholder="Your Email" className="w-full p-3 mb-4 border rounded-md" required />
          <textarea placeholder="Your Message" className="w-full p-3 mb-4 border rounded-md" rows="4" required></textarea>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
