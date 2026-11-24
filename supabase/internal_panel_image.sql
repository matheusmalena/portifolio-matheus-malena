-- Adiciona a imagem de capa dos projetos do painel interno. Rode UMA vez no SQL Editor do Supabase.
-- (As fotos vão para o bucket "project-images", criado no schema.sql.)
alter table public.internal_projects add column if not exists image_url text;
