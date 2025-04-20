// src/pages/users/UpdateAcademicYear.js
import React, { useState, useContext } from "react";
import { updateAcademicYear } from "../../services/api";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

const UpdateAcademicYear = () => {
  const { token } = useContext(AuthContext); // Get token from context
  const [academicYear, setAcademicYear] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!academicYear) return toast.error("Please select a year");

    setLoading(true);
    try {
      await updateAcademicYear({ academic_year: academicYear }, token); // Pass token
      toast.success("Academic year updated!");
      setAcademicYear("");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to update academic year");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Update Academic Year</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={academicYear}
          onChange={(e) => setAcademicYear(e.target.value)}
          required
        >
          <option value="">Select Year</option>
          <option value="FE">FE</option>
          <option value="SE">SE</option>
          <option value="TE">TE</option>
          <option value="BE">BE</option>
        </select>
        <br /><br />
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateAcademicYear;
