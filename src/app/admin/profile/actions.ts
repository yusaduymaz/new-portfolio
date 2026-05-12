'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(prevState: unknown, formData: FormData) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return {
      message: 'Unauthorized',
      status: 'error',
    }
  }

  // Text fields
  const fullName = formData.get('fullName') as string
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const linkedin_url = formData.get('linkedin_url') as string
  const github_url = formData.get('github_url') as string
  const twitter_url = formData.get('twitter_url') as string

  // File fields
  const avatarFile = formData.get('avatar') as File
  const cvFile = formData.get('cv') as File

  let avatar_url = formData.get('avatar_url') as string;
  let cv_url = formData.get('current_cv_url') as string;

  // Handle avatar upload
  if (avatarFile && avatarFile.size > 0) {
    // Use a consistent filename without extensions or timestamps so upsert always replaces the exact same file
    const fileName = `avatar-${user.id}`
    
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('avatars')
      .upload(fileName, avatarFile, {
        cacheControl: '0',
        contentType: avatarFile.type,
        upsert: true,
      })
    
    if (uploadError) {
      console.error('Error uploading avatar:', uploadError)
      return {
        message: 'Failed to upload avatar. Check server logs.',
        status: 'error',
      }
    }

    const { data: publicUrlData } = supabase
      .storage
      .from('avatars')
      .getPublicUrl(uploadData.path)

    // Append cache-busting timestamp so browsers/CDN don't serve stale image
    avatar_url = `${publicUrlData.publicUrl}?t=${Date.now()}`
  }

  // Handle CV upload
  if (cvFile && cvFile.size > 0) {
    // Use a consistent filename without timestamps so upsert replaces the exact same file
    const fileName = `cv-${user.id}.pdf`
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('cvs')
      .upload(fileName, cvFile, {
        cacheControl: '0',
        contentType: cvFile.type || 'application/pdf',
        upsert: true,
      })
    
    if (uploadError) {
      console.error('Error uploading CV:', uploadError)
      return {
        message: 'Failed to upload CV. Check server logs.',
        status: 'error',
      }
    }

    const { data: publicUrlData } = supabase
      .storage
      .from('cvs')
      .getPublicUrl(uploadData.path)

    cv_url = `${publicUrlData.publicUrl}?t=${Date.now()}`
  }


  const { error } = await supabase
    .from('profiles')
    .upsert({ 
      id: user.id,
      full_name: fullName, 
      title,
      description,
      avatar_url,
      linkedin_url,
      github_url,
      twitter_url,
      cv_url
    })

  if (error) {
    console.error('Error updating profile:', error)
    return {
      message: 'Failed to update profile. Check server logs.',
      status: 'error',
    }
  }

  revalidatePath('/admin/profile')
  revalidatePath('/')
  return {
    message: 'Profile updated successfully!',
    status: 'success',
    avatar_url: avatar_url,
  }
}
