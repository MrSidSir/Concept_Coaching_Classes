"use client";

import Link from "next/link";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { cn } from "@/utils/cn";

const VIEWS_DATA = [
  { day: "Mon", views: 1240 }, { day: "Tue", views: 1890 }, { day: "Wed", views: 1560 },
  { day: "Thu", views: 2340 }, { day: "Fri", views: 2100 }, { day: "Sat", views: 2780 }, { day: "Sun", views: 1980 },
];

const CONTENT_DATA = [
  { name: "Videos", count: 143 }, { name: "Notes",  count: 87 },
  { name: "Quizzes",count: 34  }, { name: "Images", count: 256 },
];

const PIE_DATA = [
  { name: "Web Dev",    value: 35, color: "#3b82f6" },
  { name: "Mobile",    value: 20, color: "#8b5cf6" },
  { name: "DSA",       value: 18, color: "#ef4444" },
  { name: "Physics",   value: 15, color: "#10b981" },
  { name: "Others",    value: 12, color: "#f59e0b" },
];

const RECENT_UPLOADS = [
  { title: "ReactJS Hooks Masterclass",    type: "video",  category: "ReactJS",    views: 1240, status: "published" },
  { title: "DSA Sheet — 150 Problems",     type: "note",   category: "DSA",        views: 876,  status: "published" },
  { title: "Node.js Interview Quiz",       type: "quiz",   category: "Node.js",    views: 456,  status: "published" },
  { title: "Python Quick Notes",           type: "note",   category: "Python",     views: 0,    status: "draft"     },
  { title: "Flutter UI Tutorial",          type: "video",  category: "Flutter",    views: 234,  status: "published" },
];

const TOP_CONTENT = [
  { rank: 1, title: "Python DSA Arrays",         views: "3.2K", type: "video"  },
  { rank: 2, title: "Next.js 14 App Router",      views: "3.1K", type: "video"  },
  { rank: 3, title: "DSA Coding Sheet",           views: "3.2K", type: "note"   },
  { rank: 4, title: "JavaScript Quiz — Closures", views: "2.8K", type: "quiz"   },
  { rank: 5, title: "ReactJS Hooks MCQ",          views: "2.4K", type: "quiz"   },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6 max-w-7xl">
      {/* Welcome */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative">
          <h1 className="text-xl sm:text-2xl font-bold">Good morning, Mr. Sidsir 👋</h1>
          <p className="text-blue-200 text-sm mt-1">Here&apos;s what&apos;s happening on your platform today.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
            {[
              { label: "Total Content", value: "624"  },
              { label: "Total Views",   value: "24.5K"},
              { label: "Students",      value: "512"  },
              { label: "This Week",     value: "+47"  },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-xl sm:text-2xl font-bold text-yellow-300">{s.value}</p>
                <p className="text-blue-200 text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: "Total Videos",  value: "143", icon: "🎬", color: "from-blue-500 to-blue-600",   href: "/admin/videos"  },
          { label: "Notes & PDFs",  value: "87",  icon: "📝", color: "from-green-500 to-green-600", href: "/admin/notes"   },
          { label: "Quizzes",       value: "34",  icon: "✏️", color: "from-purple-500 to-purple-600",href: "/admin/quizzes" },
          { label: "Students",      value: "512", icon: "👨‍🎓", color: "from-orange-500 to-red-500",   href: "/admin/students"},
        ].map((s) => (
          <Link key={s.label} href={s.href}>
            <div className={`bg-gradient-to-br ${s.color} text-white rounded-2xl p-4 sm:p-5 hover:shadow-lg transition-all cursor-pointer`}>
              <div className="text-2xl sm:text-3xl mb-2">{s.icon}</div>
              <p className="text-2xl sm:text-3xl font-bold">{s.value}</p>
              <p className="text-white/80 text-xs sm:text-sm">{s.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Views Chart */}
        <div className="card p-5 lg:col-span-2">
          <h2 className="text-sm font-semibold text-gray-800 dark:text-slate-200 mb-4">Weekly Views</h2>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={VIEWS_DATA}>
              <defs>
                <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" className="dark:[&_line]:stroke-[#33334b]" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ background: "#1a1a28", border: "1px solid #33334b", borderRadius: "12px", color: "#fff", fontSize: 12 }}
              />
              <Area type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} fill="url(#viewsGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-gray-800 dark:text-slate-200 mb-4">Content by Category</h2>
          <ResponsiveContainer width="100%" height={120}>
            <PieChart>
              <Pie data={PIE_DATA} cx="50%" cy="50%" outerRadius={50} dataKey="value">
                {PIE_DATA.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#1a1a28", border: "1px solid #33334b", borderRadius: "8px", fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {PIE_DATA.map((d) => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color }} />
                  <span className="text-xs text-gray-600 dark:text-slate-400">{d.name}</span>
                </div>
                <span className="text-xs font-medium text-gray-700 dark:text-slate-300">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Uploads */}
        <div className="card">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-[#33334b]">
            <h2 className="text-sm font-semibold text-gray-800 dark:text-slate-200">Recent Uploads</h2>
            <Link href="/admin/content-management" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-gray-50 dark:divide-[#33334b]">
            {RECENT_UPLOADS.map((item) => (
              <div key={item.title} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 dark:hover:bg-white/2 transition">
                <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center text-sm shrink-0">
                  {item.type === "video" ? "🎬" : item.type === "quiz" ? "✏️" : "📝"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-800 dark:text-slate-200 truncate">{item.title}</p>
                  <CategoryBadge category={item.category} className="mt-0.5" />
                </div>
                <span className={cn("badge text-xs shrink-0",
                  item.status === "published"
                    ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300"
                )}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Content */}
        <div className="card">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-[#33334b]">
            <h2 className="text-sm font-semibold text-gray-800 dark:text-slate-200">🔥 Top Content</h2>
          </div>
          <div className="divide-y divide-gray-50 dark:divide-[#33334b]">
            {TOP_CONTENT.map((item) => (
              <div key={item.rank} className="flex items-center gap-3 px-5 py-3">
                <span className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                  item.rank === 1 ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-300" :
                  item.rank === 2 ? "bg-gray-100 text-gray-600 dark:bg-gray-500/20 dark:text-gray-300" :
                  item.rank === 3 ? "bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-300" :
                  "bg-gray-50 text-gray-500 dark:bg-white/5 dark:text-slate-400"
                )}>
                  {item.rank}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-800 dark:text-slate-200 truncate">{item.title}</p>
                  <span className="text-[10px] text-gray-400">{item.type}</span>
                </div>
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 shrink-0">
                  👁️ {item.views}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Action Links */}
      <div className="card p-5">
        <h2 className="text-sm font-semibold text-gray-800 dark:text-slate-200 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Add Video",    href: "/admin/videos",             icon: "🎬", color: "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300"   },
            { label: "Upload Notes", href: "/admin/notes",              icon: "📝", color: "bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-300"},
            { label: "New Quiz",     href: "/admin/quizzes",            icon: "✏️", color: "bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300"},
            { label: "CMS Hub",      href: "/admin/content-management", icon: "🗂️", color: "bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-300"},
          ].map((a) => (
            <Link key={a.label} href={a.href}>
              <div className={`flex items-center gap-2 px-4 py-3 rounded-xl cursor-pointer transition hover:opacity-80 ${a.color}`}>
                <span className="text-xl">{a.icon}</span>
                <span className="text-xs sm:text-sm font-medium">{a.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
