"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY!;
const CHANNEL_ID = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID!;

const DEMO_VIDEOS = [
  { id: "demo1", title: "Kinematics — Introduction & Basics",         subject: "Physics",     duration: "45 min", class: "11th" },
  { id: "demo2", title: "Organic Chemistry — Reaction Mechanisms",    subject: "Chemistry",   duration: "52 min", class: "12th" },
  { id: "demo3", title: "Differentiation & Integration — Part 1",    subject: "Mathematics", duration: "38 min", class: "11th" },
  { id: "demo4", title: "Newton's Laws of Motion — Deep Dive",        subject: "Physics",     duration: "60 min", class: "11th" },
];

export default function VideosPage() {
  const [ytVideos, setYtVideos] = useState<any[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (!API_KEY || !CHANNEL_ID) return;
    fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=6`
    )
      .then((r) => r.json())
      .then((d) => { if (d.items) setYtVideos(d.items.filter((i: any) => i.id.kind === "youtube#video")); })
      .catch(() => {});
  }, []);

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Video Lectures</h1>
        <p className="text-gray-500 mt-1 text-sm sm:text-base">Watch expert lectures by Mr. Sidsir and faculty</p>
      </div>

      {/* YouTube Videos */}
      {ytVideos.length > 0 && (
        <section>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Latest from YouTube Channel</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {ytVideos.map((v) => (
              <div key={v.id.videoId} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="relative group">
                  <img
                    src={v.snippet.thumbnails.medium.url}
                    alt={v.snippet.title}
                    className="w-full aspect-video object-cover"
                  />
                  <button
                    onClick={() => setSelected(v.id.videoId)}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition tap-highlight-none"
                    aria-label="Play video"
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-600 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl shadow-lg">
                      ▶
                    </div>
                  </button>
                </div>
                <div className="p-3 sm:p-4">
                  <p className="text-xs sm:text-sm font-semibold text-gray-800 line-clamp-2">{v.snippet.title}</p>
                  <p className="text-xs text-gray-400 mt-1">{new Date(v.snippet.publishedAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Video Player Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-3 sm:p-6">
          <div className="bg-white rounded-2xl overflow-hidden w-full max-w-3xl shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Now Playing</h3>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-500 hover:text-gray-800 text-xl p-1 tap-highlight-none"
                aria-label="Close player"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selected}?autoplay=1`}
                title="Video Player"
                allowFullScreen
                allow="autoplay"
              />
            </div>
          </div>
        </div>
      )}

      {/* Course Videos */}
      <section>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Course Lectures</h2>
        <div className="space-y-2 sm:space-y-3">
          {DEMO_VIDEOS.map((v, i) => (
            <div key={v.id} className="bg-white border border-gray-100 rounded-xl px-4 sm:px-5 py-3 sm:py-4 flex items-center gap-3 sm:gap-4 hover:shadow-sm transition">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700 font-bold text-xs sm:text-sm shrink-0">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 text-xs sm:text-sm truncate">{v.title}</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  <Badge variant="info" className="text-xs">{v.subject}</Badge>
                  <span className="text-xs text-gray-400">Class {v.class}</span>
                  <span className="text-xs text-gray-400 hidden sm:inline">⏱ {v.duration}</span>
                </div>
              </div>
              <button
                className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition text-sm tap-highlight-none"
                aria-label="Play"
              >
                ▶
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
