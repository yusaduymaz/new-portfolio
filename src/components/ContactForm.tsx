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
        className="w-full md:w-auto px-8 py-3 text-white disabled:opacity-75 disabled:cursor-wait"
        shimmerColor="#C5A059"
        shimmerSize="0.05em"
        background="linear-gradient(180deg, #1A1A1A 0%, #333333 100%)"
      >
        <span className="flex items-center justify-center gap-3 font-label-md text-sm whitespace-pre-wrap text-center font-semibold leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-base">
          {pending ? (
            <>
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
              <span>Gönderiliyor...</span>
            </>
          ) : (
            <>
              <span>Gönder</span>
              <span className="material-symbols-outlined text-[18px]">send</span>
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
      className="glass-panel p-8 rounded-2xl flex flex-col relative"
      gradientColor="rgba(197, 160, 89, 0.15)"
    >
      <form ref={formRef} action={formAction} className="flex flex-col gap-6">
        <h3 className="font-headline-md text-primary mb-2 tracking-tight">Mesaj Gönder</h3>
        
        <div className="flex flex-col gap-2 relative group">
          <label htmlFor="name" className="font-label-md text-on-surface-variant text-xs uppercase tracking-wider">İsim</label>
          <input 
            id="name"
            name="name"
            className="px-0 py-3 bg-transparent border-b-2 border-outline-variant/30 focus:border-secondary transition-colors outline-none text-on-surface font-body-md placeholder:text-outline-variant/50" 
            placeholder="Adınız Soyadınız" 
            type="text" 
            required
          />
        </div>
        
        <div className="flex flex-col gap-2 relative group">
          <label htmlFor="email" className="font-label-md text-on-surface-variant text-xs uppercase tracking-wider">E-posta</label>
          <input 
            id="email"
            name="email"
            className="px-0 py-3 bg-transparent border-b-2 border-outline-variant/30 focus:border-secondary transition-colors outline-none text-on-surface font-body-md placeholder:text-outline-variant/50" 
            placeholder="ornek@email.com" 
            type="email" 
            required
          />
        </div>
        
        <div className="flex flex-col gap-2 relative group mt-2">
          <label htmlFor="message" className="font-label-md text-on-surface-variant text-xs uppercase tracking-wider">Mesaj</label>
          <textarea 
            id="message"
            name="message"
            className="px-0 py-3 bg-transparent border-b-2 border-outline-variant/30 focus:border-secondary transition-colors outline-none text-on-surface font-body-md resize-none placeholder:text-outline-variant/50" 
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