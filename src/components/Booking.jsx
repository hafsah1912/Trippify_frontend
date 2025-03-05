import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/Booking.module.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Booking = () => {
  const { username, packageId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const pkg = location.state?.package;
  const [familyCount, setFamilyCount] = useState(0);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [totalPrice, setTotalPrice] = useState({ adult: 0, child: 0 });

  useEffect(() => {
    if (!pkg || familyMembers.length === 0) return;

    let adultCount = 0;
    let childCount = 0;

    familyMembers.forEach((member) => {
      if (member.age >= 12) {
        adultCount += 1; // Adults (12 and above)
      } else if (member.age >= 5) {
        childCount += 1; // Children (5-11)
      }
    });

    setTotalPrice({
      adult: adultCount * (pkg?.price?.adult || 0),
      child: childCount * (pkg?.price?.child || 0),
    });
  }, [familyMembers, pkg]);

  const handleFamilyCountChange = (e) => {
    const count = parseInt(e.target.value, 10) || 0;
    setFamilyCount(count);
    setFamilyMembers(Array.from({ length: count }, () => ({ name: "", age: "" })));
  };

  const handleFamilyMemberChange = (index, field, value) => {
    setFamilyMembers((prev) =>
      prev.map((member, i) => (i === index ? { ...member, [field]: value } : member))
    );
  };

  const handleBooking = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/book_package/",
        { username, packageId, familyMembers }
      );

      setSuccess(`Booking successful! Date: ${response.data.date}`);
      alert("You have successfully booked your tour!");
      navigate(`/mybookings/${username}/${packageId}`);
    } catch (error) {
      setError(error.response?.data?.error || "Error booking package.");
    }
  };

  if (!pkg) return <div>Loading...</div>;

  return (
    <div className={styles.bookingWrapper}>
      <Navbar />
      <p className={styles.dateP}>Date: {new Date().toLocaleDateString()}</p>
      <div className={styles.bookingForm}>
        <h2>{pkg.title}</h2>
        <div className={styles.packageDetailsDiv}>
          <p>{pkg.duration.days} D / {pkg.duration.nights} N</p>
          <p>Price (Adult): &#x20B9; {pkg.price.adult}</p>
          <p>Price (Child): &#x20B9; {pkg.price.child}</p>
        </div>

        <div className={styles.familySection}>
          <h3>Family Members</h3>
          <input type="number" value={familyCount} onChange={handleFamilyCountChange} min="0" />
          {familyMembers.map((member, index) => (
            <div key={index} className={styles.memberDetails}>
              <p>Member {index + 1}:</p>
              <input
                type="text"
                value={member.name}
                placeholder="Name"
                onChange={(e) => handleFamilyMemberChange(index, "name", e.target.value)}
              />
              <input
                type="number"
                value={member.age}
                placeholder="Age"
                onChange={(e) => handleFamilyMemberChange(index, "age", e.target.value)}
                min="0"
              />
            </div>
          ))}
        </div>

        <div className={styles.billDiv}>
          <h3>Bill Details</h3>
          <p>Adults: &#x20B9; {totalPrice.adult}</p>
          <p>Children: &#x20B9; {totalPrice.child}</p>
          <p>Total: &#x20B9; {totalPrice.adult + totalPrice.child}</p>
        </div>

        <div className={styles.bookBtnDiv}>
          <button className={styles.cancelBtn}>
            <Link className={styles.cancelBtnLink} to={`/packages/${username}`}>Cancel</Link>
          </button>
          <button className={styles.bookBtn} onClick={handleBooking}>Book Now!</button>
        </div>

        {error && <p className={styles.errorMessage}>{error}</p>}
        {success && <p className={styles.successMessage}>{success}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default Booking;
