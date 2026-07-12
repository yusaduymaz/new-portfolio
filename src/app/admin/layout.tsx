import React from 'react';
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';
import ToastProvider from '@/components/admin/ToastProvider';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <>
      {/* eslint-disable @next/next/no-page-custom-font */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
      />
      {/* eslint-enable @next/next/no-page-custom-font */}
      <ToastProvider />
      <div className="flex h-screen bg-background font-body-md text-on-background overflow-hidden relative">
        {/* Background Blobs for Admin Panel (Subtle) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary-container rounded-full mix-blend-multiply filter blur-[100px] opacity-70"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary-fixed rounded-full mix-blend-multiply filter blur-[100px] opacity-70"></div>
        </div>

        <div className="z-10 w-72 h-full flex-shrink-0">
            <Sidebar />
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto relative z-10 custom-scrollbar">
          <Header />
          <main className="flex-1 p-8 md:p-12">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
