"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "@/components/ui/Modal";
import { FileUpload } from "@/components/ui/FileUpload";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { CATEGORIES } from "@/types/content";
import { cn } from "@/utils/cn";
import toast from "react-hot-toast";

const schema = z.object({
  title:       z.string().min(3),
  description: z.string().min(10),
  category:    z.string().min(1, "Select a category"),
  type:        z.enum(["notes", "pdf", "sheet", "interview", "handwritten", "mcq"]),
  isFree:      z.boolean().optional(),
  status:      z.enum(["draft", "published"]),
});
type FormData = z.infer<typeof schema>;

const NOTE_TYPES = [
  { value: "notes",       label: "📄 Study Notes"       },
  { value: "pdf",         label: "📕 PDF Document"       },
  { value: "sheet",       label: "📊 Coding Sheet"       },
  { value: "interview",   label: "💼 Interview Prep"     },
  { value: "handwritten", label: "✍️ Handwritten Notes"  },
  { value: "mcq",         label: "✅ MCQ Sheet"          },
];

const DEMO_NOTES = [
  { id: "1", title: "ReactJS Complete Guide",           category: "ReactJS",    type: "notes",       status: "published", downloads: 1240, pages: 45, isFree: true  },
  { id: "2", title: "Node.js Interview Questions 2025", category: "Node.js",    type: "interview",   status: "published", downloads: 876,  pages: 28, isFree: false },
  { id: "3", title: "DSA Coding Sheet — 150 Problems",  category: "DSA",        type: "sheet",       status: "published", downloads: 3241, pages: 62, isFree: true  },
  { id: "4", title: "Python Quick Notes",               category: "Python",     type: "notes",       status: "draft",     downloads: 0,    pages: 18, isFree: true  },
  { id: "5", title: "Firebase Setup Handwritten Notes", category: "Firebase",   type: "handwritten", status: "published", downloads: 456,  pages: 12, isFree: true  },
  { id: "6", title: "JavaScript MCQ — 100 Questions",   category: "JavaScript", type: "mcq",         status: "published", downloads: 2110, pages: 30, isFree: false },
];

function UploadNoteForm({ onSuccess, onCancel }: { onSuccess: () => void; onCancel: () => void }) {
  const [pdfUrl, setPdfUrl] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { status: "draft", isFree: true, type: "notes" },
  });

  const onSubmit = async (data: FormData) => {
    if (!pdfUrl) { toast.error("Please upload a PDF file first."); return; }
    console.log("Note data:", { ...data, pdfUrl });
    toast.success("Notes uploaded successfully!");
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FileUpload storagePath="notes" accept="pdf" label="Upload PDF *" onUploadComplete={setPdfUrl} />

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Title *</label>
        <input {...register("title")} className="input-base" placeholder="e.g. ReactJS Complete Notes" />
        {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Description *</label>
        <textarea {...register("description")} rows={2} className="input-base resize-none"
          placeholder="What does this document cover?" />
        {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Type *</label>
          <select {...register("type")} className="input-base">
            {NOTE_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Category *</label>
          <select {...register("category")} className="input-base">
            <option value="">Select...</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Status</label>
          <select {...register("status")} className="input-base">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div className="flex items-end pb-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" {...register("isFree")}
              className="w-4 h-4 rounded text-blue-600" />
            <span className="text-sm text-gray-700 dark:text-slate-300">Free Download</span>
          </label>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={isSubmitting} className="btn-primary flex-1">
          {isSubmitting ? "Saving..." : "Save Notes"}
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary flex-1">Cancel</button>
      </div>
    </form>
  );
}

export default function AdminNotesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch]       = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = DEMO_NOTES.filter((n) => {
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase());
    const matchType   = typeFilter === "all" || n.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notes & PDFs</h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Upload and manage study material</p>
        </div>
        <button onClick={() => setModalOpen(true)} className="btn-primary">+ Upload Notes</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Notes", value: "87",   icon: "📝" },
          { label: "Downloads",   value: "8.2K", icon: "⬇️" },
          { label: "Free PDFs",   value: "54",   icon: "🆓" },
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
        <input type="text" placeholder="Search notes..." value={search}
          onChange={(e) => setSearch(e.target.value)} className="input-base flex-1" />
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 sm:pb-0">
          {["all", "notes", "pdf", "sheet", "interview", "mcq"].map((t) => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={cn(
                "px-3 py-2 rounded-xl text-xs font-medium capitalize transition-all shrink-0",
                typeFilter === t
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-slate-400"
              )}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((n) => (
          <div key={n.id} className="card hover:shadow-md transition-all p-4 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">📄</span>
              <div className="flex flex-col items-end gap-1">
                <span className={cn("badge text-xs",
                  n.status === "published"
                    ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300"
                )}>
                  {n.status}
                </span>
                {n.isFree
                  ? <span className="badge bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">FREE</span>
                  : <span className="badge bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300">Premium</span>
                }
              </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2 flex-1">{n.title}</h3>
            <CategoryBadge category={n.category} className="mb-3 self-start" />
            <div className="flex items-center justify-between text-xs text-gray-400 dark:text-slate-500 mb-3">
              <span>📄 {n.pages} pages</span>
              <span>⬇️ {n.downloads.toLocaleString()}</span>
            </div>
            <div className="flex gap-2">
              <button className="btn-secondary flex-1 text-xs py-1.5">Edit</button>
              <button className="px-2 py-1.5 text-xs rounded-xl bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-300 transition hover:bg-red-200">🗑️</button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Upload Notes / PDF" size="lg">
        <UploadNoteForm onSuccess={() => setModalOpen(false)} onCancel={() => setModalOpen(false)} />
      </Modal>
    </div>
  );
}
