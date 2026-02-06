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
    link text,
    author text default 'Detective Boys'
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
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow Public Read News' AND tablename = 'news') THEN
    create policy "Allow Public Read News" on public.news for select using (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow Public Read Cases' AND tablename = 'cases') THEN
    create policy "Allow Public Read Cases" on public.cases for select using (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow Public Read Characters' AND tablename = 'characters') THEN
    create policy "Allow Public Read Characters" on public.characters for select using (true);
  END IF;
END $$;

-- Policy: Service Role (Admin) Write Access
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow Service Role Write News' AND tablename = 'news') THEN
    create policy "Allow Service Role Write News" on public.news for insert to service_role with check (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow Service Role Update News' AND tablename = 'news') THEN
    create policy "Allow Service Role Update News" on public.news for update to service_role using (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow Service Role Delete News' AND tablename = 'news') THEN
    create policy "Allow Service Role Delete News" on public.news for delete to service_role using (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow Service Role Write Cases' AND tablename = 'cases') THEN
    create policy "Allow Service Role Write Cases" on public.cases for insert to service_role with check (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow Service Role Write Characters' AND tablename = 'characters') THEN
    create policy "Allow Service Role Write Characters" on public.characters for insert to service_role with check (true);
  END IF;
END $$;

-- 4. Bounties Table (New Feature)
create table if not exists public.bounties (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    title text not null,
    description text not null,
    reward text not null,
    status text default 'open' -- open/closed/claimed
);

alter table public.bounties enable row level security;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow Public Read Bounties' AND tablename = 'bounties') THEN
    create policy "Allow Public Read Bounties" on public.bounties for select using (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow Service Role Write Bounties' AND tablename = 'bounties') THEN
    create policy "Allow Service Role Write Bounties" on public.bounties for insert to service_role with check (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow Service Role Update Bounties' AND tablename = 'bounties') THEN
    create policy "Allow Service Role Update Bounties" on public.bounties for update to service_role using (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow Service Role Delete Bounties' AND tablename = 'bounties') THEN
    create policy "Allow Service Role Delete Bounties" on public.bounties for delete to service_role using (true);
  END IF;
END $$;
