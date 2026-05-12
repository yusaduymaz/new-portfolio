'use client';

import { addTestimonial } from '@/app/admin/testimonials/actions';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import SubmitButton from '@/components/admin/SubmitButton';
import Link from 'next/link';

const initialState = { message: '', status: '' };

export default function NewTestimonialPage() {
  const [state, formAction] = useFormState(addTestimonial, initialState);

  useEffect(() => {
    if (state.status === 'success') toast.success(state.message);
    else if (state.status === 'error') toast.error(state.message);
  }, [state]);

  const inputClass = "block w-full rounded-xl px-4 py-3 bg-surface/50 border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none text-on-surface font-body-md";
  const labelClass = "block font-label-md text-on-surface-variant mb-2";

  return (
    <div className="mx-auto max-w-2xl">
      <div className="glass-panel rounded-3xl overflow-hidden">
        <div className="p-8 md:p-10">
          <h3 className="font-headline-md text-headline-md text-primary mb-2">Yeni Yorum Ekle</h3>
          <form className="flex flex-col gap-6 mt-8" action={formAction}>
            <div>
              <label htmlFor="name" className={labelClass}>İsim *</label>
              <input type="text" name="name" id="name" className={inputClass} placeholder="Müşteri adı" required />
            </div>
            <div>
              <label htmlFor="title" className={labelClass}>Unvan</label>
              <input type="text" name="title" id="title" className={inputClass} placeholder="Örn: CEO" />
            </div>
            <div>
              <label htmlFor="company" className={labelClass}>Şirket</label>
              <input type="text" name="company" id="company" className={inputClass} placeholder="Örn: Tech Corp" />
            </div>
            <div>
              <label htmlFor="content" className={labelClass}>Yorum *</label>
              <textarea id="content" name="content" rows={4} className={inputClass} placeholder="Müşteri yorumu..." required />
            </div>
            <div>
              <label htmlFor="image_url" className={labelClass}>Profil Fotoğrafı URL</label>
              <input type="url" name="image_url" id="image_url" className={inputClass} placeholder="https://..." />
            </div>
            <div className="flex items-center justify-end gap-x-3 pt-4">
              <Link href="/admin/testimonials" className="px-6 py-3 rounded-full font-label-md text-on-surface-variant hover:bg-surface-variant/50 transition-colors">İptal</Link>
              <SubmitButton>Kaydet</SubmitButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
