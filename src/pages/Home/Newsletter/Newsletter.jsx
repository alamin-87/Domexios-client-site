import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Send } from 'lucide-react';

const Newsletter = () => {
    return (
        <section className="py-24 px-6 overflow-hidden">
            <Motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="max-w-7xl mx-auto bg-slate-900 rounded-[3rem] p-12 md:p-24 relative overflow-hidden text-center"
            >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 blur-[100px] rounded-full -ml-20 -mb-20"></div>

                <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">Stay in the <span className="text-blue-500 italic">Loop.</span></h2>
                        <p className="text-slate-400 font-medium text-lg">
                            Get the latest updates on available units, exclusive residency offers, and building news direct to your secure uplink.
                        </p>
                    </div>

                    <form className="flex flex-col md:flex-row gap-4">
                        <input 
                            type="email" 
                            placeholder="Enter your secure email..." 
                            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-blue-500 transition-colors font-bold"
                            required
                        />
                        <button className="px-10 py-4 bg-blue-600 hover:bg-white hover:text-blue-600 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-900/40 flex items-center justify-center gap-3">
                            Subscribe <Send size={18} />
                        </button>
                    </form>
                    
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">
                        Respecting your data privacy. No spam protocols active.
                    </p>
                </div>
            </Motion.div>
        </section>
    );
};

export default Newsletter;
