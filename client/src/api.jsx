export const googleAuth = async (userData) => {
  try {
    const response = await fetch("http://localhost:8080/api/auth/google-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData), // Ensure userData is passed
    });

    if (!response.ok) throw new Error("Server Error");
    return await response.json();
  } catch (error) {
    console.error("Google Authentication Error:", error);
    throw error;
  }
};

