import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";

const Process = (props) => {
  const location = useLocation();
  const selectedVideo = location.state.selectedVideo;
  const [currentThumbnail, setCurrentThumbnail] = useState([]);
  const [alternateThumbnails, setAlternateThumbnails] = useState([]);
  const [updateThumbnail, setUpdateThumbnail] = useState([]);

  const [isRunning, setIsRunning] = useState(false);
  const [currentThumbnailIndex, setCurrentThumbnailIndex] = useState(0);

  // Implement change thumbnail function based on views/time accessed via Youtube API for selected video

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentThumbnailIndex((index) => (index + 1) % 3); // toggle between 0, 1, and 2
    }, 5000); // run every 5 seconds
    console.log(intervalId);
    console.log(props.allThumbnails);
    return () => clearInterval(intervalId);
  }, []);

  // render the component with the updated currentThumbnail state

  return (
    <div className="optimize-container">
      <h1>Running</h1>
      <div className="current">
        <p>Current Thumbnail:</p>
        <img
          src={props.allThumbnails[(currentThumbnailIndex + 3) % 3]}
          alt={selectedVideo.snippet.title}
          className="current-thumbnail"
        />
      </div>
      <FontAwesomeIcon icon={faSync} className="icon fa-10x fa-spin" />
      <div className="alternate-container">
        <div>
          <p className="alternate-heading">Alternate Thumbnail 1:</p>
          <div className="optimize-gallery">
            <div className="alternateImage">
              <img
                src={props.allThumbnails[(currentThumbnailIndex + 1) % 3]}
                alt="alternate1"
              />
            </div>
          </div>
        </div>

        <div>
          <p className="alternate-heading">Alternate Thumbnail 2:</p>
          <div className="optimize-gallery">
            <div className="alternateImage">
              <img
                src={props.allThumbnails[(currentThumbnailIndex + 2) % 3]}
                alt="alternate2"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="optimize-buttons">
        <button className="default-button" onClick={props.goToDashboard}>
          Dashboard
        </button>
        <button className="default-button" onClick={props.handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Process;
