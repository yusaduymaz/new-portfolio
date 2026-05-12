-- Create projects table
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  image_url text,
  live_url text,
  github_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for projects
alter table public.projects enable row level security;

-- Policy: Everyone can view projects
create policy "Everyone can view projects"
  on public.projects for select
  using ( true );

-- Policy: Authenticated users can insert projects
create policy "Authenticated users can insert projects"
  on public.projects for insert
  with check ( auth.role() = 'authenticated' );

-- Policy: Authenticated users can update projects
create policy "Authenticated users can update projects"
  on public.projects for update
  using ( auth.role() = 'authenticated' );

-- Policy: Authenticated users can delete projects
create policy "Authenticated users can delete projects"
  on public.projects for delete
  using ( auth.role() = 'authenticated' );


-- Create posts table
create table public.posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  content text,
  published boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for posts
alter table public.posts enable row level security;

-- Policy: Everyone can view published posts
create policy "Everyone can view published posts"
  on public.posts for select
  using ( published = true or auth.role() = 'authenticated' );

-- Policy: Authenticated users can insert posts
create policy "Authenticated users can insert posts"
  on public.posts for insert
  with check ( auth.role() = 'authenticated' );

-- Policy: Authenticated users can update posts
create policy "Authenticated users can update posts"
  on public.posts for update
  using ( auth.role() = 'authenticated' );

-- Policy: Authenticated users can delete posts
create policy "Authenticated users can delete posts"
  on public.posts for delete
  using ( auth.role() = 'authenticated' );

-- Function to update updated_at column
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Trigger to call the function when a post is updated
create trigger on_post_updated
  before update on public.posts
  for each row execute procedure public.handle_updated_at();
