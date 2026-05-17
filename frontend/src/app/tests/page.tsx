import { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

export const metadata: Metadata = { title: "Online Tests" };

const TESTS = [
  { id: "1", title: "Physics Mock Test #1 — Kinematics",      subject: "Physics",     class: "11th", questions: 30, duration: 60,  marks: 120, status: "active",    attempts: 84  },
  { id: "2", title: "Chemistry Practice — Organic Reactions",  subject: "Chemistry",   class: "12th", questions: 25, duration: 45,  marks: 100, status: "active",    attempts: 67  },
  { id: "3", title: "Mathematics — Calculus Test",             subject: "Mathematics", class: "12th", questions: 20, duration: 40,  marks: 80,  status: "upcoming",  attempts: 0   },
  { id: "4", title: "Full Syllabus Mock — PCM",                subject: "PCM",         class: "12th", questions: 90, duration: 180, marks: 360, status: "upcoming",  attempts: 0   },
  { id: "5", title: "Physics Chapter Test — Optics",           subject: "Physics",     class: "12th", questions: 15, duration: 30,  marks: 60,  status: "completed", attempts: 123 },
  { id: "6", title: "Chemistry — Electrochemistry Quiz",       subject: "Chemistry",   class: "12th", questions: 20, duration: 30,  marks: 80,  status: "completed", attempts: 95  },
];

const STATUS_BADGE: Record<string, "success" | "warning" | "info"> = {
  active: "success", upcoming: "warning", completed: "info",
};

export default function TestsPage() {
  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-5 sm:space-y-8 animate-fade-in-up">

      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Online Tests</h1>
        <p className="text-gray-500 mt-1 text-sm sm:text-base">Practice with real exam-style tests</p>
      </div>

      {/* Stats — horizontal scroll on tiny screens */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <Card className="text-center p-3 sm:p-4">
          <p className="text-2xl sm:text-3xl font-bold text-blue-600">2</p>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Active</p>
        </Card>
        <Card className="text-center p-3 sm:p-4">
          <p className="text-2xl sm:text-3xl font-bold text-yellow-600">2</p>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Upcoming</p>
        </Card>
        <Card className="text-center p-3 sm:p-4">
          <p className="text-2xl sm:text-3xl font-bold text-green-600">2</p>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Completed</p>
        </Card>
      </div>

      {/* Tests List */}
      <div className="space-y-3 sm:space-y-4">
        {TESTS.map((t) => (
          <div key={t.id} className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 hover:shadow-md transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{t.title}</h3>
                  <Badge variant={STATUS_BADGE[t.status]} className="capitalize text-xs shrink-0">{t.status}</Badge>
                </div>
                {/* Meta — wrap on mobile */}
                <div className="flex flex-wrap gap-2 sm:gap-4 text-xs text-gray-500">
                  <span>📚 {t.subject}</span>
                  <span>🎓 Class {t.class}</span>
                  <span>❓ {t.questions} Qs</span>
                  <span>⏱ {t.duration}m</span>
                  <span>🏆 {t.marks} Marks</span>
                  {t.attempts > 0 && <span>👥 {t.attempts}</span>}
                </div>
              </div>
              <div className="shrink-0 self-start sm:self-auto">
                {t.status === "active" && (
                  <Link href={`/tests/${t.id}`}><Button size="sm" className="text-xs sm:text-sm">Start Test</Button></Link>
                )}
                {t.status === "upcoming" && (
                  <Button size="sm" variant="outline" disabled className="text-xs sm:text-sm">Coming Soon</Button>
                )}
                {t.status === "completed" && (
                  <Link href={`/tests/${t.id}/results`}><Button size="sm" variant="secondary" className="text-xs sm:text-sm">Results</Button></Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Leaderboard */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-orange-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-800">🏆 Leaderboard</h2>
            <p className="text-gray-500 text-xs sm:text-sm">See how you rank against other students</p>
          </div>
          <Button size="sm" variant="outline" className="self-start sm:self-auto text-xs sm:text-sm">View All</Button>
        </div>
        <div className="space-y-2">
          {[
            { rank: 1, name: "Rahul Sharma", score: "98%",  isYou: false },
            { rank: 2, name: "Priya Singh",  score: "95%",  isYou: false },
            { rank: 3, name: "You",          score: "82%",  isYou: true  },
          ].map((s) => (
            <div
              key={s.rank}
              className={`flex items-center gap-3 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm ${s.isYou ? "bg-blue-100 font-semibold" : "bg-white"}`}
            >
              <span className="w-5 sm:w-6 text-center font-bold text-gray-600">#{s.rank}</span>
              <span className="flex-1 text-gray-800 truncate">{s.name}</span>
              <span className="text-blue-600 font-semibold shrink-0">{s.score}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
