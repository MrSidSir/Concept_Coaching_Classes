"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SidBookstoreLink from "./dashboard/componentsApp/SidBookstoreLink";
import { Card } from "@/components/ui/Card";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { SOCIAL_LINKS, BRAND, whatsappChatUrl } from "@/constants/socials";
import { FaPhone, FaWhatsapp, FaYoutube } from "react-icons/fa";

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY!;
const CHANNEL_ID = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID!;

const COURSES = [
  { title: "Physics Foundation", desc: "Conceptual + Numerical clarity for Boards & JEE", icon: "⚛️", color: "from-blue-500 to-blue-700" },
  { title: "Mathematics Crash", desc: "Boards + Competitive mix with shortcuts", icon: "📐", color: "from-indigo-500 to-indigo-700" },
  { title: "Chemistry Masterclass", desc: "Organic + Inorganic + Physical Chemistry", icon: "🧪", color: "from-green-500 to-green-700" },
];

const FACULTY = [
  { name: "Mr. Sidsir", subject: "Director | Chemistry Expert", avatar: "👨‍🏫", qual: "B.Sc. PCM · M.Sc. Chemistry · B.Ed. · MCA (ML) — Amity" },
  { name: "Ms. Ayesha", subject: "Mathematics Expert", avatar: "👩‍🏫", qual: "M.Sc. Mathematics · JEE Advanced Specialist" },
  { name: "Mr. Tanweer", subject: "Physics Specialist", avatar: "👨‍🔬", qual: "M.Sc. Physics · NEET & JEE Expert" },
];

const FEATURES = [
  { icon: "🎬", title: "Live & Recorded Lectures", desc: "High-quality video lectures accessible anytime" },
  { icon: "📝", title: "Structured Notes & PDFs", desc: "Download comprehensive study material for free" },
  { icon: "✏️", title: "Online Mock Tests", desc: "Practice with real exam-style tests and instant results" },
  { icon: "📊", title: "Progress Analytics", desc: "Track your improvement with detailed performance reports" },
  { icon: "🔔", title: "Instant Notifications", desc: "Never miss a class, test, or important announcement" },
  { icon: "🏆", title: "Leaderboard & Badges", desc: "Stay motivated with gamified learning rewards" },
];

const TESTS = [
  { subject: "Physics Mock Test", date: "01 July 2025", color: "bg-blue-100 text-blue-800" },
  { subject: "Chemistry Practice", date: "05 July 2025", color: "bg-green-100 text-green-800" },
  { subject: "Full Syllabus Math Test", date: "10 July 2025", color: "bg-indigo-100 text-indigo-800" },
];

