'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '../../store/useAuthStore';
import ProfileDropdown from './ProfileDropdown';
import GlobalSearchModal from './GlobalSearchModal';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, activeTab, setActiveTab, initAuth } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [navSearchQuery, setNavSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    initAuth();
  }, [initAuth]);

  // Global Cmd+K / Ctrl+K listener for instant search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Visitor navigation items (Pure text, NO icons/emoji)
  const visitorNavItems = [
    { id: 'overview', label: 'Overview', href: '/' },
    { id: 'courses', label: 'Courses', href: '/courses' },
    { id: 'hierarchy', label: 'Hierarchy', href: '/hierarchy' },
    { id: 'how-it-works', label: 'How It Works', href: '/how-it-works' },
    { id: 'training', label: 'Platform Training', href: '/training', badge: 'Academy' },
    { id: 'pricing', label: 'Pricing', href: '/pricing' }
  ];

  // Role-Based Navigation Items (Pure text, NO icons/emoji)
  const roleNavItems = {
    student: [
      { id: 'home', label: 'Home' },
      { id: 'courses', label: 'Courses', href: '/courses' },
      { id: 'ai-tutor', label: 'AI Tutor', badge: 'RAG' },
      { id: 'exam-prep', label: 'Exam Prep', href: '/exams' },
      { id: 'analytics', label: 'Analytics' },
      { id: 'study-groups', label: 'Study Groups' }
    ],
    teacher: [
      { id: 'home', label: 'Home' },
      { id: 'courses', label: 'Courses', href: '/courses' },
      { id: 'course-management', label: 'Course Management' },
      { id: 'resource-library', label: 'Resources' },
      { id: 'ai-config', label: 'AI Config' },
      { id: 'answer-review', label: 'Answer Review' },
      { id: 'class-analytics', label: 'Analytics' }
    ],
    admin: [
      { id: 'home', label: 'Home' },
      { id: 'hierarchy', label: 'Hierarchy', href: '/hierarchy' },
      { id: 'user-management', label: 'Users' },
      { id: 'system-audit', label: 'System Audit' }
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
    } else if (item.id === 'courses' || item.href === '/courses') {
      router.push('/courses');
    } else if (item.id === 'exam-prep' || item.href === '/exams') {
      router.push('/exams');
    } else if (item.id === 'hierarchy' || item.href === '/hierarchy') {
      router.push('/hierarchy');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full px-3 sm:px-6 py-2.5 pointer-events-none">
      <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-lg shadow-slate-900/5 px-4 sm:px-6 pointer-events-auto">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* ========================================================= */}
          {/* LEFT: Clean Logo + Brand                                  */}
          {/* ========================================================= */}
          <div className="flex items-center space-x-3 shrink-0">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-brand hover:bg-brand-50 transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-brand" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Logo */}
            <div
              onClick={() => router.push('/')}
              className="flex items-center space-x-2.5 cursor-pointer group"
            >
              <Image
                src="/ICAW-logo.png"
                alt="ICAW Logo"
                width={44}
                height={44}
                className="w-10 h-10 object-contain transition-transform group-hover:scale-105"
                priority
              />
              <span className="font-extrabold text-xl tracking-tight text-brand group-hover:text-brand-hover transition-colors">
                ICAW
              </span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* CENTER: Text-Only Tab Bar Navigation Links (NO ICONS)     */}
          {/* ========================================================= */}
          <nav className="hidden lg:flex items-center p-1 bg-slate-100/80 rounded-2xl border border-slate-200/70 space-x-1 shrink-0">
            {currentNavItems.map((item) => {
              const isActive = isUserLoggedIn
                ? activeTab === item.id
                : (item.href === '/' ? pathname === '/' : pathname.startsWith(item.href));
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-brand text-white shadow-sm shadow-brand/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`ml-1.5 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
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
          {/* RIGHT SIDE: Search Bar + Profile / Auth Buttons           */}
          {/* ========================================================= */}
          <div className="flex items-center space-x-2.5 shrink-0">
            {/* Universal In-Place Global Search Trigger (Command Palette Cmd+K) */}
            <button
              type="button"
              id="navbar-search-btn"
              onClick={() => setIsSearchModalOpen(true)}
              className="hidden xl:flex items-center space-x-2.5 px-3 py-1.5 rounded-xl border border-slate-200/80 bg-slate-50/80 hover:bg-white focus:bg-white text-xs w-44 hover:w-48 text-slate-400 hover:text-slate-600 transition-all cursor-pointer group shadow-2xs"
            >
              <span className="font-medium text-slate-500 group-hover:text-slate-800">Search...</span>
              <kbd className="ml-auto px-1.5 py-0.5 text-[10px] font-mono font-bold bg-white border border-slate-200 rounded text-slate-400 group-hover:text-slate-700">⌘K</kbd>
            </button>

            {isUserLoggedIn && user ? (
              <ProfileDropdown />
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => router.push('/login')}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-brand hover:bg-brand-50 transition-all cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => router.push('/register')}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-brand text-white hover:bg-brand-hover shadow-sm shadow-brand/20 transition-all cursor-pointer"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE RESPONSIVE DRAWER (Text only, no icons/emoji)      */}
      {/* ========================================================= */}
      {isMobileMenuOpen && (
        <div className="lg:hidden max-w-7xl mx-auto mt-2 border border-slate-200/80 bg-white rounded-2xl px-4 pt-3 pb-6 space-y-3 shadow-xl pointer-events-auto animate-in slide-in-from-top duration-200">
          {/* Mobile Global Search Trigger */}
          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsSearchModalOpen(true);
            }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-500 bg-slate-50 hover:bg-slate-100 cursor-pointer"
          >
            <span>Search courses, resources, topics...</span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-white border border-slate-200 rounded text-slate-400">⌘K</kbd>
          </button>

          <div className="px-2 pb-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            {isUserLoggedIn ? `${user?.role} Navigation` : 'Academic Discovery'}
          </div>
          <div className="space-y-1">
            {currentNavItems.map((item) => {
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
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                      isActive ? 'bg-white/20 text-white' : 'bg-brand-50 text-brand'
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

      {/* Global In-Place Command Palette Modal */}
      <GlobalSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        initialQuery={navSearchQuery}
      />
    </header>
  );
}
