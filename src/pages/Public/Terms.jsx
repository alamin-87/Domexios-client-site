import React from 'react';
import { motion } from 'framer-motion';
import { ScrollText, Gavel, FileSignature, CheckCircle } from 'lucide-react';

const Terms = () => {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto space-y-16">
                <div className="text-center space-y-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest"
                    >
                        Standard Lease Protocol v4.2
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">Terms of <span className="text-indigo-600">Service</span></h1>
                    <p className="text-slate-500 font-medium text-lg leading-relaxed">
                        Domexis maintains a legal framework designed to ensure the stability 
                        of our community and the security of our residential assets.
                    </p>
                </div>

                <div className="space-y-8">
                    {[
                        { 
                            icon: FileSignature, 
                            title: "Lease Binding", 
                            desc: "All lease requests initiated on Domexis are considered legally binding intent. Once an admin 'Checks' your agreement, you are contractually committed to the residency terms of that specific unit." 
                        },
                        { 
                            icon: Gavel, 
                            title: "Compliance", 
                            desc: "Residents are required to comply with local municipality zoning laws and building-specific occupancy limits. Subletting is strictly prohibited without written consent from the Tower Administrator." 
                        },
                        { 
                            icon: ScrollText, 
                            title: "Financial Integrity", 
                            desc: "Rent must be settled by the date agreed upon in your lease agreement. Late payments are subject to standard architectural maintenance fees as governed by Domexis bylaws." 
                        },
                        { 
                            icon: CheckCircle, 
                            title: "Platform Usage", 
                            desc: "Access to the Resident Portal is a privilege granted to confirmed members. Misuse of the announcement system or fraudulent lease requests will result in immediate termination of digital credentials." 
                        }
                    ].map((item, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50"
                        >
                            <div className="flex items-start gap-6">
                                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                                    <item.icon size={24} />
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-xl font-black text-slate-900">{item.title}</h3>
                                    <p className="text-slate-500 font-medium leading-relaxed italic">{item.desc}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="bg-indigo-600 rounded-[3rem] p-12 text-center text-white">
                    <h4 className="text-3xl font-black mb-4">Questions regarding policy?</h4>
                    <p className="text-indigo-100 font-medium mb-8">Our legal concierges are available for virtual consultations.</p>
                    <button className="px-10 py-4 bg-white text-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-50 transition-colors shadow-xl">
                        Contact Legal Support
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Terms;
