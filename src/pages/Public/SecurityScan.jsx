import React, { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import { FaShieldAlt, FaCamera, FaUserCheck, FaExclamationCircle, FaSpinner } from "react-icons/fa";
import useAxios from "../../hooks/useAxios";

const SecurityScan = () => {
  const axiosInstance = useAxios();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/ai/security-scan");
        setTimeout(() => {
          setData(res.data);
          setLoading(false);
        }, 1200);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
      <section className="bg-gradient-to-br from-amber-600 via-orange-600 to-amber-600 py-16 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-900/40 text-amber-100 rounded-full text-xs font-black tracking-widest uppercase mb-4 border border-amber-300/30">
            <FaShieldAlt /> AI Security Engine
          </span>
          <h1 className="text-4xl font-black text-white mb-4">Smart Security <span className="text-amber-300 italic">Scan</span></h1>
          <p className="text-amber-100/90">Autonomous surveillance analytics and anomaly detection protecting your home 24/7.</p>
        </div>
      </section>

      <section className="py-12 max-w-4xl mx-auto px-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-amber-500">
            <div className="relative">
              <FaShieldAlt className="text-6xl mb-4 opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <FaSpinner className="animate-spin text-3xl mb-4 text-amber-400" />
              </div>
            </div>
            <p className="font-bold text-amber-500 animate-pulse tracking-widest uppercase text-xs">Scanning Perimeter...</p>
          </div>
        ) : data ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 shadow-xl">
                <div className="flex items-center gap-3 text-amber-500 mb-4">
                  <FaExclamationCircle className="text-xl" />
                  <h3 className="font-black text-sm uppercase tracking-widest text-slate-400">Threat Level</h3>
                </div>
                <p className="text-3xl font-black text-emerald-400">{data.threatLevel}</p>
              </div>

              <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 shadow-xl">
                <div className="flex items-center gap-3 text-blue-400 mb-4">
                  <FaCamera className="text-xl" />
                  <h3 className="font-black text-sm uppercase tracking-widest text-slate-400">Active Cameras</h3>
                </div>
                <p className="text-3xl font-black text-white">{data.activeCameras}<span className="text-sm text-slate-500 ml-2 font-bold uppercase tracking-widest">Online</span></p>
              </div>

              <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 shadow-xl">
                <div className="flex items-center gap-3 text-red-400 mb-4">
                  <FaExclamationCircle className="text-xl" />
                  <h3 className="font-black text-sm uppercase tracking-widest text-slate-400">Incidents (24h)</h3>
                </div>
                <p className="text-3xl font-black text-emerald-400">{data.incidentsPast24h}</p>
              </div>
            </div>

            <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-xl">
              <h3 className="text-lg font-black text-white mb-6 flex items-center gap-2"><FaUserCheck className="text-amber-500" /> Live Facial Recognition Logs</h3>
              <div className="space-y-4">
                {data.facialRecognitionLogs.map((log, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-slate-900 rounded-2xl gap-4 border border-slate-700/50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-500"><FaUserCheck /></div>
                      <div>
                        <p className="font-bold text-white text-sm">{log.event}</p>
                        <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">{log.time}</p>
                      </div>
                    </div>
                    <div>
                      {log.status === "Verified" ? (
                        <span className="px-3 py-1 bg-emerald-900/50 text-emerald-400 border border-emerald-800/50 rounded-full text-[10px] font-black uppercase tracking-widest">{log.status}</span>
                      ) : (
                        <span className="px-3 py-1 bg-blue-900/50 text-blue-400 border border-blue-800/50 rounded-full text-[10px] font-black uppercase tracking-widest">{log.status}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        ) : (
          <p className="text-center text-slate-500 font-bold">Failed to connect to Security engine.</p>
        )}
      </section>
    </div>
  );
};
export default SecurityScan;
