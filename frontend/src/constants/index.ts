export const APP_NAME = "Concept Coaching Classes";
export const APP_TAGLINE = "Empowering Students — Led by Mr. Sidsir";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const SUBJECTS = ["Physics", "Chemistry", "Mathematics", "Biology"] as const;
export const CLASSES = ["9th", "10th", "11th", "12th", "Dropper"] as const;

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  COURSES: "/courses",
  VIDEOS: "/videos",
  NOTES: "/notes",
  TESTS: "/tests",
  ADMIN: "/admin",
  ADMIN_STUDENTS: "/admin/students",
  ADMIN_COURSES: "/admin/courses",
  ADMIN_VIDEOS: "/admin/videos",
  ADMIN_TESTS: "/admin/tests",
  ADMIN_NOTES: "/admin/notes",
  ADMIN_ANNOUNCEMENTS: "/admin/announcements",
  FORGOT_PASSWORD: "/forgot-password",
} as const;

export const ROLE_PERMISSIONS = {
  student: ["dashboard", "courses", "videos", "notes", "tests"],
  teacher: ["dashboard", "courses", "videos", "notes", "tests", "create_content"],
  admin: ["dashboard", "courses", "videos", "notes", "tests", "create_content", "manage_users", "admin"],
  super_admin: ["all"],
} as const;

export const FIRESTORE_COLLECTIONS = {
  USERS: "users",
  COURSES: "courses",
  VIDEOS: "videos",
  NOTES: "notes",
  TESTS: "tests",
  QUESTIONS: "questions",
  RESULTS: "results",
  ATTENDANCE: "attendance",
  ANNOUNCEMENTS: "announcements",
  PAYMENTS: "payments",
} as const;
