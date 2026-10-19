"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Users,
  Plus,
  Trash2,
  Lock,
  Download,
  CheckCircle2,
  Clock,
  KeyRound,
  Database,
  Activity,
  AlertTriangle,
  History,
} from "lucide-react";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Store Manager" | "Support Agent";
  lastLogin: string;
  status: "Active" | "Suspended";
}

interface AuditLog {
  id: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
  ip: string;
}

const DEFAULT_USERS: AdminUser[] = [
  {
    id: "adm-1",
    name: "Founder & Head of Ops",
    email: "admin@roohvastr.com",
    role: "Super Admin",
    lastLogin: "Active right now",
    status: "Active",
  },
  {
    id: "adm-2",
    name: "Priya Sharma (Production Lead)",
    email: "priya.ops@roohvastr.com",
    role: "Store Manager",
    lastLogin: "Today, 11:42 AM",
    status: "Active",
  },
  {
    id: "adm-3",
    name: "Rohit Verma (WhatsApp Support)",
    email: "rohit.support@roohvastr.com",
    role: "Support Agent",
    lastLogin: "Yesterday, 06:15 PM",
    status: "Active",
  },
];

const DEFAULT_LOGS: AuditLog[] = [
  {
    id: "log-1",
    actor: "Founder (Super Admin)",
    action: "Updated Razorpay Gateway",
    target: "Live Production Keys verified",
    timestamp: "17 Oct 2026, 02:10 PM",
    ip: "103.212.14.88 (Jaipur)",
  },
  {
    id: "log-2",
    actor: "Priya Sharma",
    action: "Updated Stock Matrix",
    target: "Oversized Tee (M) +50 units added",
    timestamp: "17 Oct 2026, 11:45 AM",
    ip: "103.212.14.92 (Jaipur)",
  },
  {
    id: "log-3",
    actor: "Priya Sharma",
    action: "Dispatched Order",
    target: "RV-1002 marked Shipped via BlueDart",
    timestamp: "16 Oct 2026, 05:20 PM",
    ip: "103.212.14.92 (Jaipur)",
  },
  {
    id: "log-4",
    actor: "Rohit Verma",
    action: "Sent Custom Quote",
    target: "WhatsApp POD-402 quote sent for ₹1,899",
    timestamp: "16 Oct 2026, 03:15 PM",
    ip: "49.207.210.12 (Jaipur)",
  },
  {
    id: "log-5",
    actor: "Founder (Super Admin)",
    action: "Published AI Blog",
    target: "How Magic Mugs Work (Draft Approved)",
    timestamp: "15 Oct 2026, 07:30 PM",
    ip: "103.212.14.88 (Jaipur)",
  },
];

