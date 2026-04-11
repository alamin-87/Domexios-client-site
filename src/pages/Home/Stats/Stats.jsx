import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Building2, Users, ShieldCheck, Award } from 'lucide-react';

const Stats = () => {
    const stats = [
        { icon: <Building2 className="text-blue-600" size={32} />, value: "48+", label: "Luxury Units", desc: "Meticulously designed" },
        { icon: <Users className="text-indigo-600" size={32} />, value: "120+", label: "Happy Residents", desc: "Vibrant community" },
        { icon: <ShieldCheck className="text-emerald-600" size={32} />, value: "99.9%", label: "Security Rating", desc: "Peace of mind" },
        { icon: <Award className="text-amber-500" size={32} />, value: "15+", label: "Design Awards", desc: "Excellence recognized" }
    ];

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {stats.map((stat, i) => (
                        <Motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center text-center space-y-4 group"
                        >
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                                {stat.icon}
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
                                <p className="text-sm font-black uppercase tracking-widest text-blue-600">{stat.label}</p>
                                <p className="text-xs text-slate-400 font-medium">{stat.desc}</p>
                            </div>
                        </Motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
