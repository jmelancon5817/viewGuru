import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Dashboard = ({ setIsLoggedIn }) => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("recent");
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the top 10 trending videos from YouTubes's API
    axios
      .get("https://www.googleapis.com/youtube/v3/videos", {
        params: {
          part: "snippet, statistics",
          chart: "mostPopular",
          maxResults: 20,
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

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(videos.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(videos.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, videos]);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    navigate("/optimize", { state: { selectedVideo: video } });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    // Filter the videos based on the search query
    const filteredVideos = videos.filter((video) => {
      return video.snippet.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
    setVideos(filteredVideos);
  };

  const handleSort = (event) => {
    setSortType(event.target.value);
    let sortedVideos;
    if (event.target.value === "recent") {
      sortedVideos = videos.sort((a, b) => {
        return (
          new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt)
        );
      });
    } else if (event.target.value === "highest-views") {
      sortedVideos = videos.sort((a, b) => {
        return b.statistics.viewCount - a.statistics.viewCount;
      });
    } else if (event.target.value === "lowest-views") {
      sortedVideos = videos.sort((a, b) => {
        return a.statistics.viewCount - b.statistics.viewCount;
      });
    }
    setVideos(sortedVideos);
    setCurrentItems(sortedVideos);
  };

  const formatViews = (views) => {
    if (views >= 1e12) {
      return `${(views / 1e12).toFixed(2)}T`;
    } else if (views >= 1e9) {
      return `${(views / 1e9).toFixed(2)}B`;
    } else if (views >= 1e6) {
      return `${(views / 1e6).toFixed(2)}M`;
    } else if (views >= 1e3) {
      return `${(views / 1e3).toFixed(2)}K`;
    } else {
      return views;
    }
  };

  const formatLikes = (likes) => {
    if (likes >= 1e12) {
      return `${(likes / 1e12).toFixed(2)}T`;
    } else if (likes >= 1e9) {
      return `${(likes / 1e9).toFixed(2)}B`;
    } else if (likes >= 1e6) {
      return `${(likes / 1e6).toFixed(2)}M`;
    } else if (likes >= 1e3) {
      return `${(likes / 1e3).toFixed(2)}K`;
    } else {
      return likes;
    }
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % videos.length;
    setItemOffset(newOffset);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      navigate("/landingPage");
    } catch (error) {
      handleLogoutFailure(error);
    }
  };

  const handleLogoutFailure = (error) => {
    console.log(error);
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="dashboard">
        <h1>Welcome to your Dashboard</h1>
        <p>Select a video to optimize</p>
        <div className="search-container search-bar">
          <input
            className="search-bar-input"
            type="text"
            placeholder="Search"
            onChange={handleSearchChange}
          />
          <button className="search-bar button" onClick={handleSearchSubmit}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <div className="sort-container">
          <label>Sort by: </label>
          <select value={sortType} onChange={handleSort}>
            <option value="recent">Most Recent</option>
            <option value="highest-views">Highest Views</option>
            <option value="lowest-views">Lowest Views</option>
          </select>
        </div>
        <div className="video-list">
          {currentItems.map((video) => (
            <div className="video-list-item" key={video.id}>
              <div className="flex-container">
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                />
                <div className="item-metrics">
                  <p className="video-title">{video.snippet.title}</p>
                  <p className="video-stats">
                    Views: {formatViews(video.statistics.viewCount)}
                  </p>
                  <p className="video-stats">
                    Likes: {formatLikes(video.statistics.likeCount)}
                  </p>
                  <button
                    onClick={() => {
                      handleVideoSelect(video);
                    }}
                    className="video-select"
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {
          <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            pageLinkClassName={"page-num"}
            previousLinkClassName={"page-num"}
            nextLinkClassName={"page-num"}
            activeLinkClassName={"active"}
            renderOnZeroPageCount={null}
          />
        }

        {
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        }
      </div>
    </GoogleOAuthProvider>
  );
};

export default Dashboard;
