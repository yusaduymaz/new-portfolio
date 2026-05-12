import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/ContactForm";
import { createClient } from "@/lib/supabase/server";
import { Project, Certificate, Expertise } from "@/types/database";

export default async function Home() {
  const supabase = createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .limit(1)
    .maybeSingle();

  // Hakkımda verisi (about tablosundan tek satır)
  const { data: aboutData } = await supabase
    .from("about")
    .select("*")
    .limit(1)
    .maybeSingle();

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(4);

  const { data: certificates } = await supabase
    .from("certificates")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: expertise } = await supabase
    .from("expertise")
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
      {/* Background Blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-secondary-container rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-surface-variant rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-primary-fixed rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <Header />

      <main className="flex-grow pt-32 pb-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full relative z-10">
        {/* Hero Section - Dynamic from profiles table */}
        <section className="min-h-[819px] flex flex-col items-center justify-center text-center gap-stack-lg mb-section-gap relative" id="work">
          <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden mb-8 border-4 border-surface shadow-2xl glass-panel relative z-10 transition-transform hover:scale-105 duration-500">
            <Image
              fill
              unoptimized
              alt="Profile Portrait"
              className="object-cover"
              src={profile?.avatar_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuCDXq0TN1FWWFMP4y3TBk3ijC2ium5pK19cXaEAxUro-0WJ_pxAhFfDbZrSyLP30MsYd9F51v_vJGzIc81jqtP7QU_s0z_n1gvlDShSmdJMO06n0I0bIZsrUDDgdK4iLTNfXOwnc5m5wX6NlUC9t1SlNIpd4n8AFvTvRck-u8NX2H6tk7itzORE-TpKwEx2ov3nxz0xU9T1Y-BdOnrlLUwalchbFTyKlw0LHK61LyTL4ju5xr45KEzslcLa40octKTiXrkQNqV39Eo"}
            />
          </div>
          <h1 className="font-display-lg text-[48px] md:text-[80px] leading-tight text-primary max-w-4xl relative z-10 tracking-tight">
            {profile?.full_name || "Yuşa Duymaz"} <br />
            <span className="text-secondary italic font-light font-serif tracking-normal">{profile?.title || "Data Science & AI FullStack Development"}</span>
          </h1>
          {profile?.description && (
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-4 relative z-10 glass-panel p-6 rounded-2xl">
              {profile.description}
            </p>
          )}

          <div className="mt-8 flex gap-4 relative z-10">
            <a className="btn-primary px-8 py-4 rounded-full font-label-md text-label-md flex items-center gap-2 shadow-lg" href="#about-me">
              <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
              HAKKIMDA
            </a>
          </div>

          {/* Logos */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-6 md:gap-8 relative z-10">
            {profile?.github_url && (
              <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors duration-300 font-label-md">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.03-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg>
                  GitHub
              </a>
            )}
            {profile?.linkedin_url && (
              <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors duration-300 font-label-md">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                  LinkedIn
              </a>
            )}
            {profile?.twitter_url && (
              <a href={profile.twitter_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors duration-300 font-label-md">
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.212 3.793 4.649-.65.177-1.354.23-2.078.084.62 1.933 2.413 3.326 4.542 3.362-1.843 1.447-4.142 2.308-6.65 2.066 2.088 1.349 4.578 2.129 7.24 2.129 8.683 0 13.44-7.252 13.44-13.44 0-.205-.005-.409-.013-.612.923-.665 1.72-1.492 2.349-2.437z"/></svg>
                  Twitter
              </a>
            )}
            {profile?.cv_url && (
              <a href={profile.cv_url} download target="_blank" rel="noopener noreferrer" className="btn-secondary px-6 py-3 rounded-full font-label-md flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  CV İndir
              </a>
            )}
          </div>
        </section>

        {/* About Me Section - Dynamic from about table */}
        <section className="mb-section-gap relative z-10" id="about-me">
          <div className="flex justify-between items-end mb-12">
            <h2 className="font-headline-lg text-headline-lg text-primary">Hakkımda</h2>
          </div>
          <div className="glass-panel p-12 rounded-3xl flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h3 className="font-headline-md text-headline-md text-primary mb-6">{aboutData?.full_name || profile?.full_name || "Muhammed Yuşa Duymaz"}</h3>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-6">
                {aboutData?.description || "Dijital dünyada estetik ve fonksiyonelliği bir araya getiren çözümler üretmeye tutkulu bir Web Tasarımcı ve Geliştiriciyim."}
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                {profile?.github_url && (
                  <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-variant/50 text-on-surface-variant hover:text-primary hover:bg-surface-variant transition-all duration-300 font-label-md border border-outline-variant/20">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.03-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg>
                    GitHub
                  </a>
                )}
                {profile?.linkedin_url && (
                  <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-variant/50 text-on-surface-variant hover:text-primary hover:bg-surface-variant transition-all duration-300 font-label-md border border-outline-variant/20">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                    LinkedIn
                  </a>
                )}
                {profile?.cv_url && (
                  <a href={profile.cv_url} download target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2 rounded-xl bg-secondary text-on-secondary hover:bg-secondary/90 transition-all duration-300 font-label-md shadow-md">
                    <span className="material-symbols-outlined text-[18px]">download</span>
                    CV İndir
                  </a>
                )}
              </div>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-6 w-full">
              <div className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                <span className="font-display-lg text-4xl text-secondary mb-2">{aboutData?.experience || 5}+</span>
                <span className="font-label-md text-on-surface-variant">Yıl Deneyim</span>
              </div>
              <div className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                <span className="font-display-lg text-4xl text-secondary mb-2">{aboutData?.completed_projects || 50}+</span>
                <span className="font-label-md text-on-surface-variant">Tamamlanan Proje</span>
              </div>
              <div className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center col-span-2">
                <span className="font-display-lg text-4xl text-secondary mb-2">%{aboutData?.customer_satisfaction || 100}</span>
                <span className="font-label-md text-on-surface-variant">Müşteri Memnuniyeti</span>
              </div>
            </div>
          </div>
        </section>

        {/* Services / Uzmanlıklar Section - DYNAMIC */}
        <section className="mb-section-gap relative z-10" id="services">
          <div className="flex justify-between items-end mb-12">
            <h2 className="font-headline-lg text-headline-lg text-primary">Uzmanlıklar</h2>
          </div>
          <div className="flex flex-col gap-16">
            {Object.keys(expertiseByCategory).length > 0 ? (
              Object.entries(expertiseByCategory).map(([category, items]) => (
                <div key={category}>
                  <div className="mb-8">
                    <h3 className="font-headline-md text-headline-md text-primary flex items-center gap-4">
                      <span className="material-symbols-outlined text-secondary text-3xl">
                        {categoryIcons[category] || "category"}
                      </span>
                      {category}
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
                    {items.map((item: Expertise) => (
                      <div key={item.id} className="glass-panel p-6 rounded-xl flex flex-col items-center gap-4 text-center hover:-translate-y-1 transition-transform">
                        <span className="material-symbols-outlined text-4xl text-secondary">
                          {item.icon || "star"}
                        </span>
                        <h4 className="font-headline-sm text-headline-sm text-primary">{item.title}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              /* Fallback: Hardcoded data when DB is empty */
              <>
                <div>
                  <div className="mb-8">
                    <h3 className="font-headline-md text-headline-md text-primary flex items-center gap-4">
                      <span className="material-symbols-outlined text-secondary text-3xl">analytics</span>
                      Data Science
                    </h3>
                    <p className="font-body-md text-on-surface-variant mt-2 max-w-2xl">
                      Veriden anlamlı içgörüler çıkarma, makine öğrenmesi modelleri geliştirme ve karmaşık veri
                      setlerini analiz etme konusundaki yetkinliklerim.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
                    {[
                      { icon: "data_exploration", title: "Veri Analizi" },
                      { icon: "model_training", title: "Machine Learning" },
                      { icon: "insights", title: "Veri Görselleştirme" },
                      { icon: "query_stats", title: "İstatistiksel Modelleme" },
                    ].map((s) => (
                      <div key={s.title} className="glass-panel p-6 rounded-xl flex flex-col items-center gap-4 text-center hover:-translate-y-1 transition-transform">
                        <span className="material-symbols-outlined text-4xl text-secondary">{s.icon}</span>
                        <h4 className="font-headline-sm text-headline-sm text-primary">{s.title}</h4>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="mb-8">
                    <h3 className="font-headline-md text-headline-md text-primary flex items-center gap-4">
                      <span className="material-symbols-outlined text-secondary text-3xl">developer_mode</span>
                      Full-stack Development
                    </h3>
                    <p className="font-body-md text-on-surface-variant mt-2 max-w-2xl">
                      Modern web teknolojileri ile uçtan uca, ölçeklenebilir ve yüksek performanslı uygulamalar geliştirme.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
                    {[
                      { icon: "html", title: "HTML5 / CSS3" }, { icon: "javascript", title: "JavaScript ES6+" },
                      { icon: "code", title: "React & SPA" }, { icon: "database", title: "Backend & API" },
                      { icon: "design_services", title: "UI/UX Tasarım" }, { icon: "speed", title: "Performans Opt." },
                      { icon: "search", title: "Teknik SEO" }, { icon: "devices", title: "Responsive Tasarım" },
                    ].map((s) => (
                      <div key={s.title} className="glass-panel p-6 rounded-xl flex flex-col items-center gap-4 text-center hover:-translate-y-1 transition-transform">
                        <span className="material-symbols-outlined text-4xl text-secondary">{s.icon}</span>
                        <h4 className="font-headline-sm text-headline-sm text-primary">{s.title}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Selected Work / Projeler Section - DYNAMIC */}
        <section className="mb-section-gap relative z-10" id="blog">
          <div className="flex justify-between items-end mb-12">
            <h2 className="font-headline-lg text-headline-lg text-primary">Projeler</h2>
            <Link className="font-label-md text-label-md text-secondary flex items-center gap-2 hover:underline underline-offset-4" href="/projects">
              <span className="material-symbols-outlined text-[18px]">visibility</span>
              TÜMÜNÜ GÖR
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {projects && projects.length > 0 ? (
              projects.map((project: Project) => (
                <div key={project.id} className="glass-panel rounded-xl overflow-hidden group flex flex-col">
                  <div className="h-[400px] overflow-hidden relative bg-surface-variant">
                    {project.image_url ? (
                      <Image fill unoptimized alt={project.title || "Project Image"} className="object-cover transition-transform duration-700 group-hover:scale-105" src={project.image_url} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-8xl text-on-surface-variant/20">image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6 flex flex-col gap-4 bg-surface/50">
                    <div className="flex justify-between items-center">
                      <h4 className="font-headline-sm text-headline-sm text-primary">{project.title}</h4>
                      {project.category && (
                        <span className="font-label-md text-xs px-3 py-1 bg-surface-variant rounded-full text-on-surface-variant uppercase">
                          {project.category}
                        </span>
                      )}
                    </div>
                    {project.description && (
                      <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">{project.description}</p>
                    )}
                    <div className="flex gap-4 border-t border-outline-variant/30 pt-4">
                      {project.github_url && (
                        <a className="font-label-md text-label-md text-on-surface-variant hover:text-secondary flex items-center gap-1 transition-colors" href={project.github_url} target="_blank" rel="noopener noreferrer">
                          <span className="material-symbols-outlined text-[18px]">code</span> GitHub
                        </a>
                      )}
                      {project.live_url && (
                        <a className="font-label-md text-label-md text-on-surface-variant hover:text-secondary flex items-center gap-1 transition-colors" href={project.live_url} target="_blank" rel="noopener noreferrer">
                          <span className="material-symbols-outlined text-[18px]">open_in_new</span> Canlı Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 glass-panel p-12 rounded-xl text-center">
                <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-4">folder_open</span>
                <p className="font-body-md text-on-surface-variant">Henüz proje eklenmedi.</p>
              </div>
            )}
          </div>
        </section>

        {/* Certificates Section - DYNAMIC */}
        <section className="mb-section-gap relative z-10" id="about">
          <div className="flex justify-between items-end mb-12">
            <h2 className="font-headline-lg text-headline-lg text-primary">Sertifikalar</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {certificates && certificates.length > 0 ? (
              certificates.map((cert: Certificate) => (
                <div key={cert.id} className="glass-panel p-8 rounded-xl flex flex-col gap-4">
                  <span className="material-symbols-outlined text-secondary text-3xl">workspace_premium</span>
                  <h3 className="font-headline-sm text-headline-sm text-primary">{cert.title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant flex-grow">{cert.organization}</p>
                  {cert.issue_date && (
                    <span className="font-label-md text-xs px-3 py-1 bg-surface-variant rounded-full text-on-surface-variant w-fit mt-2">
                      {cert.issue_date}
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-3 glass-panel p-12 rounded-xl text-center">
                <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-4">workspace_premium</span>
                <p className="font-body-md text-on-surface-variant">Henüz sertifika eklenmedi.</p>
              </div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-section-gap relative z-10" id="contact">
          <div className="flex justify-between items-end mb-12">
            <h2 className="font-headline-lg text-headline-lg text-primary">İletişim</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            <div className="glass-panel p-8 rounded-xl flex flex-col gap-6">
              <h3 className="font-headline-md text-headline-md text-primary">Bana Ulaşın</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Yeni bir proje başlatmak veya sadece
                merhaba demek mi istiyorsunuz? Formu doldurun, size en kısa sürede geri döneceğim.</p>
              <div className="flex flex-col gap-6 mt-8">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-secondary text-2xl">mail</span>
                  <div>
                    <h4 className="font-label-md text-primary">E-posta</h4>
                    <span className="font-body-md text-on-surface-variant">hello@mydportfolio.com</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-secondary text-2xl">location_on</span>
                  <div>
                    <h4 className="font-label-md text-primary">Konum</h4>
                    <span className="font-body-md text-on-surface-variant">İstanbul, Türkiye</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-secondary text-2xl">phone</span>
                  <div>
                    <h4 className="font-label-md text-primary">Telefon</h4>
                    <span className="font-body-md text-on-surface-variant">+90 (555) 123 45 67</span>
                  </div>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <Footer profile={profile} />
    </>
  );
}
