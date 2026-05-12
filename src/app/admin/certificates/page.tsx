import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Certificate } from '@/types/database';
import { deleteCertificate } from './actions';

export const dynamic = 'force-dynamic';

export default async function CertificatesPage() {
  const supabase = createClient();
  const { data: items, error } = await supabase
    .from('certificates')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return <p className="text-error">Veri yüklenemedi.</p>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-headline-md text-headline-md text-primary">Sertifikalar</h2>
          <p className="font-body-md text-on-surface-variant mt-1">Sertifikalarınızı yönetin.</p>
        </div>
        <Link href="/admin/certificates/new" className="btn-primary px-6 py-3 rounded-full font-label-md flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">add</span> Yeni Ekle
        </Link>
      </div>

      {items && items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item: Certificate) => (
            <div key={item.id} className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="material-symbols-outlined text-3xl text-secondary">workspace_premium</span>
                <form action={deleteCertificate.bind(null, item.id)}>
                  <button type="submit" className="text-on-surface-variant hover:text-error transition-colors">
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </form>
              </div>
              <h3 className="font-headline-sm text-primary">{item.title}</h3>
              <p className="font-body-md text-on-surface-variant">{item.organization}</p>
              {item.issue_date && (
                <span className="font-label-md text-xs px-3 py-1 bg-surface-variant rounded-full text-on-surface-variant w-fit">{item.issue_date}</span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-panel p-12 rounded-3xl text-center">
          <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-4">workspace_premium</span>
          <p className="font-body-md text-on-surface-variant mb-4">Henüz sertifika eklenmedi.</p>
          <Link href="/admin/certificates/new" className="btn-primary px-6 py-3 rounded-full font-label-md">İlk Sertifikayı Ekle</Link>
        </div>
      )}
    </div>
  );
}
