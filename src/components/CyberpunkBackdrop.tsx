
import React from "react";

const CyberpunkBackdrop: React.FC = () => (
  <>
    <div className="absolute inset-0 -z-10 bg-[#141422]"/>
    <div
      className="absolute left-1/4 top-0 w-1/2 h-1/2 blur-3xl opacity-50 rounded-full"
      style={{
        background: "radial-gradient(ellipse 60% 80% at 50% 30%, #8A2BE2 40%, transparent 80%)"
      }}
    />
    <div
      className="absolute right-0 bottom-0 w-1/3 h-1/3 blur-2xl opacity-40 rounded-full"
      style={{
        background: "radial-gradient(ellipse 30% 60% at 80% 85%, #0CFFE1 60%, transparent 90%)"
      }}
    />
    <div
      className="absolute left-4 bottom-1/4 w-1/4 h-1/4 blur-2xl opacity-30 rounded-full"
      style={{
        background: "radial-gradient(ellipse 50% 70% at 10% 70%, #FF00FF 40%, transparent 90%)"
      }}
    />
    {/* Neon horizontal line */}
    <div className="absolute left-1/2 -translate-x-1/2 top-[27%] w-3/5 h-[2px] bg-gradient-to-r from-cyan-400/40 via-purple-500/70 to-pink-500/60 blur-sm opacity-70 shadow-glow"/>
    {/* Subtle grid */}
    <div className="absolute inset-0 pointer-events-none opacity-10 z-0 bg-[url('/hero-bg.svg')]" />
  </>
);

export default CyberpunkBackdrop;