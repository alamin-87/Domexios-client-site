import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  FaBrain,
  FaChartLine,
  FaBuilding,
  FaLayerGroup,
  FaBed,
  FaCity,
  FaParking,
  FaWifi,
  FaSwimmingPool,
  FaArrowRight,
  FaRedo,
  FaStar,
  FaCheckCircle,
} from "react-icons/fa";
import { Link } from "react-router";
import useAxios from "../../hooks/useAxios";

// AI Scoring weights for rent estimation
const WEIGHTS = {
  floor: 0.20,
  block: 0.15,
  rooms: 0.25,
  view: 0.10,
  parking: 0.08,
  internet: 0.05,
  pool: 0.07,
  security: 0.10,
};

const BLOCK_SCORES = { A: 1.0, B: 0.85, C: 0.75, North: 0.90, South: 0.80, East: 0.70, West: 0.65 };
const VIEW_SCORES = { city: 1.0, garden: 0.85, pool: 0.90, street: 0.60, interior: 0.40 };

const calculateEstimate = (params, apartments) => {
  // Normalize floor (1-20 scale)
  const floorScore = Math.min(params.floor / 20, 1);
  const blockScore = BLOCK_SCORES[params.block] || 0.7;
  const roomScore = Math.min(params.rooms / 5, 1);
  const viewScore = VIEW_SCORES[params.view] || 0.5;
  const parkingScore = params.parking ? 1 : 0;
  const internetScore = params.internet ? 1 : 0;
  const poolScore = params.pool ? 1 : 0;
  const securityScore = params.security ? 1 : 0;

  // Weighted composite score (0-1)
  const compositeScore =
    floorScore * WEIGHTS.floor +
    blockScore * WEIGHTS.block +
    roomScore * WEIGHTS.rooms +
    viewScore * WEIGHTS.view +
    parkingScore * WEIGHTS.parking +
    internetScore * WEIGHTS.internet +
    poolScore * WEIGHTS.pool +
    securityScore * WEIGHTS.security;

  // Use real apartment data to calibrate
  let baseRent = 1500; // fallback
  let maxRent = 5000;
  let minRent = 800;

  if (apartments.length > 0) {
    const rents = apartments.map((a) => a.rent).sort((a, b) => a - b);
    minRent = rents[0];
    maxRent = rents[rents.length - 1];
    baseRent = rents.reduce((sum, r) => sum + r, 0) / rents.length;
  }

  // Scale estimate between min and max based on composite score
  const estimatedRent = Math.round(minRent + compositeScore * (maxRent - minRent));

  // Confidence: higher when we have more real data points
  const confidence = Math.min(65 + apartments.length * 2, 96);

  // Find comparable apartments (same block or similar floor)
  const comparables = apartments
    .filter(
      (a) =>
        a.blockName === params.block ||
        Math.abs(a.floorNo - params.floor) <= 2
    )
    .slice(0, 4);

  return {
    estimatedRent,
    compositeScore: Math.round(compositeScore * 100),
    confidence,
    marketAverage: Math.round(baseRent),
    range: {
      low: Math.round(estimatedRent * 0.88),
      high: Math.round(estimatedRent * 1.12),
    },
    comparables,
    breakdown: [
      { label: "Floor Premium", value: Math.round(floorScore * 100), weight: WEIGHTS.floor },
      { label: "Block Rating", value: Math.round(blockScore * 100), weight: WEIGHTS.block },
      { label: "Room Configuration", value: Math.round(roomScore * 100), weight: WEIGHTS.rooms },
      { label: "View Quality", value: Math.round(viewScore * 100), weight: WEIGHTS.view },
      { label: "Parking Access", value: parkingScore * 100, weight: WEIGHTS.parking },
      { label: "High-Speed Internet", value: internetScore * 100, weight: WEIGHTS.internet },
      { label: "Pool Access", value: poolScore * 100, weight: WEIGHTS.pool },
      { label: "Security Grade", value: securityScore * 100, weight: WEIGHTS.security },
    ],
  };
};

