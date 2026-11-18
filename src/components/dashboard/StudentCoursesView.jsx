'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  Bot,
  GraduationCap,
  Sparkles,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  FileText
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function StudentCoursesView({ user, onSelectCourseForTutor }) {
  const router = useRouter();

  const courses = [
    {
      id: 'cs401',
      code: 'CS401',
      name: 'Advanced Machine Learning & Neural Networks',
      instructor: 'Prof. Dr. Anderson',
      department: 'Computer Science & Engineering',
      semester: 'Fall 2026',
      credits: 4,
      progress: 68,
      materialsCount: 24,
      nextDeadline: 'Midterm 2 in 8 days',
      ragStatus: 'Vector Indexed (100% Grounded)'
    },
    {
      id: 'cs402',
      code: 'CS402',
      name: 'Distributed Systems & Cloud Architecture',
      instructor: 'Prof. Eleanor Vance',
      department: 'Computer Science & Engineering',
      semester: 'Fall 2026',
      credits: 3,
      progress: 54,
      materialsCount: 18,
      nextDeadline: 'Lab 4 due in 3 days',
      ragStatus: 'Vector Indexed (100% Grounded)'
    },
    {
      id: 'cs302',
      code: 'CS302',
      name: 'Data Structures & Algorithms',
      instructor: 'Dr. Tariqul Islam',
      department: 'Computer Science & Engineering',
      semester: 'Fall 2026',
      credits: 4,
      progress: 82,
      materialsCount: 30,
      nextDeadline: 'Diagnostic Quiz in 5 days',
      ragStatus: 'Vector Indexed (100% Grounded)'
    },
    {
      id: 'math202',
      code: 'MATH202',
      name: 'Linear Algebra & Matrix Decompositions',
      instructor: 'Prof. Marcus Brody',
      department: 'Mathematics & Data Science',
      semester: 'Fall 2026',
      credits: 3,
      progress: 75,
      materialsCount: 16,
      nextDeadline: 'Problem Set 6 due tomorrow',
      ragStatus: 'Vector Indexed (100% Grounded)'
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-brand-50 text-brand border border-brand/20">
              <BookOpen className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">Enrolled Courses & Curricula</h2>
          </div>
          <p className="text-xs text-slate-500">
            Fall 2026 active curriculum enrollment • 4 Courses (14 Total Credits)
          </p>
        </div>

        <Link
          href="/courses"
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
        >
          <span>Browse Course Directory</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm hover:border-brand/40 transition-all flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-xl bg-brand text-white font-mono font-bold text-xs shadow-xs">
                  {course.code}
                </span>
                <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>{course.ragStatus}</span>
                </span>
              </div>

              <div>
                <h3 className="font-bold text-base text-slate-900 leading-snug">
                  {course.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {course.instructor} • {course.department}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Curriculum Progress</span>
                  <span className="font-mono font-bold text-brand">{course.progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand rounded-full transition-all"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Meta & Action Buttons */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>{course.materialsCount} Slide Decks & PDFs</span>
                <span className="font-semibold text-amber-700">{course.nextDeadline}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (onSelectCourseForTutor) {
                      onSelectCourseForTutor(course);
                    } else {
                      toast.success(`Launched RAG AI Tutor for ${course.code}`);
                    }
                  }}
                  className="flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl bg-brand-50 hover:bg-brand text-brand hover:text-white border border-brand/20 text-xs font-bold transition-all cursor-pointer"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>Ask AI Tutor</span>
                </button>

                <Link
                  href="/exams"
                  className="flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Practice Exam</span>
                </Link>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

