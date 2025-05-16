import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

const UserMenu = () => {
  const { user } = useAuth();
  const avatar = user?.user_metadata?.avatar_url;

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  return user ? (
    <div className="relative group">
      <img
        src={avatar}
        alt="Avatar"
        className="w-9 h-9 rounded-full cursor-pointer border border-vorld-blue"
      />
      <div className="absolute right-0 top-12 hidden group-hover:block bg-vorld-darker p-4 rounded shadow-md text-sm z-50">
        <Link to="/profile" className="block mb-2 hover:text-vorld-blue">Profile</Link>
        <Link to="/settings" className="block mb-2 hover:text-vorld-blue">Settings</Link>
        <button onClick={logout} className="text-red-500 hover:underline">Logout</button>
      </div>
    </div>
  ) : null;
};

export default UserMenu;
