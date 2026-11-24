<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  internalProjectsApi, clientsApi, STATUS, HOSTING_SUGGESTIONS, brl, daysUntil, fmtDate,
} from '../../lib/panelApi'
import AdminCombo from './AdminCombo.vue'
import AdminProjectDrawer from './AdminProjectDrawer.vue'
import { uploadProjectImage } from '../../lib/projectsApi'

const projects = ref([])
const clients = ref([])
const loading = ref(true)
const error = ref('')

const search = ref('')
const fKind = ref('')
const fStatus = ref('')
const fHosting = ref('')

const showForm = ref(false)
const saving = ref(false)
const formError = ref('')
const editingId = ref(null)
const form = ref(blank())
const stackText = ref('')

// imagem de capa
const fileInput = ref(null)
const imageFile = ref(null)
const imagePreview = ref('')
const imageRemoved = ref(false)
const generating = ref(false)
const dragOver = ref(false)
const imageError = ref('')
const MAX_IMG = 6 * 1024 * 1024

function setImage(file) {
  imageError.value = ''
  if (!file || !file.type.startsWith('image/')) { imageError.value = 'Escolha um arquivo de imagem.'; return }
  if (file.size > MAX_IMG) { imageError.value = 'Imagem muito grande (máx. 6 MB).'; return }
  imageFile.value = file
  imageRemoved.value = false
  imagePreview.value = URL.createObjectURL(file)
}
const onFile = (e) => { setImage(e.target.files?.[0]); e.target.value = '' }
const onDrop = (e) => { dragOver.value = false; setImage(e.dataTransfer?.files?.[0]) }
function clearImage() {
  imageFile.value = null
  imagePreview.value = ''
  imageRemoved.value = true
  imageError.value = ''
}

// Gera o preview a partir da URL pública do site (serviço externo, só quando você clica).
async function generateFromSite() {
  const url = form.value.url.trim()
  if (!url) return
  imageError.value = ''
  generating.value = true
  const enc = encodeURIComponent(url)
  const sources = [
    `https://api.microlink.io/?url=${enc}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=800`,
    `https://image.thum.io/get/width/1280/crop/800/noanimate/${url}`,
  ]
  try {
    let blob = null
    for (const src of sources) {
      try {
        const ctrl = new AbortController()
        const t = setTimeout(() => ctrl.abort(), 45000)
        const res = await fetch(src, { signal: ctrl.signal })
        clearTimeout(t)
        const b = await res.blob()
        if (res.ok && b.type.startsWith('image/')) { blob = b; break }
      } catch { /* tenta a próxima fonte */ }
    }
    if (!blob) throw new Error('sem resposta')
    setImage(new File([blob], 'preview.png', { type: blob.type }))
  } catch {
    imageError.value = 'Não consegui gerar o preview. Confira se a URL está no ar ou envie uma foto.'
  } finally {
    generating.value = false
  }
}

function blank() {
  return {
    name: '', kind: 'pessoal', client_id: '', status: 'desenvolvimento', description: '',
    url: '', repo_url: '', hosting_provider: '', hosting_details: '', domain: '',
    domain_expires_on: '', monthly_fee: '', project_value: '', started_on: '', delivered_on: '', notes: '',
  }
}

async function load() {
  loading.value = true
  try {
    const [p, c] = await Promise.all([internalProjectsApi.list(), clientsApi.list()])
    projects.value = p
    clients.value = c
    error.value = ''
  } catch (e) {
    error.value = 'Não foi possível carregar. Você já rodou o supabase/internal_panel.sql?'
  } finally {
    loading.value = false
  }
}
onMounted(load)

const clientName = (id) => clients.value.find((c) => c.id === id)?.name
const hostings = computed(() => [...new Set(projects.value.map((p) => p.hosting_provider).filter(Boolean))].sort())

const hostingOptions = computed(() => [...new Set([...hostings.value, ...HOSTING_SUGGESTIONS])])

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  return projects.value.filter((p) => {
    if (fKind.value && p.kind !== fKind.value) return false
    if (fStatus.value && p.status !== fStatus.value) return false
    if (fHosting.value && p.hosting_provider !== fHosting.value) return false
    if (!q) return true
    const hay = [p.name, p.domain, p.url, p.hosting_provider, clientName(p.client_id), ...(p.stack || [])]
      .filter(Boolean).join(' ').toLowerCase()
    return hay.includes(q)
  })
})

function resetImage(url) {
  imageFile.value = null
  imagePreview.value = url
  imageRemoved.value = false
  imageError.value = ''
  generating.value = false
}

