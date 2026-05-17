"use client";

import { useState } from "react";
import { cn } from "@/utils/cn";

const DEMO_STUDENTS = [
  { id: "1", name: "Arjun Sharma",   email: "arjun@example.com",   enrolled: 5, progress: 72, joined: "Jan 2025",  status: "active"   },
  { id: "2", name: "Priya Verma",    email: "priya@example.com",   enrolled: 3, progress: 45, joined: "Feb 2025",  status: "active"   },
  { id: "3", name: "Rahul Gupta",    email: "rahul@example.com",   enrolled: 7, progress: 88, joined: "Dec 2024",  status: "active"   },
  { id: "4", name: "Sneha Patel",    email: "sneha@example.com",   enrolled: 2, progress: 20, joined: "Mar 2025",  status: "inactive" },
  { id: "5", name: "Karan Singh",    email: "karan@example.com",   enrolled: 4, progress: 61, joined: "Jan 2025",  status: "active"   },
];

export default function AdminStudentsPage() {
  const [search, setSearch] = useState("");
  const filtered = DEMO_STUDENTS.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Student Management</h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Manage enrolled students</p>
        </div>
        <button className="btn-primary">+ Invite Student</button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Students", value: "512", icon: "👨‍🎓" },
          { label: "Active",         value: "489", icon: "✅"   },
          { label: "This Week",      value: "+24", icon: "📈"   },
        ].map((s) => (
          <div key={s.label} className="card p-4 text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{s.value}</p>
            <p className="text-xs text-gray-500 dark:text-slate-400">{s.label}</p>
          </div>
        ))}
      </div>

      <input type="text" placeholder="Search students..." value={search}
        onChange={(e) => setSearch(e.target.value)} className="input-base max-w-sm" />

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead className="bg-gray-50 dark:bg-white/3 text-xs text-gray-500 dark:text-slate-400 uppercase tracking-wider">
              <tr>
                {["Student", "Email", "Enrolled", "Progress", "Joined", "Status", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-[#33334b]">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50 dark:hover:bg-white/2 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                        {s.name[0]}
                      </div>
                      <span className="text-sm font-medium text-gray-800 dark:text-slate-200">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-slate-400">{s.email}</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-700 dark:text-slate-300">{s.enrolled}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${s.progress}%` }} />
                      </div>
                      <span className="text-xs text-gray-500">{s.progress}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500 dark:text-slate-400">{s.joined}</td>
                  <td className="px-4 py-3">
                    <span className={cn("badge text-xs",
                      s.status === "active"
                        ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
                        : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                    )}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="btn-secondary text-xs py-1 px-3">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
