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

const STATUS_ICON = { planejamento: 'fa-lightbulb', desenvolvimento: 'fa-code', producao: 'fa-rocket', pausado: 'fa-pause', arquivado: 'fa-box-archive' }
const byStatus = computed(() => {
  const total = projects.value.length || 1
  return Object.entries(STATUS).map(([key, v]) => {
    const n = projects.value.filter((p) => p.status === key).length
    return { ...v, key, n, pct: (n / total) * 100, icon: STATUS_ICON[key] }
  })
})

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

const paused = computed(() => projects.value.filter((p) => p.status === 'pausado').length)
const attention = computed(() => paused.value + renewals.value.filter((r) => r.days <= 30).length)

const recent = computed(() => projects.value.slice(0, 5))
const clientName = (id) => clients.value.find((c) => c.id === id)?.name

const pill = (color) => ({ color, borderColor: color + '55', background: color + '1a' })
const renewalColor = (days) => (days < 0 ? '#f87171' : days <= 30 ? '#fbbf24' : '#94a3b8')

const TILE_COLORS = ['#2563eb', '#7c3aed', '#0891b2', '#db2777', '#16a34a', '#ea580c']
const tileBg = (name) => {
  let h = 0
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) % TILE_COLORS.length
  const c = TILE_COLORS[h]
  return { background: `linear-gradient(135deg, ${c}, ${c}99)` }
}
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
        <div class="kpi" style="--k:#3b82f6">
          <span class="ico"><i class="fas fa-folder-open"></i></span>
          <div><label>Projetos</label><strong>{{ projects.length }}</strong><small class="up"><i class="fas fa-arrow-up"></i> {{ active.length }} ativos</small></div>
          <i class="fas fa-folder-open mark"></i>
        </div>
        <div class="kpi" style="--k:#22c55e">
          <span class="ico"><i class="fas fa-rocket"></i></span>
          <div><label>No ar</label><strong>{{ live.length }}</strong><small><i class="dot"></i> em produção</small></div>
          <i class="fas fa-rocket mark"></i>
        </div>
        <div class="kpi" style="--k:#8b5cf6">
          <span class="ico"><i class="fas fa-user-group"></i></span>
          <div><label>Clientes</label><strong>{{ clients.length }}</strong><small>{{ clientProjects.length }} projetos de clientes</small></div>
          <i class="fas fa-user-group mark"></i>
        </div>
        <div class="kpi" style="--k:#10b981">
          <span class="ico"><i class="fas fa-dollar-sign"></i></span>
          <div><label>Recorrente / mês</label><strong class="money">{{ brl(mrr) }}</strong><small>{{ brl(totalSold) }} em projetos fechados</small></div>
          <i class="fas fa-chart-line mark"></i>
        </div>
      </div>

      <div class="grid">
        <section class="panel">
          <h3><i class="fas fa-wave-square" style="color:#38bdf8"></i> Por status</h3>
          <div v-for="s in byStatus" :key="s.key" class="st-row">
            <span class="st-ico" :style="{ background: s.color + '26', color: s.color }"><i class="fas" :class="s.icon"></i></span>
            <span class="st-name">{{ s.label }}</span>
            <strong class="st-n">{{ s.n }}</strong>
            <span class="st-bar"><i :style="{ width: Math.max(s.pct, s.n ? 6 : 0) + '%', background: s.color }"></i></span>
          </div>
        </section>

        <section class="panel">
          <h3><i class="fas fa-cloud" style="color:#38bdf8"></i> Onde estão hospedados</h3>
          <p v-if="!byHosting.length" class="ap-muted">Sem dados ainda.</p>
          <div v-for="h in byHosting" :key="h.name" class="host-row">
            <span class="host-name">{{ h.name }}</span>
            <span class="host-bar"><i :style="{ width: h.pct + '%' }"></i></span>
            <strong>{{ h.n }}</strong>
          </div>

          <div class="health" :class="{ warn: attention }">
            <span class="health-ico"><i class="fas" :class="attention ? 'fa-triangle-exclamation' : 'fa-check'"></i></span>
            <div>
              <strong>{{ attention ? 'Atenção' : 'Tudo certo!' }}</strong>
              <small v-if="!attention">Seus projetos estão online e funcionando.</small>
              <small v-else>{{ paused }} pausado(s) · {{ renewals.filter(r => r.days <= 30).length }} domínio(s) vencendo em 30 dias.</small>
            </div>
          </div>
        </section>

        <section class="panel">
          <h3><i class="fas fa-calendar-days" style="color:#38bdf8"></i> Domínios a vencer (90 dias)</h3>
          <div v-if="!renewals.length" class="calm">
            <span><i class="fas fa-calendar-check"></i></span>
            <strong>Nada vencendo.</strong>
            <small>Você está em dia com seus domínios!</small>
          </div>
          <div v-for="r in renewals" :key="r.id" class="item">
            <div class="txt"><strong>{{ r.domain || r.name }}</strong><small>{{ fmtDate(r.domain_expires_on) }}</small></div>
            <span class="ap-badge" :style="pill(renewalColor(r.days))">{{ r.days < 0 ? 'vencido' : r.days + ' dias' }}</span>
          </div>
        </section>

        <section class="panel">
          <h3><i class="fas fa-puzzle-piece" style="color:#38bdf8"></i> Adicionados recentemente</h3>
          <p v-if="!recent.length" class="ap-muted">Nenhum projeto ainda.</p>
          <div v-for="p in recent" :key="p.id" class="item">
            <span class="tile" :style="tileBg(p.name)">{{ p.name[0] }}</span>
            <div class="txt"><strong>{{ p.name }}</strong><small>{{ p.kind === 'cliente' ? clientName(p.client_id) || 'Cliente' : 'Pessoal' }} · {{ p.hosting_provider || '—' }}</small></div>
            <span class="ap-badge" :style="pill(STATUS[p.status].color)">{{ STATUS[p.status].label }}</span>
          </div>
        </section>
      </div>
    </template>
  </div>
