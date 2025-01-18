import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "10px",
        backgroundColor: "black",
        justifyContent: "space-evenly",
        textDecoration: "none",
        height: "30px",
      }}
    >
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        Home
      </Link>
      <Link
        to="/uploadVideo"
        style={{ textDecoration: "none", color: "white" }}
      >
        UploadVideo
      </Link>
      <Link to="/Login" style={{ textDecoration: "none", color: "white" }}>
        Login
      </Link>
    </nav>
  );
};

export default Navbar;
