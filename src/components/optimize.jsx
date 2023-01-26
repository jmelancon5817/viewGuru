import React, { useState, useEffect } from "react";
import axios from "axios";
import { Gallery } from "react-grid-gallery";
import { useNavigate, useLocation } from "react-router-dom";

const Optimize = () => {
  const location = useLocation();
  const selectedVideo = location.state.selectedVideo;

  const [currentThumbnail, setCurrentThumbnail] = useState(
    selectedVideo.snippet.thumbnails.medium.url
  );
  const [alternateThumbnails, setAlternateThumbnails] = useState([]);
  const [updateThumbnail, setUpdateThumbnail] = useState(false);

  const handleChange = (e) => {
    const files = e.target.files;
    const thumbnails = [...alternateThumbnails];
    for (let i = 0; i < files.length; i++) {
      thumbnails.push(URL.createObjectURL(files[i]));
    }
    setAlternateThumbnails(thumbnails);
  };

  const handleUpdate = () => {
    setUpdateThumbnail(true);
  };

  const handleCancel = () => {
    // Stop Optimization
  };

  useEffect(() => {
    if (updateThumbnail) {
      // Use the YouTube API to track view count of the video over time
      // and determine which alternate thumbnail to use
    }
  }, [updateThumbnail]);

  return (
    <div className="optimize-container">
      <h1>Initialize Optimization</h1>
      <div className="current">
        <p>Current Thumbnail:</p>
        <img
          src={currentThumbnail}
          alt={selectedVideo.snippet.title}
          className="current-thumbnail"
        />
      </div>
      <div>
        <p className="alternate-heading">Alternate Thumbnails:</p>
        <div className="optimize-gallery">
          <input
            type="file"
            multiple
            onChange={handleChange}
            className="optimize-input"
          />
          <Gallery
            images={alternateThumbnails.map((thumbnail) => ({
              src: thumbnail,
            }))}
            margin={12}
            rowHeight={300}
          />
        </div>
      </div>
      <div className="optimize-buttons">
        <button onClick={handleUpdate}>Submit</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default Optimize;
