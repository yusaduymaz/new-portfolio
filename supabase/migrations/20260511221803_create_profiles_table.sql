
-- Create the profiles table
create table public.profiles (
  id uuid not null primary key,
  full_name text,
  avatar_url text,
  username text,
  constraint fk_user foreign key (id) references auth.users (id) on delete cascade
);

-- Add unique constraint for username
alter table public.profiles add constraint username_unique unique (username);

-- Function to create a profile for a new user
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$;

-- Trigger to call the function when a new user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Policy: Users can view their own profile
create policy "Users can view their own profile."
  on public.profiles for select
  using ( auth.uid() = id );

-- Policy: Users can update their own profile
create policy "Users can update their own profile."
  on public.profiles for update
  using ( auth.uid() = id );
