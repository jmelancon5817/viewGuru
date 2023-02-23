import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const LandingPage = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLoginSuccess = (response) => {
    //decode response data
    const decoded = jwt_decode(response.credential);

    //Save the user's data to the server
    axios.post("/register", { profileObj: decoded }).then((res) => {
      const user = res.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      console.log(localStorage);
      setIsLoggedIn(true);
      navigate("/dashboard");
    });
  };

  const handleLoginFailure = (error) => {
    console.log(error);
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="landing-page">
        <div className="landing-header">
          <h1>Welcome to Shift</h1>
        </div>
        <br></br>
        <br></br>
        <ul>
          <li>
            <p>
              Shift is a tool that allows you to optimize your YouTube video
              thumbnails based on your video's view count metrics.
            </p>
          </li>
          <li>
            <p>
              With Shift, you can easily track your video views, and update your
              video thumbnails for maximum engagement and visibility.{" "}
            </p>
          </li>
        </ul>
        <p>Sign in with your google account to get started. </p>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Sign in with Google"
          onSuccess={handleLoginSuccess}
          onFailure={handleLoginFailure}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default LandingPage;
