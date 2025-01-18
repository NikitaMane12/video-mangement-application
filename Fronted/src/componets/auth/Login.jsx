import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Login attempt:", { email, password });
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      console.log("Response from backend:", res.data);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        alert("Login successful!");
        navigate("/VideoPage");
      } else {
        alert("Login failed: No token provided");
      }
    } catch (error) {
      console.error("Login error:", error.response || error);
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      alert(errorMessage);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          required
        />
        <button type="submit" className="login-button">
          Login
        </button>
        <p className="register-prompt">
          Don't have an account?{" "}
          <span className="register-link" onClick={() => navigate("/Register")}>
            Register here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
