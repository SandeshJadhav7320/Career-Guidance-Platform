import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import OAuthLogin from "./components/OAuthLogin";
import Dashboard from "./components/Dashboard";
import Profile from "./Dashboard_Components/Profile";
import CarrerSelection from './Dashboard_Components/CarrerSelection';

const App = () => {
  return (
    <GoogleOAuthProvider clientId="1037825352287-5kabpoiujd5skjckrvna25qjdsv5evrj.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/oauth-login" element={<OAuthLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profilepage" element={<Profile />} />
          <Route path="/CarrerSelection" element={<CarrerSelection />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
