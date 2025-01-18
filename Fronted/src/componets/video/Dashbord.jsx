import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/videos", {
        headers: { Authorization: token },
      });
      setVideos(res.data);
    };
    fetchVideos();
  }, []);

  return (
    <div>
      <h2>Video Dashboard</h2>
      {videos.map((video) => (
        <div key={video._id}>
          <h3>{video.title}</h3>
          <p>{video.url}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
