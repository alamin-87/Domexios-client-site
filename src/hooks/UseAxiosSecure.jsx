import axios from "axios";
import { useEffect } from "react";
import UseAuth from "./UseAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://domexis-server-site.vercel.app",
  withCredentials: true,
});

const UseAxiosSecure = () => {
  const { user, logOut } = UseAuth();
  const naviGate = useNavigate();

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
      (error) => Promise.reject(error)
    );

    // Response Interceptor
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response && [401, 403].includes(error.response.status)) {
          logOut().then(() => {
            naviGate("/login");
          });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logOut, naviGate]);

  return axiosSecure;
};

export default UseAxiosSecure;
