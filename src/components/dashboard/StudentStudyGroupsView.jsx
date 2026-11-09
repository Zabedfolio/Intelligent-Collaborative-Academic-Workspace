'use client';

import { useState } from 'react';
import {
  Users,
  Calendar,
  Sparkles,
  Share2,
  Video,
  FileText,
  Clock,
  CheckCircle2,
  Plus,
  Send,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function StudentStudyGroupsView({ user }) {
  const [activeTab, setActiveTab] = useState('roster'); // 'roster' | 'discussion' | 'schedule'
  const [discussionInput, setDiscussionInput] = useState('');
  const [messages, setMessages] = useState([
    {
      author: 'Maria Chen',
      initials: 'MC',
      time: '10:15 AM',
      text: 'Hey everyone! I uploaded my handwritten notes on the SVD derivation to our shared folder. Let us review it during our Thursday 6:30 PM session.'
    },
    {
      author: 'David Kim',
      initials: 'DK',
      time: '11:02 AM',
      text: 'Thanks Maria! I will bring 3 diagnostic exam questions on mini-batch variance so we can practice together before the midterm.'
    }
  ]);

  const cohortMembers = [
    {
      name: user?.name || 'You',
      role: 'Cohort Member (You)',
      skills: ['Python', 'System Architecture', 'PyTorch'],
      overlap: '100% Match',
      isYou: true
    },
    {
      name: 'Maria Chen',
      role: 'Peer Student • 6th Sem',
      skills: ['Linear Algebra', 'Calculus III', 'SVD'],
      overlap: '92% Schedule Overlap',
      isYou: false
    },
    {
      name: 'David Kim',
      role: 'Peer Student • 6th Sem',
      skills: ['Data Structures', 'Optimization', 'Loss Functions'],
      overlap: '88% Schedule Overlap',
      isYou: false
    },
    {
      name: 'Tariq Aziz',
      role: 'Peer Student • 7th Sem',
      skills: ['Neural Networks', 'Attention Models', 'NLP'],
      overlap: '85% Schedule Overlap',
      isYou: false
    }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!discussionInput.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        author: user?.name || 'You',
        initials: user?.initials || 'U',
        time: 'Just now',
        text: discussionInput.trim()
      }
    ]);
    setDiscussionInput('');
    toast.success('Message posted to study group thread');
  };

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-brand-50 text-brand border border-brand/20">
              <Users className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">Collaborative Study Groups & Cohorts</h2>
          </div>
          <p className="text-xs text-slate-500">
            Schedule-matched peers paired by complementary curriculum strengths and open weekly hours.
          </p>
        </div>

        {/* Bi-Weekly Matching Cycle Status */}
        <div className="px-3.5 py-2 rounded-2xl bg-brand text-white text-xs font-semibold flex items-center space-x-2 shrink-0 shadow-sm">
          <Sparkles className="w-4 h-4 text-emerald-300" />
          <span>Bi-Weekly Cycle: <strong>Next in 2 days</strong></span>
        </div>
      </div>

      {/* Active Cohort Overview Card */}
      <div className="bg-gradient-to-r from-emerald-950 to-brand text-white rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 border border-emerald-900/50">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/10 text-emerald-300 border border-white/15">
              Active Cohort #4 • CS401 Machine Learning
            </span>
            <h3 className="text-2xl font-black tracking-tight">
              Deep Learning Midterm Study Group
            </h3>
            <p className="text-xs text-white/80 max-w-xl">
              Meeting weekly on <strong>Mondays & Thursdays (6:30 PM – 8:30 PM)</strong>. 4 peers paired with balanced theoretical and coding competencies.
            </p>
          </div>

          {/* Quick Collaboration Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => toast.success('Connecting to real-time collaborative whiteboard...')}
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-white text-brand font-bold text-xs hover:bg-slate-100 transition-all cursor-pointer shadow-sm"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Launch Whiteboard</span>
            </button>

            <button
              type="button"
              onClick={() => toast.success('Starting WebRTC voice room with cohort...')}
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-xs hover:bg-white/20 transition-all cursor-pointer"
            >
              <Video className="w-3.5 h-3.5 text-emerald-300" />
              <span>Join Voice Room</span>
            </button>
          </div>
        </div>

        {/* Schedule & Alignment Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10 text-xs">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>Next Session: <strong>Thursday at 6:30 PM</strong></span>
          </div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Attendance: <strong>100% Completed Sessions</strong></span>
          </div>
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Shared Materials: <strong>6 Lecture Decks & Notes</strong></span>
          </div>
        </div>
      </div>

      {/* Cohort Tabs: Roster / Q&A Discussion Thread */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-wrap gap-3">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setActiveTab('roster')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'roster'
                  ? 'bg-brand text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              Members & Skill Balance (4)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('discussion')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'discussion'
                  ? 'bg-brand text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              Cohort Discussion & Notes ({messages.length})
            </button>
          </div>

          <span className="text-xs text-slate-400">
            Matched via bi-weekly algorithmic solver
          </span>
        </div>

        {/* Tab 1: Member Roster & Skill Balance */}
        {activeTab === 'roster' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cohortMembers.map((member, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition-all ${
                  member.isYou
                    ? 'bg-brand-50/40 border-brand/30 shadow-2xs'
                    : 'bg-slate-50/60 border-slate-200/80'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-brand text-white font-bold text-xs flex items-center justify-center shadow-xs">
                      {member.name.split(' ').map((p) => p[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                        <span>{member.name}</span>
                        {member.isYou && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-brand text-white uppercase font-bold">
                            You
                          </span>
                        )}
                      </h4>
                      <p className="text-[11px] text-slate-500">{member.role}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {member.overlap}
                  </span>
                </div>

                {/* Skill Badges */}
                <div className="mt-3 pt-3 border-t border-slate-200/60 flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-semibold text-slate-400 self-center mr-1">
                    Strengths:
                  </span>
                  {member.skills.map((s, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white border border-slate-200 text-slate-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Discussion & Notes */}
        {activeTab === 'discussion' && (
          <div className="space-y-4">
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {messages.map((m, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{m.author}</span>
                    <span className="text-[10px] text-slate-400">{m.time}</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{m.text}</p>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendMessage} className="flex items-center space-x-2 pt-2 border-t border-slate-100">
              <input
                type="text"
                value={discussionInput}
                onChange={(e) => setDiscussionInput(e.target.value)}
                placeholder="Share a question or study notes with your cohort..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-brand text-white font-bold text-xs hover:bg-brand-hover transition-all flex items-center space-x-1 cursor-pointer shrink-0"
              >
                <span>Post</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}

      </div>

    </div>
  );
}

