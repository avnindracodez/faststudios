import React, { useEffect, useState } from "react";
import {
  Home,
  Gamepad2,
  Users,
  Briefcase,
  Mail,
  UserCircle,
  LogOut,
  Settings,
  LogIn,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { name: "Home", icon: <Home size={20} />, path: "/" },
  { name: "Games", icon: <Gamepad2 size={20} />, path: "/games" },
  { name: "Community", icon: <Users size={20} />, path: "/community" },
  { name: "Careers", icon: <Briefcase size={20} />, path: "/careers" },
  { name: "Contact", icon: <Mail size={20} />, path: "/contact" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  // Fetch user on mount
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      fetchUser();
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="fixed top-1/2 left-4 -translate-y-1/2 z-50 hidden sm:flex flex-col items-center gap-4 bg-vorld-darker/80 backdrop-blur-lg p-3 rounded-2xl shadow-lg">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`relative group text-muted-foreground hover:text-vorld-blue transition-colors ${
              location.pathname === item.path ? "text-vorld-blue" : ""
            }`}
          >
            <div className="p-2 rounded-lg hover:bg-vorld-blue/10 transition">
              {item.icon}
            </div>
            <span className="absolute left-12 top-1/2 -translate-y-1/2 px-2 py-1 rounded bg-vorld-darker text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md whitespace-nowrap">
              {item.name}
            </span>
          </Link>
        ))}

        {/* Avatar or Login Icon */}
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <Avatar className="w-9 h-9 mt-2 cursor-pointer">
                <AvatarImage
                  src={
                    user?.user_metadata?.avatar_url ||
                    "https://api.dicebear.com/7.x/identicon/svg?seed=fast"
                  }
                />
                <AvatarFallback>
                  {user?.email?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" className="z-[1000]">
              <DropdownMenuItem
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2"
              >
                <UserCircle size={16} />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate("/settings")}
                className="flex items-center gap-2"
              >
                <Settings size={16} />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-500"
              >
                <LogOut size={16} />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            to="/login"
            className="mt-4 p-2 rounded-full hover:bg-white/10 transition text-muted-foreground"
          >
            <LogIn size={20} />
          </Link>
        )}
      </div>

      {/* Mobile Bottom Navbar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 sm:hidden bg-vorld-darker/70 backdrop-blur-lg border border-vorld-blue/30 rounded-full px-6 py-3 flex justify-between items-center gap-5 shadow-xl max-w-[90%]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-1 text-xs transition-all duration-200 ${
                isActive ? "text-vorld-blue font-semibold" : "text-muted-foreground"
              }`}
            >
              <div
                className={`p-2 rounded-full transition-all duration-200 ${
                  isActive ? "bg-vorld-blue/10 text-vorld-blue" : "hover:bg-white/5"
                }`}
              >
                {item.icon}
              </div>
              {isActive && (
                <span className="text-[10px] leading-none">{item.name}</span>
              )}
            </Link>
          );
        })}

        {user ? (
          <Link to="/profile">
            <Avatar className="w-8 h-8">
              <AvatarImage
                src={
                  user?.user_metadata?.avatar_url ||
                  "https://api.dicebear.com/7.x/identicon/svg?seed=fast"
                }
              />
              <AvatarFallback>
                {user?.email?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </Link>
        ) : (
          <Link to="/login">
            <LogIn className="w-5 h-5 text-muted-foreground" />
          </Link>
        )}
      </div>
    </>
  );
};

export default Navbar;
