import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import AuthManager from "@/components/auth/AuthManager";
import "./globals.css";
import { cn } from "@/lib/utils";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const siteName = "Yuşa Duymaz";
const title = "Yuşa Duymaz — Web Tasarımcı & Geliştirici";
const description =
  "Data Science, AI ve Full-Stack geliştirme alanlarında premium web tasarım, geliştirme ve SEO hizmetleri. Yüksek performanslı, ölçeklenebilir dijital ürünler.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Yuşa Duymaz",
  },
  description,
  applicationName: siteName,
  generator: "Next.js",
  keywords: [
    "web tasarım", "web geliştirme", "full-stack developer", "data science",
    "yapay zeka", "AI engineering", "SEO", "Next.js", "portfolyo",
  ],
  authors: [{ name: "Muhammed Yuşa Duymaz", url: siteUrl }],
  creator: "Muhammed Yuşa Duymaz",
  publisher: "Muhammed Yuşa Duymaz",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName,
    title,
    description,
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Yuşa Duymaz — Web Tasarımcı & Geliştirici",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.svg"],
    creator: "@yusaduymaz",
  },
  manifest: "/manifest.webmanifest",
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8f9fa",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammed Yuşa Duymaz",
  url: siteUrl,
  image: `${siteUrl}/og-image.svg`,
  jobTitle: "Web Designer & Developer",
  description,
  knowsAbout: [
    "Web Development",
    "Data Science",
    "Artificial Intelligence",
    "Full-Stack Development",
    "SEO",
  ],
  sameAs: [
    "https://github.com/yusaduymaz",
  ],
  worksFor: {
    "@type": "Organization",
    name: siteName,
  },
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  inLanguage: "tr-TR",
  author: {
    "@type": "Person",
    name: "Muhammed Yuşa Duymaz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={cn("scroll-smooth", "font-sans")}>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} bg-background text-on-background font-body-md min-h-screen flex flex-col relative overflow-x-hidden`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-white focus:shadow-lg focus:outline-none"
        >
          İçeriğe geç
        </a>
        <AuthManager />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        {children}
      </body>
    </html>
  );
}

