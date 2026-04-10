import React from "react";
import { motion as Motion } from "framer-motion";
import { FaShieldAlt, FaVideo, FaFingerprint, FaFireExtinguisher } from "react-icons/fa";

const safetyFeatures = [
  {
    icon: <FaShieldAlt />,
    title: "24/7 Elite Security",
    desc: "Professional security personnel guarding all entry points around the clock."
  },
  {
    icon: <FaVideo />,
    title: "Smart Surveillance",
    desc: "Advanced AI-powered CCTV cameras monitoring all common areas and hallways."
  },
  {
    icon: <FaFingerprint />,
    title: "Biometric Access",
    desc: "Fingerprint and RFID access for all residents, ensuring only authorized entry."
  },
  {
    icon: <FaFireExtinguisher />,
    title: "Modern Fire Safety",
    desc: "State-of-the-art smoke detectors and automated sprinkler systems in every unit."
  }
];

const Safety = () => {
  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <Motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <span className="text-blue-400 font-bold tracking-widest uppercase text-xs">Security First</span>
            <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6 leading-tight">
              Your Safety is Our <br />
              <span className="text-blue-500">Highest Priority</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              At Domexis, we utilize the latest in security technology and professional 
              oversight to ensure that you and your loved ones can sleep peacefully every night.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Systems Active</span>
              </div>
              <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
                <span className="text-sm font-medium text-slate-400">Total Incidents 2024: 0</span>
              </div>
            </div>
          </Motion.div>

          <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {safetyFeatures.map((feature, idx) => (
              <Motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
                className="p-8 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-sm transition-all duration-300"
              >
                <div className="w-14 h-14 bg-blue-600/20 text-blue-400 rounded-2xl flex items-center justify-center text-2xl mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </Motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Safety;
