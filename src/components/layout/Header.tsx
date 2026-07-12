"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Anasayfa", href: "/" },
    { name: "Uzmanlıklar", href: "/expertise" },
    { name: "Sertifikalar", href: "/certificates" },
    { name: "Projeler", href: "/projects" },
    { name: "İletişim", href: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname === path || pathname.startsWith(path + "/");
  };

  return (
    <>
      {/* Desktop Header */}
      <div className="fixed top-0 left-0 w-full z-50 hidden md:flex justify-center pointer-events-none">
        <header
          className={`w-[calc(100%-40px)] max-w-container-max mt-6 rounded-full glass-panel pointer-events-auto transition-[margin,padding,background-color,box-shadow] duration-500 ease-in-out flex justify-between items-center px-8 py-4 ${scrolled ? "mt-4 py-3 bg-white/80 shadow-md" : "bg-white/60"
            }`}
        >
          <div className="flex items-center gap-4">
            <Link href="/" className="font-display-lg text-headline-sm font-bold tracking-tighter text-primary">
              MYD
            </Link>
            <div className="h-4 w-px bg-outline-variant/30 hidden lg:block" />
          </div>

          <nav className="flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-label-md text-label-md transition-all duration-300 relative group py-1 ${isActive(link.href)
                  ? "text-secondary"
                  : "text-on-surface-variant hover:text-secondary"
                  }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-secondary transition-all duration-300 ${isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                ></span>
              </Link>
            ))}
          </nav>

          <Link className="btn-primary px-6 py-2 rounded-full font-label-md text-label-md shadow-sm" href="/login">
            Giriş Yap
          </Link>
        </header>
      </div>

      {/* Mobile Header */}
      <header
        className={`fixed top-0 left-0 w-full z-50 md:hidden transition-[padding,background-color,box-shadow] duration-300 border-b border-outline-variant/30 ${scrolled ? "bg-white/80 backdrop-blur-xl shadow-lg py-4" : "bg-white/50 backdrop-blur-md py-5"
          }`}
      >
        <div className="px-6 flex justify-between items-center">
          <Link href="/" className="font-display-lg text-2xl font-bold tracking-tighter text-primary">
            MYD
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 flex items-center justify-center text-primary relative z-50"
          >
            <span className="material-symbols-outlined text-3xl">
              {isOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-surface z-40 md:hidden transition-transform duration-500 ease-in-out flex flex-col justify-center ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`font-display-lg text-3xl transition-colors ${isActive(link.href) ? "text-secondary" : "text-primary"
                }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            onClick={() => setIsOpen(false)}
            className="btn-primary px-10 py-4 rounded-full font-label-md text-xl mt-4"
            href="/login"
          >
            Giriş Yap
          </Link>
        </div>
      </div>
    </>
  );
}

