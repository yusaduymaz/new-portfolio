import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";
import { Project } from "@/types/database";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const supabase = createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .limit(1)
    .maybeSingle();

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      <Header />
      <main className="flex-grow pt-32 pb-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full relative z-10">
        <section className="mb-section-gap relative z-10">
          <div className="flex flex-col gap-6 mb-12 text-center items-center">
            <h1 className="font-display-lg text-[48px] md:text-[64px] leading-tight text-primary">
              Seçkin <span className="text-secondary italic font-serif">Projeler</span>
            </h1>
            <p className="font-body-lg text-on-surface-variant max-w-2xl">
              Web tasarımı, SPA mimarileri ve veri bilimi entegrasyonları ile geliştirdiğim yenilikçi çözümler.
            </p>
          </div>

          {projects && projects.length > 0 ? (
            <BentoGrid>
              {projects.map((project: Project) => (
                <BentoCard
                  key={project.id}
                  project={project}
                />
              ))}
            </BentoGrid>
          ) : (
            <div className="glass-panel p-16 rounded-3xl text-center">
              <span className="material-symbols-outlined text-8xl text-on-surface-variant/20 mb-4">folder_open</span>
              <p className="font-body-lg text-on-surface-variant">Henüz proje eklenmedi.</p>
            </div>
          )}
        </section>
      </main>
      <Footer profile={profile} />
    </>
  );
}
