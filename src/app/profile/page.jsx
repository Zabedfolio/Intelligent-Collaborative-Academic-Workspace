'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import FloatingRoleSwitcher from '../../components/FloatingRoleSwitcher';
import Modal from '../../components/common/Modal';
import EmptyState from '../../components/common/EmptyState';
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
  X,
  Save,
  Users,
  Building2,
  Briefcase,
  Layers,
  ArrowRight,
  ExternalLink,
  Edit3,
  Check,
  RotateCcw,
  Target,
  FolderOpen
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const router = useRouter();
  const { user, updateProfile, initAuth } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    initAuth();
  }, [initAuth]);

  // =========================================================================
  // STUDENT STATE
  // =========================================================================
  const [studentBio, setStudentBio] = useState('');
  const [skills, setSkills] = useState([]);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [learningGoals, setLearningGoals] = useState([]);
  const [newGoalInput, setNewGoalInput] = useState('');
  const [availability, setAvailability] = useState({
    hoursPerWeek: 12,
    preferredTimes: ['Weekday Evenings (6-9 PM)', 'Weekend Mornings (9 AM-12 PM)'],
    groupSize: '3-4 students',
    studyMode: 'Hybrid (Virtual + Campus)'
  });
  const [isSavingStudent, setIsSavingStudent] = useState(false);

  // =========================================================================
  // TEACHER STATE
  // =========================================================================
  const [teacherBio, setTeacherBio] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');
  const [officeHours, setOfficeHours] = useState('');
  const [coursesTaught, setCoursesTaught] = useState([]);
  const [isSavingTeacher, setIsSavingTeacher] = useState(false);
  const [inspectingCourse, setInspectingCourse] = useState(null);

  // Sync state from active user
  useEffect(() => {
    if (!user) return;

    if (user.role === 'teacher') {
      setTeacherBio(user.bio || 'Associate Professor of Computer Science specializing in NLP, retrieval-augmented generation architectures, and verifiable generative AI in higher education.');
      setDepartment(user.department || 'Department of Computer Science & Artificial Intelligence');
      setDesignation(user.designation || 'Associate Professor & AI Curriculum Chair');
      setOfficeHours(user.officeHours || 'Tue & Thu: 2:00 PM - 4:30 PM (Academic Hall Suite 402 / Zoom)');
      setCoursesTaught(user.coursesTaught || [
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
      ]);
    } else {
      // Student defaults
      setStudentBio(user.bio || 'Junior CS student passionate about machine learning, deep learning, and collaborative algorithmic problem solving.');
      setSkills(user.skills || ['Python', 'Machine Learning', 'Data Structures', 'PyTorch', 'Linear Algebra']);
      setLearningGoals(user.learningGoals || [
        'Score an A grade in CS401 Machine Learning',
        'Master RAG vector retrieval pipelines and dense embeddings',
        'Form an active weekly peer review study group'
      ]);
      setAvailability(user.availability || {
        hoursPerWeek: 12,
        preferredTimes: ['Weekday Evenings (6-9 PM)', 'Weekend Mornings (9 AM-12 PM)'],
        groupSize: '3-4 students',
        studyMode: 'Hybrid (Virtual + Campus)'
      });
    }
  }, [user]);

  // -------------------------------------------------------------------------
  // Student Actions
  // -------------------------------------------------------------------------
  const handleAddSkill = (e) => {
    e.preventDefault();
    const trimmed = newSkillInput.trim();
    if (!trimmed) return;
    if (skills.includes(trimmed)) {
      toast.error('Skill is already added.');
      return;
    }
    setSkills([...skills, trimmed]);
    setNewSkillInput('');
    toast.success(`Added skill: "${trimmed}"`);
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
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
    toast.success('New learning goal added!');
  };

  const handleRemoveGoal = (goalToRemove) => {
    setLearningGoals(learningGoals.filter((g) => g !== goalToRemove));
  };

  const togglePreferredTime = (timeSlot) => {
    const current = availability.preferredTimes || [];
    if (current.includes(timeSlot)) {
      setAvailability({
        ...availability,
        preferredTimes: current.filter((t) => t !== timeSlot)
      });
    } else {
      setAvailability({
        ...availability,
        preferredTimes: [...current, timeSlot]
      });
    }
  };

  const handleSaveStudentProfile = () => {
    setIsSavingStudent(true);
    setTimeout(() => {
      updateProfile({
        bio: studentBio,
        skills,
        learningGoals,
        availability,
        matchingCycleStatus: 'Updated • Next group matching cycle runs in 2 days'
      });
      setIsSavingStudent(false);
      // Acceptance criteria: "my profile updates and this data feeds into the group-matching algorithm on my next matching cycle"
      toast.success('Profile saved! Data will feed into the group-matching algorithm on your next cycle.');
    }, 600);
  };

  // Simulate incomplete profile to test empty states and prompts
  const handleSimulateIncompleteProfile = () => {
    setSkills([]);
    setLearningGoals([]);
    setAvailability({
      hoursPerWeek: 0,
      preferredTimes: [],
      groupSize: '',
      studyMode: ''
    });
    setStudentBio('');
    toast('Profile cleared to demonstrate empty states & prompts', { icon: 'ℹ️' });
  };

  const handleRestoreDemoProfile = () => {
    setSkills(['Python', 'Machine Learning', 'Data Structures', 'PyTorch', 'Linear Algebra']);
    setLearningGoals([
      'Score an A grade in CS401 Machine Learning',
      'Master RAG vector retrieval pipelines and dense embeddings',
      'Form an active weekly peer review study group'
    ]);
    setAvailability({
      hoursPerWeek: 12,
      preferredTimes: ['Weekday Evenings (6-9 PM)', 'Weekend Mornings (9 AM-12 PM)'],
      groupSize: '3-4 students',
      studyMode: 'Hybrid (Virtual + Campus)'
    });
    setStudentBio('Junior CS student passionate about machine learning, deep learning, and collaborative algorithmic problem solving.');
    toast.success('Restored populated student demo profile');
  };

  // -------------------------------------------------------------------------
  // Teacher Actions
  // -------------------------------------------------------------------------
  const handleSaveTeacherProfile = () => {
    setIsSavingTeacher(true);
    setTimeout(() => {
      updateProfile({
        bio: teacherBio,
        department,
        designation,
        officeHours,
        coursesTaught
      });
      setIsSavingTeacher(false);
      // Acceptance criteria: "When I save, then the changes reflect on my public teacher profile."
      toast.success('Teacher profile & department affiliation updated successfully.');
    }, 600);
  };

  // Calculate Student Profile Completion safely
  const calculateStudentCompletion = () => {
    let score = 20; // base account
    if (studentBio && typeof studentBio === 'string' && studentBio.trim()) score += 20;
    if (Array.isArray(skills) && skills.length > 0) score += 20;
    if (Array.isArray(learningGoals) && learningGoals.length > 0) score += 20;
    const prefTimes = availability?.preferredTimes || [];
    const hrs = availability?.hoursPerWeek || 0;
    if (prefTimes.length > 0 && hrs > 0) score += 20;
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-48 bg-white rounded-3xl border border-slate-200/90 p-6" />
            <div className="h-48 bg-white rounded-3xl border border-slate-200/90 p-6" />
            <div className="h-48 bg-white rounded-3xl border border-slate-200/90 p-6" />
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
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-brand text-white font-bold text-xs"
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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 selection:bg-brand selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* ================================================================= */}
        {/* HEADER: Academic Profile Banner & Role Switcher Tip               */}
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
                <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white" title="Active">
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
                  {user.email} • {isTeacher ? department : (user.department || 'Computer Science')}
                </p>

                <p className="text-xs font-semibold text-brand">
                  {isTeacher
                    ? designation
                    : `${user.semester || '6th Semester'} • Academic Good Standing`}
                </p>
              </div>
            </div>

            {/* Role Context & Actions */}
            <div className="flex flex-col items-start md:items-end space-y-2 shrink-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Active View: <span className="text-brand font-black">{user.role.toUpperCase()} PROFILE</span>
              </span>

              {!isTeacher && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleSimulateIncompleteProfile}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-all cursor-pointer"
                    title="Clear skills and availability to test incomplete prompts"
                  >
                    Test Empty State
                  </button>
                  <button
                    onClick={handleRestoreDemoProfile}
                    className="px-3 py-1.5 rounded-xl bg-brand-50 border border-brand/20 text-brand text-xs font-semibold hover:bg-brand-100 transition-all cursor-pointer"
                  >
                    Load Demo Data
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Student Profile Completion Bar (Shows if incomplete) */}
          {!isTeacher && (
            <div className="mt-6 pt-6 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center space-x-1.5 text-slate-700">
                  <Sparkles className="w-4 h-4 text-brand" />
                  <span>Study Group Matching Readiness</span>
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
                    <span className="font-bold">Profile Incomplete:</span> Complete your skills, learning goals, and weekly study availability below to unlock high-compatibility study group pairing and personalized exam suggestions!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ================================================================= */}
        {/* STUDENT VIEW: Skills, Learning Goals & Group-Matching Schedule    */}
        {/* ================================================================= */}
        {!isTeacher && (
          <div className="space-y-8">
            
            {/* Matching Algorithm Information Box */}
            <div className="bg-brand text-white rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-emerald-300" />
                  <h3 className="font-bold text-base">Intelligent Study Group Matching Engine</h3>
                </div>
                <p className="text-xs text-white/80 max-w-2xl leading-relaxed">
                  Your skills, active learning goals, and weekly availability directly feed into our algorithmic matching pipeline. On every matching cycle, peers with complementary skill sets and overlapping study hours are grouped together.
                </p>
              </div>

              <div className="px-3.5 py-2 rounded-2xl bg-white/10 border border-white/15 text-xs font-semibold shrink-0">
                <span>Cycle: Next in 2 days</span>
              </div>
            </div>

            {/* Grid: Skills (Left) & Learning Goals (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* 1. SKILLS SECTION */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand border border-brand/20 flex items-center justify-center">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-slate-900">Academic Skills</h3>
                      <p className="text-xs text-slate-500">Subjects & technologies you excel in</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {skills.length} Skills
                  </span>
                </div>

                {/* Add Skill Input Form */}
                <form onSubmit={handleAddSkill} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newSkillInput}
                    onChange={(e) => setNewSkillInput(e.target.value)}
                    placeholder="Add a skill (e.g. Python, Calculus, ML)..."
                    className="flex-1 px-4 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-hover transition-all flex items-center space-x-1 cursor-pointer shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </form>

                {/* Skills Tags List vs Empty State */}
                {skills.length === 0 ? (
                  <EmptyState
                    icon={FolderOpen}
                    title="No skills added yet"
                    description="Add your primary skills (e.g. Python, Calculus, ML) so peers with complementary questions can find you."
                    actionLabel="Add Sample Skill"
                    onAction={() => setSkills(['Python', 'Calculus', 'Data Structures'])}
                    actionIcon={Plus}
                    className="p-6 sm:p-8"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-brand-50 text-slate-800 hover:text-brand border border-slate-200 hover:border-brand/30 text-xs font-semibold transition-all group"
                      >
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="text-slate-400 hover:text-rose-600 transition-colors"
                          aria-label={`Remove ${skill}`}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. LEARNING GOALS SECTION */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand border border-brand/20 flex items-center justify-center">
                      <Target className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-slate-900">Learning Goals</h3>
                      <p className="text-xs text-slate-500">Target grades & topics you want to master</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {learningGoals.length} Goals
                  </span>
                </div>

                {/* Add Goal Input Form */}
                <form onSubmit={handleAddGoal} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newGoalInput}
                    onChange={(e) => setNewGoalInput(e.target.value)}
                    placeholder="Enter target goal (e.g. Master RAG vector pipelines)..."
                    className="flex-1 px-4 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-hover transition-all flex items-center space-x-1 cursor-pointer shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </form>

                {/* Goals List vs Empty State */}
                {learningGoals.length === 0 ? (
                  <EmptyState
                    icon={Target}
                    title="No learning goals set yet"
                    description="Define what you want to achieve this semester so your study group matches are aligned on identical academic benchmarks."
                    actionLabel="Add Sample Goal"
                    onAction={() => setLearningGoals(['Score an A in CS401 Machine Learning', 'Master RAG architectures'])}
                    actionIcon={Plus}
                    className="p-6 sm:p-8"
                  />
                ) : (
                  <div className="space-y-2 pt-2">
                    {learningGoals.map((goal, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs text-slate-800 hover:border-brand/30 transition-all"
                      >
                        <div className="flex items-center space-x-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="font-medium leading-relaxed">{goal}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveGoal(goal)}
                          className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                          aria-label={`Remove goal ${goal}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* 3. AVAILABILITY & WEEKLY STUDY SCHEDULE */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand border border-brand/20 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">Weekly Study Availability</h3>
                    <p className="text-xs text-slate-500">Defines when you are free to meet for peer collaboration</p>
                  </div>
                </div>

                <span className="text-xs font-bold text-brand bg-brand-50 px-3 py-1 rounded-full border border-brand/20">
                  {availability.hoursPerWeek} Hours / Week
                </span>
              </div>

              {/* Weekly Hours Slider */}
              <div className="space-y-2 max-w-md">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Study Commitment per Week:</span>
                  <span className="font-bold text-brand">{availability.hoursPerWeek} hours</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="30"
                  step="2"
                  value={availability.hoursPerWeek}
                  onChange={(e) => setAvailability({ ...availability, hoursPerWeek: Number(e.target.value) })}
                  className="w-full accent-[#003717] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>2 hrs (Light)</span>
                  <span>15 hrs (Moderate)</span>
                  <span>30 hrs (Intensive)</span>
                </div>
              </div>

              {/* Time Slots Checkboxes */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Preferred Meeting Time Slots (Select all that apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    'Morning (8:00 AM - 12:00 PM)',
                    'Afternoon (1:00 PM - 5:00 PM)',
                    'Weekday Evenings (6:00 PM - 9:00 PM)',
                    'Night (9:00 PM - 11:30 PM)',
                    'Weekend Mornings (9:00 AM - 12:00 PM)',
                    'Weekend Afternoons (1:00 PM - 5:00 PM)'
                  ].map((slot, idx) => {
                    const isChecked = availability.preferredTimes?.includes(slot);
                    return (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => togglePreferredTime(slot)}
                        className={`p-3 rounded-2xl text-left text-xs font-medium border transition-all flex items-center justify-between cursor-pointer ${
                          isChecked
                            ? 'bg-brand text-white border-brand shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <span>{slot}</span>
                        {isChecked && <Check className="w-3.5 h-3.5 text-white" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Study Mode & Group Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Preferred Group Size
                  </label>
                  <select
                    value={availability.groupSize}
                    onChange={(e) => setAvailability({ ...availability, groupSize: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand bg-white"
                  >
                    <option value="2-3 students">Small (2-3 students)</option>
                    <option value="3-4 students">Standard (3-4 students)</option>
                    <option value="5+ students">Large study group (5+ students)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Study Location / Mode
                  </label>
                  <select
                    value={availability.studyMode}
                    onChange={(e) => setAvailability({ ...availability, studyMode: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand bg-white"
                  >
                    <option value="Hybrid (Virtual + Campus)">Hybrid (Virtual + Campus)</option>
                    <option value="100% Online (Zoom / Discord)">100% Online (Virtual)</option>
                    <option value="In-Person Campus Library">In-Person (Campus Library)</option>
                  </select>
                </div>
              </div>

              {/* Save Student Profile Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <p className="text-xs text-slate-500">
                  Data feeds into study group matches every Monday and Thursday.
                </p>
                <button
                  type="button"
                  id="save-student-profile-btn"
                  onClick={handleSaveStudentProfile}
                  disabled={isSavingStudent}
                  className="px-6 py-3 rounded-xl bg-brand text-white text-xs font-bold shadow-md hover:bg-brand-hover active:scale-95 transition-all flex items-center space-x-2 cursor-pointer disabled:opacity-70"
                >
                  {isSavingStudent ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>Save Profile & Update Group Matching</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ================================================================= */}
        {/* TEACHER VIEW: Department, Bio & Courses Taught List               */}
        {/* ================================================================= */}
        {isTeacher && (
          <div className="space-y-8">
            
            {/* Faculty Bio & Department Affiliation Card */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand border border-brand/20 flex items-center justify-center">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">Faculty Credentials & Department Info</h3>
                    <p className="text-xs text-slate-500">Public profile visible to enrolled students and academic deans</p>
                  </div>
                </div>

                <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  Institutional Scope of Authority
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Department Affiliation *
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. Department of Computer Science & Artificial Intelligence"
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand font-medium text-slate-800"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Affects which academic division can index course materials.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Academic Designation / Title *
                  </label>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="e.g. Associate Professor & AI Curriculum Chair"
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand font-medium text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Office Hours & Academic Location
                </label>
                <input
                  type="text"
                  value={officeHours}
                  onChange={(e) => setOfficeHours(e.target.value)}
                  placeholder="e.g. Tue & Thu: 2:00 PM - 4:30 PM (Suite 402 / Zoom)"
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Academic Biography & Teaching Philosophy *
                </label>
                <textarea
                  rows={4}
                  value={teacherBio}
                  onChange={(e) => setTeacherBio(e.target.value)}
                  placeholder="Describe your research focus, curriculum standards, and pedagogical guidelines..."
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand font-medium text-slate-800 resize-none leading-relaxed"
                />
              </div>

              {/* Save Teacher Profile Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Updates immediately synchronize across all student course portals.
                </span>
                <button
                  type="button"
                  id="save-teacher-profile-btn"
                  onClick={handleSaveTeacherProfile}
                  disabled={isSavingTeacher}
                  className="px-6 py-3 rounded-xl bg-brand text-white text-xs font-bold shadow-md hover:bg-brand-hover active:scale-95 transition-all flex items-center space-x-2 cursor-pointer disabled:opacity-70"
                >
                  {isSavingTeacher ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>Save Faculty Profile & Bio</span>
                </button>
              </div>
            </div>

            {/* Courses Currently Taught Section */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand border border-brand/20 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">Courses Currently Taught</h3>
                    <p className="text-xs text-slate-500">Active semester courses under your pedagogical authority</p>
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand text-xs font-bold transition-all"
                >
                  <span>Go to Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* List of Courses Taught with Quick Links */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {coursesTaught.map((course) => (
                  <div
                    key={course.id}
                    className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-brand/30 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-brand text-white">
                          {course.code}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500">
                          {course.semester}
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-slate-900 leading-snug">
                        {course.name}
                      </h4>

                      <div className="flex items-center space-x-3 text-xs text-slate-500 pt-1">
                        <span className="flex items-center space-x-1">
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          <span>{course.studentsCount} Students</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center space-x-1 text-emerald-700 font-semibold">
                          <Sparkles className="w-3 h-3 text-emerald-600" />
                          <span>RAG Grounding</span>
                        </span>
                      </div>
                    </div>

                    {/* Quick Links to Manage Course */}
                    <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2">
                      <Link
                        href="/dashboard"
                        id={`manage-course-${course.id}`}
                        className="flex-1 py-1.5 px-3 rounded-lg bg-white border border-slate-200 hover:border-brand hover:text-brand text-[11px] font-bold text-center text-slate-700 transition-colors shadow-2xs"
                      >
                        Manage Course
                      </Link>

                      <button
                        type="button"
                        onClick={() => setInspectingCourse(course)}
                        className="py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand text-[11px] font-bold text-slate-600 transition-colors cursor-pointer"
                        title="View RAG syllabus details"
                      >
                        Inspect
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>

      <Footer />

      {/* Floating Role Switcher Widget */}
      <FloatingRoleSwitcher />

      {/* Modal: Course Inspection Details */}
      <Modal
        isOpen={!!inspectingCourse}
        onClose={() => setInspectingCourse(null)}
        title={inspectingCourse ? `${inspectingCourse.code} - Course Details` : 'Course Inspection'}
        subtitle={`Semester: ${inspectingCourse?.semester || 'Fall 2026'}`}
      >
        {inspectingCourse && (
          <div className="space-y-4 text-xs text-slate-700">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h5 className="font-bold text-sm text-slate-900">{inspectingCourse.name}</h5>
              <p className="text-slate-600 leading-relaxed">
                Course authorized under {department}. Verified students enrolled: <span className="font-bold text-slate-900">{inspectingCourse.studentsCount}</span>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
              <p className="font-bold flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>RAG AI Tutor Grounding Active</span>
              </p>
              <p className="text-[11px] text-emerald-800">
                All student queries submitted to the CS AI Tutor for this course are constrained strictly to verified lecture slides and approved exam solutions.
              </p>
            </div>

            <div className="pt-2 flex justify-end space-x-2">
              <button
                onClick={() => setInspectingCourse(null)}
                className="px-4 py-2 rounded-xl bg-brand text-white font-bold text-xs hover:bg-brand-hover"
              >
                Close Preview
              </button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
}
