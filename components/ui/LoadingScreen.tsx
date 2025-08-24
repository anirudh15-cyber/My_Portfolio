"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

const LoadingScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3500); // simulate load
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          className="fixed inset-0 flex items-center justify-center 
                     bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 
                     text-white z-[9999]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Animated Logo */}
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 220 110"
            className="w-2/3 max-w-xs h-auto"
          >
            {/* A Shape */}
            <motion.path
              d="M70 100 L110 30 L150 100 Z" // Triangle (A)
              stroke="url(#grad1)"
              strokeWidth="8"
              fill="transparent"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />

            {/* N Shape */}
            <motion.path
              d="M80 100 L80 40 L140 100 L140 40"
              stroke="url(#grad2)"
              strokeWidth="8"
              fill="transparent"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
            />

            {/* Gradients */}
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
              <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </motion.svg>

          {/* Subtext */}
          <motion.p
            className="absolute bottom-20 text-slate-400 tracking-widest text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            Loading Portfolio...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
