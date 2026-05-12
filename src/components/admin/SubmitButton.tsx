'use client';

import { useFormStatus } from 'react-dom';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

type SubmitButtonProps = {
  children: React.ReactNode;
};

export default function SubmitButton({ children }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-x-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-cyan-400"
    >
      {pending && <ArrowPathIcon className="h-5 w-5 animate-spin" />}
      {children}
    </button>
  );
}
