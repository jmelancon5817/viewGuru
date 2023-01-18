import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";

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
    <div className="landing-page">
      <h1>Welcome to ViewGuru</h1>
      <p>
        ViewGuru is a tool that allows you to optimize your YouTube video
        thumbnails based on your video's view count metrics.
      </p>
      {isLoggedIn ? (
        <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
      ) : (
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Sign in with Google"
          onSuccess={handleLoginSuccess}
          onFailure={handleLoginFailure}
        />
      )}
    </div>
  );
};

export default LandingPage;
