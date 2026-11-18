'use client';

import { useState } from 'react';
import { Users, UserPlus, Search, Mail, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '../common/Modal';

export default function StudentEnrollmentTable({
  course,
  enrolledStudents = [],
  onEnrollStudents,
  onUnenrollStudent,
  isProcessing = false,
  canManage = true
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [batchEmailsInput, setBatchEmailsInput] = useState('');
  const [enrollError, setEnrollError] = useState('');

  // Default sample roster if none provided from backend
  const displayStudents = enrolledStudents.length > 0
    ? enrolledStudents
    : [
        { id: 'usr-s1', name: 'Alex Johnson', email: 'alex.j@iiuc.ac.bd', role: 'student', enrolledAt: 'Sep 01, 2026' },
        { id: 'usr-s2', name: 'Fatima Al-Mansoor', email: 'fatima.m@iiuc.ac.bd', role: 'student', enrolledAt: 'Sep 02, 2026' },
        { id: 'usr-s3', name: 'Zayed Chowdhury', email: 'zayed.c@iiuc.ac.bd', role: 'student', enrolledAt: 'Sep 04, 2026' }
      ];

  const filteredStudents = displayStudents.filter(
    (s) =>
      s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBatchEnroll = async (e) => {
    e.preventDefault();
    if (!batchEmailsInput.trim()) {
      setEnrollError('Please enter at least one institutional student email.');
      return;
    }

    // Split by commas, newlines, or whitespace
    const emails = batchEmailsInput
      .split(/[\n,;\s]+/)
      .map((e) => e.trim().toLowerCase())
      .filter((e) => e.includes('@'));

    if (emails.length === 0) {
      setEnrollError('No valid email addresses found.');
      return;
    }

    try {
      await onEnrollStudents(emails);
      setBatchEmailsInput('');
      setEnrollError('');
      setIsEnrollModalOpen(false);
    } catch (err) {
      setEnrollError(err.message || 'Enrollment failed.');
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                Course Roster
              </span>
              <span className="text-xs font-mono font-bold text-slate-500">
                {displayStudents.length} Students Active
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              Enrolled Student Directory
            </h3>
          </div>
        </div>

        {canManage && (
          <button
            type="button"
            onClick={() => setIsEnrollModalOpen(true)}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-brand text-white font-bold text-xs hover:bg-brand-hover shadow-xs transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Enroll Students</span>
          </button>
        )}
      </div>

      {/* Search & Filter */}
      <div className="flex items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search enrolled students..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand shadow-2xs"
          />
        </div>

        <span className="text-xs text-slate-400 font-medium">
          Showing {filteredStudents.length} of {displayStudents.length} students
        </span>
      </div>

      {/* Roster Table */}
      <div className="overflow-x-auto border border-slate-200/80 rounded-2xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <th className="py-3 px-4">Student</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Status</th>
              {canManage && <th className="py-3 px-4 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan={canManage ? 4 : 3} className="py-8 text-center text-slate-400 font-sans">
                  No enrolled students match your search.
                </td>
              </tr>
            ) : (
              filteredStudents.map((s) => (
                <tr key={s.id || s._id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 font-bold text-slate-700 flex items-center justify-center text-xs shrink-0">
                        {s.name?.charAt(0) || 'S'}
                      </div>
                      <span className="font-bold text-slate-900">{s.name}</span>
                    </div>
                  </td>

                  <td className="py-3 px-4 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                    {s.email}
                  </td>

                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Enrolled</span>
                    </span>
                  </td>

                  {canManage && (
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onUnenrollStudent(s.id || s._id)}
                        disabled={isProcessing}
                        className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-rose-600 hover:bg-rose-50 border border-rose-200 text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 disabled:opacity-50"
                        title="Remove student from course roster"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Unenroll</span>
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Batch Enroll Modal */}
      <Modal
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        title="Batch Enroll Students"
        subtitle={`Add students to ${course?.code || course?.courseCode || 'course'}`}
        maxWidth="max-w-md"
      >
        <form onSubmit={handleBatchEnroll} className="space-y-4 text-xs font-sans">
          {enrollError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{enrollError}</span>
            </div>
          )}

          <div className="space-y-1">
            <label className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              Student Emails (Comma or Newline Separated)
            </label>
            <textarea
              rows={4}
              required
              value={batchEmailsInput}
              onChange={(e) => setBatchEmailsInput(e.target.value)}
              placeholder="alex.j@iiuc.ac.bd, fatima.m@iiuc.ac.bd, student3@iiuc.ac.bd"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand shadow-2xs resize-none"
            />
          </div>

          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px] leading-relaxed">
            Students enrolled will automatically see this course in their 4-step scope selector for AI Tutor and Exam Preparation.
          </div>

          <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsEnrollModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold whitespace-nowrap shrink-0 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="px-5 py-2 rounded-xl bg-brand text-white font-bold hover:bg-brand-hover shadow-xs whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? 'Enrolling...' : 'Confirm Enrollment'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

