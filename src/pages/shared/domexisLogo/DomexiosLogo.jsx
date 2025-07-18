import React from "react";
import { Link } from "react-router";
import logo from "../../../assets/logo.png";

const DomexiosLogo = () => {
  return (
    <>
      <Link to="/">
        <div className="flex items-center gap-2 mb-2">
          <img src={logo} alt="Logo" className="w-10 h-10" />
          <span className="text-xl font-bold">Domexios</span>
        </div>
      </Link>
    </>
  );
};

export default DomexiosLogo;
