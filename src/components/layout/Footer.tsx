import Link from "next/link";
import { Profile } from "@/types/database";

export default function Footer({ profile }: { profile: Profile | null }) {
  return (
    <footer className="w-full py-20 px-margin-desktop bg-surface dark:bg-primary border-t border-outline-variant/20 flat transition-all duration-300 flex flex-col md:flex-row justify-between items-center max-w-container-max mx-auto mt-auto relative z-10">
      <div className="font-headline-sm text-headline-sm text-primary dark:text-secondary mb-8 md:mb-0">
        MYD
      </div>
      <div className="text-on-surface-variant font-body-md text-body-md text-center md:text-left mb-8 md:mb-0">
        © {new Date().getFullYear()} {profile?.full_name || "Your Name"}. Tüm hakları saklıdır.
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
