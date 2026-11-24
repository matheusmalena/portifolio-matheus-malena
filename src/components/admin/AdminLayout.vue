<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signOut } from '../../lib/auth'
import './admin.css'

const router = useRouter()
const open = ref(false)

const links = [
  { to: '/admin/painel', icon: 'fa-chart-pie', label: 'Visão geral', exact: true },
  { to: '/admin/painel/meus-projetos', icon: 'fa-layer-group', label: 'Projetos' },
  { to: '/admin/painel/clientes', icon: 'fa-users', label: 'Clientes' },
  { to: '/admin/painel/portfolio', icon: 'fa-globe', label: 'Vitrine do site' },
]

async function logout() {
  await signOut()
  router.push('/admin')
}
</script>

<template>
  <div class="shell">
    <button class="burger" @click="open = !open" aria-label="Menu"><i class="fas fa-bars"></i></button>
    <div v-if="open" class="scrim" @click="open = false"></div>

    <aside class="side" :class="{ open }">
      <div class="brand">
        <span class="logo">M</span>
        <div><strong>Malena Tech</strong><small>Painel interno</small></div>
      </div>

      <nav>
        <router-link
          v-for="l in links" :key="l.to" :to="l.to"
          :class="{ active: l.exact ? $route.path === l.to : $route.path.startsWith(l.to) }"
          @click="open = false"
        >
          <i class="fas" :class="l.icon"></i><span>{{ l.label }}</span>
        </router-link>
      </nav>

      <div class="side-foot">
        <a href="/" target="_blank" rel="noopener"><i class="fas fa-arrow-up-right-from-square"></i><span>Ver site</span></a>
        <button @click="logout"><i class="fas fa-right-from-bracket"></i><span>Sair</span></button>
      </div>
    </aside>

    <main class="content"><router-view /></main>
  </div>
</template>

<style scoped>
.shell { min-height: 100vh; background: var(--background-dark); display: flex; }
.side { position: fixed; inset: 0 auto 0 0; width: 240px; background: var(--background-card); border-right: 1px solid var(--border); display: flex; flex-direction: column; padding: 20px 14px; z-index: 1500; transition: transform var(--transition-base); }
.brand { display: flex; align-items: center; gap: 12px; padding: 4px 10px 22px; }
.logo { width: 38px; height: 38px; border-radius: 11px; background: var(--gradient-primary); display: grid; place-items: center; font: 800 1.1rem var(--font-primary); color: #fff; box-shadow: 0 4px 14px rgba(14,165,233,.35); }
.brand strong { display: block; color: var(--text-primary); font: 700 .98rem var(--font-primary); }
.brand small { color: var(--text-muted); font-size: .74rem; }
nav { display: flex; flex-direction: column; gap: 4px; flex: 1; }
nav a, .side-foot a, .side-foot button { display: flex; align-items: center; gap: 12px; padding: 11px 12px; border-radius: var(--radius-md); color: var(--text-secondary); text-decoration: none; font: 600 .9rem var(--font-secondary); background: none; border: none; cursor: pointer; text-align: left; transition: all var(--transition-fast); }
nav a i, .side-foot i { width: 18px; text-align: center; }
nav a:hover, .side-foot a:hover, .side-foot button:hover { background: var(--surface-light); color: var(--text-primary); }
nav a.active { background: rgba(14,165,233,.12); color: var(--primary-light); box-shadow: inset 3px 0 0 var(--primary); }
.side-foot { border-top: 1px solid var(--border); padding-top: 12px; display: flex; flex-direction: column; gap: 2px; }
.content { margin-left: 240px; flex: 1; min-width: 0; }
.burger, .scrim { display: none; }

@media (max-width: 900px) {
  .side { transform: translateX(-100%); }
  .side.open { transform: none; }
  .content { margin-left: 0; padding-top: 56px; }
  .burger { display: grid; place-items: center; position: fixed; top: 10px; left: 12px; width: 40px; height: 40px; border-radius: var(--radius-md); background: var(--background-card); border: 1px solid var(--border-light); color: var(--text-primary); z-index: 1400; cursor: pointer; }
  .scrim { display: block; position: fixed; inset: 0; background: rgba(0,0,0,.55); z-index: 1450; }
}
</style>