const RentEstimator = () => {
  const axiosInstance = useAxios();

  const { data: apartments = [] } = useQuery({
    queryKey: ["all-apartments-estimator"],
    queryFn: async () => {
      const res = await axiosInstance.get("/apartment");
      return res.data;
    },
  });

  const [params, setParams] = useState({
    floor: 5,
    block: "A",
    rooms: 2,
    view: "city",
    parking: true,
    internet: true,
    pool: false,
    security: true,
  });

  const [showResult, setShowResult] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const result = useMemo(() => {
    if (!showResult) return null;
    return calculateEstimate(params, apartments);
  }, [showResult, params, apartments]);

  const handleEstimate = () => {
    setShowResult(false);
    setIsAnalyzing(true);
    // Simulate AI "thinking" for UX
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResult(true);
    }, 1500);
  };

  const handleReset = () => {
    setShowResult(false);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white rounded-full text-xs font-black tracking-widest uppercase mb-6 shadow-lg">
              <FaBrain /> AI-Powered Tool
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              Smart Rent <span className="text-blue-400 italic">Estimator</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Our AI analyzes real market data, building specifications, and
              amenity packages to predict the most competitive monthly rent for
              any unit at Domexis.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Input Form */}
          <Motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-10 border border-slate-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                  <FaChartLine size={18} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    Configure Unit
                  </h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Set apartment parameters
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Floor */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex justify-between">
                    <span>Floor Level</span>
                    <span className="text-blue-600">Floor {params.floor}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={params.floor}
                    onChange={(e) =>
                      setParams({ ...params, floor: parseInt(e.target.value) })
                    }
                    className="w-full accent-blue-600 h-2 bg-slate-200 rounded-full appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-slate-300 font-bold">
                    <span>Ground</span>
                    <span>Penthouse</span>
                  </div>
                </div>

                {/* Block & Rooms */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Building Block
                    </label>
                    <select
                      value={params.block}
                      onChange={(e) =>
                        setParams({ ...params, block: e.target.value })
                      }
                      className="w-full px-4 py-3.5 bg-white rounded-xl border border-slate-100 text-sm font-bold appearance-none cursor-pointer focus:border-blue-500 outline-none transition-all"
                    >
                      {Object.keys(BLOCK_SCORES).map((b) => (
                        <option key={b} value={b}>
                          Block {b}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Bedrooms
                    </label>
                    <select
                      value={params.rooms}
                      onChange={(e) =>
                        setParams({
                          ...params,
                          rooms: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-4 py-3.5 bg-white rounded-xl border border-slate-100 text-sm font-bold appearance-none cursor-pointer focus:border-blue-500 outline-none transition-all"
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          {n} Bedroom{n > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* View */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    View Type
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {Object.keys(VIEW_SCORES).map((v) => (
                      <button
                        key={v}
                        onClick={() => setParams({ ...params, view: v })}
                        className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                          params.view === v
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                            : "bg-white text-slate-400 border border-slate-100 hover:border-blue-200"
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amenity Toggles */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Included Amenities
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        key: "parking",
                        label: "Parking",
                        icon: FaParking,
                      },
                      {
                        key: "internet",
                        label: "Fiber Net",
                        icon: FaWifi,
                      },
                      {
                        key: "pool",
                        label: "Pool Access",
                        icon: FaSwimmingPool,
                      },
                      {
                        key: "security",
                        label: "24/7 Security",
                        icon: FaBuilding,
                      },
                    ].map((amenity) => {
                      const Icon = amenity.icon;
                      const active = params[amenity.key];
                      return (
                        <button
                          key={amenity.key}
                          onClick={() =>
                            setParams({
                              ...params,
                              [amenity.key]: !active,
                            })
                          }
                          className={`flex items-center gap-3 p-4 rounded-xl text-sm font-bold transition-all ${
                            active
                              ? "bg-blue-50 text-blue-600 border border-blue-100"
                              : "bg-white text-slate-400 border border-slate-100 hover:border-slate-200"
                          }`}
                        >
                          <Icon size={14} />
                          {amenity.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleEstimate}
                    disabled={isAnalyzing}
                    className="flex-1 py-4 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-200 active:scale-95 disabled:opacity-60"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <FaBrain /> Estimate Rent
                      </>
                    )}
                  </button>
                  {showResult && (
                    <button
                      onClick={handleReset}
                      className="p-4 bg-slate-100 text-slate-500 rounded-xl hover:bg-slate-200 transition-all"
                    >
                      <FaRedo />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Motion.div>

          {/* Right: Results */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {!showResult && !isAnalyzing && (
                <Motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-slate-50 rounded-[2.5rem] p-12 border border-dashed border-slate-200 flex flex-col items-center justify-center text-center min-h-[400px]"
                >
                  <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-200 mb-6">
                    <FaChartLine size={32} />
                  </div>
                  <h4 className="text-xl font-black text-slate-300 mb-2">
                    Ready to Analyze
                  </h4>
                  <p className="text-slate-400 text-sm max-w-xs">
                    Configure the apartment parameters on the left, then click
                    "Estimate Rent" to see AI-powered predictions.
                  </p>
                </Motion.div>
              )}

              {isAnalyzing && (
                <Motion.div
                  key="analyzing"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-slate-900 rounded-[2.5rem] p-12 flex flex-col items-center justify-center text-center min-h-[400px] relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.05)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_2s_infinite]" />
                  <div className="relative z-10">
                    <div className="w-20 h-20 border-4 border-blue-900 border-t-blue-400 rounded-full animate-spin mx-auto mb-8" />
                    <h4 className="text-xl font-black text-white mb-2">
                      AI Processing
                    </h4>
                    <p className="text-slate-500 text-sm">
                      Analyzing {apartments.length} data points...
                    </p>
                    <div className="flex gap-1 mt-6 justify-center">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Motion.div
                          key={i}
                          className="w-2 h-8 bg-blue-600 rounded-full"
                          animate={{ scaleY: [0.3, 1, 0.3] }}
                          transition={{
                            repeat: Infinity,
                            duration: 0.8,
                            delay: i * 0.1,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </Motion.div>
              )}

              {showResult && result && (
                <Motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Main Estimate Card */}
                  <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-[2.5rem] p-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/20 rounded-full blur-[60px] pointer-events-none" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-6">
                        <FaCheckCircle className="text-emerald-400" />
                        <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                          Analysis Complete
                        </span>
                      </div>

                      <div className="flex items-end gap-2 mb-2">
                        <span className="text-5xl font-black text-white">
                          ${result.estimatedRent}
                        </span>
                        <span className="text-slate-500 font-bold text-sm mb-2">
                          /month
                        </span>
                      </div>

                      <p className="text-slate-400 text-sm mb-6">
                        Estimated range: ${result.range.low} — $
                        {result.range.high}
                      </p>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white/5 rounded-2xl p-4 text-center">
                          <p className="text-2xl font-black text-blue-400">
                            {result.confidence}%
                          </p>
                          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                            Confidence
                          </p>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-4 text-center">
                          <p className="text-2xl font-black text-white">
                            {result.compositeScore}
                          </p>
                          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                            Quality Score
                          </p>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-4 text-center">
                          <p className="text-2xl font-black text-emerald-400">
                            ${result.marketAverage}
                          </p>
                          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                            Market Avg
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Score Breakdown */}
                  <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                    <h4 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                      <FaStar className="text-amber-400" /> Score Breakdown
                    </h4>
                    <div className="space-y-4">
                      {result.breakdown.map((item, i) => (
                        <Motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-bold text-slate-600">
                              {item.label}
                            </span>
                            <span className="text-xs font-black text-slate-900">
                              {item.value}%
                            </span>
                          </div>
                          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <Motion.div
                              className={`h-full rounded-full ${
                                item.value > 70
                                  ? "bg-blue-600"
                                  : item.value > 40
                                  ? "bg-amber-500"
                                  : "bg-slate-300"
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${item.value}%` }}
                              transition={{
                                duration: 0.8,
                                delay: 0.3 + i * 0.1,
                              }}
                            />
                          </div>
                        </Motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Comparable Units */}
                  {result.comparables.length > 0 && (
                    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                      <h4 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                        <FaBuilding className="text-blue-600" /> Comparable
                        Units
                      </h4>
                      <div className="space-y-3">
                        {result.comparables.map((apt, i) => (
                          <Link
                            key={apt._id}
                            to={`/apartment/${apt._id}`}
                            className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-blue-50 transition-colors group"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-blue-600 border border-slate-100 font-black text-xs">
                                {apt.apartmentNo}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-slate-900">
                                  Unit {apt.apartmentNo} • Block{" "}
                                  {apt.blockName}
                                </p>
                                <p className="text-[10px] text-slate-400 font-bold">
                                  Floor {apt.floorNo}
                                </p>
                              </div>
                            </div>
                            <div className="text-right flex items-center gap-3">
                              <span className="text-lg font-black text-slate-900">
                                ${apt.rent}
                              </span>
                              <FaArrowRight className="text-slate-300 group-hover:text-blue-600 transition-colors text-xs" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </Motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RentEstimator;
