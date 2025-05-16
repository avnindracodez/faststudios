import { useContext, createContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type User = {
  id: string;
  display_name: string;
  avatar_url: string;
  role: string;
};

const AuthContext = createContext<{
  user: User | null;
  loading: boolean;
  signIn: () => void;
  signOut: () => void;
}>({
  user: null,
  loading: true,
  signIn: () => {},
  signOut: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const { data: session } = await supabase.auth.getSession();
    const uid = session?.session?.user.id;
    if (!uid) return setLoading(false);

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", uid)
      .single();

    if (error) {
      // If profile doesn't exist yet
      const userMeta = session.session.user.user_metadata;
      await supabase.from("profiles").insert({
        id: uid,
        display_name: userMeta.full_name || userMeta.name || "User",
        avatar_url: userMeta.avatar_url,
      });
      return fetchUser(); // re-fetch
    }

    setUser(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
    supabase.auth.onAuthStateChange(() => fetchUser());
  }, []);

  const signIn = async () => {
    await supabase.auth.signInWithOAuth({ provider: "discord" });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
