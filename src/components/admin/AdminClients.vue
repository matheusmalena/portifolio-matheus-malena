<script setup>
import { ref, computed, onMounted } from 'vue'
import { clientsApi, internalProjectsApi, brl } from '../../lib/panelApi'

const clients = ref([])
const projects = ref([])
const loading = ref(true)
const error = ref('')
const search = ref('')

const showForm = ref(false)
const saving = ref(false)
const formError = ref('')
const editingId = ref(null)
const form = ref(blank())

function blank() {
  return { name: '', company: '', email: '', phone: '', notes: '' }
}

async function load() {
  loading.value = true
  try {
    const [c, p] = await Promise.all([clientsApi.list(), internalProjectsApi.list()])
    clients.value = c
    projects.value = p
    error.value = ''
  } catch (e) {
    error.value = 'Não foi possível carregar. Você já rodou o supabase/internal_panel.sql?'
  } finally {
    loading.value = false
  }
}
onMounted(load)

const withStats = computed(() => {
  const q = search.value.trim().toLowerCase()
  return clients.value
    .map((c) => {
      const mine = projects.value.filter((p) => p.client_id === c.id)
      return {
        ...c,
        projects: mine,
        monthly: mine.filter((p) => p.status === 'producao').reduce((s, p) => s + Number(p.monthly_fee || 0), 0),
        total: mine.reduce((s, p) => s + Number(p.project_value || 0), 0),
      }
    })
    .filter((c) => !q || [c.name, c.company, c.email].filter(Boolean).join(' ').toLowerCase().includes(q))
})

function openCreate() {
  editingId.value = null
  form.value = blank()
  formError.value = ''
  showForm.value = true
}

function openEdit(c) {
  editingId.value = c.id
  form.value = { name: c.name, company: c.company ?? '', email: c.email ?? '', phone: c.phone ?? '', notes: c.notes ?? '' }
  formError.value = ''
  showForm.value = true
}

const nullIfEmpty = (v) => (v?.trim() ? v.trim() : null)

async function save() {
  formError.value = ''
  if (!form.value.name.trim()) { formError.value = 'Informe o nome do cliente.'; return }
  const f = form.value
  const payload = {
    name: f.name.trim(), company: nullIfEmpty(f.company), email: nullIfEmpty(f.email),
    phone: nullIfEmpty(f.phone), notes: nullIfEmpty(f.notes),
  }
  saving.value = true
  try {
    if (editingId.value) await clientsApi.update(editingId.value, payload)
    else await clientsApi.create(payload)
    showForm.value = false
    await load()
  } catch (e) {
    formError.value = 'Erro ao salvar: ' + (e.message || 'tente novamente')
  } finally {
    saving.value = false
  }
}

async function remove(c) {
  const n = c.projects.length
  const msg = n
    ? `Excluir "${c.name}"? Os ${n} projeto(s) dele continuam cadastrados, mas ficam sem cliente.`
    : `Excluir "${c.name}"?`
  if (!confirm(msg)) return
  try {
    await clientsApi.remove(c.id)
    await load()
  } catch (e) {
    error.value = 'Erro ao excluir: ' + e.message
  }
}

const initials = (name) => name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('')
</script>

