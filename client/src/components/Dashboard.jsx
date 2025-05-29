import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard_Navbar from "../Dashboard_Components/Dashboard_Navbar";

const Dashboard = () => {

    const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user-info");
    if (!user) {
      navigate("/"); // ✅ Redirect unauthorized users to Homepage
    }
  }, [navigate]);
    return (
        <>
        <Dashboard_Navbar/>
        </>
    );
};

export default Dashboard;
