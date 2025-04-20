import React from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
        <button onClick={() => navigate("/user/profile")}>View Profile</button>
        <button onClick={() => navigate("/user/change-password")}>Update Password</button>
        <button onClick={() => navigate("/user/update-academic-year")}>Update Academic Year</button>
      </div>

      <h2 style={{ marginTop: "2rem" }}>Welcome to User Dashboard</h2>

      <div style={{ marginTop: "2rem" }}>
        <button onClick={() => navigate("/projects/create")}>Upload Projects</button>
        <button onClick={() => navigate("/projects")}>View Projects</button>
        <button onClick={() => navigate("/queries")}>View Queries</button>
        <button onClick={() => navigate("/recommender/recommend")}>Recommendation</button>
      </div>
    </div>
  );
};

export default UserDashboard;
