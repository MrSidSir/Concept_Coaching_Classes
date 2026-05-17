import {
  collection, doc, addDoc, updateDoc, deleteDoc,
  getDocs, getDoc, query, where, orderBy, limit,
  serverTimestamp, Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { FIRESTORE_COLLECTIONS } from "@/constants";
import type { ContentItem, ContentType, ContentStatus } from "@/types/content";

const col = (type: ContentType) => {
  const map: Record<ContentType, string> = {
    video:    "videos",
    note:     "notes",
    quiz:     "quizzes",
    image:    "images",
    solution: "solutions",
    resource: "resources",
  };
  return collection(db, map[type]);
};

/** Create a content item */
export async function createContent<T extends ContentItem>(
  type: ContentType,
  data: Omit<T, "id" | "createdAt" | "updatedAt" | "viewCount" | "downloadCount">
): Promise<string> {
  const ref = await addDoc(col(type), {
    ...data,
    viewCount:     0,
    downloadCount: 0,
    createdAt:     serverTimestamp(),
    updatedAt:     serverTimestamp(),
  });
  return ref.id;
}

/** Update a content item */
export async function updateContent(
  type: ContentType,
  id: string,
  data: Partial<ContentItem>
): Promise<void> {
  const ref = doc(col(type), id);
  await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
}

/** Delete a content item */
export async function deleteContent(type: ContentType, id: string): Promise<void> {
  await deleteDoc(doc(col(type), id));
}

/** Fetch all content of a type (admin) */
export async function fetchAllContent<T extends ContentItem>(
  type: ContentType,
  status?: ContentStatus
): Promise<T[]> {
  let q = query(col(type), orderBy("createdAt", "desc"));
  if (status) q = query(col(type), where("status", "==", status), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as T));
}

/** Fetch published content (public) */
export async function fetchPublishedContent<T extends ContentItem>(
  type: ContentType,
  limitCount = 20
): Promise<T[]> {
  const q = query(
    col(type),
    where("status", "==", "published"),
    orderBy("createdAt", "desc"),
    limit(limitCount)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as T));
}

/** Toggle publish status */
export async function togglePublish(
  type: ContentType,
  id: string,
  currentStatus: ContentStatus
): Promise<void> {
  const next: ContentStatus = currentStatus === "published" ? "draft" : "published";
  await updateContent(type, id, { status: next });
}

/** Increment view count */
export async function incrementViews(type: ContentType, id: string): Promise<void> {
  const ref = doc(col(type), id);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    await updateDoc(ref, { viewCount: (snap.data().viewCount ?? 0) + 1 });
  }
}
