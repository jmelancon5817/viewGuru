import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Process from "./process";
import Upload from "./upload";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Optimize = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedVideo = location.state.selectedVideo;
  const [currentThumbnail, setCurrentThumbnail] = useState(
    selectedVideo.snippet.thumbnails.medium.url
  );
  const [alternateThumbnails, setAlternateThumbnails] = useState([]);
  const [updateThumbnail, setUpdateThumbnail] = useState(false);

  const [isRunning, setIsRunning] = useState(false);

  const [thumbnailIDs, setThumbnailIDs] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;

  const handleChange = (e) => {
    const files = e.target.files;
    const thumbnails = [...alternateThumbnails];
    for (let i = 0; i < files.length; i++) {
      thumbnails.push(URL.createObjectURL(files[i]));
    }
    setAlternateThumbnails(thumbnails);
  };

  const handleSubmit = async () => {
    setUpdateThumbnail(true);
    setIsRunning(true);

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    console.log(userId);

    const image1 = alternateThumbnails[0];
    const image2 = alternateThumbnails[1];
    const formData = new FormData();
    formData.append("image1", image1);
    formData.append("image2", image2);

    try {
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      // console.log(formData);
      const response = await axios.post(
        `/api/users/${userId}/thumbnails`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const thumbnailIds = response.data.thumbnailIds;

      setThumbnailIDs(thumbnailIds);

      props.setProcessedVideos([...props.processedVideos, selectedVideo.id]);

      console.log("Thumbnails uploaded successfully!");
      alert("Thumbnails uploaded successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (thumbnailId) => {
    try {
      const userId = JSON.parse(localStorage.getItem("user"))._id;

      await axios.delete(`/api/users/${userId}/thumbnails/${thumbnailId}`);

      console.log("Thumbnail deleted successfully!");
      alert("Thumbnail deleted successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    // Stop Optimization
    setIsRunning(false);
  };

  const goToDashboard = () => {
    navigate("/dashboard");
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
          goToDashboard={goToDashboard}
        />
      ) : (
        <Upload
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleDelete={handleDelete}
          thumbnailIDs={thumbnailIDs}
          alternateThumbnails={alternateThumbnails}
          goToDashboard={goToDashboard}
        />
      )}
    </div>
  );
};

export default Optimize;
