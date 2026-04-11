import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Phone, Mail, MapPin, ChevronDown, CheckCircle } from 'lucide-react';

const Support = () => {
    const faqs = [
        { q: "How do I request a membership?", a: "Once your agreement is confirmed by the admin, your account status is programmatically upgraded to 'Member' automatically." },
        { q: "What payment methods are accepted?", a: "We exclusively use Stripe's secure gateway, supporting all major credit cards including Visa, Mastercard, and Amex." },
        { q: "Can I apply multiple coupons?", a: "Only one validation coupon can be applied per checkout session to ensure fair residency rewards." },
        { q: "How do I report a building issue?", a: "Members can use the 'Announcements' and 'Messaging' board within their dashboard to communicate with management." }
    ];

    return (
        <div className="min-h-screen bg-white pt-32 pb-20 px-4">
            <div className="max-w-7xl mx-auto space-y-32">
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                        Resident concierge
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">Support <span className="text-indigo-600">& Help</span></h2>
                    <p className="max-w-2xl mx-auto text-slate-400 font-medium tracking-tight">Access our verified knowledge base or reach out to our structural support team.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* FAQ section */}
                    <div className="space-y-10">
                        <div className="space-y-4">
                            <h3 className="text-3xl font-black text-slate-900 tracking-tighter">Frequently <br /> Questioned</h3>
                            <div className="w-12 h-1 bg-indigo-600 rounded-full"></div>
                        </div>

                        <div className="space-y-4">
                             {faqs.map((f, i) => (
                                <details key={i} className="group bg-slate-50 rounded-[2rem] p-8 cursor-pointer open:bg-white open:ring-2 open:ring-indigo-100 transition-all">
                                    <summary className="list-none flex items-center justify-between font-black text-slate-800 text-lg group-open:text-indigo-600">
                                        {f.q}
                                        <ChevronDown size={24} className="group-open:rotate-180 transition-transform" />
                                    </summary>
                                    <p className="mt-6 text-slate-500 font-medium leading-relaxed">{f.a}</p>
                                </details>
                             ))}
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-slate-900 rounded-[4rem] p-10 lg:p-14 text-white space-y-10 relative overflow-hidden">
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-16 -mb-16 blur-2xl"></div>
                        <h3 className="text-3xl font-black tracking-tight">Direct Support</h3>
                        
                        <form className="grid grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Full Identity</label>
                                <input type="text" placeholder="John Doe" className="w-full bg-white/5 border-2 border-transparent rounded-[1.5rem] px-8 py-5 focus:bg-white/10 focus:border-indigo-600 outline-none transition-all font-bold" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Secure Email</label>
                                <input type="email" placeholder="john@domain.com" className="w-full bg-white/5 border-2 border-transparent rounded-[1.5rem] px-8 py-5 focus:bg-white/10 focus:border-indigo-600 outline-none transition-all font-bold" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Enquiry Specification</label>
                                <textarea rows={4} placeholder="Describe your request..." className="w-full bg-white/5 border-2 border-transparent rounded-[1.5rem] px-8 py-5 focus:bg-white/10 focus:border-indigo-600 outline-none transition-all font-bold resize-none" />
                            </div>
                            <button className="w-full py-6 bg-indigo-600 hover:bg-white hover:text-indigo-600 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-indigo-500/10">
                                Dispatch Protocol
                            </button>
                        </form>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-white/5 rounded-xl flex items-center justify-center">
                                    <Phone size={18} className="text-indigo-400" />
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-widest">+880 1712-345678</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-white/5 rounded-xl flex items-center justify-center">
                                    <Mail size={18} className="text-indigo-400" />
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-widest">support@domexis.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Support;
