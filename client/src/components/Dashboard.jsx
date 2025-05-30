import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user-info");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user info from localStorage:", error);
      }
    }
  }, []);

  if (!user) {
    return <div>Loading user information...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Welcome, {user.name}!</h1>
    </div>
  );
};

export default Dashboard;
