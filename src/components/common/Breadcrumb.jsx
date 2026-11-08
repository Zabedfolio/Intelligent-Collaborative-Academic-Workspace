'use client';

import Link from 'next/link';
import { ChevronRight, Home, Building2, Calendar, BookOpen, GraduationCap } from 'lucide-react';

/**
 * Academic Hierarchy Breadcrumb Component
 * 
 * Supports: University → Department → Semester → Course path
 * Allows users to know where they are and click any segment (e.g. Semester) to jump back.
 */
export default function Breadcrumb({
  items,
  // Convenience academic level props if not passing items array
  university = { name: 'IIUC', fullName: 'International Islamic University', href: '/hierarchy' },
  department,
  semester,
  course,
  className = ''
}) {
  // Build hierarchy path items if not explicitly provided
  const pathItems = items || [
    university && {
      id: 'university',
      label: university.name || 'University',
      fullName: university.fullName,
      href: university.href || '/hierarchy',
      icon: Building2
    },
    department && {
      id: 'department',
      label: department.name,
      href: department.href,
      icon: GraduationCap
    },
    semester && {
      id: 'semester',
      label: semester.name,
      href: semester.href,
      icon: Calendar
    },
    course && {
      id: 'course',
      label: course.name,
      href: course.href,
      icon: BookOpen,
      isCurrent: true
    }
  ].filter(Boolean);

  return (
    <nav
      aria-label="Academic Hierarchy Breadcrumb"
      className={`flex items-center space-x-1.5 sm:space-x-2 text-xs text-slate-500 overflow-x-auto py-2 no-scrollbar ${className}`}
    >
      <ol className="flex items-center space-x-1 sm:space-x-1.5 flex-nowrap shrink-0">
        {pathItems.map((item, idx) => {
          const isLast = idx === pathItems.length - 1 || item.isCurrent;
          const Icon = item.icon;

          return (
            <li
              key={item.id || idx}
              id={`breadcrumb-item-${item.id || idx}`}
              className="flex items-center space-x-1 sm:space-x-1.5 shrink-0"
            >
              {idx > 0 && (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 select-none" />
              )}

              {isLast ? (
                <span
                  className="font-bold text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200/80 shadow-2xs flex items-center space-x-1.5"
                  aria-current="page"
                  title={item.fullName || item.label}
                >
                  {Icon && <Icon className="w-3.5 h-3.5 text-brand shrink-0" />}
                  <span className="truncate max-w-[200px] sm:max-w-xs">{item.label}</span>
                </span>
              ) : (
                <Link
                  href={item.href || '#'}
                  id={`breadcrumb-${item.id}`}
                  className="font-medium text-slate-600 hover:text-brand hover:bg-white hover:border-slate-200/80 px-2 py-1 rounded-lg border border-transparent transition-all flex items-center space-x-1.5 group cursor-pointer"
                  title={item.fullName || `Navigate back to ${item.label}`}
                >
                  {Icon && (
                    <Icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand transition-colors shrink-0" />
                  )}
                  <span className="group-hover:underline underline-offset-2 truncate max-w-[150px] sm:max-w-none">
                    {item.label}
                  </span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
