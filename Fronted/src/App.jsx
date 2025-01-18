import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./componets/Navbar";
import Home from "./componets/pages/Home";
import UploadVideo from "./componets/video/Uploadvideo";
import Login from "./componets/auth/Login";
import Register from "./componets/auth/Register";
import VideosPage from "./componets/pages/VideoPage";
import VideoPlayer from "./componets/pages/VideoPlayer";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/UploadVideo" element={<UploadVideo />} />
        <Route path="/Login" element={<Login />} />
        <Route path="Register" element={<Register />} />
        <Route path="/VideoPage" element={<VideosPage />} />
        <Route path="/VideoPlayer" element={<VideoPlayer />} />
      </Routes>
    </Router>
  );
};

export default App;
