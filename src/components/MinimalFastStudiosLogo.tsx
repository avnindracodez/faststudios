
import React from "react";

const MinimalFastStudiosLogo: React.FC = () => (
  <div className="flex items-center justify-center gap-2 select-none mb-8">
    <span className="font-orbitron font-black tracking-widest text-4xl md:text-5xl gradient-text bg-gradient-to-r from-orange-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
      Fast
    </span>
    <span className="rounded-full w-3 h-3 bg-orange-400 shadow-[0_0_10px_2px_#f97316]" />
    <span className="font-orbitron font-black tracking-widest text-4xl md:text-5xl gradient-text bg-gradient-to-r from-blue-400 via-purple-600 to-orange-400 bg-clip-text text-transparent ml-2">
      Studios
    </span>
  </div>
);

export default MinimalFastStudiosLogo;