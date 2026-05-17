export type UserRole = "public" | "student" | "teacher" | "admin" | "super_admin";

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  photoURL: string;
  role: UserRole;
  phone?: string;
  class?: string;
  enrolledCourses?: string[];
  createdAt: string;
  updatedAt: string;
  status: "active" | "inactive" | "blocked";
}

export interface Course {
  id: string;
  title: string;
  description: string;
  subject: "physics" | "chemistry" | "mathematics" | "biology" | "other";
  class: string;
  teacherId: string;
  thumbnailUrl: string;
  price: number;
  isFree: boolean;
  totalVideos: number;
  totalNotes: number;
  enrolledCount: number;
  status: "draft" | "published" | "archived";
  createdAt: string;
  updatedAt: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  courseId: string;
  subject: string;
  class: string;
  duration: string;
  order: number;
  status: "published" | "draft";
  createdAt: string;
}

export interface Note {
  id: string;
  title: string;
  description: string;
  pdfUrl: string;
  subject: string;
  class: string;
  courseId?: string;
  uploadedBy: string;
  downloadCount: number;
  status: "published" | "draft";
  createdAt: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  marks: number;
}

export interface Test {
  id: string;
  title: string;
  subject: string;
  class: string;
  duration: number;
  totalMarks: number;
  questions: Question[];
  scheduledAt?: string;
  status: "draft" | "active" | "completed";
  createdBy: string;
  createdAt: string;
}

export interface TestResult {
  id: string;
  studentId: string;
  testId: string;
  score: number;
  totalMarks: number;
  percentage: number;
  answers: Record<string, number>;
  timeTaken: number;
  submittedAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  targetRole: UserRole | "all";
  createdBy: string;
  createdAt: string;
  expiresAt?: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}
