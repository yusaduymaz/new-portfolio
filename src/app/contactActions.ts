'use server'

import { createClient } from '@/lib/supabase/server'

export async function sendMessage(prevState: unknown, formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const message = formData.get('message') as string

  if (!name || !email || !message) {
    return {
      message: 'Lütfen tüm alanları doldurun.',
      status: 'error',
    }
  }

  const supabase = createClient()

  const { error } = await supabase.from('messages').insert([{
    name,
    email,
    message,
    is_read: false,
  }])

  if (error) {
    console.error('Mesaj gönderme hatası:', error)
    return {
      message: 'Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin.',
      status: 'error',
    }
  }

  return {
    message: 'Mesajınız başarıyla gönderildi! En kısa sürede geri dönüş yapacağım.',
    status: 'success',
  }
}
