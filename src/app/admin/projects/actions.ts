'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addProject(prevState: unknown, formData: FormData) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return {
        message: 'Unauthorized',
        status: 'error',
    }
  }

  const title = formData.get('title') as string
  if (!title) {
    return {
        message: 'Proje başlığı zorunludur',
        status: 'error',
    }
  }

  const technologiesRaw = formData.get('technologies') as string;
  const technologies = technologiesRaw ? technologiesRaw.split(',').map(t => t.trim()).filter(Boolean) : [];

  let image_url = formData.get('image_url') as string;
  const imageFile = formData.get('image_file') as File;

  if (imageFile && imageFile.size > 0) {
    const uniqueSuffix = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const extension = imageFile.name.split('.').pop() || 'png';
    const fileName = `project-${uniqueSuffix}.${extension}`;
    
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('projects')
      .upload(fileName, imageFile, {
        cacheControl: '3600',
        contentType: imageFile.type,
        upsert: false,
      });
    
    if (uploadError) {
      console.error('Error uploading project image:', uploadError);
      return {
        message: 'Görsel yüklenemedi. Lütfen dosya boyutunu veya formatını kontrol edin.',
        status: 'error',
      };
    }

    const { data: publicUrlData } = supabase
      .storage
      .from('projects')
      .getPublicUrl(uploadData.path);

    image_url = publicUrlData.publicUrl;
  }

  const { error } = await supabase
    .from('projects')
    .insert([{ 
        title, 
        description: formData.get('description') as string,
        content: formData.get('content') as string,
        image_url, 
        live_url: formData.get('live_url') as string, 
        github_url: formData.get('github_url') as string,
        category: formData.get('category') as string,
        technologies,
        sort_order: parseInt(formData.get('sort_order') as string) || 0,
    }])

  if (error) {
    console.error('Error inserting project:', error)
    return {
        message: 'Proje eklenirken bir hata oluştu. Sunucu günlüklerini kontrol edin.',
        status: 'error',
    }
  }

  revalidatePath('/admin/projects')
  revalidatePath('/')
  return {
    message: 'Proje başarıyla eklendi!',
    status: 'success',
  }
}

export async function deleteProject(id: string) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
  
    if (!user) {
        throw new Error('Unauthorized')
    }
  
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
  
    if (error) {
      console.error('Error deleting project:', error)
      throw new Error('Proje silinemedi')
    }
  
    revalidatePath('/admin/projects')
    revalidatePath('/')
}

export async function updateProject(id: string, prevState: unknown, formData: FormData) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return {
        message: 'Unauthorized',
        status: 'error',
    }
  }

  const title = formData.get('title') as string
  if (!title) {
    return {
        message: 'Proje başlığı zorunludur',
        status: 'error',
    }
  }

  const technologiesRaw = formData.get('technologies') as string;
  const technologies = technologiesRaw ? technologiesRaw.split(',').map(t => t.trim()).filter(Boolean) : [];

  let image_url = formData.get('image_url') as string;
  const imageFile = formData.get('image_file') as File;

  if (imageFile && imageFile.size > 0) {
    const uniqueSuffix = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const extension = imageFile.name.split('.').pop() || 'png';
    const fileName = `project-${uniqueSuffix}.${extension}`;
    
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('projects')
      .upload(fileName, imageFile, {
        cacheControl: '3600',
        contentType: imageFile.type,
        upsert: false,
      });
    
    if (uploadError) {
      console.error('Error uploading project image:', uploadError);
      return {
        message: 'Görsel yüklenemedi. Lütfen dosya boyutunu veya formatını kontrol edin.',
        status: 'error',
      };
    }

    const { data: publicUrlData } = supabase
      .storage
      .from('projects')
      .getPublicUrl(uploadData.path);

    image_url = publicUrlData.publicUrl;
  }

  const { error } = await supabase
    .from('projects')
    .update({ 
        title, 
        description: formData.get('description') as string,
        content: formData.get('content') as string,
        image_url, 
        live_url: formData.get('live_url') as string, 
        github_url: formData.get('github_url') as string,
        category: formData.get('category') as string,
        technologies,
        sort_order: parseInt(formData.get('sort_order') as string) || 0,
    })
    .eq('id', id)

  if (error) {
    console.error('Error updating project:', error)
    return {
        message: 'Proje güncellenirken bir hata oluştu. Sunucu günlüklerini kontrol edin.',
        status: 'error',
    }
  }

  revalidatePath('/admin/projects')
  revalidatePath('/')
  return {
    message: 'Proje başarıyla güncellendi!',
    status: 'success',
  }
}
