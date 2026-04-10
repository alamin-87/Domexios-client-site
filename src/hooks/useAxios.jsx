import axios from "axios";
import React from "react";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://domexis-server-site.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
