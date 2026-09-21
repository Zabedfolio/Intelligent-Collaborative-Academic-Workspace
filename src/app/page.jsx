'use client';

import Navbar from '../components/Navbar';
import FloatingRoleSwitcher from '../components/FloatingRoleSwitcher';
import { useAuthStore } from '../store/useAuthStore';

export default function Home() {
  const { user, activeTab } = useAuthStore();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans relative">
      {/* Modern Navbar */}
      <Navbar />

      {/* Main Page Body */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-sm text-center max-w-md mx-auto space-y-3">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 text-brand border border-brand/20">
            {user.role} View • {activeTab}
          </span>
          <h1 className="text-xl font-bold text-slate-900">
            Intelligent Collaborative Academic Workspace
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            Drag the floating circular button anywhere on screen to test role switching between Student, Teacher, and Admin.
          </p>
        </div>
      </main>

      {/* Draggable Floating Role Switcher Widget */}
      <FloatingRoleSwitcher />
    </div>
  );
}
