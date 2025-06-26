import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Dashboard_Navbar from "../Dashboard_Components/Dashboard_Navbar";

const CareerPathDetail = () => {
  const location = useLocation();
  const { title, prompt } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!prompt) return;

    const fetchAIResponse = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.post(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            model: "mistralai/mixtral-8x7b", // or "openai/gpt-4", etc.
            messages: [
              {
                role: "user",
                content: prompt,
              },
            ],
          },
          {
            headers: {
              Authorization: "Bearer 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",
              "Content-Type": "application/json",
              "HTTP-Referer": "http://localhost:3000", // or your domain
              "X-Title": "Career Path Info",
            },
          }
        );

        const content = response.data.choices[0].message.content;
        setAiResponse(content);
      } catch (err) {
        console.error(err);
        setError("Failed to load AI content.");
      } finally {
        setLoading(false);
      }
    };

    fetchAIResponse();
  }, [prompt]);

  return (
    <>
      <Dashboard_Navbar />

      <div className="min-h-screen bg-white px-6 py-10">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
          {title}
        </h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading AI info...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-4xl mx-auto space-y-4 whitespace-pre-wrap text-gray-800">
            {aiResponse}
          </div>
        )}
      </div>
    </>
  );
};

export default CareerPathDetail;
