import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import AboutUs from "./components/AboutUs";
import Profile from "./components/Profile";
import ContactUs from "./components/ContactUs";
import PackagesPage from "./components/PackagesPage";
import PackageDetailPage from "./components/PackageDetailPage";
import Wishlist from "./components/Wishlist";
import Booking from "./components/Booking";
import axios from "axios";
import MyBookings from "./components/MyBookings";
import ReviewForm from "./components/ReviewForm";
import ProtectedRoute from "./components/ProtectedRoute";
// import AdminHome from "./Admin/AdminHome";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

function App() {
  // Example authentication check. Replace with your actual authentication logic.
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <HelmetProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home/hafsah" element={<Home />} />
          <Route path="/home/:username" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/aboutus/:username" element={<AboutUs />} />
          <Route path="/contactus/:username" element={<ContactUs />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/packages/:username" element={<PackagesPage />} />
            <Route path="/packagedetails/:username/:pkgId" element={<PackageDetailPage />} />
            <Route path="/wishlist/:username" element={<Wishlist />} />
            <Route path="/booking/:username/:packageId" element={<Booking />} />
            <Route path="/mybookings/:username" element={<MyBookings />} />
            <Route path="/submit_review/:username/:pkgId" element={<ReviewForm />} />
          </Route>

          {/* Admin (if needed) */}
          {/* <Route path="/admin" element={<AdminHome />} /> */}
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
