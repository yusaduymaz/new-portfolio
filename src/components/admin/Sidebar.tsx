'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: 'dashboard' },
  { name: 'Profil', href: '/admin/profile', icon: 'account_circle' },
  { name: 'Hakkımda', href: '/admin/about', icon: 'person' },
  { name: 'Projeler', href: '/admin/projects', icon: 'folder_open' },
  { name: 'Uzmanlıklar', href: '/admin/expertise', icon: 'analytics' },
  { name: 'Eğitim', href: '/admin/education', icon: 'school' },
  { name: 'Deneyim', href: '/admin/experience', icon: 'work' },
  { name: 'Sertifikalar', href: '/admin/certificates', icon: 'workspace_premium' },
  { name: 'Müşteri Yorumları', href: '/admin/testimonials', icon: 'format_quote' },
  { name: 'Gelen Mesajlar', href: '/admin/messages', icon: 'mail' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push('/login');
  };

  return (
    <div className="flex w-72 flex-col glass-panel border-r border-outline-variant/20 h-full">
      <div className="flex h-24 flex-shrink-0 items-center px-8">
        <h1 className="font-display-lg text-headline-sm font-bold tracking-tighter text-primary">MYD Panel</h1>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto custom-scrollbar">
        <nav className="flex-1 px-6 py-6 flex flex-col gap-2">
          <p className="px-4 pb-2 text-xs font-label-md uppercase text-on-surface-variant/50">
            İçerik Yönetimi
          </p>
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  isActive
                    ? 'bg-secondary/10 text-secondary'
                    : 'text-on-surface hover:bg-surface-variant/50 hover:text-primary',
                  'group flex items-center rounded-xl px-4 py-3 font-label-md text-sm transition-colors duration-200'
                )}
              >
                <span
                  className={classNames(
                    isActive ? 'text-secondary' : 'text-on-surface-variant group-hover:text-primary',
                    'material-symbols-outlined mr-4 text-[20px] transition-colors duration-200'
                  )}
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
                {item.name}
              </Link>
            );
          })}
          
          <div className="mt-auto pt-8">
            <p className="px-4 pb-2 text-xs font-label-md uppercase text-on-surface-variant/50">
              Harici Bağlantılar
            </p>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center rounded-xl px-4 py-3 font-label-md text-sm text-on-surface hover:bg-surface-variant/50 hover:text-primary transition-colors duration-200"
            >
              <span className="material-symbols-outlined mr-4 text-[20px] text-on-surface-variant group-hover:text-primary transition-colors duration-200">
                open_in_new
              </span>
              Siteye Git
            </a>
          </div>
        </nav>
      </div>
      <div className="flex flex-shrink-0 border-t border-outline-variant/20 p-6">
        <div className="flex w-full items-center justify-between">
            <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">person</span>
                </div>
                <span className="ml-4 font-label-md text-sm text-primary">Yönetici</span>
            </div>
            <button onClick={handleLogout} className="rounded-full p-2 text-on-surface-variant hover:bg-error/10 hover:text-error transition-colors duration-200">
                <span className="material-symbols-outlined">logout</span>
            </button>
        </div>
      </div>
    </div>
  );
}
