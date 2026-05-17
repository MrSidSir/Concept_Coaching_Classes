export const CATEGORIES = [
  "Web Development", "Mobile App Development", "ReactJS", "Next.js",
  "Node.js", "MongoDB", "Firebase", "Flutter", "React Native",
  "JavaScript", "TypeScript", "Python", "DSA", "Interview Questions",
  "HTML/CSS", "Tailwind CSS", "Machine Learning",
  "Physics", "Chemistry", "Mathematics", "Biology",
] as const;

export type Category = typeof CATEGORIES[number];

export type ContentStatus = "draft" | "published" | "archived";
export type ContentType   = "video" | "note" | "quiz" | "image" | "solution" | "resource";

export interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  slug: string;
  description: string;
  thumbnailUrl: string;
  category: Category;
  tags: string[];
  author: string;
  status: ContentStatus;
  featured: boolean;
  viewCount: number;
  downloadCount: number;
  seo?: { title?: string; description?: string; keywords?: string[] };
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface VideoContent extends ContentItem {
  type: "video";
  videoUrl?: string;
  youtubeId?: string;
  duration?: string;
  playlistId?: string;
}

export interface NoteContent extends ContentItem {
  type: "note";
  pdfUrl: string;
  pages: number;
  fileSize: string;
  isFree: boolean;
  previewUrl?: string;
}

export interface QuizQuestion {
  id: string;
  type: "mcq" | "output" | "theory" | "dsa";
  question: string;
  options?: string[];
  correctAnswer: number | string;
  explanation: string;
  code?: string;
  difficulty: "easy" | "medium" | "hard";
  marks: number;
}

export interface QuizContent extends ContentItem {
  type: "quiz";
  questions: QuizQuestion[];
  duration: number;
  totalMarks: number;
  passingMarks: number;
  attempts: number;
}

export interface UploadProgress {
  fileName: string;
  progress: number;
  status: "uploading" | "success" | "error";
  url?: string;
  error?: string;
}
