import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  Building2,
  CheckCircle2,
  XCircle,
  Users,
  UserCheck,
  ShieldCheck,
  LayoutDashboard,
  Mail,
  User,
} from "lucide-react";
import { ProfileSkeleton } from "../../../components/common/Skeleton";

const AdminProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch all users
  const { data: users = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Fetch all apartments
  const { data: apartments = [], isLoading: loadingApartments } = useQuery({
    queryKey: ["all-apartments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/apartment");
      return res.data;
    },
  });

  if (loadingUsers || loadingApartments) {
    return <ProfileSkeleton />;
  }

  const admins = users.filter((u) => u.role === "admin");
  const currentAdmin = admins.find((a) => a.email === user?.email);
  const totalUsersCount = users.filter((u) => u.role === "user").length;
  const totalMembersCount = users.filter((u) => u.role === "member").length;

  // Apartment stats
  const totalApartments = apartments.length;
  const availableApartments = apartments.filter(
    (a) => a.availability === true,
  ).length;
  const unavailableApartments = apartments.filter(
    (a) => a.availability === false,
  ).length;

  // Chart Data
  const pieData = [
    { name: "Available", value: availableApartments },
    { name: "Unavailable", value: unavailableApartments },
  ];

  const barData = [
    { name: "Users", count: totalUsersCount, fill: "#3B82F6" },
    { name: "Members", count: totalMembersCount, fill: "#8B5CF6" },
    { name: "Admins", count: admins.length, fill: "#EC4899" },
  ];

  const COLORS = ["#10B981", "#EF4444"];

  const StatCard = ({ title, value, icon: Icon, colorClass, bgColorClass }) => (
    <div
      className={`p-6 rounded-2xl shadow-sm border border-white/20 backdrop-blur-md bg-white flex items-center justify-between group hover:shadow-lg transition-all duration-300`}
    >
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
      <div
        className={`p-4 rounded-xl ${bgColorClass} ${colorClass} group-hover:scale-110 transition-transform`}
      >
        <Icon size={24} />
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-8 min-h-screen bg-slate-50/50 space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <LayoutDashboard className="text-indigo-600" /> Administrative
            Overview
          </h1>
          <p className="text-gray-500 mt-1">
            Real-time stats and management summary for Domexis.
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 pr-6 rounded-full shadow-sm border border-gray-100">
          <img
            src={user?.photoURL}
            alt="Admin"
            className="w-12 h-12 rounded-full border-2 border-indigo-100"
          />
          <div>
            <p className="font-bold text-gray-800 text-sm leading-none">
              {user?.displayName || "Admin User"}
            </p>
            <p className="text-gray-400 text-xs mt-1 lowercase">Master Admin</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          title="Total Apartments"
          value={totalApartments}
          icon={Building2}
          colorClass="text-blue-600"
          bgColorClass="bg-blue-100"
        />
        <StatCard
          title="Available"
          value={availableApartments}
          icon={CheckCircle2}
          colorClass="text-emerald-600"
          bgColorClass="bg-emerald-100"
        />
        <StatCard
          title="Unavailable"
          value={unavailableApartments}
          icon={XCircle}
          colorClass="text-rose-600"
          bgColorClass="bg-rose-100"
        />
        <StatCard
          title="Total Users"
          value={totalUsersCount}
          icon={Users}
          colorClass="text-amber-600"
          bgColorClass="bg-amber-100"
        />
        <StatCard
          title="Total Members"
          value={totalMembersCount}
          icon={UserCheck}
          colorClass="text-indigo-600"
          bgColorClass="bg-indigo-100"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-6 text-gray-800 flex items-center gap-2">
            Apartment Availability
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <RechartsTooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Legend
                  iconType="circle"
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-6 text-gray-800">
            User Role Distribution
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />
                <RechartsTooltip
                  cursor={{ fill: "#f8fafc" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={50}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Admin Table Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Admin Personnel
            </h3>
            <p className="text-sm text-gray-500">
              System administrators with full access.
            </p>
          </div>
          <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">
            {admins.length} Active
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Admin
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                  Access Level
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {admins.map((admin) => (
                <tr
                  key={admin._id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={
                            admin.photoURL ||
                            "https://i.ibb.co/2YjNZ3t/user.png"
                          }
                          alt={admin.displayName}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">
                          {admin.displayName || "Unknown User"}
                        </p>
                        <p className="text-xs text-gray-400 capitalize">
                          {admin.role}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-gray-400" />
                      {admin.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
                      <ShieldCheck size={12} />
                      Full Access
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
