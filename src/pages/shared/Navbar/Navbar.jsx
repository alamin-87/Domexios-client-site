import { Link, NavLink } from "react-router";
import {
  FaHome,
  FaBuilding,
  FaSignInAlt,
  FaTachometerAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import UseAuth from "../../../hooks/UseAuth";
import DomexiosLogo from "../domexisLogo/DomexiosLogo";

const Navbar = () => {
  const { user, logOut } = UseAuth(); // { user, logout }

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : ""
          }
        >
          <FaHome className="inline-block mr-1" /> Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/apartmentList"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : ""
          }
        >
          <FaBuilding className="inline-block mr-1" /> Apartment
        </NavLink>
      </li>
    </>
  );
   const handelLogOut = () => {
    logOut()
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
      {/* Left: Logo + Name */}
      <div className="navbar-start">
        <DomexiosLogo></DomexiosLogo>
      </div>

      {/* Center: Navigation Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>

      {/* Mobile Dropdown Menu Button */}
      <div className="navbar-center lg:hidden">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
      </div>

      {/* Right: Login or Profile */}
      <div className="navbar-end">
        {!user ? (
          <Link to="/login" className="btn btn-ghost text-xl" title="Login">
            <FaSignInAlt />
          </Link>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img src={user.photoURL || "/default-avatar.png"} alt="User" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li className="pointer-events-none text-center font-semibold">
                {user.displayName}
              </li>
              <li>
                <NavLink to="/dashboard">
                  <FaTachometerAlt /> Dashboard
                </NavLink>
              </li>
              <li>
                <button onClick={handelLogOut} className="flex items-center gap-2">
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