function openCreate() {
  editingId.value = null
  form.value = blank()
  stackText.value = ''
  formError.value = ''
  resetImage('')
  showForm.value = true
}

function openEdit(p) {
  editingId.value = p.id
  const f = blank()
  for (const k of Object.keys(f)) f[k] = p[k] ?? ''
  form.value = f
  stackText.value = (p.stack || []).join(', ')
  formError.value = ''
  resetImage(p.image_url || '')
  showForm.value = true
}

const nullIfEmpty = (v) => (v === '' || v === undefined ? null : v)

async function save() {
  formError.value = ''
  if (!form.value.name.trim()) { formError.value = 'Informe o nome do projeto.'; return }
  if (form.value.kind === 'cliente' && !form.value.client_id) { formError.value = 'Escolha o cliente (ou cadastre em Clientes).'; return }

  const f = form.value
  const payload = {
    name: f.name.trim(),
    kind: f.kind,
    client_id: f.kind === 'cliente' ? nullIfEmpty(f.client_id) : null,
    status: f.status,
    description: nullIfEmpty(f.description),
    url: nullIfEmpty(f.url.trim()),
    repo_url: nullIfEmpty(f.repo_url.trim()),
    hosting_provider: nullIfEmpty(f.hosting_provider.trim()),
    hosting_details: nullIfEmpty(f.hosting_details),
    domain: nullIfEmpty(f.domain.trim()),
    domain_expires_on: nullIfEmpty(f.domain_expires_on),
    stack: stackText.value.split(',').map((s) => s.trim()).filter(Boolean),
    monthly_fee: f.monthly_fee === '' ? null : Number(f.monthly_fee),
    project_value: f.project_value === '' ? null : Number(f.project_value),
    started_on: nullIfEmpty(f.started_on),
    delivered_on: nullIfEmpty(f.delivered_on),
    notes: nullIfEmpty(f.notes),
  }

  saving.value = true
  try {
    // image_url só vai no payload quando muda (assim o painel segue salvando antes da migração da coluna)
    if (imageFile.value) payload.image_url = await uploadProjectImage(imageFile.value)
    else if (imageRemoved.value) payload.image_url = null

    if (editingId.value) await internalProjectsApi.update(editingId.value, payload)
    else await internalProjectsApi.create(payload)
    showForm.value = false
    await load()
  } catch (e) {
    formError.value = 'Erro ao salvar: ' + (e.message || 'tente novamente')
  } finally {
    saving.value = false
  }
}

async function remove(p) {
  if (!confirm(`Excluir "${p.name}"? Isso não pode ser desfeito.`)) return
  try {
    await internalProjectsApi.remove(p.id)
    await load()
  } catch (e) {
    error.value = 'Erro ao excluir: ' + e.message
  }
}

const selectedId = ref(null)
const selected = computed(() => projects.value.find((p) => p.id === selectedId.value) || null)
const selectedClient = computed(() => (selected.value ? clients.value.find((c) => c.id === selected.value.client_id) || null : null))
function editFromDrawer() {
  const p = selected.value
  selectedId.value = null
  if (p) openEdit(p)
}
async function removeFromDrawer() {
  const p = selected.value
  if (!p) return
  await remove(p)
  if (!projects.value.some((x) => x.id === p.id)) selectedId.value = null
}

const pillGlass = (c) => ({ color: c, borderColor: c + '66', background: `linear-gradient(${c}2e, ${c}2e), rgba(3, 7, 18, .72)` })
const PH = ['#2563eb', '#7c3aed', '#0891b2', '#db2777', '#16a34a', '#ea580c']
const phBg = (name) => {
  let h = 0
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) % PH.length
  const c = PH[h]
  return { background: `radial-gradient(circle at 25% 20%, ${c}66, transparent 55%), linear-gradient(135deg, ${c}33, #0a1226)` }
}
const domainWarn = (p) => {
  const d = daysUntil(p.domain_expires_on)
  return d !== null && d <= 30
}
</script>

