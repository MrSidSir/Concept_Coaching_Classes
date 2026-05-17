"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/utils/cn";
import { uploadFile, validateFile, FILE_RULES } from "@/services/storage.service";
import type { StoragePath } from "@/services/storage.service";

interface FileUploadProps {
  storagePath: StoragePath;
  accept: keyof typeof FILE_RULES;
  label?: string;
  onUploadComplete: (url: string) => void;
  className?: string;
  preview?: boolean;
}

export function FileUpload({
  storagePath, accept, label, onUploadComplete, className, preview
}: FileUploadProps) {
  const [progress, setProgress]   = useState(0);
  const [status, setStatus]       = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [error, setError]         = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const onDrop = useCallback(async (files: File[]) => {
    const file = files[0];
    if (!file) return;
    const rule = FILE_RULES[accept];
    const { valid, error: err } = validateFile(file, [...rule.types], rule.maxMB);
    if (!valid) { setError(err!); return; }

    if (preview && file.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(file));
    }

    setStatus("uploading");
    setError("");
    try {
      const url = await uploadFile(file, storagePath, setProgress);
      setStatus("done");
      onUploadComplete(url);
    } catch {
      setStatus("error");
      setError("Upload failed. Please try again.");
    }
  }, [storagePath, accept, onUploadComplete, preview]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, multiple: false,
    accept: FILE_RULES[accept].types.reduce((a, t) => ({ ...a, [t]: [] }), {}),
  });

  return (
    <div className={cn("space-y-2", className)}>
      {label && <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">{label}</label>}
      <div
        {...getRootProps()}
        className={cn(
          "upload-zone",
          isDragActive && "border-blue-500 bg-blue-50 dark:bg-blue-500/10",
          status === "done" && "border-green-400 bg-green-50 dark:bg-green-500/10"
        )}
      >
        <input {...getInputProps()} />
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" className="w-24 h-24 object-cover rounded-xl mx-auto mb-2" />
        ) : (
          <div className="text-4xl mb-2">{status === "done" ? "✅" : "📁"}</div>
        )}
        {status === "idle" && (
          <>
            <p className="text-sm font-medium text-gray-700 dark:text-slate-300">
              {isDragActive ? "Drop file here..." : "Drag & drop or click to upload"}
            </p>
            <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">
              {FILE_RULES[accept].label} · Max {FILE_RULES[accept].maxMB}MB
            </p>
          </>
        )}
        {status === "uploading" && (
          <div className="w-full max-w-xs">
            <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">Uploading... {progress}%</p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}
        {status === "done" && (
          <p className="text-sm text-green-600 dark:text-green-400 font-medium">Upload complete!</p>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
