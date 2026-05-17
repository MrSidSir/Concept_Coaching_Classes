"use client";

import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const MONTHLY = [
  { month: "Oct", views: 4200, students: 32 }, { month: "Nov", views: 5800, students: 41 },
  { month: "Dec", views: 7100, students: 56 }, { month: "Jan", views: 6500, students: 48 },
  { month: "Feb", views: 8900, students: 67 }, { month: "Mar", views: 11200, students: 84 },
  { month: "Apr", views: 9800, students: 72 }, { month: "May", views: 13500, students: 102},
];

const TOP_CATEGORIES = [
  { name: "ReactJS", views: 3200 }, { name: "DSA", views: 2900 },
  { name: "Next.js", views: 2600 }, { name: "Node.js", views: 2100 },
  { name: "Python",  views: 1800 }, { name: "Firebase",views: 1400 },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Platform performance overview</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Views",    value: "89.4K", delta: "+18%", icon: "👁️",  color: "text-blue-600 dark:text-blue-400"   },
          { label: "Total Students", value: "512",   delta: "+24",  icon: "👨‍🎓",color: "text-green-600 dark:text-green-400" },
          { label: "Content Items",  value: "624",   delta: "+47",  icon: "📦",  color: "text-purple-600 dark:text-purple-400"},
          { label: "Quiz Attempts",  value: "4.9K",  delta: "+340", icon: "✏️",  color: "text-orange-600 dark:text-orange-400"},
        ].map((s) => (
          <div key={s.label} className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl">{s.icon}</span>
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">{s.delta}</span>
            </div>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-gray-800 dark:text-slate-200 mb-4">Monthly Views Trend</h2>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={MONTHLY}>
              <defs>
                <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" />
              <Tooltip contentStyle={{ background: "#1a1a28", border: "1px solid #33334b", borderRadius: "12px", fontSize: 12 }} />
              <Area type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} fill="url(#aGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5">
          <h2 className="text-sm font-semibold text-gray-800 dark:text-slate-200 mb-4">Views by Category</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={TOP_CATEGORIES} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10 }} stroke="#9ca3af" />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} stroke="#9ca3af" width={60} />
              <Tooltip contentStyle={{ background: "#1a1a28", border: "1px solid #33334b", borderRadius: "12px", fontSize: 12 }} />
              <Bar dataKey="views" fill="#8b5cf6" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
