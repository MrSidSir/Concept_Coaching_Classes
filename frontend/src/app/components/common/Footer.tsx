import Link from "next/link";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { SOCIAL_LINKS, BRAND } from "@/constants/socials";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const QUICK_LINKS = [
  { label: "Home",       href: "/"        },
  { label: "Courses",    href: "/courses" },
  { label: "Videos",     href: "/videos"  },
  { label: "Notes",      href: "/notes"   },
  { label: "Quizzes",    href: "/quizzes" },
  { label: "Tests",      href: "/tests"   },
];

const ACCOUNT_LINKS = [
  { label: "Login",            href: "/login"           },
  { label: "Register",         href: "/register"        },
  { label: "Student Dashboard",href: "/dashboard"       },
  { label: "Forgot Password",  href: "/forgot-password" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 dark:bg-[#07070f] text-gray-300 border-t border-gray-800 dark:border-[#1a1a28]">
      {/* ── Main footer grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-base shadow-lg">
              C
            </div>
            <div>
              <p className="font-bold text-white text-sm leading-tight">{BRAND.name}</p>
              <p className="text-[10px] text-gray-500 leading-tight">{BRAND.tagline}</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed mb-5">
            India&apos;s premium online coaching platform for Physics, Chemistry &amp; Mathematics — JEE, NEET &amp; Board preparation by <span className="text-white font-medium">{BRAND.teacher}</span>.
          </p>
          <SocialLinks size="sm" gap="gap-2" />
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
            Explore
          </h3>
          <ul className="space-y-2.5">
            {QUICK_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-xs text-gray-400 hover:text-white transition-colors duration-150 hover:translate-x-0.5 inline-block"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
            Account
          </h3>
          <ul className="space-y-2.5">
            {ACCOUNT_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-xs text-gray-400 hover:text-white transition-colors duration-150 hover:translate-x-0.5 inline-block"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
            Contact Us
          </h3>
          <ul className="space-y-3">
            <li>
              <a
                href={SOCIAL_LINKS.phoneHref}
                className="flex items-center gap-2.5 text-xs text-gray-400 hover:text-white transition-colors group"
              >
                <FaPhone className="text-blue-400 group-hover:text-blue-300 shrink-0" />
                {SOCIAL_LINKS.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${BRAND.email}`}
                className="flex items-center gap-2.5 text-xs text-gray-400 hover:text-white transition-colors group"
              >
                <FaEnvelope className="text-blue-400 group-hover:text-blue-300 shrink-0" />
                {BRAND.email}
              </a>
            </li>
            <li>
              <span className="flex items-start gap-2.5 text-xs text-gray-400">
                <FaMapMarkerAlt className="text-blue-400 mt-0.5 shrink-0" />
                {BRAND.location}
              </span>
            </li>
          </ul>

          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/917355534404?text=${encodeURIComponent("Hello Sir, I want information about Concept Coaching Classes.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-xs font-medium hover:bg-[#25D366]/20 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.118 1.524 5.855L0 24l6.334-1.51A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.013-1.38l-.36-.214-3.727.888.927-3.622-.235-.372A9.818 9.818 0 1112 21.818z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-gray-800 dark:border-[#1a1a28]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-gray-500 text-center sm:text-left">
            © {year} {BRAND.name}. All rights reserved. Built with ❤️ by {BRAND.teacher}.
          </p>
          <div className="flex items-center gap-4 text-[11px] text-gray-500">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy</Link>
            <Link href="/terms"   className="hover:text-gray-300 transition-colors">Terms</Link>
            <Link href="/sitemap.xml" className="hover:text-gray-300 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
