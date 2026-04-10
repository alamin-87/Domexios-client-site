import React from "react";
import { FaDumbbell, FaParking, FaShieldAlt, FaLeaf, FaWifi, FaSwimmingPool } from "react-icons/fa";
import { motion as Motion } from "framer-motion";

const amenitiesData = [
  { icon: <FaSwimmingPool />, title: "Infinity Pool" },
  { icon: <FaDumbbell />, title: "Elite Gym" },
  { icon: <FaLeaf />, title: "Zen Garden" },
  { icon: <FaParking />, title: "Smart Parking" },
  { icon: <FaShieldAlt />, title: "Elite Security" },
  { icon: <FaWifi />, title: "Giga WiFi" },
];

const Amenities = () => {
  return (
    <section className="py-24 bg-slate-900 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-indigo-600/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <Motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-500 font-extrabold tracking-[0.3em] uppercase text-[10px] mb-4 block">World Class Extras</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white">
            Premium <span className="text-blue-500">Perks</span>
          </h2>
          <p className="mt-6 text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Elevating your lifestyle with state-of-the-art facilities designed for comfort, 
            health, and refined community living.
          </p>
        </Motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
          {amenitiesData.map((item, index) => (
            <Motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ 
                y: -12, 
                backgroundColor: "rgba(255,255,255,0.05)",
                borderColor: "rgba(59, 130, 246, 0.4)"
              }}
              className="group p-8 bg-white/5 border border-white/10 rounded-[2.5rem] text-center backdrop-blur-sm transition-all duration-500 cursor-default"
            >
              <div className="relative inline-flex items-center justify-center mb-6">
                <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="w-16 h-16 bg-white/5 text-blue-400 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 relative z-10 border border-white/5 group-hover:border-blue-500/50 group-hover:bg-blue-500/10">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-xs font-black text-white mb-2 group-hover:text-blue-400 transition-colors uppercase tracking-widest leading-none">
                {item.title}
              </h3>
              <div className="w-6 h-1 bg-blue-600/30 mx-auto rounded-full group-hover:w-12 group-hover:bg-blue-600 transition-all duration-500"></div>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;

