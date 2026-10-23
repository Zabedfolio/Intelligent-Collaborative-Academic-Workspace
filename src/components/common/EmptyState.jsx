'use client';

import { FolderOpen, UploadCloud, Plus } from 'lucide-react';

/**
 * Universal EmptyState Component for ICAW
 * Provides clear messaging and actionable CTAs when academic lists have no content.
 */
export default function EmptyState({
  icon: Icon = FolderOpen,
  title = 'No resources yet',
  description = 'There are no materials uploaded for this course yet. Add syllabi, lecture slides, or exam notes to get started.',
  actionLabel = 'Upload',
  onAction = null,
  actionIcon: ActionIcon = UploadCloud,
  secondaryActionLabel = null,
  onSecondaryAction = null,
  className = ''
}) {
  return (
    <div
      className={`bg-white rounded-3xl border border-dashed border-slate-300 p-8 sm:p-12 text-center max-w-lg mx-auto space-y-4 my-2 transition-all ${className}`}
    >
      {/* Icon illustration container */}
      <div className="w-16 h-16 rounded-3xl bg-brand/5 border border-brand/20 flex items-center justify-center text-brand mx-auto shadow-xs">
        <Icon className="w-8 h-8 text-brand" />
      </div>

      {/* Title & Description */}
      <div className="space-y-1.5 max-w-md mx-auto">
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          {description}
        </p>
      </div>

      {/* CTA Buttons */}
      {(actionLabel || secondaryActionLabel) && (
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          {actionLabel && onAction && (
            <button
              type="button"
              id="empty-state-upload-cta"
              onClick={onAction}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-brand text-white font-bold text-xs shadow-md shadow-brand/20 hover:bg-brand-hover hover:shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <ActionIcon className="w-4 h-4" />
              <span>{actionLabel}</span>
            </button>
          )}

          {secondaryActionLabel && onSecondaryAction && (
            <button
              type="button"
              onClick={onSecondaryAction}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-all cursor-pointer"
            >
              <span>{secondaryActionLabel}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
