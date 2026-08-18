import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Search, Users, Plus, Bookmark, User } from 'lucide-react';

const NAV_ITEMS = [
  { path: '/', icon: Compass, label: 'Explore' },
  { path: '/search', icon: Search, label: 'Search' },
  { path: '/spaces', icon: Users, label: 'Spaces' },
  { path: '/add', icon: Plus, label: 'Add', special: true },
  { path: '/saved', icon: Bookmark, label: 'Saved' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export default function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[9999] glass border-t border-white/[0.06] pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-14 max-w-lg mx-auto px-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.path;
          if (item.special) {
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B4A] to-[#F5A623] text-white shadow-glow -mt-3 active:scale-90 transition-transform"
              >
                <item.icon className="w-4 h-4" />
              </Link>
            );
          }
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 py-1 active:scale-90 transition-all ${
                active ? 'text-[#FF6B4A]' : 'text-[#8A8F98]'
              }`}
            >
              <item.icon className="w-[17px] h-[17px]" strokeWidth={active ? 2.5 : 2} />
              <span className="text-[8px] font-medium tracking-wide">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
