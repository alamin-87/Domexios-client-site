import React from "react";
import { Link } from "react-router";
import logo from "../../../assets/logo.png";

const DomexisLogo = () => {
  return (
    <Link to="/" className="inline-block">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center p-2 shadow-lg shadow-blue-200">
           <img src={logo} alt="Domexis" className="w-full h-full object-contain brightness-0 invert" />
        </div>
        <span className="text-2xl font-black text-slate-900 tracking-tight italic">
          Dom<span className="text-blue-600 not-italic">exis</span>
        </span>
      </div>
    </Link>
  );
};

export default DomexisLogo;
