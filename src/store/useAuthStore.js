import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: {
    name: 'Zabed Mahmud',
    email: 'zabed@university.edu',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
    initials: 'ZM',
    role: 'student' // 'student' | 'teacher' | 'admin'
  },
  activeTab: 'home',

  setRole: (role) => set((state) => ({
    user: { ...state.user, role },
    activeTab: 'home'
  })),

  setActiveTab: (tab) => set({ activeTab: tab }),

  logout: () => set((state) => ({
    user: { ...state.user, name: 'Guest User', email: 'guest@university.edu', initials: 'GU' }
  }))
}));
