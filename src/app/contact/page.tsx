import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/ContactForm";
import { createPublicClient as createClient } from "@/lib/supabase/public";
import { WordPullUp } from "@/components/ui/word-pull-up";
import { Particles } from "@/components/ui/particles";
import { MagicCard } from "@/components/ui/magic-card";
import Icon from "@/components/ui/icon";
import type { Metadata } from "next";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Yeni bir proje başlatmak veya sadece merhaba demek için iletişim formunu doldurun — en kısa sürede geri döneceğim.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const supabase = createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .maybeSingle();

  return (
    <>
      <Header />
      <main id="main" className="flex-grow pt-32 pb-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full relative z-10 overflow-hidden">
        <Particles
          className="absolute inset-0 -z-10"
          quantity={50}
          ease={80}
          color="#191c1d"
          refresh
        />

        <section className="mb-section-gap relative z-10">
          <div className="flex flex-col gap-6 mb-16 text-center items-center">
            <WordPullUp
              className="font-display-lg text-[48px] md:text-[72px] leading-[1.1] text-primary"
              words="Bana Ulaşın"
            />
            <p className="font-body-lg text-on-surface-variant max-w-2xl mt-4">
              Yeni bir proje başlatmak veya sadece merhaba demek mi istiyorsunuz? Aşağıdaki formu doldurun, size en kısa sürede geri döneceğim.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-x-gutter">
            <div className="col-span-1 lg:col-span-5 flex flex-col h-full">
              <MagicCard
                className="glass-panel p-10 rounded-3xl flex flex-col gap-10 h-full"
                gradientColor="rgba(197, 160, 89, 0.15)"
              >
                <div>
                  <h3 className="font-headline-lg text-primary mb-4 border-b border-outline-variant/30 pb-4">İletişim Bilgileri</h3>
                  <p className="font-body-md text-on-surface-variant">
                    Bana doğrudan aşağıdaki kanallardan ulaşabilirsiniz veya yandaki iletişim formunu kullanabilirsiniz.
                  </p>
                </div>

                <div className="flex flex-col gap-8 flex-grow justify-center">
                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 bg-surface-variant rounded-full flex items-center justify-center text-secondary transition-transform duration-300 group-hover:scale-110 group-hover:bg-secondary group-hover:text-white shadow-sm">
                      <Icon name="mail" className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-label-md text-primary mb-1 uppercase tracking-wider text-xs text-on-surface-variant">E-posta</h4>
                      <a href="mailto:hello@mydportfolio.com" className="font-body-lg text-primary font-medium hover:text-secondary transition-colors">hello@mydportfolio.com</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 bg-surface-variant rounded-full flex items-center justify-center text-secondary transition-transform duration-300 group-hover:scale-110 group-hover:bg-secondary group-hover:text-white shadow-sm">
                      <Icon name="location_on" className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-label-md text-primary mb-1 uppercase tracking-wider text-xs text-on-surface-variant">Konum</h4>
                      <span className="font-body-lg text-primary font-medium">İstanbul, Türkiye</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 bg-surface-variant rounded-full flex items-center justify-center text-secondary transition-transform duration-300 group-hover:scale-110 group-hover:bg-secondary group-hover:text-white shadow-sm">
                      <Icon name="phone" className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-label-md text-primary mb-1 uppercase tracking-wider text-xs text-on-surface-variant">Telefon</h4>
                      <a href="tel:+905551234567" className="font-body-lg text-primary font-medium hover:text-secondary transition-colors">+90 (555) 123 45 67</a>
                    </div>
                  </div>
                </div>
              </MagicCard>
            </div>

            <div className="col-span-1 lg:col-span-7 flex flex-col">
              <ContactForm />
            </div>

          </div>
        </section>
      </main>
      <Footer profile={profile} />
    </>
  );
}

