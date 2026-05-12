import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/ContactForm";
import { createClient } from "@/lib/supabase/server";

export default async function ContactPage() {
  const supabase = createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .maybeSingle();

  return (
    <>
      <Header />
      <main className="flex-grow pt-32 pb-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full relative z-10">
        <section className="mb-section-gap relative z-10">
          <div className="flex flex-col gap-6 mb-12 text-center items-center">
            <h1 className="font-display-lg text-[48px] md:text-[64px] leading-tight text-primary">
              Bana <span className="text-secondary italic font-serif">Ulaşın</span>
            </h1>
            <p className="font-body-lg text-on-surface-variant max-w-2xl">
              Yeni bir proje başlatmak veya sadece merhaba demek mi istiyorsunuz? Aşağıdaki formu doldurun, size en kısa sürede geri döneceğim.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="glass-panel p-10 rounded-3xl flex flex-col gap-8">
              <div>
                <h3 className="font-headline-md text-headline-md text-primary mb-4">İletişim Bilgileri</h3>
                <p className="font-body-md text-on-surface-variant">Bana doğrudan aşağıdaki kanallardan ulaşabilirsiniz veya yandaki iletişim formunu kullanabilirsiniz.</p>
              </div>
              
              <div className="flex flex-col gap-8 mt-4">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-surface-variant rounded-full flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-2xl">mail</span>
                  </div>
                  <div>
                    <h4 className="font-label-md text-primary mb-1">E-posta</h4>
                    <a href="mailto:hello@mydportfolio.com" className="font-body-md text-on-surface-variant hover:text-secondary transition-colors">hello@mydportfolio.com</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-surface-variant rounded-full flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-2xl">location_on</span>
                  </div>
                  <div>
                    <h4 className="font-label-md text-primary mb-1">Konum</h4>
                    <span className="font-body-md text-on-surface-variant">İstanbul, Türkiye</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-surface-variant rounded-full flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-2xl">phone</span>
                  </div>
                  <div>
                    <h4 className="font-label-md text-primary mb-1">Telefon</h4>
                    <a href="tel:+905551234567" className="font-body-md text-on-surface-variant hover:text-secondary transition-colors">+90 (555) 123 45 67</a>
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
