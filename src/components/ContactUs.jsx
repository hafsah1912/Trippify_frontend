import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/ContactUs.module.css";
import Footer from "./Footer";
import Navbar from "./Navbar";

const ContactUs = () => {
  const [isBlurred, setIsBlurred] = useState(false);
  const [navbarColor, setNavbarColor] = useState("transparent");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarColor("white");
        setIsBlurred(true);
      } else {
        setNavbarColor("transparent");
        setIsBlurred(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const { username } = useParams();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the username param exists and is not corrupted
    let decodedUsername = "";
    try {
      const cleanedString = username.replace(/^b'|'+$/g, "");
      decodedUsername = atob(cleanedString);
    } catch (error) {
      setStatus("Error decoding username.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/api/contact/?username=${username}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setStatus("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("Failed to send message. Please try again later.");
    }
  };

  return (
    <>
      <div
        className={`${styles.navbarDiv}`}
        style={{ backgroundColor: navbarColor }}
      >
        <Navbar colorUpdated="black" isBlurred={isBlurred} />
      </div>
      <div className={` ${styles.contactContainer}`}>
        <h2 className={`${styles.contactContainerHeading}`}>Contact Us</h2>
        <div className={`${styles.contactUsDetailsContainer}`}>
          {/* Contact Information Section */}
          <div className={`${styles.contactUsDetailsContainer1}`}>
            <h3>Contact Information</h3>
            <p>
              <strong>Address:</strong> 1234 Travel Lane, Wanderlust City, India
            </p>
            <p>
              <strong>Phone:</strong> +91 98765 43210
            </p>
            <p>
              <strong>Email:</strong> contact@trippify.com
            </p>
            <p>
              <strong>Working Hours:</strong> Mon - Fri, 9:00 AM - 6:00 PM
            </p>
          </div>

          {/* Contact Form Section */}
          <div className={`${styles.contactUsDetailsContainer2}`}>
            <h3>Send Us a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  className="form-control"
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Send Message
              </button>
            </form>
          </div>
        </div>
        {status && (
          <div
            className={`alert mt-3 ${
              status === "Message sent successfully!"
                ? "alert-success"
                : "alert-danger"
            }`}
          >
            {status}
          </div>
        )}
      </div>
      <div className={styles.footerContainer}>
        <Footer />
      </div>
    </>
  );
};

export default ContactUs;
