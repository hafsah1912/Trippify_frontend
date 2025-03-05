import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom"; // useNavigate instead of useHistory
import styles from "../styles/Wishlist.module.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Helmet } from "react-helmet-async";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState(null);
  const { username } = useParams();
  const cleanedString = username.replace(/^b'|'+$/g, "");
  const navigate = useNavigate(); // Corrected navigation hook
  const location = useLocation();
  const headerImage = location.state?.headerImage || "";

  // Save scroll position before reload
  const saveScrollPosition = () => {
    sessionStorage.setItem("scrollPosition", window.scrollY);
  };

  // Restore scroll position after reload
  const restoreScrollPosition = () => {
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition, 10));
      sessionStorage.removeItem("scrollPosition");
    }
  };

  useEffect(() => {
    restoreScrollPosition();

    axios
      .get(
        `http://localhost:8000/api/get_wishlist/?username=${username}`
      )
      .then((response) => {
        if (response.data.packages) {
          setWishlist(response.data.packages);
        } else {
          setError("No packages found.");
        }
      })
      .catch((error) => {
        setError(
          "Error fetching wishlist: " +
            (error.response ? error.response.data.error : error.message)
        );
      });

    // Save scroll position before navigating away
    window.addEventListener("beforeunload", saveScrollPosition);

    return () => {
      window.removeEventListener("beforeunload", saveScrollPosition);
    };
  }, [username]);

  const handleBookNow = (pkg) => {
    navigate(`/booking/${username}/${pkg._id}`, { state: { package: pkg, headerImage } }); // Corrected navigation
  };

  const handleViewPackage = (pkgId, headerImage) => {
    navigate(`/packagedetails/${username}/${pkgId}`, { state: { headerImage: `${headerImage}` } }); // Corrected navigation
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!wishlist.length) {
    return (
      <div className={styles.mainDiv}>
        <Helmet>
          <title>Your Dream List: Saved InDiameter Tours</title>
        </Helmet>
        <div className={`${styles.navbardiv}`}>
          <Navbar />
        </div>
        <h2 className={`${styles.wishlistHeading} `}>Your Wishlist</h2>
        <div className={styles.emptyWishlistImgDiv}>
          <div>
            <p>Your Wishlist is Empty!</p>
            <Link
              className={`nav-link ${styles.viewPackagesLink}`}
              to={`/packages/${username}`}
            >
              View Packages
            </Link>
          </div>
        </div>

        <div>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mainDiv}>
      <div className={`${styles.navbardiv}`}>
        <Navbar colorUpdated="black" />
      </div>
      <h2 className={`${styles.wishlistHeading} `}>Your Wishlist</h2>
      <div className={`${styles.wishlistDataContainer}`}>
        <div className={styles.wishlistItems}>
          {wishlist.map((pkg) => (
            <div key={pkg._id} className={styles.packageCard}>
              <div className={`${styles.packagImageContainer}`}>
                <img
                  src={`/static/image/package_images/${pkg.package_image}`}
                  alt={`/static/image/package_images/${pkg.package_image}`}
                  className={styles.packageImage}
                />
              </div>
              <div className={`${styles.packagDetailsContainer}`}>
                <div className={`${styles.packageHeadingDiv}`}>
                  <h3 className={``}>{pkg.title}</h3>
                </div>
                <p>
                  {pkg.tour_highlights}{" "}
                  <a
                    className={styles.viewPackageLink}
                    onClick={() => handleViewPackage(pkg._id, headerImage)}
                  >
                    View Package
                  </a>
                </p>

                <div className={`${styles.actionDiv}`}>
                  <div>
                    <button
                      className={styles.addToCartBtn}
                      onClick={() => handleBookNow(pkg)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Wishlist;
