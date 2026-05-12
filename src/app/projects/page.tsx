import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { Project } from "@/types/database";

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {projects.map((project: Project) => (
                <div key={project.id} className="glass-panel rounded-2xl overflow-hidden group flex flex-col">
                  <div className="h-[400px] overflow-hidden relative bg-surface-variant">
                    {project.image_url ? (
                      <Image fill alt={project.title || "Project Image"} className="object-cover transition-transform duration-700 group-hover:scale-105" src={project.image_url} unoptimized />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-8xl text-on-surface-variant/20">image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-8 flex flex-col gap-6 bg-surface/50">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-headline-md text-primary">{project.title}</h3>
                        {project.category && (
                          <span className="font-label-md text-xs px-3 py-1 bg-surface-variant rounded-full text-on-surface-variant uppercase">{project.category}</span>
                        )}
                      </div>
                      {project.description && (
                        <p className="font-body-md text-on-surface-variant line-clamp-3">{project.description}</p>
                      )}
                    </div>

                    {project.technologies && project.technologies.length > 0 && (
                      <div>
                        <h4 className="font-label-md text-primary mb-3">Kullanılan Teknolojiler</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech: string) => (
                            <span key={tech} className="px-3 py-1 bg-surface-variant/50 rounded-md text-xs font-label-md text-on-surface-variant border border-outline-variant/30">{tech}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-6 border-t border-outline-variant/30 pt-6 mt-auto">
                      {project.github_url && (
                        <a className="font-label-md text-label-md text-on-surface-variant hover:text-secondary flex items-center gap-1 transition-colors" href={project.github_url} target="_blank" rel="noopener noreferrer">
                          <span className="material-symbols-outlined text-[20px]">code</span> GitHub
                        </a>
                      )}
                      {project.live_url && (
                        <a className="font-label-md text-label-md text-on-surface-variant hover:text-secondary flex items-center gap-1 transition-colors" href={project.live_url} target="_blank" rel="noopener noreferrer">
                          <span className="material-symbols-outlined text-[20px]">open_in_new</span> Canlı Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
