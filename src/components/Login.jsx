import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Login.module.css";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ✅ Updated from useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/login/",
        { username, password },
        { withCredentials: true }
      );

      alert(response.data.message);

      if (response.data.success) {
        navigate(response.data.redirect || "/"); // ✅ Updated navigation
        window.location.reload(); // Reload to update navbar
      } else {
        console.error("User data is missing in the response");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.error || "An error occurred");
    }
  };

  return (
    <div className={styles.loginPage}>
      <Helmet>
        <title>Reconnect With Your Travel Plans: Log In</title>
      </Helmet>
      <div className={styles.formContainer}>
        <div className={styles.logoContainer}>
          <span className={styles.fontStyle}>
            Trippyfy
            <i className="fa-solid fa-plane" style={{ margin: "0 8px" }}></i>
          </span>
        </div>
        <div className={styles.loginContainer}>
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <p className={styles.loginSlogan}>
              Embark on a journey to the 7 Wonders of the World!
            </p>
            <h5 className={styles.loginHeading}>
              Log in to explore the extraordinary wonders!
            </h5>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className={styles.inputField}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className={styles.inputField}
            />
            <button type="submit" className={styles.loginButton}>
              Continue
            </button>
            <Link to="/register" className={styles.registerLink}>
              Don't have an account? Register now!
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
