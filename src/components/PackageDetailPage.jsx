import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/PackageDetailPage.module.css";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import Footer from "./Footer";

const PackageDetailPage = () => {
  const { pkgId } = useParams();
  const [packageDetails, setPackageDetails] = useState(null);

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/get_package_by_id/${pkgId}/`
        );
        setPackageDetails(response.data);
      } catch (error) {
        console.error("Error fetching package details:", error);
      }
    };

    fetchPackageDetails();
  }, [pkgId]);

  if (!packageDetails) {
    return <div>Loading...</div>;
  }

  const { days, nights } = packageDetails.duration || {};
  const durationString =
    days && nights
      ? `${days} Days / ${nights} Nights`
      : "Duration not specified";

  return (
    <>
      <div className={`${styles.navbardiv}`}>
        <Navbar />
      </div>
      <div className={styles.container}>
        {packageDetails.title && (
          <h1 className={styles.headerTitle}>{packageDetails.title}</h1>
        )}

        <div className={styles.content}>
          {/* Itinerary Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Itinerary</h2>
            <div className={styles.itinerary}>
              {packageDetails.itinerary.length > 0 ? (
                packageDetails.itinerary.map((item, index) => (
                  <div key={index} className={styles.itineraryItem}>
                    <h3 className={styles.dayTitle}>Day {index + 1}</h3>
                    <div className={styles.dayDetails}>
                      <p>{Object.values(item)[0]}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No itinerary details available</p>
              )}
            </div>
          </section>

          {/* Things to Know Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Things to Know</h2>
            <div className={styles.thingsToKnow}>
              <div className={styles.info}>
                <h3 className={styles.infoTitle}>Duration</h3>
                <p>{durationString}</p>
              </div>
              <div className={styles.info}>
                <h3 className={styles.infoTitle}>Price</h3>
                <p>{packageDetails.price.adult}</p>
              </div>
              <div className={styles.info}>
                <h3 className={styles.infoTitle}>States</h3>
                <p>
                  {packageDetails.states.map((state, index) => (
                    <span key={index}>
                      {state}
                      {index < packageDetails.states.length - 1 && ", "}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PackageDetailPage;
