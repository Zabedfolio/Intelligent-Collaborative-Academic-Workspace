'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../store/useAuthStore';
import {
  ChevronDown,
  LayoutDashboard,
  User,
  Settings,
  LogOut
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProfileDropdown() {
  const router = useRouter();
  const { user, setActiveTab, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown on click outside or Escape keypress
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    toast.success('Logged out successfully');
    router.push('/login');
  };

  const handleDashboardClick = () => {
    toast.success(`Navigating to ${user.role.toUpperCase()} Dashboard`);
    setActiveTab('dashboard');
    setIsOpen(false);
    router.push('/dashboard');
  };

  if (!mounted) {
    return (
      <div className="w-24 h-9 rounded-2xl bg-slate-100 animate-pulse border border-slate-200/60" />
    );
  }

  if (!user) {
    return (
      <button
        onClick={() => router.push('/login')}
        className="px-4 py-2 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-hover transition-all"
      >
        Sign In
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2.5 p-1.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-brand transition-all focus:outline-none focus:ring-2 focus:ring-brand/20 shadow-sm"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="w-8 h-8 rounded-xl bg-brand text-white flex items-center justify-center font-bold text-xs shadow-sm">
          {user.initials || 'U'}
        </div>
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-bold text-slate-900 leading-tight">{user.name}</span>
          <span className="text-[10px] font-semibold text-brand uppercase tracking-wider capitalize">
            {user.role}
          </span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Profile Dropdown Popup Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2.5 w-64 bg-white rounded-2xl shadow-2xl shadow-slate-900/10 border border-slate-100 py-2.5 z-50 divide-y divide-slate-100 animate-in fade-in zoom-in-95 duration-150">
          {/* User Profile Header */}
          <div className="px-4 py-3 bg-slate-50/70 rounded-t-2xl space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-brand text-white flex items-center justify-center font-bold text-sm shadow-sm">
                {user.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
              </div>
            </div>

            {/* Role Badge */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Role Access
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                user.role === 'student'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  : user.role === 'teacher'
                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                  : 'bg-rose-100 text-rose-800 border border-rose-200'
              }`}>
                {user.role}
              </span>
            </div>
          </div>

          {/* Dropdown Menu Links */}
          <div className="py-1.5">
            <button
              onClick={handleDashboardClick}
              className="w-full flex items-center space-x-3 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand transition-colors rounded-lg"
            >
              <LayoutDashboard className="w-4 h-4 text-brand" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                router.push('/profile');
              }}
              className="w-full flex items-center space-x-3 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand transition-colors rounded-lg cursor-pointer"
            >
              <User className="w-4 h-4 text-slate-500" />
              <span>Profile</span>
            </button>

            <button
              onClick={() => {
                toast.success('Navigating to Account Settings');
                setIsOpen(false);
              }}
              className="w-full flex items-center space-x-3 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand transition-colors rounded-lg"
            >
              <Settings className="w-4 h-4 text-slate-500" />
              <span>Settings</span>
            </button>
          </div>

          {/* Logout Action */}
          <div className="py-1">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors rounded-lg"
            >
              <LogOut className="w-4 h-4 text-rose-500" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
