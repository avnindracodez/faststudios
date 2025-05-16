// src/pages/Profile.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
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

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-vorld-dark text-white px-4 py-12">
      <div className="glass-card max-w-md w-full p-8 rounded-xl shadow-xl text-center">
        <img
          src={user.user_metadata.avatar_url}
          alt="Avatar"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-semibold">{user.user_metadata.full_name}</h2>
        <p className="text-sm text-muted-foreground">{user.email}</p>

        <button
          onClick={() => navigate("/settings")}
          className="mt-6 btn-primary w-full"
        >
          Go to Settings
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
