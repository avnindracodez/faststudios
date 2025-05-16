import { supabase } from "@/integrations/supabase/client";

export default function SignInWithDiscord() {
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: window.location.origin,
      },
    });
  };

  return (
    <button onClick={login} className="btn-primary">
      Sign in with Discord
    </button>
  );
}
