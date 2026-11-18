'use client';

import { useState, useEffect } from 'react';
import { BookOpen, AlertCircle } from 'lucide-react';
import Modal from '../common/Modal';

export default function CourseFormModal({
  isOpen,
  onClose,
  initialData = null,
  departments = [],
  semesters = [],
  onSave,
  isSaving = false
}) {
  const isEdit = !!initialData?.id;

  const [formData, setFormData] = useState({
    courseCode: '',
    title: '',
    description: '',
    credits: 3,
    departmentId: '',
    semesterId: ''
  });

  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        courseCode: initialData.code || initialData.courseCode || '',
        title: initialData.name || initialData.title || '',
        description: initialData.description || '',
        credits: initialData.credits || 3,
        departmentId: initialData.departmentId || departments[0]?.id || '',
        semesterId: initialData.semesterId || semesters[0]?.id || ''
      });
    } else {
      setFormData({
        courseCode: '',
        title: '',
        description: '',
        credits: 3,
        departmentId: departments[0]?.id || '',
        semesterId: semesters[0]?.id || ''
      });
    }
    setFormError('');
  }, [initialData, departments, semesters, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.courseCode.trim() || !formData.title.trim()) {
      setFormError('Course code and course title are required.');
      return;
    }

    if (!formData.departmentId) {
      setFormError('Please select a parent department.');
      return;
    }

    if (!formData.semesterId) {
      setFormError('Please select a target semester term.');
      return;
    }

    onSave({
      ...formData,
      courseCode: formData.courseCode.toUpperCase().trim()
    });
  };

  const filteredSemesters = semesters.filter(
    (s) => !formData.departmentId || s.departmentId === formData.departmentId
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Course Section' : 'Create Grounded Course'}
      subtitle={
        isEdit
          ? `Updating metadata for ${initialData?.code || ''}`
          : 'Anchor course curriculum to institutional department and semester hierarchy'
      }
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
        {formError && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 space-y-1">
            <label className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              Course Code
            </label>
            <input
              type="text"
              required
              value={formData.courseCode}
              onChange={(e) => setFormData({ ...formData, courseCode: e.target.value })}
              placeholder="e.g. CS401 or CSE-311"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono font-bold uppercase text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand shadow-2xs"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              Credits
            </label>
            <input
              type="number"
              min={1}
              max={6}
              value={formData.credits}
              onChange={(e) => setFormData({ ...formData, credits: parseInt(e.target.value) || 3 })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand shadow-2xs"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
            Course Title
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Advanced Machine Learning & Neural Networks"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand shadow-2xs"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              Academic Department
            </label>
            <select
              value={formData.departmentId}
              onChange={(e) => {
                const nextDeptId = e.target.value;
                const nextSemesters = semesters.filter((s) => s.departmentId === nextDeptId);
                setFormData({
                  ...formData,
                  departmentId: nextDeptId,
                  semesterId: nextSemesters[0]?.id || ''
                });
              }}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand shadow-2xs"
            >
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.code || d.shortName} - {d.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              Semester Term
            </label>
            <select
              value={formData.semesterId}
              onChange={(e) => setFormData({ ...formData, semesterId: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand shadow-2xs"
            >
              {filteredSemesters.length === 0 ? (
                <option value="">No terms available</option>
              ) : (
                filteredSemesters.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.code})
                  </option>
                ))
              )}
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
            Syllabus & Course Description
          </label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Overview of core course units, learning outcomes, and topic schedule..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand shadow-2xs resize-none"
          />
        </div>

        <div className="p-3 rounded-xl bg-brand-50 border border-brand/20 text-brand text-[11px] leading-relaxed">
          Creating a course workspace establishes the root boundary for teacher-uploaded slide vectorization and RAG student tutoring.
        </div>

        <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="px-5 py-2 rounded-xl bg-brand text-white font-bold hover:bg-brand-hover shadow-xs whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : isEdit ? 'Update Course' : 'Create Course'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

