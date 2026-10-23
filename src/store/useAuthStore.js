import { create } from 'zustand';

// Pre-seeded accounts for development & evaluation
const DEFAULT_ACCOUNTS = [
  {
    id: 'usr-student-1',
    name: 'Alex Morgan',
    email: 'student@university.edu',
    password: 'Password123!',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
    initials: 'AM',
    status: 'verified',
    department: 'Computer Science & Engineering',
    semester: '6th Semester',
    bio: 'Junior CS student passionate about machine learning, deep learning, and collaborative algorithmic problem solving.',
    skills: ['Python', 'Machine Learning', 'Data Structures', 'PyTorch', 'Linear Algebra'],
    learningGoals: [
      'Score an A grade in CS401 Machine Learning',
      'Master RAG vector retrieval pipelines and dense embeddings',
      'Form an active weekly peer review study group'
    ],
    availability: {
      hoursPerWeek: 12,
      preferredTimes: ['Weekday Evenings (6-9 PM)', 'Weekend Mornings (9 AM-12 PM)'],
      groupSize: '3-4 students',
      studyMode: 'Hybrid (Virtual + Campus)'
    },
    matchingCycleStatus: 'Active • Next group matching cycle runs in 2 days'
  },
  {
    id: 'usr-teacher-1',
    name: 'Dr. Sarah Connor',
    email: 'teacher@university.edu',
    password: 'Password123!',
    role: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
    initials: 'SC',
    status: 'approved',
    department: 'Department of Computer Science & Artificial Intelligence',
    designation: 'Associate Professor & AI Curriculum Chair',
    bio: 'Associate Professor of Computer Science specializing in NLP, retrieval-augmented generation architectures, and verifiable generative AI in higher education.',
    officeHours: 'Tue & Thu: 2:00 PM - 4:30 PM (Academic Hall Suite 402 / Zoom)',
    coursesTaught: [
      {
        id: 'cs401',
        code: 'CS401',
        name: 'Advanced Machine Learning & Neural Networks',
        semester: 'Fall 2026',
        studentsCount: 142,
        ragStatus: 'Active Grounding',
        syllabusIndexed: true
      },
      {
        id: 'cs302',
        code: 'CS302',
        name: 'Data Structures & Algorithms',
        semester: 'Fall 2026',
        studentsCount: 190,
        ragStatus: 'Active Grounding',
        syllabusIndexed: true
      },
      {
        id: 'cs605',
        code: 'CS605',
        name: 'Deep Generative Architectures & LLMs',
        semester: 'Fall 2026',
        studentsCount: 45,
        ragStatus: 'Active Grounding',
        syllabusIndexed: true
      }
    ]
  },
  {
    id: 'usr-student-demo',
    name: 'Zabed Mahmud',
    email: 'zabed@university.edu',
    password: 'Password123!',
    role: 'student',
    avatar: '',
    initials: 'ZM',
    status: 'verified',
    department: 'Software Engineering',
    semester: '7th Semester',
    bio: 'Software Engineering senior building intelligent collaborative tools.',
    skills: ['JavaScript', 'React', 'Next.js', 'System Architecture'],
    learningGoals: ['Deploy collaborative academic tools', 'Integrate RAG tutor embeddings'],
    availability: {
      hoursPerWeek: 15,
      preferredTimes: ['Weekday Evenings (6-9 PM)'],
      groupSize: '3-4 students',
      studyMode: 'Hybrid (Virtual + Campus)'
    },
    matchingCycleStatus: 'Active • Next group matching cycle runs in 2 days'
  }
];

// Helper to get registered accounts safely on client
const getStoredAccounts = () => {
  if (typeof window === 'undefined') return DEFAULT_ACCOUNTS;
  try {
    const stored = localStorage.getItem('icaw_registered_users');
    if (!stored) {
      localStorage.setItem('icaw_registered_users', JSON.stringify(DEFAULT_ACCOUNTS));
      return DEFAULT_ACCOUNTS;
    }
    return JSON.parse(stored);
  } catch (err) {
    return DEFAULT_ACCOUNTS;
  }
};

// Helper to get active session on client
const getStoredSession = () => {
  if (typeof window === 'undefined') {
    return { user: DEFAULT_ACCOUNTS[0], isAuthenticated: true };
  }
  try {
    const localSession = localStorage.getItem('icaw_auth_session');
    if (localSession) {
      return { user: JSON.parse(localSession), isAuthenticated: true, rememberMe: true };
    }
    const sessionSession = sessionStorage.getItem('icaw_auth_session');
    if (sessionSession) {
      return { user: JSON.parse(sessionSession), isAuthenticated: true, rememberMe: false };
    }
    // Default to Alex Morgan (Student) for initial preview if no session exists yet
    return { user: DEFAULT_ACCOUNTS[0], isAuthenticated: true, rememberMe: false };
  } catch (err) {
    return { user: DEFAULT_ACCOUNTS[0], isAuthenticated: true, rememberMe: false };
  }
};

