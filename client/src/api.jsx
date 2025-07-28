export const API_BASE = import.meta.env.VITE_API_URL;

export const googleAuth = async (userData) => {
  try {
    const response = await fetch(`${API_BASE}/api/auth/google-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) throw new Error("Server Error");
    return await response.json();
  } catch (error) {
    console.error("Google Authentication Error:", error);
    throw error;
  }
};

