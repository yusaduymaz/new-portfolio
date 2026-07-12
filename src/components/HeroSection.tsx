"use client";

import { useState } from "react";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { WordPullUp } from "@/components/ui/word-pull-up";
import { ArrowRight, Copy, Check } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Profile } from "@/types/database";

export default function HeroSection({ profile }: { profile: Profile | null }) {
  const [copied, setCopied] = useState(false);

  const developerJson = {
    name: profile?.full_name || "Muhammed Yuşa Duymaz",
    role: "Senior Web Designer & Developer",
    status: "Available",
    location: "Istanbul, TR"
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(developerJson, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relatisve flex min-h-[75vh] w-full flex-col items-center justify-center overflow-hidden bg-background text-primary pt-32 pb-16 md:py-24" id="hero">
      {/* Premium subtle light-mode grid background */}
      <AnimatedGridPattern
        numSquares={45}
        maxOpacity={0.08}
        duration={4}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_90%)]",
          "absolute inset-0 h-[100%] w-[100%] fill-secondary/10 stroke-outline-variant/40"
        )}
      />

      <div className="z-10 flex w-full max-w-container-max flex-col lg:flex-row items-center justify-between px-margin-mobile md:px-margin-desktop gap-16">
        {/* Left Column: Heading Copy */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">


          <div className="mb-6 w-full">
            <WordPullUp
              className="text-4xl sm:text-6xl lg:text-[76px] font-bold text-primary font-display-lg leading-tight lg:leading-[1.05] tracking-tighter text-center lg:text-left"
              words={profile?.full_name || "Yuşa Duymaz"}
            />
          </div>

          <h2 className="text-lg sm:text-xl md:text-2xl text-on-surface-variant font-body-md mb-10 max-w-2xl font-light leading-relaxed">
            <span className="text-secondary font-medium">{profile?.title || "Data Science & AI | FullStack Developer"}</span>
            <br></br>
            <span> Akıllı, ölçeklenebilir ve yüksek performanslı sistemler geliştiriyorum.</span>
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto">
            <a href="#blog" className="w-full sm:w-auto">
              <ShimmerButton
                background="#000000"
                shimmerColor="#C5A059"
                className="shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto px-8 py-4 rounded-xl"
              >
                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-widest text-white flex items-center justify-center gap-2 font-label-md uppercase">
                  Çalışmalarımı İncele <ArrowRight className="w-4 h-4" />
                </span>
              </ShimmerButton>
            </a>

            <a href="#contact" className="w-full sm:w-auto px-8 py-4 rounded-xl font-label-md text-on-surface hover:text-primary hover:bg-white/80 active:scale-[0.98] transition-all duration-300 border border-outline-variant bg-white/55 text-sm tracking-widest uppercase text-center shadow-sm">
              İletişime Geç
            </a>
          </div>
        </div>

        {/* Right Column: Interactive macOS frame & Terminal Panel */}
        <div className="flex-1 w-full max-w-lg relative flex flex-col justify-center items-center py-6">

          {/* Main Container wrapping both elements */}
          <div className="relative w-full max-w-[420px] aspect-[4/5] sm:aspect-square flex items-center justify-center">

            {/* 1. Portrait Card in macOS frame style */}
            <div className="absolute top-0 left-0 w-[78%] aspect-[4/5] bg-white border border-outline-variant/30 rounded-2xl overflow-hidden shadow-xl z-10 transition-transform duration-500 hover:scale-[1.01] hover:shadow-2xl">
              {/* macOS Window Chrome Header */}
              <div className="flex items-center gap-1.5 px-4 py-3 bg-surface-container-low border-b border-outline-variant/20">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <span className="text-[10px] font-mono text-on-surface-variant/70 ml-2">portrait.png</span>
              </div>
              {/* Portrait Image */}
              <div className="relative w-full h-[calc(100%-36px)] bg-surface-container group overflow-hidden">
                <Image
                  fill
                  unoptimized
                  alt="Profile Portrait"
                  className="object-cover scale-105 transition-transform duration-700 hover:scale-100"
                  src={profile?.avatar_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuCDXq0TN1FWWFMP4y3TBk3ijC2ium5pK19cXaEAxUro-0WJ_pxAhFfDbZrSyLP30MsYd9F51v_vJGzIc81jqtP7QU_s0z_n1gvlDShSmdJMO06n0I0bIZsrUDDgdK4iLTNfXOwnc5m5wX6NlUC9t1SlNIpd4n8AFvTvRck-u8NX2H6tk7itzORE-TpKwEx2ov3nxz0xU9T1Y-BdOnrlLUwalchbFTyKlw0LHK61LyTL4ju5xr45KEzslcLa40octKTiXrkQNqV39Eo"}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-secondary/10 to-transparent mix-blend-overlay"></div>
              </div>
            </div>



            {/* Subtle Gold aura glow behind the portrait setup */}
            <div className="absolute inset-0 bg-secondary/5 blur-[80px] rounded-full -z-10 animate-pulse-slow"></div>

          </div>

        </div>
      </div>
    </section >
  );
}