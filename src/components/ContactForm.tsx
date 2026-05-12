'use client';

import React, { useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { sendMessage } from '@/app/contactActions';
import toast from 'react-hot-toast';

const initialState = {
  message: '',
  status: '' as const,
};

function ContactSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      disabled={pending}
      className="btn-primary px-8 py-4 rounded-full font-label-md text-label-md mt-2 w-full md:w-auto self-start disabled:opacity-75 disabled:cursor-wait flex items-center justify-center gap-3 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95" 
      type="submit"
    >
      {pending ? (
        <>
          <span className="w-5 h-5 border-2 border-on-primary border-t-transparent rounded-full animate-spin inline-block"></span>
          <span>Gönderiliyor...</span>
        </>
      ) : (
        <>
          <span>Gönder</span>
          <span className="material-symbols-outlined text-[18px]">send</span>
        </>
      )}
    </button>
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
    <form ref={formRef} action={formAction} className="glass-panel p-8 rounded-xl flex flex-col gap-6 relative overflow-hidden">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="font-label-md text-on-surface-variant">İsim</label>
        <input 
          id="name"
          name="name"
          className="px-4 py-3 rounded-lg bg-surface/50 border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none text-on-surface font-body-md" 
          placeholder="Adınız Soyadınız" 
          type="text" 
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-label-md text-on-surface-variant">E-posta</label>
        <input 
          id="email"
          name="email"
          className="px-4 py-3 rounded-lg bg-surface/50 border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none text-on-surface font-body-md" 
          placeholder="ornek@email.com" 
          type="email" 
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="font-label-md text-on-surface-variant">Mesaj</label>
        <textarea 
          id="message"
          name="message"
          className="px-4 py-3 rounded-lg bg-surface/50 border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none text-on-surface font-body-md resize-none" 
          placeholder="Mesajınızı buraya yazın..." 
          rows={4}
          required
        ></textarea>
      </div>
      <ContactSubmitButton />
    </form>
  );
}
