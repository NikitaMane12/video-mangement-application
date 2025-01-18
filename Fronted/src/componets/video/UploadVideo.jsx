import React, { useState } from "react";
import "./UploadVideo.css";

const UploadVideo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  // Handle video file selection and set preview
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file)); // Generate a preview URL
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!videoFile) {
      alert("Please select a video file");
      return;
    }

    // Create a new video data object
    const newVideo = {
      title,
      description,
      tags,
      videoFile,
      videoPreview,
    };

    // Store the new video in local storage
    const storedVideos = JSON.parse(localStorage.getItem("videos")) || [];
    storedVideos.push(newVideo);
    localStorage.setItem("videos", JSON.stringify(storedVideos));

    alert("Video uploaded successfully!");
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Upload Video</h1>
      <form onSubmit={handleSubmit} className="upload-form">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label>Tags (comma-separated)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <label>Video File</label>
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
          required
        />
        <button type="submit">Upload</button>
      </form>

      {/* Video Preview */}
      {videoPreview && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <h3>Video Preview</h3>
          <video
            src={videoPreview}
            controls
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
};

export default UploadVideo;
