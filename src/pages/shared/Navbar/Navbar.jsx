import { Link, NavLink } from "react-router";
import {
  FaHome,
  FaBuilding,
  FaSignInAlt,
  FaTachometerAlt,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { Info, Waves, Camera, HelpCircle, Phone } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import DomexisLogo from "../domexisLogo/DomexisLogo";
import { motion as Motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              isActive
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
            }`
          }
        >
          <FaHome className="text-lg" /> <span>Home</span>
        </NavLink>
      </li>

      {/* Advanced Dropdown Menu */}
      <li className="dropdown dropdown-hover group">
        <div
          tabIndex={0}
          role="button"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all"
        >
          <FaBuilding className="text-lg" /> <span>Residency</span>
          <svg
            className="w-4 h-4 transition-transform group-hover:rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-50 menu p-4 shadow-2xl bg-white rounded-3xl w-56 border border-slate-100 ring-1 ring-black/5 gap-2"
        >
          <li>
            <NavLink
              to="/apartmentList"
              className="rounded-xl py-3 px-4 hover:bg-blue-50 hover:text-blue-600 font-bold transition-all"
            >
              Available Units
            </NavLink>
          </li>
          <li>
            <Link
              to="/amenities"
              className="rounded-xl py-3 px-4 hover:bg-blue-50 hover:text-blue-600 font-bold transition-all"
            >
              Building Perks
            </Link>
          </li>
        </ul>
      </li>

      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              isActive
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
            }`
          }
        >
          <Info size={18} /> <span>About</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/amenities"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              isActive
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
            }`
          }
        >
          <Waves size={18} /> <span>Lifestyle</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/gallery"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              isActive
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
            }`
          }
        >
          <Camera size={18} /> <span>Gallery</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/support"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              isActive
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
            }`
          }
        >
          <HelpCircle size={18} /> <span>Support</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              isActive
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
            }`
          }
        >
          <Phone size={18} /> <span>Contact</span>
        </NavLink>
      </li>
    </>
  );

  const handleLogOut = () => {
    logOut()
      .then(() => console.log("Logged out"))
      .catch((error) => console.error(error));
  };

  return (
    <nav className="sticky top-0 z-[100] w-full px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl rounded-[2rem] px-6 py-2">
        {/* Left: Logo */}
        <div className="flex-1 lg:flex-none">
          <DomexisLogo />
        </div>

        {/* Center: Desktop Links */}
        <div className="hidden lg:flex flex-1 justify-center">
          <ul className="flex items-center gap-2 font-medium">{navLinks}</ul>
        </div>

        {/* Right: Auth / Mobile Toggle */}
        <div className="flex items-center gap-2">
          {/* User Menu */}
          {!user ? (
            <Link
              to="/login"
              className="px-6 py-2.5 bg-slate-900 text-white rounded-full font-bold hover:bg-black transition-all shadow-lg hover:shadow-slate-300 flex items-center gap-2"
            >
              Sign In <FaSignInAlt className="text-sm" />
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <Motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar border-2 border-blue-100 hover:border-blue-400 p-0.5"
              >
                <div className="w-full rounded-full ring ring-offset-2 ring-blue-500/10">
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt="User"
                  />
                </div>
              </Motion.div>
              <ul
                tabIndex={0}
                className="mt-4 p-4 shadow-2xl menu menu-sm dropdown-content bg-white/95 backdrop-blur-xl rounded-[2rem] w-64 border border-slate-100 ring-1 ring-black/5"
              >
                <div className="px-4 py-3 border-b border-slate-100 mb-2">
                  <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-1">
                    Authenticated
                  </p>
                  <p className="font-bold text-slate-900 truncate">
                    {user.displayName}
                  </p>
                </div>
                <li>
                  <NavLink
                    to="/dashboard"
                    className="rounded-xl py-3 flex items-center gap-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                      <FaTachometerAlt />
                    </div>
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="rounded-xl py-3 flex items-center gap-3 text-red-600 hover:bg-red-50 mt-1"
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                      <FaSignOutAlt />
                    </div>
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <div className="dropdown dropdown-end lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-4 p-4 shadow-2xl bg-white/95 backdrop-blur-xl rounded-[2rem] w-52 border border-slate-100 ring-1 ring-black/5 gap-2"
            >
              {navLinks}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
