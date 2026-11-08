'use client';

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

/**
 * Modern, accessible pagination component
 *
 * Props:
 * - currentPage: number (1-based)
 * - totalItems: number (total count across all pages, e.g. 100)
 * - pageSize: number (items per page, default 10 or 20)
 * - onPageChange: (page: number) => void
 * - onPageSizeChange?: (size: number) => void
 * - pageSizeOptions?: number[] (e.g. [10, 20, 50])
 * - itemName?: string (e.g. 'items', 'questions', 'resources')
 */
export default function Pagination({
  currentPage = 1,
  totalItems = 0,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50],
  itemName = 'items'
}) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);

  const startItem = totalItems === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const endItem = Math.min(safePage * pageSize, totalItems);

  // Generate page numbers with ellipsis windowing
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (safePage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (safePage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', safePage - 1, safePage, safePage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const handlePrevious = () => {
    if (safePage > 1 && onPageChange) {
      onPageChange(safePage - 1);
    }
  };

  const handleNext = () => {
    if (safePage < totalPages && onPageChange) {
      onPageChange(safePage + 1);
    }
  };

  const handlePageClick = (page) => {
    if (typeof page === 'number' && page !== safePage && onPageChange) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2 sm:px-4 border-t border-slate-200/80 bg-white/50 backdrop-blur-xs rounded-b-2xl">
      {/* Left: Summary text */}
      <div className="text-xs text-slate-500 font-medium order-2 sm:order-1 text-center sm:text-left">
        Showing <span className="font-bold text-slate-800">{startItem}</span> to{' '}
        <span className="font-bold text-slate-800">{endItem}</span> of{' '}
        <span className="font-bold text-slate-900">{totalItems}</span> {itemName}
      </div>

      {/* Center/Right: Navigation Controls */}
      <div className="flex items-center space-x-2 order-1 sm:order-2 flex-wrap justify-center">
        {/* Page size selector */}
        {onPageSizeChange && (
          <div className="flex items-center space-x-1.5 mr-2 text-xs text-slate-500">
            <span className="hidden md:inline">Show:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              aria-label="Items per page"
              className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:border-brand focus:outline-none focus:ring-1 focus:ring-brand cursor-pointer"
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt} / page
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={safePage <= 1}
          id="pagination-prev-btn"
          aria-label="Previous Page"
          className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 hover:text-brand disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-700 transition-all cursor-pointer shadow-2xs"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">Previous</span>
        </button>

        {/* Page numbers */}
        <div className="flex items-center space-x-1">
          {getPageNumbers().map((p, idx) => {
            if (p === '...') {
              return (
                <span key={`ellipsis-${idx}`} className="px-2 py-1 text-xs text-slate-400 select-none">
                  •••
                </span>
              );
            }
            const isActive = p === safePage;
            return (
              <button
                key={p}
                onClick={() => handlePageClick(p)}
                aria-label={`Page ${p}`}
                aria-current={isActive ? 'page' : undefined}
                className={`min-w-8 h-8 px-2 flex items-center justify-center rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-brand text-white shadow-xs scale-105'
                    : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={safePage >= totalPages}
          id="pagination-next-btn"
          aria-label="Next Page"
          className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 hover:text-brand disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-700 transition-all cursor-pointer shadow-2xs"
        >
          <span className="hidden xs:inline">Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
