'use client';

import React, { useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { sendMessage } from '@/app/contactActions';
import toast from 'react-hot-toast';
import { MagicCard } from '@/components/ui/magic-card';
import { ShimmerButton } from '@/components/ui/shimmer-button';

const initialState = {
  message: '',
  status: '' as const,
};

function ContactSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <div className="mt-4">
      <ShimmerButton 
        type="submit"
        disabled={pending}
        className="w-full md:w-auto px-8 py-3.5 text-white disabled:opacity-75 disabled:cursor-wait rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md"
        shimmerColor="#C5A059"
        shimmerSize="0.05em"
        background="linear-gradient(180deg, #121417 0%, #202428 100%)"
      >
        <span className="flex items-center justify-center gap-2.5 font-mono text-xs uppercase tracking-widest font-semibold leading-none text-white">
          {pending ? (
            <>
              <span className="w-4.5 h-4.5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
              <span>GÖNDERİLİYOR...</span>
            </>
          ) : (
            <>
              <span>GÖNDER</span>
              <span className="material-symbols-outlined text-[16px]">send</span>
            </>
          )}
        </span>
      </ShimmerButton>
    </div>
  );
}

export default function ContactForm() {
  const [state, formAction] = useFormState(sendMessage, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (state?.status === 'success') {
      toast.success(state.message, { duration: 5000 });
      formRef.current?.reset();
    } else if (state?.status === 'error') {
      toast.error(state.message, { duration: 5000 });
    }
  }, [state]);

  return (
    <MagicCard 
      className="glass-panel p-8 md:p-10 rounded-3xl flex flex-col relative border border-white/60 shadow-md"
      gradientColor="rgba(197, 160, 89, 0.03)"
    >
      <form ref={formRef} action={formAction} className="flex flex-col gap-6">
        <h3 className="font-display-lg text-2xl font-bold text-primary tracking-tight">Mesaj Gönder</h3>
        
        <div className="flex flex-col gap-2 relative group">
          <label htmlFor="name" className="font-mono text-[10px] text-on-surface-variant/80 uppercase tracking-widest">İsim</label>
          <input 
            id="name"
            name="name"
            className="input-glass px-4 py-3.5 rounded-xl border border-outline-variant/20 outline-none text-on-surface font-body-md placeholder:text-outline-variant/50 text-sm" 
            placeholder="Adınız Soyadınız" 
            type="text" 
            required
          />
        </div>
        
        <div className="flex flex-col gap-2 relative group">
          <label htmlFor="email" className="font-mono text-[10px] text-on-surface-variant/80 uppercase tracking-widest">E-posta</label>
          <input 
            id="email"
            name="email"
            className="input-glass px-4 py-3.5 rounded-xl border border-outline-variant/20 outline-none text-on-surface font-body-md placeholder:text-outline-variant/50 text-sm" 
            placeholder="ornek@email.com" 
            type="email" 
            required
          />
        </div>
        
        <div className="flex flex-col gap-2 relative group">
          <label htmlFor="message" className="font-mono text-[10px] text-on-surface-variant/80 uppercase tracking-widest">Mesaj</label>
          <textarea 
            id="message"
            name="message"
            className="input-glass px-4 py-3.5 rounded-xl border border-outline-variant/20 outline-none text-on-surface font-body-md resize-none placeholder:text-outline-variant/50 text-sm" 
            placeholder="Mesajınızı buraya yazın..." 
            rows={4}
            required
          ></textarea>
        </div>
        
        <ContactSubmitButton />
      </form>
    </MagicCard>
  );
}