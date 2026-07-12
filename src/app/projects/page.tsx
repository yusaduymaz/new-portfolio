import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";
import { Project } from "@/types/database";
import ProjectsExplorer from "@/components/projects/ProjectsExplorer";
import { WordPullUp } from "@/components/ui/word-pull-up";

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
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  return (
    <>
      <Header />
      <main className="flex-grow pt-32 pb-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full relative z-10">
        <section className="mb-section-gap relative z-10">
          <div className="flex flex-col gap-6 mb-16 text-center items-center">
            <WordPullUp
              className="font-display-lg text-[48px] md:text-[64px] leading-tight text-primary"
              words="Seçkin Projeler"
            />
            <p className="font-body-lg text-on-surface-variant max-w-2xl">
              Web tasarımı, SPA mimarileri ve veri bilimi entegrasyonları ile
              geliştirdiğim yenilikçi çözümler. Detayları incelemek için bir
              projeye tıklayın.
            </p>
          </div>

          <ProjectsExplorer projects={(projects ?? []) as Project[]} />
        </section>
      </main>
      <Footer profile={profile} />
    </>
  );
}
