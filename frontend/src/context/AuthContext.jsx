/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import getBaseUrl from "../utils/baseUrl";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const api = axios.create({
    baseURL: `${getBaseUrl()}/api/auth`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    setLoading(false);
  }, [token]);

  const registerUser = async (email, password, username) => {
    try {
      const response = await api.post("/register", {
        email,
        password,
        username,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const verifyEmail = async (email, verificationCode) => {
    try {
      const response = await api.post("/verify-email", {
        email,
        verificationCode,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await api.post("/login", {
        email,
        password,
      });
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      setToken(token);
      setCurrentUser(user);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    registerUser,
    verifyEmail,
    loginUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