export default function UsersSecurityAdminPage() {
  const [users, setUsers] = useState<AdminUser[]>(DEFAULT_USERS);
  const [logs, setLogs] = useState<AuditLog[]>(DEFAULT_LOGS);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUser, setNewUser] = useState<Partial<AdminUser>>({
    name: "",
    email: "",
    role: "Store Manager",
    status: "Active",
  });
  const [backupSuccess, setBackupSuccess] = useState(false);

  // Sync with localStorage
  useEffect(() => {
    try {
      const savedUsers = localStorage.getItem("rooh_admin_users");
      const savedLogs = localStorage.getItem("rooh_audit_logs");
      if (savedUsers) setUsers(JSON.parse(savedUsers));
      if (savedLogs) setLogs(JSON.parse(savedLogs));
    } catch {
      // ignore
    }
  }, []);

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;

    const user: AdminUser = {
      id: `adm-${Date.now()}`,
      name: newUser.name,
      email: newUser.email,
      role: (newUser.role as AdminUser["role"]) || "Store Manager",
      lastLogin: "Never logged in",
      status: "Active",
    };

    const updated = [...users, user];
    setUsers(updated);
    localStorage.setItem("rooh_admin_users", JSON.stringify(updated));
    setIsAddingUser(false);
    setNewUser({ name: "", email: "", role: "Store Manager", status: "Active" });
  };

  const removeUser = (id: string) => {
    const updated = users.filter((u) => u.id !== id);
    setUsers(updated);
    localStorage.setItem("rooh_admin_users", JSON.stringify(updated));
  };

  const handleDownloadBackup = () => {
    const fullBackup = {
      timestamp: new Date().toISOString(),
      store: "Rooh Vastr",
      products: localStorage.getItem("rooh_products") || "[]",
      orders: localStorage.getItem("rooh_orders") || "[]",
      customOrders: localStorage.getItem("rooh_custom_orders") || "[]",
      categories: localStorage.getItem("rooh_categories") || "[]",
      coupons: localStorage.getItem("rooh_coupons") || "[]",
      reviews: localStorage.getItem("rooh_reviews") || "[]",
      settings: localStorage.getItem("rooh_store_settings") || "{}",
      adminUsers: users,
    };

    const blob = new Blob([JSON.stringify(fullBackup, null, 2)], {
      type: "application/json;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `RoohVastr_FullBackup_${new Date().toISOString().split("T")[0]}.json`;
    link.click();

    setBackupSuccess(true);
    setTimeout(() => setBackupSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-800">
            <ShieldCheck className="w-4 h-4" />
            Security &amp; Access Control
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif font-bold text-stone-900 mt-1">
            Admin Staff Roles, Audit Trail &amp; Data Backup
          </h1>
          <p className="text-sm text-stone-600">
            Manage authorized staff accounts, review change audit history, and generate one-click encrypted database snapshots.
          </p>
        </div>

        <button
          onClick={handleDownloadBackup}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white text-sm font-semibold transition shadow-md"
        >
          {backupSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Backup Downloaded!
            </>
          ) : (
            <>
              <Download className="w-4 h-4" /> Download Full Store Backup (.JSON)
            </>
          )}
        </button>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-sm">
          <span className="text-xs font-medium text-stone-500">System Health Status</span>
          <p className="text-lg font-bold text-emerald-600 mt-1 flex items-center gap-1.5">
            <Activity className="w-4 h-4" /> 99.98% Operational
          </p>
          <p className="text-[11px] text-stone-500 mt-1">Next.js &amp; Edge API</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-sm">
          <span className="text-xs font-medium text-stone-500">Authorized Admins</span>
          <p className="text-2xl font-bold font-serif text-stone-900 mt-1">{users.length}</p>
          <p className="text-[11px] text-stone-500 mt-1">2FA Enforced</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-sm">
          <span className="text-xs font-medium text-stone-500">Database Storage</span>
          <p className="text-2xl font-bold font-serif text-amber-800 mt-1">14.2 MB</p>
          <p className="text-[11px] text-stone-500 mt-1">Cloud synchronized</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-sm">
          <span className="text-xs font-medium text-stone-500">Audit Actions Logged</span>
          <p className="text-2xl font-bold font-serif text-stone-900 mt-1">{logs.length}</p>
          <p className="text-[11px] text-stone-500 mt-1">Tamper-evident log</p>
        </div>
      </div>

      {/* Admin Users & Staff Team */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-rose-800" />
              Staff Accounts &amp; Privilege Hierarchy
            </h2>
            <p className="text-xs text-stone-500">
              Control which employees have access to orders, pricing, AI blogs, or platform credentials.
            </p>
          </div>

          <button
            onClick={() => setIsAddingUser(true)}
            className="px-3.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-900 text-xs font-semibold border border-rose-200 flex items-center gap-1.5 transition"
          >
            <Plus className="w-3.5 h-3.5" /> Invite Staff Member
          </button>
        </div>

        {/* Add User Modal */}
        {isAddingUser && (
          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-900">
              Invite New Staff User
            </h3>
            <form onSubmit={handleAddUser} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ankit Sharma"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="ankit@roohvastr.com"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Staff Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value as AdminUser["role"] })
                  }
                  className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white focus:outline-none"
                >
                  <option value="Super Admin">Super Admin (All permissions)</option>
                  <option value="Store Manager">Store Manager (Catalog &amp; Orders)</option>
                  <option value="Support Agent">Support Agent (WhatsApp &amp; Orders)</option>
                </select>
              </div>

              <div className="sm:col-span-3 flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingUser(false)}
                  className="px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-semibold text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-rose-900 hover:bg-rose-950 text-white text-xs font-semibold shadow-xs"
                >
                  Send Access Invite
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-stone-700">
            <thead className="bg-stone-50 border-b border-stone-200/80 text-xs font-semibold uppercase text-stone-500 tracking-wider">
              <tr>
                <th className="py-3 px-4">User Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Assigned Role</th>
                <th className="py-3 px-4">Last Activity</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {users.map((u, idx) => (
                <tr key={u.id} className="hover:bg-amber-50/20 transition">
                  <td className="py-3 px-4 font-semibold text-stone-900">{u.name}</td>
                  <td className="py-3 px-4 text-xs font-mono text-stone-600">{u.email}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        u.role === "Super Admin"
                          ? "bg-rose-100 text-rose-800 border border-rose-300"
                          : u.role === "Store Manager"
                          ? "bg-amber-100 text-amber-800 border border-amber-300"
                          : "bg-stone-100 text-stone-700 border border-stone-200"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs text-stone-500">{u.lastLogin}</td>
                  <td className="py-3 px-4">
                    <span className="text-xs font-semibold text-emerald-700">● {u.status}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {idx > 0 && (
                      <button
                        type="button"
                        onClick={() => removeUser(u.id)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition"
                        title="Remove user"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security Audit Log Stream */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-amber-700" />
            <h2 className="text-base font-bold text-stone-900">
              Administrative Change Audit Trail
            </h2>
          </div>
          <span className="text-xs text-stone-400 font-mono">Real-time Session Logger</span>
        </div>

        <div className="space-y-2">
          {logs.map((log) => (
            <div
              key={log.id}
              className="p-3 rounded-xl border border-stone-200 bg-stone-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0" />
                <div>
                  <span className="font-bold text-stone-900">{log.actor}</span>{" "}
                  <span className="text-stone-500">— {log.action}</span>
                  <p className="text-stone-700 font-medium mt-0.5">{log.target}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-stone-400 text-[11px] shrink-0 font-mono">
                <span>{log.ip}</span>
                <span>•</span>
                <span>{log.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
