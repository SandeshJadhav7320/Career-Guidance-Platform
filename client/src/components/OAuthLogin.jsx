import React, { useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../api";

const OAuthLogin = () => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const accessToken = tokenResponse.access_token;
        console.log("✅ OAuth Success:", tokenResponse);

        // Fetch user profile from Google API using access token
        const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const profile = await res.json();
        console.log("👤 Google Profile:", profile);

        // Prepare user data to send to backend
        const userData = {
          googleId: profile.sub,
          email: profile.email,
          name: profile.name,
          image: profile.picture,
        };

        // Send user data to backend
        const backendUser = await googleAuth(userData);
        console.log("📡 Backend Response:", backendUser);

        // Store backend response (user data) in localStorage
        localStorage.setItem("user-info", JSON.stringify(backendUser));
        console.log("💾 Stored in localStorage:", backendUser);

        // Redirect to dashboard
        window.location.href = "/dashboard";
      } catch (error) {
        console.error("❌ Login or backend communication failed:", error);
      }
    },
    onError: () => console.error("❌ Google login failed"),
  });

  useEffect(() => {
    login(); // Trigger Google login on component mount
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Logging in...</h1>
    </div>
  );
};

export default OAuthLogin;
