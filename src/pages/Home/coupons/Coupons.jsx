import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { FaTicketAlt, FaClock, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Skeleton from "../../../components/common/Skeleton";

const Coupons = () => {
  const axiosInstance = useAxios();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 4;

  const {
    data: { coupons = [], total = 0 } = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["coupons", currentPage],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(`/coupons?page=${currentPage}&limit=${limit}`);
        return res.data;
      } catch (err) {
        console.error("Coupons Fetch Error:", err);
        throw err;
      }
    },
    keepPreviousData: true,
  });

  const totalPages = Math.ceil(total / limit);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  if (isLoading) return (
    <div className="py-24 max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-8 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] h-64">
            <Skeleton className="h-8 w-1/2 mb-4" />
            <Skeleton className="h-4 w-3/4 mb-8" />
            <Skeleton className="h-16 w-full rounded-2xl" />
          </div>
        ))}
      </div>
    </div>
  );
  
  if (isError) return <p className="text-center text-red-500 py-10">Error: {error.message}</p>;

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <Motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-bold tracking-tight mb-4">
            <FaTicketAlt /> Limited Offers
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900">
            Exclusive Benefits
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto text-lg leading-relaxed">
            Unlock special discounts and resident perks. Apply these codes during your next rental payment.
          </p>
        </Motion.div>

        <AnimatePresence mode="wait">
          <Motion.div 
            key={currentPage}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          >
            {coupons.length > 0 ? (
              coupons.map((coupon) => (
                <Motion.div
                  key={coupon._id}
                  variants={cardVariants}
                  whileHover={{ scale: 1.02, rotate: 1 }}
                  className="relative p-8 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] overflow-hidden group hover:border-blue-300 hover:bg-blue-50/30 transition-all duration-300 flex flex-col h-full"
                >
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/5 rounded-full blur-2xl group-hover:bg-blue-600/10"></div>
                  
                  <div className="flex justify-between items-start mb-6">
                    <div className="text-left">
                      <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                        {coupon.discount}% OFF
                      </h3>
                      <p className="text-slate-500 font-medium">{coupon.title}</p>
                    </div>
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 border border-slate-100">
                      <FaTicketAlt />
                    </div>
                  </div>

                  <p className="text-slate-600 text-left mb-8 line-clamp-3 flex-1">
                    {coupon.description}
                  </p>

                  <div className="flex flex-col gap-4 mt-auto">
                    <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm border-dashed">
                      <span className="text-xs uppercase font-bold text-slate-400 tracking-widest">CODE</span>
                      <span className="font-mono font-bold text-blue-600 tracking-widest text-lg">
                        {coupon.code}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 justify-center">
                      <FaClock className="text-red-400" />
                      VALID TILL: {new Date(coupon.validTill).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="absolute top-1/2 -left-4 w-8 h-8 bg-white rounded-full -translate-y-1/2 border-r border-slate-200"></div>
                  <div className="absolute top-1/2 -right-4 w-8 h-8 bg-white rounded-full -translate-y-1/2 border-l border-slate-200"></div>
                </Motion.div>
              ))
            ) : (
              <div className="col-span-full py-12 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                <p className="text-slate-400">No active coupons found at the moment.</p>
              </div>
            )}
          </Motion.div>
        </AnimatePresence>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-4 bg-slate-50 rounded-full text-slate-400 hover:bg-blue-600 hover:text-white disabled:opacity-30 disabled:hover:bg-slate-50 disabled:hover:text-slate-400 transition-all duration-300 shadow-sm"
            >
              <FaChevronLeft />
            </button>
            
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-12 h-12 rounded-full font-bold transition-all duration-300 ${
                    currentPage === i + 1 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                      : "bg-slate-50 text-slate-400 hover:bg-blue-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-4 bg-slate-50 rounded-full text-slate-400 hover:bg-blue-600 hover:text-white disabled:opacity-30 disabled:hover:bg-slate-50 disabled:hover:text-slate-400 transition-all duration-300 shadow-sm"
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Coupons;


