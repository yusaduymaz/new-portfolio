import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/ContactForm";
import HeroSection from "@/components/HeroSection";
import ExpertiseBento from "@/components/ExpertiseBento";
import { createClient } from "@/lib/supabase/server";
import { Project } from "@/types/database";
import { WordPullUp } from "@/components/ui/word-pull-up";
import { MagicCard } from "@/components/ui/magic-card";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .limit(1)
    .maybeSingle();

  const { data: aboutData } = await supabase
    .from("about")
    .select("*")
    .limit(1)
    .maybeSingle();

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })
    .limit(4);

  const { data: expertise } = await supabase
    .from("expertise")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="bg-background min-h-screen text-on-surface font-body-lg selection:bg-secondary/20 selection:text-secondary">
      <Header />

      <main className="flex-grow w-full relative z-10">
        <HeroSection profile={profile} />
        
        {/* About Me Section */}
        <section className="py-section-gap px-margin-mobile md:px-margin-desktop relative z-10 bg-transparent border-t border-outline-variant/30" id="about-me">
          <div className="max-w-container-max mx-auto">
            <div className="flex flex-col mb-16">
              <WordPullUp
                className="text-4xl md:text-5xl font-bold text-primary tracking-tight font-display-lg text-left"
                words="Hakkımda"
              />
              <p className="text-on-surface-variant mt-4 font-label-md tracking-widest text-secondary uppercase text-left">/sys/profile/identity</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Main Bio Card (8 Columns) */}
              <div className="lg:col-span-8">
                <MagicCard 
                  className="glass-panel p-8 md:p-12 rounded-3xl flex flex-col justify-between h-full border border-white/60 shadow-md relative overflow-hidden"
                  gradientColor="rgba(197, 160, 89, 0.04)"
                >
                  <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                    <div>
                      <h3 className="font-display-lg text-3xl md:text-5xl text-primary mb-2 tracking-tight">{aboutData?.full_name || profile?.full_name || "Muhammed Yuşa Duymaz"}</h3>
                      <h4 className="font-label-md text-secondary tracking-widest uppercase mb-6 text-sm">{aboutData?.title || profile?.title || "Senior Web Designer & Developer"}</h4>
                      <div className="font-body-md text-on-surface-variant leading-relaxed text-base md:text-lg flex flex-col gap-4 max-w-2xl">
                        <p>
                          {aboutData?.description || "Dijital dünyada estetik ve fonksiyonelliği bir araya getiren çözümler üretmeye tutkulu bir Web Tasarımcı ve Geliştiriciyim."}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-outline-variant/20 mt-auto">
                      {profile?.cv_url && (
                        <a href={profile.cv_url} download target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-white hover:bg-secondary hover:text-white transition-all duration-300 font-label-md tracking-widest uppercase text-xs shadow-md active:scale-95" aria-label="Download CV">
                          <span className="material-symbols-outlined text-lg">download</span>
                          Download CV
                        </a>
                      )}
                      {profile?.github_url && (
                        <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-xl bg-surface-container hover:text-primary hover:bg-white transition-all duration-300 border border-outline-variant/20 shadow-sm active:scale-95 text-on-surface-variant" aria-label="GitHub Profile">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.03-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg>
                        </a>
                      )}
                      {profile?.linkedin_url && (
                        <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-xl bg-surface-container hover:text-primary hover:bg-white transition-all duration-300 border border-outline-variant/20 shadow-sm active:scale-95 text-on-surface-variant" aria-label="LinkedIn Profile">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                        </a>
                      )}
                    </div>
                  </div>
                </MagicCard>
              </div>

              {/* Metrics Column (4 Columns) */}
              <div className="lg:col-span-4 flex flex-col gap-6 justify-between">
                <MagicCard 
                  className="glass-panel p-8 rounded-2xl flex flex-col justify-center border border-white/60 shadow-sm flex-1"
                  gradientColor="rgba(197, 160, 89, 0.02)"
                >
                  <span className="font-display-lg text-4xl md:text-5xl text-secondary mb-1 drop-shadow-sm">{aboutData?.experience || 5}+</span>
                  <span className="font-mono tracking-widest uppercase text-on-surface-variant text-[11px] font-semibold mt-1">Yıl Deneyim</span>
                </MagicCard>
                
                <MagicCard 
                  className="glass-panel p-8 rounded-2xl flex flex-col justify-center border border-white/60 shadow-sm flex-1"
                  gradientColor="rgba(197, 160, 89, 0.02)"
                >
                  <span className="font-display-lg text-4xl md:text-5xl text-secondary mb-1 drop-shadow-sm">{aboutData?.completed_projects || 50}+</span>
                  <span className="font-mono tracking-widest uppercase text-on-surface-variant text-[11px] font-semibold mt-1">Proje</span>
                </MagicCard>
                
                <MagicCard 
                  className="glass-panel p-8 rounded-2xl flex flex-col justify-center border border-white/60 shadow-sm flex-1"
                  gradientColor="rgba(197, 160, 89, 0.02)"
                >
                  <span className="font-display-lg text-4xl md:text-5xl text-secondary mb-1 drop-shadow-sm">%{aboutData?.customer_satisfaction || 100}</span>
                  <span className="font-mono tracking-widest uppercase text-on-surface-variant text-[11px] font-semibold mt-1">Müşteri Memnuniyeti</span>
                </MagicCard>
              </div>
            </div>
          </div>
        </section>
        
        <ExpertiseBento expertise={expertise || []} />

        {/* Selected Work / Projeler Section */}
        <section className="py-section-gap px-margin-mobile md:px-margin-desktop relative z-10 bg-transparent border-t border-outline-variant/30" id="blog">
          <div className="max-w-container-max mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
              <div>
                <WordPullUp
                  className="text-4xl md:text-5xl font-bold text-primary tracking-tight font-display-lg"
                  words="Seçilmiş Çalışmalar"
                />
                <p className="text-on-surface-variant mt-4 font-label-md tracking-widest text-secondary uppercase">/sys/projects/featured</p>
              </div>
              <Link className="px-6 py-3 rounded-full font-label-md text-on-surface hover:text-primary transition-all duration-300 border border-outline-variant hover:border-secondary bg-white/60 hover:bg-white text-sm tracking-widest uppercase flex items-center gap-2 group shadow-sm active:scale-95" href="/projects">
                <span className="material-symbols-outlined text-[18px] group-hover:text-secondary transition-colors">visibility</span>
                TÜM PROJELERİ GÖR
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {projects && projects.length > 0 ? (
                projects.map((project: Project) => (
                  <MagicCard 
                    key={project.id} 
                    className="glass-panel p-0 rounded-2xl overflow-hidden group flex flex-col border border-white/60 transition-all duration-500 hover:shadow-xl"
                    gradientColor="rgba(197, 160, 89, 0.03)"
                  >
                    {/* macOS Window Chrome Header */}
                    <div className="flex items-center justify-between px-5 py-3.5 bg-surface-container-low/75 border-b border-outline-variant/20">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                      </div>
                      <span className="text-[10px] font-mono text-on-surface-variant/70 tracking-widest uppercase">
                        {project.category || "web_app"}
                      </span>
                    </div>

                    {/* Screenshot Frame */}
                    <div className="h-[240px] sm:h-[320px] overflow-hidden relative bg-surface-container border-b border-outline-variant/10">
                      {project.image_url ? (
                        <Image fill unoptimized alt={project.title || "Project Image"} className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" src={project.image_url} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-surface-container-low">
                          <span className="material-symbols-outlined text-6xl text-outline/20">image</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Details Panel */}
                    <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow gap-4 bg-white/40">
                      <div className="flex flex-col gap-2">
                        <h4 className="font-display-lg text-2xl font-bold text-primary group-hover:text-secondary transition-colors leading-tight">{project.title}</h4>
                        {project.description && (
                          <p className="text-on-surface-variant leading-relaxed font-body-md text-sm line-clamp-2">{project.description}</p>
                        )}
                      </div>
                      
                      <div className="flex gap-5 pt-3 border-t border-outline-variant/10 mt-auto">
                        {project.github_url && (
                          <a className="font-mono text-[11px] tracking-wider uppercase text-on-surface-variant hover:text-primary flex items-center gap-1.5 transition-colors" href={project.github_url} target="_blank" rel="noopener noreferrer">
                            <span className="material-symbols-outlined text-base">code</span> GitHub
                          </a>
                        )}
                        {project.live_url && (
                          <a className="font-mono text-[11px] tracking-wider uppercase text-on-surface-variant hover:text-secondary flex items-center gap-1.5 transition-colors" href={project.live_url} target="_blank" rel="noopener noreferrer">
                            <span className="material-symbols-outlined text-base">open_in_new</span> Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </MagicCard>
                ))
              ) : (
                <div className="col-span-2 glass-panel p-16 rounded-2xl text-center border border-white/60">
                  <span className="material-symbols-outlined text-5xl text-outline mb-3">folder_open</span>
                  <p className="text-on-surface-variant font-mono text-sm">PROJE BULUNAMADI</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-section-gap px-margin-mobile md:px-margin-desktop relative z-10 bg-background border-t border-outline-variant/30" id="contact">
          <div className="max-w-container-max mx-auto">
            <div className="mb-16">
              <WordPullUp
                className="text-4xl md:text-5xl font-bold text-primary tracking-tight font-display-lg"
                words="Bağlantı Başlat"
              />
              <p className="text-on-surface-variant mt-4 font-label-md tracking-widest text-secondary uppercase">/sys/network/contact</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-x-gutter">
              <div className="col-span-1 lg:col-span-5 flex flex-col h-full">
                <MagicCard 
                  className="glass-panel p-8 md:p-10 rounded-3xl flex flex-col gap-10 h-full border border-white/60 shadow-md"
                  gradientColor="rgba(197, 160, 89, 0.03)"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-4 font-display-lg border-b border-outline-variant/20 pb-4">Sıra dışı bir şeyler inşa edelim.</h3>
                    <p className="text-on-surface-variant leading-relaxed font-body-md text-base md:text-lg">Yüksek performanslı bir web uygulaması, yapay zeka entegrasyonu veya ölçeklenebilir bir sistem. Birlikte çalışmaya hazırım.</p>
                  </div>
                  
                  <div className="flex flex-col gap-8 flex-grow justify-center mt-4">
                    <div className="flex items-center gap-6 group">
                      <div className="w-12 h-12 bg-surface-container rounded-xl flex items-center justify-center text-secondary transition-all duration-300 group-hover:scale-110 group-hover:bg-secondary group-hover:text-white shadow-sm border border-outline-variant/20">
                        <span className="material-symbols-outlined text-xl">mail</span>
                      </div>
                      <div>
                        <h4 className="font-mono text-[9px] text-on-surface-variant/80 uppercase tracking-widest mb-0.5">E-posta Adresi</h4>
                        <a href="mailto:hello@mydportfolio.com" className="font-body-lg text-primary font-medium hover:text-secondary transition-colors text-sm sm:text-base">hello@mydportfolio.com</a>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 group">
                      <div className="w-12 h-12 bg-surface-container rounded-xl flex items-center justify-center text-secondary transition-all duration-300 group-hover:scale-110 group-hover:bg-secondary group-hover:text-white shadow-sm border border-outline-variant/20">
                        <span className="material-symbols-outlined text-xl">location_on</span>
                      </div>
                      <div>
                        <h4 className="font-mono text-[9px] text-on-surface-variant/80 uppercase tracking-widest mb-0.5">Lokasyon</h4>
                        <span className="font-body-lg text-primary font-medium text-sm sm:text-base">Istanbul, Turkey</span>
                      </div>
                    </div>
                  </div>
                </MagicCard>
              </div>
              <div className="col-span-1 lg:col-span-7 flex flex-col">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer profile={profile} />
    </div>
  );
}
