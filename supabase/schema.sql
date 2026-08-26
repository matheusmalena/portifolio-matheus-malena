-- Rode este script no SQL Editor do seu projeto Supabase (https://app.supabase.com)
-- Cria a tabela de projetos, políticas de acesso e o bucket de imagens.

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description_pt text not null default '',
  description_en text not null default '',
  description_es text not null default '',
  image_url text,
  demo_url text,
  code_url text,
  techs text[] not null default '{}',
  categories text[] not null default '{}',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Mantém updated_at em dia a cada alteração
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

alter table public.projects enable row level security;

-- Qualquer visitante pode ler os projetos (site público)
drop policy if exists "Projects are publicly readable" on public.projects;
create policy "Projects are publicly readable"
  on public.projects for select
  using (true);

-- Só usuários autenticados (você, logado no /admin) podem criar/editar/excluir
drop policy if exists "Authenticated users can insert projects" on public.projects;
create policy "Authenticated users can insert projects"
  on public.projects for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated users can update projects" on public.projects;
create policy "Authenticated users can update projects"
  on public.projects for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated users can delete projects" on public.projects;
create policy "Authenticated users can delete projects"
  on public.projects for delete
  to authenticated
  using (true);

-- Bucket público para as imagens dos projetos
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

drop policy if exists "Project images are publicly readable" on storage.objects;
create policy "Project images are publicly readable"
  on storage.objects for select
  using (bucket_id = 'project-images');

drop policy if exists "Authenticated users can upload project images" on storage.objects;
create policy "Authenticated users can upload project images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'project-images');

drop policy if exists "Authenticated users can update project images" on storage.objects;
create policy "Authenticated users can update project images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'project-images');

drop policy if exists "Authenticated users can delete project images" on storage.objects;
create policy "Authenticated users can delete project images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'project-images');
