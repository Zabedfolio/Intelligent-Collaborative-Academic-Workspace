'use client';

import { useState } from 'react';
import {
  School,
  Building2,
  Calendar,
  BookOpen,
  Award,
  CheckCircle2,
  Save,
  ArrowRight
} from 'lucide-react';
import toast from 'react-hot-toast';

const DEPARTMENTS = [
  {
    id: 'cse',
    name: 'Department of Computer Science & Engineering',
    code: 'CSE',
    semesters: ['fall-2026', 'spring-2026', 'fall-2025']
  },
  {
    id: 'math',
    name: 'Department of Mathematics & Data Science',
    code: 'MATH',
    semesters: ['fall-2026', 'spring-2026']
  },
  {
    id: 'eee',
    name: 'Department of Electrical & Electronic Engineering',
    code: 'EEE',
    semesters: ['fall-2026', 'spring-2026']
  },
  {
    id: 'bba',
    name: 'Department of Business Administration',
    code: 'BBA',
    semesters: ['fall-2026']
  }
];

const SEMESTERS = [
  { id: 'fall-2026', name: 'Fall 2026 Semester', code: 'FA26' },
  { id: 'spring-2026', name: 'Spring 2026 Semester', code: 'SP26' },
  { id: 'fall-2025', name: 'Fall 2025 Semester', code: 'FA25' }
];

const COURSES = [
  {
    id: 'cs401',
    code: 'CS401',
    name: 'Advanced Machine Learning & Neural Networks',
    departmentId: 'cse',
    semesterId: 'fall-2026'
  },
  {
    id: 'cs402',
    code: 'CS402',
    name: 'Distributed Systems & Cloud Architecture',
    departmentId: 'cse',
    semesterId: 'fall-2026'
  },
  {
    id: 'cs302',
    code: 'CS302',
    name: 'Data Structures & Algorithms',
    departmentId: 'cse',
    semesterId: 'fall-2026'
  },
  {
    id: 'math202',
    code: 'MATH202',
    name: 'Linear Algebra & Matrix Decompositions',
    departmentId: 'math',
    semesterId: 'fall-2026'
  }
];

export default function AcademicScopeSelector({
  value = {},
  onChange,
  onSave,
  isSaving = false
}) {
  const currentDeptId = value.departmentId || 'cse';
  const currentSemId = value.semesterId || 'fall-2026';
  const currentCourseId = value.courseId || 'cs401';
  const currentExamType = value.examType || 'midterm';

  const handleDepartmentChange = (deptId) => {
    const matchedDept = DEPARTMENTS.find((d) => d.id === deptId);
    const updated = {
      ...value,
      departmentId: deptId,
      departmentName: matchedDept ? matchedDept.name : deptId
    };
    if (onChange) onChange(updated);
  };

  const handleSemesterChange = (semId) => {
    const matchedSem = SEMESTERS.find((s) => s.id === semId);
    const updated = {
      ...value,
      semesterId: semId,
      semesterName: matchedSem ? matchedSem.name : semId
    };
    if (onChange) onChange(updated);
  };

  const handleCourseChange = (courseId) => {
    const matchedCourse = COURSES.find((c) => c.id === courseId);
    const updated = {
      ...value,
      courseId,
      courseName: matchedCourse ? matchedCourse.name : courseId
    };
    if (onChange) onChange(updated);
  };

  const handleExamTypeChange = (type) => {
    const updated = {
      ...value,
      examType: type
    };
    if (onChange) onChange(updated);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-brand-50 text-brand border border-brand/20">
              <Building2 className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold text-slate-900">Academic Hierarchy & Default Scope</h3>
          </div>
          <p className="text-xs text-slate-500">
            Define your active department, enrolled semester, and target course. This pre-filters your RAG AI tutor, dashboard metrics, and study planner defaults on login.
          </p>
        </div>

        {onSave && (
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-hover shadow-sm transition-all disabled:opacity-50 cursor-pointer self-start sm:self-auto"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Saving Scope...' : 'Save Scope'}</span>
          </button>
        )}
      </div>

      {/* University Row (Fixed Institutional Anchor) */}
      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <School className="w-5 h-5 text-brand" />
          <div>
            <div className="text-xs font-bold text-slate-900">
              International Islamic University Chittagong (IIUC)
            </div>
            <div className="text-[10px] text-slate-500">Institutional Domain: verified .edu / iiuc.ac.bd</div>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
          Campus Anchor
        </span>
      </div>

      {/* Dropdown Selectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Department Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
            <Building2 className="w-3.5 h-3.5 text-brand" />
            <span>Academic Department</span>
          </label>
          <select
            value={currentDeptId}
            onChange={(e) => handleDepartmentChange(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand shadow-2xs"
          >
            {DEPARTMENTS.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name} ({dept.code})
              </option>
            ))}
          </select>
        </div>

        {/* Current Semester Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
            <Calendar className="w-3.5 h-3.5 text-brand" />
            <span>Current Semester</span>
          </label>
          <select
            value={currentSemId}
            onChange={(e) => handleSemesterChange(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand shadow-2xs"
          >
            {SEMESTERS.map((sem) => (
              <option key={sem.id} value={sem.id}>
                {sem.name} ({sem.code})
              </option>
            ))}
          </select>
        </div>

        {/* Primary Enrolled Course Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
            <BookOpen className="w-3.5 h-3.5 text-brand" />
            <span>Primary Focus Course</span>
          </label>
          <select
            value={currentCourseId}
            onChange={(e) => handleCourseChange(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand shadow-2xs"
          >
            {COURSES.map((course) => (
              <option key={course.id} value={course.id}>
                {course.code}: {course.name}
              </option>
            ))}
          </select>
        </div>

        {/* Default Exam Target */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
            <Award className="w-3.5 h-3.5 text-brand" />
            <span>Target Exam Preparation Scope</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleExamTypeChange('midterm')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                currentExamType === 'midterm'
                  ? 'bg-brand text-white border-brand shadow-xs'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-white'
              }`}
            >
              Midterm Exam Focus
            </button>
            <button
              type="button"
              onClick={() => handleExamTypeChange('final')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                currentExamType === 'final'
                  ? 'bg-brand text-white border-brand shadow-xs'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-white'
              }`}
            >
              Final Exam Focus
            </button>
          </div>
        </div>

      </div>

      {/* Scope Preview Footnote */}
      <div className="p-3 bg-brand-50/50 rounded-2xl border border-brand/15 flex items-center space-x-2 text-xs text-brand">
        <CheckCircle2 className="w-4 h-4 shrink-0 text-brand" />
        <span>
          <strong>Scope Active:</strong> Next time you open AI Tutor or Exam Prep, questions will automatically anchor to <strong>{value.courseName || 'CS401'} ({currentExamType.toUpperCase()})</strong>.
        </span>
      </div>

    </div>
  );
}
