'use client';

import { useState } from 'react';
import {
  Users,
  UserCheck,
  UserX,
  Shield,
  Search,
  Filter,
  UserPlus,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Mail,
  Building2,
  GraduationCap,
  KeyRound,
  ShieldAlert,
  ArrowUpDown
} from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '../common/Modal';

// Department shortcut abbreviation helper
const getDeptCode = (dept) => {
  if (!dept) return 'N/A';
  const d = dept.toLowerCase();
  if (d.includes('computer') || d === 'cse') return 'CSE';
  if (d.includes('electrical') || d === 'eee') return 'EEE';
  if (d.includes('math')) return 'MATH';
  if (d.includes('business') || d === 'bba') return 'BBA';
  if (d.includes('registrar') || d.includes('ict')) return 'ICT';
  if (d.includes('civil') || d === 'ce') return 'CE';
  return dept;
};

export default function AdminUserManagementView({ user }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all'); // all | student | teacher | admin | pending
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    name: '',
    email: '',
    role: 'teacher',
    department: 'Computer Science & Engineering'
  });

  // Initial mock institutional user database
  const [usersList, setUsersList] = useState([
    {
      id: 'usr-001',
      name: 'Dr. Tariqul Islam',
      email: 'tariqul@iiuc.ac.bd',
      role: 'teacher',
      department: 'Computer Science & Engineering',
      status: 'pending_approval',
      joinedAt: 'Today at 08:30 AM',
      lastActive: '10 mins ago',
      assignedCourses: ['CS401', 'CS302']
    },
    {
      id: 'usr-002',
      name: 'Prof. Sarah Jenkins',
      email: 'sjenkins@iiuc.ac.bd',
      role: 'teacher',
      department: 'Computer Science & Engineering',
      status: 'active',
      joinedAt: 'Aug 14, 2025',
      lastActive: '5 mins ago',
      assignedCourses: ['CS401 - Machine Learning', 'CS402 - Deep Learning']
    },
    {
      id: 'usr-003',
      name: 'Alex Johnson',
      email: 'alex.j@iiuc.ac.bd',
      role: 'student',
      department: 'Computer Science & Engineering',
      status: 'active',
      joinedAt: 'Sep 01, 2025',
      lastActive: '1 hour ago',
      assignedCourses: ['CS401', 'MATH202', 'PHYS101']
    },
    {
      id: 'usr-004',
      name: 'Engr. Mahbubur Rahman',
      email: 'mahbubur@iiuc.ac.bd',
      role: 'teacher',
      department: 'Electrical & Electronic Engineering',
      status: 'pending_approval',
      joinedAt: 'Yesterday',
      lastActive: '1 day ago',
      assignedCourses: ['EEE201 - Circuit Analysis']
    },
    {
      id: 'usr-005',
      name: 'Dr. Shamima Nasrin',
      email: 'snasrin@iiuc.ac.bd',
      role: 'teacher',
      department: 'Department of Mathematics',
      status: 'active',
      joinedAt: 'Jan 10, 2025',
      lastActive: '3 hours ago',
      assignedCourses: ['MATH202 - Linear Algebra']
    },
    {
      id: 'usr-006',
      name: 'Zabed Mahmud (Campus Admin)',
      email: 'admin@iiuc.ac.bd',
      role: 'admin',
      department: 'Office of the Registrar / ICT',
      status: 'active',
      joinedAt: 'Jan 01, 2025',
      lastActive: 'Just now',
      assignedCourses: ['Global System Scope']
    },
    {
      id: 'usr-007',
      name: 'Fatima Al-Mansoor',
      email: 'fatima.m@iiuc.ac.bd',
      role: 'student',
      department: 'Electrical & Electronic Engineering',
      status: 'active',
      joinedAt: 'Sep 02, 2025',
      lastActive: 'Yesterday',
      assignedCourses: ['EEE201', 'MATH202']
    },
    {
      id: 'usr-008',
      name: 'Rafiqul Hasan',
      email: 'rhasan.flagged@iiuc.ac.bd',
      role: 'student',
      department: 'Computer Science & Engineering',
      status: 'suspended',
      joinedAt: 'Feb 12, 2025',
      lastActive: '3 days ago',
      assignedCourses: []
    }
  ]);

  // Approve faculty account
  const handleApproveFaculty = (userId) => {
    setUsersList((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: 'active' } : u))
    );
    toast.success('Faculty credentials verified and approved! Notification email dispatched.');
  };

  // Toggle user suspension
  const handleToggleSuspend = (userId, currentStatus) => {
    const nextStatus = currentStatus === 'suspended' ? 'active' : 'suspended';
    setUsersList((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: nextStatus } : u))
    );
    if (nextStatus === 'suspended') {
      toast.error('User account suspended and session tokens revoked.');
    } else {
      toast.success('User account reinstated successfully.');
    }
  };

  // Change user role
  const handleChangeRole = (userId, newRole) => {
    setUsersList((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
    toast.success(`User role updated to ${newRole.toUpperCase()}.`);
  };

  // Submit invitation form
  const handleSendInvite = (e) => {
    e.preventDefault();
    if (!inviteForm.name || !inviteForm.email) {
      toast.error('Please enter user name and institutional email.');
      return;
    }
    const newUser = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: inviteForm.name,
      email: inviteForm.email,
      role: inviteForm.role,
      department: inviteForm.department,
      status: inviteForm.role === 'teacher' ? 'pending_approval' : 'active',
      joinedAt: 'Just now',
      lastActive: 'Invited',
      assignedCourses: []
    };
    setUsersList((prev) => [newUser, ...prev]);
    setIsInviteModalOpen(false);
    setInviteForm({
      name: '',
      email: '',
      role: 'teacher',
      department: 'Computer Science & Engineering'
    });
    toast.success(`Invitation dispatched to ${newUser.email}`);
  };

  // Filtered users
  const filteredUsers = usersList.filter((u) => {
    const deptCode = getDeptCode(u.department);
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deptCode.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (roleFilter === 'all') return true;
    if (roleFilter === 'pending') return u.status === 'pending_approval';
    return u.role === roleFilter;
  });

  const pendingCount = usersList.filter((u) => u.status === 'pending_approval').length;
  const facultyCount = usersList.filter((u) => u.role === 'teacher').length;
  const studentCount = usersList.filter((u) => u.role === 'student').length;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-brand-50 text-brand border border-brand/20">
              <Users className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">User & Faculty Identity Governance</h2>
          </div>
          <p className="text-xs text-slate-500">
            Audit institutional directory accounts, verify faculty instructor privileges, and manage role-based access.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsInviteModalOpen(true)}
          className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-hover shadow-sm transition-all cursor-pointer shrink-0 whitespace-nowrap"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Invite Academic User</span>
        </button>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Directory</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900">2,840</span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              +14 this week
            </span>
          </div>
          <p className="text-[11px] text-slate-500">Enrolled across 4 faculties</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Active Faculty</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-amber-700">{facultyCount}</span>
            <span className="text-xs font-bold text-slate-500">Verified</span>
          </div>
          <p className="text-[11px] text-slate-500">Full syllabus & grading privileges</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Pending Approvals</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-rose-600">{pendingCount}</span>
            {pendingCount > 0 && (
              <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full animate-pulse">
                Action Required
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-500">Instructor credentials awaiting review</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Student Body</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-brand">2,790</span>
            <span className="text-xs font-bold text-emerald-600">Active RAG</span>
          </div>
          <p className="text-[11px] text-slate-500">Participating in study groups</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, department..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand shadow-2xs"
            />
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: `All Users (${usersList.length})` },
              { id: 'teacher', label: `Faculty (${facultyCount})` },
              { id: 'student', label: `Students (${studentCount})` },
              { id: 'admin', label: 'Admins' },
              { id: 'pending', label: `Pending (${pendingCount})`, highlight: pendingCount > 0 }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setRoleFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer whitespace-nowrap ${
                  roleFilter === tab.id
                    ? 'bg-brand text-white shadow-xs'
                    : tab.highlight
                    ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto border border-slate-200/80 rounded-2xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Academic User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Department / Division</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Activity</th>
                <th className="py-3 px-4 text-right">Administrative Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No academic users match the selected query and filters.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 font-bold text-slate-700 flex items-center justify-center shrink-0">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{u.name}</div>
                          <div className="text-[11px] text-slate-500 flex items-center space-x-1">
                            <Mail className="w-3 h-3 text-slate-400" />
                            <span>{u.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-md font-bold uppercase text-[10px] tracking-wider ${
                          u.role === 'admin'
                            ? 'bg-rose-100 text-rose-800'
                            : u.role === 'teacher'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-semibold text-slate-800 flex items-center space-x-1.5" title={u.department}>
                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="font-bold text-slate-900">{getDeptCode(u.department)}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {u.status === 'active' ? (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Active</span>
                        </span>
                      ) : u.status === 'pending_approval' ? (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          <AlertCircle className="w-3 h-3 text-amber-600" />
                          <span>Pending</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          <UserX className="w-3 h-3 text-rose-600" />
                          <span>Suspended</span>
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 text-[11px] whitespace-nowrap">
                      <div>{u.lastActive}</div>
                      <div className="text-slate-400 text-[10px]">Joined {u.joinedAt}</div>
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end space-x-2">
                        {u.status === 'pending_approval' && (
                          <button
                            type="button"
                            onClick={() => handleApproveFaculty(u.id)}
                            className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] shadow-2xs transition-colors cursor-pointer whitespace-nowrap"
                          >
                            Approve
                          </button>
                        )}

                        <select
                          value={u.role}
                          onChange={(e) => handleChangeRole(u.id, e.target.value)}
                          className="px-2 py-1 rounded-lg border border-slate-200 bg-white font-semibold text-slate-700 text-[11px] cursor-pointer whitespace-nowrap shrink-0"
                        >
                          <option value="student">Student</option>
                          <option value="teacher">Faculty</option>
                          <option value="admin">Admin</option>
                        </select>

                        <button
                          type="button"
                          onClick={() => handleToggleSuspend(u.id, u.status)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                            u.status === 'suspended'
                              ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                              : 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200'
                          }`}
                        >
                          {u.status === 'suspended' ? 'Reactivate' : 'Suspend'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Academic User Modal */}
      <Modal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        title="Invite Academic User"
        subtitle="Send an authorized institutional access invitation"
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleSendInvite} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-slate-700">Full Name</label>
            <input
              type="text"
              required
              value={inviteForm.name}
              onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
              placeholder="e.g. Dr. Jane Doe"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Institutional Email (@iiuc.ac.bd)</label>
            <input
              type="email"
              required
              value={inviteForm.email}
              onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
              placeholder="e.g. janedoe@iiuc.ac.bd"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Role Designation</label>
              <select
                value={inviteForm.role}
                onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
              >
                <option value="teacher">Faculty / Teacher</option>
                <option value="student">Student</option>
                <option value="admin">Administrator</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Department</label>
              <select
                value={inviteForm.department}
                onChange={(e) => setInviteForm({ ...inviteForm, department: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
              >
                <option value="Computer Science & Engineering">CSE</option>
                <option value="Electrical & Electronic Engineering">EEE</option>
                <option value="Department of Mathematics">Mathematics</option>
                <option value="Business Administration">BBA</option>
              </select>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px] leading-relaxed">
            Faculty invitations require email domain confirmation before syllabus ingestion and AI configuration permissions are enabled.
          </div>

          <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsInviteModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold whitespace-nowrap shrink-0 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-brand text-white font-bold hover:bg-brand-hover shadow-xs whitespace-nowrap shrink-0 cursor-pointer"
            >
              Send Access Invite
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

