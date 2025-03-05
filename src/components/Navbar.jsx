import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { username } = useParams();

  useEffect(() => {
    if (username) {
      setUser(username); // Directly use username from params
    }
  }, [username]);

  const handleLogout = () => {
    setUser(null);
    navigate("/"); // Redirect to home/login after logout
    window.location.reload();
  };

  return (
    <nav className={`navbar fixed-top navbar-expand-md ${styles.navbar} ${styles.fontStyle}`}>
      <div className="container-fluid">
        <Link className={`navbar-brand ${styles.navbarBrand}`} to="/">
          <i className="fas fa-globe" style={{ margin: "0 8px" }}></i>
          Trippyfy
          <i className="fas fa-globe" style={{ margin: "0 8px" }}></i>
        </Link>

        <button
          className={`navbar-toggler ${styles.togglerBtn}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse justify-content-end navbar-collapse ${styles.togglerDiv}`} id="navbarNav">
          <ul className={`navbar-nav ${styles.navList}`}>
            <li className={`nav-item ${styles.navItem}`}>
              <Link className={`nav-link ${styles.navLink}`} to={`/home/${username}`}>
                Home
              </Link>
            </li>
            <li className={`nav-item ${styles.navItem}`}>
              <Link className={`nav-link ${styles.navLink}`} to={`/packages/${username}`}>
                All Packages
              </Link>
            </li>

            {/* Dropdown Menu */}
            <li className="nav-item dropdown">
              <button
                className={`nav-link dropdown-toggle ${styles.navLink}`}
                id="navbarDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                More
              </button>
              <ul className={`dropdown-menu ${styles.dropdownMenu}`} aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to={`/wishlist/${username}`}>Wishlist</Link></li>
                <li><Link className="dropdown-item" to={`/mybookings/${username}`}>Bookings</Link></li>
                <li><Link className="dropdown-item" to={`/aboutus/${username}`}>About Us</Link></li>
                <li><Link className="dropdown-item" to={`/contactus/${username}`}>Contact Us</Link></li>
                <li><Link className="dropdown-item" to={`/profile/${username}`}>View Profile</Link></li>
              </ul>
            </li>

            {user ? (
              <li className={`nav-item ${styles.navItem}`}>
                <span className={`nav-link ${styles.navLink}`} onClick={handleLogout} style={{ cursor: "pointer" }}>
                  Logout
                </span>
              </li>
            ) : (
              <li className={`nav-item ${styles.navItem}`}>
                <Link className={`nav-link ${styles.navLink}`} to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
