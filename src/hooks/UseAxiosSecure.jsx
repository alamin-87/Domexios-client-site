import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

// Determine the API URL dynamically to avoid build-time environment variable issues
const getBaseURL = () => {
  if (import.meta.env.VITE_API_URL && !import.meta.env.VITE_API_URL.includes("localhost")) {
    return import.meta.env.VITE_API_URL;
  }
  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    return "http://localhost:5000";
  }
  return "https://domexis-server-site.vercel.app";
};

const axiosSecure = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Request Interceptor
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = user?.accessToken || localStorage.getItem("access-token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Response Interceptor
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response && [401, 403].includes(error.response.status)) {
          logOut().then(() => {
            navigate("/login");
          });
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
