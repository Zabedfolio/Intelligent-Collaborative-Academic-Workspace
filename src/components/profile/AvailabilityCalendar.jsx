'use client';

import { useState, useMemo } from 'react';
import {
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Sun,
  Moon,
  Coffee,
  Save,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import toast from 'react-hot-toast';

const DAYS = [
  { index: 0, short: 'Sun', full: 'Sunday' },
  { index: 1, short: 'Mon', full: 'Monday' },
  { index: 2, short: 'Tue', full: 'Tuesday' },
  { index: 3, short: 'Wed', full: 'Wednesday' },
  { index: 4, short: 'Thu', full: 'Thursday' },
  { index: 5, short: 'Fri', full: 'Friday' },
  { index: 6, short: 'Sat', full: 'Saturday' }
];

// Hour display helper: 0 -> "12 AM", 9 -> "9 AM", 13 -> "1 PM"
const formatHour = (hour) => {
  if (hour === 0) return '12 AM';
  if (hour < 12) return `${hour} AM`;
  if (hour === 12) return '12 PM';
  return `${hour - 12} PM`;
};

export default function AvailabilityCalendar({
  value = [],
  onChange,
  onSave,
  isSaving = false
}) {
  const [showFull24Hours, setShowFull24Hours] = useState(false);

  // Normalize incoming matrix into an easy-lookup Map or array of Sets: day -> Set(slots)
  const slotsMap = useMemo(() => {
    const map = new Map();
    DAYS.forEach((d) => map.set(d.index, new Set()));

    if (Array.isArray(value)) {
      value.forEach((dayObj) => {
        if (dayObj && typeof dayObj.day === 'number' && Array.isArray(dayObj.slots)) {
          const set = map.get(dayObj.day) || new Set();
          dayObj.slots.forEach((s) => set.add(s));
          map.set(dayObj.day, set);
        }
      });
    }
    return map;
  }, [value]);

  // Display range: Default standard academic hours (7 AM - 11 PM: 16 hours) or Full 24 Hours
  const hoursToDisplay = useMemo(() => {
    if (showFull24Hours) {
      return Array.from({ length: 24 }, (_, i) => i);
    }
    // 7 AM to 11 PM (inclusive: 7..23)
    return Array.from({ length: 17 }, (_, i) => i + 7);
  }, [showFull24Hours]);

  // Total active hours count
  const totalHours = useMemo(() => {
    let count = 0;
    slotsMap.forEach((set) => {
      count += set.size;
    });
    return count;
  }, [slotsMap]);

  // Emit updated availability matrix back to parent
  const emitChange = (newMap) => {
    const result = [];
    newMap.forEach((set, day) => {
      if (set.size > 0) {
        result.push({
          day,
          slots: Array.from(set).sort((a, b) => a - b)
        });
      }
    });
    if (onChange) onChange(result);
  };

  // Toggle single slot
  const toggleSlot = (day, hour) => {
    const newMap = new Map();
    DAYS.forEach((d) => {
      newMap.set(d.index, new Set(slotsMap.get(d.index) || []));
    });

    const daySet = newMap.get(day);
    if (daySet.has(hour)) {
      daySet.delete(hour);
    } else {
      daySet.add(hour);
    }

    emitChange(newMap);
  };

  // Toggle an entire day
  const toggleEntireDay = (day) => {
    const newMap = new Map();
    DAYS.forEach((d) => {
      newMap.set(d.index, new Set(slotsMap.get(d.index) || []));
    });

    const daySet = newMap.get(day);
    const allDisplayedActive = hoursToDisplay.every((h) => daySet.has(h));

    if (allDisplayedActive) {
      hoursToDisplay.forEach((h) => daySet.delete(h));
    } else {
      hoursToDisplay.forEach((h) => daySet.add(h));
    }

    emitChange(newMap);
  };

  // Quick Preset Actions
  const applyPreset = (presetName) => {
    const newMap = new Map();
    DAYS.forEach((d) => newMap.set(d.index, new Set()));

    if (presetName === 'weekday-evenings') {
      // Mon-Fri: 6 PM - 9 PM (18, 19, 20)
      [1, 2, 3, 4, 5].forEach((d) => {
        newMap.set(d, new Set([18, 19, 20]));
      });
      toast.success('Applied "Weekday Evenings (6-9 PM)" preset');
    } else if (presetName === 'weekend-mornings') {
      // Sat-Sun: 9 AM - 12 PM (9, 10, 11)
      [0, 6].forEach((d) => {
        newMap.set(d, new Set([9, 10, 11]));
      });
      toast.success('Applied "Weekend Mornings (9 AM-12 PM)" preset');
    } else if (presetName === 'hybrid-balanced') {
      // Mon-Thu evenings (18-20) + Sat mornings (9-11)
      [1, 2, 3, 4].forEach((d) => newMap.set(d, new Set([18, 19, 20])));
      newMap.set(6, new Set([9, 10, 11]));
      toast.success('Applied "Hybrid Study Balanced" preset');
    } else if (presetName === 'clear') {
      toast('Availability cleared', { icon: '🧹' });
    }

    emitChange(newMap);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-sm">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-brand-50 text-brand border border-brand/20">
              <Calendar className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold text-slate-900">Weekly Availability Schedule</h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-brand text-white">
              {totalHours} hrs / week
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Click time blocks to toggle your open study group hours. The matching engine groups you with peers whose slots overlap.
          </p>
        </div>

        {/* View Mode Toggle & Save Button */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            type="button"
            onClick={() => setShowFull24Hours(!showFull24Hours)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-all cursor-pointer"
          >
            {showFull24Hours ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
                <span>Show Academic Hours (7 AM - 11 PM)</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                <span>Show Full 24 Hours</span>
              </>
            )}
          </button>

          {onSave && (
            <button
              type="button"
              onClick={onSave}
              disabled={isSaving}
              className="flex items-center space-x-1.5 px-4 py-1.5 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-hover shadow-sm transition-all disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Saving...' : 'Save Matrix'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Preset Chips */}
      <div className="flex items-center flex-wrap gap-2 text-xs">
        <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-brand" />
          Quick Presets:
        </span>
        <button
          type="button"
          onClick={() => applyPreset('hybrid-balanced')}
          className="px-2.5 py-1 rounded-xl bg-slate-50 hover:bg-brand-50 hover:text-brand border border-slate-200 text-slate-700 font-medium transition-all cursor-pointer"
        >
          Balanced (Evenings + Sat Morning)
        </button>
        <button
          type="button"
          onClick={() => applyPreset('weekday-evenings')}
          className="px-2.5 py-1 rounded-xl bg-slate-50 hover:bg-brand-50 hover:text-brand border border-slate-200 text-slate-700 font-medium transition-all cursor-pointer"
        >
          Weekday Evenings (6-9 PM)
        </button>
        <button
          type="button"
          onClick={() => applyPreset('weekend-mornings')}
          className="px-2.5 py-1 rounded-xl bg-slate-50 hover:bg-brand-50 hover:text-brand border border-slate-200 text-slate-700 font-medium transition-all cursor-pointer"
        >
          Weekend Mornings (9 AM-12 PM)
        </button>
        <button
          type="button"
          onClick={() => applyPreset('clear')}
          className="px-2.5 py-1 rounded-xl bg-slate-50 hover:bg-rose-50 hover:text-rose-600 border border-slate-200 text-slate-500 font-medium transition-all cursor-pointer"
        >
          Clear All
        </button>
      </div>

      {/* 7x24 Matrix Grid View */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[560px]">
          
          {/* Day Headers */}
          <div className="grid grid-cols-8 gap-1.5 text-center mb-2">
            <div className="text-[11px] font-bold text-slate-400 self-center">Time</div>
            {DAYS.map((day) => {
              const activeCount = slotsMap.get(day.index)?.size || 0;
              return (
                <button
                  type="button"
                  key={day.index}
                  onClick={() => toggleEntireDay(day.index)}
                  className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-all cursor-pointer group"
                  title={`Click to select/deselect all hours for ${day.full}`}
                >
                  <div className="text-xs font-bold text-slate-800 group-hover:text-brand">{day.short}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">{activeCount}h</div>
                </button>
              );
            })}
          </div>

          {/* Hourly Slots Rows */}
          <div className="space-y-1">
            {hoursToDisplay.map((hour) => (
              <div key={hour} className="grid grid-cols-8 gap-1.5 items-center">
                {/* Time Label */}
                <div className="text-[10px] font-mono font-medium text-slate-400 text-right pr-2 select-none">
                  {formatHour(hour)}
                </div>

                {/* Day Slot Cells */}
                {DAYS.map((day) => {
                  const isSelected = slotsMap.get(day.index)?.has(hour);
                  return (
                    <button
                      type="button"
                      key={`${day.index}-${hour}`}
                      onClick={() => toggleSlot(day.index, hour)}
                      className={`h-7 rounded-lg text-[10px] font-mono font-semibold transition-all flex items-center justify-center cursor-pointer select-none ${
                        isSelected
                          ? 'bg-brand text-white shadow-xs scale-[1.02] ring-1 ring-brand-hover'
                          : 'bg-slate-50 hover:bg-slate-100/90 text-slate-300 hover:text-slate-500 border border-slate-200/50'
                      }`}
                      title={`${day.full} at ${formatHour(hour)}: ${isSelected ? 'Available' : 'Unavailable'}`}
                    >
                      {isSelected ? <Check className="w-3 h-3 stroke-[3]" /> : '·'}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Legend & Summary Info */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5">
            <span className="w-3.5 h-3.5 rounded bg-brand inline-block" />
            <span className="font-semibold text-slate-700">Open for Study Groups</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3.5 h-3.5 rounded bg-slate-100 border border-slate-200 inline-block" />
            <span>Busy / In Class</span>
          </div>
        </div>

        <div className="text-slate-400 text-[11px]">
          Changes are serialized into 24-hour array vectors for matching cycles.
        </div>
      </div>

    </div>
  );
}

