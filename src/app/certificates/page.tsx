import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";
import { Certificate } from "@/types/database";

export const dynamic = "force-dynamic";

export default async function CertificatesPage() {
  const supabase = createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .limit(1)
    .maybeSingle();

  const { data: certificates } = await supabase
    .from("certificates")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      <Header />
      <main className="flex-grow pt-32 pb-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full relative z-10">
        <section className="mb-section-gap relative z-10">
          <div className="flex flex-col gap-6 mb-12 text-center items-center">
            <h1 className="font-display-lg text-[48px] md:text-[64px] leading-tight text-primary">
              <span className="text-secondary italic font-serif">Sertifikalar</span> &amp; Başarılar
            </h1>
            <p className="font-body-lg text-on-surface-variant max-w-2xl">
              Sürekli öğrenme ve gelişime olan inancımın bir yansıması. Farklı disiplinlerde edindiğim sertifikalar.
            </p>
          </div>

          {certificates && certificates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {certificates.map((cert: Certificate) => (
                <div key={cert.id} className="glass-panel p-8 rounded-2xl flex flex-col gap-6 hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-16 h-16 bg-surface-variant rounded-xl flex items-center justify-center text-secondary mb-2">
                    <span className="material-symbols-outlined text-3xl">workspace_premium</span>
                  </div>
                  <div>
                    <h2 className="font-headline-sm text-primary mb-2">{cert.title}</h2>
                    <p className="font-body-md text-secondary mb-4">{cert.organization}</p>
                    {cert.details && (
                      <p className="font-body-md text-on-surface-variant mb-6">{cert.details}</p>
                    )}
                  </div>
                  <div className="mt-auto flex justify-between items-center border-t border-outline-variant/30 pt-6">
                    {cert.issue_date && (
                      <span className="font-label-md text-on-surface-variant">{cert.issue_date}</span>
                    )}
                    {cert.url && (
                      <a href={cert.url} target="_blank" rel="noopener noreferrer" className="font-label-md text-secondary hover:underline underline-offset-4 flex items-center gap-1">
                        Sertifikayı Gör <span className="material-symbols-outlined text-sm">open_in_new</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-panel p-16 rounded-3xl text-center">
              <span className="material-symbols-outlined text-8xl text-on-surface-variant/20 mb-4">workspace_premium</span>
              <p className="font-body-lg text-on-surface-variant">Henüz sertifika eklenmedi.</p>
            </div>
          )}
        </section>
      </main>
      <Footer profile={profile} />
    </>
  );
}
