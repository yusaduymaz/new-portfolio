'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function toggleMessageReadStatus(id: string, currentStatus: boolean) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase
    .from('messages')
    .update({ is_read: !currentStatus })
    .eq('id', id)

  if (error) {
    console.error('Mesaj durumu güncellenirken hata oluştu:', error)
    throw new Error('Mesaj durumu güncellenemedi.')
  }

  revalidatePath('/admin/messages')
}

export async function deleteMessage(id: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase
    .from('messages')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Mesaj silinirken hata oluştu:', error)
    throw new Error('Mesaj silinemedi.')
  }

  revalidatePath('/admin/messages')
}
