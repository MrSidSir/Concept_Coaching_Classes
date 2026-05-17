import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-8 sm:py-10 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-6">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center font-bold text-sm">C</div>
              <h2 className="text-base font-bold">Concept Coaching Classes</h2>
            </div>
            <p className="text-blue-300 text-sm">Empowering Students — Led by Mr. Sidsir</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-blue-200 mb-3 uppercase tracking-wide">Quick Links</h3>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { label: "Home",     href: "/" },
                { label: "Courses",  href: "/courses" },
                { label: "Videos",   href: "/videos" },
                { label: "Notes",    href: "/notes" },
                { label: "Tests",    href: "/tests" },
                { label: "Login",    href: "/login" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="text-blue-300 hover:text-white text-sm transition">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-blue-200 mb-3 uppercase tracking-wide">Contact</h3>
            <div className="space-y-1 text-sm text-blue-300">
              <p>📧 conceptcoaching@gmail.com</p>
              <p>📱 +91 XXXXX XXXXX</p>
              <a
                href={`https://www.youtube.com/channel/${process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID ?? ""}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-red-400 hover:text-red-300 transition"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                YouTube Channel
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-blue-400">
          <p>© {new Date().getFullYear()} Concept Coaching Classes. All rights reserved.</p>
          <p>Built with ❤️ by Mr. Sidsir</p>
        </div>
      </div>
    </footer>
  );
}
