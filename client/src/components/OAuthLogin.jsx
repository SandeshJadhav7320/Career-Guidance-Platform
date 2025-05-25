import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { googleAuth } from "../api";

const OAuthLogin = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Log in to CareerGuide</h1>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          console.log("OAuth Success:", credentialResponse); // Debugging step

          if (credentialResponse.credential) {
            const decodedUser = jwtDecode(credentialResponse.credential);
            console.log("Decoded User:", decodedUser);

            // Create `userData` object correctly
            const userData = {
              googleId: decodedUser.sub,
              email: decodedUser.email,
              name: decodedUser.name,
              image: decodedUser.picture,
            };

            console.log("Sending Data to Backend:", userData); // Debugging step

            // Send userData to backend
            const response = await googleAuth(userData);

            console.log("Backend Response:", response);
            localStorage.setItem("user-info", JSON.stringify(response));
            window.location.href = "/dashboard"; // Redirect after login
          }
        }}
        onError={() => console.error("Login Failed")}
      />
    </div>
  );
};

export default OAuthLogin;
