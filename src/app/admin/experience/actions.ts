'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addExperience(prevState: unknown, formData: FormData) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { message: 'Unauthorized', status: 'error' }

  const title = formData.get('title') as string
  if (!title) return { message: 'Başlık gerekli', status: 'error' }

  const { error } = await supabase.from('experience').insert([{
    title,
    company: formData.get('company') as string,
    start_date: formData.get('start_date') as string,
    end_date: formData.get('end_date') as string,
    description: formData.get('description') as string,
  }])

  if (error) return { message: 'Deneyim eklenemedi.', status: 'error' }

  revalidatePath('/admin/experience')
  revalidatePath('/')
  return { message: 'Deneyim başarıyla eklendi!', status: 'success' }
}

export async function deleteExperience(id: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase.from('experience').delete().eq('id', id)
  if (error) throw new Error('Failed to delete')

  revalidatePath('/admin/experience')
  revalidatePath('/')
}
