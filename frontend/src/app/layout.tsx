import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider }  from "@/context/AuthContext";
import { Providers }     from "@/providers";
import Header            from "@/app/components/common/Header";
import Sidebar           from "@/app/components/common/Sidebar";
import Footer            from "@/app/components/common/Footer";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { env }           from "@/lib/env";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(env.app.url),
  title: {
    default:  "Concept Coaching Classes — by Mr. Sidsir",
    template: "%s | Concept Coaching Classes",
  },
  description:
    "India's premium online coaching platform by Mr. Sidsir. Expert-led classes in Physics, Chemistry, Mathematics — plus free videos, notes & quizzes.",
  keywords: [
    "coaching classes", "online coaching", "physics classes", "chemistry classes",
    "mathematics", "JEE preparation", "NEET preparation", "Mr. Sidsir",
    "Concept Coaching Classes", "free notes", "online quiz",
  ],
  authors: [{ name: "Mr. Sidsir", url: env.app.url }],
  creator: "Mr. Sidsir",
  publisher: "Concept Coaching Classes",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type:        "website",
    locale:      "en_IN",
    url:         env.app.url,
    siteName:    "Concept Coaching Classes",
    title:       "Concept Coaching Classes — by Mr. Sidsir",
    description: "India's premium online coaching platform. Free videos, notes & quizzes.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Concept Coaching Classes" }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Concept Coaching Classes",
    description: "India's premium online coaching platform by Mr. Sidsir.",
    images:      ["/og-image.png"],
  },
  icons: {
    icon:  [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width:        "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor:   [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)",  color: "#0a0a0f" },
  ],
};

/** Blocking script injected into <head> — prevents flash of wrong theme before hydration */
const themeScript = `(function(){try{var t=localStorage.getItem('ccc-theme');var d=document.documentElement;if(t==='dark'||((!t||t==='system')&&window.matchMedia('(prefers-color-scheme:dark)').matches)){d.classList.add('dark');d.setAttribute('data-theme','dark');}else{d.classList.remove('dark');d.setAttribute('data-theme','light');}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} scroll-smooth`}>
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-white dark:bg-[#0a0a0f] min-h-screen flex flex-col font-sans antialiased transition-colors duration-300">
        <Providers>
          <AuthProvider>
            <ErrorBoundary>
              <Header />
              <div className="flex flex-1 pt-0">
                <Sidebar />
                <main className="flex-1 min-w-0 w-full lg:ml-64 pb-20 lg:pb-0">
                  {children}
                </main>
              </div>
              <div className="hidden lg:block lg:ml-64">
                <Footer />
              </div>
            </ErrorBoundary>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
