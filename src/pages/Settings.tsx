// src/pages/Settings.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) return navigate("/login");
      setUser(data.user);
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-vorld-dark text-white px-4 py-12">
      <div className="glass-card max-w-md w-full p-8 rounded-xl shadow-xl text-center">
        <h2 className="text-2xl font-bold mb-2">Account Settings</h2>
        <p className="text-muted-foreground mb-6">Manage your account preferences.</p>

        <div className="text-left text-sm space-y-2 mb-4">
          <div><strong>Name:</strong> {user.user_metadata.full_name}</div>
          <div><strong>Email:</strong> {user.email}</div>
          <div><strong>ID:</strong> {user.id}</div>
        </div>

        <button onClick={handleLogout} className="btn-danger w-full mt-4">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