</template>

<style scoped>
.kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 18px; }
.kpi {
  position: relative; overflow: hidden; display: flex; align-items: center; gap: 16px; padding: 22px;
  border-radius: 20px; border: 1px solid color-mix(in srgb, var(--k) 45%, transparent);
  background: linear-gradient(135deg, color-mix(in srgb, var(--k) 24%, #0a1226), color-mix(in srgb, var(--k) 6%, #0a1226));
  box-shadow: 0 10px 30px color-mix(in srgb, var(--k) 12%, transparent);
  transition: transform .2s ease;
}
.kpi:hover { transform: translateY(-3px); }
.ico { width: 56px; height: 56px; border-radius: 16px; flex-shrink: 0; display: grid; place-items: center; font-size: 1.4rem; color: #fff; background: linear-gradient(135deg, var(--k), color-mix(in srgb, var(--k) 60%, #000)); box-shadow: 0 6px 18px color-mix(in srgb, var(--k) 50%, transparent); }
.kpi label { display: block; color: #cbd5e1; font-size: .86rem; font-weight: 600; }
.kpi strong { display: block; color: #fff; font: 800 2.1rem/1.15 var(--font-primary); }
.kpi strong.money { font-size: 1.6rem; }
.kpi small { color: #94a3b8; font-size: .78rem; display: flex; align-items: center; gap: 6px; }
.kpi small.up { color: #4ade80; }
.dot { width: 7px; height: 7px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 8px #22c55e; }
.mark { position: absolute; right: -8px; bottom: -14px; font-size: 5.5rem; color: var(--k); opacity: .13; transform: rotate(-8deg); }

.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.panel { padding: 24px; border-radius: 20px; border: 1px solid rgba(96, 165, 250, .14); background: linear-gradient(160deg, rgba(15, 26, 54, .9), rgba(8, 14, 30, .9)); }
.panel h3 { display: flex; align-items: center; gap: 10px; font: 700 1.1rem var(--font-primary); color: #f1f5f9; margin-bottom: 18px; }

.st-row { display: grid; grid-template-columns: 34px 150px 28px 1fr; align-items: center; gap: 12px; padding: 8px 0; }
.st-ico { width: 32px; height: 32px; border-radius: 50%; display: grid; place-items: center; font-size: .8rem; }
.st-name { color: #cbd5e1; font-size: .92rem; font-weight: 500; }
.st-n { color: #fff; font-size: 1.05rem; text-align: right; }
.st-bar { height: 8px; border-radius: 99px; background: rgba(148, 163, 184, .12); overflow: hidden; }
.st-bar i { display: block; height: 100%; border-radius: 99px; transition: width .6s ease; }

.host-row { display: grid; grid-template-columns: minmax(110px, 170px) 1fr 28px; align-items: center; gap: 14px; margin-bottom: 12px; }
.host-name { color: #cbd5e1; font-size: .92rem; }
.host-bar { height: 12px; border-radius: 99px; background: rgba(148, 163, 184, .12); overflow: hidden; }
.host-bar i { display: block; height: 100%; border-radius: 99px; background: linear-gradient(90deg, #3b82f6, #22d3ee 60%, #34d399); transition: width .6s ease; }
.host-row strong { color: #fff; text-align: right; }

.health { display: flex; align-items: center; gap: 16px; margin-top: 22px; padding: 18px; border-radius: 16px; border: 1px solid rgba(34, 197, 94, .25); background: linear-gradient(135deg, rgba(34, 197, 94, .12), rgba(14, 165, 233, .05)); }
.health.warn { border-color: rgba(251, 191, 36, .3); background: linear-gradient(135deg, rgba(251, 191, 36, .13), rgba(249, 115, 22, .05)); }
.health-ico { width: 48px; height: 48px; border-radius: 50%; display: grid; place-items: center; font-size: 1.2rem; color: #fff; background: #22c55e; box-shadow: 0 0 22px rgba(34, 197, 94, .55); flex-shrink: 0; }
.health.warn .health-ico { background: #f59e0b; box-shadow: 0 0 22px rgba(245, 158, 11, .55); }
.health strong { display: block; color: #fff; font: 700 1.1rem var(--font-primary); }
.health small { color: #94a3b8; font-size: .86rem; }

.calm { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 4px; padding: 14px 0 6px; }
.calm span { width: 62px; height: 62px; border-radius: 18px; display: grid; place-items: center; font-size: 1.7rem; color: #93c5fd; background: rgba(59, 130, 246, .14); border: 1px solid rgba(96, 165, 250, .3); margin-bottom: 8px; }
.calm strong { color: #f1f5f9; font-size: 1.05rem; }
.calm small { color: #94a3b8; }

.item { display: flex; align-items: center; gap: 14px; padding: 12px 0; border-bottom: 1px solid rgba(148, 163, 184, .1); }
.item:last-child { border: none; }
.item .txt { flex: 1; min-width: 0; }
.txt strong { display: block; color: #f1f5f9; font-size: .95rem; }
.txt small { color: #64748b; font-size: .8rem; }
.tile { width: 44px; height: 44px; border-radius: 13px; display: grid; place-items: center; color: #fff; font: 800 1.1rem var(--font-primary); flex-shrink: 0; box-shadow: 0 4px 14px rgba(0, 0, 0, .35); }

@media (max-width: 1100px) { .kpis { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 760px) {
  .grid { grid-template-columns: 1fr; }
  .kpis { grid-template-columns: 1fr 1fr; gap: 10px; }
  .kpi { padding: 16px; gap: 12px; flex-direction: column; align-items: flex-start; }
  .st-row { grid-template-columns: 34px 1fr 28px; }
  .st-bar { grid-column: 1 / -1; }
}
</style>
