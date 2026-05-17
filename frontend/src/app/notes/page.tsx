import { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Notes & PDFs" };

const NOTES = [
  { id: "1", title: "Kinematics — Complete Notes",           subject: "Physics",     class: "11th", pages: 24, downloads: 312, isFree: true  },
  { id: "2", title: "Organic Chemistry — Reactions",         subject: "Chemistry",   class: "12th", pages: 40, downloads: 287, isFree: true  },
  { id: "3", title: "Differentiation & Integration",         subject: "Mathematics", class: "11th", pages: 18, downloads: 254, isFree: false },
  { id: "4", title: "Newton's Laws — Practice Sheet",         subject: "Physics",     class: "11th", pages: 12, downloads: 198, isFree: true  },
  { id: "5", title: "Electrochemistry Notes",                 subject: "Chemistry",   class: "12th", pages: 30, downloads: 176, isFree: false },
  { id: "6", title: "Coordinate Geometry — Full Chapter",    subject: "Mathematics", class: "12th", pages: 36, downloads: 145, isFree: true  },
  { id: "7", title: "Thermodynamics Notes",                   subject: "Chemistry",   class: "11th", pages: 22, downloads: 132, isFree: false },
  { id: "8", title: "Optics & Wave Optics",                   subject: "Physics",     class: "12th", pages: 28, downloads: 118, isFree: true  },
];

const SUBJECT_COLORS: Record<string, string> = {
  Physics:     "bg-blue-100   text-blue-800",
  Chemistry:   "bg-green-100  text-green-800",
  Mathematics: "bg-indigo-100 text-indigo-800",
  Biology:     "bg-teal-100   text-teal-800",
};

export default function NotesPage() {
  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-5 sm:space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Study Notes & PDFs</h1>
        <p className="text-gray-500 mt-1 text-sm sm:text-base">Download high-quality notes prepared by Mr. Sidsir</p>
      </div>

      {/* Search & Filter — stack on mobile, row on sm+ */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search notes..."
          className="flex-1 input-base"
        />
        <select className="input-base sm:w-40">
          <option value="">All Subjects</option>
          <option>Physics</option>
          <option>Chemistry</option>
          <option>Mathematics</option>
          <option>Biology</option>
        </select>
        <select className="input-base sm:w-36">
          <option value="">All Classes</option>
          <option>10th</option>
          <option>11th</option>
          <option>12th</option>
          <option>Dropper</option>
        </select>
      </div>

      {/* Notes Grid — 1 col mobile, 2 sm, 3 lg, 4 xl */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {NOTES.map((n) => (
          <div key={n.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-4 sm:p-5 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl sm:text-4xl">📄</span>
              {n.isFree ? <Badge variant="success" className="text-xs">FREE</Badge> : <Badge variant="info" className="text-xs">Premium</Badge>}
            </div>
            <h3 className="font-semibold text-gray-800 text-xs sm:text-sm mb-2 line-clamp-2 flex-1">{n.title}</h3>
            <div className="flex gap-2 mb-3 flex-wrap">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${SUBJECT_COLORS[n.subject] ?? "bg-gray-100 text-gray-700"}`}>
                {n.subject}
              </span>
              <span className="text-xs text-gray-400 self-center">Class {n.class}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
              <span>📄 {n.pages} pages</span>
              <span>⬇️ {n.downloads}</span>
            </div>
            <Button size="sm" variant={n.isFree ? "primary" : "outline"} className="w-full text-xs sm:text-sm">
              {n.isFree ? "Download Free" : "Unlock Now"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
