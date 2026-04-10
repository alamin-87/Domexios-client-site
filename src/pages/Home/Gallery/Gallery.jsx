import React from "react";
import { motion as Motion } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=80",
];

const Gallery = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-blue-600 font-bold tracking-widest uppercase text-xs">Visual Tour</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-2">
            Experience the <span className="text-blue-600">Domexis Life</span>
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto">
            Take a glimpse into the sophisticated interiors and vibrant community spaces that define our tower.
          </p>
        </Motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((src, idx) => (
            <Motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="relative rounded-[2rem] overflow-hidden group cursor-pointer"
            >
              <img 
                src={src} 
                alt={`Gallery ${idx}`} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                <p className="text-white font-bold tracking-tight">Luxury Interior #{idx + 1}</p>
              </div>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
