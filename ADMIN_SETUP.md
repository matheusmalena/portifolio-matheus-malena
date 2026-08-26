# Painel Admin — Setup

O painel fica em `/admin` (login) e `/admin/projetos` (CRUD). Ele usa [Supabase](https://supabase.com)
como backend (banco de dados + autenticação + armazenamento de imagens), grátis para esse volume de uso.

## 1. Criar o projeto no Supabase

1. Crie uma conta em https://supabase.com e um novo projeto (escolha uma região, defina uma senha de banco).
2. Em **Project Settings > API**, copie:
   - `Project URL`
   - `anon public` key

## 2. Rodar o schema

1. No painel do Supabase, abra **SQL Editor**.
2. Cole o conteúdo de [`supabase/schema.sql`](supabase/schema.sql) e rode.
   Isso cria a tabela `projects`, as políticas de segurança (RLS) e o bucket `project-images`.

## 3. Criar seu usuário admin

1. No painel do Supabase, vá em **Authentication > Users > Add user**.
2. Cadastre seu e-mail e uma senha — esse é o login que você vai usar em `/admin`.
   (Não existe cadastro público; só quem você criar manualmente aqui consegue entrar.)

## 4. Configurar as variáveis de ambiente

1. Copie `.env.example` para `.env`.
2. Preencha com a URL e a `anon key` copiadas no passo 1.
3. Reinicie o `npm run dev` se estiver rodando.

## 5. (Opcional) Migrar os 15 projetos atuais

Os projetos que já estão no site são hardcoded no código — se quiser trazê-los para o banco de uma vez
(em vez de recadastrar manualmente), rode o script de migração **uma única vez**:

1. No Supabase, em **Project Settings > API**, copie a `service_role key` (é secreta, diferente da anon key).
2. No terminal, na raiz do projeto:
   ```bash
   SUPABASE_URL=https://SEU-PROJETO.supabase.co SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key node scripts/seed-projects.mjs
   ```
   No PowerShell:
   ```powershell
   $env:SUPABASE_URL="https://SEU-PROJETO.supabase.co"
   $env:SUPABASE_SERVICE_ROLE_KEY="sua-service-role-key"
   node scripts/seed-projects.mjs
   ```
3. Isso envia as imagens de `src/assets/img` para o Storage e cria as 15 linhas na tabela.
   Depois disso, tudo passa a ser gerenciado pelo `/admin`.

Se preferir, pule esse passo e cadastre os projetos manualmente pelo painel.

## 6. Deploy (produção)

No serviço onde o site está hospedado (Vercel, Netlify, etc.), adicione as mesmas variáveis de ambiente:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Nunca coloque a `service_role key` em variáveis de ambiente do front-end — ela só deve ser usada localmente,
uma vez, para rodar o script de migração.

## Uso do dia a dia

- Acesse `/admin`, faça login com o usuário criado no passo 3.
- Em `/admin/projetos` você cria, edita e exclui projetos: título, descrição (PT/EN/ES), imagem, link do
  demo, link do código, tecnologias e categorias.
- As mudanças aparecem no site imediatamente (a seção de Projetos busca os dados direto do Supabase).
