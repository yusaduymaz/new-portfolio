import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-container-max mt-6 rounded-full bg-surface/80 dark:bg-primary/80 backdrop-blur-xl border-b border-white/40 shadow-xl transition-all duration-500 ease-in-out z-50 flex justify-between items-center px-8 py-4 hidden md:flex glass-panel">
      <div className="font-display-lg text-headline-sm font-bold tracking-tighter text-primary dark:text-secondary">
        MYD
      </div>
      <nav className="flex gap-8 items-center">
        <Link className="font-label-md text-label-md text-secondary dark:text-secondary-fixed border-b-2 border-secondary pb-1 hover:text-secondary transition-colors duration-300" href="/">Anasayfa</Link>
        <Link className="font-label-md text-label-md text-on-surface-variant dark:text-on-surface-variant/70 hover:text-secondary transition-colors duration-300" href="/expertise">Uzmanlıklar</Link>
        <Link className="font-label-md text-label-md text-on-surface-variant dark:text-on-surface-variant/70 hover:text-secondary transition-colors duration-300" href="/certificates">Sertifikalar</Link>
        <Link className="font-label-md text-label-md text-on-surface-variant dark:text-on-surface-variant/70 hover:text-secondary transition-colors duration-300" href="/projects">Projeler</Link>
        <Link className="font-label-md text-label-md text-on-surface-variant dark:text-on-surface-variant/70 hover:text-secondary transition-colors duration-300" href="/contact">İletişim</Link>
      </nav>
      <Link className="btn-primary px-6 py-2 rounded-full font-label-md text-label-md" href="/login">Giriş Yap</Link>
    </header>
  );
}
