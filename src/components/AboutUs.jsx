import React, { useState, useEffect } from "react";
import styles from "../styles/AboutUs.module.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AboutUs = () => {
  const [isBlurred, setIsBlurred] = useState(false);
  const [navbarColor, setNavbarColor] = useState("transparent");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarColor("white");
        setIsBlurred(true);
      } else {
        setNavbarColor("transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`${styles.aboutUs}`}>
        <div
          className={`${styles.navbarDiv}`}
          style={{ backgroundColor: navbarColor }}
        >
          <Navbar colorUpdated="black" isBlurred={isBlurred} />
        </div>
        <header className={styles.aboutUsHeader}>
          <h1>About Trippyfy</h1>
          {/* <p>Your journey begins here!</p> */}
        </header>

        <section className={styles.companyInfo}>
          <h2>Our Mission</h2>
          <p>
            At Trippyfy, we strive to provide exceptional travel experiences
            by offering a wide range of tours around the globe. Our mission is
            to make your travel dreams come true with our curated itineraries
            and personalized services.
          </p>
        </section>

        <section className={styles.ourValues}>
          <h2>Our Values</h2>
          <ul>
            <li>
              <strong>Customer Satisfaction:</strong> We prioritize our
              customers' needs and ensure they have a memorable experience.
            </li>
            <li>
              <strong>Integrity:</strong> We are committed to transparency and
              honesty in all our interactions.
            </li>
            <li>
              <strong>Innovation:</strong> We continuously seek new and
              creative ways to enhance your travel experience.
            </li>
          </ul>
        </section>

        <section className={styles.sevenWonders}>
          <h2>The 7 Wonders of the World</h2>
          <p>
            Discover the breathtaking beauty and historical significance of the
            7 Wonders of the World. From the Great Wall of China to the
            majestic Taj Mahal, each wonder tells a story of human ingenuity
            and cultural heritage.
          </p>
          <ul>
            <li>The Great Wall of China</li>
            <li>Petra, Jordan</li>
            <li>Christ the Redeemer, Brazil</li>
            <li>Machu Picchu, Peru</li>
            <li>Chichen Itza, Mexico</li>
            <li>The Roman Colosseum, Italy</li>
            <li>The Taj Mahal, India</li>
          </ul>
        </section>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default AboutUs;
