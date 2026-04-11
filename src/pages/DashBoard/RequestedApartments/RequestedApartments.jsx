import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import {
  ClipboardList,
  Clock,
  MapPin,
  Layers,
  Building,
  Banknote,
  SearchX,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const RequestedApartments = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["my-requested-agreements", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      // Fetch agreements with 'requested' status for this specific user
      const res = await axiosSecure.get(
        `/agreements/user/${user.email}/pending`,
      );
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="text-slate-400 font-bold animate-pulse text-xs uppercase tracking-widest">
          Syncing Leases...
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-10 animate-in fade-in duration-700 max-w-6xl mx-auto">
      {/* Premium Header */}
      <div className="relative group p-10 bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 border border-gray-100 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full -mr-20 -mt-20 blur-3xl"></div>

        <div className="relative z-10 space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Application Tracking
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            Apartment Requests
          </h2>
          <p className="text-slate-500 font-medium max-w-lg">
            Track the real-time status of your residential lease applications
            and upcoming property assignments.
          </p>
        </div>

        <div className="relative z-10 bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl flex flex-col items-center text-center space-y-1">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">
            Pending
          </span>
          <span className="text-4xl font-black">
            {requests.filter((r) => r.agreement === "requested").length}
          </span>
          <span className="text-[10px] font-bold opacity-40 italic">
            Queued for Review
          </span>
        </div>
      </div>

      {requests.length === 0 ? (
        <div className="bg-white p-20 rounded-[3rem] border border-dashed border-gray-200 text-center space-y-6">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200">
            <SearchX size={48} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-900">
              No Active Requests
            </h3>
            <p className="text-slate-400 font-medium max-w-xs mx-auto italic">
              You haven't submitted any lease applications yet. Explore our
              listings to find your perfect home.
            </p>
          </div>
          <button className="bg-indigo-600 hover:bg-black text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-indigo-100">
            Browse Apartments
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {requests.map((req, index) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              key={req._id}
              className="bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl border border-gray-100 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-bl-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>

              <div className="relative space-y-6">
                <div className="flex items-start justify-between">
                  <div className="p-4 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-100 transition-transform group-hover:-rotate-6">
                    <Building size={24} />
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                      Request State
                    </span>
                    <span
                      className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        req.agreement === "requested"
                          ? "bg-amber-100 text-amber-600 border border-amber-100"
                          : "bg-emerald-100 text-emerald-600 border border-emerald-100"
                      }`}
                    >
                      {req.agreement === "requested"
                        ? "Pending Approval"
                        : "Verified"}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-slate-900">
                    Apt {req.apartmentNo}
                  </h3>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-wider">
                      <MapPin size={14} className="text-indigo-400" />
                      Block {req.blockName}
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-wider">
                      <Layers size={14} className="text-indigo-400" />
                      Floor {req.floorNo}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Base Rent
                    </span>
                    <span className="text-xl font-black text-slate-900">
                      {req.rent} TK/mo
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                    <Clock size={14} />
                    {new Date(req.createdAt || Date.now()).toLocaleDateString()}
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-slate-400">
                    <Sparkles size={16} />
                  </div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
                    {req.agreement === "requested"
                      ? "Your application is currently being audited by the tower administration."
                      : "Lease confirmed. Proceed to the payment portal to finalize moves."}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestedApartments;
