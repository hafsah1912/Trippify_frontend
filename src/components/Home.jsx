import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import styles from "../styles/Home.module.css";
import axios from "axios";
import Footer from "./Footer";

const Home = () => {
  const [packages, setPackages] = useState([]);
  const [typedText, setTypedText] = useState("");
  const navigate = useNavigate();
  const { username } = useParams();

  // Typing Effect Logic
  useEffect(() => {
    const texts = ["Journey Through the Seven Wonders of the World!"];
    let index = 0;
    let textIndex = 0;
    let isDeleting = false;

    const type = () => {
      if (textIndex < texts.length) {
        if (!isDeleting && index <= texts[textIndex].length) {
          setTypedText(texts[textIndex].slice(0, index));
          index++;
        } else if (isDeleting && index > 0) {
          setTypedText(texts[textIndex].slice(0, index));
          index--;
        }

        if (!isDeleting && index === texts[textIndex].length) {
          isDeleting = true;
          setTimeout(type, 2000);
        } else if (isDeleting && index === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
          setTimeout(type, 500);
        } else {
          setTimeout(type, isDeleting ? 50 : 100);
        }
      }
    };

    type();
  }, []);

  // Fetch package data from backend
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/packages_title/")
      .then((response) => {
        setPackages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching package data!", error);
      });
  }, []);

  // Handle Tour Click
  const handleTourClick = (state, type, name, image) => {
    navigate(`/packages/${username}?name=${name}`, {
      state: { headerImage: `/static/image/Individual_Pages_Banners/${image}` },
    });
  };

  return (
    <>
      <div className={`${styles.navbarDiv}`}>
        <Navbar />
      </div>

      <div className={`${styles.superMainDiv}`}>
        <div className={`${styles.mainDiv}`}>
          <div className={`${styles.typingContainer}`}>
            <h3 className={`${styles.h1Heading}`}>
              <span className={`${styles.typedText} ${styles.fontStyle}`}>
                {typedText}
              </span>
            </h3>
          </div>
          <div className={`${styles.fixedText}`}>
            <h1>Experience the Marvels of the World</h1>
            <h3>
              Uncover the stories behind each wonder with <span>Trippyfy</span>
            </h3>
          </div>
        </div>

        <div className={styles.tourPackagesSectionMain}>
          <div className={styles.tourPackagesSection}>
            <div className={styles.packagesHeadingContainer}>
              <h2 className={`${styles.sectionHeading} ${styles.fontStyle}`}>
                Explore Tours for 7 Wonders
              </h2>
            </div>
            <div className={styles.packagesContainer}>
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={styles.packageCard}
                  onClick={() =>
                    handleTourClick(pkg.state, pkg.type, pkg.name, pkg.banner_image)
                  }
                >
                  <img
                    src={`/static/image/HomePage/${pkg.image}`}
                    alt={pkg.name}
                    className={styles.packageImage}
                  />
                  <h3 className={styles.packageTitle}>{pkg.name}</h3>
                  <p className={styles.packageDescription}>{pkg.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
// this is my home.jsx file  decode the username consistently across all files.