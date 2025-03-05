import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/PackagesPage.module.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PackagesPage = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { username } = useParams();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const packageName = queryParams.get("name");
  const headerImage =
    location.state?.headerImage || "/static/image/Individual_Pages_Banners/uk-banner-img.jpeg";
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        let endpoint = "http://localhost:8000/api/get_packages/";
        if (packageName) {
          endpoint += `?name=${packageName}`;
        } else {
          endpoint += `?allpackages=true`;
        }

        console.log("Fetching packages from:", endpoint);
        const response = await axios.get(endpoint);
        setPackages(response.data.packages);
      } catch (error) {
        console.error("Package Fetch Error:", error.response || error);
        setError("Error fetching packages: " + (error.response ? error.response.data.error : error.message));
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();

    if (username) {
      axios
        .get(`http://localhost:8000/api/get_wishlist/?username=${username}`)
        .then((response) => {
          if (response.data.packages) {
            setWishlist(response.data.packages);
          } else {
            setError("No wishlist items found.");
          }
        })
        .catch((error) => {
          console.error("Wishlist Fetch Error:", error.response || error);
          setError("Error fetching wishlist: " + (error.response ? error.response.data.error : error.message));
        });
    }
  }, [location.search, username]);

  const handleAddToWishlist = async (pkgId) => {
    try {
      await axios.post("http://localhost:8000/api/add_to_wishlist/", { username, pkgId });
      setWishlist([...wishlist, packages.find((pkg) => pkg._id === pkgId)]);
    } catch (error) {
      console.error("Wishlist Error:", error);
    }
  };

  const handleBookNow = (pkg) => {
    if (username === "guest") {
      alert("Register to book tour!");
    } else {
      navigate(`/booking/${username}/${pkg._id}`, { state: { package: pkg, headerImage } });
    }
  };

  const handleViewPackage = (pkgId) => {
    navigate(`/packagedetails/${username}/${pkgId}`);
  };

  if (loading) return <div className={styles.loader}>Loading...</div>;
  if (error) return <p className={styles.errorMessage}>Error: {error}</p>;

  return (
    <div className={styles.maindiv}>
      <div className={styles.navbardiv}>
        <Navbar />
      </div>
      <div className={styles.headerTitle}>
        <h1>Unlock the Secrets of the 7 Wonders</h1>
      </div>
      <div className={styles.packagesContainer}>
        {packages.length > 0 ? (
          packages.map((pkg) => (
            <div key={pkg._id} className={styles.packageCard}>
              <div className={styles.packageImageWrapper}>
                {pkg.images.length > 0 && (
                  <>
                    <img
                      src={`/static/image/package_images/${pkg.package_image}`}
                      alt={pkg.package_image}
                      className={styles.packageImage}
                    />
                    <div className={styles.durationOverlay}>
                      {pkg.duration.nights} nights / {pkg.duration.days} days
                    </div>
                  </>
                )}
              </div>

              <div className={styles.packageContent}>
                <div className={styles.packageContentHead}>
                  <h2 className={styles.packageTitle}>{pkg.title}</h2>
                </div>
                <p className={styles.packageDescription}>
                  {pkg.tour_highlights} {" "}
                  <span
                    className={styles.viewPackageLink}
                    onClick={() => handleViewPackage(pkg._id)}
                  >
                    View Package
                  </span>
                </p>
              </div>

              <div className={styles.packageActions}>
                <button
                  className={`${styles.addToWishlistBtn} ${styles.savedBtn}`}
                  onClick={() => handleAddToWishlist(pkg._id)}
                >
                  {wishlist.some((item) => item._id === pkg._id) ? (
                    <span>Saved</span>
                  ) : (
                    <>Save for later</>
                  )}
                </button>
                <button
                  className={styles.addToCartBtn}
                  onClick={() => handleBookNow(pkg)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noPackages}>No packages available</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PackagesPage;
