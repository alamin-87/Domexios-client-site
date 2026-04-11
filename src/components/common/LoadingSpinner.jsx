import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = ({ fullPage = false }) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        animate={{
          rotate: 360,
          borderRadius: ["25%", "25%", "50%", "50%", "25%"],
        }}
        transition={{
          duration: 2,
          ease: "linear",
          repeat: Infinity,
        }}
        className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full shadow-lg"
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-sm font-black text-slate-900 uppercase tracking-widest italic"
      >
        Domexis
      </motion.p>
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-[999] bg-white/80 backdrop-blur-sm flex items-center justify-center">
        {content}
      </div>
    );
  }

  return <div className="p-12 flex justify-center w-full">{content}</div>;
};

export default LoadingSpinner;