export default function Home() {
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    if (!API_KEY || !CHANNEL_ID) return;
    fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=3`
    )
      .then((r) => r.json())
      .then((data) => {
        if (data.items) setVideos(data.items.filter((i: any) => i.id.kind === "youtube#video"));
      })
      .catch(() => {});
  }, []);

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white py-16 sm:py-20 lg:py-28 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute -top-10 -left-10 w-48 sm:w-80 h-48 sm:h-80 bg-white rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -right-10 w-64 sm:w-96 h-64 sm:h-96 bg-indigo-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-block bg-white/20 backdrop-blur text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 rounded-full mb-4 sm:mb-6">
            🎓 India&apos;s Premium Online Coaching Platform
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 sm:mb-6">
            Welcome to{" "}
            <span className="text-yellow-300">Concept Coaching</span>
            <br className="hidden sm:block" />
            {" "}<span className="text-blue-200">Classes</span>
          </h1>
          <p className="text-sm sm:text-base lg:text-xl text-blue-100 max-w-2xl mx-auto mb-8 sm:mb-10 px-2">
            Expert-led classes in Physics, Chemistry & Mathematics — by{" "}
            <strong className="text-white">Mr. Sidsir</strong>. Anytime, anywhere.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-0">
            <Link href="/register" className="px-6 sm:px-8 py-3 bg-yellow-400 text-blue-900 rounded-xl font-bold text-sm sm:text-base hover:bg-yellow-300 transition shadow-lg tap-highlight-none">
              Start Learning Free →
            </Link>
            <Link href="/courses" className="px-6 sm:px-8 py-3 border-2 border-white/50 text-white rounded-xl font-semibold text-sm sm:text-base hover:bg-white/10 transition tap-highlight-none">
              Explore Courses
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-14">
            {[["500+", "Students"], ["50+", "Courses"], ["1000+", "Videos"], ["95%", "Success Rate"]].map(([val, label]) => (
              <div key={label} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-yellow-300">{val}</p>
                <p className="text-blue-200 text-xs sm:text-sm mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Everything You Need to Succeed</h2>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">Built for students, designed for results</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {FEATURES.map((f) => (
              <Card key={f.title} className="hover:shadow-md transition-shadow">
                <div className="text-3xl sm:text-4xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">{f.title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Courses ── */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Featured Courses</h2>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">Handcrafted by expert educators</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {COURSES.map((c) => (
              <div key={c.title} className={`bg-gradient-to-br ${c.color} text-white rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-shadow`}>
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{c.icon}</div>
                <h3 className="text-base sm:text-xl font-bold mb-2">{c.title}</h3>
                <p className="text-white/80 text-xs sm:text-sm mb-4">{c.desc}</p>
                <Link href="/courses" className="inline-block bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition">
                  View Course →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-blue-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-4 sm:mb-6">
            About Concept Coaching Classes
          </h2>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
            Led by <strong>Mr. Sidsir</strong> — B.Sc. (PCM), M.Sc. Chemistry, B.Ed., MCA (ML) from Amity University —
            Concept Coaching Classes is a future-ready educational platform combining innovative teaching,
            online resources, and personalized learning to help every student reach their full potential.
          </p>
          <div className="mt-6 sm:mt-8 flex justify-center">
            <SidBookstoreLink />
          </div>
        </div>
      </section>

      {/* ── Faculty ── */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Meet Our Faculty</h2>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">Learn from the best educators in the field</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {FACULTY.map((f) => (
              <Card key={f.name} className="text-center hover:shadow-md transition-shadow">
                <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">{f.avatar}</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">{f.name}</h3>
                <p className="text-blue-600 font-medium text-xs sm:text-sm mb-2">{f.subject}</p>
                <p className="text-gray-500 text-xs">{f.qual}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Upcoming Tests ── */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Upcoming Tests</h2>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">Stay prepared — never miss a test</p>
          </div>
          <div className="space-y-3">
            {TESTS.map((t) => (
              <div key={t.subject} className="flex flex-col sm:flex-row sm:items-center justify-between bg-white rounded-xl px-4 sm:px-6 py-3 sm:py-4 shadow-sm border border-gray-100 gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-xl sm:text-2xl">📅</span>
                  <span className="font-medium text-gray-800 text-sm sm:text-base">{t.subject}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold self-start sm:self-auto ${t.color}`}>{t.date}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-6 sm:mt-8">
            <Link href="/tests" className="inline-block px-6 py-2.5 border border-blue-600 text-blue-600 rounded-xl text-sm font-medium hover:bg-blue-50 transition">
              View All Tests
            </Link>
          </div>
        </div>
      </section>

      {/* ── Demo Videos ── */}
      {videos.length > 0 && (
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Demo Videos</h2>
              <p className="text-gray-500 mt-2 text-sm sm:text-base">Watch our latest lectures from YouTube</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {videos.map((video) => (
                <div key={video.id.videoId} className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="aspect-video w-full">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${video.id.videoId}`}
                      title={video.snippet.title}
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <div className="bg-white px-4 py-3">
                    <p className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-1">{video.snippet.title}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-6 sm:mt-8">
              <a
                href={`https://www.youtube.com/channel/${CHANNEL_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition"
              >
                View All on YouTube →
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-gradient-to-r from-blue-700 to-indigo-700 text-white text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-3 sm:mb-4">
          Ready to Start Your Journey?
        </h2>
        <p className="text-blue-200 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-xl mx-auto">
          Join hundreds of students already learning with Concept Coaching Classes.
        </p>
        <Link href="/register" className="inline-block px-8 sm:px-10 py-3 bg-yellow-400 text-blue-900 rounded-xl font-bold text-sm sm:text-base hover:bg-yellow-300 transition shadow-lg tap-highlight-none">
          Join Now — It&apos;s Free!
        </Link>
      </section>

      {/* ── Contact / Social Section ── */}
      <section className="py-12 sm:py-16 px-4 bg-white dark:bg-[#0a0a0f]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-2">
              Connect With Us
            </h2>
            <p className="text-gray-500 dark:text-slate-400 text-sm">
              Reach out on any platform — we reply fast!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* WhatsApp */}
            <a
              href={whatsappChatUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl border border-gray-100 dark:border-[#33334b] bg-white dark:bg-[#1a1a28] hover:border-[#25D366]/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
                <FaWhatsapp className="text-2xl text-[#25D366]" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-900 dark:text-white text-sm">WhatsApp</p>
                <p className="text-xs text-gray-400 mt-0.5">Chat directly</p>
              </div>
            </a>

            {/* Phone */}
            <a
              href={SOCIAL_LINKS.phoneHref}
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl border border-gray-100 dark:border-[#33334b] bg-white dark:bg-[#1a1a28] hover:border-blue-400/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20 transition-colors">
                <FaPhone className="text-2xl text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-900 dark:text-white text-sm">Call Us</p>
                <p className="text-xs text-gray-400 mt-0.5">{SOCIAL_LINKS.phone}</p>
              </div>
            </a>

            {/* YouTube */}
            <a
              href={SOCIAL_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl border border-gray-100 dark:border-[#33334b] bg-white dark:bg-[#1a1a28] hover:border-red-400/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center group-hover:bg-red-100 dark:group-hover:bg-red-500/20 transition-colors">
                <FaYoutube className="text-2xl text-[#FF0000]" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-900 dark:text-white text-sm">YouTube</p>
                <p className="text-xs text-gray-400 mt-0.5">Free lectures</p>
              </div>
            </a>

            {/* All Social */}
            <div className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-gray-100 dark:border-[#33334b] bg-white dark:bg-[#1a1a28]">
              <p className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">
                Follow Us
              </p>
              <SocialLinks size="md" gap="gap-3" />
              <p className="text-xs text-gray-400 text-center">
                Stay updated on all platforms
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
