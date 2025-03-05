import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "../styles/MyBookings.module.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MyBookings = () => {
  const { username } = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/get_bookings/?username=${username}`,
          { withCredentials: true }
        );
        setBookings(response.data.bookings || []);
      } catch (err) {
        console.error("Error fetching bookings:", err.response?.data || err.message);
        setError("Failed to fetch bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [username]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading)
    return (
      <div className={styles.loadingWrapper}>
        <p className={styles.loadingText}>Fetching your bookings...</p>
      </div>
    );

  return (
    <div className={styles.myBookingsWrapper}>
      <Navbar />
      <h2 className={`${styles.heading} ${styles.brodiesFont}`}>Your Booking History</h2>

      <div className={styles.bookingsContainer}>
        {error && <p className={styles.errorMessage}>{error}</p>}

        {bookings.length > 0 ? (
          <table className={styles.bookingsTable}>
            <thead>
              <tr>
                <th>Package Title</th>
                <th>Tour Highlights</th>
                <th>Duration</th>
                <th>Booking Date & Time</th>
                <th>Family Members</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking?._id}>
                  <td>{booking?.package_details?.title || "N/A"}</td>
                  <td>{booking?.package_details?.tour_highlights || "N/A"}</td>
                  <td>
                    {booking?.package_details?.duration?.days || "0"}D /{" "}
                    {booking?.package_details?.duration?.nights || "0"}N
                  </td>
                  <td>{formatDate(booking?.date)}</td>
                  <td>
                    <ul className={styles.familyDetailsList}>
                      {booking?.family_members?.length > 0 ? (
                        booking.family_members.map((member, index) => (
                          <li key={index}>{member.name} (Age: {member.age})</li>
                        ))
                      ) : (
                        <li>No family members listed</li>
                      )}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={styles.noBookingsText}>No bookings found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyBookings;
