"use client";

import { useState } from "react";
import Link from "next/link";
import { CATEGORIES } from "@/types/content";
import { CategoryBadge } from "@/components/ui/CategoryBadge";

const CONTENT_MODULES = [
  { title: "Videos",          href: "/admin/videos",       icon: "🎬", desc: "Upload & manage video lectures",        count: 143, color: "from-blue-500 to-blue-700"    },
  { title: "Notes & PDFs",    href: "/admin/notes",        icon: "📝", desc: "Upload study material & PDFs",          count: 87,  color: "from-green-500 to-green-700"  },
  { title: "Quizzes",         href: "/admin/quizzes",      icon: "✏️", desc: "Create MCQ & coding quizzes",           count: 34,  color: "from-purple-500 to-purple-700"},
  { title: "Images",          href: "/admin/images",       icon: "🖼️", desc: "Upload thumbnails & course images",     count: 256, color: "from-pink-500 to-rose-500"    },
  { title: "Solutions",       href: "/admin/solutions",    icon: "💡", desc: "Upload solutions & answer keys",        count: 45,  color: "from-yellow-500 to-orange-500"},
  { title: "Resources",       href: "/admin/resources",    icon: "📦", desc: "Course material & references",          count: 28,  color: "from-teal-500 to-cyan-500"    },
  { title: "DSA Sheets",      href: "/admin/dsa",          icon: "📊", desc: "Data Structures & Algorithms content",  count: 12,  color: "from-indigo-500 to-violet-600"},
  { title: "Interview Prep",  href: "/admin/interview",    icon: "💼", desc: "Interview questions & prep material",   count: 19,  color: "from-orange-500 to-red-500"   },
];

const RECENT_UPLOADS = [
  { title: "ReactJS Hooks Masterclass",        type: "video",  category: "ReactJS",   status: "published", time: "2h ago"   },
  { title: "Node.js Interview Questions",       type: "note",   category: "Node.js",   status: "draft",     time: "5h ago"   },
  { title: "JavaScript Quiz — Closures",        type: "quiz",   category: "JavaScript",status: "published", time: "Yesterday"},
  { title: "Python DSA — Arrays & Strings",     type: "note",   category: "DSA",       status: "published", time: "2 days ago"},
  { title: "Flutter UI Components Tutorial",    type: "video",  category: "Flutter",   status: "draft",     time: "3 days ago"},
];

export default function ContentManagementPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredCategories = ["All", ...CATEGORIES].filter(c =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Content Management</h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">
            Upload, organize and publish educational content
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/videos" className="btn-primary text-sm px-4 py-2">
            + Quick Upload
          </Link>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Content",    value: "624",  icon: "📦", color: "text-blue-600 dark:text-blue-400"   },
          { label: "Published",        value: "489",  icon: "✅", color: "text-green-600 dark:text-green-400" },
          { label: "Draft",            value: "98",   icon: "📝", color: "text-yellow-600 dark:text-yellow-400"},
          { label: "Categories",       value: CATEGORIES.length.toString(), icon: "🏷️", color: "text-purple-600 dark:text-purple-400"},
        ].map((s) => (
          <div key={s.label} className="card p-4 flex items-center gap-3">
            <span className="text-2xl">{s.icon}</span>
            <div>
              <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 dark:text-slate-400">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Content Modules */}
      <div>
        <h2 className="text-base font-semibold text-gray-800 dark:text-slate-200 mb-3">Content Modules</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {CONTENT_MODULES.map((m) => (
            <Link key={m.href} href={m.href}>
              <div className="card hover:shadow-md dark:hover:shadow-black/30 transition-all cursor-pointer overflow-hidden group">
                <div className={`bg-gradient-to-br ${m.color} p-4 text-white`}>
                  <div className="text-3xl mb-1">{m.icon}</div>
                  <h3 className="font-bold text-sm">{m.title}</h3>
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-500 dark:text-slate-400 mb-2">{m.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-700 dark:text-slate-300">{m.count} items</span>
                    <span className="text-xs text-blue-600 dark:text-blue-400 group-hover:underline">Manage →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories Browser */}
      <div className="card p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h2 className="text-base font-semibold text-gray-800 dark:text-slate-200">Browse by Category</h2>
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-base sm:w-48 text-xs"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filteredCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-700 dark:hover:text-blue-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Uploads */}
      <div className="card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-[#33334b]">
          <h2 className="text-base font-semibold text-gray-800 dark:text-slate-200">Recent Uploads</h2>
          <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">View all</button>
        </div>
        <div className="divide-y divide-gray-50 dark:divide-[#33334b]">
          {RECENT_UPLOADS.map((item) => (
            <div key={item.title} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 dark:hover:bg-white/2 transition">
              <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center text-base shrink-0">
                {item.type === "video" ? "🎬" : item.type === "quiz" ? "✏️" : "📝"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 dark:text-slate-200 truncate">{item.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <CategoryBadge category={item.category} />
                  <span className="text-xs text-gray-400">{item.time}</span>
                </div>
              </div>
              <span className={`badge shrink-0 ${
                item.status === "published"
                  ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
                  : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300"
              }`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
