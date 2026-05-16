"use client";

import { MagicCard } from "@/components/ui/magic-card";
import { WordPullUp } from "@/components/ui/word-pull-up";
import { BrainCircuit, LayoutTemplate } from "lucide-react";
import { Expertise } from "@/types/database";

export default function ExpertiseBento({ expertise }: { expertise: Expertise[] }) {
  // Group expertise items by category
  const groupedExpertise = expertise.reduce((acc, curr) => {
    const cat = curr.category || "Diğer";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(curr);
    return acc;
  }, {} as Record<string, Expertise[]>);

  // Define the exactly 2 main categories based on the user's admin panel setup
  const dsItems = groupedExpertise["Data Science"] || [];
  const fsItems = groupedExpertise["Full-stack Development"] || [];

  return (
    <section className="relative w-full mx-auto py-section-gap px-margin-mobile md:px-margin-desktop z-10 bg-transparent" id="services">
      <div className="max-w-container-max mx-auto">
        <div className="mb-16">
          <WordPullUp
            className="text-4xl md:text-5xl font-bold text-primary tracking-tight font-display-lg text-left"
            words="Core Capabilities"
          />
          <p className="text-on-surface-variant mt-4 font-label-md tracking-widest text-secondary uppercase text-left">/sys/architecture/skills</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 h-auto md:h-[500px]">
          {/* Box 1: Data Science */}
          <MagicCard 
            className="col-span-1 glass-panel border border-outline-variant/30 transition-all duration-500 hover:shadow-2xl overflow-hidden rounded-3xl"
            gradientColor="rgba(197, 160, 89, 0.15)"
          >
            <div className="flex flex-col justify-between p-10 md:p-14 h-full w-full bg-background/50 backdrop-blur-sm">
              <div className="flex items-center justify-between w-full mb-8">
                <div className="text-secondary bg-background/80 backdrop-blur-md p-5 rounded-2xl border border-white/20 shadow-sm transition-transform duration-300 hover:scale-110">
                  <BrainCircuit className="w-10 h-10" />
                </div>
                <div className="text-outline-variant/30 font-display-lg text-8xl font-bold opacity-20 absolute top-8 right-8 select-none">
                  01
                </div>
              </div>
              
              <div className="mt-auto relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-display-lg tracking-tight">Data Science</h3>
                <p className="text-on-surface-variant text-base md:text-lg leading-relaxed max-w-xl font-body-lg">
                  Veriden anlamlı içgörüler çıkarma, makine öğrenmesi modelleri geliştirme ve karmaşık veri setlerini analiz etme konusundaki yetkinliklerim.
                </p>
                
                <div className="flex gap-3 mt-8 flex-wrap">
                  {dsItems.length > 0 ? dsItems.map(item => (
                    <span key={item.id} className="px-4 py-2 rounded-full bg-background border border-outline-variant/30 text-primary text-xs font-label-md tracking-wider uppercase shadow-sm hover:border-secondary transition-colors cursor-default">
                      {item.title}
                    </span>
                  )) : (
                    ['Python', 'PyTorch', 'LLMs', 'Scikit-Learn'].map(tag => (
                      <span key={tag} className="px-4 py-2 rounded-full bg-background border border-outline-variant/30 text-primary text-xs font-label-md tracking-wider uppercase shadow-sm hover:border-secondary transition-colors cursor-default">{tag}</span>
                    ))
                  )}
                </div>
              </div>
            </div>
          </MagicCard>

          {/* Box 2: Full-stack Development */}
          <MagicCard 
            className="col-span-1 glass-panel border border-outline-variant/30 transition-all duration-500 hover:shadow-2xl overflow-hidden rounded-3xl"
            gradientColor="rgba(197, 160, 89, 0.15)"
          >
            <div className="flex flex-col justify-between p-10 md:p-14 h-full w-full bg-background/50 backdrop-blur-sm">
              <div className="flex items-center justify-between w-full mb-8">
                <div className="text-secondary bg-background/80 backdrop-blur-md p-5 rounded-2xl border border-white/20 shadow-sm transition-transform duration-300 hover:scale-110">
                  <LayoutTemplate className="w-10 h-10" />
                </div>
                <div className="text-outline-variant/30 font-display-lg text-8xl font-bold opacity-20 absolute top-8 right-8 select-none">
                  02
                </div>
              </div>

              <div className="mt-auto relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-display-lg tracking-tight">Full-stack Development</h3>
                <p className="text-on-surface-variant text-base md:text-lg leading-relaxed font-body-lg max-w-xl">
                  Modern web teknolojileri ile uçtan uca, ölçeklenebilir ve yüksek performanslı uygulamalar geliştirme yetkinliklerim.
                </p>
                
                <div className="flex gap-3 mt-8 flex-wrap">
                  {fsItems.length > 0 ? fsItems.map(item => (
                    <span key={item.id} className="px-4 py-2 rounded-full bg-background border border-outline-variant/30 text-primary text-xs font-label-md tracking-wider uppercase shadow-sm hover:border-secondary transition-colors cursor-default">
                      {item.title}
                    </span>
                  )) : (
                    ['Next.js', 'React', 'Tailwind', 'Node.js'].map(tag => (
                      <span key={tag} className="px-4 py-2 rounded-full bg-background border border-outline-variant/30 text-primary text-xs font-label-md tracking-wider uppercase shadow-sm hover:border-secondary transition-colors cursor-default">{tag}</span>
                    ))
                  )}
                </div>
              </div>
            </div>
          </MagicCard>
        </div>
      </div>
    </section>
  );
}
