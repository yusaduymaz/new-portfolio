'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addTestimonial(prevState: unknown, formData: FormData) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { message: 'Unauthorized', status: 'error' }

  const name = formData.get('name') as string
  if (!name) return { message: 'İsim gerekli', status: 'error' }

  const { error } = await supabase.from('testimonials').insert([{
    name,
    title: formData.get('title') as string,
    company: formData.get('company') as string,
    content: formData.get('content') as string,
    image_url: formData.get('image_url') as string,
  }])

  if (error) return { message: 'Yorum eklenemedi.', status: 'error' }

  revalidatePath('/admin/testimonials')
  revalidatePath('/')
  return { message: 'Yorum başarıyla eklendi!', status: 'success' }
}

export async function deleteTestimonial(id: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase.from('testimonials').delete().eq('id', id)
  if (error) throw new Error('Failed to delete')

  revalidatePath('/admin/testimonials')
  revalidatePath('/')
}
