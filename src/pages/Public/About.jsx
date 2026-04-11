import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Target, Building2, Wallet } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-4">
            <div className="max-w-7xl mx-auto space-y-24">
                {/* Hero section */}
                <div className="text-center space-y-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-widest border border-indigo-100"
                    >
                        Established 2024
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter"
                    >
                        Redefining Modern <br /> <span className="text-indigo-600">Residential Living</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-2xl mx-auto text-slate-500 font-medium text-lg"
                    >
                        Domexis isn't just a management platform; it's a movement towards 
                        frictionless, premium, and community-driven urban living.
                    </motion.p>
                </div>

                {/* Values */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: Building2, title: "Architecture", desc: "Designed with aesthetic precision and modern structural integrity." },
                        { icon: Users, title: "Community", desc: "Fostering meaningful connections between residents and management." },
                        { icon: Shield, title: "Precision", desc: "State-of-the-art security and absolute transparency in every deal." }
                    ].map((val, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl shadow-slate-200/50 space-y-6"
                        >
                            <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
                                <val.icon size={28} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900">{val.title}</h3>
                            <p className="text-slate-500 font-medium leading-relaxed">{val.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Mission Mission */}
                <div className="bg-slate-900 rounded-[4rem] p-10 lg:p-20 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter leading-none">Our Mission is <br /> Absolute Clarity.</h2>
                            <p className="text-slate-400 font-medium text-lg leading-relaxed">
                                We believe that finding and managing your home should be as 
                                sophisticated as the home itself. Our digital architecture removes 
                                all barriers between you and your dream residence.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 text-center">
                                <p className="text-4xl font-black text-indigo-400">99%</p>
                                <p className="text-[10px] font-black uppercase tracking-widest mt-2">Satisfaction</p>
                            </div>
                            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 text-center">
                                <p className="text-4xl font-black text-indigo-400">24/7</p>
                                <p className="text-[10px] font-black uppercase tracking-widest mt-2">Assistance</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
