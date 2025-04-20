// src/pages/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const goToUserLogin = () => {
    navigate("/login/user");
  };

  const goToAdminLogin = () => {
    navigate("/login/admin");
  };

  return (
    <div>
      <h1>Welcome to the Project Platform</h1>
      <div>
        <button onClick={goToUserLogin}>User Login</button>
        <button onClick={goToAdminLogin}>Admin Login</button>
      </div>
    </div>
  );
};

export default Home;
