"use client";

import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function AuthManager() {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event: string) => {
        if (event === 'SIGNED_IN') {
          // Optionally do something on sign in
        } else if (event === 'SIGNED_OUT') {
          router.push('/');
        }
        // Refresh the page to re-validate server components
        router.refresh();
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [supabase, router]);

  return null;
}
