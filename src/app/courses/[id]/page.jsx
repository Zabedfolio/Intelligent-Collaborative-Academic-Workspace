'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '../../../components/common/Navbar';
import Footer from '../../../components/common/Footer';
import Breadcrumb from '../../../components/common/Breadcrumb';
import { academicHierarchy } from '../../../data/academicData';
import {
  BookOpen,
  GraduationCap,
  Calendar,
  Building2,
  Sparkles,
  FileText,
  Layers,
  ArrowRight,
  User,
  Clock,
  MapPin,
  CheckCircle2,
  Share2,
  BrainCircuit,
  Award,
  Sliders,
  Users
} from 'lucide-react';
import toast from 'react-hot-toast';
import CourseAISettingsCard from '../../../components/courses/CourseAISettingsCard';
import StudentEnrollmentTable from '../../../components/courses/StudentEnrollmentTable';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params?.id || 'cs401';

  // Find course in academic hierarchy
  const course =
    academicHierarchy.courses.find(
      (c) => c.id.toLowerCase() === String(courseId).toLowerCase()
    ) || academicHierarchy.courses[0];

  // Find semester
  const semester =
    academicHierarchy.semesters.find((s) => s.id === course.semesterId) ||
    academicHierarchy.semesters[0];

  // Find department
  const department =
    academicHierarchy.departments.find((d) => d.id === course.departmentId) ||
    academicHierarchy.departments[0];

  // Course resources
  const courseResources = academicHierarchy.resources.filter(
    (r) => r.courseId === course.id
  );

  // Active sub-tab
  const [activeTab, setActiveTab] = useState('resources'); // 'resources' | 'topics' | 'exams' | 'control-room'
  
  // Dynamic AI Governance & Roster State
  const [courseAIConfig, setCourseAIConfig] = useState(
    course.aiConfig || {
      strictCourseMode: true,
      cumulativeFinalScope: false,
      maxContextTokens: 2500
    }
  );
  const [enrolledStudents, setEnrolledStudents] = useState([
    { id: 'usr-s1', name: 'Alex Johnson', email: 'alex.j@iiuc.ac.bd', role: 'student', enrolledAt: 'Sep 01, 2026' },
    { id: 'usr-s2', name: 'Fatima Al-Mansoor', email: 'fatima.m@iiuc.ac.bd', role: 'student', enrolledAt: 'Sep 02, 2026' },
    { id: 'usr-s3', name: 'Zayed Chowdhury', email: 'zayed.c@iiuc.ac.bd', role: 'student', enrolledAt: 'Sep 04, 2026' },
    { id: 'usr-s4', name: 'Tahsin Ahmed', email: 'tahsin.a@iiuc.ac.bd', role: 'student', enrolledAt: 'Sep 05, 2026' }
  ]);
  const [isSavingAI, setIsSavingAI] = useState(false);
  const [isProcessingRoster, setIsProcessingRoster] = useState(false);

  const handleSaveAISettings = async (updatedConfig) => {
    setIsSavingAI(true);
    try {
      // Optimistic update
      setCourseAIConfig(updatedConfig);
      await new Promise((r) => setTimeout(r, 600));
      toast.success('Course AI parameters saved & synchronized!');
    } catch (err) {
      toast.error('Failed to update AI configuration.');
    } finally {
      setIsSavingAI(false);
    }
  };

  const handleEnrollStudents = async (emails) => {
    setIsProcessingRoster(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      const newEntries = emails.map((email, idx) => ({
        id: `usr-s-new-${Date.now()}-${idx}`,
        name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
        email,
        role: 'student',
        enrolledAt: 'Just now'
      }));
      setEnrolledStudents((prev) => [...newEntries, ...prev]);
      toast.success(`Successfully enrolled ${emails.length} student(s)!`);
    } catch (err) {
      toast.error('Failed to enroll students.');
    } finally {
      setIsProcessingRoster(false);
    }
  };

  const handleUnenrollStudent = async (studentId) => {
    setIsProcessingRoster(true);
    try {
      await new Promise((r) => setTimeout(r, 400));
      setEnrolledStudents((prev) => prev.filter((s) => s.id !== studentId));
      toast.success('Student removed from course roster.');
    } catch (err) {
      toast.error('Failed to remove student.');
    } finally {
      setIsProcessingRoster(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-brand selection:text-white">
      {/* Universal Navbar */}
      <Navbar />

      {/* Top Breadcrumb Navigation Bar */}
      <div className="bg-white border-b border-slate-200/80 px-4 sm:px-8 py-2.5">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb
            university={{
              name: 'IIUC',
              fullName: academicHierarchy.university.name,
              href: '/hierarchy'
            }}
            department={{
              name: department.name,
              href: `/departments/${department.id}`
            }}
            semester={{
              name: semester.name,
              href: `/semesters/${semester.id}`
            }}
            course={{
              name: `${course.code}: ${course.name}`,
              href: `/courses/${course.id}`
            }}
          />
        </div>
      </div>

      {/* Course Hero Banner (Clean, NO GRADIENT) */}
      <div className="bg-white border-b border-slate-200/80 py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 text-brand border border-brand/20">
              {course.code}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>RAG Vector Indexed</span>
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
              {course.credits} Credits
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight max-w-4xl text-slate-900">
            {course.name}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            {course.description}
          </p>

          {/* Instructor & Location Meta */}
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-600 font-medium">
            <span className="flex items-center space-x-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/80">
              <User className="w-3.5 h-3.5 text-slate-500" />
              <span>{course.instructor}</span>
            </span>
            <span className="flex items-center space-x-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/80">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{course.officeHours}</span>
            </span>
            <span className="flex items-center space-x-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/80">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span>{course.classroom}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 pt-8 pb-16 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-1.5 flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: 'resources', label: 'Course Resources & Slides', icon: FileText, count: courseResources.length },
            { id: 'topics', label: 'Curriculum Topics', icon: Layers, count: course.topics.length },
            { id: 'exams', label: 'Exam Diagnostic Prep', icon: Award },
            { id: 'control-room', label: 'AI Control Room & Roster', icon: Sliders }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-brand text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Course Resources */}
        {activeTab === 'resources' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Verified Course Slide Decks & Syllabi
                </h3>
                <p className="text-xs text-slate-500">
                  Grounding materials uploaded by {course.instructor} powering the RAG AI tutor.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {courseResources.length === 0 ? (
                <p className="text-xs text-slate-500 py-6 text-center">No documents uploaded yet.</p>
              ) : (
                courseResources.map((res) => (
                  <div
                    key={res.id}
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200/80 bg-slate-50/70 hover:bg-white transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                  >
                    <div className="flex items-start space-x-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand border border-brand/20 flex items-center justify-center shrink-0 mt-0.5">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center space-x-2 flex-wrap">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-brand transition-colors">
                            {res.title}
                          </h4>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-50 text-emerald-800 border border-emerald-200">
                            {res.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 flex items-center space-x-2">
                          <span>{res.fileName}</span>
                          <span>•</span>
                          <span>{res.size}</span>
                          <span>•</span>
                          <span>{res.pages} Pages</span>
                          <span>•</span>
                          <span>By {res.author}</span>
                        </p>
                      </div>
                    </div>

                    <Link
                      href="/dashboard"
                      className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-brand-50 text-slate-700 hover:text-brand text-xs font-bold transition-all shrink-0"
                    >
                      Inspect in Viewer
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Curriculum Topics */}
        {activeTab === 'topics' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Course Curriculum Syllabus Topics
              </h3>
              <p className="text-xs text-slate-500">
                Key conceptual units covered across lectures and exams in {course.code}.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {course.topics.map((t, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2 hover:border-brand/40 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-brand bg-brand-50 px-2 py-0.5 rounded">
                      Unit 0{idx + 1}
                    </span>
                    <span className="text-xs text-emerald-700 font-semibold flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Syllabus Verified</span>
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    {t}
                  </h4>
                  <Link
                    href="/exams?tab=practice"
                    className="inline-flex items-center space-x-1 text-xs text-brand font-bold hover:underline pt-1"
                  >
                    <span>Practice topic questions</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Exam Prep Quick Jump */}
        {activeTab === 'exams' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Adaptive Exam Diagnostic Tests for {course.code}
                </h3>
                <p className="text-xs text-slate-500">
                  Take dynamic spaced repetition blitz tests and browse the 100-question master bank.
                </p>
              </div>
              <Link
                href="/exams?tab=practice"
                className="px-4 py-2.5 rounded-xl bg-brand text-white font-bold text-xs hover:bg-brand-hover shadow-xs flex items-center space-x-2 transition-all shrink-0 cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>Launch Practice Blitz</span>
              </Link>
            </div>

            <div className="p-4 rounded-2xl bg-brand-50 border border-brand/20 text-xs text-brand flex items-start space-x-3">
              <BrainCircuit className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Professor-Approved Question Distribution</p>
                <p className="text-slate-600 mt-0.5">
                  Questions are generated directly from the slides and problem sets uploaded for {course.code} with verified slide citations.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: AI Control Room & Student Roster */}
        {activeTab === 'control-room' && (
          <div className="space-y-6">
            <CourseAISettingsCard
              course={{ ...course, aiConfig: courseAIConfig }}
              onSave={handleSaveAISettings}
              isSaving={isSavingAI}
              canEdit={true}
            />

            <StudentEnrollmentTable
              course={course}
              enrolledStudents={enrolledStudents}
              onEnrollStudents={handleEnrollStudents}
              onUnenrollStudent={handleUnenrollStudent}
              isProcessing={isProcessingRoster}
              canManage={true}
            />
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
