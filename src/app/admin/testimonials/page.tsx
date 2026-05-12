import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Testimonial } from '@/types/database';
import { deleteTestimonial } from './actions';

export const dynamic = 'force-dynamic';

export default async function TestimonialsPage() {
  const supabase = createClient();
  const { data: items, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return <p className="text-error">Veri yüklenemedi.</p>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-headline-md text-headline-md text-primary">Müşteri Yorumları</h2>
          <p className="font-body-md text-on-surface-variant mt-1">Müşteri geri bildirimlerini yönetin.</p>
        </div>
        <Link href="/admin/testimonials/new" className="btn-primary px-6 py-3 rounded-full font-label-md flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">add</span> Yeni Ekle
        </Link>
      </div>

      {items && items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item: Testimonial) => (
            <div key={item.id} className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="material-symbols-outlined text-3xl text-secondary">format_quote</span>
                <form action={deleteTestimonial.bind(null, item.id)}>
                  <button type="submit" className="text-on-surface-variant hover:text-error transition-colors">
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </form>
              </div>
              <p className="font-body-md text-on-surface-variant italic">&quot;{item.content}&quot;</p>
              <div>
                <h3 className="font-headline-sm text-primary">{item.name}</h3>
                {item.title && <p className="font-body-sm text-on-surface-variant">{item.title}{item.company ? ` — ${item.company}` : ''}</p>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-panel p-12 rounded-3xl text-center">
          <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-4">format_quote</span>
          <p className="font-body-md text-on-surface-variant mb-4">Henüz yorum eklenmedi.</p>
          <Link href="/admin/testimonials/new" className="btn-primary px-6 py-3 rounded-full font-label-md">İlk Yorumu Ekle</Link>
        </div>
      )}
    </div>
  );
}
