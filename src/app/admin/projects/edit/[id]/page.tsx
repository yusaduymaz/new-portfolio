import { createClient } from '@/lib/supabase/server';
import EditProjectForm from '@/components/admin/EditProjectForm';
import { notFound } from 'next/navigation';

type EditProjectPageProps = {
  params: {
    id: string;
  };
};

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = params;
  const supabase = createClient();

  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !project) {
    console.error('Error fetching project for edit:', error);
    notFound();
  }

  return <EditProjectForm project={project} />;
}
