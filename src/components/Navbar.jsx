'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useAuthStore } from '../store/useAuthStore';
import {
  Home as HomeIcon,
  BookOpen,
  Bot,
  GraduationCap,
  BarChart3,
  Users,
  FolderKanban,
  FileUp,
  Sliders,
  CheckSquare,
  PieChart,
  Building2,
  UserCog,
  ShieldCheck,
  LayoutDashboard,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { user, activeTab, setActiveTab, logout } = useAuthStore();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const profileRef = useRef(null);

  // Close profile dropdown when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsProfileOpen(false);
        setIsMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Role-Based Navigation Items (Home included first for all roles)
  const roleNavItems = {
    student: [
      { id: 'home', label: 'Home', icon: HomeIcon },
      { id: 'courses', label: 'Courses', icon: BookOpen },
      { id: 'ai-tutor', label: 'AI Tutor', icon: Bot, badge: 'RAG' },
      { id: 'exam-prep', label: 'Exam Prep', icon: GraduationCap },
      { id: 'analytics', label: 'Mastery Analytics', icon: BarChart3 },
      { id: 'study-groups', label: 'Study Groups', icon: Users }
    ],
    teacher: [
      { id: 'home', label: 'Home', icon: HomeIcon },
      { id: 'course-management', label: 'Course Management', icon: FolderKanban },
      { id: 'resource-library', label: 'Resource Library', icon: FileUp },
      { id: 'ai-config', label: 'AI Config', icon: Sliders },
      { id: 'answer-review', label: 'Answer Review', icon: CheckSquare },
      { id: 'class-analytics', label: 'Class Analytics', icon: PieChart }
    ],
    admin: [
      { id: 'home', label: 'Home', icon: HomeIcon },
      { id: 'hierarchy', label: 'Hierarchy', icon: Building2 },
      { id: 'user-management', label: 'User Management', icon: UserCog },
      { id: 'system-audit', label: 'System Audit', icon: ShieldCheck }
    ]
  };

  const currentNavItems = roleNavItems[user.role] || roleNavItems.student;

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    toast.success('Logged out successfully');
  };

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full px-3 sm:px-6 py-2.5 bg-slate-50/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-lg shadow-slate-900/5 px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* ========================================================= */}
          {/* LEFT SIDE (Mobile: Hamburger Button | Desktop: Clean Logo) */}
          {/* ========================================================= */}
          <div className="flex items-center space-x-3">
            {/* Mobile Hamburger Button (Left Side) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:text-brand hover:bg-brand-50 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-brand" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Clean Logo Image (Bigger, NO background box/border) + ICAW Text */}
            <div
              onClick={() => handleNavClick('home')}
              className="flex items-center space-x-2.5 cursor-pointer group"
            >
              <Image
                src="/ICAW-logo.png"
                alt="ICAW Logo"
                width={46}
                height={46}
                className="w-11 h-11 object-contain transition-transform group-hover:scale-105"
                priority
              />
              <span className="font-extrabold text-xl tracking-tight text-brand group-hover:text-brand-hover transition-colors">
                ICAW
              </span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* CENTER: Modern Tab Bar Navigation Links                   */}
          {/* ========================================================= */}
          <nav className="hidden md:flex items-center p-1.5 bg-slate-100/70 rounded-2xl border border-slate-200/60 space-x-1">
            {currentNavItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-brand text-white shadow-md shadow-brand/25 scale-[1.02]'
                      : 'text-slate-600 hover:text-brand hover:bg-white hover:shadow-sm'
                  }`}
                >
                  <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-brand-50 text-brand border border-brand/20'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* ========================================================= */}
          {/* RIGHT SIDE: User Profile Avatar Dropdown                  */}
          {/* ========================================================= */}
          <div className="flex items-center space-x-3">
            
            {/* User Avatar Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2.5 p-1.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-brand transition-all focus:outline-none focus:ring-2 focus:ring-brand/20 shadow-sm"
                aria-expanded={isProfileOpen}
                aria-haspopup="true"
              >
                <div className="w-8 h-8 rounded-xl bg-brand text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  {user.initials}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-900 leading-tight">{user.name}</span>
                  <span className="text-[10px] font-semibold text-brand uppercase tracking-wider capitalize">{user.role}</span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown Popup Menu */}
              {isProfileOpen && (
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
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Role Access</span>
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
                      onClick={() => {
                        toast.success(`Navigating to ${user.role.toUpperCase()} Dashboard`);
                        handleNavClick('dashboard');
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand transition-colors rounded-lg"
                    >
                      <LayoutDashboard className="w-4 h-4 text-brand" />
                      <span>Dashboard</span>
                    </button>

                    <button
                      onClick={() => {
                        toast.success('Navigating to User Profile');
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand transition-colors rounded-lg"
                    >
                      <User className="w-4 h-4 text-slate-500" />
                      <span>Profile</span>
                    </button>

                    <button
                      onClick={() => {
                        toast.success('Navigating to Account Settings');
                        setIsProfileOpen(false);
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
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE RESPONSIVE DRAWER (Sliding down on small screens)  */}
      {/* ========================================================= */}
      {isMobileMenuOpen && (
        <div className="md:hidden max-w-7xl mx-auto mt-2 border border-slate-200/80 bg-white rounded-2xl px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="px-2 pb-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            {user.role} Navigation
          </div>
          <div className="space-y-1">
            {currentNavItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-brand text-white shadow-sm'
                      : 'text-slate-700 hover:bg-brand-50 hover:text-brand'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-brand-50 text-brand border border-brand/20'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
