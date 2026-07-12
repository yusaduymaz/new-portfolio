"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Icon from "@/components/ui/icon";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.replace('/admin');
      } else {
        setLoading(false);
      }
    };
    checkSession();
  }, [supabase, router]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.refresh();
      router.push('/admin');
    }
  };

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <Icon name="progress_activity" className="w-9 h-9 text-secondary animate-spin" aria-label="Yükleniyor" />
      </div>
    );
  }

  return (
    <div className="flex-grow flex items-center justify-center p-margin-mobile md:p-margin-desktop relative overflow-hidden w-full">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-secondary-fixed/20 blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-surface-variant/50 blur-[120px]"></div>
      </div>

      <main id="main" className="w-full max-w-md mx-auto">
        <div className="text-center mb-stack-lg">
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tighter mb-stack-sm">M.Y.D.</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Admin Portal</p>
        </div>

        <div className="glass-card rounded-xl p-8 md:p-10 relative group transition-all duration-500">
          <form onSubmit={handleLogin} className="flex flex-col gap-stack-lg">
            <div className="flex flex-col gap-stack-sm">
              <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2" htmlFor="email">
                <Icon name="mail" className="w-[18px] h-[18px]" />
                Email Address
              </label>
              <input
                className="input-glass w-full px-4 py-3 rounded-lg font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50"
                id="email"
                name="email"
                placeholder="admin@example.com"
                required
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-stack-sm">
              <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2" htmlFor="password">
                <Icon name="lock" className="w-[18px] h-[18px]" />
                Password
              </label>
              <input
                className="input-glass w-full px-4 py-3 rounded-lg font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50"
                id="password"
                name="password"
                placeholder="••••••••"
                required
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p role="alert" className="text-red-500">{error}</p>}

            <button
              className="btn-primary w-full py-4 rounded-full font-label-md text-label-md text-white flex items-center justify-center gap-2 mt-stack-sm"
              type="submit">
              Access Dashboard
              <Icon name="arrow_forward" className="w-[18px] h-[18px]" />
            </button>
          </form>

          <div className="mt-stack-lg text-center">
            <Link className="font-label-md text-label-md text-on-surface-variant hover:text-secondary transition-colors duration-300 flex items-center justify-center gap-2 inline-flex" href="/">
              <Icon name="arrow_back" className="w-4 h-4" />
              Return to Portfolio
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

