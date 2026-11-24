<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { STATUS, brl, daysUntil, fmtDate } from '../../lib/panelApi'

const props = defineProps({
  project: { type: Object, required: true },
  client: { type: Object, default: null },
})
const emit = defineEmits(['close', 'edit', 'delete'])

const copied = ref('')
async function copy(text, key) {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = key
    setTimeout(() => { if (copied.value === key) copied.value = '' }, 1400)
  } catch { /* sem permissão de clipboard */ }
}

const st = computed(() => STATUS[props.project.status])
const days = computed(() => daysUntil(props.project.domain_expires_on))
const domainColor = computed(() => (days.value === null ? '' : days.value < 0 ? '#f87171' : days.value <= 30 ? '#fbbf24' : '#34d399'))
const domainText = computed(() =>
  days.value === null ? '' : days.value < 0 ? `venceu há ${-days.value} dias` : days.value === 0 ? 'vence hoje' : `faltam ${days.value} dias`)

const hasMoney = computed(() => props.project.project_value || props.project.monthly_fee)
const yearly = computed(() => Number(props.project.monthly_fee || 0) * 12)

const TILE = ['#2563eb', '#7c3aed', '#0891b2', '#db2777', '#16a34a', '#ea580c']
const tile = computed(() => {
  let h = 0
  for (const ch of props.project.name) h = (h * 31 + ch.charCodeAt(0)) % TILE.length
  return { background: `linear-gradient(135deg, ${TILE[h]}, ${TILE[h]}99)` }
})

