import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "@/lib/firebase/config";

export type StoragePath = "videos" | "notes" | "thumbnails" | "quizzes" | "images";

/** Upload a file with progress callback. Returns download URL. */
export async function uploadFile(
  file: File,
  path: StoragePath,
  onProgress?: (pct: number) => void
): Promise<string> {
  const ext = file.name.split(".").pop();
  const name = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const storageRef = ref(storage, `${path}/${name}`);

  return new Promise((resolve, reject) => {
    const task = uploadBytesResumable(storageRef, file, {
      contentType: file.type,
      customMetadata: { originalName: file.name },
    });

    task.on(
      "state_changed",
      (snap) => {
        const pct = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
        onProgress?.(pct);
      },
      reject,
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        resolve(url);
      }
    );
  });
}

/** Delete a file by its full storage URL */
export async function deleteFile(url: string): Promise<void> {
  const fileRef = ref(storage, url);
  await deleteObject(fileRef);
}

/** Validate file type and size */
export function validateFile(
  file: File,
  allowedTypes: readonly string[],
  maxMB = 100
): { valid: boolean; error?: string } {
  if (!allowedTypes.some((t) => file.type.startsWith(t))) {
    return { valid: false, error: `Invalid file type. Allowed: ${allowedTypes.join(", ")}` };
  }
  if (file.size > maxMB * 1024 * 1024) {
    return { valid: false, error: `File too large. Max size: ${maxMB}MB` };
  }
  return { valid: true };
}

export const FILE_RULES = {
  video:     { types: ["video/"],            maxMB: 500, label: "MP4, MOV, AVI" },
  pdf:       { types: ["application/pdf"],   maxMB: 50,  label: "PDF only" },
  image:     { types: ["image/"],            maxMB: 10,  label: "JPG, PNG, WebP" },
  thumbnail: { types: ["image/"],            maxMB: 5,   label: "JPG, PNG (max 5MB)" },
} as const;
