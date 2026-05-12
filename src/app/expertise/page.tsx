import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";
import { Expertise, Education, Experience } from "@/types/database";

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
      <main className="flex-grow pt-32 pb-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full relative z-10">
        <section className="mb-section-gap relative z-10">
          <div className="flex flex-col gap-6 mb-12 text-center items-center">
            <h1 className="font-display-lg text-[48px] md:text-[64px] leading-tight text-primary">
              Uzmanlıklar <span className="text-secondary italic font-serif">&amp; Deneyim</span>
            </h1>
            <p className="font-body-lg text-on-surface-variant max-w-2xl">
              Yıllar içinde edindiğim tecrübeler, eğitim hayatım ve uzmanlık alanlarımın detaylı bir dökümü.
            </p>
          </div>

          <div className="flex flex-col gap-16">
            {/* Uzmanlık Alanları */}
            {Object.keys(expertiseByCategory).length > 0 ? (
              <div className="glass-panel p-8 rounded-3xl">
                <h2 className="font-headline-lg text-headline-lg text-primary mb-8 border-b border-outline-variant/30 pb-4">Uzmanlık Alanları</h2>
                <div className="flex flex-col gap-12">
                  {Object.entries(expertiseByCategory).map(([category, items]) => (
                    <div key={category}>
                      <h3 className="font-headline-md text-secondary flex items-center gap-2 mb-6">
                        <span className="material-symbols-outlined text-3xl">{categoryIcons[category] || "category"}</span>
                        {category}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {items.map((item: Expertise) => (
                          <div key={item.id} className="flex items-start gap-4 p-4 rounded-xl hover:bg-surface-variant/30 transition-colors">
                            <span className="material-symbols-outlined text-secondary mt-0.5">{item.icon || "star"}</span>
                            <div>
                              <h4 className="font-headline-sm text-primary">{item.title}</h4>
                              <p className="font-body-md text-on-surface-variant mt-1">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="glass-panel p-12 rounded-3xl text-center">
                <span className="material-symbols-outlined text-6xl text-on-surface-variant/20 mb-4">analytics</span>
                <p className="font-body-md text-on-surface-variant">Henüz uzmanlık eklenmedi.</p>
              </div>
            )}

            {/* İş Deneyimi */}
            <div>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-8">İş Deneyimi</h2>
              {experience && experience.length > 0 ? (
                <div className="flex flex-col gap-6">
                  {experience.map((item: Experience, index: number) => (
                    <div key={item.id} className={`glass-panel p-8 rounded-2xl relative border-l-4 ${index === 0 ? 'border-secondary' : 'border-outline-variant'}`}>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-headline-sm text-primary">{item.title}</h3>
                          <p className="font-body-md text-secondary">{item.company}</p>
                        </div>
                        {(item.start_date || item.end_date) && (
                          <span className="font-label-md px-3 py-1 bg-surface-variant rounded-full text-on-surface-variant">
                            {item.start_date} — {item.end_date || 'Devam ediyor'}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p className="font-body-md text-on-surface-variant">{item.description}</p>
                      )}
                    </div>
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
              <h2 className="font-headline-lg text-headline-lg text-primary mb-8">Eğitim Bilgileri</h2>
              {education && education.length > 0 ? (
                <div className="flex flex-col gap-6">
                  {education.map((item: Education) => (
                    <div key={item.id} className="glass-panel p-8 rounded-2xl flex gap-6 items-center">
                      <span className="material-symbols-outlined text-5xl text-secondary opacity-50">school</span>
                      <div>
                        <h3 className="font-headline-sm text-primary">{item.title}</h3>
                        <p className="font-body-md text-on-surface-variant">{item.institution}</p>
                        {(item.start_date || item.end_date) && (
                          <span className="font-label-md text-xs text-secondary mt-2 block">
                            {item.start_date} — {item.end_date || 'Devam ediyor'}
                          </span>
                        )}
                      </div>
                    </div>
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
        </section>
      </main>
      <Footer profile={profile} />
    </>
  );
}
