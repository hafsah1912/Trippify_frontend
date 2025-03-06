import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import styles from "../styles/Wishlist.module.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Decode function
const decodeBase64 = (str) => {
  try {
    return atob(str); // Decode Base64
  } catch (e) {
    return str; // If decoding fails, return original value
  }
};

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState(null);
  const { username } = useParams();
  
  const cleanedUsername = decodeBase64(decodeURIComponent(username)).trim(); // Double decode

  console.log("Decoded Username:", cleanedUsername); // Debugging

  const navigate = useNavigate();

  useEffect(() => {
    if (!cleanedUsername) {
      setError("Invalid username. Please log in again.");
      return;
    }

    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/get_wishlist/?username=${cleanedUsername}`);
        
        console.log("Wishlist API Response:", response.data); // Debugging

        if (response.data.packages && response.data.packages.length > 0) {
          setWishlist(response.data.packages);
        } else {
          setError("No packages found in your wishlist.");
        }
      } catch (error) {
        setError(
          "Error fetching wishlist: " +
            (error.response ? error.response.data.error : error.message)
        );
      }
    };

    fetchWishlist();
  }, [cleanedUsername]);

  return (
    <div className={styles.mainDiv}>
      <Navbar />
      <div className={styles.contentWrapper}>
        <h2 className={styles.wishlistHeading}>Your Wishlist</h2>
        
        {error ? (
          <p className={styles.errorMessage}>{error}</p>
        ) : wishlist.length === 0 ? (
          <div className={styles.emptyWishlistImgDiv}>
            <p>Your Wishlist is Empty!</p>
            <Link className={styles.viewPackagesLink} to={`/packages/${cleanedUsername}`}>
              View Packages
            </Link>
          </div>
        ) : (
          <div className={styles.wishlistDataContainer}>
            <table className={styles.wishlistTable}>
              <thead>
                <tr>
                  <th>Package Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {wishlist.map((pkg) => (
                  <tr key={pkg._id}>
                    <td>{pkg.title}</td>
                    <td className={styles.actionDiv}>
                      <button 
                        className={styles.bookNowBtn} 
                        onClick={() => navigate(`/booking/${cleanedUsername}/${pkg._id}`)}
                      >
                        Book Now
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
