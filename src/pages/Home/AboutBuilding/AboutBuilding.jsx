import React from "react";
import { motion as Motion } from "framer-motion";

const AboutBuilding = () => {
  return (
    <section className="py-24 mesh-bg overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Title */}
        <Motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-extrabold tracking-[0.2em] uppercase text-xs mb-3 block">Our Legacy</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mt-2">
            The Living <span className="text-gradient">Experience</span>
          </h2>
          <div className="w-24 h-1.5 bg-linear-to-r from-blue-600 to-indigo-600 mx-auto mt-6 rounded-full shadow-lg shadow-blue-200"></div>
        </Motion.div>

        {/* Content Row */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24">
          {/* Text Content */}
          <Motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 leading-tight">
              A Smart 30-Floor <br />
              <span className="text-blue-600 underline decoration-blue-100 decoration-8 underline-offset-4">Residential Tower</span>
            </h3>
            <p className="text-slate-500 leading-relaxed text-lg mb-8 font-medium">
              Our building is a modern residential complex designed to offer
              comfortable and secure living for families and professionals alike.
              The 30-story tower houses a total of 120 spacious apartments — with
              4 elegantly designed units on each floor.
            </p>
            
            <div className="grid grid-cols-3 gap-6">
              {[
                { label: "Floors", value: "30" },
                { label: "Apartments", value: "120" },
                { label: "Amenities", value: "15+" }
              ].map((stat, i) => (
                <Motion.div 
                   key={i}
                   whileHover={{ y: -10 }}
                   className="bg-white premium-shadow border border-slate-100 p-8 rounded-[2rem] text-center"
                >
                  <h4 className="text-3xl md:text-4xl font-black text-slate-900 mb-1">{stat.value}</h4>
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none">{stat.label}</p>
                </Motion.div>
              ))}
            </div>
          </Motion.div>

          {/* Image */}
          <Motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="absolute -inset-6 bg-blue-600/5 rounded-[3rem] blur-3xl -z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
              alt="Building Exterior"
              className="rounded-[3rem] shadow-2xl w-full object-cover aspect-video lg:aspect-square border-8 border-white ring-1 ring-slate-100"
            />
            {/* Floating badge */}
            <Motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 glass p-8 rounded-[2.5rem] shadow-2xl border border-white/50 hidden md:block"
            >
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-blue-200">
                   ★
                </div>
                <div>
                  <p className="text-slate-900 font-black text-lg">Award Winning</p>
                  <p className="text-slate-500 text-sm font-semibold">Best Architecture 2024</p>
                </div>
              </div>
            </Motion.div>
          </Motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutBuilding;

