'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import Modal from '../../components/common/Modal';
import AvailabilityCalendar from '../../components/profile/AvailabilityCalendar';
import SkillTagInput from '../../components/profile/SkillTagInput';
import AcademicScopeSelector from '../../components/profile/AcademicScopeSelector';
import { useAuthStore } from '../../store/useAuthStore';
import {
  User,
  GraduationCap,
  Sparkles,
  BookOpen,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Save,
  Users,
  Building2,
  Briefcase,
  Layers,
  ArrowRight,
  ExternalLink,
  Check,
  Target,
  FolderOpen,
  Settings
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const router = useRouter();
  const {
    user,
    updateProfile,
    updateAvailability,
    updateLastScope,
    initAuth
  } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  // Active navigation tab
  // Students: 'general' | 'scope' | 'availability' | 'skills'
  // Teachers: 'general' | 'affiliation' | 'courses'
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    setMounted(true);
    initAuth();
  }, [initAuth]);

  // =========================================================================
  // SHARED & STUDENT STATE
  // =========================================================================
  const [name, setName] = useState('');
  const [studentBio, setStudentBio] = useState('');
  const [skills, setSkills] = useState([]);
  const [learningGoals, setLearningGoals] = useState([]);
  const [newGoalInput, setNewGoalInput] = useState('');
  const [availabilityMatrix, setAvailabilityMatrix] = useState([]);
  const [selectedScope, setSelectedScope] = useState({
    departmentId: 'cse',
    departmentName: 'Department of Computer Science & Engineering',
    semesterId: 'fall-2026',
    semesterName: 'Fall 2026',
    courseId: 'cs401',
    courseName: 'Advanced Machine Learning & Neural Networks',
    examType: 'midterm'
  });
  const [isSaving, setIsSaving] = useState(false);

  // =========================================================================
  // TEACHER STATE
  // =========================================================================
  const [teacherBio, setTeacherBio] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');
  const [officeHours, setOfficeHours] = useState('');
  const [coursesTaught, setCoursesTaught] = useState([]);
  const [inspectingCourse, setInspectingCourse] = useState(null);

  // Sync component state from active user & stored profile
  useEffect(() => {
    if (!user) return;

    setName(user.name || '');

    if (user.role === 'teacher') {
      setTeacherBio(
        user.bio ||
          'Associate Professor of Computer Science specializing in NLP, retrieval-augmented generation architectures, and verifiable generative AI in higher education.'
      );
      setDepartment(user.department || 'Department of Computer Science & Artificial Intelligence');
      setDesignation(user.designation || 'Associate Professor & AI Curriculum Chair');
      setOfficeHours(user.officeHours || 'Tue & Thu: 2:00 PM - 4:30 PM (Suite 402 / Zoom)');
      setCoursesTaught(
        user.coursesTaught || [
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
      );
    } else {
      // Student defaults & active session sync
      setStudentBio(
        user.bio ||
          'Junior CS student passionate about machine learning, deep learning, and collaborative algorithmic problem solving.'
      );
      setSkills(
        user.skills || [
          { tag: 'Python', confidence: 90 },
          { tag: 'Machine Learning', confidence: 80 },
          { tag: 'Data Structures', confidence: 85 },
          { tag: 'PyTorch', confidence: 75 }
        ]
      );
      setLearningGoals(
        user.learningGoals ||
          user.goals || [
            'Score an A grade in CS401 Machine Learning',
            'Master RAG vector retrieval pipelines and dense embeddings',
            'Form an active weekly peer review study group'
          ]
      );

      // Pre-select student's persisted lastScope
      if (user.lastScope) {
        setSelectedScope(user.lastScope);
      }

      // Pre-fill availability matrix
      if (Array.isArray(user.availability) && user.availability.length > 0) {
        setAvailabilityMatrix(user.availability);
      } else {
        // Default standard student study slots: Mon-Thu 6-9 PM (18..20) + Sat 9-12 PM (9..11)
        setAvailabilityMatrix([
          { day: 1, slots: [18, 19, 20] },
          { day: 2, slots: [18, 19, 20] },
          { day: 3, slots: [18, 19, 20] },
          { day: 4, slots: [18, 19, 20] },
          { day: 6, slots: [9, 10, 11] }
        ]);
      }
    }
  }, [user]);

  // -------------------------------------------------------------------------
  // General Profile Save
  // -------------------------------------------------------------------------
  const handleSaveGeneralProfile = async () => {
    setIsSaving(true);
    const updates = {
      name: name.trim(),
      bio: user.role === 'teacher' ? teacherBio : studentBio
    };

    const res = await updateProfile(updates);
    setIsSaving(false);
    if (res.success) {
      toast.success('Profile details saved successfully!');
    } else {
      toast.error(res.error || 'Failed to update profile');
    }
  };

  // -------------------------------------------------------------------------
  // Academic Scope Save
  // -------------------------------------------------------------------------
  const handleSaveScope = async () => {
    setIsSaving(true);
    const res = await updateLastScope(selectedScope);
    setIsSaving(false);
    if (res.success) {
      toast.success(
        `Active scope set to ${selectedScope.courseName} (${selectedScope.examType.toUpperCase()})`
      );
    } else {
      toast.error('Failed to save academic scope');
    }
  };

  // -------------------------------------------------------------------------
  // Weekly Availability Save
  // -------------------------------------------------------------------------
  const handleSaveAvailability = async () => {
    setIsSaving(true);
    const res = await updateAvailability(availabilityMatrix);
    setIsSaving(false);
    if (res.success) {
      toast.success('Weekly availability schedule saved for cohort matching!');
    } else {
      toast.error('Failed to save availability schedule');
    }
  };

  // -------------------------------------------------------------------------
  // Skills & Learning Goals Save
  // -------------------------------------------------------------------------
  const handleSaveSkillsAndGoals = async () => {
    setIsSaving(true);
    const res = await updateProfile({
      skills,
      goals: learningGoals,
      learningGoals
    });
    setIsSaving(false);
    if (res.success) {
      toast.success('Skills & academic goals updated!');
    } else {
      toast.error('Failed to save skills and goals');
    }
  };

  const handleAddGoal = (e) => {
    e.preventDefault();
    const trimmed = newGoalInput.trim();
    if (!trimmed) return;
    if (learningGoals.includes(trimmed)) {
      toast.error('Goal is already listed.');
      return;
    }
    setLearningGoals([...learningGoals, trimmed]);
    setNewGoalInput('');
    toast.success('Learning goal added!');
  };

  const handleRemoveGoal = (goalToRemove) => {
    setLearningGoals(learningGoals.filter((g) => g !== goalToRemove));
  };

  // -------------------------------------------------------------------------
  // Teacher Actions
  // -------------------------------------------------------------------------
  const handleSaveTeacherProfile = async () => {
    setIsSaving(true);
    const res = await updateProfile({
      name: name.trim(),
      bio: teacherBio,
      department,
      designation,
      officeHours,
      coursesTaught
    });
    setIsSaving(false);
    if (res.success) {
      toast.success('Teacher profile & department affiliation updated.');
    } else {
      toast.error(res.error || 'Failed to update teacher profile');
    }
  };

  // Calculate Student Profile Completion
  const calculateStudentCompletion = () => {
    let score = 25; // Base account
    if (studentBio && studentBio.trim()) score += 25;
    if (Array.isArray(skills) && skills.length > 0) score += 25;
    if (Array.isArray(availabilityMatrix) && availabilityMatrix.length > 0) score += 25;
    return score;
  };

  const completionPercent = calculateStudentCompletion();
  const isStudentIncomplete = completionPercent < 100;

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-pulse">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 h-44 shadow-sm flex items-center space-x-5">
            <div className="w-20 h-20 rounded-3xl bg-slate-200" />
            <div className="space-y-3 flex-1">
              <div className="h-6 w-48 bg-slate-200 rounded-lg" />
              <div className="h-4 w-72 bg-slate-100 rounded" />
              <div className="h-4 w-36 bg-slate-100 rounded" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center max-w-md shadow-sm space-y-4">
            <User className="w-12 h-12 text-slate-400 mx-auto" />
            <h2 className="text-xl font-bold text-slate-900">Sign in to view Profile</h2>
            <p className="text-xs text-slate-500">
              Please log in with your academic account to view your personalized profile.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-brand text-white font-bold text-xs hover:bg-brand-hover transition-all"
            >
              <span>Go to Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isTeacher = user.role === 'teacher';

  // Define tab navigation for Student vs Teacher
  const studentTabs = [
    { id: 'general', label: '1. General Profile', icon: User },
    { id: 'scope', label: '2. Academic Scope', icon: Building2 },
    { id: 'availability', label: '3. Weekly Availability', icon: Calendar },
    { id: 'skills', label: '4. Skills & Learning Goals', icon: Layers }
  ];

  const teacherTabs = [
    { id: 'general', label: '1. General Profile', icon: User },
    { id: 'affiliation', label: '2. Academic Affiliation', icon: Building2 },
    { id: 'courses', label: '3. Courses Taught', icon: BookOpen }
  ];

  const currentTabs = isTeacher ? teacherTabs : studentTabs;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 selection:bg-brand selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* ================================================================= */}
        {/* TOP BANNER: User Identity Card                                    */}
        {/* ================================================================= */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            {/* User Identity Info */}
            <div className="flex items-center space-x-5">
              <div className="relative">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-20 h-20 rounded-3xl object-cover ring-4 ring-brand/10 shadow-sm"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-3xl bg-brand text-white text-2xl font-black flex items-center justify-center shadow-md">
                    {user.initials || 'AC'}
                  </div>
                )}
                <span
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white"
                  title="Active Session"
                >
                  <Check className="w-3.5 h-3.5" />
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-3 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {user.name}
                  </h1>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      isTeacher
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    {isTeacher ? 'Verified Faculty' : 'Enrolled Student'}
                  </span>
                </div>

                <p className="text-xs text-slate-500">
                  {user.email} • {isTeacher ? department : (selectedScope.departmentName || 'Computer Science & Engineering')}
                </p>

                <p className="text-xs font-semibold text-brand">
                  {isTeacher
                    ? designation
                    : `${selectedScope.semesterName || 'Fall 2026'} • Active Academic Good Standing`}
                </p>
              </div>
            </div>

            {/* Active View Badge */}
            <div className="flex flex-col items-start md:items-end space-y-1 shrink-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Active Account Role
              </span>
              <span className="text-brand font-black text-sm uppercase">
                {user.role} Workspace
              </span>
            </div>

          </div>

          {/* Student Profile Completion Bar */}
          {!isTeacher && (
            <div className="mt-6 pt-6 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center space-x-1.5 text-slate-700">
                  <Sparkles className="w-4 h-4 text-brand" />
                  <span>Study Cohort Matching Readiness</span>
                </span>
                <span className="text-brand font-mono">{completionPercent}% Complete</span>
              </div>

              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    completionPercent === 100 ? 'bg-emerald-500' : 'bg-brand'
                  }`}
                  style={{ width: `${completionPercent}%` }}
                />
              </div>

              {isStudentIncomplete && (
                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start space-x-2 mt-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                  <p>
                    <span className="font-bold">Setup Required:</span> Complete your academic scope, weekly availability grid, and skills to enable automated bi-weekly study group matching.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ================================================================= */}
        {/* TAB NAVIGATION BAR (AUTH-02 Specification)                        */}
        {/* ================================================================= */}
        <div className="flex items-center space-x-2 border-b border-slate-200/80 pb-3 overflow-x-auto">
          {currentTabs.map((tab) => {
            const TabIcon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isCurrent
                    ? 'bg-brand text-white shadow-md shadow-brand/20'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                <TabIcon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ================================================================= */}
        {/* TAB CONTENT PANELS                                                */}
        {/* ================================================================= */}

        {/* ----------------------------------------------------------------- */}
        {/* TAB 1: General Profile (Shared)                                   */}
        {/* ----------------------------------------------------------------- */}
        {activeTab === 'general' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">General Identity & Academic Biography</h3>
                <p className="text-xs text-slate-500">
                  Update your public display name, email, and introductory statement for peer groups and faculty.
                </p>
              </div>

              <button
                type="button"
                onClick={isTeacher ? handleSaveTeacherProfile : handleSaveGeneralProfile}
                disabled={isSaving}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-hover shadow-sm transition-all disabled:opacity-50 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSaving ? 'Saving...' : 'Save General Info'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Full Display Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand shadow-2xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  University Verified Email (Read-Only)
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-500 cursor-not-allowed shadow-2xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Academic Statement & Bio *
              </label>
              <textarea
                rows={4}
                value={isTeacher ? teacherBio : studentBio}
                onChange={(e) =>
                  isTeacher ? setTeacherBio(e.target.value) : setStudentBio(e.target.value)
                }
                placeholder="Share your academic interests, focus areas, or study objectives..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-normal focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand shadow-2xs resize-none leading-relaxed"
              />
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* TAB 2 (Student): Academic Scope Selector                          */}
        {/* ----------------------------------------------------------------- */}
        {!isTeacher && activeTab === 'scope' && (
          <div className="space-y-6">
            <AcademicScopeSelector
              value={selectedScope}
              onChange={(newScope) => setSelectedScope(newScope)}
              onSave={handleSaveScope}
              isSaving={isSaving}
            />
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* TAB 3 (Student): Weekly Availability Grid                         */}
        {/* ----------------------------------------------------------------- */}
        {!isTeacher && activeTab === 'availability' && (
          <div className="space-y-6">
            <AvailabilityCalendar
              value={availabilityMatrix}
              onChange={(newMatrix) => setAvailabilityMatrix(newMatrix)}
              onSave={handleSaveAvailability}
              isSaving={isSaving}
            />
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* TAB 4 (Student): Skills & Learning Goals                          */}
        {/* ----------------------------------------------------------------- */}
        {!isTeacher && activeTab === 'skills' && (
          <div className="space-y-8">
            {/* Skills Chip Tag Input Card */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="p-2 rounded-xl bg-brand-50 text-brand border border-brand/20">
                      <Layers className="w-5 h-5" />
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">Academic Skills & Strengths</h3>
                  </div>
                  <p className="text-xs text-slate-500">
                    Add self-reported academic competencies and ratings to balance study group pairing.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSaveSkillsAndGoals}
                  disabled={isSaving}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-hover shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSaving ? 'Saving...' : 'Save Skills & Goals'}</span>
                </button>
              </div>

              <SkillTagInput
                skills={skills}
                onChange={(updatedSkills) => setSkills(updatedSkills)}
              />
            </div>

            {/* Learning Goals Card */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center space-x-2 pb-4 border-b border-slate-100">
                <span className="p-2 rounded-xl bg-brand-50 text-brand border border-brand/20">
                  <Target className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Current Semester Learning Goals</h3>
                  <p className="text-xs text-slate-500">
                    Define measurable milestones. The AI tutor tailors practice questions toward these targets.
                  </p>
                </div>
              </div>

              {/* Goal Input Form */}
              <form onSubmit={handleAddGoal} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newGoalInput}
                  onChange={(e) => setNewGoalInput(e.target.value)}
                  placeholder="e.g. Master Backpropagation & SVD decomposition before midterm..."
                  className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand shadow-2xs"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-hover transition-all flex items-center space-x-1 cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Goal</span>
                </button>
              </form>

              {/* Learning Goals Checklist */}
              <div className="space-y-2">
                {learningGoals.length === 0 ? (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center text-xs text-slate-400">
                    No learning goals listed. Add 2–3 specific targets for this term.
                  </div>
                ) : (
                  learningGoals.map((goal, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white transition-all text-xs text-slate-800"
                    >
                      <div className="flex items-center space-x-2.5">
                        <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                        <span className="font-medium">{goal}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveGoal(goal)}
                        className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Remove goal"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* TEACHER TABS                                                      */}
        {/* ----------------------------------------------------------------- */}
        {isTeacher && activeTab === 'affiliation' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">Department Affiliation & Office Hours</h3>
                <p className="text-xs text-slate-500">
                  Institutional appointments and advisory consultation windows.
                </p>
              </div>

              <button
                type="button"
                onClick={handleSaveTeacherProfile}
                disabled={isSaving}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-hover shadow-sm transition-all disabled:opacity-50 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSaving ? 'Saving...' : 'Save Affiliation'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Department Affiliation *
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g. Department of Computer Science & Artificial Intelligence"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand shadow-2xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Designation / Academic Title *
                </label>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="e.g. Associate Professor & AI Curriculum Chair"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand shadow-2xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Office Hours & Consultation Window
              </label>
              <input
                type="text"
                value={officeHours}
                onChange={(e) => setOfficeHours(e.target.value)}
                placeholder="e.g. Tue & Thu: 2:00 PM - 4:30 PM (Suite 402 / Zoom)"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand shadow-2xs"
              />
            </div>
          </div>
        )}

        {isTeacher && activeTab === 'courses' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">Courses Under Pedagogical Authority</h3>
                <p className="text-xs text-slate-500">
                  Active semester course sections and RAG syllabus indexing status.
                </p>
              </div>

              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-brand-50 text-brand border border-brand/20">
                {coursesTaught.length} Assigned Courses
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coursesTaught.map((course) => (
                <div
                  key={course.id}
                  className="rounded-2xl border border-slate-200 p-5 space-y-4 hover:border-brand transition-all shadow-2xs flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-lg bg-brand-50 text-brand font-mono font-bold text-xs">
                        {course.code}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        {course.ragStatus || 'Active Grounding'}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 leading-snug">
                      {course.name}
                    </h4>

                    <p className="text-xs text-slate-500">
                      {course.semester} • {course.studentsCount} Students Enrolled
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium">
                      Syllabus: Vector Indexed
                    </span>
                    <button
                      type="button"
                      onClick={() => setInspectingCourse(course)}
                      className="text-xs font-bold text-brand hover:underline inline-flex items-center space-x-1"
                    >
                      <span>Inspect</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Inspect Course Modal */}
      {inspectingCourse && (
        <Modal
          isOpen={!!inspectingCourse}
          onClose={() => setInspectingCourse(null)}
          title={`${inspectingCourse.code}: ${inspectingCourse.name}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl space-y-1">
              <p><strong>Semester:</strong> {inspectingCourse.semester}</p>
              <p><strong>Active Students:</strong> {inspectingCourse.studentsCount} Enrolled</p>
              <p><strong>Vector Grounding:</strong> {inspectingCourse.ragStatus || 'Active Grounding'}</p>
            </div>
            <p className="text-slate-600">
              Course slide decks and syllabus reading assignments are embedded in the vector collection. Student queries are anchored to lecture slides before generating responses.
            </p>
          </div>
        </Modal>
      )}

      <Footer />
    </div>
  );
}
