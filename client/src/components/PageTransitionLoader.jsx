import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const PageTransitionLoader = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-brand-bg pointer-events-none flex items-center justify-center"
        >
          {/* Subtle minimal loading indicator */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-8 h-8 border-2 border-brand-accent/20 border-t-brand-accent rounded-full"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageTransitionLoader;
