import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import ProjectsTable from '@/components/admin/ProjectsTable';
import { PlusIcon } from '@heroicons/react/24/outline';
import EmptyState from '@/components/admin/EmptyState';

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const supabase = createClient();
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    // You might want to return an error message to the user
    return <p className="text-red-500">Could not fetch projects.</p>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        {/* Header is handled by Header.tsx, but we need the action button here */}
        <div></div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center justify-center gap-x-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
        >
          <PlusIcon className="h-5 w-5" />
          New Project
        </Link>
      </div>

      {projects && projects.length > 0 ? (
        <ProjectsTable projects={projects} />
      ) : (
        <EmptyState
          title="No projects yet"
          message="Get started by creating your first project."
          buttonText="New Project"
          buttonLink="/admin/projects/new"
        />
      )}
    </div>
  );
}
