import React, { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import { FaRobot, FaHardHat, FaWrench, FaExclamationTriangle, FaCheckCircle, FaSpinner, FaBuilding } from "react-icons/fa";
import useAxios from "../../hooks/useAxios";

const MaintenancePredictor = () => {
  const axiosInstance = useAxios();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/ai/maintenance-predict");
        setTimeout(() => {
          setData(res.data);
          setLoading(false);
        }, 1000); // UI delay for AI processing effect
      } catch (err) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-900 py-16 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-600/30 text-emerald-200 rounded-full text-xs font-black tracking-widest uppercase mb-4 border border-emerald-500/30">
            <FaRobot /> AI Operations — BETA
          </span>
          <h1 className="text-4xl font-black text-white mb-4">Maintenance <span className="text-emerald-400 italic">Predictor</span></h1>
          <p className="text-emerald-200/80">Predictive AI monitors building systems to forecast needs before they disrupt your day.</p>
        </div>
      </section>

      <section className="py-12 max-w-4xl mx-auto px-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-emerald-600">
            <FaSpinner className="animate-spin text-4xl mb-4" />
            <p className="font-bold text-slate-500 animate-pulse">Running Diagnostic Sequence...</p>
          </div>
        ) : data ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Overall Building Health</p>
                  <p className="text-4xl font-black text-emerald-500 mt-2">{data.buildingHealth}%</p>
                </div>
                <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center text-2xl">
                  <FaCheckCircle />
                </div>
              </div>
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Units Monitored</p>
                  <p className="text-4xl font-black text-slate-800 mt-2">{data.apartmentsMonitored}</p>
                </div>
                <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center text-2xl">
                  <FaBuilding />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2"><FaWrench className="text-emerald-500" /> System Diagnostics</h3>
              <div className="space-y-4">
                {data.systems.map((sys, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-slate-50 rounded-2xl gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-black text-slate-800">{sys.name}</span>
                        {sys.status === "Warning" ? <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-amber-100 text-amber-700">Warning</span> : <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-emerald-100 text-emerald-700">Healthy</span>}
                      </div>
                      <p className="text-xs font-bold text-slate-500">Predicted Maintenance: {sys.nextMaintenance}</p>
                    </div>
                    <div className="w-full md:w-32 flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${sys.health > 80 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${sys.health}%`}}></div>
                      </div>
                      <span className="text-xs font-black text-slate-600">{sys.health}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2"><FaExclamationTriangle className="text-amber-500" /> AI Generated Alerts</h3>
              <ul className="space-y-3">
                {data.alerts.map((alert, i) => (
                  <li key={i} className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-xl text-sm font-bold text-amber-900">
                    <div className="w-6 h-6 mt-0.5 bg-amber-200 text-amber-700 rounded-full flex items-center justify-center flex-shrink-0 text-xs"><FaExclamationTriangle /></div>
                    {alert}
                  </li>
                ))}
              </ul>
            </div>
            
          </div>
        ) : (
          <p className="text-center text-slate-500 font-bold">Failed to connect to AI engine.</p>
        )}
      </section>
    </div>
  );
};
export default MaintenancePredictor;
