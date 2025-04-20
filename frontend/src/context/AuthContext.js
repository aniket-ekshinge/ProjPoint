// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { fetchUserProfile } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user,  setUser]  = useState(null);

  // Whenever token changes, re‑fetch the user profile
  useEffect(() => {
    if (token) {
      fetchUserProfile()
        .then((profile) => {
          setUser(profile);
          localStorage.setItem("user", JSON.stringify(profile));
          localStorage.setItem("token", token);
        })
        .catch(() => {
          // token might be invalid
          setUser(null);
          setToken(null);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        });
    } else {
      setUser(null);
      localStorage.removeItem("user");
    }
  }, [token]);

  const login = (profile, newToken) => {
    setUser(profile);
    setToken(newToken);
    localStorage.setItem("user", JSON.stringify(profile));
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
