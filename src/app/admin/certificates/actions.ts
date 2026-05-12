'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addCertificate(prevState: unknown, formData: FormData) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { message: 'Unauthorized', status: 'error' }

  const title = formData.get('title') as string
  if (!title) return { message: 'Başlık gerekli', status: 'error' }

  const { error } = await supabase.from('certificates').insert([{
    title,
    organization: formData.get('organization') as string,
    issue_date: formData.get('issue_date') as string,
    url: formData.get('url') as string,
    image_url: formData.get('image_url') as string,
    details: formData.get('details') as string,
  }])

  if (error) {
    console.error('Error inserting certificate:', error)
    return { message: 'Sertifika eklenemedi.', status: 'error' }
  }

  revalidatePath('/admin/certificates')
  revalidatePath('/')
  return { message: 'Sertifika başarıyla eklendi!', status: 'success' }
}

export async function deleteCertificate(id: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase.from('certificates').delete().eq('id', id)
  if (error) throw new Error('Failed to delete certificate')

  revalidatePath('/admin/certificates')
  revalidatePath('/')
}
