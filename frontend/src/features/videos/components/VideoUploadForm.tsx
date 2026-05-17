"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CATEGORIES } from "@/types/content";
import { FileUpload } from "@/components/ui/FileUpload";
import toast from "react-hot-toast";

const schema = z.object({
  title:       z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Add a proper description"),
  category:    z.string().min(1, "Select a category"),
  tags:        z.string().optional(),
  youtubeId:   z.string().optional(),
  status:      z.enum(["draft", "published"]),
  featured:    z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
}

export function VideoUploadForm({ onSuccess, onCancel }: Props) {
  const [videoUrl, setVideoUrl]   = useState("");
  const [thumbUrl, setThumbUrl]   = useState("");
  const [uploadTab, setUploadTab] = useState<"youtube" | "file">("youtube");

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { status: "draft", featured: false },
  });

  const onSubmit = async (data: FormData) => {
    try {
      // In production: call createContent("video", {...data, videoUrl, thumbnailUrl: thumbUrl})
      console.log("Submitting video:", { ...data, videoUrl, thumbUrl });
      toast.success("Video uploaded successfully!");
      onSuccess();
    } catch {
      toast.error("Failed to upload video.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Source Tabs */}
      <div className="flex gap-1 p-1 bg-gray-100 dark:bg-white/5 rounded-xl">
        {(["youtube", "file"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setUploadTab(tab)}
            className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all capitalize ${
              uploadTab === tab
                ? "bg-white dark:bg-[#1a1a28] text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-slate-400"
            }`}
          >
            {tab === "youtube" ? "🎥 YouTube Link" : "📁 Upload File"}
          </button>
        ))}
      </div>

      {/* Video Source */}
      {uploadTab === "youtube" ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
            YouTube Video ID / URL
          </label>
          <input
            type="text"
            placeholder="e.g. dQw4w9WgXcQ or full YouTube URL"
            className="input-base"
            onChange={(e) => {
              const val = e.target.value;
              const match = val.match(/(?:v=|youtu\.be\/)([^&\s]+)/);
              setVideoUrl(match ? match[1] : val);
            }}
          />
          <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">
            Paste YouTube URL or just the video ID
          </p>
        </div>
      ) : (
        <FileUpload
          storagePath="videos"
          accept="video"
          label="Upload Video File"
          onUploadComplete={setVideoUrl}
        />
      )}

      {/* Thumbnail */}
      <FileUpload
        storagePath="thumbnails"
        accept="thumbnail"
        label="Thumbnail Image"
        onUploadComplete={setThumbUrl}
        preview
      />

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Title *</label>
        <input {...register("title")} className="input-base" placeholder="e.g. ReactJS Hooks Masterclass" />
        {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Description *</label>
        <textarea {...register("description")} rows={3} className="input-base resize-none"
          placeholder="Describe what this video covers..." />
        {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
      </div>

      {/* Category + Status row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Category *</label>
          <select {...register("category")} className="input-base">
            <option value="">Select category</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Status</label>
          <select {...register("status")} className="input-base">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
          Tags <span className="text-gray-400">(comma separated)</span>
        </label>
        <input {...register("tags")} className="input-base" placeholder="react, hooks, useState, useEffect" />
      </div>

      {/* Featured */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input type="checkbox" {...register("featured")}
          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
        <span className="text-sm text-gray-700 dark:text-slate-300">Mark as Featured</span>
      </label>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={isSubmitting} className="btn-primary flex-1">
          {isSubmitting ? "Saving..." : "Save Video"}
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary flex-1">
          Cancel
        </button>
      </div>
    </form>
  );
}
