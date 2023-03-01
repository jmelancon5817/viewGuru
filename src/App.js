import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import LandingPage from "./components/landingPage";
import Dashboard from "./components/dashboard";
import Optimize from "./components/optimize";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [processedVideos, setProcessedVideos] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/landingPage"
            element={<LandingPage setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="dashboard"
            element={
              <Dashboard
                setIsLoggedIn={setIsLoggedIn}
                processedVideos={processedVideos}
              />
            }
          />
          <Route
            path="optimize"
            element={
              <Optimize
                setProcessedVideos={setProcessedVideos}
                processedVideos={processedVideos}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
