import React from 'react';
import { Home, Gamepad2, Users, Briefcase, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Home', icon: <Home size={20} />, path: '/' },
  { name: 'Games', icon: <Gamepad2 size={20} />, path: '/games' },
  { name: 'Community', icon: <Users size={20} />, path: '/community' },
  { name: 'Careers', icon: <Briefcase size={20} />, path: '/careers' },
  { name: 'Contact', icon: <Mail size={20} />, path: '/contact' },
];

const SidebarWidget = () => {
  const location = useLocation();

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="fixed top-1/2 left-4 -translate-y-1/2 z-50 hidden sm:flex flex-col items-center gap-4 bg-vorld-darker/80 backdrop-blur-lg p-3 rounded-2xl shadow-lg">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`relative group text-muted-foreground hover:text-vorld-blue transition-colors ${
              location.pathname === item.path ? 'text-vorld-blue' : ''
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
      </div>

     {/* Mobile Bottom Navigation - Modern Look */}
<div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 sm:hidden bg-vorld-darker/70 backdrop-blur-lg border border-vorld-blue/30 rounded-full px-6 py-3 flex justify-between items-center gap-5 shadow-xl max-w-[90%]">
  {navItems.map((item) => {
    const isActive = location.pathname === item.path;

    return (
      <Link
        key={item.name}
        to={item.path}
        className={`flex flex-col items-center justify-center gap-1 text-xs transition-all duration-200 ${
          isActive ? 'text-vorld-blue font-semibold' : 'text-muted-foreground'
        }`}
      >
        <div
          className={`p-2 rounded-full transition-all duration-200 ${
            isActive
              ? 'bg-vorld-blue/10 text-vorld-blue'
              : 'hover:bg-white/5'
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
</div>

    </>
  );
};

export default SidebarWidget;
