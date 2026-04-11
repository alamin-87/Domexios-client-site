import React from "react";
import { motion } from "framer-motion";

const Skeleton = ({ className }) => {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`bg-slate-200 rounded-lg ${className}`}
    />
  );
};

export const CardSkeleton = () => (
  <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm flex flex-col h-full p-6">
    <Skeleton className="h-48 w-full rounded-2xl mb-6" />
    <div className="space-y-4">
      <Skeleton className="h-8 w-3/4" />
      <div className="flex justify-between">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      <div className="py-4 border-y border-slate-50 flex gap-4">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-6 w-1/3" />
      </div>
      <div className="mt-auto flex gap-3">
        <Skeleton className="h-12 flex-[1] rounded-xl" />
        <Skeleton className="h-12 flex-[2] rounded-xl" />
      </div>
    </div>
  </div>
);

export const TableRowSkeleton = ({ cols = 5 }) => (
  <div className="flex items-center gap-4 p-4 border-b border-slate-50">
    {[...Array(cols)].map((_, i) => (
      <Skeleton key={i} className="h-6 flex-1" />
    ))}
  </div>
);

export const ProfileSkeleton = () => (
  <div className="max-w-4xl mx-auto p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl">
    <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
      <Skeleton className="w-32 h-32 rounded-full" />
      <div className="space-y-3 flex-1">
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-6 w-1/3" />
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Skeleton className="h-32 rounded-2xl" />
      <Skeleton className="h-32 rounded-2xl" />
      <Skeleton className="h-32 rounded-2xl" />
      <Skeleton className="h-32 rounded-2xl" />
    </div>
  </div>
);

export default Skeleton;
