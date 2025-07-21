import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import OAuthLogin from "./components/OAuthLogin";
import Dashboard from "./components/Dashboard";
import Profile from "./Dashboard_Components/Profile";
import CarrerSelection from './Dashboard_Components/CarrerSelection';
import AgricultureTest from "./assessment/AgricultureAssessment";
import CareerPathPage from "./Dashboard_Components/CareerPathPage";
import Technical from "./assessment/TechnicalAssesment";
import Government from "./assessment/GovernmentAssesment";
import BankingAssesment from "./assessment/BankingAssesment";
import AdministrativeAssesment from "./assessment/AdministrativeAssesment";
import CarrerPathDetails from "./components/CarrerPathDetail";
import SelectedCarrerPath from "./components/SelectedCarrerPath"

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
          <Route path="/agriculture" element={<AgricultureTest />} />
          <Route path="/careerpathpage" element={<CareerPathPage />} />
          <Route path="/technical" element={<Technical />} />
          <Route path="/government" element={<Government />} />
          <Route path="/banking" element={<BankingAssesment />} />
          <Route path="/administrative" element={<AdministrativeAssesment />} />
          <Route path="/carrerpathdetail" element={<CarrerPathDetails />} />
          <Route path="/selectedcarrerpath" element={<SelectedCarrerPath />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
