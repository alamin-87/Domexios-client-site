import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

const Privacy = () => {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto space-y-16">
                <div className="text-center space-y-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100"
                    >
                        Data Protocol v3.0
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">Privacy <span className="text-blue-600">& Terms</span></h1>
                    <p className="text-slate-500 font-medium text-lg leading-relaxed">
                        At Domexis, your data security is as vital as your residency. 
                        We employ military-grade encryption to protect your records.
                    </p>
                </div>

                <div className="space-y-12">
                    {[
                        { 
                            icon: ShieldCheck, 
                            title: "Data Sovereignty", 
                            desc: "Your personal and financial records are encrypted and stored in distributed clusters. We do not sell user data to third-party entities." 
                        },
                        { 
                            icon: Lock, 
                            title: "Secure Access", 
                            desc: "Every transaction, interaction, and lease request is signed with a unique cryptographic key to prevent unauthorized access." 
                        },
                        { 
                            icon: Eye, 
                            title: "Transparency", 
                            desc: "You have the right to request a full audit of your account data and activity logs at any time via the Support concierge." 
                        },
                        { 
                            icon: FileText, 
                            title: "Lease Terms", 
                            desc: "All digital agreements made on Domexis are legally binding. Please review the specific rules of your building block before signing." 
                        }
                    ].map((item, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row gap-8 items-start"
                        >
                            <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-100">
                                <item.icon size={28} />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-2xl font-black text-slate-900">{item.title}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center pt-10">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Last Updated: October 2024 • Domexis Infrastructure</p>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
