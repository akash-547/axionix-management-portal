create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  client text not null check (length(trim(client)) > 0),
  value numeric not null check (value >= 0),
  status text not null check (status in ('Pending', 'In Progress', 'Completed')),
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

grant select, insert on public.projects to authenticated;

create policy "Authenticated users can view projects"
  on public.projects
  for select
  to authenticated
  using (true);

create policy "Authenticated users can create projects"
  on public.projects
  for insert
  to authenticated
  with check (true);
