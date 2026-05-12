'use client';

import { addProject } from '@/app/admin/projects/actions';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import SubmitButton from '@/components/admin/SubmitButton';
import Link from 'next/link';

const initialState = {
  message: '',
  status: '',
};

export default function NewProjectPage() {
  const [state, formAction] = useFormState(addProject, initialState);

  useEffect(() => {
    if (state.status === 'success') {
      toast.success(state.message);
    } else if (state.status === 'error') {
      toast.error(state.message);
    }
  }, [state]);

  const inputClass = "block w-full rounded-xl px-4 py-3 bg-surface/50 border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none text-on-surface font-body-md";
  const labelClass = "block font-label-md text-on-surface-variant mb-2";

  return (
    <div className="mx-auto max-w-2xl">
      <div className="glass-panel rounded-3xl overflow-hidden">
        <div className="p-8 md:p-10">
          <h3 className="font-headline-md text-headline-md text-primary mb-2">Yeni Proje Ekle</h3>
          <p className="font-body-md text-on-surface-variant mb-8">Proje bilgilerini doldurun.</p>
          <form className="flex flex-col gap-6" action={formAction}>
            <div>
              <label htmlFor="title" className={labelClass}>Proje Başlığı *</label>
              <input type="text" name="title" id="title" className={inputClass} placeholder="Örn: Harika Web Sitesi" required />
            </div>

            <div>
              <label htmlFor="category" className={labelClass}>Kategori</label>
              <select name="category" id="category" className={inputClass}>
                <option value="">Seçiniz...</option>
                <option value="WEB TASARIM">Web Tasarım</option>
                <option value="UYGULAMA TASARIMI">Uygulama Tasarımı</option>
                <option value="DASHBOARD">Dashboard</option>
                <option value="E-TİCARET">E-Ticaret</option>
                <option value="MOBİL UYGULAMA">Mobil Uygulama</option>
                <option value="VERİ BİLİMİ">Veri Bilimi</option>
                <option value="API">API</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className={labelClass}>Kısa Açıklama</label>
              <textarea id="description" name="description" rows={3} className={inputClass} placeholder="Projenin kısa bir özeti." />
            </div>

            <div>
              <label htmlFor="content" className={labelClass}>Detaylı Açıklama</label>
              <textarea id="content" name="content" rows={5} className={inputClass} placeholder="Proje hakkında detaylı bilgi..." />
            </div>

            <div>
              <label htmlFor="technologies" className={labelClass}>Teknolojiler</label>
              <input type="text" name="technologies" id="technologies" className={inputClass} placeholder="React, Next.js, Python (virgülle ayırın)" />
              <p className="font-body-sm text-on-surface-variant/60 mt-1 text-xs">Teknolojileri virgülle ayırarak yazın.</p>
            </div>

            <div>
              <label htmlFor="image_file" className={labelClass}>Görsel Dosyası Yükle</label>
              <input type="file" name="image_file" id="image_file" accept="image/*" className="block w-full text-sm text-on-surface-variant file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-label-md file:bg-secondary/10 file:text-secondary hover:file:bg-secondary/20 file:transition-colors cursor-pointer" />
              <p className="font-body-sm text-on-surface-variant/60 mt-1 text-xs">Bilgisayarınızdan bir görsel dosyası seçebilirsiniz.</p>
            </div>

            <div>
              <label htmlFor="image_url" className={labelClass}>Veya Görsel URL (Alternatif)</label>
              <input type="url" name="image_url" id="image_url" className={inputClass} placeholder="https://example.com/image.png" />
            </div>

            <div>
              <label htmlFor="live_url" className={labelClass}>Canlı URL</label>
              <input type="url" name="live_url" id="live_url" className={inputClass} placeholder="https://my-website.com" />
            </div>

            <div>
              <label htmlFor="github_url" className={labelClass}>GitHub URL</label>
              <input type="url" name="github_url" id="github_url" className={inputClass} placeholder="https://github.com/user/repo" />
            </div>

            <div className="flex items-center justify-end gap-x-3 pt-4">
              <Link href="/admin/projects" className="px-6 py-3 rounded-full font-label-md text-on-surface-variant hover:bg-surface-variant/50 transition-colors">İptal</Link>
              <SubmitButton>Kaydet</SubmitButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
