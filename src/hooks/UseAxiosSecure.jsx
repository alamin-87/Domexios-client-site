import axios from "axios";
import { useEffect } from "react";
import UseAuth from "./UseAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const UseAxiosSecure = () => {
  const { user, logOut } = UseAuth();
  const naviGate = useNavigate();

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        if (user?.accessToken) {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.status === 403) {
          naviGate("/forbiden");
        } else if (error.status === 401) {
          logOut()
            .then(() => {
              naviGate("/login");
            })
            .catch((err) => {
              console.log(err);
            });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
    };
  }, [user]);

  return axiosSecure;
};

export default UseAxiosSecure;