const fmtDateTime = (iso) => (iso ? new Date(iso).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }) : '—')
const host = (u) => u.replace(/^https?:\/\//, '').replace(/\/$/, '')

const onKey = (e) => { if (e.key === 'Escape') emit('close') }
onMounted(() => { document.addEventListener('keydown', onKey); document.body.style.overflow = 'hidden' })
onUnmounted(() => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' })
</script>

<template>
  <div class="dr-overlay" @mousedown.self="emit('close')">
    <aside class="dr" role="dialog" aria-label="Detalhes do projeto">
      <header class="dr-head">
        <button class="dr-x" @click="emit('close')" aria-label="Fechar"><i class="fas fa-xmark"></i></button>
        <span class="tile" :style="tile">{{ project.name[0] }}</span>
        <div class="who">
          <h2>{{ project.name }}</h2>
          <div class="meta">
            <span class="ap-badge" :style="{ color: st.color, borderColor: st.color + '55', background: st.color + '1a' }">{{ st.label }}</span>
            <span class="kind"><i class="fas" :class="project.kind === 'cliente' ? 'fa-briefcase' : 'fa-user'"></i>
              {{ project.kind === 'cliente' ? (client?.name || 'Cliente') : 'Projeto pessoal' }}</span>
          </div>
        </div>
      </header>

      <div class="dr-actions">
        <a v-if="project.url" :href="project.url" target="_blank" rel="noopener" class="ap-btn primary sm"><i class="fas fa-arrow-up-right-from-square"></i> Abrir site</a>
        <a v-if="project.repo_url" :href="project.repo_url" target="_blank" rel="noopener" class="ap-btn sm"><i class="fab fa-github"></i> Repositório</a>
        <button class="ap-btn sm" @click="emit('edit')"><i class="fas fa-pen"></i> Editar</button>
      </div>

      <div class="dr-body">
        <p v-if="project.description" class="desc">{{ project.description }}</p>

        <section v-if="project.hosting_provider || project.hosting_details">
          <h4><i class="fas fa-server"></i> Hospedagem</h4>
          <div class="box">
            <strong>{{ project.hosting_provider || '—' }}</strong>
            <div v-if="project.hosting_details" class="mono">
              <span>{{ project.hosting_details }}</span>
              <button class="cp" @click="copy(project.hosting_details, 'hd')" :title="'Copiar'"><i class="fas" :class="copied === 'hd' ? 'fa-check' : 'fa-copy'"></i></button>
            </div>
          </div>
        </section>

        <section v-if="project.url || project.domain">
          <h4><i class="fas fa-globe"></i> Endereço e domínio</h4>
          <div class="box">
            <div v-if="project.url" class="line">
              <a :href="project.url" target="_blank" rel="noopener" class="ap-link">{{ host(project.url) }}</a>
              <button class="cp" @click="copy(project.url, 'url')" title="Copiar"><i class="fas" :class="copied === 'url' ? 'fa-check' : 'fa-copy'"></i></button>
            </div>
            <div v-if="project.domain" class="line"><span class="lbl">Domínio</span><span>{{ project.domain }}</span></div>
            <div v-if="project.domain_expires_on" class="line">
              <span class="lbl">Vencimento</span>
              <span>{{ fmtDate(project.domain_expires_on) }}
                <em class="chip-d" :style="{ color: domainColor, borderColor: domainColor + '55', background: domainColor + '1a' }">{{ domainText }}</em></span>
            </div>
          </div>
        </section>

        <section v-if="project.stack?.length">
          <h4><i class="fas fa-code"></i> Stack</h4>
          <div class="chips"><span v-for="t in project.stack" :key="t" class="ap-chip">{{ t }}</span></div>
        </section>

        <section v-if="project.kind === 'cliente' && client">
          <h4><i class="fas fa-user-tie"></i> Cliente</h4>
          <div class="box">
            <strong>{{ client.name }}<small v-if="client.company"> · {{ client.company }}</small></strong>
            <a v-if="client.email" :href="'mailto:' + client.email" class="ap-link line"><i class="fas fa-envelope"></i> {{ client.email }}</a>
            <a v-if="client.phone" :href="'https://wa.me/' + client.phone.replace(/\D/g, '')" target="_blank" rel="noopener" class="ap-link line"><i class="fab fa-whatsapp"></i> {{ client.phone }}</a>
          </div>
        </section>

        <section v-if="hasMoney">
          <h4><i class="fas fa-coins"></i> Financeiro</h4>
          <div class="money">
            <div v-if="project.project_value"><span>Valor fechado</span><strong>{{ brl(project.project_value) }}</strong></div>
            <div v-if="project.monthly_fee"><span>Mensalidade</span><strong>{{ brl(project.monthly_fee) }}</strong></div>
            <div v-if="project.monthly_fee"><span>Por ano</span><strong>{{ brl(yearly) }}</strong></div>
          </div>
        </section>

        <section>
          <h4><i class="fas fa-clock-rotate-left"></i> Datas</h4>
          <div class="box">
            <div class="line"><span class="lbl">Início</span><span>{{ fmtDate(project.started_on) }}</span></div>
            <div class="line"><span class="lbl">Entrega</span><span>{{ fmtDate(project.delivered_on) }}</span></div>
            <div class="line"><span class="lbl">Cadastrado</span><span>{{ fmtDateTime(project.created_at) }}</span></div>
            <div class="line"><span class="lbl">Atualizado</span><span>{{ fmtDateTime(project.updated_at) }}</span></div>
          </div>
        </section>

        <section v-if="project.notes">
          <h4><i class="fas fa-note-sticky"></i> Anotações</h4>
          <p class="notes">{{ project.notes }}</p>
        </section>
      </div>

      <footer class="dr-foot">
        <button class="ap-btn sm danger" @click="emit('delete')"><i class="fas fa-trash"></i> Excluir projeto</button>
      </footer>
    </aside>
  </div>
</template>

<style scoped>
.dr-overlay { position: fixed; inset: 0; z-index: 2500; background: rgba(3, 7, 18, .6); backdrop-filter: blur(3px); display: flex; justify-content: flex-end; animation: fade .18s ease; }
.dr {
  width: 100%; max-width: 480px; height: 100%; display: flex; flex-direction: column;
  background: linear-gradient(180deg, #0c1836 0%, #081022 100%); border-left: 1px solid rgba(96, 165, 250, .25);
  box-shadow: -24px 0 60px rgba(0, 0, 0, .55); animation: slide .25s cubic-bezier(.2, .8, .2, 1);
}
@keyframes slide { from { transform: translateX(40px); opacity: 0; } to { transform: none; opacity: 1; } }
@keyframes fade { from { opacity: 0; } to { opacity: 1; } }

.dr-head { position: relative; display: flex; gap: 16px; align-items: center; padding: 28px 24px 20px; background: radial-gradient(400px 160px at 20% 0%, rgba(56, 189, 248, .16), transparent 70%); }
.dr-x { position: absolute; right: 14px; top: 14px; width: 36px; height: 36px; border-radius: 11px; border: 1px solid rgba(148, 163, 184, .2); background: rgba(148, 163, 184, .08); color: #cbd5e1; cursor: pointer; }
.dr-x:hover { color: #fff; background: rgba(148, 163, 184, .18); }
.tile { width: 60px; height: 60px; border-radius: 18px; flex-shrink: 0; display: grid; place-items: center; color: #fff; font: 800 1.5rem var(--font-primary); box-shadow: 0 8px 24px rgba(0, 0, 0, .4); }
.who { min-width: 0; padding-right: 36px; }
.who h2 { font: 800 1.4rem var(--font-primary); color: #fff; word-break: break-word; }
.meta { display: flex; align-items: center; flex-wrap: wrap; gap: 10px; margin-top: 8px; }
.kind { color: #94a3b8; font-size: .82rem; }
.kind i { margin-right: 5px; }

.dr-actions { display: flex; flex-wrap: wrap; gap: 8px; padding: 0 24px 18px; border-bottom: 1px solid rgba(148, 163, 184, .12); }
.dr-body { flex: 1; overflow-y: auto; padding: 22px 24px; display: flex; flex-direction: column; gap: 22px; }
.dr-body::-webkit-scrollbar { width: 6px; }
.dr-body::-webkit-scrollbar-thumb { background: rgba(148, 163, 184, .25); border-radius: 6px; }
.desc { color: #cbd5e1; line-height: 1.6; font-size: .94rem; }
h4 { display: flex; align-items: center; gap: 9px; font: 700 .74rem var(--font-secondary); text-transform: uppercase; letter-spacing: 1.4px; color: #7f93b5; margin-bottom: 10px; }
h4 i { color: #38bdf8; font-size: .82rem; }
.box { display: flex; flex-direction: column; gap: 10px; padding: 14px 16px; border-radius: 14px; background: rgba(148, 163, 184, .06); border: 1px solid rgba(148, 163, 184, .1); font-size: .9rem; color: #e2e8f0; }
.box strong { color: #fff; font-size: .98rem; }
.box strong small { color: #94a3b8; font-weight: 500; }
.line { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.line i { margin-right: 6px; }
.lbl { color: #7f93b5; font-size: .82rem; }
.mono { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; font: .8rem/1.5 ui-monospace, SFMono-Regular, Menlo, monospace; color: #93c5fd; background: rgba(3, 7, 18, .5); border-radius: 10px; padding: 10px 12px; word-break: break-word; }
.cp { flex-shrink: 0; width: 30px; height: 30px; border-radius: 9px; border: none; background: rgba(148, 163, 184, .1); color: #94a3b8; cursor: pointer; }
.cp:hover { color: #fff; background: rgba(56, 189, 248, .2); }
.chip-d { font-style: normal; font-size: .72rem; font-weight: 700; padding: 2px 9px; border-radius: 99px; border: 1px solid; margin-left: 8px; }
.chips { display: flex; flex-wrap: wrap; gap: 7px; }
.money { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px; }
.money div { padding: 14px; border-radius: 14px; background: linear-gradient(135deg, rgba(34, 197, 94, .14), rgba(14, 165, 233, .05)); border: 1px solid rgba(34, 197, 94, .22); }
.money span { display: block; color: #86efac; font-size: .72rem; text-transform: uppercase; letter-spacing: .8px; margin-bottom: 4px; }
.money strong { color: #fff; font: 700 1.05rem var(--font-primary); }
.notes { white-space: pre-wrap; color: #cbd5e1; font-size: .9rem; line-height: 1.6; padding: 14px 16px; border-radius: 14px; background: rgba(251, 191, 36, .06); border: 1px solid rgba(251, 191, 36, .16); }
.dr-foot { padding: 16px 24px; border-top: 1px solid rgba(148, 163, 184, .12); display: flex; justify-content: flex-end; }

@media (max-width: 520px) { .dr { max-width: 100%; } }
</style>
