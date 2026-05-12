'use client';

import { addCertificate } from '@/app/admin/certificates/actions';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import SubmitButton from '@/components/admin/SubmitButton';
import Link from 'next/link';

const initialState = { message: '', status: '' };

export default function NewCertificatePage() {
  const [state, formAction] = useFormState(addCertificate, initialState);

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
          <h3 className="font-headline-md text-headline-md text-primary mb-2">Yeni Sertifika Ekle</h3>
          <form className="flex flex-col gap-6 mt-8" action={formAction}>
            <div>
              <label htmlFor="title" className={labelClass}>Sertifika Adı *</label>
              <input type="text" name="title" id="title" className={inputClass} placeholder="Örn: Advanced React Patterns" required />
            </div>
            <div>
              <label htmlFor="organization" className={labelClass}>Kuruluş *</label>
              <input type="text" name="organization" id="organization" className={inputClass} placeholder="Örn: Frontend Masters" required />
            </div>
            <div>
              <label htmlFor="issue_date" className={labelClass}>Tarih</label>
              <input type="text" name="issue_date" id="issue_date" className={inputClass} placeholder="Örn: 2023" />
            </div>
            <div>
              <label htmlFor="url" className={labelClass}>Sertifika URL</label>
              <input type="url" name="url" id="url" className={inputClass} placeholder="https://..." />
            </div>
            <div>
              <label htmlFor="image_url" className={labelClass}>Görsel URL</label>
              <input type="url" name="image_url" id="image_url" className={inputClass} placeholder="https://..." />
            </div>
            <div>
              <label htmlFor="details" className={labelClass}>Detaylar</label>
              <textarea id="details" name="details" rows={3} className={inputClass} placeholder="Ek bilgiler..." />
            </div>
            <div className="flex items-center justify-end gap-x-3 pt-4">
              <Link href="/admin/certificates" className="px-6 py-3 rounded-full font-label-md text-on-surface-variant hover:bg-surface-variant/50 transition-colors">İptal</Link>
              <SubmitButton>Kaydet</SubmitButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
