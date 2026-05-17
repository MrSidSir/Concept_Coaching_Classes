"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { VideoUploadForm } from "@/features/videos/components/VideoUploadForm";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { cn } from "@/utils/cn";

const DEMO_VIDEOS = [
  { id: "1", title: "ReactJS Hooks Masterclass",       category: "ReactJS",    status: "published", views: 1240, thumb: "⚛️",  youtubeId: "abc123", duration: "45:00" },
  { id: "2", title: "Node.js REST API Tutorial",       category: "Node.js",    status: "published", views: 876,  thumb: "🟢",  youtubeId: "def456", duration: "52:10" },
  { id: "3", title: "Flutter UI Deep Dive",            category: "Flutter",    status: "draft",     views: 0,    thumb: "💙",  youtubeId: "",       duration: "38:25" },
  { id: "4", title: "Python DSA — Arrays",             category: "DSA",        status: "published", views: 2341, thumb: "🐍",  youtubeId: "ghi789", duration: "61:05" },
  { id: "5", title: "Next.js 14 App Router Guide",     category: "Next.js",    status: "published", views: 3102, thumb: "▲",   youtubeId: "jkl012", duration: "55:30" },
  { id: "6", title: "TypeScript Generics Explained",   category: "TypeScript", status: "draft",     views: 0,    thumb: "📘",  youtubeId: "",       duration: "29:45" },
];

export default function AdminVideosPage() {
  const [modalOpen, setModalOpen]   = useState(false);
  const [search, setSearch]         = useState("");
  const [statusFilter, setFilter]   = useState<"all" | "published" | "draft">("all");

  const filtered = DEMO_VIDEOS.filter((v) => {
    const matchSearch = v.title.toLowerCase().includes(search.toLowerCase()) ||
                        v.category.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || v.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Video Management</h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
            Upload YouTube links or local videos
          </p>
        </div>
        <button onClick={() => setModalOpen(true)} className="btn-primary">
          + Add Video
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Videos",  value: "143", icon: "🎬" },
          { label: "Published",     value: "118", icon: "✅" },
          { label: "Total Views",   value: "24.5K", icon: "👁️" },
        ].map((s) => (
          <div key={s.label} className="card p-4 text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{s.value}</p>
            <p className="text-xs text-gray-500 dark:text-slate-400">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search videos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-base flex-1"
        />
        <div className="flex gap-2">
          {(["all", "published", "draft"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-medium capitalize transition-all",
                statusFilter === s
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-white/10"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((v) => (
          <div key={v.id} className="card hover:shadow-md transition-all overflow-hidden group">
            {/* Thumbnail */}
            <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 h-36 flex items-center justify-center">
              {v.youtubeId ? (
                <img
                  src={`https://img.youtube.com/vi/${v.youtubeId}/mqdefault.jpg`}
                  alt={v.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              ) : (
                <span className="text-5xl">{v.thumb}</span>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center">
                <span className="text-white text-3xl opacity-0 group-hover:opacity-100 transition">▶</span>
              </div>
              <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded-md">
                {v.duration}
              </span>
              <span className={cn(
                "absolute top-2 left-2 badge",
                v.status === "published"
                  ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
                  : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300"
              )}>
                {v.status}
              </span>
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2">{v.title}</h3>
              <div className="flex items-center justify-between">
                <CategoryBadge category={v.category} />
                <span className="text-xs text-gray-400">👁️ {v.views.toLocaleString()}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="px-4 pb-3 flex gap-2">
              <button className="btn-secondary flex-1 text-xs py-1.5">Edit</button>
              <button className={cn(
                "flex-1 text-xs py-1.5 rounded-xl font-medium transition-all",
                v.status === "published"
                  ? "bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-200"
                  : "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300 hover:bg-green-200"
              )}>
                {v.status === "published" ? "Unpublish" : "Publish"}
              </button>
              <button className="px-3 py-1.5 text-xs rounded-xl bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-300 hover:bg-red-200 transition-all">
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add New Video" size="lg">
        <VideoUploadForm
          onSuccess={() => setModalOpen(false)}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
