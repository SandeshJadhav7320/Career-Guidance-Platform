export const googleAuth = async (accessToken) => {
  try {
    const response = await fetch("http://localhost:8080/api/auth/google-login", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}` // ✅ Send the token properly
      },
      body: JSON.stringify({ token: accessToken }) // ✅ Ensure correct format
    });

    if (!response.ok) throw new Error("Server Error");
    return await response.json();
  } catch (error) {
    console.error("Google Authentication Error:", error);
    throw error;
  }
};
