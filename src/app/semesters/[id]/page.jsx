'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '../../../components/common/Navbar';
import Footer from '../../../components/common/Footer';
import Breadcrumb from '../../../components/common/Breadcrumb';
import { academicHierarchy } from '../../../data/academicData';
import {
  Calendar,
  Building2,
  GraduationCap,
  BookOpen,
  ArrowRight,
  Clock,
  Users,
  Award,
  Sparkles,
  CheckCircle2,
  FileText
} from 'lucide-react';

export default function SemesterDetailPage() {
  const params = useParams();
  const semesterId = params?.id || 'fall-2026';

  // Find semester
  const semester =
    academicHierarchy.semesters.find(
      (s) => s.id.toLowerCase() === String(semesterId).toLowerCase()
    ) || academicHierarchy.semesters[0];

  // Find department
  const department =
    academicHierarchy.departments.find((d) => d.id === semester.departmentId) ||
    academicHierarchy.departments[0];

  // Courses in this semester
  const semesterCourses = academicHierarchy.courses.filter(
    (c) => c.semesterId === semester.id
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-brand selection:text-white">
      {/* Universal Navbar */}
      <Navbar />

      {/* Top Academic Hierarchy Breadcrumb */}
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
              href: `/semesters/${semester.id}`,
              isCurrent: true
            }}
          />
        </div>
      </div>

      {/* Clean Modern Page Header (NO GRADIENT) */}
      <div className="bg-white border-b border-slate-200/80 py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 text-brand border border-brand/20">
              {semester.code} Academic Term
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
              Academic Year {semester.academicYear}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
              {semester.totalCredits} Total Credits
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">
            {semester.name}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            {department.name} • {semesterCourses.length} active syllabus-anchored courses for this academic term.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-700 font-medium">
            <span className="flex items-center space-x-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/80">
              <Clock className="w-3.5 h-3.5 text-brand" />
              <span>{semester.startDate} – {semester.endDate}</span>
            </span>
            <span className="flex items-center space-x-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/80">
              <Users className="w-3.5 h-3.5 text-brand" />
              <span>{semester.activeEnrolledStudents} Enrolled Students</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 pt-8 pb-16 space-y-8">
        
        {/* Enrolled Courses in this Semester */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-brand" />
                <span>Enrolled & Offered Courses in {semester.name}</span>
              </h2>
              <p className="text-xs text-slate-500">
                Click any course to inspect professor slides, syllabus grounding, and diagnostic test banks.
              </p>
            </div>
            <span className="text-xs font-bold text-brand bg-brand-50 px-3 py-1 rounded-full border border-brand/20">
              {semesterCourses.length} Courses Offered
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {semesterCourses.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase bg-brand-50 text-brand border border-brand/20">
                      {c.code}
                    </span>
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      {c.credits} Credits
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-brand transition-colors">
                    {c.name}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {c.description}
                  </p>

                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-600 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Instructor:</span>
                      <span className="font-bold text-slate-800">{c.instructor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Indexed Docs:</span>
                      <span className="font-bold text-slate-800">{c.documentCount} PDFs in RAG</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Syllabus Units:</span>
                      <span className="font-bold text-slate-800">{c.topicsCount} Key Topics</span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/courses/${c.id}`}
                  id={`semester-open-course-${c.id}`}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-brand hover:text-white text-slate-700 font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <span>Open {c.code} Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Semester Term Milestones */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900">
            {semester.name} Academic Milestones
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-500">Midterm Examination Window</span>
              <p className="text-sm font-bold text-slate-900">Nov 10 – Nov 22, 2026</p>
              <p className="text-xs text-slate-500">CS401, CS402, MATH202 exams</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-500">Final Course Project Due</span>
              <p className="text-sm font-bold text-slate-900">Dec 20, 2026</p>
              <p className="text-xs text-slate-500">Collaborative group submissions</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-500">Semester Final Exams</span>
              <p className="text-sm font-bold text-slate-900">Jan 02 – Jan 15, 2027</p>
              <p className="text-xs text-slate-500">Institutional examination hall</p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
