import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: window.location.origin, // or append route after auth
      },
    });

    if (error) {
      alert("Login failed: " + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-vorld-dark flex items-center justify-center px-4">
      <motion.div
        className="glass-card max-w-md w-full p-8 rounded-xl shadow-lg text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.img
          src="./logo.png"
          alt="Fast Studios"
          className="w-16 h-16 mx-auto mb-4"
          initial={{ scale: 0.7 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
        />
        <h2 className="text-2xl font-bold mb-2">Welcome to Fast Studios</h2>
        <p className="text-muted-foreground mb-6 text-sm">
          Sign in with Discord to continue
        </p>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loader2 className="animate-spin h-4 w-4" />
          ) : (
            <img
              src="https://cdn-icons-png.flaticon.com/512/5968/5968756.png"
              alt="Discord"
              className="w-5 h-5"
            />
          )}
          {loading ? "Redirecting..." : "Login with Discord"}
        </button>

        <p className="text-xs text-muted-foreground mt-6">
          You must be an authorized user to access the ticket system.
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
