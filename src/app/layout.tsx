import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/context/ThemeContext";
import { I18nProvider } from "@/context/I18nContext";
import { StructuredData } from "@/components/StructuredData";
import "./globals.css";

// Production canonical domain is pending deployment confirmation.
// Defaults dynamically to NEXT_PUBLIC_SITE_URL or local runtime (http://localhost:3000).
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "theemrandev | Frontend Developer — Md Emran Chokder",
    template: "%s | theemrandev — Md Emran Chokder",
  },
  description:
    "Md Emran Chokder (theemrandev) is a Frontend Developer from Bangladesh specializing in React.js, Next.js, TypeScript, and responsive web development.",
  keywords: [
    "theemrandev",
    "Md Emran Chokder",
    "Frontend Developer",
    "Frontend Developer Bangladesh",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "React.js",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Responsive Web Development",
    "Web Developer Bangladesh",
    "Frontend Engineer Portfolio",
    "UI/UX Implementation",
    "JavaScript ES6+",
  ],
  authors: [{ name: "Md Emran Chokder", url: "https://github.com/theemrandev" }],
  creator: "Md Emran Chokder",
  publisher: "theemrandev",
  applicationName: "theemrandev Portfolio",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "theemrandev | Frontend Developer — Md Emran Chokder",
    description:
      "Md Emran Chokder (theemrandev) is a Frontend Developer from Bangladesh specializing in React.js, Next.js, TypeScript, and responsive web development.",
    url: siteUrl,
    siteName: "theemrandev — Md Emran Chokder",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/md-emran-chokder-theemrandev-portfolio-banner.png",
        width: 1983,
        height: 793,
        alt: "theemrandev | Frontend Developer — Md Emran Chokder Portfolio Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "theemrandev | Frontend Developer — Md Emran Chokder",
    description:
      "Md Emran Chokder (theemrandev) is a Frontend Developer from Bangladesh specializing in React.js, Next.js, TypeScript, and responsive web development.",
    images: ["/md-emran-chokder-theemrandev-portfolio-banner.png"],
    creator: "@theemrandev",
    site: "@theemrandev",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0b0d" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="preload" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light" />
        <StructuredData />
        <link
          rel="preload"
          as="image"
          type="image/avif"
          href="/md-emran-chokder-theemrandev-portfolio-banner.avif"
          imageSrcSet="/md-emran-chokder-theemrandev-portfolio-banner-800.avif 800w, /md-emran-chokder-theemrandev-portfolio-banner-1200.avif 1200w, /md-emran-chokder-theemrandev-portfolio-banner.avif 1983w"
          imageSizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1024px"
          fetchPriority="high"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                // Ensure default theme is strictly pure white (#FFFFFF)
                // Overrides any stale legacy "dark" value previously written to localStorage
                var v2Theme = localStorage.getItem("portfolio_theme_v2");
                if (!v2Theme) {
                  v2Theme = "light";
                  localStorage.setItem("portfolio_theme_v2", "light");
                  localStorage.setItem("portfolio_theme", "light");
                }
                var isDark = v2Theme === "dark";
                if (isDark) {
                  document.documentElement.classList.add("dark");
                } else {
                  document.documentElement.classList.remove("dark");
                }
                var meta = document.querySelector('meta[name="color-scheme"]');
                if (meta) {
                  meta.setAttribute("content", isDark ? "dark" : "light");
                }
                var lang = localStorage.getItem("portfolio_lang");
                if (lang) {
                  document.documentElement.lang = lang;
                  if (["ar", "ur", "fa"].includes(lang)) {
                    document.documentElement.dir = "rtl";
                  }
                }
              } catch (e) {}
              function removePreload() {
                requestAnimationFrame(function() {
                  document.documentElement.classList.remove("preload");
                });
              }
              if (document.readyState === "loading") {
                window.addEventListener("DOMContentLoaded", removePreload);
              } else {
                removePreload();
              }
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen relative selection:bg-editorial-accent selection:text-white bg-white dark:bg-[#0a0b0d] text-slate-900 dark:text-neutral-100">
        <ThemeProvider>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
