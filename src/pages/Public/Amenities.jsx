import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Waves, Car, Shield, Wifi, Coffee, TreePine, Zap } from 'lucide-react';

const Amenities = () => {
    const amenityList = [
        { icon: Dumbbell, title: "Elite Gym", desc: "Equipped with state-of-the-art panoramic views and high-end machinery." },
        { icon: Waves, title: "Infinity Pool", desc: "Rooftop aquatic experience with temperature-controlled water year-round." },
        { icon: Shield, title: "24/7 Security", desc: "Biometric access and rounded patrols for absolute piece of mind." },
        { icon: Car, title: "Valet & Parking", desc: "E-vehicle charging stations and smart parking management." },
        { icon: Wifi, title: "Gigabit Fiber", desc: "High-speed unified WiFi across all public and residential zones." },
        { icon: TreePine, title: "Zen Garden", desc: "Lush botanical spaces designed for meditation and urban tranquility." },
        { icon: Coffee, title: "Sky Lounge", desc: "Co-working spaces and a premium coffee bar on the 15th floor." },
        { icon: Zap, title: "Smart Home", desc: "Pre-integrated IOT control for lighting, temp, and security." }
    ];

    return (
        <div className="min-h-screen bg-white pt-32 pb-20 px-4">
            <div className="max-w-7xl mx-auto space-y-20">
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                        Lifestyle Portfolio
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">Boutique <span className="text-indigo-600">Amenities</span></h2>
                    <p className="max-w-2xl mx-auto text-slate-400 font-medium">Every detail is curated to enhance your living standard to the highest degree.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {amenityList.map((item, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ y: -10 }}
                            className="bg-slate-50 p-8 rounded-[2.5rem] border border-transparent hover:bg-white hover:border-indigo-100 hover:shadow-2xl hover:shadow-slate-200 transition-all group"
                        >
                            <div className="w-14 h-14 bg-white text-indigo-600 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                <item.icon size={28} />
                            </div>
                            <h4 className="text-xl font-black text-slate-900 mt-6">{item.title}</h4>
                            <p className="text-slate-500 text-sm mt-3 font-medium leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Amenities;
