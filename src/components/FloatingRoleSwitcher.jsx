'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/useAuthStore';
import { Sparkles, GraduationCap, UserCheck, ShieldCheck, Check, GripVertical, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function FloatingRoleSwitcher() {
  const { user, setRole } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectRole = (role) => {
    setRole(role);
    setIsOpen(false);
    toast.success(`Role view switched to ${role.toUpperCase()}`);
  };

  const roles = [
    { id: 'student', label: 'Student View', icon: GraduationCap, color: 'bg-emerald-600' },
    { id: 'teacher', label: 'Teacher View', icon: UserCheck, color: 'bg-amber-600' },
    { id: 'admin', label: 'Admin View', icon: ShieldCheck, color: 'bg-rose-700' }
  ];

  return (
    <motion.div
      drag
      dragMomentum={false}
      className="fixed bottom-8 right-8 z-[9999] select-none"
    >
      <div className="relative flex flex-col items-end">
        {/* Expanded Floating Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="mb-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2.5 space-y-2 divide-y divide-slate-100"
          >
            <div className="px-2 py-1 flex items-center justify-between">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700">
                <GripVertical className="w-3.5 h-3.5 text-slate-400 cursor-grab" />
                <span>Switch Role View</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="pt-2 space-y-1">
              {roles.map((r) => {
                const IconComp = r.icon;
                const isSelected = user.role === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => handleSelectRole(r.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-brand text-white shadow-md shadow-brand/20'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <IconComp className="w-4 h-4" />
                      <span>{r.label}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-white" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Floating Draggable Circle Button */}
        <div className="flex items-center space-x-2">
          {/* Label pill showing current active role */}
          <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-brand text-white text-[11px] font-bold shadow-lg uppercase tracking-wider">
            {user.role} Demo
          </span>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-14 h-14 rounded-full bg-brand text-white shadow-2xl flex items-center justify-center border-2 border-white ring-4 ring-brand/30 hover:scale-110 active:scale-95 transition-transform cursor-grab active:cursor-grabbing group relative"
            title="Drag anywhere • Click to switch roles"
          >
            <Sparkles className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
            
            {/* Live Indicator Pulse Badge */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
