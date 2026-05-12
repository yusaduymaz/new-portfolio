import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Education } from '@/types/database';
import { deleteEducation } from './actions';

export const dynamic = 'force-dynamic';

export default async function EducationPage() {
  const supabase = createClient();
  const { data: items, error } = await supabase
    .from('education')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return <p className="text-error">Veri yüklenemedi.</p>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-headline-md text-headline-md text-primary">Eğitim</h2>
          <p className="font-body-md text-on-surface-variant mt-1">Eğitim bilgilerinizi yönetin.</p>
        </div>
        <Link href="/admin/education/new" className="btn-primary px-6 py-3 rounded-full font-label-md flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">add</span> Yeni Ekle
        </Link>
      </div>

      {items && items.length > 0 ? (
        <div className="flex flex-col gap-4">
          {items.map((item: Education) => (
            <div key={item.id} className="glass-panel p-6 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-6">
                <span className="material-symbols-outlined text-3xl text-secondary">school</span>
                <div>
                  <h3 className="font-headline-sm text-primary">{item.title}</h3>
                  <p className="font-body-md text-on-surface-variant">{item.institution}</p>
                  {(item.start_date || item.end_date) && (
                    <span className="font-label-md text-xs text-on-surface-variant/60">{item.start_date} — {item.end_date || 'Devam ediyor'}</span>
                  )}
                </div>
              </div>
              <form action={deleteEducation.bind(null, item.id)}>
                <button type="submit" className="text-on-surface-variant hover:text-error transition-colors">
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </form>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-panel p-12 rounded-3xl text-center">
          <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-4">school</span>
          <p className="font-body-md text-on-surface-variant mb-4">Henüz eğitim bilgisi eklenmedi.</p>
          <Link href="/admin/education/new" className="btn-primary px-6 py-3 rounded-full font-label-md">İlk Eğitimi Ekle</Link>
        </div>
      )}
    </div>
  );
}
