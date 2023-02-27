import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const Upload = (props) => {
  const location = useLocation();
  const selectedVideo = location.state.selectedVideo;
  const [currentThumbnail, setCurrentThumbnail] = useState(
    selectedVideo.snippet.thumbnails.medium.url
  );
  const [updateThumbnail, setUpdateThumbnail] = useState(false);

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
      <FontAwesomeIcon icon={faSync} className="icon fa-10x" />
      <div className="alternate-container">
        <div>
          <p className="alternate-heading">Alternate Thumbnail 1:</p>
          <div className="optimize-gallery">
            {props.alternateThumbnails[0] ? (
              <div className="alternateImage">
                <img src={props.alternateThumbnails[0]} alt="alternate1" />
              </div>
            ) : (
              <div className="alternate-div">
                <FontAwesomeIcon icon={faImage} className="fa-10x image-icon" />
              </div>
            )}
          </div>

          {props.alternateThumbnails[0] ? (
            <button
              className="delete-button"
              onClick={() => props.handleDelete(props.thumbnailIDs[0])}
            >
              Remove File
            </button>
          ) : (
            <div className="alternateImage1">
              <input
                type="file"
                multiple
                onChange={props.handleChange}
                className="optimize-input"
              />
            </div>
          )}
        </div>

        <div>
          <p className="alternate-heading">Alternate Thumbnail 2:</p>
          <div className="optimize-gallery">
            {props.alternateThumbnails[1] ? (
              <div className="alternateImage">
                <img src={props.alternateThumbnails[1]} alt="alternate2" />
              </div>
            ) : (
              <div className="alternate-div">
                <FontAwesomeIcon icon={faImage} className="fa-10x image-icon" />
              </div>
            )}
          </div>
          {props.alternateThumbnails[1] ? (
            <button
              className="delete-button"
              onClick={() => props.handleDelete(props.thumbnailIDs[1])}
            >
              Remove File
            </button>
          ) : (
            <div className="alternateImage1">
              <input
                type="file"
                multiple
                onChange={props.handleChange}
                className="optimize-input"
              />
            </div>
          )}
        </div>
      </div>

      <div className="optimize-buttons">
        <button className="default-button" onClick={props.goToDashboard}>
          Dashboard
        </button>
        <button className="default-button" onClick={props.handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Upload;
