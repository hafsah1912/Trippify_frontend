import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import styles from "../styles/Register.module.css";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate(); // Correct way to handle navigation in React Router v6

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/register/", {
        username,
        password,
      });
      alert(response.data.message);

      if (response.data.redirect) {
        navigate(response.data.redirect); // Corrected navigation method
        window.location.reload();
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = error.response?.data?.error || "An error occurred";
      alert(errorMessage);
    }
  };

  return (
    <div className={styles.registerPage}>
      <Helmet>
        <title>Start Your Journey with Us: Register Now</title>
      </Helmet>
      <div className={styles.formContainer}>
        <div className={styles.logoContainer}>
          <span className={styles.fontStyle}>
            Trippyfy
            <i className="fa-solid fa-plane" style={{ margin: "0 8px" }}></i>
          </span>
        </div>
        <div className={styles.registerContainer}>
          <form onSubmit={handleSubmit} className={styles.registerForm}>
            <p className={styles.registerSlogan}>
              Discover the Wonders of the World. Join Now!
            </p>
            <h5 className={styles.registerHeading}>
              Create an account and start your journey to the 7 Wonders!
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
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
              className={styles.inputField}
            />
            <button type="submit" className={styles.registerButton}>
              Continue
            </button>
            <Link to="/login" className={styles.registerLink}>
              Already Have An Account? Login Now!
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
