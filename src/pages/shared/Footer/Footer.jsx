import React from "react";
import { NavLink } from "react-router";
import { FaFacebookF, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import logo from "../../../assets/logo.png"; // Adjust path to your logo

const Footer = () => {
  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "link link-hover text-blue-600 font-medium"
      : "link link-hover";

  return (
    <footer className="bg-base-200 text-base-content mt-10">
      <div className="footer p-10 max-w-7xl mx-auto flex flex-col lg:flex-row justify-between">
        {/* Logo & About */}
        <div className="max-w-xs">
          <div className="flex items-center gap-2 mb-2">
            <img src={logo} alt="Logo" className="w-10 h-10" />
            <span className="text-xl font-bold">Domexios</span>
          </div>
          <p className="text-sm text-slate-600">
            Simplifying building management with smart solutions. Designed for single-building owners and tenants.
          </p>
        </div>

        {/* NavLinks */}
        <div>
          <span className="footer-title">Quick Links</span>
          <NavLink to="/" className={navLinkStyle}>Home</NavLink>
          <NavLink to="/apartmentList" className={navLinkStyle}>Apartment</NavLink>
          <NavLink to="/dashboard" className={navLinkStyle}>Dashboard</NavLink>
          <NavLink to="/contact" className={navLinkStyle}>Contact</NavLink>
        </div>

        {/* Social Media */}
        <div>
          <span className="footer-title">Connect with us</span>
          <div className="flex gap-4 text-xl mt-2">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-600">
              <FaLinkedin />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-gray-800">
              <FaGithub />
            </a>
            <a href="mailto:support@domexios.com" className="hover:text-red-500">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center p-4 border-t text-sm text-gray-500">
        © {new Date().getFullYear()} Domexios — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
