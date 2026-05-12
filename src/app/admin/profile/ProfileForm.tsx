'use client'

import { updateProfile } from '@/app/admin/profile/actions'
import { useFormState } from 'react-dom'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import SubmitButton from '@/components/admin/SubmitButton'
import type { Profile } from '@/types/database'
import Image from 'next/image'

const initialState = {
  message: '',
  status: '',
  avatar_url: '',
}

export default function ProfileForm({ profile }: { profile: Profile | null }) {
  const [state, formAction] = useFormState(updateProfile, initialState)
  const [previewUrl, setPreviewUrl] = useState<string | null>(profile?.avatar_url || null);

  // Sync previewUrl when profile prop changes (after server revalidation)
  useEffect(() => {
    if (profile?.avatar_url) {
      setPreviewUrl(profile.avatar_url);
    }
  }, [profile?.avatar_url]);

  useEffect(() => {
    if (state.status === 'success') {
      toast.success(state.message)
      // Update the preview with the new avatar URL from the server action
      if (state.avatar_url) {
        setPreviewUrl(state.avatar_url)
      }
    } else if (state.status === 'error') {
      toast.error(state.message)
    }
  }, [state])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
        setPreviewUrl(profile?.avatar_url || null)
    }
  };

  const inputClass = "block w-full rounded-xl px-4 py-3 bg-surface/50 border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none text-on-surface font-body-md"
  const labelClass = "block font-label-md text-on-surface-variant mb-2"

  return (
    <form className="flex flex-col gap-6" action={formAction} encType="multipart/form-data">
      <input type="hidden" name="avatar_url" value={profile?.avatar_url || ''} />
      <input type="hidden" name="current_cv_url" value={profile?.cv_url ?? ""} />
      <div className="flex items-center gap-4">
        {previewUrl ? (
            <Image src={previewUrl} alt="Avatar Preview" width={80} height={80} className="w-20 h-20 rounded-full object-cover" unoptimized />
        ) : (
            <div className="w-20 h-20 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant">
                <span>Resim</span>
            </div>
        )}
        <div>
          <label htmlFor="avatar" className={labelClass}>Profil Fotoğrafı</label>
          <input type="file" name="avatar" id="avatar" accept="image/*" onChange={handleFileChange} className="text-sm text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-secondary-container file:text-on-secondary-container hover:file:bg-secondary-container/80" />
          <p className="font-body-sm text-on-surface-variant/60 mt-1 text-xs">Yeni bir resim yükleyerek mevcut olanı değiştirin.</p>
        </div>
      </div>

      <div>
        <label htmlFor="fullName" className={labelClass}>Ad Soyad</label>
        <input type="text" name="fullName" id="fullName" className={inputClass} defaultValue={profile?.full_name || ''} placeholder="Yuşa Duymaz" />
      </div>

      <div>
        <label htmlFor="title" className={labelClass}>Unvan</label>
        <input type="text" name="title" id="title" className={inputClass} defaultValue={profile?.title || ''} placeholder="Data Science & AI FullStack Development" />
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>Açıklama</label>
        <textarea id="description" name="description" rows={5} className={inputClass} defaultValue={profile?.description || ''} placeholder="İşletmenizin öne çıkmasına yardımcı olacak..." />
      </div>

      <div>
        <label htmlFor="linkedin_url" className={labelClass}>LinkedIn URL</label>
        <input type="url" name="linkedin_url" id="linkedin_url" className={inputClass} defaultValue={profile?.linkedin_url || ''} placeholder="https://linkedin.com/in/..." />
      </div>

      <div>
        <label htmlFor="github_url" className={labelClass}>GitHub URL</label>
        <input type="url" name="github_url" id="github_url" className={inputClass} defaultValue={profile?.github_url || ''} placeholder="https://github.com/..." />
      </div>

      <div>
        <label htmlFor="twitter_url" className={labelClass}>Twitter URL</label>
        <input type="url" name="twitter_url" id="twitter_url" className={inputClass} defaultValue={profile?.twitter_url || ''} placeholder="https://twitter.com/..." />
      </div>

      <div>
          <label htmlFor="cv" className={labelClass}>CV (PDF)</label>
          <input type="file" name="cv" id="cv" accept=".pdf" className="text-sm text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-secondary-container file:text-on-secondary-container hover:file:bg-secondary-container/80" />
          {profile?.cv_url && (
            <p className="font-body-sm text-on-surface-variant/60 mt-1 text-xs">
              Mevcut CV: <a href={profile.cv_url} target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Görüntüle</a>
            </p>
          )}
      </div>

      <div className="flex items-center justify-end pt-4">
        <SubmitButton>Kaydet</SubmitButton>
      </div>
    </form>
  )
}
