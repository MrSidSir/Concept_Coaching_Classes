import "@testing-library/jest-dom";
import { vi } from "vitest";

// ── Next.js mocks ────────────────────────────────────────────────────────────
vi.mock("next/navigation", () => ({
  useRouter:   () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() }),
  usePathname: () => "/",
  redirect:    vi.fn(),
}));

vi.mock("next/font/google", () => ({
  Inter: () => ({ variable: "--font-inter", className: "font-inter" }),
}));

// ── Firebase mocks ────────────────────────────────────────────────────────────
vi.mock("@/lib/firebase/config", () => ({
  auth:             {},
  db:               {},
  storage:          {},
  googleProvider:   {},
  facebookProvider: {},
  default:          {},
}));

vi.mock("firebase/auth", () => ({
  getAuth:                    vi.fn(() => ({})),
  onAuthStateChanged:         vi.fn(),
  signInWithPopup:            vi.fn(),
  signOut:                    vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  sendPasswordResetEmail:     vi.fn(),
  updateProfile:              vi.fn(),
  GoogleAuthProvider:         vi.fn(() => ({})),
  FacebookAuthProvider:       vi.fn(() => ({})),
}));

vi.mock("firebase/firestore", () => ({
  getFirestore: vi.fn(() => ({})),
  doc:          vi.fn(),
  getDoc:       vi.fn(() => ({ exists: () => false, data: () => ({}) })),
  setDoc:       vi.fn(),
  updateDoc:    vi.fn(),
  deleteDoc:    vi.fn(),
  addDoc:       vi.fn(() => ({ id: "mock-id" })),
  getDocs:      vi.fn(() => ({ docs: [] })),
  query:        vi.fn(),
  collection:   vi.fn(),
  where:        vi.fn(),
  orderBy:      vi.fn(),
  limit:        vi.fn(),
  serverTimestamp: vi.fn(() => new Date()),
}));

vi.mock("firebase/storage", () => ({
  getStorage:          vi.fn(() => ({})),
  ref:                 vi.fn(),
  uploadBytesResumable:vi.fn(),
  getDownloadURL:      vi.fn(() => "https://example.com/file.pdf"),
  deleteObject:        vi.fn(),
}));

// ── react-hot-toast mock ──────────────────────────────────────────────────────
vi.mock("react-hot-toast", () => ({
  default:  { success: vi.fn(), error: vi.fn() },
  Toaster:  () => null,
}));