<template>
  <div class="ap-page">
    <div class="ap-head">
      <div>
        <h1>Projetos</h1>
        <p v-if="!loading">{{ filtered.length }} de {{ projects.length }} projetos</p>
      </div>
      <button class="ap-btn primary" @click="openCreate"><i class="fas fa-plus"></i> Novo projeto</button>
    </div>

    <p v-if="error" class="ap-error">{{ error }}</p>

    <div class="ap-toolbar">
      <input v-model="search" class="ap-input" placeholder="Buscar por nome, domínio, cliente, stack..." />
      <select v-model="fKind" class="ap-select">
        <option value="">Todos os tipos</option>
        <option value="pessoal">Pessoais</option>
        <option value="cliente">De clientes</option>
      </select>
      <select v-model="fStatus" class="ap-select">
        <option value="">Todos os status</option>
        <option v-for="(s, k) in STATUS" :key="k" :value="k">{{ s.label }}</option>
      </select>
      <select v-model="fHosting" class="ap-select">
        <option value="">Toda hospedagem</option>
        <option v-for="h in hostings" :key="h" :value="h">{{ h }}</option>
      </select>
    </div>

    <div v-if="loading" class="ap-empty"><i class="fas fa-circle-notch fa-spin"></i>Carregando...</div>
    <div v-else-if="!filtered.length" class="ap-empty">
      <i class="fas fa-folder-open"></i>
      {{ projects.length ? 'Nenhum projeto com esses filtros.' : 'Nenhum projeto ainda. Clique em "Novo projeto".' }}
    </div>

    <div v-else class="cards">
      <article v-for="p in filtered" :key="p.id" class="proj" tabindex="0" @click="selectedId = p.id" @keydown.enter="selectedId = p.id">
        <div class="thumb">
          <img v-if="p.image_url" :src="p.image_url" :alt="p.name" loading="lazy" />
          <div v-else class="ph" :style="phBg(p.name)"><span>{{ p.name[0] }}</span></div>
          <span class="ap-badge st" :style="pillGlass(STATUS[p.status].color)">{{ STATUS[p.status].label }}</span>
          <span v-if="p.hosting_provider" class="host"><i class="fas fa-server"></i> {{ p.hosting_provider }}</span>
        </div>

        <div class="body">
          <h3>{{ p.name }}</h3>
          <small class="who">
            <i class="fas" :class="p.kind === 'cliente' ? 'fa-briefcase' : 'fa-user'"></i>
            {{ p.kind === 'cliente' ? clientName(p.client_id) || 'Cliente' : 'Projeto pessoal' }}
          </small>

          <p v-if="p.description" class="desc">{{ p.description }}</p>

          <div v-if="p.stack?.length" class="chips">
            <span v-for="t in p.stack.slice(0, 4)" :key="t" class="tag">{{ t }}</span>
            <span v-if="p.stack.length > 4" class="tag tag-more">+{{ p.stack.length - 4 }}</span>
          </div>

          <div class="facts">
            <span v-if="p.domain_expires_on" :class="{ warn: domainWarn(p) }"><i class="fas fa-calendar-day"></i> vence {{ fmtDate(p.domain_expires_on) }}</span>
            <span v-if="p.monthly_fee"><i class="fas fa-rotate"></i> {{ brl(p.monthly_fee) }}/mês</span>
            <span v-else-if="p.project_value"><i class="fas fa-coins"></i> {{ brl(p.project_value) }}</span>
          </div>
        </div>

        <div class="acts">
          <a v-if="p.url" :href="p.url" target="_blank" rel="noopener" class="icon-btn" title="Abrir site" @click.stop><i class="fas fa-arrow-up-right-from-square"></i></a>
          <a v-if="p.repo_url" :href="p.repo_url" target="_blank" rel="noopener" class="icon-btn" title="Repositório" @click.stop><i class="fab fa-github"></i></a>
          <span class="spacer"></span>
          <button class="icon-btn" title="Editar" @click.stop="openEdit(p)"><i class="fas fa-pen"></i></button>
          <button class="icon-btn danger" title="Excluir" @click.stop="remove(p)"><i class="fas fa-trash"></i></button>
        </div>
      </article>
    </div>

    <AdminProjectDrawer
      v-if="selected" :project="selected" :client="selectedClient"
      @close="selectedId = null" @edit="editFromDrawer" @delete="removeFromDrawer"
    />

    <!-- formulário -->
    <div v-if="showForm" class="ap-overlay" @mousedown.self="showForm = false">
      <form class="ap-modal" @submit.prevent="save">
        <div class="ap-modal-head">
          <h2>{{ editingId ? 'Editar projeto' : 'Novo projeto' }}</h2>
          <button type="button" class="ap-icon-btn" @click="showForm = false" aria-label="Fechar"><i class="fas fa-xmark"></i></button>
        </div>

        <div class="ap-modal-body">
          <label class="ap-field full"><span>Nome *</span><input v-model="form.name" class="ap-input" required /></label>

          <div class="ap-field full">
            <span>Imagem de capa</span>
            <div class="drop" :class="{ over: dragOver }" @dragover.prevent="dragOver = true" @dragleave="dragOver = false" @drop.prevent="onDrop">
              <img v-if="imagePreview" :src="imagePreview" alt="Prévia" />
              <div v-else class="drop-empty"><i class="fas fa-image"></i><b>Arraste uma imagem aqui</b><small>ou use os botões abaixo</small></div>
              <div v-if="generating" class="drop-loading"><i class="fas fa-circle-notch fa-spin"></i> Gerando preview do site...</div>
            </div>
            <input ref="fileInput" type="file" accept="image/*" hidden @change="onFile" />
            <div class="img-btns">
              <button type="button" class="ap-btn sm" @click="fileInput.click()"><i class="fas fa-upload"></i> Enviar foto</button>
              <button type="button" class="ap-btn sm" :disabled="!form.url.trim() || generating" @click="generateFromSite"><i class="fas fa-wand-magic-sparkles"></i> Gerar a partir do site</button>
              <button v-if="imagePreview" type="button" class="ap-btn sm danger" @click="clearImage"><i class="fas fa-xmark"></i> Remover</button>
            </div>
            <small v-if="imageError" style="color:#f87171">{{ imageError }}</small>
            <small v-else>"Gerar a partir do site" usa um serviço externo (microlink.io) que acessa a URL pública do projeto. Preencha a "URL no ar" antes.</small>
          </div>

          <label class="ap-field"><span>Tipo</span>
            <select v-model="form.kind" class="ap-select"><option value="pessoal">Pessoal</option><option value="cliente">De cliente</option></select>
          </label>
          <label class="ap-field"><span>Status</span>
            <select v-model="form.status" class="ap-select"><option v-for="(s, k) in STATUS" :key="k" :value="k">{{ s.label }}</option></select>
          </label>

          <label v-if="form.kind === 'cliente'" class="ap-field full"><span>Cliente *</span>
            <select v-model="form.client_id" class="ap-select">
              <option value="">Selecione...</option>
              <option v-for="c in clients" :key="c.id" :value="c.id">{{ c.name }}{{ c.company ? ' — ' + c.company : '' }}</option>
            </select>
            <small v-if="!clients.length">Nenhum cliente cadastrado — cadastre primeiro em "Clientes".</small>
          </label>

          <label class="ap-field full"><span>Descrição</span><textarea v-model="form.description" class="ap-textarea" rows="2"></textarea></label>

          <label class="ap-field"><span>Hospedagem</span>
            <AdminCombo v-model="form.hosting_provider" :options="hostingOptions" placeholder="VPS, Vercel..." />
          </label>
          <label class="ap-field"><span>Detalhes da hospedagem</span><input v-model="form.hosting_details" class="ap-input" placeholder="/opt/app · Docker · conta" /></label>

          <label class="ap-field"><span>URL no ar</span><input v-model="form.url" class="ap-input" type="url" placeholder="https://" /></label>
          <label class="ap-field"><span>Repositório</span><input v-model="form.repo_url" class="ap-input" type="url" placeholder="https://github.com/..." /></label>

          <label class="ap-field"><span>Domínio</span><input v-model="form.domain" class="ap-input" placeholder="meusite.com.br" /></label>
          <label class="ap-field"><span>Domínio vence em</span><input v-model="form.domain_expires_on" class="ap-input" type="date" /></label>

          <label class="ap-field full"><span>Stack</span><input v-model="stackText" class="ap-input" placeholder="Vue, Node, PostgreSQL (separe por vírgula)" /></label>

          <label class="ap-field"><span>Valor do projeto (R$)</span><input v-model="form.project_value" class="ap-input" type="number" step="0.01" min="0" /></label>
          <label class="ap-field"><span>Mensalidade (R$)</span><input v-model="form.monthly_fee" class="ap-input" type="number" step="0.01" min="0" /></label>

          <label class="ap-field"><span>Início</span><input v-model="form.started_on" class="ap-input" type="date" /></label>
          <label class="ap-field"><span>Entrega</span><input v-model="form.delivered_on" class="ap-input" type="date" /></label>

          <label class="ap-field full"><span>Anotações</span>
            <textarea v-model="form.notes" class="ap-textarea" rows="3"></textarea>
            <small>Não guarde senhas ou chaves aqui — use um gerenciador de senhas.</small>
          </label>

          <p v-if="formError" class="ap-error full">{{ formError }}</p>
        </div>

        <div class="ap-modal-foot">
          <button type="button" class="ap-btn" @click="showForm = false">Cancelar</button>
          <button type="submit" class="ap-btn primary" :disabled="saving">{{ saving ? 'Salvando...' : 'Salvar' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; }
.proj {
  display: flex; flex-direction: column; overflow: hidden; cursor: pointer; outline: none;
  background: linear-gradient(160deg, rgba(15, 26, 54, .92), rgba(8, 14, 30, .95));
  border: 1px solid rgba(96, 165, 250, .14); border-radius: 22px;
  transition: border-color .25s ease, transform .25s ease, box-shadow .25s ease;
}
.proj:hover { border-color: rgba(56, 189, 248, .45); transform: translateY(-4px); box-shadow: 0 18px 40px rgba(0, 0, 0, .45), 0 0 0 1px rgba(56, 189, 248, .12); }
.proj:focus-visible { border-color: #38bdf8; box-shadow: 0 0 0 3px rgba(56, 189, 248, .25); }

.thumb { position: relative; aspect-ratio: 16 / 10; overflow: hidden; background: #0a1226; }
.thumb img { width: 100%; height: 100%; object-fit: cover; object-position: top; transition: transform .6s ease; }
.proj:hover .thumb img { transform: scale(1.06); }
.thumb::after { content: ''; position: absolute; inset: auto 0 0 0; height: 55%; background: linear-gradient(0deg, rgba(8, 14, 30, .85), transparent); pointer-events: none; }
.ph { width: 100%; height: 100%; display: grid; place-items: center; }
.ph span { font: 800 3.6rem var(--font-primary); color: rgba(255, 255, 255, .85); text-shadow: 0 6px 30px rgba(0, 0, 0, .5); }
.st { position: absolute; top: 14px; right: 14px; z-index: 2; backdrop-filter: blur(8px); }
.host { position: absolute; left: 14px; bottom: 12px; z-index: 2; display: inline-flex; align-items: center; gap: 7px; padding: 5px 11px; border-radius: 99px; font-size: .74rem; font-weight: 600; color: #e2e8f0; background: rgba(3, 7, 18, .6); border: 1px solid rgba(255, 255, 255, .14); backdrop-filter: blur(8px); }
.host i { color: #38bdf8; font-size: .7rem; }

.body { flex: 1; padding: 18px 20px 6px; display: flex; flex-direction: column; gap: 8px; }
.body h3 { font: 700 1.12rem var(--font-primary); color: #f8fafc; }
.who { color: #7f93b5; font-size: .78rem; }
.who i { margin-right: 5px; }
.desc { font-size: .86rem; line-height: 1.55; color: #94a3b8; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 2px; }
.tag { background: rgba(14, 165, 233, .1); border: 1px solid rgba(14, 165, 233, .22); color: #7dd3fc; padding: 3px 10px; border-radius: 99px; font-size: .7rem; font-weight: 600; }
.tag-more { background: rgba(99, 102, 241, .12); border-color: rgba(99, 102, 241, .25); color: #a5b4fc; }
.facts { display: flex; flex-wrap: wrap; gap: 6px 14px; font-size: .78rem; color: #7f93b5; margin-top: 2px; }
.facts i { margin-right: 5px; color: #38bdf8; }
.facts .warn { color: #fbbf24; }
.facts .warn i { color: #fbbf24; }

.acts { display: flex; gap: 8px; align-items: center; padding: 14px 20px 18px; }
.spacer { flex: 1; }
.icon-btn { width: 38px; height: 38px; display: grid; place-items: center; border-radius: 12px; border: 1px solid rgba(148, 163, 184, .2); background: rgba(15, 26, 54, .8); color: #e2e8f0; cursor: pointer; text-decoration: none; transition: all .15s ease; }
.icon-btn:hover { border-color: #38bdf8; color: #7dd3fc; transform: translateY(-1px); }
.icon-btn.danger:hover { border-color: #ef4444; color: #ef4444; }

/* upload de imagem no formulario */
.drop { position: relative; aspect-ratio: 16 / 7; border-radius: 16px; overflow: hidden; border: 1.5px dashed rgba(148, 163, 184, .3); background: rgba(8, 14, 30, .7); display: grid; place-items: center; transition: all .18s ease; }
.drop.over { border-color: #38bdf8; background: rgba(56, 189, 248, .08); box-shadow: 0 0 0 4px rgba(56, 189, 248, .12); }
.drop img { width: 100%; height: 100%; object-fit: cover; object-position: top; }
.drop-empty { display: flex; flex-direction: column; align-items: center; gap: 4px; color: #7f93b5; }
.drop-empty i { font-size: 1.8rem; color: #38bdf8; margin-bottom: 6px; }
.drop-empty b { color: #cbd5e1; font-size: .9rem; }
.drop-empty small { font-size: .76rem; }
.drop-loading { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: 10px; background: rgba(5, 11, 26, .78); backdrop-filter: blur(3px); color: #e2e8f0; font-weight: 600; font-size: .9rem; }
.img-btns { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px; }
@media (max-width: 480px) { .cards { grid-template-columns: 1fr; } }
</style>