export const useAuthStore = create((set, get) => ({
  user: DEFAULT_ACCOUNTS[0],
  isAuthenticated: true,
  rememberMe: false,
  isHydrated: false,
  activeTab: 'home',

  // Initialize/hydrate auth state on client safely after initial hydration
  initAuth: () => {
    if (typeof window === 'undefined') return;
    try {
      const localSession = localStorage.getItem('icaw_auth_session');
      const sessionSession = sessionStorage.getItem('icaw_auth_session');

      if (localSession) {
        set({ user: JSON.parse(localSession), isAuthenticated: true, rememberMe: true, isHydrated: true });
      } else if (sessionSession) {
        set({ user: JSON.parse(sessionSession), isAuthenticated: true, rememberMe: false, isHydrated: true });
      } else {
        set({ isHydrated: true });
      }
    } catch (err) {
      console.error('Failed to restore session:', err);
      set({ isHydrated: true });
    }
  },

  // Login handler
  login: async ({ email, password, rememberMe }) => {
    const normalizedEmail = (email || '').trim().toLowerCase();
    const accounts = getStoredAccounts();

    const matchedUser = accounts.find(
      (acc) => acc.email.toLowerCase() === normalizedEmail && acc.password === password
    );

    if (!matchedUser) {
      // Security requirement: generic message without revealing which field was incorrect
      return {
        success: false,
        error: 'Invalid email or password'
      };
    }

    // Prepare safe session object
    const sessionUser = {
      id: matchedUser.id,
      name: matchedUser.name,
      email: matchedUser.email,
      role: matchedUser.role,
      avatar: matchedUser.avatar || '',
      initials: matchedUser.initials || matchedUser.name.slice(0, 2).toUpperCase(),
      status: matchedUser.status || 'verified',
      department: matchedUser.department || 'Academic Department'
    };

    if (typeof window !== 'undefined') {
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

    return {
      success: true,
      user: sessionUser
    };
  },

  // Register handler
  register: async ({ name, email, password, role }) => {
    const normalizedEmail = (email || '').trim().toLowerCase();
    const accounts = getStoredAccounts();

    // Check for existing email registration
    const existing = accounts.find(
      (acc) => acc.email.toLowerCase() === normalizedEmail
    );

    if (existing) {
      return {
        success: false,
        error: 'This email is already registered. Please log in or reset your password instead.'
      };
    }

    // Derive user initials
    const nameParts = name.trim().split(' ');
    const initials =
      nameParts.length > 1
        ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
        : name.slice(0, 2).toUpperCase();

    const newUser = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: normalizedEmail,
      password: password,
      role: role, // 'student' or 'teacher'
      avatar: '',
      initials: initials,
      status: role === 'teacher' ? 'pending_approval' : 'verified',
      department: 'Faculty of Science & Engineering',
      verificationSent: true,
      createdAt: new Date().toISOString()
    };

    // Save to stored accounts
    const updatedAccounts = [...accounts, newUser];
    if (typeof window !== 'undefined') {
      localStorage.setItem('icaw_registered_users', JSON.stringify(updatedAccounts));
    }

    // Create session for immediate access
    const sessionUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      avatar: '',
      initials: newUser.initials,
      status: newUser.status,
      department: newUser.department
    };

    if (typeof window !== 'undefined') {
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
  },

  // Switch role dynamically (for testing/demo)
  setRole: (role) => {
    if (role === 'logged_out') {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('icaw_auth_session');
        sessionStorage.removeItem('icaw_auth_session');
      }
      set({
        user: null,
        isAuthenticated: false,
        activeTab: 'home'
      });
      return;
    }

    let updatedUser;
    if (role === 'teacher') {
      updatedUser = DEFAULT_ACCOUNTS[1];
    } else if (role === 'admin') {
      updatedUser = {
        id: 'usr-admin-1',
        name: 'Dean Arthur Pendelton',
        email: 'dean@university.edu',
        role: 'admin',
        initials: 'AP',
        status: 'verified',
        department: 'Academic Affairs'
      };
    } else {
      updatedUser = DEFAULT_ACCOUNTS[0]; // student
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('icaw_auth_session', JSON.stringify(updatedUser));
    }

    set({
      user: updatedUser,
      isAuthenticated: true,
      activeTab: 'home'
    });
  },

  // Update user profile data & synchronize to persistence
  updateProfile: (profileData) => {
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

        // Also sync into stored accounts directory
        const accounts = getStoredAccounts();
        const updatedAccounts = accounts.map((acc) =>
          acc.id === updatedUser.id ? { ...acc, ...updatedUser } : acc
        );
        localStorage.setItem('icaw_registered_users', JSON.stringify(updatedAccounts));
      } catch (err) {
        console.error('Failed to sync updated profile:', err);
      }
    }

    set({ user: updatedUser });
    return { success: true, user: updatedUser };
  },

  setActiveTab: (tab) => set({ activeTab: tab }),

  // Logout handler
  logout: () => {
    if (typeof window !== 'undefined') {
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
