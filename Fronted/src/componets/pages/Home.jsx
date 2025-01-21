import React, { useState, useEffect } from "react";

const Home = () => {
  const slides = [
    "https://tse2.mm.bing.net/th?id=OIP.6guVUwGnkRkfu-PAXgLr9gHaEz&pid=Api&P=0&h=180",
    "https://tse2.mm.bing.net/th?id=OIP.6guVUwGnkRkfu-PAXgLr9gHaEz&pid=Api&P=0&h=180",
    "https://tse2.mm.bing.net/th?id=OIP.6guVUwGnkRkfu-PAXgLr9gHaEz&pid=Api&P=0&h=180",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Welcome to the Video Management Application
      </h1>
      <div
        style={{
          width: "80%",
          margin: "0 auto",
          overflow: "hidden",
          borderRadius: "10px",
          position: "relative",
        }}
      >
        <img
          src={slides[currentSlide]}
          alt="Slide"
          style={{
            width: "100%",
            height: "auto",
            transition: "transform 0.5s ease-in-out",
          }}
        />
      </div>
    </div>
  );
};

export default Home;
