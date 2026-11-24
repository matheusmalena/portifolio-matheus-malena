<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  internalProjectsApi, clientsApi, STATUS, HOSTING_SUGGESTIONS, brl, daysUntil, fmtDate,
} from '../../lib/panelApi'
import AdminCombo from './AdminCombo.vue'
import AdminProjectDrawer from './AdminProjectDrawer.vue'

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

function openCreate() {
  editingId.value = null
  form.value = blank()
  stackText.value = ''
  formError.value = ''
  showForm.value = true
}

function openEdit(p) {
  editingId.value = p.id
  const f = blank()
  for (const k of Object.keys(f)) f[k] = p[k] ?? ''
  form.value = f
  stackText.value = (p.stack || []).join(', ')
  formError.value = ''
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

const pill = (color) => ({ color, borderColor: color + '55', background: color + '14' })
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
      <article v-for="p in filtered" :key="p.id" class="ap-card proj" tabindex="0" @click="selectedId = p.id" @keydown.enter="selectedId = p.id">
        <div class="top">
          <div class="title">
            <h2>{{ p.name }}</h2>
            <small>
              <i class="fas" :class="p.kind === 'cliente' ? 'fa-briefcase' : 'fa-user'"></i>
              {{ p.kind === 'cliente' ? clientName(p.client_id) || 'Cliente' : 'Projeto pessoal' }}
            </small>
          </div>
          <span class="ap-badge" :style="pill(STATUS[p.status].color)">{{ STATUS[p.status].label }}</span>
        </div>

        <p v-if="p.description" class="desc">{{ p.description }}</p>

        <dl>
          <div v-if="p.hosting_provider"><dt><i class="fas fa-server"></i></dt><dd>{{ p.hosting_provider }}<small v-if="p.hosting_details">{{ p.hosting_details }}</small></dd></div>
          <div v-if="p.url"><dt><i class="fas fa-link"></i></dt><dd><a :href="p.url" target="_blank" rel="noopener" class="ap-link" @click.stop>{{ p.url.replace(/^https?:\/\//, '') }}</a></dd></div>
          <div v-if="p.domain_expires_on"><dt><i class="fas fa-calendar-day"></i></dt><dd :style="domainWarn(p) ? 'color:#fbbf24' : ''">Domínio vence {{ fmtDate(p.domain_expires_on) }}</dd></div>
          <div v-if="p.monthly_fee || p.project_value"><dt><i class="fas fa-coins"></i></dt><dd>
            <span v-if="p.project_value">{{ brl(p.project_value) }}</span>
            <span v-if="p.project_value && p.monthly_fee"> · </span>
            <span v-if="p.monthly_fee">{{ brl(p.monthly_fee) }}/mês</span>
          </dd></div>
        </dl>

        <div v-if="p.stack?.length" class="chips"><span v-for="t in p.stack" :key="t" class="ap-chip">{{ t }}</span></div>

        <div class="actions">
          <a v-if="p.repo_url" :href="p.repo_url" target="_blank" rel="noopener" class="ap-btn sm" @click.stop><i class="fab fa-github"></i> Repo</a>
          <span class="spacer"></span>
          <button class="ap-btn sm" @click.stop="openEdit(p)"><i class="fas fa-pen"></i> Editar</button>
          <button class="ap-btn sm danger" @click.stop="remove(p)" aria-label="Excluir"><i class="fas fa-trash"></i></button>
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
.cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 16px; }
.proj { cursor: pointer; outline: none; display: flex; flex-direction: column; gap: 12px; transition: border-color var(--transition-fast), transform var(--transition-fast); }
.proj:focus-visible { border-color: #38bdf8; }
.proj:hover { border-color: rgba(96,165,250,.4); transform: translateY(-2px); }
.top { display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; }
.title h2 { font: 700 1.1rem var(--font-primary); color: var(--text-primary); }
.title small { color: var(--text-muted); font-size: .78rem; }
.title small i { margin-right: 4px; }
.desc { color: var(--text-secondary); font-size: .88rem; line-height: 1.5; }
dl { display: flex; flex-direction: column; gap: 8px; }
dl > div { display: flex; gap: 10px; font-size: .86rem; color: var(--text-secondary); }
dt { width: 16px; text-align: center; color: var(--primary-light); flex-shrink: 0; padding-top: 2px; }
dd { min-width: 0; word-break: break-word; }
dd small { display: block; color: var(--text-muted); font-size: .76rem; }
.chips { display: flex; flex-wrap: wrap; gap: 6px; }
.actions { display: flex; gap: 8px; align-items: center; margin-top: auto; padding-top: 12px; border-top: 1px solid var(--border); }
.spacer { flex: 1; }
@media (max-width: 480px) { .cards { grid-template-columns: 1fr; } }
</style>
