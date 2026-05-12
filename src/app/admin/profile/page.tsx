
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import ProfileForm from './ProfileForm'

export default async function ProfilePage() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle()

  return (
    <div className="mx-auto max-w-2xl">
      <div className="glass-panel rounded-3xl overflow-hidden">
        <div className="p-8 md:p-10">
          <h3 className="font-headline-md text-headline-md text-primary mb-2">Profili Düzenle</h3>
          <p className="font-body-md text-on-surface-variant mb-8">Kişisel bilgilerinizi ve profil resminizi güncelleyin.</p>
          <ProfileForm profile={profile} />
        </div>
      </div>
    </div>
  )
}
