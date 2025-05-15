
import React from "react";
import { motion } from "framer-motion";

const NeonLinearProgress: React.FC = () => (
  <div className="relative w-[332px] max-w-[85vw] h-3 rounded-full overflow-hidden mx-auto bg-gradient-to-r from-[#222] via-[#353547] to-[#222] border border-cyan-600/30 mb-8 shadow-lg">
    <motion.div
      className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#0CFFE1] via-[#8A2BE2] to-[#FF00FF] shadow-[0_0_30px_10px_#0CFFE1aa]"
      initial={{ width: 0 }}
      animate={{ width: "88%" }}
      transition={{
        duration: 2.75,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror"
      }}
      style={{ borderRadius: 8 }}
    />
    <motion.div
      className="absolute top-0 left-0 h-full w-full animate-pulse pointer-events-none"
      style={{
        boxShadow:
          "0 0 20px 4px #8A2BE288, 0 0 5px 1px #0CFFE188, 0 0 50px 8px #FF00FF77"
      }}
    />
  </div>
);

export default NeonLinearProgress;