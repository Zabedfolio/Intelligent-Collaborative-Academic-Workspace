'use client';

import Link from 'next/link';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import Breadcrumb from '../../components/common/Breadcrumb';
import { academicHierarchy } from '../../data/academicData';
import { BookOpen, Sparkles, ArrowRight, User, Calendar, Layers } from 'lucide-react';

export default function CoursesCatalogPage() {
  const { courses, university, departments } = academicHierarchy;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-brand selection:text-white">
      <Navbar />

      {/* Top Breadcrumb */}
      <div className="bg-white border-b border-slate-200/80 px-4 sm:px-8 py-2.5">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb
            university={{
              name: 'IIUC',
              fullName: university.name,
              href: '/hierarchy'
            }}
            items={[
              { id: 'univ', label: 'IIUC', href: '/hierarchy' },
              { id: 'courses', label: 'All Courses Directory', isCurrent: true, icon: BookOpen }
            ]}
          />
        </div>
      </div>

      {/* Clean Modern Page Header (NO GRADIENT) */}
      <div className="bg-white border-b border-slate-200/80 py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-2">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 text-brand border border-brand/20">
            Course Catalog
          </span>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">
            Active University Courses & Syllabi
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Browse official semester courses, access professor lecture slides, and launch verified RAG tutoring.
          </p>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 pt-8 pb-16 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase bg-brand-50 text-brand border border-brand/20">
                    {c.code}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">{c.credits} Credits</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-brand transition-colors">
                  {c.name}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {c.description}
                </p>
                <div className="pt-2 text-xs text-slate-500 space-y-1">
                  <div className="flex items-center space-x-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>{c.instructor}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <Link
                      href={`/semesters/${c.semesterId}`}
                      className="text-brand font-medium hover:underline"
                    >
                      {c.semester}
                    </Link>
                  </div>
                </div>
              </div>

              <Link
                href={`/courses/${c.id}`}
                id={`open-course-${c.id}`}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-brand hover:text-white text-slate-700 font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <span>Open Course Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
