import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    if (progress >= 100) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      onComplete();
      return;
    }

    intervalRef.current = setInterval(() => {
      setProgress((p) => Math.min(100, p + (isHolding ? 1.5 : 0.3)));
    }, 30);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHolding, progress, onComplete]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-vorld-dark text-vorld-text font-exo select-none px-6">
      <motion.h1
        className="text-5xl sm:text-6xl font-bold mb-10 text-gradient"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Fast • Studios
      </motion.h1>

      <svg
        className="w-36 h-36 mb-8"
        viewBox="0 0 150 150"
        aria-label="Loading progress"
      >
        <circle
          cx="75"
          cy="75"
          r={radius}
          fill="none"
          stroke="#3b3b4f"
          strokeWidth="10"
        />
        <motion.circle
          cx="75"
          cy="75"
          r={radius}
          fill="none"
          stroke="#6e6ea0"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      </svg>

      <motion.button
        className={`mt-4 px-6 py-3 rounded-md font-semibold text-sm tracking-wider transition-colors
          ${isHolding ? "bg-vorld-purple text-white" : "bg-vorld-blue text-white hover:bg-vorld-purple"}`}
        onMouseDown={() => setIsHolding(true)}
        onMouseUp={() => setIsHolding(false)}
        onMouseLeave={() => setIsHolding(false)}
        onTouchStart={() => setIsHolding(true)}
        onTouchEnd={() => setIsHolding(false)}
        whileTap={{ scale: 0.95 }}
        aria-label="Hold to speed up loading"
      >
        {isHolding ? "Boosting..." : "Hold to Boost Loading"}
      </motion.button>

      <motion.p
        className="uppercase text-gray-400 tracking-widest text-sm sm:text-base mt-4"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        Loading — Please wait
      </motion.p>

      <footer className="absolute bottom-5 text-xs text-gray-500 select-none">
        © 2025 Fast Studios. Fueling next-gen play.
      </footer>
    </div>
  );
};

export default LoadingScreen;
