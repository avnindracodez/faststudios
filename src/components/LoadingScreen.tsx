import { useEffect, useState, useRef } from "react";
import CustomCursor from "@/components/CustomCursor"; // your old cursor

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (progress >= 100) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      // small delay for smoothness before finishing
      setTimeout(() => onComplete(), 300);
      return;
    }

    intervalRef.current = setInterval(() => {
      setProgress((p) => Math.min(100, p + (isHolding ? 1.5 : 0.3)));
    }, 30);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHolding, progress, onComplete]);

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center bg-vorld-dark text-vorld-text font-exo select-none px-6"
      onMouseDown={() => setIsHolding(true)}
      onMouseUp={() => setIsHolding(false)}
      onMouseLeave={() => setIsHolding(false)}
      onTouchStart={() => setIsHolding(true)}
      onTouchEnd={() => setIsHolding(false)}
    >
      {/* Use your old CustomCursor here */}
      <CustomCursor />

      <h1 className="text-5xl sm:text-6xl font-bold mb-10 text-gradient">
        Fast • Studios
      </h1>

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
        <circle
          cx="75"
          cy="75"
          r={radius}
          fill="none"
          stroke="#6e6ea0"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.3s ease" }}
        />
      </svg>

      <button
        className={`mt-4 px-6 py-3 rounded-md font-semibold text-sm tracking-wider transition-colors ${
          isHolding
            ? "bg-vorld-purple text-white"
            : "bg-vorld-blue text-white hover:bg-vorld-purple"
        }`}
      >
        {isHolding ? "Boosting..." : "Hold to Boost Loading"}
      </button>

      <p className="uppercase text-gray-400 tracking-widest text-sm sm:text-base mt-4 animate-pulse">
        Loading — Please wait
      </p>

      <footer className="absolute bottom-5 text-xs text-gray-500 select-none">
        © 2025 Fast Studios. Fueling next-gen play.
      </footer>
    </div>
  );
};

export default LoadingScreen;
