"use client";

import { motion } from "framer-motion";
import React from "react";

interface LogoProps {
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ size = 60 }) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className="cursor-pointer"
      whileHover={{ scale: 1.1, rotate: 2 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
    >
      {/* A Shape */}
      <motion.path
        d="M50 150 L100 50 L150 150 Z"
        stroke="url(#grad1)"
        strokeWidth="8"
        fill="transparent"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* N Shape */}
      <motion.path
        d="M70 150 L70 90 L130 150 L130 90"
        stroke="url(#grad2)"
        strokeWidth="8"
        fill="transparent"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Glowing Idle Animation */}
      <motion.circle
        cx="100"
        cy="100"
        r="90"
        stroke="url(#glow)"
        strokeWidth="1.5"
        fill="transparent"
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
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
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
        </radialGradient>
      </defs>
    </motion.svg>
  );
};

export default Logo;
