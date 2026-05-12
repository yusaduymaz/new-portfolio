'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addExpertise(prevState: unknown, formData: FormData) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { message: 'Unauthorized', status: 'error' }

  const title = formData.get('title') as string
  if (!title) return { message: 'Başlık gerekli', status: 'error' }

  const { error } = await supabase.from('expertise').insert([{
    title,
    description: formData.get('description') as string,
    icon: formData.get('icon') as string,
    category: formData.get('category') as string,
  }])

  if (error) {
    console.error('Error inserting expertise:', error)
    return { message: 'Uzmanlık eklenemedi.', status: 'error' }
  }

  revalidatePath('/admin/expertise')
  revalidatePath('/')
  return { message: 'Uzmanlık başarıyla eklendi!', status: 'success' }
}

export async function deleteExpertise(id: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase.from('expertise').delete().eq('id', id)
  if (error) throw new Error('Failed to delete expertise')

  revalidatePath('/admin/expertise')
  revalidatePath('/')
}
