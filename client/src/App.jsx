import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import OAuthLogin from "./components/OAuthLogin";
import Dashboard from "./components/Dashboard";
import Profile from "./Dashboard_Components/Profile";
const App = () => {
  return (
    <GoogleOAuthProvider clientId="1037825352287-5kabpoiujd5skjckrvna25qjdsv5evrj.apps.googleusercontent.com">
      <Router>
        <Routes>
         <Route path="/" element={<LandingPage />} />
         <Route path="/oauth-login" element={<OAuthLogin />} />
         <Route path="/Dashboard" element={<Dashboard />} />
         <Route path="/profilepage" element={<Profile />} />

       </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
