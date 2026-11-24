-- OPCIONAL: cadastra os projetos que já estão na VPS. Rode depois do internal_panel.sql.
insert into public.internal_projects
  (name, kind, status, description, url, repo_url, hosting_provider, hosting_details, domain, stack)
values
  ('Portfólio', 'pessoal', 'producao', 'Site pessoal + painel admin.',
   'https://portfolio.malenatech.cloud', 'https://github.com/matheusmalena/portifolio-matheus-malena',
   'VPS Malena Tech', '/opt/portfolio · Docker + Caddy (rede edge) · autodeploy a cada 2 min',
   'portfolio.malenatech.cloud', '{Vue,Vite,Supabase}'),
  ('Wappix', 'pessoal', 'producao', 'Plataforma de WhatsApp (Evolution API).',
   'https://wappix.malenatech.cloud', 'https://github.com/matheusmalena/wappix',
   'VPS Malena Tech', '/opt/wappix · Docker Compose · autodeploy a cada 2 min',
   'wappix.malenatech.cloud', '{Node,TypeScript,PostgreSQL,Redis,Docker}'),
  ('MatChat (LumiZap)', 'pessoal', 'producao', 'Painel e API de atendimento.',
   'https://matchat.malenatech.cloud', 'https://github.com/matheusmalena/lumizap',
   'VPS Malena Tech', '/opt/lumizap · Docker Compose',
   'matchat.malenatech.cloud', '{Node,TypeScript,PostgreSQL,Redis,Docker}');
