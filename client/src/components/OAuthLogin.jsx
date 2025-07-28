import React, { useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../api";
import { useNavigate } from "react-router-dom";

const OAuthLogin = () => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    async onSuccess(tokenResponse) {
      try {
        const accessToken = tokenResponse.access_token;
        console.log("✅ OAuth Success:", tokenResponse);

        // 1️⃣ Fetch profile from Google
        const profileRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const profile = await profileRes.json();
        console.log("👤 Google Profile:", profile);

        // 2️⃣ Send profile to backend
        const res = await googleAuth({
          googleId: profile.sub,
          email: profile.email,
          name: profile.name,
          image: profile.picture,
        });

        const backendUser = res?.data ?? res;
        console.log("📡 Backend Response:", backendUser);

        // 3️⃣ Extract user ID
        const userId = backendUser.id || backendUser._id;

        if (userId) {
          localStorage.setItem("user-id", userId);
          console.log("🆔 Stored user-id:", userId);
        } else {
          console.warn("⚠️ No user ID found in backend response.");
        }

        // 4️⃣ Save full user object
        localStorage.setItem("user-info", JSON.stringify(backendUser));

        // ✅ Log from full object
        console.log("✅ User ID from backend object:", backendUser.id);

        // 5️⃣ Navigate
        navigate("/dashboard", { replace: true });
      } catch (error) {
        console.error("❌ Login or backend communication failed:", error);
      }
    },
    onError: () => {
      console.error("❌ Google login failed");
    },
  });

  // 🔄 On component mount, launch login popup
  useEffect(() => {
    login();
  }, [login]);

  // 📦 Log user ID from localStorage on reload
  useEffect(() => {
    const userInfoRaw = localStorage.getItem("user-info");
    const userId = localStorage.getItem("user-id");

    if (userId) {
      console.log("🔁 Retrieved user-id from localStorage:", userId);
    } else if (userInfoRaw) {
      try {
        const userInfo = JSON.parse(userInfoRaw);
        console.log("🔁 Retrieved user-id from user-info:", userInfo.id);
      } catch (err) {
        console.warn("⚠️ Failed to parse user-info from localStorage");
      }
    } else {
      console.warn("⚠️ No user-id or user-info found in localStorage");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Logging in...</h1>
      <p className="text-gray-500">Check the console for your user ID…</p>
    </div>
  );
};

export default OAuthLogin;


