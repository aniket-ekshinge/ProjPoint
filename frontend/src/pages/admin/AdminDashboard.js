import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>👋 Welcome Admin</h1>
      <hr />

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "300px" }}>
        <button onClick={() => navigate("/admin/upload-students")}>➕ Add Users</button>
        <button onClick={() => navigate("/projects")}>📁 View Projects</button>
        <button onClick={() => navigate("/admin/download-requests")}>📥 Download Requests</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
