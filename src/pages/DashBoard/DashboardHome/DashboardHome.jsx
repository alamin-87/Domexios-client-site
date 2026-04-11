import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { Users, Home, TrendingUp, Building2, Layers } from "lucide-react";

const DashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: users = [] } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  const { data: apartments = [] } = useQuery({
    queryKey: ["all-apartments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/apartment");
      return res.data;
    },
  });
  const { data: agreements = [] } = useQuery({
    queryKey: ["all-agreements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/agreements");
      return res.data;
    },
  });

  const stats = useMemo(() => {
    const totalUsers = users.length;
    const membersCount = users.filter((u) => u.role === "member").length;
    const totalApartments = apartments.length;

    // Calculate Rented vs Available
    const rentedCount = agreements.filter((a) => a.status === "checked").length;
    const availableCount =
      totalApartments > 0 ? totalApartments - rentedCount : 0;

    const pieData = [
      { name: "Rented", value: rentedCount, color: "#6366f1" },
      { name: "Available", value: availableCount, color: "#e2e8f0" },
    ];

    // Dummy revenue data for the chart (or we can use agreement data)
    const revenueData = agreements
      .map((agr, idx) => ({
        name: `Apt ${agr.apartmentNo}`,
        rent: parseInt(agr.rent) || 0,
      }))
      .slice(0, 10);

    return { totalUsers, membersCount, totalApartments, pieData, revenueData };
  }, [users, apartments, agreements]);

  return (
    <div className="p-8 lg:p-12 space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Overview <span className="text-indigo-600">Analytics</span>
        </h1>
        <p className="text-slate-500 font-medium">
          Real-time system statistics and metrics.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Total Users
            </p>
            <p className="text-4xl font-black text-slate-900">
              {stats.totalUsers}
            </p>
          </div>
          <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
            <Users size={32} />
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Elite Members
            </p>
            <p className="text-4xl font-black text-slate-900">
              {stats.membersCount}
            </p>
          </div>
          <div className="h-16 w-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
            <Building2 size={32} />
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Total Apartments
            </p>
            <p className="text-4xl font-black text-slate-900">
              {stats.totalApartments}
            </p>
          </div>
          <div className="h-16 w-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
            <Home size={32} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
          <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-indigo-600" /> Revenue Metrics
          </h3>
          <div className="w-full h-[300px]">
            <ResponsiveContainer>
              <BarChart data={stats.revenueData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#94a3b8" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#94a3b8" }}
                />
                <RechartsTooltip
                  cursor={{ fill: "#f8fafc" }}
                  contentStyle={{
                    borderRadius: "1rem",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar dataKey="rent" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Occupancy Pie Chart */}
        <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
          <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
            <Layers size={20} className="text-indigo-600" /> Occupancy Rate
          </h3>
          <div className="w-full h-[250px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={stats.pieData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stats.pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip
                  contentStyle={{
                    borderRadius: "1rem",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {stats.pieData.map((entry, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-xs font-bold text-slate-500">
                  {entry.name} ({entry.value})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Data Table: Recent Agreements */}
      <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
        <h3 className="text-lg font-black text-slate-900 mb-6">
          Recent Lease Activity
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <th className="pb-4 pt-2 px-4">Resident Email</th>
                <th className="pb-4 pt-2 px-4">Apt Number</th>
                <th className="pb-4 pt-2 px-4">Block / Floor</th>
                <th className="pb-4 pt-2 px-4">M. Rent</th>
                <th className="pb-4 pt-2 px-4">Lease Status</th>
              </tr>
            </thead>
            <tbody>
              {agreements.length > 0 ? (
                agreements.slice(0, 5).map((agr, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-4 px-4 font-bold text-slate-700 text-sm">
                      {agr.userEmail}
                    </td>
                    <td className="py-4 px-4 font-black text-indigo-600">
                      {agr.apartmentNo}
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-700 text-sm">
                      {agr.blockName} / {agr.floorNo}
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-700 text-sm">
                      ${agr.rent}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          agr.status === "checked"
                            ? "bg-emerald-100 text-emerald-600"
                            : agr.status === "pending"
                              ? "bg-amber-100 text-amber-600"
                              : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {agr.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="py-8 text-center text-slate-400 font-medium"
                  >
                    No recent lease activity found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
