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
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import {
  CreditCard,
  TrendingUp,
  ArrowDownCircle,
  CheckCircle2,
  Building,
  Calendar,
  Layers,
  MapPin,
  Search,
  Wallet,
  ArrowUpRight,
  Filter,
} from "lucide-react";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: payments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["payment-history", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/user/${user.email}`);
      return res.data;
    },
  });

  // Calculate statistics
  const stats = useMemo(() => {
    const totalPaid = payments.reduce(
      (acc, curr) => acc + (curr.paidAmount || 0),
      0,
    );
    const totalSavings = payments.reduce(
      (acc, curr) => acc + (curr.discount || 0),
      0,
    );
    const lastPayment = payments.length > 0 ? payments[0].paidAmount : 0;

    // Chart data processing (last 6 months or all)
    const chartData = [...payments].reverse().map((p) => ({
      date: new Date(p.paidAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      amount: p.paidAmount,
      rent: p.rent,
    }));

    return { totalPaid, totalSavings, lastPayment, chartData };
  }, [payments]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="text-slate-400 font-bold animate-pulse text-xs uppercase tracking-[0.2em]">
          Analyzing Assets...
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-10 animate-in fade-in duration-700 max-w-7xl mx-auto">
      {/* Header & Immersive Hero */}
      <div className="relative overflow-hidden bg-slate-900 rounded-[3rem] p-10 lg:p-14 text-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full -mr-32 -mt-32 blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full -ml-32 -mb-32 blur-[100px]"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10 text-indigo-300">
              <TrendingUp size={12} />
              Financial Performance
            </div>
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter leading-none">
              Transaction <br /> History
            </h2>
            <p className="text-slate-400 font-medium max-w-sm text-sm lg:text-base">
              Track your residential investments, monthly dues, and promotional
              savings in real-time.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <div className="h-14 w-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/20">
                <Wallet className="text-white" size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                  Cumulative Outflow
                </p>
                <p className="text-2xl font-black tracking-tight">
                  {stats.totalPaid} TK
                </p>
              </div>
            </div>
          </div>

          <div className="h-[250px] lg:h-[350px] w-full bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-6 lg:p-8 relative">
            <div className="absolute top-6 left-8">
              <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400">
                Payment Trend
              </p>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.chartData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#ffffff10"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  stroke="#64748b"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value} TK`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #1e293b",
                    borderRadius: "1rem",
                    fontSize: "11px",
                    color: "#fff",
                  }}
                  itemStyle={{ color: "#6366f1" }}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#6366f1"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorAmount)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center justify-between group hover:border-indigo-600 transition-all duration-500">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Total Savings
            </p>
            <h3 className="text-3xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase">
              {stats.totalSavings} TK
            </h3>
          </div>
          <div className="h-14 w-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
            <ArrowDownCircle size={24} />
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center justify-between group hover:border-indigo-600 transition-all duration-500">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Transactions
            </p>
            <h3 className="text-3xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase">
              {payments.length}
            </h3>
          </div>
          <div className="h-14 w-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
            <CreditCard size={24} />
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center justify-between group hover:border-indigo-600 transition-all duration-500">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Efficiency
            </p>
            <h3 className="text-3xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase">
              100%
            </h3>
          </div>
          <div className="h-14 w-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
            <CheckCircle2 size={24} />
          </div>
        </div>
      </div>

      {/* Modern Transaction List */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
            <ArrowUpRight className="text-indigo-600" />
            Recent Activity
          </h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Filter by Apt..."
                className="pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-xs font-bold outline-none focus:border-indigo-600 transition-all shadow-sm"
              />
            </div>
            <button className="p-3 bg-white border border-gray-100 rounded-2xl text-slate-400 hover:text-indigo-600 transition-all shadow-sm">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-gray-100">
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Residency Details
                  </th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                    Protocol Status
                  </th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Financials
                  </th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                    Verification
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {payments.map((payment) => (
                  <tr
                    key={payment._id}
                    className="group hover:bg-slate-50/50 transition-all"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                          <Building size={20} />
                        </div>
                        <div className="space-y-0.5">
                          <p className="font-black text-slate-900">
                            Apartment {payment.apartmentNo}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            <Layers size={12} /> Floor {payment.floorNo}
                            <span className="text-slate-200">|</span>
                            <MapPin size={12} /> {payment.blockName} Block
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-indigo-50 text-indigo-600 border border-indigo-100 inline-flex items-center gap-2">
                        <CheckCircle2 size={12} />
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        <p className="text-sm font-black text-slate-900">
                          {payment.paidAmount} TK
                        </p>
                        <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                          Saved {payment.discount} TK
                        </p>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-600 flex items-center justify-end gap-1.5 shadow-indigo-100">
                          <Calendar size={12} className="text-slate-300" />
                          {new Date(payment.paidAt).toLocaleDateString("en-GB")}
                        </p>
                        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                          Audit ID: {payment._id.slice(-6)}
                        </p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {payments.length === 0 && (
            <div className="p-20 text-center space-y-4">
              <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200">
                <TrendingUp size={32} />
              </div>
              <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">
                No transaction records detected
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
