import React, { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { FaSearchLocation, FaSlidersH, FaBuilding, FaArrowRight, FaCheckCircle, FaSpinner } from "react-icons/fa";
import { Link } from "react-router";
import useAxios from "../../hooks/useAxios";

const PropertyMatcher = () => {
  const axiosInstance = useAxios();
  const [params, setParams] = useState({ budget: 2000, familySize: 2, lifestyle: "balanced" });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matches, setMatches] = useState(null);

  const handleMatch = async () => {
    setIsAnalyzing(true);
    setMatches(null);
    try {
      const res = await axiosInstance.post("/ai/property-match", params);
      // Let animation play for UX
      setTimeout(() => {
        setMatches(res.data.matches);
        setIsAnalyzing(false);
      }, 1500);
    } catch (error) {
      console.error(error);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-violet-900 via-purple-900 to-violet-900 py-16 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-600/30 text-violet-200 rounded-full text-xs font-black tracking-widest uppercase mb-4 border border-violet-500/30">
            <FaSearchLocation /> Discovery Engine
          </span>
          <h1 className="text-4xl font-black text-white mb-4">AI Property <span className="text-violet-400 italic">Matcher</span></h1>
          <p className="text-violet-200/80">Tell us what you need. Our AI will search all available inventory to find the perfect fit.</p>
        </div>
      </section>

      <section className="py-12 max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-6">
            <FaSlidersH className="text-violet-600 text-xl" />
            <h3 className="text-lg font-black text-slate-900">Your Preferences</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex justify-between">
                <span>Monthly Budget</span>
                <span className="text-violet-600">${params.budget}</span>
              </label>
              <input type="range" min="800" max="6000" step="100" value={params.budget} onChange={(e) => setParams({...params, budget: parseInt(e.target.value)})} className="w-full accent-violet-600 h-2 bg-slate-200 rounded-full appearance-none cursor-pointer" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Family Size</label>
              <select value={params.familySize} onChange={(e) => setParams({...params, familySize: parseInt(e.target.value)})} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent font-bold text-sm cursor-pointer outline-none">
                {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} Person{n>1?'s':''}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lifestyle Priority</label>
              <select value={params.lifestyle} onChange={(e) => setParams({...params, lifestyle: e.target.value})} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent font-bold text-sm cursor-pointer outline-none">
                <option value="balanced">Balanced / Standard</option>
                <option value="luxury">Luxury & Premium</option>
                <option value="budget">Value / Budget-Friendly</option>
                <option value="family">Family Oriented</option>
              </select>
            </div>
          </div>

          <button onClick={handleMatch} disabled={isAnalyzing} className="w-full py-4 bg-violet-600 text-white font-black rounded-xl hover:bg-violet-700 transition flex items-center justify-center gap-2">
            {isAnalyzing ? <><FaSpinner className="animate-spin" /> Scanning Database...</> : <><FaSearchLocation /> Find My Perfect Apartment</>}
          </button>
        </div>

        <AnimatePresence>
          {matches && matches.length > 0 && (
            <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <h4 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2"><FaCheckCircle className="text-emerald-500" /> Top Matches Found ({matches.length})</h4>
              {matches.map((apt, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm hover:shadow-md transition">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-violet-50 text-violet-600 font-black text-xl rounded-xl flex items-center justify-center border border-violet-100">
                      {Math.round(apt.matchPercentage)}%
                    </div>
                    <div>
                      <h5 className="font-black text-slate-900 text-lg">Unit {apt.apartmentNo}</h5>
                      <p className="text-sm font-bold text-slate-500">Block {apt.blockName} • Floor {apt.floorNo}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 w-full md:w-auto">
                    <div className="text-left md:text-right flex-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rent</p>
                      <p className="font-black text-slate-900 text-xl">${apt.rent}<span className="text-sm text-slate-400">/mo</span></p>
                    </div>
                    <Link to={`/apartment/${apt._id}`} className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-violet-600 transition">
                      View <FaArrowRight />
                    </Link>
                  </div>
                </div>
              ))}
            </Motion.div>
          )}

          {matches && matches.length === 0 && (
            <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm text-center">
                <span className="text-4xl">😔</span>
                <h4 className="text-xl font-black text-slate-900 mt-4 mb-2">No Perfect Matches Found</h4>
                <p className="text-slate-500">We couldn't find any apartments that strictly meet your budget and lifestyle preferences right now. Try increasing your budget or adjusting your filters!</p>
            </Motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};
export default PropertyMatcher;
