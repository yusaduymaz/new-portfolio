'use client';

import { addExperience } from '@/app/admin/experience/actions';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import SubmitButton from '@/components/admin/SubmitButton';
import Link from 'next/link';

const initialState = { message: '', status: '' };

export default function NewExperiencePage() {
  const [state, formAction] = useFormState(addExperience, initialState);

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
          <h3 className="font-headline-md text-headline-md text-primary mb-2">Yeni Deneyim Ekle</h3>
          <form className="flex flex-col gap-6 mt-8" action={formAction}>
            <div>
              <label htmlFor="title" className={labelClass}>Pozisyon *</label>
              <input type="text" name="title" id="title" className={inputClass} placeholder="Örn: Senior Frontend Developer" required />
            </div>
            <div>
              <label htmlFor="company" className={labelClass}>Şirket *</label>
              <input type="text" name="company" id="company" className={inputClass} placeholder="Örn: Google" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="start_date" className={labelClass}>Başlangıç</label>
                <input type="text" name="start_date" id="start_date" className={inputClass} placeholder="Ocak 2022" />
              </div>
              <div>
                <label htmlFor="end_date" className={labelClass}>Bitiş</label>
                <input type="text" name="end_date" id="end_date" className={inputClass} placeholder="Devam ediyor" />
              </div>
            </div>
            <div>
              <label htmlFor="description" className={labelClass}>Açıklama</label>
              <textarea id="description" name="description" rows={4} className={inputClass} placeholder="Görev ve sorumluluklar..." />
            </div>
            <div className="flex items-center justify-end gap-x-3 pt-4">
              <Link href="/admin/experience" className="px-6 py-3 rounded-full font-label-md text-on-surface-variant hover:bg-surface-variant/50 transition-colors">İptal</Link>
              <SubmitButton>Kaydet</SubmitButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
