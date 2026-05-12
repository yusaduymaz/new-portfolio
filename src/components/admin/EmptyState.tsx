import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type EmptyStateProps = {
    title: string;
    message: string;
    buttonText: string;
    buttonLink: string;
}

export default function EmptyState({ title, message, buttonText, buttonLink }: EmptyStateProps) {
  return (
    <div className="text-center rounded-lg border-2 border-dashed border-gray-300 p-12">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-500">{message}</p>
      <div className="mt-6">
        <Link
          href={buttonLink}
          className="inline-flex items-center justify-center gap-x-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
        >
          <PlusIcon className="-ml-0.5 h-5 w-5" />
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
