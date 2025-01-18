const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/videoApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    email: String,
    password: String,
  })
);

const Video = mongoose.model(
  "Video",
  new mongoose.Schema({
    title: String,
    url: String,
    tags: [String],
    uploadedBy: mongoose.Schema.Types.ObjectId,
    createdAt: { type: Date, default: Date.now },
  })
);

// Middleware for authentication
const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access Denied");
  try {
    const verified = jwt.verify(token, "SECRET_KEY");
    req.user = verified;
    next();
  } catch {
    res.status(400).send("Invalid Token");
  }
};

// Routes
// 1. Register
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();
  res.status(201).send("User registered");
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "test@example.com" && password === "password") {
    const token = "your-jwt-token";
    res.json({ token });
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
});

app.post("/api/videos", authMiddleware, async (req, res) => {
  const { title, url, tags } = req.body;
  const video = new Video({ title, url, tags, uploadedBy: req.user._id });
  await video.save();
  res.status(201).send("Video uploaded");
});

// 4. Get Videos
app.get("/api/videos", authMiddleware, async (req, res) => {
  const videos = await Video.find();
  res.json(videos);
});

// 5. Get Video by ID
app.get("/api/videos/:id", authMiddleware, async (req, res) => {
  const video = await Video.findById(req.params.id);
  res.json(video);
});

// 6. Delete Video
app.delete("/api/videos/:id", authMiddleware, async (req, res) => {
  await Video.findByIdAndDelete(req.params.id);
  res.send("Video deleted");
});

app.listen(5000, () => console.log("Server running on port 5000"));
