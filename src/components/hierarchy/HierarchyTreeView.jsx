'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  Calendar,
  ChevronDown,
  ChevronRight,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  BookOpen,
  Layers,
  GraduationCap,
  ShieldCheck,
  Search,
  CheckCircle2
} from 'lucide-react';

export default function HierarchyTreeView({
  university,
  departments = [],
  courses = [],
  isAdmin = false,
  onAddDepartment,
  onAddSemester,
  onEditNode,
  onDeleteNode
}) {
  const [expandedNodes, setExpandedNodes] = useState({
    university: true,
    // Expand all departments by default
    ...departments.reduce((acc, d) => ({ ...acc, [d.id]: true }), {})
  });

  const [searchFilter, setSearchFilter] = useState('');

  const toggleNode = (nodeId) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  const handleExpandAll = () => {
    const all = { university: true };
    departments.forEach((d) => {
      all[d.id] = true;
    });
    setExpandedNodes(all);
  };

  const handleCollapseAll = () => {
    setExpandedNodes({ university: true });
  };

  // Filter departments or semesters matching search
  const filteredDepartments = departments.filter((d) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    const matchesDept =
      d.name.toLowerCase().includes(q) ||
      d.code?.toLowerCase().includes(q) ||
      d.shortName?.toLowerCase().includes(q);
    const matchesSem = d.semesters?.some(
      (s) => s.name.toLowerCase().includes(q) || s.code?.toLowerCase().includes(q)
    );
    return matchesDept || matchesSem;
  });

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
      
      {/* Top Tree Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search hierarchy tree..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand shadow-2xs"
          />
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            type="button"
            onClick={handleExpandAll}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-2xs"
          >
            Expand All
          </button>
          <button
            type="button"
            onClick={handleCollapseAll}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-2xs"
          >
            Collapse All
          </button>
          {isAdmin && onAddDepartment && (
            <button
              type="button"
              onClick={onAddDepartment}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-hover shadow-xs transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Department</span>
            </button>
          )}
        </div>
      </div>

      {/* Visual Tree Canvas */}
      <div className="space-y-4">
        
        {/* ROOT NODE: University */}
        {university && (
          <div className="border border-brand/30 bg-brand-50/40 rounded-2xl p-4 sm:p-5 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div
                onClick={() => toggleNode('university')}
                className="flex items-center space-x-3 cursor-pointer select-none"
              >
                <div className="w-8 h-8 rounded-xl bg-brand text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand text-white">
                      University Node (Root)
                    </span>
                    <span className="text-[11px] font-mono font-bold text-slate-500">
                      {university.code || university.shortName}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">
                    {university.name}
                  </h3>
                </div>
              </div>

              <div className="flex items-center space-x-3 pl-11 sm:pl-0">
                <span className="text-xs font-bold text-slate-500 bg-white px-2.5 py-1 rounded-lg border border-slate-200/80">
                  {departments.length} Academic Departments
                </span>
                {isAdmin && onEditNode && (
                  <button
                    type="button"
                    onClick={() => onEditNode('university', university)}
                    className="p-1.5 text-slate-400 hover:text-brand hover:bg-white rounded-lg transition-colors cursor-pointer"
                    title="Edit University Node"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* DEPARTMENTS CONTAINER (LEVEL 1) */}
            {expandedNodes.university && (
              <div className="mt-4 pt-4 border-t border-brand/20 pl-2 sm:pl-6 space-y-4">
                {filteredDepartments.length === 0 ? (
                  <div className="py-6 text-center text-xs text-slate-400">
                    No departments match your filter.
                  </div>
                ) : (
                  filteredDepartments.map((dept) => {
                    const isDeptExpanded = expandedNodes[dept.id];
                    const deptSemesters = dept.semesters || [];

                    return (
                      <div
                        key={dept.id}
                        className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs transition-all hover:border-slate-300 space-y-3"
                      >
                        {/* Department Node Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div
                            onClick={() => toggleNode(dept.id)}
                            className="flex items-center space-x-3 cursor-pointer select-none"
                          >
                            <button
                              type="button"
                              className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
                            >
                              {isDeptExpanded ? (
                                <ChevronDown className="w-3.5 h-3.5" />
                              ) : (
                                <ChevronRight className="w-3.5 h-3.5" />
                              )}
                            </button>

                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-mono text-xs font-black text-brand bg-brand-50 px-2 py-0.5 rounded border border-brand/20">
                                  {dept.code || dept.shortName}
                                </span>
                                <span className="text-[11px] text-slate-400 font-medium">
                                  {deptSemesters.length} Semesters
                                </span>
                              </div>
                              <h4 className="font-bold text-sm text-slate-900 mt-0.5">
                                {dept.name}
                              </h4>
                              {dept.head && (
                                <p className="text-[11px] text-slate-500">
                                  Head: {dept.head}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Department Context Actions */}
                          <div className="flex items-center space-x-1.5 pl-9 sm:pl-0 shrink-0">
                            {isAdmin && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => onAddSemester(dept)}
                                  className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-brand-50 hover:bg-brand text-brand hover:text-white font-bold text-[11px] transition-all whitespace-nowrap shrink-0 cursor-pointer"
                                  title="Add semester under this department"
                                >
                                  <Plus className="w-3 h-3" />
                                  <span>Add Semester</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => onEditNode('department', dept)}
                                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                                  title="Edit Department"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => onDeleteNode('department', dept)}
                                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                  title="Delete Department"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </>
                            )}

                            <Link
                              href={`/departments/${dept.id}`}
                              className="p-1.5 text-slate-400 hover:text-brand hover:bg-slate-50 rounded-lg transition-colors"
                              title="View Public Department Page"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>

                        {/* SEMESTERS CONTAINER (LEVEL 2) */}
                        {isDeptExpanded && (
                          <div className="mt-3 pt-3 border-t border-slate-100 pl-4 sm:pl-9 space-y-2.5">
                            {deptSemesters.length === 0 ? (
                              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-400 text-center">
                                No active semesters configured under this department yet.
                              </div>
                            ) : (
                              deptSemesters.map((sem) => {
                                // Find courses under this semester if available
                                const semCourses = courses.filter(
                                  (c) => c.semesterId === sem.id || sem.courseIds?.includes(c.id)
                                );

                                return (
                                  <div
                                    key={sem.id}
                                    className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:bg-slate-50 transition-colors"
                                  >
                                    <div className="flex items-center space-x-2.5">
                                      <Calendar className="w-4 h-4 text-brand shrink-0" />
                                      <div>
                                        <div className="flex items-center space-x-2">
                                          <span className="font-bold text-xs text-slate-900">
                                            {sem.name}
                                          </span>
                                          <span className="font-mono text-[10px] font-bold text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                                            {sem.code}
                                          </span>
                                          {sem.academicYear && (
                                            <span className="text-[10px] text-slate-400">
                                              ({sem.academicYear})
                                            </span>
                                          )}
                                        </div>
                                        {semCourses.length > 0 && (
                                          <div className="flex items-center space-x-1.5 mt-1 overflow-x-auto">
                                            {semCourses.map((c) => (
                                              <span
                                                key={c.id}
                                                className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0"
                                              >
                                                {c.code}
                                              </span>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {/* Semester Actions */}
                                    <div className="flex items-center space-x-1 shrink-0 pl-6 sm:pl-0">
                                      <Link
                                        href={`/semesters/${sem.id}`}
                                        className="text-[11px] text-brand hover:underline font-bold px-2 py-1"
                                      >
                                        Open Term
                                      </Link>

                                      {isAdmin && (
                                        <>
                                          <button
                                            type="button"
                                            onClick={() => onEditNode('semester', sem)}
                                            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-white rounded transition-colors cursor-pointer"
                                            title="Edit Semester"
                                          >
                                            <Edit2 className="w-3 h-3" />
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => onDeleteNode('semester', sem)}
                                            className="p-1 text-slate-400 hover:text-rose-600 hover:bg-white rounded transition-colors cursor-pointer"
                                            title="Delete Semester"
                                          >
                                            <Trash2 className="w-3 h-3" />
                                          </button>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                );
                              })
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

