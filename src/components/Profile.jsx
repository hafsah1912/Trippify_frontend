import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../styles/Profile.module.css";
import Navbar from "./Navbar";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [editProfile, setEditProfile] = useState({
    name: "",
    email: "",
    area: "",
    city: "",
    state: "",
    country: "",
    contact_no: "",
    profile_photo: "",
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [activeSection, setActiveSection] = useState("profile-data");
  const [navbarColor, setNavbarColor] = useState("transparent");
  const [validationErrors, setValidationErrors] = useState({});

  const { username } = useParams();
  const navigate = useNavigate(); // ✅ Updated from useHistory()

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/get_profile/?username=${username}`)
      .then((response) => {
        setProfile(response.data.user);
      })
      .catch((error) => {
        setError("Error fetching profile: " + error.message);
      });
  }, [username]);

  const handleSave = () => {
    const formData = new FormData();
    formData.append("username", profile.username);
    formData.append("name", editProfile.name);
    formData.append("email", editProfile.email);
    formData.append("area", editProfile.area);
    formData.append("city", editProfile.city);
    formData.append("state", editProfile.state);
    formData.append("country", editProfile.country);
    formData.append("contact_no", editProfile.contact_no);
    if (photoFile) {
      formData.append("profile_photo", photoFile);
    }

    axios
      .post("http://localhost:8000/api/update-profile/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((response) => {
        setProfile(response.data.user);
        setIsEditing(false);
        
        // ✅ Updated from `history.push(...)` to `navigate(...)`
        navigate(`/profile/${btoa(response.data.user.username)}`);
      })
      .catch((error) => {
        setError("Error updating profile: " + error.message);
      });
  };

  return (
    <>
      <Navbar />
      {error ? <div>{error}</div> : profile ? <div>{profile.name}</div> : <div>Loading...</div>}
    </>
  );
};

export default Profile;
