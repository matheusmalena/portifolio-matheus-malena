<script setup>
import { ref, computed, onMounted } from 'vue'
import { internalProjectsApi, clientsApi, STATUS, brl, daysUntil, fmtDate } from '../../lib/panelApi'

const projects = ref([])
const clients = ref([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const [p, c] = await Promise.all([internalProjectsApi.list(), clientsApi.list()])
    projects.value = p
    clients.value = c
  } catch (e) {
    error.value = 'Não foi possível carregar. Você já rodou o supabase/internal_panel.sql?'
  } finally {
    loading.value = false
  }
})

const active = computed(() => projects.value.filter((p) => p.status !== 'arquivado'))
const live = computed(() => projects.value.filter((p) => p.status === 'producao'))
const clientProjects = computed(() => projects.value.filter((p) => p.kind === 'cliente'))
const mrr = computed(() => live.value.reduce((s, p) => s + Number(p.monthly_fee || 0), 0))
const totalSold = computed(() => clientProjects.value.reduce((s, p) => s + Number(p.project_value || 0), 0))

const byStatus = computed(() =>
  Object.entries(STATUS).map(([key, v]) => ({ ...v, key, n: projects.value.filter((p) => p.status === key).length })))

const byHosting = computed(() => {
  const map = {}
  for (const p of active.value) {
    const k = p.hosting_provider?.trim() || 'Não informado'
    map[k] = (map[k] || 0) + 1
  }
  const rows = Object.entries(map).map(([name, n]) => ({ name, n })).sort((a, b) => b.n - a.n)
  const max = rows[0]?.n || 1
  return rows.map((r) => ({ ...r, pct: (r.n / max) * 100 }))
})

const renewals = computed(() =>
  projects.value
    .filter((p) => p.domain_expires_on)
    .map((p) => ({ ...p, days: daysUntil(p.domain_expires_on) }))
    .filter((p) => p.days <= 90)
    .sort((a, b) => a.days - b.days))

const recent = computed(() => projects.value.slice(0, 5))
const clientName = (id) => clients.value.find((c) => c.id === id)?.name

const pill = (color) => ({ color, borderColor: color + '55', background: color + '14' })
const renewalStyle = (days) => pill(days < 0 ? '#f87171' : days <= 30 ? '#fbbf24' : '#94a3b8')
</script>

<template>
  <div class="ap-page">
    <div class="ap-head">
      <div><h1>Visão geral</h1><p>Tudo que você construiu e onde está rodando.</p></div>
      <router-link to="/admin/painel/meus-projetos" class="ap-btn primary"><i class="fas fa-plus"></i> Novo projeto</router-link>
    </div>

    <p v-if="error" class="ap-error">{{ error }}</p>
    <div v-if="loading" class="ap-empty"><i class="fas fa-circle-notch fa-spin"></i>Carregando...</div>

    <template v-else-if="!error">
      <div class="kpis">
        <div class="ap-card kpi"><span>Projetos</span><strong>{{ projects.length }}</strong><small>{{ active.length }} ativos</small></div>
        <div class="ap-card kpi"><span>No ar</span><strong>{{ live.length }}</strong><small>em produção</small></div>
        <div class="ap-card kpi"><span>Clientes</span><strong>{{ clients.length }}</strong><small>{{ clientProjects.length }} projetos de clientes</small></div>
        <div class="ap-card kpi"><span>Recorrente / mês</span><strong>{{ brl(mrr) }}</strong><small>{{ brl(totalSold) }} em projetos fechados</small></div>
      </div>

      <div class="grid">
        <div class="ap-card">
          <h3>Por status</h3>
          <div v-for="s in byStatus" :key="s.key" class="row">
            <span class="ap-badge" :style="pill(s.color)">{{ s.label }}</span>
            <strong class="num">{{ s.n }}</strong>
          </div>
        </div>

        <div class="ap-card">
          <h3>Onde estão hospedados</h3>
          <p v-if="!byHosting.length" class="ap-muted">Sem dados ainda.</p>
          <div v-for="h in byHosting" :key="h.name" class="bar-row">
            <div class="bar-label"><span>{{ h.name }}</span><strong>{{ h.n }}</strong></div>
            <div class="bar"><i :style="{ width: h.pct + '%' }"></i></div>
          </div>
        </div>

        <div class="ap-card">
          <h3>Domínios a vencer (90 dias)</h3>
          <p v-if="!renewals.length" class="ap-muted">Nada vencendo.</p>
          <div v-for="r in renewals" :key="r.id" class="row">
            <div class="txt"><strong>{{ r.domain || r.name }}</strong><small>{{ fmtDate(r.domain_expires_on) }}</small></div>
            <span class="ap-badge" :style="renewalStyle(r.days)">{{ r.days < 0 ? 'vencido' : r.days + ' dias' }}</span>
          </div>
        </div>

        <div class="ap-card">
          <h3>Adicionados recentemente</h3>
          <p v-if="!recent.length" class="ap-muted">Nenhum projeto ainda.</p>
          <div v-for="p in recent" :key="p.id" class="row">
            <div class="txt"><strong>{{ p.name }}</strong><small>{{ p.kind === 'cliente' ? clientName(p.client_id) || 'Cliente' : 'Pessoal' }} · {{ p.hosting_provider || '—' }}</small></div>
            <span class="ap-badge" :style="pill(STATUS[p.status].color)">{{ STATUS[p.status].label }}</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 16px; }
.kpi span { font-size: .78rem; text-transform: uppercase; letter-spacing: 1.2px; color: var(--text-muted); font-weight: 700; }
.kpi strong { display: block; font: 800 1.9rem var(--font-primary); margin: 6px 0 2px; background: var(--gradient-accent); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.kpi small { color: var(--text-secondary); font-size: .8rem; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.row { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 9px 0; border-bottom: 1px solid var(--border); }
.row:last-child { border: none; }
.num { color: var(--text-primary); font-size: 1.1rem; }
.txt strong { display: block; color: var(--text-primary); font-size: .92rem; }
.txt small { color: var(--text-muted); font-size: .78rem; }
.bar-row { margin-bottom: 14px; }
.bar-label { display: flex; justify-content: space-between; font-size: .88rem; color: var(--text-secondary); margin-bottom: 6px; }
.bar-label strong { color: var(--text-primary); }
.bar { height: 8px; background: var(--surface-light); border-radius: 99px; overflow: hidden; }
.bar i { display: block; height: 100%; background: var(--gradient-primary); border-radius: 99px; }
@media (max-width: 1000px) { .kpis { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 700px) { .grid { grid-template-columns: 1fr; } .kpis { gap: 10px; } }
</style>
