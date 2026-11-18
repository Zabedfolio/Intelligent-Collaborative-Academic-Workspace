'use client';

import { useState } from 'react';
import {
  Settings,
  ShieldCheck,
  Building2,
  Lock,
  Mail,
  Coins,
  Save,
  CheckCircle2,
  Clock,
  KeyRound,
  AlertTriangle,
  Server
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminSettingsView({ user }) {
  const [allowedDomains, setAllowedDomains] = useState('iiuc.ac.bd, university.edu');
  const [enforceInstitutionalEmail, setEnforceInstitutionalEmail] = useState(true);
  const [requireTeacherApproval, setRequireTeacherApproval] = useState(true);
  const [monthlyTokenCap, setMonthlyTokenCap] = useState(15); // in Millions
  const [sessionMaxAgeDays, setSessionMaxAgeDays] = useState(7);
  const [auditLogRetentionDays, setAuditLogRetentionDays] = useState(90);
  const [enforceTwoFactorForFaculty, setEnforceTwoFactorForFaculty] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Institutional governance and security policies saved!');
    }, 600);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-200">
              <Settings className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">Institutional Governance & Security Settings</h2>
          </div>
          <p className="text-xs text-slate-500">
            Configure campus-wide domain whitelisting, faculty credential verification, and departmental LLM token quotas.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-hover shadow-sm transition-all disabled:opacity-50 cursor-pointer shrink-0 whitespace-nowrap"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{isSaving ? 'Saving...' : 'Save Institutional Policies'}</span>
        </button>
      </div>

      {/* 1. Email Domain Whitelisting & Enrollment */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center space-x-2.5 pb-4 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand border border-brand/20 flex items-center justify-center">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">Domain Whitelisting & Identity Verification</h3>
            <p className="text-xs text-slate-500">Enforce verified academic domain requirements for student & faculty sign-ups</p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              Allowed Academic Email Domains (Comma Separated)
            </label>
            <input
              type="text"
              value={allowedDomains}
              onChange={(e) => setAllowedDomains(e.target.value)}
              placeholder="e.g. iiuc.ac.bd, university.edu, stanford.edu"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white font-mono font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand shadow-2xs"
            />
            <p className="text-[11px] text-slate-400">
              Only registrations matching these domains will be permitted to create accounts.
            </p>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
            <div className="space-y-0.5">
              <h4 className="font-bold text-slate-800">Enforce Strict Institutional Domain Validation</h4>
              <p className="text-slate-500 text-[11px]">
                Reject generic consumer email addresses (e.g. @gmail.com, @yahoo.com) automatically during registration.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={enforceInstitutionalEmail}
                onChange={(e) => setEnforceInstitutionalEmail(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand" />
            </label>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
            <div className="space-y-0.5">
              <h4 className="font-bold text-slate-800">Require Administrator Approval for Faculty Roles</h4>
              <p className="text-slate-500 text-[11px]">
                Newly registered professors remain in &lsquo;pending_approval&rsquo; status until an admin confirms departmental credentials.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={requireTeacherApproval}
                onChange={(e) => setRequireTeacherApproval(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand" />
            </label>
          </div>
        </div>
      </div>

      {/* 2. Campus Token Quota & Budget Ceilings */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center space-x-2.5 pb-4 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand border border-brand/20 flex items-center justify-center">
            <Coins className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">Departmental Token Quotas & Cost Caps</h3>
            <p className="text-xs text-slate-500">Prevent runaway LLM API expenses by capping monthly token consumption</p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-800">Monthly Campus-wide Token Cap</h4>
                <p className="text-slate-500 text-[11px]">Maximum collective tokens consumable by RAG tutor & diagnostic blitzes.</p>
              </div>
              <span className="text-base font-mono font-black text-brand">{monthlyTokenCap} Million Tokens</span>
            </div>

            <input
              type="range"
              min="5"
              max="50"
              step="5"
              value={monthlyTokenCap}
              onChange={(e) => setMonthlyTokenCap(Number(e.target.value))}
              className="w-full accent-brand cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>5M Tokens (~$300/mo)</span>
              <span>25M Tokens (~$1,500/mo)</span>
              <span>50M Tokens (~$3,000/mo)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Session Security & Retention */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center space-x-2.5 pb-4 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand border border-brand/20 flex items-center justify-center">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">Session Security & Audit Log Retention</h3>
            <p className="text-xs text-slate-500">Institutional compliance and session lifecycle policies</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
            <label className="font-bold text-slate-800 block">Session Max Age (Days)</label>
            <input
              type="number"
              min="1"
              max="30"
              value={sessionMaxAgeDays}
              onChange={(e) => setSessionMaxAgeDays(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-mono font-bold text-slate-800"
            />
            <p className="text-[11px] text-slate-400">Remember-me session cookie validity before re-authentication.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
            <label className="font-bold text-slate-800 block">Audit Log Retention (Days)</label>
            <input
              type="number"
              min="30"
              max="365"
              value={auditLogRetentionDays}
              onChange={(e) => setAuditLogRetentionDays(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-mono font-bold text-slate-800"
            />
            <p className="text-[11px] text-slate-400">Security event logs are archived and purged automatically.</p>
          </div>
        </div>
      </div>

    </div>
  );
}

