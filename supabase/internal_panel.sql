-- Painel interno: clientes e controle de projetos (hospedagem, valores, domínios).
-- Rode no SQL Editor do Supabase. Diferente de "projects" (vitrine pública), estas tabelas
-- NÃO têm leitura pública: só usuário autenticado (você, logado no /admin) enxerga.

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  email text,
  phone text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.internal_projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  kind text not null default 'pessoal' check (kind in ('pessoal', 'cliente')),
  client_id uuid references public.clients(id) on delete set null,
  status text not null default 'desenvolvimento'
    check (status in ('planejamento', 'desenvolvimento', 'producao', 'pausado', 'arquivado')),
  description text,
  url text,
  repo_url text,
  hosting_provider text,
  hosting_details text,
  domain text,
  domain_expires_on date,
  stack text[] not null default '{}',
  monthly_fee numeric(12, 2),
  project_value numeric(12, 2),
  started_on date,
  delivered_on date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists internal_projects_client_idx on public.internal_projects (client_id);

-- set_updated_at() já existe (criada no schema.sql); recria por segurança
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_clients_updated_at on public.clients;
create trigger set_clients_updated_at before update on public.clients
  for each row execute function public.set_updated_at();

drop trigger if exists set_internal_projects_updated_at on public.internal_projects;
create trigger set_internal_projects_updated_at before update on public.internal_projects
  for each row execute function public.set_updated_at();

alter table public.clients enable row level security;
alter table public.internal_projects enable row level security;

drop policy if exists "Authenticated full access clients" on public.clients;
create policy "Authenticated full access clients" on public.clients
  for all to authenticated using (true) with check (true);

drop policy if exists "Authenticated full access internal_projects" on public.internal_projects;
create policy "Authenticated full access internal_projects" on public.internal_projects
  for all to authenticated using (true) with check (true);
