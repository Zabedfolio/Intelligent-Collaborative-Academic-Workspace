'use client';

import Link from 'next/link';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import FloatingRoleSwitcher from '../../components/FloatingRoleSwitcher';
import Breadcrumb from '../../components/common/Breadcrumb';
import { academicHierarchy } from '../../data/academicData';
import { Building2, GraduationCap, Calendar, BookOpen, ArrowRight, ShieldCheck } from 'lucide-react';

export default function HierarchyPage() {
  const { university, departments, semesters, courses } = academicHierarchy;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-brand selection:text-white">
      <Navbar />

      <div className="bg-white border-b border-slate-200/80 px-4 sm:px-8 py-2.5">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb
            university={{
              name: 'IIUC',
              fullName: university.name,
              href: '/hierarchy'
            }}
            items={[
              { id: 'univ', label: university.name, isCurrent: true, icon: Building2 }
            ]}
          />
        </div>
      </div>

      {/* Clean Modern Page Header (NO GRADIENT) */}
      <div className="bg-white border-b border-slate-200/80 py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 text-brand border border-brand/20">
            Institutional Structure
          </span>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">
            Academic Hierarchy: University → Department → Semester → Course
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            Explore the organizational tree of {university.name}, navigate across academic departments, active semesters, and official course curriculum workspaces.
          </p>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 pt-8 pb-16 space-y-8">
        {departments.map((dept) => {
          const deptSemesters = semesters.filter((s) => s.departmentId === dept.id);
          return (
            <div
              key={dept.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase text-brand bg-brand-50 px-2.5 py-0.5 rounded">
                    Department
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mt-1">
                    {dept.name} ({dept.shortName})
                  </h2>
                  <p className="text-xs text-slate-500">Department Head: {dept.head}</p>
                </div>
                <Link
                  href={`/departments/${dept.id}`}
                  className="text-xs text-brand font-bold hover:underline inline-flex items-center space-x-1"
                >
                  <span>View Department</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Semesters under this Department */}
              <div className="space-y-6">
                {deptSemesters.map((sem) => {
                  const semCourses = courses.filter((c) => c.semesterId === sem.id);
                  return (
                    <div
                      key={sem.id}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-brand" />
                          <h3 className="text-sm font-bold text-slate-900">{sem.name}</h3>
                          <span className="text-xs text-slate-400">({sem.code})</span>
                        </div>
                        <Link
                          href={`/semesters/${sem.id}`}
                          id={`hierarchy-semester-${sem.id}`}
                          className="text-xs font-bold text-brand hover:underline flex items-center space-x-1"
                        >
                          <span>Open Semester Page</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>

                      {/* Course Grid in Semester */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {semCourses.map((c) => (
                          <Link
                            key={c.id}
                            href={`/courses/${c.id}`}
                            className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-brand hover:shadow-xs transition-all flex flex-col justify-between group cursor-pointer"
                          >
                            <div>
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                                {c.code}
                              </span>
                              <h4 className="text-xs font-bold text-slate-900 group-hover:text-brand transition-colors mt-1.5">
                                {c.name}
                              </h4>
                            </div>
                            <span className="text-[11px] text-slate-500 mt-2">
                              {c.instructor} • {c.credits} Credits
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </main>

      <FloatingRoleSwitcher />
      <Footer />
    </div>
  );
}
