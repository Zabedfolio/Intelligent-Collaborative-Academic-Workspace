'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../store/useAuthStore';
import {
  LayoutDashboard,
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
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function Sidebar() {
  const router = useRouter();
  const { user, activeTab, setActiveTab, logout } = useAuthStore();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Define role-based sidebar menu items
  const sidebarNavItems = {
    student: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'my-courses', label: 'My Courses', icon: BookOpen },
      { id: 'ai-tutor', label: 'AI Tutor', icon: Bot, badge: 'RAG' },
      { id: 'exam-prep', label: 'Exam Prep', icon: GraduationCap },
      { id: 'analytics', label: 'Mastery Analytics', icon: BarChart3 },
      { id: 'study-groups', label: 'Study Groups', icon: Users },
      { id: 'settings', label: 'Settings', icon: Settings }
    ],
    teacher: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'course-management', label: 'Course Management', icon: FolderKanban },
      { id: 'resource-ingestion', label: 'Resource Ingestion', icon: FileUp },
      { id: 'ai-config', label: 'AI Config', icon: Sliders },
      { id: 'answer-review', label: 'Answer Review', icon: CheckSquare },
      { id: 'class-analytics', label: 'Class Analytics', icon: PieChart },
      { id: 'settings', label: 'Settings', icon: Settings }
    ],
    admin: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'hierarchy', label: 'Academic Hierarchy', icon: Building2 },
      { id: 'user-management', label: 'User Management', icon: UserCog },
      { id: 'system-audit', label: 'System Audit', icon: ShieldCheck },
      { id: 'settings', label: 'Settings', icon: Settings }
    ]
  };

  const currentItems = sidebarNavItems[user?.role] || sidebarNavItems.student;

  const handleItemClick = (id) => {
    setActiveTab(id);
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.push('/login');
  };

  return (
    <aside
      className={`h-screen sticky top-0 bg-white border-r border-slate-200/80 flex flex-col justify-between transition-all duration-300 z-30 shadow-sm relative ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* ========================================================= */}
      {/* FLOATING COLLAPSE TOGGLE BUTTON: Outside on right border */}
      {/* ========================================================= */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        id="sidebar-toggle-btn"
        className="absolute -right-3.5 top-5 z-50 w-7 h-7 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:text-brand hover:border-brand hover:scale-110 active:scale-95 transition-all cursor-pointer group"
        title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-brand transition-colors" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-slate-600 group-hover:text-brand transition-colors" />
        )}
      </button>

      {/* ========================================================= */}
      {/* 1. TOP HEADER: Clean Logo & Brand                         */}
      {/* ========================================================= */}
      <div className={`h-16 px-4 flex items-center border-b border-slate-100 shrink-0 ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
        <div className="flex items-center space-x-3 overflow-hidden cursor-pointer">
          <Image
            src="/ICAW-logo.png"
            alt="ICAW Logo"
            width={40}
            height={40}
            className="w-10 h-10 object-contain shrink-0"
            priority
          />
          {!isCollapsed && (
            <span className="font-extrabold text-xl tracking-tight text-brand whitespace-nowrap animate-in fade-in duration-200">
              ICAW
            </span>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. MIDDLE BODY: Independent Scrollbar & Role Nav Items   */}
      {/* ========================================================= */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
        <div className={`px-2 pb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider ${isCollapsed ? 'text-center' : ''}`}>
          {isCollapsed ? (user?.role ? user.role.charAt(0) : 'N') : (user?.role ? `${user.role} Navigation` : 'Navigation')}
        </div>

        {currentItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-brand text-white shadow-md shadow-brand/20'
                  : 'text-slate-600 hover:text-brand hover:bg-brand-50/80'
              } ${isCollapsed ? 'justify-center px-0' : ''}`}
              title={isCollapsed ? item.label : undefined}
            >
              <IconComponent className={`w-4.5 h-4.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
              
              {!isCollapsed && (
                <span className="flex-1 text-left truncate">{item.label}</span>
              )}

              {!isCollapsed && item.badge && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold shrink-0 ${
                  isActive ? 'bg-white/20 text-white' : 'bg-brand-50 text-brand border border-brand/20'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* 3. BOTTOM FOOTER: Dynamic User Profile Card               */}
      {/* ========================================================= */}
      <div className="p-3 border-t border-slate-100 shrink-0 bg-slate-50/60">
        <div className={`flex items-center space-x-3 p-2 rounded-xl bg-white border border-slate-200/80 shadow-sm ${isCollapsed ? 'justify-center p-1.5' : ''}`}>
          {/* User Avatar */}
          <div className="w-9 h-9 rounded-xl bg-brand text-white flex items-center justify-center font-bold text-xs shadow-sm shrink-0">
            {user?.initials || 'U'}
          </div>

          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate leading-tight">{user?.name || 'Academic User'}</p>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <span className={`px-1.5 py-0.2 rounded-md text-[9px] font-extrabold uppercase tracking-wider ${
                  user?.role === 'student'
                    ? 'bg-emerald-100 text-emerald-800'
                    : user?.role === 'teacher'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  {user?.role || 'Guest'}
                </span>
              </div>
            </div>
          )}

          {!isCollapsed && (
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
