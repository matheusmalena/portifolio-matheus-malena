// Script de migração ÚNICO: envia as imagens atuais para o Supabase Storage
// e cria as linhas da tabela `projects` com os 15 projetos que já existem no site.
//
// Como rodar (uma vez só, localmente):
//   1. No painel do Supabase: Project Settings > API, copie a "service_role key" (secreta).
//   2. No terminal, na raiz do projeto:
//        SUPABASE_URL=https://SEU-PROJETO.supabase.co SUPABASE_SERVICE_ROLE_KEY=sua-chave node scripts/seed-projects.mjs
//      (No PowerShell: $env:SUPABASE_URL="..."; $env:SUPABASE_SERVICE_ROLE_KEY="..."; node scripts/seed-projects.mjs)
//   3. Depois de rodar, pode gerenciar tudo pelo /admin normalmente.
//
// A service_role key NUNCA deve ir para o front-end nem ser commitada — use-a só aqui, uma vez.

import { createClient } from '@supabase/supabase-js'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const imgDir = path.join(__dirname, '..', 'src', 'assets', 'img')
const localesDir = path.join(__dirname, '..', 'src', 'locales')

const supabaseUrl = process.env.SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    'Defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY como variáveis de ambiente antes de rodar este script.'
  )
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey)

const pt = JSON.parse(await readFile(path.join(localesDir, 'pt.json'), 'utf-8'))
const en = JSON.parse(await readFile(path.join(localesDir, 'en.json'), 'utf-8'))
const es = JSON.parse(await readFile(path.join(localesDir, 'es.json'), 'utf-8'))

const PROJECTS = [
  { localeKey: '15', image: 'yup-chat.png', demoUrl: 'https://yup.chat', techs: ['Vue.js', 'Node.js', 'JavaScript'], categories: ['web', 'app'] },
  { localeKey: '1', image: 'sweetgift.png', demoUrl: 'https://sweetgiftfy.com', techs: ['Vue.js', 'Supabase', 'Bootstrap'], categories: ['web'] },
  { localeKey: '14', image: 'liberaja.png', demoUrl: 'https://liberajadespachante.com.br/', techs: ['Vue.js'], categories: ['web', 'institutional'] },
  { localeKey: '2', image: 'escola.png', demoUrl: 'https://arvoredavidaperuibe.com.br', techs: ['Vue.js', 'JavaScript'], categories: ['web', 'institutional'] },
  { localeKey: '12', image: 'ng-stone.png', demoUrl: 'https://ngstonemarmoresperuibe.com.br', techs: ['Vue.js', 'Node.js', 'Bootstrap'], categories: ['web', 'institutional'] },
  { localeKey: '5', image: 'fokus.png', demoUrl: 'https://matheusmalena.github.io/Fokus/', techs: ['HTML', 'CSS3', 'JavaScript'], categories: ['tool'] },
  { localeKey: '9', image: 'dipemat2.jpeg', demoUrl: 'https://dipemat.com/', techs: ['Vue.js'], categories: ['web', 'institutional'] },
  { localeKey: '11', image: 'vieira-dias.png', demoUrl: 'https://vieira-dias-advogadas.vercel.app/', techs: ['Vue.js', 'Node.js', 'Blog CMS'], categories: ['web', 'institutional'] },
  { localeKey: '13', image: 'gif-viva-colorir.gif', demoUrl: 'https://vivacolorirbiblia.vercel.app/', techs: ['Vue JS', 'JavaScript'], categories: ['web', 'institutional'] },
  { localeKey: '3', image: 'previsao-web.png', demoUrl: 'https://matheusmalena.github.io/AppPrevisaoDoTempo/', techs: ['JavaScript', 'API REST'], categories: ['app', 'tool'] },
  { localeKey: '4', image: 'cookin-up.jpeg', demoUrl: 'https://cookin-up-website.vercel.app/', techs: ['Vue.js', 'Node.js'], categories: ['app'] },
  { localeKey: '6', image: 'task-list.png', demoUrl: 'https://task-list-surf.vercel.app', techs: ['Vue.js', 'LocalStorage'], categories: ['tool'] },
  { localeKey: '7', image: 'jogonumero.png', demoUrl: 'https://jogo-numero-secreto-voz-three.vercel.app/', techs: ['JavaScript', 'Web Speech API'], categories: ['game'] },
  { localeKey: '8', image: 'game-memorie.png', demoUrl: 'https://matheusmalena.github.io/memorie-love-game/', techs: ['HTML5', 'CSS3', 'JavaScript'], categories: ['game'] },
  { localeKey: '10', image: 'cafe.png', demoUrl: 'https://matheusmalena.github.io/landing-page_cafeteria/', techs: ['HTML5', 'CSS3'], categories: ['web', 'institutional'] },
]

async function run() {
  for (const [index, item] of PROJECTS.entries()) {
    const entry = pt.projects.list[item.localeKey]
    if (!entry) {
      console.warn(`Sem tradução para list.${item.localeKey}, pulando.`)
      continue
    }

    const fileBuffer = await readFile(path.join(imgDir, item.image))
    const ext = item.image.split('.').pop()
    const storagePath = `${item.localeKey}-${item.image}`

    const { error: uploadError } = await supabase.storage
      .from('project-images')
      .upload(storagePath, fileBuffer, { contentType: `image/${ext === 'jpg' ? 'jpeg' : ext}`, upsert: true })

    if (uploadError) {
      console.error(`Falha ao enviar imagem de "${entry.title}":`, uploadError.message)
      continue
    }

    const { data: publicUrlData } = supabase.storage.from('project-images').getPublicUrl(storagePath)

    const { error: insertError } = await supabase.from('projects').insert({
      title: entry.title,
      description_pt: pt.projects.list[item.localeKey]?.description ?? '',
      description_en: en.projects.list[item.localeKey]?.description ?? '',
      description_es: es.projects.list[item.localeKey]?.description ?? '',
      image_url: publicUrlData.publicUrl,
      demo_url: item.demoUrl,
      code_url: null,
      techs: item.techs,
      categories: item.categories,
      sort_order: index,
    })

    if (insertError) {
      console.error(`Falha ao inserir "${entry.title}":`, insertError.message)
    } else {
      console.log(`OK: ${entry.title}`)
    }
  }
}

run().then(() => {
  console.log('Concluído.')
  process.exit(0)
})
