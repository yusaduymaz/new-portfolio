'use client';

import { updateProject } from '@/app/admin/projects/actions';
import { Project } from '@/types/database';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import SubmitButton from '@/components/admin/SubmitButton';
import Link from 'next/link';

type EditProjectFormProps = {
    project: Project;
}

const initialState = {
  message: '',
  status: '',
};

export default function EditProjectForm({ project }: EditProjectFormProps) {
  const updateProjectWithId = updateProject.bind(null, project.id);
  const [state, formAction] = useFormState(updateProjectWithId, initialState);

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
          <h3 className="font-headline-md text-headline-md text-primary mb-2">Proje Düzenle</h3>
          <p className="font-body-md text-on-surface-variant mb-8">Proje bilgilerini güncelleyin.</p>
          <form className="flex flex-col gap-6" action={formAction}>
            <div>
              <label htmlFor="title" className={labelClass}>Proje Başlığı *</label>
              <input type="text" name="title" id="title" className={inputClass} defaultValue={project.title} required />
            </div>

            <div>
              <label htmlFor="category" className={labelClass}>Kategori</label>
              <select name="category" id="category" className={inputClass} defaultValue={project.category || ''}>
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
              <label htmlFor="sort_order" className={labelClass}>Sıra Numarası (Küçük olan önce çıkar)</label>
              <input type="number" name="sort_order" id="sort_order" className={inputClass} defaultValue={project.sort_order ?? 0} />
            </div>

            <div>
              <label htmlFor="description" className={labelClass}>Kısa Açıklama</label>
              <textarea id="description" name="description" rows={3} className={inputClass} defaultValue={project.description || ''} />
            </div>

            <div>
              <label htmlFor="content" className={labelClass}>Detaylı Açıklama</label>
              <textarea id="content" name="content" rows={5} className={inputClass} defaultValue={project.content || ''} />
            </div>

            <div>
              <label htmlFor="technologies" className={labelClass}>Teknolojiler</label>
              <input type="text" name="technologies" id="technologies" className={inputClass} defaultValue={project.technologies?.join(', ') || ''} />
              <p className="font-body-sm text-on-surface-variant/60 mt-1 text-xs">Teknolojileri virgülle ayırarak yazın.</p>
            </div>

            <div>
              <label htmlFor="image_file" className={labelClass}>Yeni Görsel Dosyası Yükle</label>
              <input type="file" name="image_file" id="image_file" accept="image/*" className="block w-full text-sm text-on-surface-variant file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-label-md file:bg-secondary/10 file:text-secondary hover:file:bg-secondary/20 file:transition-colors cursor-pointer" />
              <p className="font-body-sm text-on-surface-variant/60 mt-1 text-xs">Yeni bir dosya seçerseniz mevcut görsel değiştirilecektir.</p>
            </div>

            <div>
              <label htmlFor="image_url" className={labelClass}>Mevcut Görsel URL / Alternatif Link</label>
              <input type="url" name="image_url" id="image_url" className={inputClass} defaultValue={project.image_url || ''} />
            </div>

            <div>
              <label htmlFor="live_url" className={labelClass}>Canlı URL</label>
              <input type="url" name="live_url" id="live_url" className={inputClass} defaultValue={project.live_url || ''} />
            </div>

            <div>
              <label htmlFor="github_url" className={labelClass}>GitHub URL</label>
              <input type="url" name="github_url" id="github_url" className={inputClass} defaultValue={project.github_url || ''} />
            </div>

            <div className="flex items-center justify-end gap-x-3 pt-4">
              <Link href="/admin/projects" className="px-6 py-3 rounded-full font-label-md text-on-surface-variant hover:bg-surface-variant/50 transition-colors">İptal</Link>
              <SubmitButton>Güncelle</SubmitButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
