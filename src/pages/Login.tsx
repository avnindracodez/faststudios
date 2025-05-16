import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const backgroundVariants = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

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
    // else no need to set loading false since page will redirect
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden bg-gradient-to-r from-purple-900 via-indigo-900 to-pink-900"
      variants={backgroundVariants}
      animate="animate"
      style={{
        backgroundSize: "200% 200%",
      }}
    >
      {/* Animated floating circles */}
      <motion.div
        className="absolute top-20 left-10 w-40 h-40 rounded-full bg-pink-600 opacity-20 blur-3xl"
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-32 right-10 w-60 h-60 rounded-full bg-indigo-600 opacity-20 blur-3xl"
        animate={{
          y: [0, -40, 0],
          x: [0, 20, 0],
          scale: [1, 0.95, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Glassmorphic Card */}
      <motion.div
        className="relative max-w-md w-full bg-white/10 backdrop-blur-lg rounded-3xl p-10 shadow-xl border border-white/20 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.03 }}
      >
        {/* Logo with pulse animation */}
        <motion.img
          src="./logo.png"
          alt="Fast Studios"
          className="w-20 h-20 mb-6 rounded-full shadow-lg"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6, type: "spring", stiffness: 120 }}
          whileHover={{ scale: 1.1, rotate: [0, 10, -10, 0] }}
        />

        {/* Animated Gradient Text */}
        <motion.h1
          className="text-4xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-4 select-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          Welcome to Fast Studios
        </motion.h1>

        <motion.p
          className="text-sm text-white/80 mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          Sign in with Discord to continue
        </motion.p>

        {/* Login Button */}
        <motion.button
          onClick={handleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold rounded-lg py-3 shadow-lg shadow-indigo-800/50"
          whileHover={{ scale: 1.05, boxShadow: "0 0 12px rgba(129, 140, 248, 0.8)" }}
          whileTap={{ scale: 0.95 }}
          aria-label="Login with Discord"
        >
          {loading ? (
            <Loader2 className="animate-spin h-6 w-6" />
          ) : (
            <motion.img
              src="https://cdn-icons-png.flaticon.com/512/5968/5968756.png"
              alt="Discord"
              className="w-6 h-6"
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
            />
          )}
          <span className="text-lg">{loading ? "Redirecting..." : "Login with Discord"}</span>
        </motion.button>

        <motion.p
          className="text-xs text-white/60 mt-6 text-center select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          You must be an authorized user to access the ticket system.
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;
