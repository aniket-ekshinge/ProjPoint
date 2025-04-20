// src/pages/users/ViewProfile.js
import React, { useEffect, useState, useContext } from "react";
import { fetchUserProfile } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const ViewProfile = () => {
  const { token } = useContext(AuthContext);  // Access token from AuthContext
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (!token) {
        toast.error("You must be logged in to view your profile.");
        return;
      }

      console.log("Token being used:", token);  // Debug: Check token

      try {
        const data = await fetchUserProfile(token);  // Pass token to API call
        setProfile(data);
      } catch (error) {
        toast.error(error.message || "Failed to fetch profile");
      }
    };

    loadProfile();  // Load profile when component mounts or token changes
  }, [token]);  // Re-run when token changes

  if (!profile) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Your Profile</h2>
      <p><strong>Name:</strong> {profile.full_name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>College ID:</strong> {profile.college_id}</p>
      <p><strong>Phone:</strong> {profile.phone_number}</p>
      <p><strong>Academic Year:</strong> {profile.academic_year}</p>
      <p><strong>Branch:</strong> {profile.branch}</p>
    </div>
  );
};

export default ViewProfile;
