import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "./components/Home"; // Correct import
import Register from "./components/Register";
import Login from "./components/Login";
import AboutUs from "./components/AboutUs";
import Profile from "./components/Profile";
import ContactUs from "./components/ContactUs";
import PackagesPage from "./components/PackagesPage";
import PackageDetailPage from "./components/PackageDetailPage";
import Wishlist from "./components/Wishlist";
import Booking from "./components/Booking";
import MyBookings from "./components/MyBookings";
import ReviewForm from "./components/ReviewForm";
// import AdminHome from "./Admin/AdminHome";

import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          {/* Home routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home/hafsah" element={<Home />} />
          <Route path="/home/:username" element={<Home />} />

          {/* Authentication routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Static pages */}
          <Route path="/aboutus/:username" element={<AboutUs />} />
          <Route path="/contactus/:username" element={<ContactUs />} />

          {/* User profile */}
          <Route path="/profile/:username" element={<Profile />} />

          {/* Packages page */}
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/packages/:username" element={<PackagesPage />} />
          <Route path="/packagedetails/:username/:pkgId" element={<PackageDetailPage />} />

          <Route path="/wishlist/:username" element={<Wishlist />} />
          <Route path="/booking/:username/:packageId" element={<Booking />} />
          <Route path="/mybookings/:username" element={<MyBookings />} />
          <Route path="/submit_review/:username/:pkgId" element={<ReviewForm />} />

          {/* Admin */}
          {/* <Route path="/admin" element={<AdminHome />} /> */}
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
