import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = (response) => {
    // Save the user's data and set the login status to true
    localStorage.setItem("user", JSON.stringify(response.profileObj));
    setIsLoggedIn(true);
    navigate("/dashboard");
  };

  const handleLoginFailure = (error) => {
    console.log(error);
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="landing-page">
        <div className="landing-header">
          <h1>Welcome to ViewGuru</h1>
        </div>

        <br></br>
        <br></br>
        <ul>
          <li>
            <p>
              Thrive is a tool that allows you to optimize your YouTube video
              thumbnails based on your video's view count metrics.
            </p>
          </li>
          <li>
            <p>
              With Thrive, you can easily track your video views, and update
              your video thumbnails for maximum engagement and visibility.{" "}
            </p>
          </li>
        </ul>
        <p>Sign in with your google account to get started. </p>
        {isLoggedIn ? (
          <button onClick={() => navigate("/dashboard")}>
            Go to Dashboard
          </button>
        ) : (
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Sign in with Google"
            onSuccess={handleLoginSuccess}
            onFailure={handleLoginFailure}
          />
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default LandingPage;
