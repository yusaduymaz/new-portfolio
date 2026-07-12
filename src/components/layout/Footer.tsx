import Link from "next/link";
import { Profile } from "@/types/database";

export default function Footer({ profile }: { profile: Profile | null }) {
  return (
    <footer className="w-full py-16 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest border-t border-outline-variant/30 transition-all duration-300 flex flex-col md:flex-row justify-between items-center max-w-container-max mx-auto mt-auto relative z-10 gap-8">
      <div className="flex flex-col items-center md:items-start gap-2">
        <div className="font-display-lg text-headline-sm font-bold tracking-tighter text-primary">
          MYD
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-on-surface-variant">
          <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="tracking-wider uppercase">uptime 99.99% (all nodes operational)</span>
        </div>
      </div>
      <div className="text-on-surface-variant font-body-md text-sm text-center md:text-left">
        © {new Date().getFullYear()} {profile?.full_name || "Muhammed Yuşa Duymaz"}. Tüm hakları saklıdır.
      </div>
      <div className="flex gap-6">
        {profile?.linkedin_url && (
            <Link className="font-label-md text-label-md text-on-surface-variant hover:text-secondary underline underline-offset-8 decoration-1 transition-colors" href={profile.linkedin_url} target="_blank" rel="noopener noreferrer">LinkedIn</Link>
        )}
        {profile?.github_url && (
            <Link className="font-label-md text-label-md text-on-surface-variant hover:text-secondary underline underline-offset-8 decoration-1 transition-colors" href={profile.github_url} target="_blank" rel="noopener noreferrer">GitHub</Link>
        )}
        {profile?.twitter_url && (
            <Link className="font-label-md text-label-md text-on-surface-variant hover:text-secondary underline underline-offset-8 decoration-1 transition-colors" href={profile.twitter_url} target="_blank" rel="noopener noreferrer">Twitter</Link>
        )}
      </div>
    </footer>
  );
}
