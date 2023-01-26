import React, { useState, useEffect } from "react";
import axios from "axios";
import { Gallery } from "react-grid-gallery";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import Process from "./process";
import Upload from "./upload";

const Optimize = () => {
  const location = useLocation();
  const selectedVideo = location.state.selectedVideo;
  const [currentThumbnail, setCurrentThumbnail] = useState(
    selectedVideo.snippet.thumbnails.medium.url
  );
  const [alternateThumbnails, setAlternateThumbnails] = useState([]);
  const [updateThumbnail, setUpdateThumbnail] = useState(false);

  const [isRunning, setIsRunning] = useState(false);

  const handleChange = (e) => {
    const files = e.target.files;
    const thumbnails = [...alternateThumbnails];
    for (let i = 0; i < files.length; i++) {
      thumbnails.push(URL.createObjectURL(files[i]));
    }
    setAlternateThumbnails(thumbnails);
  };

  const handleSubmit = () => {
    setUpdateThumbnail(true);
    setIsRunning(true);
  };

  const handleCancel = () => {
    // Stop Optimization
    setIsRunning(false);
  };

  useEffect(() => {
    if (updateThumbnail) {
      // Use the YouTube API to track view count of the video over time
      // and determine which alternate thumbnail to use
    }
  }, [updateThumbnail]);

  return (
    <div className="optimize-container">
      {isRunning ? (
        <Process
          handleCancel={handleCancel}
          alternateThumbnails={alternateThumbnails}
        />
      ) : (
        <Upload handleSubmit={handleSubmit} handleChange={handleChange} />
      )}
    </div>
  );
};

export default Optimize;
