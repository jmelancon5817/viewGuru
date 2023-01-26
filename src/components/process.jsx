import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";

const Process = (props) => {
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

  useEffect(() => {
    if (updateThumbnail) {
      // Use the YouTube API to track view count of the video over time
      // and determine which alternate thumbnail to use
    }
  }, [updateThumbnail]);

  return (
    <div className="optimize-container">
      <h1>Running</h1>
      <div className="current">
        <p>Current Thumbnail:</p>
        <img
          src={currentThumbnail}
          alt={selectedVideo.snippet.title}
          className="current-thumbnail"
        />
      </div>
      <FontAwesomeIcon icon={faSync} className="icon fa-10x fa-spin" />
      <div className="alternate-container">
        <div>
          <p className="alternate-heading">Alternate Thumbnail 1:</p>
          <div className="optimize-gallery">
            <div className="alternateImage1">
              <input
                type="file"
                multiple
                onChange={handleChange}
                className="optimize-input"
              />
            </div>
          </div>
        </div>

        <div>
          <p className="alternate-heading">Alternate Thumbnail 2:</p>
          <div className="optimize-gallery">
            <div className="alternateImage1">
              <input
                type="file"
                multiple
                onChange={handleChange}
                className="optimize-input"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="optimize-buttons">
        <button onClick={props.handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default Process;
