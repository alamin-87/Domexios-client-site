import React, { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import {
  FaBrain,
  FaRobot,
  FaChartLine,
  FaSearchLocation,
  FaMagic,
  FaShieldAlt,
  FaArrowRight,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router";

const aiTools = [
  {
    id: 1,
    title: "Smart Rent Estimator",
    icon: FaChartLine,
    description:
      "AI analyzes market trends, location data, and unit specifications to predict the most competitive monthly rent for any apartment.",
    status: "Live",
    type: "Finance",
    rating: 4.9,
    gradient: "from-blue-600 to-indigo-600",
    bgLight: "bg-blue-50",
    textColor: "text-blue-600",
    link: "/rent-estimator",
  },
  {
    id: 2,
    title: "AI Property Matcher",
    icon: FaSearchLocation,
    description:
      "Tell us your lifestyle preferences and budget — our matching engine finds the ideal unit, floor, and block tailored just for you.",
    status: "Live",
    type: "Discovery",
    rating: 4.8,
    gradient: "from-violet-600 to-purple-600",
    bgLight: "bg-violet-50",
    textColor: "text-violet-600",
    link: "/property-matcher",
  },
  {
    id: 3,
    title: "Maintenance Predictor",
    icon: FaRobot,
    description:
      "Predictive AI monitors building systems to forecast maintenance needs before issues arise, ensuring zero downtime for residents.",
    status: "Beta",
    type: "Operations",
    rating: 4.7,
    gradient: "from-emerald-600 to-teal-600",
    bgLight: "bg-emerald-50",
    textColor: "text-emerald-600",
    link: "/maintenance-predictor",
  }, 
  {
    id: 4,
    title: "Smart Security Scan",
    icon: FaShieldAlt,
    description:
      "AI-powered surveillance analytics with facial recognition and anomaly detection for round-the-clock building protection.",
    status: "Live",
    type: "Security",
    rating: 5.0,
    gradient: "from-amber-500 to-orange-600",
    bgLight: "bg-amber-50",
    textColor: "text-amber-600",
    link: "/security-scan",
  },
];

// Skeleton component specific to this section
const ToolCardSkeleton = () => (
  <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden p-8 flex flex-col h-full animate-pulse">
    <div className="flex items-center justify-between mb-6">
      <div className="w-14 h-14 bg-slate-100 rounded-2xl" />
      <div className="w-16 h-6 bg-slate-100 rounded-full" />
    </div>
    <div className="h-6 bg-slate-100 rounded-lg w-3/4 mb-3" />
    <div className="space-y-2 mb-6 flex-1">
      <div className="h-4 bg-slate-50 rounded w-full" />
      <div className="h-4 bg-slate-50 rounded w-5/6" />
      <div className="h-4 bg-slate-50 rounded w-2/3" />
    </div>
    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
      <div className="h-4 w-20 bg-slate-100 rounded" />
      <div className="w-10 h-10 bg-slate-100 rounded-xl" />
    </div>
  </div>
);

const SmartTools = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate a brief loading state for skeleton demonstration
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-600/5 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-full text-xs font-black tracking-widest uppercase mb-4 shadow-lg shadow-blue-200">
            <FaBrain /> Powered by AI
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Smart Living{" "}
            <span className="italic text-blue-600">Ecosystem</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Domexis leverages cutting-edge artificial intelligence to automate
            building operations, optimize costs, and elevate your living
            experience.
          </p>
        </Motion.div>

        {/* Cards Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
            {[...Array(4)].map((_, i) => (
              <ToolCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <Motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 auto-rows-fr"
          >
            {aiTools.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <Motion.div
                  key={tool.id}
                  variants={cardVariants}
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
                >
                  {/* Card Header */}
                  <div className="p-8 pb-0">
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`w-14 h-14 ${tool.bgLight} rounded-2xl flex items-center justify-center ${tool.textColor} group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent size={24} />
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          tool.status === "Live"
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                            : "bg-amber-50 text-amber-600 border border-amber-100"
                        }`}
                      >
                        {tool.status}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {tool.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <div className="px-8 flex-1">
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                      {tool.description}
                    </p>
                  </div>

                  {/* Meta Info & Action */}
                  <div className="p-8 pt-6">
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                          Category
                        </span>
                        <span className="text-xs font-black text-slate-700">
                          {tool.type}
                        </span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                          Rating
                        </span>
                        <span className="text-xs font-black text-slate-700 flex items-center gap-1">
                          <FaStar className="text-amber-400" size={10} />
                          {tool.rating}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                        Explore Tool
                      </span>
                      {tool.link ? (
                        <Link to={tool.link} className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                          <FaArrowRight
                            size={12}
                            className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-300"
                          />
                        </Link>
                      ) : (
                        <button className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                          <FaArrowRight
                            size={12}
                            className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-300"
                          />
                        </button>
                      )}
                    </div>
                  </div>
                </Motion.div>
              );
            })}
          </Motion.div>
        )}

        {/* Bottom CTA Banner */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-600/20 blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-600/15 blur-[60px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 mb-3 justify-center md:justify-start">
                <FaMagic className="text-blue-400" />
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">
                  AI-First Platform
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight">
                The Future of{" "}
                <span className="text-blue-400 italic">Smart Living</span> is Here
              </h3>
              <p className="text-slate-400 font-medium max-w-lg text-sm">
                All tools are integrated into your resident dashboard. No setup required —
                they learn and adapt to your living patterns automatically.
              </p>
            </div>
            <Link
              to="/apartmentList"
              className="px-8 py-4 bg-white text-slate-900 font-black rounded-2xl flex items-center gap-3 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-xl whitespace-nowrap active:scale-95"
            >
              Get Started <FaArrowRight />
            </Link>
          </div>
        </Motion.div>
      </div>
    </section>
  );
};

export default SmartTools;
