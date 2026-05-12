"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  // Zaten giriş yapılmışsa admin'e yönlendir
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
        <div className="animate-spin">
          <span className="material-symbols-outlined text-4xl text-secondary">progress_activity</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex-grow flex items-center justify-center p-margin-mobile md:p-margin-desktop relative overflow-hidden w-full">
      {/* Ambient Background Elements to enhance minimal aesthetic */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-secondary-fixed/20 blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-surface-variant/50 blur-[120px]"></div>
      </div>
      
      {/* Login Container */}
      <main className="w-full max-w-md mx-auto">
        {/* Header/Brand Area */}
        <div className="text-center mb-stack-lg">
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tighter mb-stack-sm">M.Y.D.</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Admin Portal</p>
        </div>
        
        {/* Glassmorphic Login Card */}
        <div className="glass-card rounded-xl p-8 md:p-10 relative group transition-all duration-500 hover:backdrop-blur-3xl">
          <form onSubmit={handleLogin} className="flex flex-col gap-stack-lg">
            {/* Email Input */}
            <div className="flex flex-col gap-stack-sm">
              <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2" htmlFor="email">
                <span className="material-symbols-outlined text-[18px]">mail</span>
                Email Address
              </label>
              <input
                className="input-glass w-full px-4 py-3 rounded-lg font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50"
                id="email" 
                name="email" 
                placeholder="admin@example.com" 
                required 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            {/* Password Input */}
            <div className="flex flex-col gap-stack-sm">
              <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2" htmlFor="password">
                <span className="material-symbols-outlined text-[18px]">lock</span>
                Password
              </label>
              <input
                className="input-glass w-full px-4 py-3 rounded-lg font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50"
                id="password" 
                name="password" 
                placeholder="••••••••" 
                required 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            {error && <p className="text-red-500">{error}</p>}

            {/* Submit Button */}
            <button
              className="btn-gradient w-full py-4 rounded-full font-label-md text-label-md text-on-primary flex items-center justify-center gap-2 mt-stack-sm"
              type="submit">
              Access Dashboard
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </form>
          
          {/* Back to Home Link */}
          <div className="mt-stack-lg text-center">
            <Link className="font-label-md text-label-md text-on-surface-variant hover:text-secondary transition-colors duration-300 flex items-center justify-center gap-2 inline-flex" href="/">
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Return to Portfolio
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
