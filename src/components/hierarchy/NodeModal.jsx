'use client';

import { useState, useEffect } from 'react';
import { Building2, Calendar, Edit3, Plus, X, Layers, AlertCircle } from 'lucide-react';
import Modal from '../common/Modal';

export default function NodeModal({
  isOpen,
  onClose,
  mode = 'add-department', // 'add-department' | 'edit-department' | 'add-semester' | 'edit-semester' | 'edit-university'
  initialData = null,
  parentData = null,
  onSave,
  isSaving = false
}) {
  const isDepartment = mode.includes('department');
  const isSemester = mode.includes('semester');
  const isUniversity = mode.includes('university');
  const isEdit = mode.startsWith('edit');

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    head: '',
    description: '',
    termNumber: 1,
    academicYear: '2026–2027',
    country: 'Bangladesh'
  });

  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        code: initialData.code || initialData.shortName || '',
        head: initialData.head || '',
        description: initialData.description || '',
        termNumber: initialData.termNumber || 1,
        academicYear: initialData.academicYear || '2026–2027',
        country: initialData.country || 'Bangladesh'
      });
    } else {
      setFormData({
        name: '',
        code: '',
        head: '',
        description: '',
        termNumber: 1,
        academicYear: '2026–2027',
        country: 'Bangladesh'
      });
    }
    setFormError('');
  }, [initialData, mode, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.code.trim()) {
      setFormError('Name and Code are required fields.');
      return;
    }

    const payload = {
      ...formData,
      code: formData.code.toUpperCase().trim()
    };

    if (isDepartment && parentData?.id) {
      payload.universityId = parentData.id;
    }

    if (isSemester && parentData?.id) {
      payload.departmentId = parentData.id;
    }

    onSave(payload);
  };

  const modalTitle = isEdit
    ? `Edit ${isDepartment ? 'Department' : isSemester ? 'Semester' : 'University'}`
    : `Add New ${isDepartment ? 'Academic Department' : 'Semester Term'}`;

  const modalSubtitle = isEdit
    ? `Update institutional attributes for ${initialData?.name || ''}`
    : parentData
    ? `Configuring under ${parentData.name} (${parentData.shortName || parentData.code})`
    : 'Expand institutional organizational hierarchy';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle}
      subtitle={modalSubtitle}
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
        {formError && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {/* Name Input */}
        <div className="space-y-1">
          <label className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
            {isDepartment ? 'Department Name' : isSemester ? 'Semester Title' : 'University Name'}
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder={
              isDepartment
                ? 'e.g. Department of Mechanical Engineering'
                : isSemester
                ? 'e.g. Fall 2026 Semester'
                : 'e.g. International Islamic University Chittagong'
            }
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand shadow-2xs"
          />
        </div>

        {/* Code Input */}
        <div className="space-y-1">
          <label className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
            {isDepartment ? 'Short Code (e.g. ME, CSE)' : isSemester ? 'Term Code (e.g. FA26)' : 'Short Acronym (e.g. IIUC)'}
          </label>
          <input
            type="text"
            required
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            placeholder={isDepartment ? 'e.g. ME' : isSemester ? 'e.g. FA26' : 'e.g. IIUC'}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono font-bold uppercase text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand shadow-2xs"
          />
        </div>

        {/* Department Specific Fields */}
        {isDepartment && (
          <>
            <div className="space-y-1">
              <label className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                Department Head (Dean / Chairperson)
              </label>
              <input
                type="text"
                value={formData.head}
                onChange={(e) => setFormData({ ...formData, head: e.target.value })}
                placeholder="e.g. Prof. Dr. John Doe"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand shadow-2xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                Description / Curriculum Focus
              </label>
              <textarea
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief summary of department curricula..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand shadow-2xs resize-none"
              />
            </div>
          </>
        )}

        {/* Semester Specific Fields */}
        {isSemester && (
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                Term Sequence (1–8)
              </label>
              <input
                type="number"
                min={1}
                max={12}
                value={formData.termNumber}
                onChange={(e) => setFormData({ ...formData, termNumber: parseInt(e.target.value) || 1 })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand shadow-2xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                Academic Year
              </label>
              <input
                type="text"
                value={formData.academicYear}
                onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                placeholder="e.g. 2026–2027"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand shadow-2xs"
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
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
            {isSaving ? 'Saving...' : isEdit ? 'Update Node' : 'Create Node'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

