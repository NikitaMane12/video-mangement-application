import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://api.escuelajs.co/api/v1/users"
        );
        setUsers(response.data); // Save user data in state
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Failed to fetch user data. Please try again later.");
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      console.log("Login successful!", user);
      localStorage.setItem("token", "mockToken123");
      alert(`Welcome, ${user.name}!`);
      navigate("/VideoPage");
    } else {
      console.error("Login failed: Invalid email or password");
      alert("Invalid email or password");
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
