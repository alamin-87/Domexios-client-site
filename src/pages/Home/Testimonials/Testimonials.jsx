import React from "react";
import { motion as Motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Sara Khan",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "Living here has been an absolute pleasure. The building is beautiful, and the amenities are top-notch!",
    role: "Resident since 2022"
  },
  {
    name: "Ahmed Al-Mansoori",
    photo: "https://randomuser.me/api/portraits/men/43.jpg",
    text: "The location is unbeatable, and the management team is very responsive to all our needs.",
    role: "Business Owner"
  },
  {
    name: "Fatima Ali",
    photo: "https://randomuser.me/api/portraits/women/30.jpg",
    text: "I love the rooftop garden — a perfect place to relax after work. Highly recommended apartments!",
    role: "Architect"
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl -ml-48 -mb-48"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center relative z-10">
        <Motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mb-16"
        >
          <span className="text-blue-600 font-bold tracking-widest uppercase text-xs">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-2">
            What Our Residents Say
          </h2>
          <div className="w-20 h-1.5 bg-blue-600 mx-auto mt-6 rounded-full"></div>
        </Motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {testimonials.map(({ name, photo, text, role }, idx) => (
            <Motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              whileHover={{ y: -12 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col relative group"
            >
              <div className="absolute -top-4 right-10 w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg shadow-blue-200">
                <FaQuoteLeft />
              </div>
              
              <p className="text-slate-600 text-lg leading-relaxed mb-8 italic flex-grow">
                "{text}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-600 rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity blur-[2px]"></div>
                  <img
                    src={photo}
                    alt={name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white relative z-10"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 leading-none mb-1">{name}</h3>
                  <p className="text-sm text-blue-600 font-medium">{role}</p>
                </div>
              </div>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default Testimonials;

