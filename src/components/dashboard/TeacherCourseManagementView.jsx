'use client';

import { useState } from 'react';
import {
  FolderKanban,
  BookOpen,
  Users,
  ShieldCheck,
  Plus,
  Sliders,
  FileUp,
  ExternalLink,
  Search,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function TeacherCourseManagementView({ user, onNavigate }) {
  const [courses, setCourses] = useState([
    {
      id: 'cs401',
      code: 'CS401',
      name: 'Advanced Machine Learning & Neural Networks',
      department: 'Computer Science & AI',
      semester: 'Fall 2026',
      studentsCount: 142,
      materialsCount: 28,
      ragStatus: 'Active Grounding',
      syllabusIndexed: true,
      lastIngested: 'Today at 09:30 AM'
    },
    {
      id: 'cs302',
      code: 'CS302',
      name: 'Data Structures & Algorithms',
      department: 'Computer Science & AI',
      semester: 'Fall 2026',
      studentsCount: 190,
      materialsCount: 34,
      ragStatus: 'Active Grounding',
      syllabusIndexed: true,
      lastIngested: 'Yesterday'
    },
    {
      id: 'cs605',
      code: 'CS605',
      name: 'Deep Generative Architectures & LLMs',
      department: 'Computer Science & AI',
      semester: 'Fall 2026',
      studentsCount: 45,
      materialsCount: 19,
      ragStatus: 'Active Grounding',
      syllabusIndexed: true,
      lastIngested: '3 days ago'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter(
    (c) =>
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-brand-50 text-brand border border-brand/20">
              <FolderKanban className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">Faculty Course Management</h2>
          </div>
          <p className="text-xs text-slate-500">
            Assigned course sections under your pedagogical oversight for Fall 2026.
          </p>
        </div>

        <button
          type="button"
          onClick={() => toast.success('Add New Course Section modal opened')}
          className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-brand text-white font-bold text-xs hover:bg-brand-hover shadow-sm transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Course Section</span>
        </button>
      </div>

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Assigned Courses</span>
          <div className="text-3xl font-black text-brand font-mono">3 Courses</div>
          <div className="text-[11px] text-slate-400">Fall 2026 term</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Total Students</span>
          <div className="text-3xl font-black text-slate-900 font-mono">377 Enrolled</div>
          <div className="text-[11px] text-emerald-600 font-semibold">Across all 3 sections</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Indexed Materials</span>
          <div className="text-3xl font-black text-slate-900 font-mono">81 PDFs</div>
          <div className="text-[11px] text-brand font-semibold">Syllabi, slides, & banks</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">RAG Engine Status</span>
          <div className="text-3xl font-black text-emerald-600 font-mono">100% Ready</div>
          <div className="text-[11px] text-slate-400">Zero unindexed backlog</div>
        </div>
      </div>

      {/* Course List & Actions */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="relative flex-1 max-w-sm">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search course by code or name..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>

          <span className="text-xs text-slate-500">
            Showing {filteredCourses.length} active course sections
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="rounded-2xl border border-slate-200/90 p-5 space-y-4 hover:border-brand/40 transition-all shadow-2xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-brand text-white font-mono font-bold text-xs">
                    {course.code}
                  </span>
                  <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>{course.ragStatus}</span>
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">
                    {course.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {course.semester} • {course.department}
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Enrolled Students:</span>
                    <strong className="text-slate-900">{course.studentsCount} Students</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Vectorized Materials:</span>
                    <strong className="text-slate-900">{course.materialsCount} Documents</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Last Ingested:</span>
                    <span className="text-slate-500 text-[11px]">{course.lastIngested}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigate) onNavigate('resource-ingestion');
                    else toast.success(`Navigating to Ingestion for ${course.code}`);
                  }}
                  className="flex items-center justify-center space-x-1.5 py-2 px-2.5 rounded-xl bg-brand-50 hover:bg-brand text-brand hover:text-white border border-brand/20 text-xs font-bold transition-all cursor-pointer"
                >
                  <FileUp className="w-3.5 h-3.5" />
                  <span>Upload Slides</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (onNavigate) onNavigate('ai-config');
                    else toast.success(`Opening AI Config for ${course.code}`);
                  }}
                  className="flex items-center justify-center space-x-1.5 py-2 px-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>AI Config</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
