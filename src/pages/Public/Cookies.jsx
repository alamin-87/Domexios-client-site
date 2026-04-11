import React from 'react';
import { motion } from 'framer-motion';
import { Cookie, Shield, Activity, Settings } from 'lucide-react';

const Cookies = () => {
    return (
        <div className="min-h-screen bg-white pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto space-y-16">
                <div className="text-center space-y-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-100"
                    >
                        <Cookie size={12} />
                        Browser Management
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">Cookie <span className="text-amber-600">Declaration</span></h1>
                    <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-2xl mx-auto">
                        We use digital identifiers to personalize your Domexis experience 
                        and maintain secure session persistence across your residency.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {[
                        { 
                            icon: Shield, 
                            title: "Essential Protocol", 
                            color: "bg-blue-600",
                            desc: "These cookies are strictly necessary for the platform to function. They handle authentication tokens, session security, and cross-site request forgery (CSRF) protection." 
                        },
                        { 
                            icon: Activity, 
                            title: "Performance Analytics", 
                            color: "bg-emerald-600",
                            desc: "Used to monitor system latency and optimize page delivery. These cookies help our engineers improve the speed of the architecture across different regions." 
                        },
                        { 
                            icon: Settings, 
                            title: "Preference Logic", 
                            color: "bg-amber-600",
                            desc: "These cookies remember your personalized interface settings, such as language preferences and dashboard layout configurations." 
                        }
                    ].map((item, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 flex flex-col md:flex-row gap-10 items-center"
                        >
                            <div className={`w-20 h-20 ${item.color} text-white rounded-[2rem] flex items-center justify-center shrink-0 shadow-2xl shadow-gray-200`}>
                                <item.icon size={32} />
                            </div>
                            <div className="space-y-4 text-center md:text-left">
                                <h3 className="text-2xl font-black text-slate-900">{item.title}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="bg-slate-900 rounded-[3.5rem] p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-left space-y-2">
                            <h4 className="text-2xl font-black">Preference Control</h4>
                            <p className="text-slate-400 text-sm font-medium">You can opt-out of non-essential identifiers in your browser settings.</p>
                        </div>
                        <button className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all shadow-xl">
                            Configure Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cookies;
