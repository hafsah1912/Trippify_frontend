import React from "react";
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";
import styles from "../styles/Footer.module.css"; // Assuming you have CSS for styling

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialLinks}>
        <a className={`${styles.socialLink} ${styles.facebook}`} href="#!"><FaFacebookF /></a>
        <a className={`${styles.socialLink} ${styles.twitter}`} href="#!"><FaTwitter /></a>
        <a className={`${styles.socialLink} ${styles.google}`} href="#!"><FaGoogle /></a>
        <a className={`${styles.socialLink} ${styles.instagram}`} href="#!"><FaInstagram /></a>
        <a className={`${styles.socialLink} ${styles.linkedin}`} href="#!"><FaLinkedinIn /></a>
        <a className={`${styles.socialLink} ${styles.github}`} href="#!"><FaGithub /></a>
      </div>
      <div className={styles.copyright}>
        © 2024 Trippyfy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
