import React from 'react';
import { motion } from 'framer-motion';
import { Maximize2, Camera } from 'lucide-react';

const Gallery = () => {
    // Placeholder architecture images
    const images = [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1460317442991-0ec239397148?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1000&auto=format&fit=crop"
    ];

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-4">
            <div className="max-w-7xl mx-auto space-y-20">
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                        <Camera size={12} />
                        Visual Archive
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">Explore <span className="text-indigo-600">Spaces</span></h2>
                    <p className="max-w-2xl mx-auto text-slate-500 font-medium tracking-tight">Immerse yourself in the architectural narrative of the Domexis residency.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {images.map((img, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="group relative h-[400px] overflow-hidden rounded-[3rem] shadow-2xl shadow-indigo-100 cursor-pointer"
                        >
                            <img src={img} alt="Building" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-10">
                                <div className="space-y-4">
                                     <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white">
                                        <Maximize2 size={24} />
                                     </div>
                                     <p className="text-white font-black text-xl uppercase tracking-widest">Premium Suite 0{i + 1}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Gallery;
