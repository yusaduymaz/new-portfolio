import { getAboutData, updateAboutData } from "./actions";
import SubmitButton from "@/components/admin/SubmitButton";

export const dynamic = 'force-dynamic';

export default async function AboutAdminPage() {
  const aboutData = await getAboutData();

  const inputClass = "block w-full rounded-xl px-4 py-3 bg-surface/50 border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none text-on-surface font-body-md";
  const labelClass = "block font-label-md text-on-surface-variant mb-2";

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-headline-md text-headline-md text-primary mb-2">Hakkımda Bölümünü Yönet</h2>
        <p className="font-body-md text-on-surface-variant">Ana sayfadaki Hakkımda bölümünün içeriğini düzenleyin.</p>
      </div>

      <div className="glass-panel rounded-3xl overflow-hidden">
        <div className="p-8 md:p-10">
          <form action={updateAboutData} className="flex flex-col gap-6">
            <input type="hidden" name="id" value={aboutData?.id || ''} />
            
            <div>
              <label htmlFor="full_name" className={labelClass}>Tam Ad</label>
              <input id="full_name" name="full_name" type="text" defaultValue={aboutData?.full_name || ''} className={inputClass} required />
            </div>

            <div>
              <label htmlFor="title" className={labelClass}>Ünvan</label>
              <input id="title" name="title" type="text" defaultValue={aboutData?.title || ''} className={inputClass} required />
            </div>

            <div>
              <label htmlFor="description" className={labelClass}>Açıklama</label>
              <textarea id="description" name="description" rows={5} defaultValue={aboutData?.description || ''} className={inputClass} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="experience" className={labelClass}>Yıl Deneyim</label>
                <input id="experience" name="experience" type="number" defaultValue={aboutData?.experience || 0} className={inputClass} required />
              </div>
              <div>
                <label htmlFor="completed_projects" className={labelClass}>Tamamlanan Proje</label>
                <input id="completed_projects" name="completed_projects" type="number" defaultValue={aboutData?.completed_projects || 0} className={inputClass} required />
              </div>
              <div>
                <label htmlFor="customer_satisfaction" className={labelClass}>Müşteri Memnuniyeti (%)</label>
                <input id="customer_satisfaction" name="customer_satisfaction" type="number" defaultValue={aboutData?.customer_satisfaction || 100} className={inputClass} required />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <SubmitButton>Kaydet</SubmitButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
