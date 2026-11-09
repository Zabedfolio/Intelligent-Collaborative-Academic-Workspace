import { create } from 'zustand';
import { authClient } from '../lib/auth-client';

// Helper to keep cookie synchronized for Next.js SSR proxy/middleware
const setSessionCookie = (active) => {
  if (typeof document === 'undefined') return;
  if (active) {
    document.cookie = 'icaw_auth_session=1; path=/; max-age=604800; SameSite=Lax';
  } else {
    document.cookie = 'icaw_auth_session=; path=/; max-age=0; SameSite=Lax';
  }
};

export const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  rememberMe: false,
  isHydrated: false,
  activeTab: 'home',

  // Initialize/hydrate auth state on client
  initAuth: async () => {
    if (typeof window === 'undefined') return;
    try {
      // 1. Check local or session cache first for fast paint
      const localSession = localStorage.getItem('icaw_auth_session');
      const sessionSession = sessionStorage.getItem('icaw_auth_session');

      let cachedUser = null;
      let remember = false;

      if (localSession) {
        cachedUser = JSON.parse(localSession);
        remember = true;
      } else if (sessionSession) {
        cachedUser = JSON.parse(sessionSession);
        remember = false;
      }

      if (cachedUser) {
        setSessionCookie(true);
        set({
          user: cachedUser,
          isAuthenticated: true,
          rememberMe: remember,
          isHydrated: true
        });
      }

      // 2. Query Better Auth session to verify & sync with database
      try {
        const { data: sessionData } = await authClient.getSession();
        if (sessionData?.user) {
          const u = sessionData.user;
          const verifiedUser = {
            id: u.id,
            name: u.name,
            email: u.email,
            role: u.role || 'student',
            avatar: u.image || '',
            initials: u.name
              ? u.name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase()
              : 'US',
            status: 'verified',
            department: u.department || 'Academic Department'
          };

          setSessionCookie(true);
          if (remember) {
            localStorage.setItem('icaw_auth_session', JSON.stringify(verifiedUser));
          } else {
            sessionStorage.setItem('icaw_auth_session', JSON.stringify(verifiedUser));
          }

          set({
            user: verifiedUser,
            isAuthenticated: true,
            isHydrated: true
          });
          return;
        } else if (!cachedUser) {
          // No active session
          setSessionCookie(false);
          set({
            user: null,
            isAuthenticated: false,
            isHydrated: true
          });
          return;
        }
      } catch (sessionErr) {
        // Network or offline fallback - cached state remains active
      }

      set({ isHydrated: true });
    } catch (err) {
      console.error('Failed to restore session:', err);
      set({ user: null, isAuthenticated: false, isHydrated: true });
    }
  },

  // Login handler
  login: async ({ email, password, rememberMe }) => {
    const normalizedEmail = (email || '').trim().toLowerCase();

    try {
      const { data, error } = await authClient.signIn.email({
        email: normalizedEmail,
        password,
        rememberMe: !!rememberMe
      });

      if (error) {
        return {
          success: false,
          error: error.message || 'Invalid email or password'
        };
      }

      if (data?.user) {
        const sessionUser = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role || 'student',
          avatar: data.user.image || '',
          initials: data.user.name
            ? data.user.name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase()
            : 'US',
          status: 'verified',
          department: data.user.department || 'Academic Department'
        };

        if (typeof window !== 'undefined') {
          setSessionCookie(true);
          if (rememberMe) {
            localStorage.setItem('icaw_auth_session', JSON.stringify(sessionUser));
            sessionStorage.removeItem('icaw_auth_session');
          } else {
            sessionStorage.setItem('icaw_auth_session', JSON.stringify(sessionUser));
            localStorage.removeItem('icaw_auth_session');
          }
        }

        set({
          user: sessionUser,
          isAuthenticated: true,
          rememberMe: !!rememberMe,
          activeTab: 'dashboard'
        });

        return { success: true, user: sessionUser };
      }

      return {
        success: false,
        error: 'Invalid email or password'
      };
    } catch (authErr) {
      return {
        success: false,
        error: authErr?.message || 'Invalid email or password'
      };
    }
  },

  // Register handler
  register: async ({ name, email, password, role }) => {
    const normalizedEmail = (email || '').trim().toLowerCase();

    try {
      const { data, error } = await authClient.signUp.email({
        name: name.trim(),
        email: normalizedEmail,
        password,
        role: role || 'student'
      });

      if (error) {
        return {
          success: false,
          error: error.message || 'Registration failed'
        };
      }

      if (data?.user) {
        const initials = name
          .trim()
          .split(' ')
          .map((n) => n[0])
          .join('')
          .slice(0, 2)
          .toUpperCase();

        const sessionUser = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: role || data.user.role || 'student',
          avatar: data.user.image || '',
          initials,
          status: role === 'teacher' ? 'pending_approval' : 'verified',
          department: 'Academic Department'
        };

        if (typeof window !== 'undefined') {
          setSessionCookie(true);
          sessionStorage.setItem('icaw_auth_session', JSON.stringify(sessionUser));
        }

        set({
          user: sessionUser,
          isAuthenticated: true,
          activeTab: 'dashboard'
        });

        return {
          success: true,
          user: sessionUser,
          role: role
        };
      }

      return {
        success: false,
        error: 'Registration failed. Please try again.'
      };
    } catch (authErr) {
      return {
        success: false,
        error: authErr?.message || 'Registration failed. Please try again.'
      };
    }
  },

  // Update user profile data & synchronize to persistence
  updateProfile: async (profileData) => {
    const state = get();
    if (!state.user) return { success: false, error: 'Not authenticated' };

    const updatedUser = {
      ...state.user,
      ...profileData
    };

    if (typeof window !== 'undefined') {
      try {
        if (state.rememberMe) {
          localStorage.setItem('icaw_auth_session', JSON.stringify(updatedUser));
        } else {
          sessionStorage.setItem('icaw_auth_session', JSON.stringify(updatedUser));
        }
      } catch (err) {
        console.error('Failed to sync updated profile to storage:', err);
      }
    }

    set({ user: updatedUser });

    // Sync to backend if reachable
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      await fetch(`${backendUrl}/api/v1/users/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(profileData)
      });
    } catch (apiErr) {
      // Non-blocking: state is already updated locally
      console.warn('Backend profile sync note:', apiErr?.message || apiErr);
    }

    return { success: true, user: updatedUser };
  },

  // Update weekly availability matrix (7x24 matrix)
  updateAvailability: async (availability) => {
    const state = get();
    if (!state.user) return { success: false, error: 'Not authenticated' };

    const updatedUser = {
      ...state.user,
      availability
    };

    if (typeof window !== 'undefined') {
      try {
        if (state.rememberMe) {
          localStorage.setItem('icaw_auth_session', JSON.stringify(updatedUser));
        } else {
          sessionStorage.setItem('icaw_auth_session', JSON.stringify(updatedUser));
        }
      } catch (err) {
        console.error('Failed to sync availability to storage:', err);
      }
    }

    set({ user: updatedUser });

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      await fetch(`${backendUrl}/api/v1/users/availability`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ availability })
      });
    } catch (apiErr) {
      console.warn('Backend availability sync note:', apiErr?.message || apiErr);
    }

    return { success: true, availability };
  },

  // Update & persist active academic scope (lastScope)
  updateLastScope: async (scopeData) => {
    const state = get();
    if (!state.user) return { success: false, error: 'Not authenticated' };

    const updatedUser = {
      ...state.user,
      lastScope: scopeData
    };

    if (typeof window !== 'undefined') {
      try {
        if (state.rememberMe) {
          localStorage.setItem('icaw_auth_session', JSON.stringify(updatedUser));
        } else {
          sessionStorage.setItem('icaw_auth_session', JSON.stringify(updatedUser));
        }
      } catch (err) {
        console.error('Failed to sync lastScope to storage:', err);
      }
    }

    set({ user: updatedUser });

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      await fetch(`${backendUrl}/api/v1/users/scope`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(scopeData)
      });
    } catch (apiErr) {
      console.warn('Backend lastScope sync note:', apiErr?.message || apiErr);
    }

    return { success: true, lastScope: scopeData };
  },

  setActiveTab: (tab) => set({ activeTab: tab }),

  // Logout handler
  logout: async () => {
    try {
      await authClient.signOut();
    } catch (err) {
      console.warn('Better Auth signOut warning:', err?.message || err);
    }
    if (typeof window !== 'undefined') {
      setSessionCookie(false);
      localStorage.removeItem('icaw_auth_session');
      sessionStorage.removeItem('icaw_auth_session');
    }
    set({
      user: null,
      isAuthenticated: false,
      activeTab: 'home'
    });
  }
}));
