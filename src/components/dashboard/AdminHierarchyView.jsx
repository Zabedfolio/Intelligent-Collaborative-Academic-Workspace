'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  Calendar,
  BookOpen,
  Plus,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Edit3,
  Trash2,
  Users,
  Layers,
  ArrowRight,
  GraduationCap,
  GitBranch,
  LayoutGrid
} from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '../common/Modal';
import NodeModal from '../hierarchy/NodeModal';
import HierarchyTreeView from '../hierarchy/HierarchyTreeView';
import ConfirmDialog from '../common/ConfirmDialog';
import { academicHierarchy } from '../../data/academicData';

export default function AdminHierarchyView({ user, onNavigate }) {
  const [university, setUniversity] = useState(academicHierarchy.university);
  const [departments, setDepartments] = useState(academicHierarchy.departments || []);
  const [semesters, setSemesters] = useState(academicHierarchy.semesters || []);
  const [courses, setCourses] = useState(academicHierarchy.courses || []);
  const [selectedDeptId, setSelectedDeptId] = useState(departments[0]?.id || 'cse');
  
  // View mode switcher: 'explorer' (Department details) vs 'tree' (Interactive visual tree)
  const [viewMode, setViewMode] = useState('explorer');

  // Modals state
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [nodeModalConfig, setNodeModalConfig] = useState({
    isOpen: false,
    mode: 'add-department',
    initialData: null,
    parentData: null
  });
  const [isSavingNode, setIsSavingNode] = useState(false);

  // Confirm delete dialog state
  const [deletingNode, setDeletingNode] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // New course form state
  const [courseForm, setCourseForm] = useState({
    id: '',
    name: '',
    code: '',
    instructor: '',
    departmentId: 'cse',
    semesterId: 'fall-2026'
  });

  // ---------------------------------------------------------------------------
  // NODE CRUD HANDLERS
  // ---------------------------------------------------------------------------

  const handleOpenAddDepartment = () => {
    setNodeModalConfig({
      isOpen: true,
      mode: 'add-department',
      initialData: null,
      parentData: university
    });
  };

  const handleOpenAddSemester = (department) => {
    setNodeModalConfig({
      isOpen: true,
      mode: 'add-semester',
      initialData: null,
      parentData: department
    });
  };

  const handleOpenEditNode = (entityType, node) => {
    setNodeModalConfig({
      isOpen: true,
      mode: `edit-${entityType}`,
      initialData: node,
      parentData: null
    });
  };

  const handleSaveNode = async (formData) => {
    setIsSavingNode(true);
    const { mode, initialData, parentData } = nodeModalConfig;
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

    try {
      if (mode === 'add-department') {
        const payload = {
          universityId: university.id || university._id || '672d5b62e4b0111111111111',
          name: formData.name,
          code: formData.code,
          head: formData.head,
          description: formData.description
        };

        try {
          await fetch(`${backendUrl}/api/v1/hierarchy/departments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(payload)
          });
        } catch (_) {}

        const newDept = {
          id: formData.code.toLowerCase(),
          name: formData.name,
          shortName: formData.code,
          code: formData.code,
          head: formData.head || 'To be appointed',
          description: formData.description,
          semesters: []
        };
        setDepartments((prev) => [...prev, newDept]);
        setSelectedDeptId(newDept.id);
        toast.success(`Academic Department ${newDept.shortName} created successfully.`);
      } else if (mode === 'add-semester') {
        const targetDept = parentData || departments.find((d) => d.id === selectedDeptId);
        const payload = {
          departmentId: targetDept.id || targetDept._id,
          name: formData.name,
          code: formData.code,
          termNumber: formData.termNumber,
          academicYear: formData.academicYear
        };

        try {
          await fetch(`${backendUrl}/api/v1/hierarchy/semesters`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(payload)
          });
        } catch (_) {}

        const newSem = {
          id: `${targetDept.id}-${formData.code.toLowerCase()}`,
          departmentId: targetDept.id,
          name: formData.name,
          code: formData.code,
          termNumber: formData.termNumber,
          academicYear: formData.academicYear
        };

        setDepartments((prev) =>
          prev.map((d) =>
            d.id === targetDept.id
              ? { ...d, semesters: [...(d.semesters || []), newSem] }
              : d
          )
        );
        setSemesters((prev) => [...prev, newSem]);
        toast.success(`Semester ${newSem.code} added to ${targetDept.shortName || targetDept.name}.`);
      } else if (mode.startsWith('edit')) {
        const entityType = mode.replace('edit-', '');
        try {
          await fetch(`${backendUrl}/api/v1/hierarchy/${entityType}/${initialData.id || initialData._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(formData)
          });
        } catch (_) {}

        if (entityType === 'department') {
          setDepartments((prev) =>
            prev.map((d) =>
              d.id === initialData.id
                ? { ...d, ...formData, shortName: formData.code || d.shortName }
                : d
            )
          );
        } else if (entityType === 'semester') {
          setDepartments((prev) =>
            prev.map((d) => ({
              ...d,
              semesters: (d.semesters || []).map((s) =>
                s.id === initialData.id ? { ...s, ...formData } : s
              )
            }))
          );
          setSemesters((prev) =>
            prev.map((s) => (s.id === initialData.id ? { ...s, ...formData } : s))
          );
        } else if (entityType === 'university') {
          setUniversity((prev) => ({ ...prev, ...formData }));
        }

        toast.success(`${entityType.toUpperCase()} updated successfully.`);
      }

      setNodeModalConfig({ isOpen: false, mode: 'add-department', initialData: null, parentData: null });
    } catch (err) {
      toast.error('Failed to save hierarchy node.');
    } finally {
      setIsSavingNode(false);
    }
  };

  const handleDeleteTrigger = (entityType, node) => {
    // Relational check: Department with existing semesters cannot be deleted directly
    if (entityType === 'department' && (node.semesters?.length > 0 || semesters.some((s) => s.departmentId === node.id))) {
      toast.error(
        `Cannot delete Department: Active semesters are linked to ${node.shortName || node.name}. Remove child semesters first.`,
        { duration: 4000 }
      );
      return;
    }

    setDeletingNode({ entityType, node });
  };

  const handleConfirmDelete = async () => {
    if (!deletingNode) return;
    const { entityType, node } = deletingNode;
    setIsDeleting(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      try {
        await fetch(`${backendUrl}/api/v1/hierarchy/${entityType}/${node.id || node._id}`, {
          method: 'DELETE',
          credentials: 'include'
        });
      } catch (_) {}

      if (entityType === 'department') {
        setDepartments((prev) => prev.filter((d) => d.id !== node.id));
        if (selectedDeptId === node.id) {
          setSelectedDeptId(departments.find((d) => d.id !== node.id)?.id || '');
        }
      } else if (entityType === 'semester') {
        setDepartments((prev) =>
          prev.map((d) => ({
            ...d,
            semesters: (d.semesters || []).filter((s) => s.id !== node.id)
          }))
        );
        setSemesters((prev) => prev.filter((s) => s.id !== node.id));
      }

      toast.success(`${node.name || node.code} deleted successfully.`);
      setDeletingNode(null);
    } catch (err) {
      toast.error('Failed to delete node.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCreateCourse = (e) => {
    e.preventDefault();
    if (!courseForm.name || !courseForm.code) {
      toast.error('Course code and course title are required.');
      return;
    }
    const id = courseForm.code.toLowerCase().replace(/\s+/g, '');
    const newCourse = {
      id,
      code: courseForm.code.toUpperCase(),
      name: courseForm.name,
      instructor: courseForm.instructor || 'Faculty Member',
      departmentId: courseForm.departmentId,
      semesterId: courseForm.semesterId,
      credits: 3
    };
    setCourses((prev) => [...prev, newCourse]);
    setIsAddCourseModalOpen(false);
    setCourseForm({
      id: '',
      name: '',
      code: '',
      instructor: '',
      departmentId: 'cse',
      semesterId: 'fall-2026'
    });
    toast.success(`Course ${newCourse.code} (${newCourse.name}) added to academic catalog.`);
  };

  const activeDept = departments.find((d) => d.id === selectedDeptId) || departments[0];
  const deptSemesters = semesters.filter((s) => s.departmentId === activeDept?.id);

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-brand-50 text-brand border border-brand/20">
              <Building2 className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">Academic Hierarchy Management (HIER-01)</h2>
          </div>
          <p className="text-xs text-slate-500">
            Configure institutional structure: University → Departments → Terms & Semesters → Course Workspaces.
          </p>
        </div>

        <div className="flex items-center space-x-2.5 shrink-0">
          {/* View mode toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80">
            <button
              type="button"
              onClick={() => setViewMode('explorer')}
              className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                viewMode === 'explorer'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Explorer</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('tree')}
              className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                viewMode === 'tree'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>Tree View</span>
            </button>
          </div>

          <Link
            href="/hierarchy"
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-2xs whitespace-nowrap shrink-0"
          >
            <span>Public Hierarchy</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={handleOpenAddDepartment}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-hover shadow-sm transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Department</span>
          </button>
        </div>
      </div>

      {/* Structural Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Departments</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900">{departments.length}</span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Active
            </span>
          </div>
          <p className="text-[11px] text-slate-500">Autonomous faculties</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Semesters</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900">{semesters.length}</span>
            <span className="text-xs font-bold text-slate-500">Structured</span>
          </div>
          <p className="text-[11px] text-slate-500">Across all active terms</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Grounded Courses</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-brand">{courses.length}</span>
            <span className="text-xs font-bold text-emerald-600">RAG Enabled</span>
          </div>
          <p className="text-[11px] text-slate-500">Curriculum verified</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Institution</span>
          <div className="flex items-baseline justify-between">
            <span className="text-base font-black text-slate-900 truncate" title={university.name}>
              {university.code || university.shortName}
            </span>
            <span className="text-xs font-bold text-brand bg-brand-50 px-2 py-0.5 rounded-full">
              Primary Node
            </span>
          </div>
          <p className="text-[11px] text-slate-500">Root of organizational graph</p>
        </div>
      </div>

      {/* VIEW MODE 1: INTERACTIVE VISUAL TREE VIEW */}
      {viewMode === 'tree' ? (
        <HierarchyTreeView
          university={university}
          departments={departments}
          courses={courses}
          isAdmin={true}
          onAddDepartment={handleOpenAddDepartment}
          onAddSemester={handleOpenAddSemester}
          onEditNode={handleOpenEditNode}
          onDeleteNode={handleDeleteTrigger}
        />
      ) : (
        /* VIEW MODE 2: EXPLORER SPLIT VIEW */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Department List Selector */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between pb-1">
              <h3 className="font-bold text-sm text-slate-900 flex items-center space-x-1.5">
                <Building2 className="w-4 h-4 text-brand" />
                <span>Academic Departments</span>
              </h3>
              <span className="text-xs text-slate-400 font-semibold">{departments.length} Faculties</span>
            </div>

            <div className="space-y-2">
              {departments.map((dept) => {
                const isSelected = dept.id === selectedDeptId;
                const deptCoursesCount = courses.filter((c) => c.departmentId === dept.id).length;
                return (
                  <button
                    key={dept.id}
                    onClick={() => setSelectedDeptId(dept.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-brand text-white border-brand shadow-sm'
                        : 'bg-white text-slate-800 border-slate-200/90 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {dept.code || dept.shortName}
                      </span>
                      <span className={`text-[11px] ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                        {deptCoursesCount} Courses
                      </span>
                    </div>
                    <h4 className="font-bold text-sm mt-2">{dept.name}</h4>
                    <p className={`text-xs mt-1 truncate ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>
                      Head: {dept.head}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Selected Department Details, Semesters & Courses */}
          <div className="lg:col-span-8 space-y-6">
            {activeDept && (
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div className="min-w-0 pr-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand bg-brand-50 px-2 py-0.5 rounded-md border border-brand/20">
                      Active Faculty Overview
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">
                      {activeDept.name} ({activeDept.code || activeDept.shortName})
                    </h3>
                    <p className="text-xs text-slate-500">Department Head: {activeDept.head}</p>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleOpenAddSemester(activeDept)}
                      className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-brand-50 hover:bg-brand text-brand hover:text-white border border-brand/20 text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Semester</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setCourseForm((prev) => ({ ...prev, departmentId: activeDept.id }));
                        setIsAddCourseModalOpen(true);
                      }}
                      className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-hover transition-all cursor-pointer shadow-2xs whitespace-nowrap shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Course</span>
                    </button>
                    <Link
                      href={`/departments/${activeDept.id}`}
                      className="inline-flex items-center space-x-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all whitespace-nowrap shrink-0"
                    >
                      <span>View Public</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </Link>
                  </div>
                </div>

                {/* Semesters & Courses */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Semesters & Grounded Course Workspaces
                    </h4>
                    <span className="text-xs font-medium text-slate-400">
                      {deptSemesters.length} Terms Registered
                    </span>
                  </div>

                  {deptSemesters.length === 0 ? (
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
                      No active semesters registered for this department. Click &quot;Add Semester&quot; to configure terms.
                    </div>
                  ) : (
                    deptSemesters.map((sem) => {
                      const semCourses = courses.filter(
                        (c) => c.semesterId === sem.id || sem.courseIds?.includes(c.id)
                      );
                      return (
                        <div
                          key={sem.id}
                          className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-brand" />
                              <h5 className="font-bold text-xs text-slate-900">{sem.name}</h5>
                              <span className="text-[10px] font-semibold text-slate-400">
                                ({sem.code}) • {sem.academicYear || '2026–2027'}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-[11px] font-medium text-slate-500">
                                {semCourses.length} Courses
                              </span>
                              <button
                                type="button"
                                onClick={() => handleOpenEditNode('semester', sem)}
                                className="text-[11px] text-slate-400 hover:text-slate-700 font-bold px-1"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteTrigger('semester', sem)}
                                className="text-[11px] text-slate-400 hover:text-rose-600 font-bold px-1"
                              >
                                Delete
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {semCourses.map((c) => (
                              <div
                                key={c.id}
                                className="p-3 rounded-xl bg-white border border-slate-200/90 flex items-center justify-between"
                              >
                                <div>
                                  <div className="flex items-center space-x-1.5">
                                    <span className="font-mono font-bold text-xs text-brand">
                                      {c.code}
                                    </span>
                                    <span className="text-slate-400">•</span>
                                    <span className="font-semibold text-xs text-slate-800 truncate max-w-[150px]">
                                      {c.name}
                                    </span>
                                  </div>
                                  <div className="text-[10px] text-slate-400 mt-0.5">
                                    Instructor: {c.instructor || 'Prof. Anderson'}
                                  </div>
                                </div>
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                                  Grounded
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add / Edit Node Modal */}
      <NodeModal
        isOpen={nodeModalConfig.isOpen}
        onClose={() => setNodeModalConfig({ isOpen: false, mode: 'add-department', initialData: null, parentData: null })}
        mode={nodeModalConfig.mode}
        initialData={nodeModalConfig.initialData}
        parentData={nodeModalConfig.parentData}
        onSave={handleSaveNode}
        isSaving={isSavingNode}
      />

      {/* Add Course Modal */}
      <Modal
        isOpen={isAddCourseModalOpen}
        onClose={() => setIsAddCourseModalOpen(false)}
        title="Add Grounded Course"
        subtitle={`Add course under ${activeDept?.shortName || activeDept?.code}`}
        maxWidth="max-w-md"
      >
        <form onSubmit={handleCreateCourse} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Course Code</label>
              <input
                type="text"
                required
                value={courseForm.code}
                onChange={(e) => setCourseForm({ ...courseForm, code: e.target.value })}
                placeholder="e.g. CS405"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand uppercase"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Semester Term</label>
              <select
                value={courseForm.semesterId}
                onChange={(e) => setCourseForm({ ...courseForm, semesterId: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
              >
                {semesters.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Course Title</label>
            <input
              type="text"
              required
              value={courseForm.name}
              onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
              placeholder="e.g. Distributed Cloud Computing"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Instructor Name</label>
            <input
              type="text"
              value={courseForm.instructor}
              onChange={(e) => setCourseForm({ ...courseForm, instructor: e.target.value })}
              placeholder="e.g. Dr. Robert Vance"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
            />
          </div>

          <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsAddCourseModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold whitespace-nowrap shrink-0 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-brand text-white font-bold hover:bg-brand-hover shadow-xs whitespace-nowrap shrink-0 cursor-pointer"
            >
              Save Course
            </button>
          </div>
        </form>
      </Modal>

      {/* Deletion Confirm Dialog */}
      <ConfirmDialog
        isOpen={!!deletingNode}
        onClose={() => setDeletingNode(null)}
        onConfirm={handleConfirmDelete}
        title={`Delete ${deletingNode?.entityType === 'department' ? 'Department' : 'Semester'}`}
        description={`Are you sure you want to delete ${deletingNode?.node?.name || deletingNode?.node?.code}? This action cannot be undone.`}
        resourceName={deletingNode?.node?.name || deletingNode?.node?.code}
        confirmText="Confirm Delete"
        cancelText="Cancel"
        isProcessing={isDeleting}
        variant="danger"
      />
    </div>
  );
}
