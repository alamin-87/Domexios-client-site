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
import UseAuth from "../hooks/UseAuth";
import DomexiosLogo from "../pages/shared/domexisLogo/DomexiosLogo";
import useUserRole from "../hooks/useUserRole";
import { motion as Motion } from "framer-motion";

const DashboardLayout = () => {
  const { user } = UseAuth();
  const { role, isRoleLoading } = useUserRole();
  console.log(role);

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
      <div className="drawer-content flex flex-col">
        {/* Navbar for smaller screens */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 font-bold text-lg">
            Domexios Dashboard
          </div>
        </div>

        {/* Main Content */}
        <Outlet />
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-[101]">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <div className="w-80 min-h-full bg-white border-r border-slate-100 flex flex-col">
          {/* Sidebar Header */}
          <div className="p-8 border-b border-slate-50">
            <DomexiosLogo />
          </div>

          {/* Identity Section */}
          <div className="p-8">
            <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 blur-2xl -mr-10 -mt-10"></div>
              
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-20 h-20 rounded-[1.5rem] border-4 border-white shadow-xl overflow-hidden mb-4">
                  <img src={user?.photoURL || "/default-avatar.png"} alt="User" className="w-full h-full object-cover" />
                </div>
                
                <h3 className="font-black text-slate-900 leading-tight">{user?.displayName}</h3>
                <p className="text-[10px] text-slate-400 font-bold truncate w-full mt-1 mb-4">{user?.email}</p>
                
                {/* Role Badge */}
                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.15em] shadow-sm ${
                  role === "admin" ? "bg-slate-900 text-white" :
                  role === "member" ? "bg-emerald-500 text-white" :
                  "bg-blue-100 text-blue-600"
                }`}>
                  {role === "admin" ? "Tower Administrator" : 
                   role === "member" ? "Elite Resident" : 
                   "Registered User"}
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
