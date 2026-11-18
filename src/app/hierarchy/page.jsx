'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import Breadcrumb from '../../components/common/Breadcrumb';
import HierarchyTreeView from '../../components/hierarchy/HierarchyTreeView';
import NodeModal from '../../components/hierarchy/NodeModal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { academicHierarchy } from '../../data/academicData';
import { useAuthStore } from '../../store/useAuthStore';
import {
  Building2,
  Calendar,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Plus,
  GitBranch,
  LayoutGrid,
  CheckCircle2,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function HierarchyPage() {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin';

  // Hierarchy Data State
  const [university, setUniversity] = useState(academicHierarchy.university);
  const [departments, setDepartments] = useState(academicHierarchy.departments || []);
  const [semesters, setSemesters] = useState(academicHierarchy.semesters || []);
  const [courses, setCourses] = useState(academicHierarchy.courses || []);
  const [isLoading, setIsLoading] = useState(false);

  // View Mode: 'tree' (Management View) vs 'cards' (Catalog View)
  const [viewMode, setViewMode] = useState('tree');

  // Modal State for Adding/Editing Nodes
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    mode: 'add-department',
    initialData: null,
    parentData: null
  });
  const [isSaving, setIsSaving] = useState(false);

  // ConfirmDialog State for Node Deletion
  const [deletingNode, setDeletingNode] = useState(null); // { entityType, node }
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch Hierarchy Tree from Backend on Mount with graceful fallback
  const fetchHierarchyTree = async () => {
    setIsLoading(true);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      const res = await fetch(`${backendUrl}/api/v1/hierarchy/tree`, {
        cache: 'no-store'
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setUniversity(json.data.university);
          setDepartments(json.data.departments || []);
          // Extract flattened semesters
          const allSemesters = (json.data.departments || []).flatMap((d) => d.semesters || []);
          if (allSemesters.length > 0) {
            setSemesters(allSemesters);
          }
        }
      }
    } catch (err) {
      // Graceful fallback to static data
      console.log('Using local mock hierarchy data:', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHierarchyTree();
  }, []);

  // ---------------------------------------------------------------------------
  // CRUD HANDLERS
  // ---------------------------------------------------------------------------

  const handleOpenAddDepartment = () => {
    setModalConfig({
      isOpen: true,
      mode: 'add-department',
      initialData: null,
      parentData: university
    });
  };

  const handleOpenAddSemester = (department) => {
    setModalConfig({
      isOpen: true,
      mode: 'add-semester',
      initialData: null,
      parentData: department
    });
  };

  const handleOpenEditNode = (entityType, node) => {
    setModalConfig({
      isOpen: true,
      mode: `edit-${entityType}`,
      initialData: node,
      parentData: null
    });
  };

  const handleSaveNode = async (formData) => {
    setIsSaving(true);
    const { mode, initialData } = modalConfig;
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

        // Try backend POST
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
        toast.success(`Department ${newDept.shortName} created successfully.`);
      } else if (mode === 'add-semester') {
        const parentDept = modalConfig.parentData;
        const payload = {
          departmentId: parentDept.id || parentDept._id,
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
          id: `${parentDept.id}-${formData.code.toLowerCase()}`,
          departmentId: parentDept.id,
          name: formData.name,
          code: formData.code,
          termNumber: formData.termNumber,
          academicYear: formData.academicYear
        };

        setDepartments((prev) =>
          prev.map((d) =>
            d.id === parentDept.id
              ? { ...d, semesters: [...(d.semesters || []), newSem] }
              : d
          )
        );
        setSemesters((prev) => [...prev, newSem]);
        toast.success(`Semester ${newSem.code} added to ${parentDept.shortName || parentDept.name}.`);
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

      setModalConfig({ isOpen: false, mode: 'add-department', initialData: null, parentData: null });
    } catch (err) {
      toast.error(err.message || 'Action failed.');
    } finally {
      setIsSaving(false);
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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-brand selection:text-white">
      <Navbar />

      <div className="bg-white border-b border-slate-200/80 px-4 sm:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Breadcrumb
            university={{
              name: university.code || 'IIUC',
              fullName: university.name,
              href: '/hierarchy'
            }}
            items={[
              { id: 'univ', label: university.name, isCurrent: true, icon: Building2 }
            ]}
          />

          <button
            type="button"
            onClick={fetchHierarchyTree}
            className="text-xs text-slate-500 hover:text-brand flex items-center space-x-1 cursor-pointer font-medium"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-brand' : ''}`} />
            <span>Sync Tree</span>
          </button>
        </div>
      </div>

      {/* Modern Page Header with Admin Actions */}
      <div className="bg-white border-b border-slate-200/80 py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 text-brand border border-brand/20">
                Institutional Structure (HIER-01)
              </span>
              {isAdmin && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Management Mode</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              Academic Hierarchy: University → Department → Semester → Course
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Central institutional knowledge graph. All course workspaces and vector RAG retrieval scopes are strictly anchored to this hierarchy.
            </p>
          </div>

          <div className="flex items-center space-x-2.5 shrink-0">
            {/* View Mode Toggle: Visual Tree vs Grid Cards */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80">
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

              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  viewMode === 'cards'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Catalog Cards</span>
              </button>
            </div>

            {isAdmin && (
              <button
                type="button"
                onClick={handleOpenAddDepartment}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-hover shadow-sm transition-all whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Department</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Hierarchy Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 pt-8 pb-16 space-y-8">
        
        {/* VIEW MODE 1: VISUAL TREE VIEW (ADMIN HIERARCHY MANAGER) */}
        {viewMode === 'tree' ? (
          <HierarchyTreeView
            university={university}
            departments={departments}
            courses={courses}
            isAdmin={isAdmin}
            onAddDepartment={handleOpenAddDepartment}
            onAddSemester={handleOpenAddSemester}
            onEditNode={handleOpenEditNode}
            onDeleteNode={handleDeleteTrigger}
          />
        ) : (
          /* VIEW MODE 2: CLASSIC CATALOG CARDS VIEW */
          <div className="space-y-8">
            {departments.map((dept) => {
              const deptSemesters = dept.semesters || semesters.filter((s) => s.departmentId === dept.id);
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
                        {dept.name} ({dept.code || dept.shortName})
                      </h2>
                      {dept.head && (
                        <p className="text-xs text-slate-500">Department Head: {dept.head}</p>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      {isAdmin && (
                        <button
                          type="button"
                          onClick={() => handleOpenAddSemester(dept)}
                          className="text-xs font-bold text-brand bg-brand-50 hover:bg-brand hover:text-white px-3 py-1.5 rounded-xl border border-brand/20 transition-all cursor-pointer whitespace-nowrap"
                        >
                          + Add Semester
                        </button>
                      )}
                      <Link
                        href={`/departments/${dept.id}`}
                        className="text-xs text-brand font-bold hover:underline inline-flex items-center space-x-1"
                      >
                        <span>View Department</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Semesters under this Department */}
                  <div className="space-y-6">
                    {deptSemesters.length === 0 ? (
                      <div className="p-5 rounded-2xl bg-slate-50 text-center text-xs text-slate-400">
                        No semesters registered under this department.
                      </div>
                    ) : (
                      deptSemesters.map((sem) => {
                        const semCourses = courses.filter((c) => c.semesterId === sem.id || sem.courseIds?.includes(c.id));
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
                                    {c.instructor} • {c.credits || 3} Credits
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* CRUD Modal for Node Creation/Editing */}
      <NodeModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig({ isOpen: false, mode: 'add-department', initialData: null, parentData: null })}
        mode={modalConfig.mode}
        initialData={modalConfig.initialData}
        parentData={modalConfig.parentData}
        onSave={handleSaveNode}
        isSaving={isSaving}
      />

      {/* Destructive Deletion Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deletingNode}
        onClose={() => setDeletingNode(null)}
        onConfirm={handleConfirmDelete}
        title={`Delete ${deletingNode?.entityType === 'department' ? 'Department' : 'Semester'}`}
        description={`Are you sure you want to delete ${deletingNode?.node?.name || deletingNode?.node?.code}? This will remove it from the institutional tree.`}
        resourceName={deletingNode?.node?.name || deletingNode?.node?.code}
        confirmText="Confirm Delete"
        cancelText="Cancel"
        isProcessing={isDeleting}
        variant="danger"
      />

      <Footer />
    </div>
  );
}
