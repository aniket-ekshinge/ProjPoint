// src/components/Navbar.js
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="/projects">Projects</Link> |{" "}
      <Link to="/feedback">Feedback</Link> |{" "}
      <Link to="/recommender/recommend">Recommendation System</Link> |{" "}
      {user ? (
        <>
          <span>Welcome, {user.username}</span> |{" "}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
