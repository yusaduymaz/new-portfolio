'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addEducation(prevState: unknown, formData: FormData) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { message: 'Unauthorized', status: 'error' }

  const title = formData.get('title') as string
  if (!title) return { message: 'Başlık gerekli', status: 'error' }

  const { error } = await supabase.from('education').insert([{
    title,
    institution: formData.get('institution') as string,
    start_date: formData.get('start_date') as string,
    end_date: formData.get('end_date') as string,
    description: formData.get('description') as string,
  }])

  if (error) return { message: 'Eğitim eklenemedi.', status: 'error' }

  revalidatePath('/admin/education')
  revalidatePath('/')
  return { message: 'Eğitim başarıyla eklendi!', status: 'success' }
}

export async function deleteEducation(id: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase.from('education').delete().eq('id', id)
  if (error) throw new Error('Failed to delete')

  revalidatePath('/admin/education')
  revalidatePath('/')
}
