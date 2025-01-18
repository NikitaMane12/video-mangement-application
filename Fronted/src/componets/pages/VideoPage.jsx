import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./video.css";

const VideosPage = () => {
  const [videoData, setVideoData] = useState([]);
  const navigate = useNavigate(); // React Router's navigation hook

  useEffect(() => {
    const storedVideos = JSON.parse(localStorage.getItem("videos")) || [];
    setVideoData(storedVideos);
  }, []);

  const handleCardClick = (video) => {
    navigate("/VideoPlayer", { state: { video } }); // Navigate with state
  };

  return (
    <div>
      <h1>Uploaded Videos</h1>
      <div className="video-cards">
        {videoData.map((video, index) => (
          <div
            key={index}
            className="video-card"
            onClick={() => handleCardClick(video)} // On card click
          >
            <h4>{video.title}</h4>
            <p>{video.description}</p>
            <p>
              <strong>Tags:</strong> {video.tags}
            </p>
            <video
              src={video.videoPreview}
              controls
              style={{ height: "150px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideosPage;
