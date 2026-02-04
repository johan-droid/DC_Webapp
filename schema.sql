-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. News Table
create table if not exists public.news (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    title text not null,
    category text default 'General'::text,
    content text not null,
    image text,
    link text
);

-- 2. Investigations (Cases) Table
create table if not exists public.cases (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    title text not null,
    type text check (type in ('canon', 'anime', 'movie')) default 'canon',
    description text not null,
    image text,
    status text default 'unsolved' -- solved/unsolved
);

-- 3. Characters Table (Replacing static JSON)
create table if not exists public.characters (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    name text not null,
    description text not null,
    image text,
    faction text default 'main' -- 'main', 'black_organization', 'police', 'fbi'
);

-- Enable Row Level Security (RLS)
alter table public.news enable row level security;
alter table public.cases enable row level security;
alter table public.characters enable row level security;

-- Policy: Allow Public Read Access (Everyone can view)
create policy "Allow Public Read News" on public.news for select using (true);
create policy "Allow Public Read Cases" on public.cases for select using (true);
create policy "Allow Public Read Characters" on public.characters for select using (true);

-- Policy: Service Role (Admin) Write Access
-- Note: Service Role bypasses RLS by default, but these explicit policies prevent anon writes
create policy "Allow Service Role Write News" on public.news for insert to service_role with check (true);
create policy "Allow Service Role Update News" on public.news for update to service_role using (true);
create policy "Allow Service Role Delete News" on public.news for delete to service_role using (true);

create policy "Allow Service Role Write Cases" on public.cases for insert to service_role with check (true);
create policy "Allow Service Role Write Characters" on public.characters for insert to service_role with check (true);
