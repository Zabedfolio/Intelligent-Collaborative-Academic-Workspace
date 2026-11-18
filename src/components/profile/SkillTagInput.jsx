'use client';

import { useState } from 'react';
import { Plus, X, Sparkles, Award, Sliders } from 'lucide-react';
import toast from 'react-hot-toast';

const DEFAULT_SUGGESTIONS = [
  'Python',
  'Machine Learning',
  'Data Structures',
  'Algorithms',
  'Linear Algebra',
  'PyTorch',
  'Computer Networks',
  'Database Systems',
  'Calculus III',
  'Software Engineering'
];

export default function SkillTagInput({
  skills = [],
  onChange,
  suggestions = DEFAULT_SUGGESTIONS
}) {
  const [inputVal, setInputVal] = useState('');
  const [confidenceVal, setConfidenceVal] = useState(80);
  const [showSliderForTag, setShowSliderForTag] = useState(null);

  // Normalize skills into [{ tag, confidence }]
  const normalizedSkills = (skills || []).map((s) => {
    if (typeof s === 'string') return { tag: s, confidence: 80 };
    return { tag: s.tag, confidence: s.confidence !== undefined ? s.confidence : 80 };
  });

  const handleAddSkill = (tagToAdd, confidence = confidenceVal) => {
    const trimmed = (tagToAdd || inputVal).trim();
    if (!trimmed) return;

    if (normalizedSkills.some((s) => s.tag.toLowerCase() === trimmed.toLowerCase())) {
      toast.error(`"${trimmed}" is already in your skills list.`);
      return;
    }

    const updated = [...normalizedSkills, { tag: trimmed, confidence }];
    if (onChange) onChange(updated);
    setInputVal('');
    toast.success(`Added skill: "${trimmed}"`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleRemoveSkill = (tagToRemove) => {
    const updated = normalizedSkills.filter(
      (s) => s.tag.toLowerCase() !== tagToRemove.toLowerCase()
    );
    if (onChange) onChange(updated);
  };

  const handleUpdateConfidence = (tag, newConfidence) => {
    const updated = normalizedSkills.map((s) =>
      s.tag === tag ? { ...s, confidence: Number(newConfidence) } : s
    );
    if (onChange) onChange(updated);
  };

  return (
    <div className="space-y-4">
      
      {/* Input Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a subject or skill (e.g. Dynamic Programming, SQL, NLP)..."
            className="w-full pl-3.5 pr-20 py-2.5 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand shadow-2xs transition-all"
          />
          <div className="absolute right-2 top-2 text-[10px] text-slate-400 font-mono hidden sm:block">
            Press Enter ↵
          </div>
        </div>

        {/* Confidence Setting for New Skill */}
        <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
          <span className="text-[11px] font-semibold text-slate-500 whitespace-nowrap">
            Self-Rating:
          </span>
          <input
            type="range"
            min="30"
            max="100"
            step="5"
            value={confidenceVal}
            onChange={(e) => setConfidenceVal(Number(e.target.value))}
            className="w-20 accent-brand cursor-pointer"
            title={`Initial proficiency: ${confidenceVal}%`}
          />
          <span className="text-xs font-mono font-bold text-brand min-w-[36px]">
            {confidenceVal}%
          </span>
        </div>

        <button
          type="button"
          onClick={() => handleAddSkill()}
          className="px-4 py-2.5 rounded-xl bg-brand text-white font-bold text-xs hover:bg-brand-hover transition-all flex items-center justify-center space-x-1 shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {/* Quick Suggestion Chips */}
      {suggestions && suggestions.length > 0 && (
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-brand" />
            Suggested Academic Domains:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {suggestions
              .filter(
                (sug) =>
                  !normalizedSkills.some((s) => s.tag.toLowerCase() === sug.toLowerCase())
              )
              .slice(0, 8)
              .map((sug) => (
                <button
                  key={sug}
                  type="button"
                  onClick={() => handleAddSkill(sug)}
                  className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100/80 hover:bg-brand-50 hover:text-brand border border-slate-200/60 text-slate-600 transition-all cursor-pointer"
                >
                  <Plus className="w-3 h-3 opacity-60" />
                  <span>{sug}</span>
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Active Skills List Chips with Confidence Sliders */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-700 block">
          Your Configured Skills ({normalizedSkills.length})
        </span>

        {normalizedSkills.length === 0 ? (
          <div className="p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center text-xs text-slate-400">
            No skills added yet. Add your academic strengths to improve study group pairing.
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {normalizedSkills.map((skill) => {
              const isEditingConfidence = showSliderForTag === skill.tag;
              return (
                <div
                  key={skill.tag}
                  className="group inline-flex items-center space-x-2 pl-3 pr-2 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs hover:border-brand/40 transition-all"
                >
                  <span>{skill.tag}</span>

                  {/* Confidence Pill Button */}
                  <button
                    type="button"
                    onClick={() =>
                      setShowSliderForTag(isEditingConfidence ? null : skill.tag)
                    }
                    className="px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-brand-50 text-brand border border-brand/20 hover:bg-brand hover:text-white transition-colors"
                    title="Click to adjust proficiency level"
                  >
                    {skill.confidence}%
                  </button>

                  {/* Inline Slider Popup */}
                  {isEditingConfidence && (
                    <div className="inline-flex items-center space-x-1 ml-1 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-200">
                      <input
                        type="range"
                        min="20"
                        max="100"
                        step="5"
                        value={skill.confidence}
                        onChange={(e) =>
                          handleUpdateConfidence(skill.tag, e.target.value)
                        }
                        className="w-16 accent-brand cursor-pointer"
                      />
                    </div>
                  )}

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill.tag)}
                    className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title={`Remove ${skill.tag}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}

