import React, { useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { googleAuth } from "../api";

const OAuthLogin = () => {
  const login = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      console.log("OAuth Success:", credentialResponse);

      const decodedUser = jwtDecode(credentialResponse.access_token);
      console.log("Decoded User:", decodedUser);

      const userData = {
        googleId: decodedUser.sub,
        email: decodedUser.email,
        name: decodedUser.name,
        image: decodedUser.picture,
      };

      console.log("Sending Data to Backend:", userData);
      await googleAuth(userData);

      localStorage.setItem("user-info", JSON.stringify(userData));
      window.location.href = "/dashboard"; // Redirect after login
    },
    onError: () => console.error("Login Failed"),
  });

  useEffect(() => {
    login(); // ✅ Auto-triggers Google login when the page loads
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Logging in...</h1>
    </div>
  );
};

export default OAuthLogin;
