import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Globe } from 'lucide-react';
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Contact = () => {
    return (
        <div className="min-h-screen bg-white pt-32 pb-20 px-4">
            <div className="max-w-7xl mx-auto space-y-24">
                {/* Hero Header */}
                <div className="text-center space-y-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100"
                    >
                        Structural Support
                    </motion.div>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter"
                    >
                        Connectivity <span className="text-indigo-600">& Reach</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-2xl mx-auto text-slate-400 font-medium tracking-tight"
                    >
                        Bridge the gap between vision and reality. Reach our management team 
                        directly through our secure communication protocol.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Info & Details */}
                    <div className="space-y-12">
                        <div className="space-y-8">
                            {[
                                { icon: MapPin, title: "Residency Base", detail: "Suite 500, Domexis Plaza, Dhaka, BD" },
                                { icon: Phone, title: "Voice Uplink", detail: "+880 1712-345678" },
                                { icon: Mail, title: "Data Channel", detail: "contact@domexis-res.com" }
                            ].map((item, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-start gap-6 group"
                                >
                                    <div className="h-14 w-14 bg-slate-50 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white rounded-2xl flex items-center justify-center transition-all shadow-sm">
                                        <item.icon size={24} />
                                    </div>
                                    <div className="space-y-1 mt-1">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.title}</p>
                                        <p className="text-xl font-black text-slate-900">{item.detail}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Social Logic */}
                        <div className="bg-slate-50 p-10 rounded-[3rem] border border-gray-100 space-y-6">
                            <h4 className="text-lg font-black text-slate-900 tracking-tight">Social Sync</h4>
                            <div className="flex gap-4">
                                {[FaInstagram, FaTwitter, FaLinkedin, Globe].map((SocialIco, i) => (
                                    <button key={i} className="h-12 w-12 bg-white rounded-xl flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:shadow-xl hover:shadow-indigo-100 transition-all">
                                        <SocialIco size={20} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Premium Form */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="bg-slate-900 rounded-[4rem] p-10 lg:p-14 text-white relative overflow-hidden shadow-2xl shadow-indigo-100"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                        
                        <form className="space-y-8 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Identity</label>
                                    <input type="text" placeholder="Full Name" className="w-full bg-white/5 border-2 border-transparent rounded-2xl px-6 py-4.5 focus:bg-white/10 focus:border-indigo-600 outline-none transition-all font-bold" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Secure Link</label>
                                    <input type="email" placeholder="Email@host.com" className="w-full bg-white/5 border-2 border-transparent rounded-2xl px-6 py-4.5 focus:bg-white/10 focus:border-indigo-600 outline-none transition-all font-bold" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Protocol Subject</label>
                                <input type="text" placeholder="Regarding Residency..." className="w-full bg-white/5 border-2 border-transparent rounded-2xl px-6 py-4.5 focus:bg-white/10 focus:border-indigo-600 outline-none transition-all font-bold" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Manifest Content</label>
                                <textarea rows={5} placeholder="Type your message here..." className="w-full bg-white/5 border-2 border-transparent rounded-2xl px-6 py-4.5 focus:bg-white/10 focus:border-indigo-600 outline-none transition-all font-bold resize-none" />
                            </div>
                            <button className="w-full h-16 bg-indigo-600 hover:bg-white hover:text-indigo-600 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-900/40">
                                Send Message <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
