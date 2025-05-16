import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

const LoginPage = () => {
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: window.location.origin,
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-vorld-dark text-white">
      <div className="glass-card p-8 rounded-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Login with Discord</h1>
        <Button className="btn-primary w-full" onClick={login}>
          Connect Discord
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
