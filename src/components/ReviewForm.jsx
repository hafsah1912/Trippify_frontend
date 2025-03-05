import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // useNavigate instead of useHistory
import styles from "../styles/ReviewForm.module.css";
import Navbar from "./Navbar";

const ReviewForm = () => {
  const { username, pkgId } = useParams();
  const [reviewText, setReviewText] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Corrected navigation hook

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("reviewText", reviewText);
    formData.append("name", name);
    formData.append("image", image);
    formData.append("title", title);

    try {
      await axios.post(
        `http://localhost:8000/api/submit_review/${pkgId}/`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      navigate(`/mybookings/${username}`); // Corrected navigation
    } catch (error) {
      setError("Failed to submit review.");
    }
  };

  return (
    <>
      <div className={styles.navbardiv}>
        <Navbar />
      </div>
      <div className={styles.reviewFormWrapper}>
        <h3 className={` ${styles.heading}`}>
          Share Your Experience
        </h3>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.reviewForm}>
          <input
            type="text"
            placeholder="Describe in a word...."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={styles.nameInput}
          />
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review..."
            required
            className={styles.reviewTextArea}
          ></textarea>
          <input
            type="file"
            onChange={handleImageChange}
            required
            className={styles.fileInput}
          />
          <input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={styles.nameInput}
          />
          <div className={`${styles.submitDiv}`}>
            <button type="submit" className={styles.submitButton}>
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ReviewForm;
