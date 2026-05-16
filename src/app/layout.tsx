import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import AuthManager from "@/components/auth/AuthManager";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-space-grotesk" 
});

export const metadata: Metadata = {
  title: "M.Y.D. Portfolio - Web Tasarımcı & Geliştirici",
  description: "İşletmenizin öne çıkmasına yardımcı olacak premium web tasarım, geliştirme ve SEO hizmetleri.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("scroll-smooth", "font-sans")}>
      <body className={`${inter.variable} ${spaceGrotesk.variable} bg-background text-on-background font-body-md min-h-screen flex flex-col relative overflow-x-hidden`}>
        <AuthManager />
        {children}
      </body>
    </html>
  );
}
