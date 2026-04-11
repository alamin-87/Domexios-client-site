import React from 'react';
import { motion } from 'framer-motion';
import { Ruler, Volume2, Dog, Trash2, Key } from 'lucide-react';

const ResidencyRules = () => {
    return (
        <div className="min-h-screen bg-white pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto space-y-16">
                <div className="text-center space-y-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100"
                    >
                        <Ruler size={12} />
                        Domexis Live Standard
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">Residency <span className="text-emerald-600">Rules</span></h1>
                    <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-2xl mx-auto">
                        Harmonious living starts with mutual respect. These guidelines 
                        ensure every resident enjoys the Domexis luxury experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        { 
                            icon: Volume2, 
                            title: "Sonic Etiquette", 
                            color: "bg-blue-50 text-blue-600",
                            desc: "Quiet hours are observed from 10:00 PM to 06:00 AM. High-fidelity audio systems must be gauged to internal unit acoustics." 
                        },
                        { 
                            icon: Dog, 
                            title: "Companion Policy", 
                            color: "bg-orange-50 text-orange-600",
                            desc: "Select blocks are pet-friendly. All companions must be registered with the concierge and must use designated hygiene zones." 
                        },
                        { 
                            icon: Trash2, 
                            title: "Waste Protocol", 
                            color: "bg-emerald-50 text-emerald-600",
                            desc: "Domexis employs a 3-tier recycling system. Organic, Plastic, and Electronic waste must be sorted before disposal in chute rooms." 
                        },
                        { 
                            icon: Key, 
                            title: "Access Logic", 
                            color: "bg-purple-50 text-purple-600",
                            desc: "Biometric and digital keys are non-transferable. Guests must be pre-authorized through the 'Manage Guests' portal in your dashboard." 
                        }
                    ].map((item, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 flex flex-col gap-6"
                        >
                            <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center shadow-lg shadow-gray-200/20`}>
                                <item.icon size={24} />
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-2xl font-black text-slate-900">{item.title}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="bg-slate-950 rounded-[4rem] p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                    <div className="relative z-10">
                        <h4 className="text-2xl font-black mb-4">Integrity is Inherent.</h4>
                        <p className="text-slate-400 font-medium max-w-xl mx-auto mb-0">Failure to comply with residential rules may lead to administrative review and temporary suspension of amenity privileges.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResidencyRules;
