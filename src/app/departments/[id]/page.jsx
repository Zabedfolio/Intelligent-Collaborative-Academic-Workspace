'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '../../../components/common/Navbar';
import Footer from '../../../components/common/Footer';
import FloatingRoleSwitcher from '../../../components/FloatingRoleSwitcher';
import Breadcrumb from '../../../components/common/Breadcrumb';
import { academicHierarchy } from '../../../data/academicData';
import { Building2, GraduationCap, Calendar, BookOpen, ArrowRight, User } from 'lucide-react';

export default function DepartmentDetailPage() {
  const params = useParams();
  const deptId = params?.id || 'cse';

  const department =
    academicHierarchy.departments.find(
      (d) => d.id.toLowerCase() === String(deptId).toLowerCase()
    ) || academicHierarchy.departments[0];

  const deptSemesters = academicHierarchy.semesters.filter(
    (s) => s.departmentId === department.id
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-brand selection:text-white">
      <Navbar />

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
              href: `/departments/${department.id}`,
              isCurrent: true
            }}
          />
        </div>
      </div>

      {/* Clean Modern Page Header (NO GRADIENT) */}
      <div className="bg-white border-b border-slate-200/80 py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 text-brand border border-brand/20">
            Academic Department
          </span>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">
            {department.name} ({department.shortName})
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            Department Head: <span className="font-bold text-slate-900">{department.head}</span> • International Islamic University
          </p>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 pt-8 pb-16 space-y-8">
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-brand" />
            <span>Academic Semesters & Term Offerings</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {deptSemesters.map((sem) => (
              <div
                key={sem.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase bg-brand-50 text-brand">
                    {sem.code}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-2">{sem.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Academic Year {sem.academicYear} • {sem.totalCredits} Credits
                  </p>
                </div>

                <Link
                  href={`/semesters/${sem.id}`}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-brand hover:text-white text-slate-700 font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <span>Open {sem.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>

      <FloatingRoleSwitcher />
      <Footer />
    </div>
  );
}
