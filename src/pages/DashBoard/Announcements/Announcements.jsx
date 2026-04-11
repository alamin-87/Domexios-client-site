import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  Megaphone,
  Calendar,
  ChevronRight,
  Clock,
  BellRing,
  Info,
  Layers,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const Announcements = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: announcements = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/announcements");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
          <BellRing
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600 animate-pulse"
            size={24}
          />
        </div>
        <p className="text-slate-400 font-bold animate-pulse uppercase tracking-widest text-xs">
          Fetching Broadcasts...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 p-8 text-center text-rose-500">
        <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-2">
          <Info size={32} />
        </div>
        <h3 className="text-xl font-bold">Transmission Error</h3>
        <p className="max-w-xs text-rose-400">
          We couldn't reach the announcement server. {error.message}
        </p>
      </div>
    );
  }

  // Sort announcements by newest first
  const sortedAnnouncements = [...announcements].reverse();

  return (
    <div className="p-4 md:p-8 space-y-10 animate-in fade-in duration-700 max-w-5xl mx-auto">
      {/* Immersive Header */}
      <div className="relative group p-8 md:p-12 bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-gray-100 overflow-hidden text-center md:text-left">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-indigo-100/50 transition-all duration-700"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-50/50 rounded-full -ml-10 -mb-10 blur-2xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 bg-indigo-600 shadow-2xl shadow-indigo-200 rounded-[2rem] flex items-center justify-center shrink-0 animate-in zoom-in-50 duration-500">
            <Megaphone className="text-white animate-bounce-subtle" size={42} />
          </div>
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                Resident Bulletin
              </span>
              <div className="flex gap-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-1 h-1 rounded-full bg-indigo-200"
                  ></div>
                ))}
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
              Community Broadcasts
            </h2>
            <p className="text-slate-500 mt-2 font-medium max-w-lg">
              Stay informed with the latest updates, maintenance schedules, and
              essential newsletters from the Domexis team.
            </p>
          </div>
        </div>
      </div>

      {sortedAnnouncements.length === 0 ? (
        <div className="bg-white p-20 rounded-[3rem] border border-dashed border-gray-200 text-center flex flex-col items-center">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-6">
            <Sparkles size={40} />
          </div>
          <h3 className="text-xl font-bold text-gray-400">Radios are Silent</h3>
          <p className="text-gray-400 text-sm mt-2 max-w-xs font-medium italic">
            No announcements have been published recently. Check back shortly!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 md:left-12 top-0 bottom-0 w-0.5 bg-slate-100 -translate-x-1/2 z-0 hidden sm:block"></div>

          {sortedAnnouncements.map(
            ({ _id, title, description, createdAt }, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={_id}
                className="group relative pl-0 sm:pl-24 group"
              >
                {/* Timeline Marker */}
                <div className="absolute left-1/2 md:left-12 top-8 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white bg-indigo-600 shadow-lg shadow-indigo-100 group-hover:scale-150 transition-transform duration-300 z-10 hidden sm:block"></div>

                <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm hover:shadow-2xl border border-gray-100 transition-all duration-500 relative overflow-hidden flex flex-col md:flex-row gap-6">
                  {/* Visual Accent */}
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500 group-hover:w-2 transition-all"></div>

                  <div className="flex-1 space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-slate-50 text-slate-400 rounded-xl group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-colors">
                          <Clock size={18} />
                        </div>
                        <h3 className="text-xl md:text-2xl font-black text-gray-800 transition-colors">
                          {title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-black text-slate-400/60 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                        <Calendar size={14} />
                        {new Date(createdAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </div>

                    <div className="relative">
                      <p className="text-slate-500 leading-relaxed text-lg whitespace-pre-line">
                        {description}
                      </p>
                    </div>

                    <div className="pt-4 flex items-center justify-between border-t border-slate-50">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] text-white font-bold">
                          DX
                        </div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Official System Notice
                        </span>
                      </div>
                      <button className="text-indigo-600 font-black text-xs uppercase tracking-widest flex items-center gap-1 hover:translate-x-1 transition-transform">
                        Acknowledgement <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ),
          )}
        </div>
      )}

      {/* Footer Insight */}
      <div className="bg-slate-900 rounded-[2rem] p-8 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <BellRing size={120} className="transform -rotate-12" />
        </div>
        <div className="relative z-10 max-w-lg mx-auto">
          <h4 className="text-white text-lg font-bold">Stay Notified</h4>
          <p className="text-slate-400 text-sm">
            We recommend checking this bulletin daily for operational changes,
            water/power maintenance, or community gatherings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
