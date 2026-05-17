import { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export const metadata: Metadata = { title: "Courses" };

const COURSES = [
  { id: "1", title: "Physics Foundation",       subject: "Physics",     class: "11th & 12th", desc: "Complete conceptual + numerical for Boards and JEE.",     videos: 42, notes: 15, icon: "⚛️", color: "from-blue-500 to-blue-700",    isFree: false, price: 999  },
  { id: "2", title: "Chemistry Masterclass",     subject: "Chemistry",   class: "11th & 12th", desc: "Organic + Inorganic + Physical — full NCERT and beyond.", videos: 58, notes: 20, icon: "🧪", color: "from-green-500 to-green-700",  isFree: false, price: 999  },
  { id: "3", title: "Mathematics Crash Course",  subject: "Mathematics", class: "10th–12th",   desc: "Boards + Competitive math with shortcuts & tricks.",       videos: 35, notes: 12, icon: "📐", color: "from-indigo-500 to-indigo-700",isFree: false, price: 799  },
  { id: "4", title: "Class 10 Science Booster",  subject: "Science",     class: "10th",        desc: "Complete Class 10 Science for Board Exam.",                videos: 28, notes: 10, icon: "🔬", color: "from-teal-500 to-teal-700",    isFree: true,  price: 0    },
  { id: "5", title: "Dropper Batch — Full",       subject: "PCM",         class: "Dropper",     desc: "Intensive revision for JEE/NEET droppers — all subjects.",videos: 90, notes: 35, icon: "🏆", color: "from-orange-500 to-red-600",   isFree: false, price: 1999 },
  { id: "6", title: "Biology Foundation",         subject: "Biology",     class: "11th & 12th", desc: "Complete Biology for NEET — Botany + Zoology.",           videos: 45, notes: 18, icon: "🌱", color: "from-emerald-500 to-green-600",isFree: false, price: 999  },
];

export default function CoursesPage() {
  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-fade-in-up">

      {/* Header */}
      <div className="text-center py-4 sm:py-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">All Courses</h1>
        <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
          Expert-designed courses for Boards, JEE & NEET — taught by Mr. Sidsir and team.
        </p>
      </div>

      {/* Filter chips — horizontally scrollable on mobile */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center">
        {["All", "Physics", "Chemistry", "Mathematics", "Biology", "Science", "PCM"].map((f) => (
          <button
            key={f}
            className="px-4 py-1.5 rounded-full border border-gray-200 text-xs sm:text-sm text-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition shrink-0 tap-highlight-none"
          >
            {f}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {COURSES.map((c) => (
          <div key={c.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col">
            <div className={`bg-gradient-to-br ${c.color} p-5 sm:p-6 text-white`}>
              <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">{c.icon}</div>
              <Badge className="bg-white/20 text-white border-0 text-xs mb-2">{c.class}</Badge>
              <h3 className="text-base sm:text-lg font-bold">{c.title}</h3>
            </div>
            <div className="p-4 sm:p-5 flex flex-col flex-1">
              <p className="text-gray-500 text-xs sm:text-sm mb-3 flex-1">{c.desc}</p>
              <div className="flex gap-3 sm:gap-4 text-xs text-gray-400 mb-3 sm:mb-4">
                <span>🎬 {c.videos} Videos</span>
                <span>📝 {c.notes} Notes</span>
              </div>
              <div className="flex items-center justify-between">
                {c.isFree ? (
                  <Badge variant="success" className="text-xs sm:text-sm">FREE</Badge>
                ) : (
                  <span className="text-base sm:text-lg font-bold text-blue-700">₹{c.price}</span>
                )}
                <Link href={`/courses/${c.id}`}>
                  <Button size="sm" className="text-xs sm:text-sm">Enroll Now</Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
