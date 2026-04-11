import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router';
import useAxios from '../../../hooks/useAxios';
import { CardSkeleton } from '../../../components/common/Skeleton';
import { FaBed, FaCity, FaArrowRight, FaMapMarkerAlt, FaStar } from 'react-icons/fa';

const FeaturedApartments = () => {
    const axiosInstance = useAxios();

    const { data: apartments = [], isLoading } = useQuery({
        queryKey: ['featured-apartments'],
        queryFn: async () => {
            const res = await axiosInstance.get('/apartment?limit=4');
            // Assuming the backend supports ?limit=4, or we slice the response
            return res.data.slice(0, 4); 
        }
    });

    return (
        <section className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                <Motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-black tracking-widest uppercase mb-4">
                        Featured Properties
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                        Signature Residences
                    </h2>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                        Explore our hand-picked selection of premium units. Designed for maximum light, space, and comfort.
                    </p>
                </Motion.div>

                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
                        {[...Array(4)].map((_, i) => (
                            <CardSkeleton key={i} />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 auto-rows-fr">
                        {apartments.map((apt, index) => (
                            <Motion.div
                                key={apt._id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
                            >
                                <div className="relative h-56 overflow-hidden flex-shrink-0">
                                    <img 
                                        src={apt.image} 
                                        alt={`Apartment ${apt.apartmentNo}`} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <div className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black text-blue-600 uppercase tracking-widest shadow-sm">
                                            {apt.status || "Available"}
                                        </div>
                                    </div>
                                    <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-1">
                                        <FaStar className="text-amber-400" size={10} />
                                        Premium
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-black text-slate-900 mb-2">
                                        Unit {apt.apartmentNo}
                                    </h3>
                                    <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                                        Experience elevated living in this luxury unit featuring premium finishes and stunning architectural details.
                                    </p>
                                    
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Floor Location</span>
                                            <span className="text-sm font-black text-slate-700">Floor {apt.floorNo}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Building Block</span>
                                            <span className="text-sm font-black text-slate-700">{apt.blockName} Block</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 text-xs font-bold text-slate-500 mb-6 pb-6 border-b border-slate-100">
                                        <div className="flex items-center gap-1.5">
                                            <FaBed className="text-blue-500" /> 2 Beds
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <FaCity className="text-blue-500" /> Great View
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <FaMapMarkerAlt className="text-blue-500" /> Domexis
                                        </div>
                                    </div>

                                    <div className="mt-auto flex items-center justify-between">
                                        <div>
                                            <p className="text-2xl font-black text-blue-600 leading-none">${apt.rent}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-1">Per Month</p>
                                        </div>
                                        <Link 
                                            to={`/apartment/${apt._id}`}
                                            className="w-12 h-12 rounded-2xl bg-slate-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm"
                                        >
                                            <FaArrowRight className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                        </Link>
                                    </div>
                                </div>
                            </Motion.div>
                        ))}
                    </div>
                )}
                
                <Motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-center mt-12"
                >
                    <Link 
                        to="/apartmentList" 
                        className="px-8 py-4 bg-slate-900 text-white font-black rounded-2xl flex items-center gap-3 hover:bg-blue-600 transition-colors shadow-xl"
                    >
                        Explore All Apartments <FaArrowRight />
                    </Link>
                </Motion.div>
            </div>
        </section>
    );
};

export default FeaturedApartments;
