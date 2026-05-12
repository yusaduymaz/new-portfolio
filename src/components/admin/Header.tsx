'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

const getTitleFromPathname = (pathname: string): string => {
    if (pathname === '/admin') return 'Dashboard';
    if (pathname.startsWith('/admin/projects')) return 'Projeler';
    if (pathname.startsWith('/admin/posts')) return 'Yazılar';
    if (pathname.startsWith('/admin/expertise')) return 'Uzmanlıklar';
    if (pathname.startsWith('/admin/education')) return 'Eğitim';
    if (pathname.startsWith('/admin/experience')) return 'Deneyim';
    if (pathname.startsWith('/admin/certificates')) return 'Sertifikalar';
    if (pathname.startsWith('/admin/testimonials')) return 'Müşteri Yorumları';
    return 'Admin';
};

export default function Header() {
    const pathname = usePathname();
    const title = getTitleFromPathname(pathname);

    return (
        <header className="sticky top-0 z-10 flex h-24 flex-shrink-0 bg-background/80 backdrop-blur-xl border-b border-outline-variant/20 px-8">
            <div className="flex flex-1 items-center justify-between">
                <h1 className="font-headline-lg text-headline-md text-primary">{title}</h1>
            </div>
        </header>
    );
}
