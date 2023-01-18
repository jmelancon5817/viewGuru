import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    // Fetch the user's videos from YouTube's API
    axios
      .get("https://www.googleapis.com/youtube/v3/videos", {
        params: {
          part: "snippet",
          mine: true,
          key: process.env.REACT_APP_YOUTUBE_API_KEY,
        },
      })
      .then((response) => {
        setVideos(response.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="dashboard">
      <h1>Welcome to your Dashboard</h1>
      <p>Select a video to optimize</p>
      <div className="video-list">
        {videos.map((video) => (
          <div
            className="video-list-item"
            key={video.id}
            onClick={() => handleVideoSelect(video)}
          >
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
            />
            <p>{video.snippet.title}</p>
          </div>
        ))}
      </div>
      {selectedVideo && (
        <div className="selected-video">
          <h2>{selectedVideo.snippet.title}</h2>
          <img
            src={selectedVideo.snippet.thumbnails.high.url}
            alt={selectedVideo.snippet.title}
          />
          <button>Optimize Thumbnail</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
