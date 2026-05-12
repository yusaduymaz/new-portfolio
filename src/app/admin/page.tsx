import { createClient } from '@/lib/supabase/server'

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const supabase = createClient()

  const { count: projectsCount } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true })
    
  const { count: educationCount } = await supabase
    .from('education')
    .select('*', { count: 'exact', head: true })

  const { count: experienceCount } = await supabase
    .from('experience')
    .select('*', { count: 'exact', head: true })

  const { count: expertiseCount } = await supabase
    .from('expertise')
    .select('*', { count: 'exact', head: true })

  const { count: certificatesCount } = await supabase
    .from('certificates')
    .select('*', { count: 'exact', head: true })

  const { count: testimonialsCount } = await supabase
    .from('testimonials')
    .select('*', { count: 'exact', head: true })

  const stats = [
    { name: 'Toplam Projeler', count: projectsCount || 0, icon: 'folder_open', color: 'text-secondary' },
    { name: 'Uzmanlık Alanları', count: expertiseCount || 0, icon: 'analytics', color: 'text-on-surface-variant' },
    { name: 'Sertifikalar', count: certificatesCount || 0, icon: 'workspace_premium', color: 'text-secondary' },
    { name: 'Eğitim', count: educationCount || 0, icon: 'school', color: 'text-on-surface-variant' },
    { name: 'Deneyim', count: experienceCount || 0, icon: 'work', color: 'text-secondary' },
    { name: 'Müşteri Yorumları', count: testimonialsCount || 0, icon: 'format_quote', color: 'text-on-surface-variant' },
  ];

  return (
    <div className="flex flex-col gap-12">
      <div>
        <h2 className="font-headline-lg text-headline-md text-primary mb-2">Genel Bakış</h2>
        <p className="font-body-md text-on-surface-variant">Sitenizdeki içeriklerin anlık özet durumu.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="glass-panel p-8 rounded-3xl flex flex-col gap-4 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
            <span className={`material-symbols-outlined text-6xl absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity ${stat.color}`}>
              {stat.icon}
            </span>
            <div className={`w-12 h-12 rounded-2xl bg-surface-variant flex items-center justify-center ${stat.color}`}>
              <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
            </div>
            <div>
              <p className="font-label-md text-on-surface-variant mb-1">{stat.name}</p>
              <p className="font-display-lg text-4xl text-primary">{stat.count}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-panel p-10 rounded-3xl mt-8 flex items-center justify-between">
        <div>
          <h3 className="font-headline-sm text-primary mb-2">Hoş Geldiniz!</h3>
          <p className="font-body-md text-on-surface-variant max-w-2xl">
            Sol taraftaki menüyü kullanarak portfolyo sitenizdeki tüm içerikleri yönetebilirsiniz. Yeni yetenekler ekleyebilir, projelerinizi güncelleyebilir veya sertifikalarınızı listeleyebilirsiniz.
          </p>
        </div>
        <span className="material-symbols-outlined text-[100px] text-secondary opacity-20 hidden md:block">
          admin_panel_settings
        </span>
      </div>
    </div>
  )
}
