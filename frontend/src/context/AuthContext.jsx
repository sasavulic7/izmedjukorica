import React, { createContext, useState, useEffect } from "react";
import { login, register } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Provera da li postoji token u localStorage
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }

    setLoading(false);
  }, []);

  const loginUser = async (email, password) => {
    try {
      setError(null);
      const response = await login(email, password);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      setUser(response.user);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Greška prilikom prijave");
      return false;
    }
  };

  const registerUser = async (username, email, password) => {
    try {
      setError(null);
      await register(username, email, password); // Registracija korisnika
      const isLoggedIn = await loginUser(email, password); // Odmah prijavi korisnika nakon registracije
      return isLoggedIn; // Vraća true ako je prijava uspešna
    } catch (err) {
      setError(err.response?.data?.message || "Greška prilikom registracije");
      return false;
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        loginUser,
        registerUser,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