<template>
  <div class="ap-page">
    <div class="ap-head">
      <div>
        <h1>Clientes</h1>
        <p v-if="!loading">{{ clients.length }} {{ clients.length === 1 ? 'cliente' : 'clientes' }}</p>
      </div>
      <button class="ap-btn primary" @click="openCreate"><i class="fas fa-plus"></i> Novo cliente</button>
    </div>

    <p v-if="error" class="ap-error">{{ error }}</p>

    <div class="ap-toolbar"><input v-model="search" class="ap-input" placeholder="Buscar cliente..." /></div>

    <div v-if="loading" class="ap-empty"><i class="fas fa-circle-notch fa-spin"></i>Carregando...</div>
    <div v-else-if="!withStats.length" class="ap-empty">
      <i class="fas fa-users"></i>
      {{ clients.length ? 'Nenhum cliente encontrado.' : 'Nenhum cliente ainda. Clique em "Novo cliente".' }}
    </div>

    <div v-else class="cards">
      <article v-for="c in withStats" :key="c.id" class="ap-card cli">
        <div class="head">
          <span class="avatar">{{ initials(c.name) }}</span>
          <div class="who">
            <h2>{{ c.name }}</h2>
            <small v-if="c.company">{{ c.company }}</small>
          </div>
        </div>

        <div class="contact">
          <a v-if="c.email" :href="'mailto:' + c.email" class="ap-link"><i class="fas fa-envelope"></i> {{ c.email }}</a>
          <a v-if="c.phone" :href="'https://wa.me/' + c.phone.replace(/\D/g, '')" target="_blank" rel="noopener" class="ap-link"><i class="fab fa-whatsapp"></i> {{ c.phone }}</a>
        </div>

        <div class="stats">
          <div><strong>{{ c.projects.length }}</strong><span>projetos</span></div>
          <div><strong>{{ brl(c.total) }}</strong><span>fechado</span></div>
          <div><strong>{{ brl(c.monthly) }}</strong><span>/ mês</span></div>
        </div>

        <div v-if="c.projects.length" class="chips">
          <a v-for="p in c.projects" :key="p.id" :href="p.url || undefined" target="_blank" rel="noopener" class="ap-chip">{{ p.name }}</a>
        </div>

        <p v-if="c.notes" class="notes">{{ c.notes }}</p>

        <div class="actions">
          <button class="ap-btn sm" @click="openEdit(c)"><i class="fas fa-pen"></i> Editar</button>
          <button class="ap-btn sm danger" @click="remove(c)" aria-label="Excluir"><i class="fas fa-trash"></i></button>
        </div>
      </article>
    </div>

    <div v-if="showForm" class="ap-overlay" @mousedown.self="showForm = false">
      <form class="ap-modal" @submit.prevent="save">
        <div class="ap-modal-head">
          <h2>{{ editingId ? 'Editar cliente' : 'Novo cliente' }}</h2>
          <button type="button" class="ap-icon-btn" @click="showForm = false" aria-label="Fechar"><i class="fas fa-xmark"></i></button>
        </div>
        <div class="ap-modal-body">
          <label class="ap-field"><span>Nome *</span><input v-model="form.name" class="ap-input" required /></label>
          <label class="ap-field"><span>Empresa</span><input v-model="form.company" class="ap-input" /></label>
          <label class="ap-field"><span>E-mail</span><input v-model="form.email" class="ap-input" type="email" /></label>
          <label class="ap-field"><span>Telefone / WhatsApp</span><input v-model="form.phone" class="ap-input" placeholder="5511999999999" /></label>
          <label class="ap-field full"><span>Anotações</span><textarea v-model="form.notes" class="ap-textarea" rows="3"></textarea></label>
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
.cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px; }
.cli { display: flex; flex-direction: column; gap: 14px; }
.head { display: flex; align-items: center; gap: 12px; }
.avatar { width: 44px; height: 44px; border-radius: 13px; background: var(--gradient-primary); display: grid; place-items: center; font: 700 .95rem var(--font-primary); color: #fff; flex-shrink: 0; }
.who h2 { font: 700 1.05rem var(--font-primary); color: var(--text-primary); }
.who small { color: var(--text-muted); font-size: .8rem; }
.contact { display: flex; flex-direction: column; gap: 6px; font-size: .86rem; }
.contact i { width: 16px; margin-right: 4px; }
.stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; background: var(--surface-light); border-radius: var(--radius-md); padding: 12px; }
.stats strong { display: block; color: var(--text-primary); font-size: .95rem; }
.stats span { color: var(--text-muted); font-size: .72rem; text-transform: uppercase; letter-spacing: .8px; }
.chips { display: flex; flex-wrap: wrap; gap: 6px; }
.chips a { text-decoration: none; }
.notes { color: var(--text-secondary); font-size: .84rem; line-height: 1.5; }
.actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: auto; padding-top: 12px; border-top: 1px solid var(--border); }
@media (max-width: 480px) { .cards { grid-template-columns: 1fr; } }
</style>
