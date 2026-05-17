"use client";

import { useAuth } from "@/context/AuthContext";
import { StatCard, Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const QUICK_LINKS = [
  { label: "My Courses",     href: "/courses",   icon: "📚", desc: "Continue where you left off" },
  { label: "Video Lectures", href: "/videos",    icon: "🎬", desc: "Watch latest lectures" },
  { label: "Study Notes",    href: "/notes",     icon: "📝", desc: "Download PDFs" },
  { label: "Take a Test",    href: "/tests",     icon: "✏️",  desc: "Practice & improve" },
];

const RECENT_ACTIVITY = [
  { action: "Watched",    item: "Kinematics — Part 3",                time: "2 hours ago", icon: "🎬" },
  { action: "Downloaded", item: "Organic Chemistry Notes",            time: "Yesterday",   icon: "📝" },
  { action: "Completed",  item: "Physics Mock Test #2 — Score: 85%", time: "2 days ago",  icon: "✅" },
];

const ANNOUNCEMENTS = [
  { title: "New Physics Lectures Added!",                    time: "Today",     tag: "New"    },
  { title: "Chemistry Notes Updated for Board Exam",         time: "2 days ago",tag: "Update" },
  { title: "Math Mock Test scheduled for July 10",           time: "3 days ago",tag: "Test"   },
];

export default function DashboardPage() {
  const { user, role } = useAuth();

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-fade-in-up">

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-5 sm:p-6 flex items-center justify-between overflow-hidden">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold mb-1">
            Welcome back, {user?.displayName?.split(" ")[0] ?? "Student"} 👋
          </h1>
          <p className="text-blue-200 text-xs sm:text-sm">Continue your learning journey today</p>
          <Badge className="mt-2 sm:mt-3 bg-white/20 text-white border-0 capitalize text-xs">{role}</Badge>
        </div>
        <div className="hidden sm:block text-6xl lg:text-7xl opacity-20 select-none">🎓</div>
      </div>

      {/* Stats — 2 col on mobile, 4 on lg */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard label="Courses Enrolled" value="3"   icon="📚" color="blue"   />
        <StatCard label="Videos Watched"   value="47"  icon="🎬" color="purple" />
        <StatCard label="Tests Attempted"  value="12"  icon="✏️"  color="orange" />
        <StatCard label="Avg. Score"       value="82%" icon="🏆" color="green"  />
      </div>

      {/* Quick Actions — 2 col mobile, 4 desktop */}
      <div>
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {QUICK_LINKS.map((q) => (
            <Link key={q.href} href={q.href}>
              <Card className="hover:shadow-md hover:border-blue-200 transition-all cursor-pointer h-full p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{q.icon}</div>
                <h3 className="font-semibold text-gray-800 text-sm">{q.label}</h3>
                <p className="text-gray-500 text-xs mt-1 hidden sm:block">{q.desc}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Activity + Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-2 sm:space-y-3">
            {RECENT_ACTIVITY.map((a) => (
              <div key={a.item} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                <span className="text-lg sm:text-xl shrink-0">{a.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-800 truncate">{a.action}: {a.item}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Announcements</h2>
          <div className="space-y-2 sm:space-y-3">
            {ANNOUNCEMENTS.map((a) => (
              <div key={a.title} className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                <span className="text-lg sm:text-xl shrink-0">📢</span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <p className="text-xs sm:text-sm font-medium text-gray-800 flex-1 min-w-0 truncate">{a.title}</p>
                    <Badge
                      variant={a.tag === "New" ? "success" : a.tag === "Test" ? "warning" : "info"}
                      className="text-xs shrink-0"
                    >
                      {a.tag}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Progress */}
      <Card>
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Course Progress</h2>
        <div className="space-y-4">
          {[
            { name: "Physics Foundation",       progress: 65, color: "bg-blue-500"   },
            { name: "Chemistry Masterclass",     progress: 40, color: "bg-green-500"  },
            { name: "Mathematics Crash Course",  progress: 80, color: "bg-indigo-500" },
          ].map((c) => (
            <div key={c.name}>
              <div className="flex justify-between text-xs sm:text-sm mb-1">
                <span className="text-gray-700 font-medium truncate pr-2">{c.name}</span>
                <span className="text-gray-500 shrink-0">{c.progress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className={`${c.color} h-2 rounded-full transition-all duration-500`} style={{ width: `${c.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
