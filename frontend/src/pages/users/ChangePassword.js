// src/pages/users/ChangePassword.js
import React, { useState, useContext } from "react";
import { updatePassword } from "../../services/api";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

const ChangePassword = () => {
  const { token } = useContext(AuthContext);

  const [form, setForm] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      return toast.error("You must be logged in to change your password.");
    }

    if (form.new_password !== form.confirm_password) {
      return toast.error("New passwords do not match");
    }

    try {
      await updatePassword(form, token);  // token passed
      toast.success("Password updated successfully");
      setForm({ old_password: "", new_password: "", confirm_password: "" });
    } catch (error) {
      const errorMsg =
        error.message || error.detail || "Failed to update password";
      toast.error(errorMsg);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="old_password"
          placeholder="Old Password"
          value={form.old_password}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="password"
          name="new_password"
          placeholder="New Password"
          value={form.new_password}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm New Password"
          value={form.confirm_password}
          onChange={handleChange}
          required
        /><br /><br />
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
