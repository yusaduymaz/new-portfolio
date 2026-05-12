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
      <header 
        className={`fixed top-0 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-container-max mt-6 rounded-full bg-surface/80 backdrop-blur-xl border border-white/40 shadow-xl transition-all duration-500 ease-in-out z-50 hidden md:flex justify-between items-center px-8 py-4 glass-panel ${
          scrolled ? "mt-4 py-3 bg-surface/90" : ""
        }`}
      >
        <Link href="/" className="font-display-lg text-headline-sm font-bold tracking-tighter text-primary">
          MYD
        </Link>
        
        <nav className="flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-label-md text-label-md transition-all duration-300 relative group py-1 ${
                isActive(link.href) 
                  ? "text-secondary" 
                  : "text-on-surface-variant hover:text-secondary"
              }`}
            >
              {link.name}
              <span 
                className={`absolute bottom-0 left-0 h-0.5 bg-secondary transition-all duration-300 ${
                  isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
          ))}
        </nav>

        <Link className="btn-primary px-6 py-2 rounded-full font-label-md text-label-md" href="/login">
          Giriş Yap
        </Link>
      </header>

      {/* Mobile Header */}
      <header 
        className={`fixed top-0 left-0 w-full z-50 md:hidden transition-all duration-300 ${
          scrolled ? "bg-surface/90 backdrop-blur-xl shadow-lg py-4" : "py-6"
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
        className={`fixed inset-0 bg-surface z-40 md:hidden transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`font-display-lg text-3xl transition-colors ${
                isActive(link.href) ? "text-secondary" : "text-primary"
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

