import React from "react";
import { useLocation } from "react-router-dom";

const VideoPlayer = () => {
  const location = useLocation();
  const { video } = location.state;

  return (
    <div>
      <h1>Video Details</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "400px" }}>
          <h4>{video.title}</h4>
          <p>{video.description}</p>
          <p>
            <strong>Tags:</strong> {video.tags}
          </p>
        </div>
        <div>
          <video
            src={video.videoPreview}
            controls
            style={{ height: "300px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
