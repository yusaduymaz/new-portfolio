-- Add technologies and category to projects
ALTER TABLE public.projects ADD COLUMN technologies text[] DEFAULT '{}';
ALTER TABLE public.projects ADD COLUMN category text;
ALTER TABLE public.projects ADD COLUMN content text; -- for more detailed description

-- Create expertise table
create table public.expertise (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  icon text,
  category text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.expertise enable row level security;
create policy "Everyone can view expertise" on public.expertise for select using ( true );
create policy "Authenticated users can manage expertise" on public.expertise using ( auth.role() = 'authenticated' );

-- Create education table
create table public.education (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  institution text not null,
  start_date text,
  end_date text,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.education enable row level security;
create policy "Everyone can view education" on public.education for select using ( true );
create policy "Authenticated users can manage education" on public.education using ( auth.role() = 'authenticated' );

-- Create experience table
create table public.experience (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  company text not null,
  start_date text,
  end_date text,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.experience enable row level security;
create policy "Everyone can view experience" on public.experience for select using ( true );
create policy "Authenticated users can manage experience" on public.experience using ( auth.role() = 'authenticated' );

-- Create certificates table
create table public.certificates (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  organization text not null,
  issue_date text,
  url text,
  image_url text,
  details text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.certificates enable row level security;
create policy "Everyone can view certificates" on public.certificates for select using ( true );
create policy "Authenticated users can manage certificates" on public.certificates using ( auth.role() = 'authenticated' );

-- Create testimonials table
create table public.testimonials (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  title text,
  company text,
  content text not null,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.testimonials enable row level security;
create policy "Everyone can view testimonials" on public.testimonials for select using ( true );
create policy "Authenticated users can manage testimonials" on public.testimonials using ( auth.role() = 'authenticated' );
