import React from "react";
import { Outlet } from "react-router";
import authImg from "../assets/AuthImg.jpg";
import DomexiosLogo from "../pages/shared/domexisLogo/DomexiosLogo";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-base-200 p-6 lg:p-12">
      {/* Logo */}
      <div className="mb-6 flex items-start">
        <DomexiosLogo />
      </div>

      {/* Main Content */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-8">
        {/* Outlet (form side) */}
        <div className="w-full lg:w-1/2">
          <Outlet />
        </div>

        {/* Image side */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img src={authImg} alt="Auth Visual" className="max-w-xs lg:max-w-md rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
