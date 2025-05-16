import React, { useState, useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

const particleOptions = {
  fpsLimit: 60,
  background: {
    color: "#0f172a", // dark blue-black background
  },
  particles: {
    number: { value: 50 },
    color: { value: "#72b1ff" },
    shape: { type: "circle" },
    opacity: { value: 0.2, random: true },
    size: { value: 3, random: true },
    move: {
      enable: true,
      speed: 0.5,
      direction: "none",
      random: true,
      straight: false,
      outModes: "out",
      attract: { enable: false },
    },
  },
  interactivity: {
    events: { onHover: { enable: true, mode: "repulse" }, resize: true },
    modes: { repulse: { distance: 100, duration: 0.4 } },
  },
};

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  // framer-motion values for parallax tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-30, 30], [15, -15]);
  const rotateY = useTransform(x, [-30, 30], [-15, 15]);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) alert("Login failed: " + error.message);
    setLoading(false);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const posX = event.clientX - rect.left - rect.width / 2;
    const posY = event.clientY - rect.top - rect.height / 2;
    x.set(posX);
    y.set(posY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-[#0f172a] to-[#1e293b] flex items-center justify-center overflow-hidden">
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particleOptions}
        className="fixed inset-0 z-0"
      />

      {/* Glass Card with 3D tilt */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, perspective: 800 }}
        className="relative z-10 w-[350px] max-w-full bg-[rgba(15,23,42,0.6)] backdrop-blur-md border border-[rgba(114,177,255,0.3)] rounded-2xl p-10 shadow-lg text-center text-white select-none"
      >
        <motion.div
          className="mb-8 mx-auto w-16 h-16 rounded-full bg-gradient-to-tr from-[#4f7fff] to-[#87b8ff] flex items-center justify-center shadow-md"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 10 }}
        >
          {/* Discord Icon SVG */}
          <svg
            className="w-10 h-10 fill-white"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152...Z" />
          </svg>
        </motion.div>

        <motion.h1
          className="text-3xl font-semibold mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Welcome to Fast Studios
        </motion.h1>

        <motion.p
          className="text-gray-300 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Sign in with Discord to continue
        </motion.p>

        <motion.button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-[#4f7fff] to-[#87b8ff] hover:from-[#6186ff] hover:to-[#9ec4ff] font-semibold shadow-lg flex justify-center items-center gap-3 text-white transition-transform active:scale-95 disabled:opacity-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {loading && (
            <svg
              className="animate-spin w-5 h-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
          )}
          {loading ? "Redirecting..." : "Login with Discord"}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default LoginPage;
