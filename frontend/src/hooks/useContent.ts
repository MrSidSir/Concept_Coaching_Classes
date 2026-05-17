"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchPublishedContent,
  fetchAllContent,
  createContent,
  updateContent,
  deleteContent,
  togglePublish,
} from "@/services/content.service";
import type { ContentType, ContentStatus, ContentItem } from "@/types/content";
import toast from "react-hot-toast";

// ─── Query Keys (centralized, type-safe) ──────────────────────────────────────
export const CONTENT_KEYS = {
  all:       (type: ContentType) => ["content", type] as const,
  published: (type: ContentType) => ["content", type, "published"] as const,
  byId:      (type: ContentType, id: string) => ["content", type, id] as const,
};

// ─── Public: fetch published content ─────────────────────────────────────────
export function usePublishedContent<T extends ContentItem>(type: ContentType, limit = 20) {
  return useQuery({
    queryKey: CONTENT_KEYS.published(type),
    queryFn:  () => fetchPublishedContent<T>(type, limit),
    staleTime: 5 * 60 * 1000, // 5 min
  });
}

// ─── Admin: fetch all content ─────────────────────────────────────────────────
export function useAllContent<T extends ContentItem>(type: ContentType, status?: ContentStatus) {
  return useQuery({
    queryKey: [...CONTENT_KEYS.all(type), status],
    queryFn:  () => fetchAllContent<T>(type, status),
    staleTime: 60 * 1000,
  });
}

// ─── Create content ───────────────────────────────────────────────────────────
export function useCreateContent(type: ContentType) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Parameters<typeof createContent>[1]) =>
      createContent(type, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: CONTENT_KEYS.all(type) });
      toast.success("Content created successfully!");
    },
    onError: () => toast.error("Failed to create content."),
  });
}

// ─── Update content ───────────────────────────────────────────────────────────
export function useUpdateContent(type: ContentType) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ContentItem> }) =>
      updateContent(type, id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: CONTENT_KEYS.all(type) });
      toast.success("Content updated!");
    },
    onError: () => toast.error("Update failed."),
  });
}

// ─── Delete content ───────────────────────────────────────────────────────────
export function useDeleteContent(type: ContentType) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteContent(type, id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: CONTENT_KEYS.all(type) });
      toast.success("Content deleted.");
    },
    onError: () => toast.error("Delete failed."),
  });
}

// ─── Toggle publish ────────────────────────────────────────────────────────────
export function useTogglePublish(type: ContentType) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: ContentStatus }) =>
      togglePublish(type, id, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: CONTENT_KEYS.all(type) });
      toast.success("Publish status updated.");
    },
    onError: () => toast.error("Failed to update status."),
  });
}
