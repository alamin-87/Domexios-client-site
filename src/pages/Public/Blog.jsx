import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, User, ArrowRight } from 'lucide-react';

const Blog = () => {
    const posts = [
        {
            title: "Future of Urban Architecture",
            date: "Oct 12, 2024",
            author: "Sarah Miller",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
            excerpt: "How vertical cities are solving the global housing crisis through smart architectural design."
        },
        {
            title: "Sustainable Living Trends",
            date: "Oct 10, 2024",
            author: "Domexis Design Team",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop",
            excerpt: "Integrating bio-architecture into modern residency blocks for better air quality."
        },
        {
            title: "The Smart Home Revolution",
            date: "Oct 05, 2024",
            author: "John Doe",
            image: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1000&auto=format&fit=crop",
            excerpt: "Why Domexis residents are leading the way in fully automated home environments."
        }
    ];

    return (
        <div className="min-h-screen bg-white pt-32 pb-20 px-4">
            <div className="max-w-7xl mx-auto space-y-20">
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                        <BookOpen size={12} />
                        Domexis Chronicles
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">Editorial <span className="text-blue-600">Journal</span></h2>
                    <p className="max-w-2xl mx-auto text-slate-500 font-medium tracking-tight">Insights into modern architecture, smart living, and the Domexis lifestyle.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {posts.map((post, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group flex flex-col space-y-6"
                        >
                            <div className="relative h-80 overflow-hidden rounded-[2.5rem] shadow-2xl shadow-slate-200">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute top-6 left-6 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase tracking-widest border border-white/20">
                                    {post.date}
                                </div>
                            </div>
                            <div className="px-4 space-y-4">
                                <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                                <p className="text-slate-500 font-medium line-clamp-2 leading-relaxed">{post.excerpt}</p>
                                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        <User size={14} className="text-blue-600" /> {post.author}
                                    </div>
                                    <button className="text-blue-600 flex items-center gap-2 text-xs font-black uppercase tracking-widest group/btn">
                                        Read More <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
