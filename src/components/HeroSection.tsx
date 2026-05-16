"use client";

import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { Ripple } from "@/components/ui/ripple";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { WordPullUp } from "@/components/ui/word-pull-up";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Profile } from "@/types/database";

export default function HeroSection({ profile }: { profile: Profile | null }) {
  return (
    <section className="relative flex min-h-[65vh] w-full flex-col items-center justify-center overflow-hidden bg-background text-primary pt-32 pb-4" id="hero">
      {/* MagicUI Animated Grid Pattern for architectural feel */}
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_80%)]",
          "absolute inset-0 h-[100%] w-[100%] fill-secondary/20 stroke-outline-variant/30"
        )}
      />

      <div className="z-10 flex w-full max-w-container-max flex-col md:flex-row items-center justify-between px-margin-mobile md:px-margin-desktop gap-12 mt-12 md:mt-0">
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="mb-6 inline-flex items-center rounded-full border border-outline-variant/30 glass-panel px-4 py-1.5 text-sm font-medium text-on-surface-variant backdrop-blur-md shadow-sm">
            <span className="flex h-2.5 w-2.5 rounded-full bg-secondary mr-3 animate-pulse shadow-[0_0_8px_rgba(119,90,25,0.6)]" />
            <span className="font-label-md text-xs md:text-sm tracking-widest uppercase">Available for new opportunities</span>
          </div>

          {/* MagicUI Word Animation */}
          <WordPullUp
            className="text-5xl md:text-7xl lg:text-[80px] font-bold text-primary font-display-lg mb-6 leading-none md:leading-tight text-center md:text-left w-full"
            words={profile?.full_name || "Yuşa Duymaz"}
          />
          
          <h2 className="text-xl md:text-2xl text-on-surface-variant font-body-md mb-8 max-w-2xl font-light">
            <span className="text-secondary font-medium">{profile?.title || "AI Engineer & Full-Stack Architect."}</span> Building intelligent, scalable, and high-performance systems.
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 mt-4 w-full md:w-auto">
            <a href="#blog" className="w-full sm:w-auto">
              <ShimmerButton 
                background="#000000" 
                shimmerColor="#C5A059" 
                className="shadow-lg hover:scale-105 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) w-full sm:w-auto px-8 py-4 rounded-xl"
              >
                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-widest text-white flex items-center gap-2 font-label-md uppercase">
                  EXPLORE MY WORK <ArrowRight className="w-4 h-4" />
                </span>
              </ShimmerButton>
            </a>
            
            <a href="#contact" className="w-full sm:w-auto px-8 py-4 rounded-xl font-label-md text-on-surface hover:text-primary hover:bg-surface-variant/50 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) border border-outline-variant bg-surface-variant/30 text-sm tracking-widest uppercase text-center">
              CONTACT ME
            </a>
          </div>
        </div>

        <div className="flex-1 w-full max-w-lg relative flex justify-center items-center py-8 md:py-0">
          {/* Ripple effect centered behind the portrait */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Ripple 
              mainCircleSize={240}
              mainCircleOpacity={0.1}
              numCircles={8}
              className="[&_div]:border-secondary/40 [&_div]:bg-secondary/2"
            />
          </div>

          <div className="relative group">
            {/* Main Portrait Container */}
            <div className="w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] aspect-square shrink-0 rounded-full overflow-hidden border-[6px] border-white/10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5),0_0_20px_rgba(197,160,89,0.1)] relative z-10 transition-all duration-700 group-hover:scale-[1.02] group-hover:border-white/20">
              <Image
                fill
                unoptimized
                alt="Profile Portrait"
                className="object-cover scale-110 transition-transform duration-700 group-hover:scale-100"
                src={profile?.avatar_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuCDXq0TN1FWWFMP4y3TBk3ijC2ium5pK19cXaEAxUro-0WJ_pxAhFfDbZrSyLP30MsYd9F51v_vJGzIc81jqtP7QU_s0z_n1gvlDShSmdJMO06n0I0bIZsrUDDgdK4iLTNfXOwnc5m5wX6NlUC9t1SlNIpd4n8AFvTvRck-u8NX2H6tk7itzORE-TpKwEx2ov3nxz0xU9T1Y-BdOnrlLUwalchbFTyKlw0LHK61LyTL4ju5xr45KEzslcLa40octKTiXrkQNqV39Eo"}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-transparent mix-blend-overlay"></div>
              {/* Inner ring for extra depth */}
              <div className="absolute inset-0 rounded-full border border-white/5 shadow-inner"></div>
            </div>

            {/* Premium Code Floating Box */}
            <div className="absolute bottom-4 -right-4 glass-panel p-5 rounded-2xl hidden md:block !z-50 border border-white/20 shadow-2xl backdrop-blur-2xl animate-bounce-slow transform hover:scale-105 transition-transform duration-500">
              <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
                <span className="text-[10px] font-mono text-on-surface-variant/60 uppercase tracking-tighter">developer.json</span>
              </div>
              <pre className="text-xs font-mono text-secondary/90 leading-relaxed">
                <code>{`{
  "name": "Yuşa",
  "role": "AI Engineer",
  "status": "Available"
}`}</code>
              </pre>
            </div>
            
            {/* Ambient Glow behind portrait */}
            <div className="absolute inset-0 bg-secondary/5 blur-[120px] rounded-full -z-10 animate-pulse-slow"></div>
          </div>
        </div>
      </div>
    </section>
  );
}