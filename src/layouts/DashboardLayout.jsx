import React from "react";
import { NavLink, Outlet } from "react-router";
import {
  FaUser,
  FaCreditCard,
  FaHistory,
  FaBullhorn,
  FaUserShield,
  FaUsers,
  FaNewspaper,
  FaHandshake,
  FaGift,
  FaHome,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import DomexisLogo from "../pages/shared/domexisLogo/DomexisLogo";
import useUserRole from "../hooks/useUserRole";
import { motion as Motion } from "framer-motion";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const { role, isRoleLoading } = useUserRole();

  if (isRoleLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const panels = {
    user: {
      label: "User Panel",
      links: [
        {
          to: "/dashboard/profile",
          icon: <FaUser className="inline-block mr-2" />,
          text: "My Profile",
        },
        {
          to: "/dashboard/my-requests",
          icon: <FaHandshake className="inline-block mr-2" />,
          text: "My Requests",
        },
        {
          to: "/dashboard/make-payment",
          icon: <FaCreditCard className="inline-block mr-2" />,
          text: "Make Payment",
        },
        {
          to: "/dashboard/announcements",
          icon: <FaBullhorn className="inline-block mr-2" />,
          text: "Announcements",
        },
      ],
    },
    member: {
      label: "Member Panel",
      links: [
        {
          to: "/dashboard/profile",
          icon: <FaUser className="inline-block mr-2" />,
          text: "Member Profile",
        },
        {
          to: "/dashboard/make-payment",
          icon: <FaCreditCard className="inline-block mr-2" />,
          text: "Make Payment",
        },
        {
          to: "/dashboard/payment-history",
          icon: <FaHistory className="inline-block mr-2" />,
          text: "Payment History",
        },
        {
          to: "/dashboard/announcements",
          icon: <FaBullhorn className="inline-block mr-2" />,
          text: "Announcements",
        },
      ],
    },
    admin: {
      label: "Admin Panel",
      links: [
        {
          to: "/dashboard/admin-profile",
          icon: <FaUserShield className="inline-block mr-2" />,
          text: "Admin Profile",
        },
        {
          to: "/dashboard/manage-members",
          icon: <FaUsers className="inline-block mr-2" />,
          text: "Manage Members",
        },
        {
          to: "/dashboard/make-announcement",
          icon: <FaNewspaper className="inline-block mr-2" />,
          text: "Make Announcement",
        },
        {
          to: "/dashboard/agreement-requests",
          icon: <FaHandshake className="inline-block mr-2" />,
          text: "Agreement Requests",
        },
        {
          to: "/dashboard/manage-coupons",
          icon: <FaGift className="inline-block mr-2" />,
          text: "Manage Coupons",
        },
      ],
    },
  };

  const panelsToShow =
    role === "admin"
      ? ["admin"]
      : role === "member"
        ? ["member"]
        : role === "user"
          ? ["user"]
          : [];

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col bg-[#FDFDFD]">
        {/* Modern Top Header */}
        <header className="h-24 bg-white/80 backdrop-blur-xl border-b border-slate-100 flex items-center justify-between px-8 md:px-12 sticky top-0 z-50">
          <div className="flex items-center gap-4">
            {/* Mobile Drawer Trigger */}
            <label
              htmlFor="my-drawer-2"
              className="lg:hidden p-3 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-slate-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <div className="hidden md:block">
              <h2 className="text-xl font-black text-slate-900 leading-tight">
                Domexis <span className="text-blue-600">Portal</span>
              </h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                Role: {role}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Simple Notifications Placeholder */}
            <div className="hidden sm:flex w-12 h-12 bg-slate-50 text-slate-500 rounded-2xl items-center justify-center cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-all border border-transparent hover:border-blue-100">
              <div className="relative">
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
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v1m6 0H9"
                  />
                </svg>
                <span className="absolute top-0 right-0 w-2 h-2 bg-blue-600 rounded-full border-2 border-white"></span>
              </div>
            </div>

            {/* Profile Dropdown */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="flex items-center gap-3 p-1.5 pr-4 bg-slate-50 hover:bg-slate-100 transition-all rounded-full cursor-pointer border border-transparent hover:border-slate-200"
              >
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-sm">
                  <img
                    src={user?.photoURL || "https://i.ibb.co/2YjNZ3t/user.png"}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-xs font-black text-slate-900 truncate max-w-[100px]">
                    {user?.displayName?.split(" ")[0]}
                  </p>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">
                    Verified
                  </p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[200] menu p-3 shadow-2xl bg-white border border-slate-100 rounded-[1.5rem] w-64 mt-4 space-y-1"
              >
                <div className="px-4 py-3 border-b border-slate-50 mb-2">
                  <p className="text-xs font-black text-slate-900">
                    {user?.displayName}
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold truncate">
                    {user?.email}
                  </p>
                </div>
                <li>
                  <NavLink
                    to="/dashboard/profile"
                    className="flex items-center gap-3 py-3 px-4 rounded-xl font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
                  >
                    <FaUser size={14} /> My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/"
                    className="flex items-center gap-3 py-3 px-4 rounded-xl font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all"
                  >
                    <FaHome size={14} /> Back to Site
                  </NavLink>
                </li>
                <div className="border-t border-slate-50 mt-2 pt-2">
                  <li>
                    <button
                      onClick={logOut}
                      className="flex items-center gap-3 py-3 px-4 rounded-xl font-bold text-rose-500 hover:bg-rose-50 transition-all"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Sign Out
                    </button>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-[101]">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <div className="w-80 min-h-full bg-white border-r border-slate-100 flex flex-col">
          {/* Sidebar Header */}
          <div className="p-8 border-b border-slate-50">
            <DomexisLogo />
          </div>

          {/* Identity Section */}
          <div className="p-8">
            <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 blur-2xl -mr-10 -mt-10"></div>

              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-20 h-20 rounded-[1.5rem] border-4 border-white shadow-xl overflow-hidden mb-4">
                  <img
                    src={user?.photoURL || "https://i.ibb.co/2YjNZ3t/user.png"}
                    alt="User"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://i.ibb.co/2YjNZ3t/user.png";
                    }}
                  />
                </div>

                <h3 className="font-black text-slate-900 leading-tight">
                  {user?.displayName}
                </h3>
                <p className="text-[10px] text-slate-400 font-bold truncate w-full mt-1 mb-4">
                  {user?.email}
                </p>

                {/* Role Badge */}
                <span
                  className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.15em] shadow-sm ${
                    role === "admin"
                      ? "bg-slate-900 text-white"
                      : role === "member"
                        ? "bg-emerald-500 text-white"
                        : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {role === "admin"
                    ? "Tower Administrator"
                    : role === "member"
                      ? "Elite Resident"
                      : "Registered User"}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <ul className="menu px-6 space-y-2 flex-grow">
            {panelsToShow.map((panelKey) => {
              const panel = panels[panelKey];
              return (
                <React.Fragment key={panelKey}>
                  <li className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mt-8 mb-2 ml-4">
                    {panel.label}
                  </li>
                  {panel.links.map(({ to, icon, text }) => (
                    <li key={to}>
                      <NavLink
                        to={to}
                        className={({ isActive }) =>
                          `flex items-center gap-4 px-6 py-3.5 rounded-2xl transition-all duration-300 font-bold ${
                            isActive
                              ? "bg-slate-900 text-white shadow-2xl shadow-slate-200 translate-x-1"
                              : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                          }`
                        }
                      >
                        <span className="text-lg">{icon}</span>
                        <span className="text-sm">{text}</span>
                      </NavLink>
                    </li>
                  ))}
                </React.Fragment>
              );
            })}
          </ul>

          {/* Sidebar Footer */}
          <div className="p-8 border-t border-slate-50">
            <NavLink
              to="/"
              className="flex items-center justify-center gap-3 w-full py-4 bg-blue-50 text-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm"
            >
              <FaHome className="text-lg" />
              Return Home
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
