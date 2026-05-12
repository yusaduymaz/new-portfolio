'use client';

import { addExpertise } from '@/app/admin/expertise/actions';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import SubmitButton from '@/components/admin/SubmitButton';
import Link from 'next/link';

const initialState = { message: '', status: '' };

export default function NewExpertisePage() {
  const [state, formAction] = useFormState(addExpertise, initialState);

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
          <h3 className="font-headline-md text-headline-md text-primary mb-2">Yeni Uzmanlık Ekle</h3>
          <form className="flex flex-col gap-6 mt-8" action={formAction}>
            <div>
              <label htmlFor="title" className={labelClass}>Başlık *</label>
              <input type="text" name="title" id="title" className={inputClass} placeholder="Örn: Machine Learning" required />
            </div>
            <div>
              <label htmlFor="description" className={labelClass}>Açıklama *</label>
              <textarea id="description" name="description" rows={3} className={inputClass} placeholder="Uzmanlık açıklaması..." required />
            </div>
            <div>
              <label htmlFor="icon" className={labelClass}>İkon (Material Symbol adı)</label>
              <input type="text" name="icon" id="icon" className={inputClass} placeholder="Örn: model_training, analytics, code" />
              <p className="font-body-sm text-on-surface-variant/60 mt-1 text-xs">Material Symbols Outlined ikon adı girin.</p>
            </div>
            <div>
              <label htmlFor="category" className={labelClass}>Kategori</label>
              <select name="category" id="category" className={inputClass}>
                <option value="">Seçiniz...</option>
                <option value="Data Science">Data Science</option>
                <option value="Full-stack Development">Full-stack Development</option>
                <option value="Diğer">Diğer</option>
              </select>
            </div>
            <div className="flex items-center justify-end gap-x-3 pt-4">
              <Link href="/admin/expertise" className="px-6 py-3 rounded-full font-label-md text-on-surface-variant hover:bg-surface-variant/50 transition-colors">İptal</Link>
              <SubmitButton>Kaydet</SubmitButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
