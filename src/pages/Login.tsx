import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      alert("Login failed: " + error.message);
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="min-h-screen bg-gradient-to-b from-[#121212] to-[#1E1E2F] flex items-center justify-center px-6"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.9 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="relative max-w-md w-full bg-[#222236]/80 backdrop-blur-md border border-[#383855] rounded-3xl px-10 py-12 shadow-xl flex flex-col items-center text-center">
          {/* Logo */}
          <img
            src="./logo.png"
            alt="Fast Studios"
            className="w-20 h-20 mb-8 rounded-full shadow-lg"
          />

          {/* Heading */}
          <h1 className="text-4xl font-semibold text-white mb-3 tracking-wide font-sans">
            Fast Studios
          </h1>

          <p className="text-sm text-gray-400 mb-10 font-light font-sans">
            Sign in with Discord to continue
          </p>

          {/* Login Button */}
          <motion.button
            onClick={handleLogin}
            disabled={loading}
            className="relative w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 text-white font-semibold tracking-widest overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated shimmer overlay */}
            <motion.span
              className="absolute top-0 left-[-150%] w-[150%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{ left: ["-150%", "150%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              style={{ pointerEvents: "none" }}
            />
            <span className="relative flex items-center justify-center gap-3">
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
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
              ) : (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/5968/5968756.png"
                  alt="Discord"
                  className="w-6 h-6"
                />
              )}
              {loading ? "Redirecting..." : "Login with Discord"}
            </span>
          </motion.button>

          {/* Footer Text */}
          <p className="text-xs text-gray-500 mt-8 font-light select-none">
            Authorized users only.
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginPage;
