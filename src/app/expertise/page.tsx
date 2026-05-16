import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";
import { Expertise, Education, Experience } from "@/types/database";
import { WordPullUp } from "@/components/ui/word-pull-up";
import { Particles } from "@/components/ui/particles";
import { MagicCard } from "@/components/ui/magic-card";

export const dynamic = "force-dynamic";

export default async function ExpertisePage() {
  const supabase = createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .limit(1)
    .maybeSingle();

  const { data: expertise } = await supabase
    .from("expertise")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: experience } = await supabase
    .from("experience")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: education } = await supabase
    .from("education")
    .select("*")
    .order("created_at", { ascending: false });

  // Group expertise by category
  const expertiseByCategory: Record<string, Expertise[]> = {};
  if (expertise && expertise.length > 0) {
    expertise.forEach((item: Expertise) => {
      const cat = item.category || "Diğer";
      if (!expertiseByCategory[cat]) expertiseByCategory[cat] = [];
      expertiseByCategory[cat].push(item);
    });
  }

  const categoryIcons: Record<string, string> = {
    "Data Science": "analytics",
    "Full-stack Development": "developer_mode",
    "Diğer": "category",
  };

  return (
    <>
      <Header />
      <main className="flex-grow pt-32 pb-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full relative z-10 overflow-hidden">
        {/* Background Particles for Premium Light Mode vibe */}
        <Particles
          className="absolute inset-0 -z-10"
          quantity={50}
          ease={80}
          color="#191c1d"
          refresh
        />
        
        <section className="mb-section-gap relative z-10">
          <div className="flex flex-col gap-6 mb-16 text-center items-center">
            {/* Using WordPullUp for main title from DESIGN.md */}
            <WordPullUp
              className="font-display-lg text-[48px] md:text-[72px] leading-[1.1] text-primary"
              words="Uzmanlıklar & Deneyim"
            />
            <p className="font-body-lg text-on-surface-variant max-w-2xl mt-4">
              Yıllar içinde edindiğim tecrübeler, eğitim hayatım ve uzmanlık alanlarımın detaylı bir dökümü.
            </p>
          </div>

          <div className="flex flex-col gap-16 md:grid md:grid-cols-12 md:gap-x-gutter">
            
            {/* Uzmanlık Alanları - Takes up more space in grid if needed, or stack on mobile */}
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-12">
              <div>
                <h2 className="font-headline-lg text-primary mb-8 border-b border-outline-variant/30 pb-4">Uzmanlık Alanları</h2>
                {Object.keys(expertiseByCategory).length > 0 ? (
                  <div className="flex flex-col gap-12">
                    {Object.entries(expertiseByCategory).map(([category, items]) => (
                      <div key={category}>
                        <h3 className="font-headline-md text-secondary flex items-center gap-2 mb-6 tracking-tight">
                          <span className="material-symbols-outlined text-3xl">{categoryIcons[category] || "category"}</span>
                          {category}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {items.map((item: Expertise) => (
                            <MagicCard 
                              key={item.id} 
                              className="glass-panel flex flex-col p-6 rounded-xl hover:shadow-lg transition-all duration-300"
                              gradientColor="rgba(197, 160, 89, 0.15)"
                            >
                              <div className="flex items-start gap-4">
                                <span className="material-symbols-outlined text-secondary mt-1">{item.icon || "star"}</span>
                                <div>
                                  <h4 className="font-headline-sm text-primary mb-2">{item.title}</h4>
                                  <p className="font-body-md text-on-surface-variant">{item.description}</p>
                                </div>
                              </div>
                            </MagicCard>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="glass-panel p-12 rounded-3xl text-center">
                    <span className="material-symbols-outlined text-6xl text-on-surface-variant/20 mb-4">analytics</span>
                    <p className="font-body-md text-on-surface-variant">Henüz uzmanlık eklenmedi.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sağ Kolon: Deneyim ve Eğitim - Side column in 12-col grid */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-16">
              
              {/* İş Deneyimi */}
              <div>
                <h2 className="font-headline-lg text-primary mb-8 border-b border-outline-variant/30 pb-4">Deneyim</h2>
                {experience && experience.length > 0 ? (
                  <div className="flex flex-col gap-6 relative">
                    {/* Vertical Timeline Line */}
                    <div className="absolute left-6 top-6 bottom-6 w-px bg-outline-variant/30 hidden md:block"></div>
                    
                    {experience.map((item: Experience, index: number) => (
                      <MagicCard 
                        key={item.id} 
                        className={`glass-panel p-6 rounded-2xl relative ${index === 0 ? 'border-l-4 border-l-secondary' : 'border-l-4 border-l-transparent'}`}
                        gradientColor="rgba(197, 160, 89, 0.1)"
                      >
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                            <div>
                              <h3 className="font-headline-sm text-primary">{item.title}</h3>
                              <p className="font-body-md text-secondary font-medium">{item.company}</p>
                            </div>
                            {(item.start_date || item.end_date) && (
                              <span className="font-label-md px-3 py-1 bg-surface-variant rounded-full text-on-surface-variant text-xs whitespace-nowrap">
                                {item.start_date} — {item.end_date || 'Devam ediyor'}
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <p className="font-body-md text-on-surface-variant mt-3 text-sm">{item.description}</p>
                          )}
                        </div>
                      </MagicCard>
                    ))}
                  </div>
                ) : (
                  <div className="glass-panel p-12 rounded-3xl text-center">
                    <span className="material-symbols-outlined text-6xl text-on-surface-variant/20 mb-4">work</span>
                    <p className="font-body-md text-on-surface-variant">Henüz deneyim eklenmedi.</p>
                  </div>
                )}
              </div>

              {/* Eğitim */}
              <div>
                <h2 className="font-headline-lg text-primary mb-8 border-b border-outline-variant/30 pb-4">Eğitim</h2>
                {education && education.length > 0 ? (
                  <div className="flex flex-col gap-6">
                    {education.map((item: Education) => (
                      <MagicCard 
                        key={item.id} 
                        className="glass-panel p-6 rounded-2xl flex flex-col gap-4 relative"
                        gradientColor="rgba(197, 160, 89, 0.1)"
                      >
                        <div className="flex gap-4 items-start">
                          <span className="material-symbols-outlined text-4xl text-secondary/50 mt-1">school</span>
                          <div>
                            <h3 className="font-headline-sm text-primary">{item.title}</h3>
                            <p className="font-body-md text-on-surface-variant font-medium">{item.institution}</p>
                            {(item.start_date || item.end_date) && (
                              <span className="font-label-md text-xs text-secondary mt-2 inline-block bg-secondary/10 px-2 py-1 rounded">
                                {item.start_date} — {item.end_date || 'Devam ediyor'}
                              </span>
                            )}
                          </div>
                        </div>
                      </MagicCard>
                    ))}
                  </div>
                ) : (
                  <div className="glass-panel p-12 rounded-3xl text-center">
                    <span className="material-symbols-outlined text-6xl text-on-surface-variant/20 mb-4">school</span>
                    <p className="font-body-md text-on-surface-variant">Henüz eğitim bilgisi eklenmedi.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer profile={profile} />
    </>
  );
}
