import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

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
    <motion.div
      className="min-h-screen bg-gradient-to-b from-[#07101f] to-[#0f1a35] flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <div
        className="relative max-w-md w-full bg-[#0a1526]/70 backdrop-blur-lg rounded-3xl border border-[#3a4b6b] p-10 text-center
                   shadow-[0_0_60px_rgba(38,153,251,0.3)]"
      >
        {/* Discord Icon Circle */}
        <div
          className="mx-auto mb-8 w-20 h-20 rounded-full bg-[#2e3a59] flex items-center justify-center 
                     shadow-[0_0_20px_rgba(38,153,251,0.6)]"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/5968/5968756.png"
            alt="Discord"
            className="w-10 h-10"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-semibold text-white mb-2 font-sans tracking-wide">
          Welcome back
        </h1>
        <p className="text-gray-400 mb-8 font-light text-sm">
          Please sign in with Discord to continue.
        </p>

        {/* Discord Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="relative inline-flex items-center justify-center w-full py-3 rounded-xl
                     bg-gradient-to-r from-[#1e40af] via-[#3b82f6] to-[#60a5fa] text-white
                     font-semibold text-lg tracking-wider shadow-lg
                     hover:brightness-110 transition duration-300 disabled:opacity-60"
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 mr-3 text-white"
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
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
          ) : (
            <img
              src="https://cdn-icons-png.flaticon.com/512/5968/5968756.png"
              alt="Discord"
              className="w-6 h-6 mr-3"
            />
          )}
          {loading ? "Redirecting..." : "Continue with Discord"}
        </button>
      </div>
    </motion.div>
  );
};

export default LoginPage;
