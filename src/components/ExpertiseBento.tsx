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

  const dsItems = groupedExpertise["Data Science"] || [];
  const fsItems = groupedExpertise["Full-stack Development"] || [];

  return (
    <section className="relative w-full mx-auto py-section-gap px-margin-mobile md:px-margin-desktop z-10 bg-transparent" id="services">
      <div className="max-w-container-max mx-auto">
        <div className="mb-16">
          <WordPullUp
            className="text-4xl md:text-5xl font-bold text-primary tracking-tight font-display-lg text-left"
            words="Uzmanlık Alanları"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 h-auto md:min-h-[480px]">
          {/* Box 1: Data Science */}
          <MagicCard
            className="col-span-1 glass-panel border border-white/60 transition-all duration-500 hover:shadow-xl overflow-hidden rounded-3xl group"
            gradientColor="rgba(197, 160, 89, 0.03)"
          >
            <div className="flex flex-col justify-between p-8 md:p-12 h-full w-full relative">
              <div className="flex items-center justify-between w-full mb-8">
                <div className="text-secondary bg-surface-container/60 p-4.5 rounded-2xl border border-outline-variant/20 shadow-sm transition-transform duration-500 group-hover:scale-110">
                  <BrainCircuit className="w-8 h-8" />
                </div>
                <div className="text-outline-variant/20 font-display-lg text-7xl font-bold select-none leading-none opacity-40">
                  01
                </div>
              </div>

              <div className="mt-auto relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-3 font-display-lg tracking-tight">Data Science</h3>
                <p className="text-on-surface-variant text-sm md:text-base leading-relaxed max-w-xl font-body-lg">
                  Veriden anlamlı içgörüler çıkarma, makine öğrenmesi modelleri geliştirme ve karmaşık veri setlerini analiz etme konusundaki yetkinliklerim.
                </p>

                <div className="flex gap-2.5 mt-8 flex-wrap">
                  {dsItems.length > 0 ? dsItems.map(item => (
                    <span key={item.id} className="px-3.5 py-1.5 rounded-full bg-white/70 border border-outline-variant/30 text-primary text-xs font-mono tracking-wider shadow-sm hover:border-secondary hover:text-secondary transition-all duration-300 cursor-default">
                      {item.title}
                    </span>
                  )) : (
                    ['Python', 'PyTorch', 'LLMs', 'Scikit-Learn'].map(tag => (
                      <span key={tag} className="px-3.5 py-1.5 rounded-full bg-white/70 border border-outline-variant/30 text-primary text-xs font-mono tracking-wider shadow-sm hover:border-secondary hover:text-secondary transition-all duration-300 cursor-default">{tag}</span>
                    ))
                  )}
                </div>
              </div>
            </div>
          </MagicCard>

          {/* Box 2: Full-stack Development */}
          <MagicCard
            className="col-span-1 glass-panel border border-white/60 transition-all duration-500 hover:shadow-xl overflow-hidden rounded-3xl group"
            gradientColor="rgba(197, 160, 89, 0.03)"
          >
            <div className="flex flex-col justify-between p-8 md:p-12 h-full w-full relative">
              <div className="flex items-center justify-between w-full mb-8">
                <div className="text-secondary bg-surface-container/60 p-4.5 rounded-2xl border border-outline-variant/20 shadow-sm transition-transform duration-500 group-hover:scale-110">
                  <LayoutTemplate className="w-8 h-8" />
                </div>
                <div className="text-outline-variant/20 font-display-lg text-7xl font-bold select-none leading-none opacity-40">
                  02
                </div>
              </div>

              <div className="mt-auto relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-3 font-display-lg tracking-tight">Full-stack Development</h3>
                <p className="text-on-surface-variant text-sm md:text-base leading-relaxed font-body-lg max-w-xl">
                  Modern web teknolojileri ile uçtan uca, ölçeklenebilir ve yüksek performanslı uygulamalar geliştirme yetkinliklerim.
                </p>

                <div className="flex gap-2.5 mt-8 flex-wrap">
                  {fsItems.length > 0 ? fsItems.map(item => (
                    <span key={item.id} className="px-3.5 py-1.5 rounded-full bg-white/70 border border-outline-variant/30 text-primary text-xs font-mono tracking-wider shadow-sm hover:border-secondary hover:text-secondary transition-all duration-300 cursor-default">
                      {item.title}
                    </span>
                  )) : (
                    ['Next.js', 'React', 'Tailwind', 'Node.js'].map(tag => (
                      <span key={tag} className="px-3.5 py-1.5 rounded-full bg-white/70 border border-outline-variant/30 text-primary text-xs font-mono tracking-wider shadow-sm hover:border-secondary hover:text-secondary transition-all duration-300 cursor-default">{tag}</span>
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
