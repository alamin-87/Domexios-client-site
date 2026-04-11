import axios from "axios";
import React from "react";
// Determine the API URL dynamically to avoid build-time environment variable issues
const getBaseURL = () => {
  if (import.meta.env.VITE_API_URL && !import.meta.env.VITE_API_URL.includes("localhost")) {
    return import.meta.env.VITE_API_URL;
  }
  if (window.location.hostname === "localhost") {
    return "http://localhost:5000";
  }
  return "https://domexis-server-site.vercel.app";
};

const axiosInstance = axios.create({
  baseURL: getBaseURL(),
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
