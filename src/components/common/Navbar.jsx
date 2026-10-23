'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '../../store/useAuthStore';
import ProfileDropdown from './ProfileDropdown';
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
  Workflow,
  Award,
  Sparkles,
  Layers,
  Menu,
  X
} from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, activeTab, setActiveTab, initAuth } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    initAuth();
  }, [initAuth]);

  // Visitor navigation items (ONLY shown to logged-out users)
  const visitorNavItems = [
    { id: 'overview', label: 'Overview', href: '/', icon: HomeIcon },
    { id: 'how-it-works', label: 'How It Works', href: '/how-it-works', icon: Workflow },
    { id: 'training', label: 'Platform Training', href: '/training', icon: GraduationCap, badge: 'MASTERCLASS' },
    { id: 'features', label: 'Capabilities', href: '/features', icon: Bot },
    { id: 'pricing', label: 'Pricing', href: '/pricing', icon: Award }
  ];

  // Role-Based Navigation Items (Shown ONLY when logged in)
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

  const isUserLoggedIn = mounted ? !!(isAuthenticated && user) : false;
  const currentNavItems = isUserLoggedIn
    ? (roleNavItems[user?.role] || roleNavItems.student)
    : visitorNavItems;

  const handleNavClick = (item) => {
    setIsMobileMenuOpen(false);
    if (!isUserLoggedIn) {
      if (item.href) router.push(item.href);
      return;
    }
    setActiveTab(item.id);
    if (item.id === 'home') {
      router.push('/');
    } else {
      router.push('/dashboard');
    }
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

            {/* Clean Logo Image + ICAW Text */}
            <div
              onClick={() => router.push('/')}
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
              const isActive = isUserLoggedIn
                ? activeTab === item.id
                : (item.href === '/' ? pathname === '/' : pathname.startsWith(item.href));
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
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
          {/* RIGHT SIDE: Modular User Profile Dropdown Component       */}
          {/* ========================================================= */}
          <div className="flex items-center space-x-3">
            {isUserLoggedIn && user ? (
              <ProfileDropdown />
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => router.push('/login')}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-brand hover:bg-brand-50 transition-all cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => router.push('/register')}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-brand text-white hover:bg-brand-hover shadow-sm shadow-brand/20 transition-all cursor-pointer"
                >
                  Get Started Free
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE RESPONSIVE DRAWER (Sliding down on small screens)  */}
      {/* ========================================================= */}
      {isMobileMenuOpen && (
        <div className="md:hidden max-w-7xl mx-auto mt-2 border border-slate-200/80 bg-white rounded-2xl px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="px-2 pb-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            {isUserLoggedIn ? `${user?.role} Navigation` : 'Academic Discovery'}
          </div>
          <div className="space-y-1">
            {currentNavItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = isUserLoggedIn
                ? activeTab === item.id
                : (item.href === '/' ? pathname === '/' : pathname.startsWith(item.href));
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
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
