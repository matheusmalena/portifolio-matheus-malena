<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { signOut, getSession } from '../../lib/auth'
import logo from '../../assets/logo-nova.png'
import avatar from '../../assets/foto-perfil.jpeg'
import './admin.css'

const router = useRouter()
const open = ref(false)
const menu = ref(false)
const email = ref('')

const links = [
  { to: '/admin/painel', icon: 'fa-chart-pie', label: 'Visão geral', exact: true },
  { to: '/admin/painel/meus-projetos', icon: 'fa-layer-group', label: 'Projetos' },
  { to: '/admin/painel/clientes', icon: 'fa-users', label: 'Clientes' },
  { to: '/admin/painel/portfolio', icon: 'fa-globe', label: 'Vitrine do site' },
]

const closeMenu = () => (menu.value = false)
onMounted(async () => {
  email.value = (await getSession())?.user?.email ?? ''
  document.addEventListener('click', closeMenu)
})
onUnmounted(() => document.removeEventListener('click', closeMenu))

async function logout() {
  await signOut()
  router.push('/admin')
}
</script>

<template>
  <div class="shell">
    <div v-if="open" class="scrim" @click="open = false"></div>

    <aside class="side" :class="{ open }">
      <router-link to="/admin/painel" class="brand" @click="open = false">
        <img :src="logo" alt="Malena Dev" />
        <small>Painel interno</small>
      </router-link>

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

    <div class="main">
      <header class="topbar">
        <button class="burger" @click="open = !open" aria-label="Menu"><i class="fas fa-bars"></i></button>
        <span class="spacer"></span>
        <span class="online"><i></i> Online</span>
        <div class="user" @click.stop="menu = !menu">
          <img :src="avatar" alt="Perfil" />
          <i class="fas fa-chevron-down"></i>
          <div v-if="menu" class="dropdown" @click.stop>
            <small>{{ email }}</small>
            <a href="/" target="_blank" rel="noopener"><i class="fas fa-arrow-up-right-from-square"></i> Ver site</a>
            <button @click="logout"><i class="fas fa-right-from-bracket"></i> Sair</button>
          </div>
        </div>
      </header>

      <main class="content"><router-view /></main>
    </div>
  </div>
</template>

<style scoped>
.shell {
  min-height: 100vh; display: flex;
  background:
    radial-gradient(900px 500px at 85% -10%, rgba(56, 189, 248, .10), transparent 60%),
    radial-gradient(700px 500px at 30% 110%, rgba(99, 102, 241, .10), transparent 60%),
    #050b1a;
}

/* sidebar */
.side {
  position: fixed; inset: 0 auto 0 0; width: 250px; z-index: 1500;
  display: flex; flex-direction: column; padding: 22px 16px;
  background: linear-gradient(180deg, #0b1630 0%, #081022 55%, #0a1a3f 100%);
  border-right: 1px solid rgba(96, 165, 250, .12);
  transition: transform var(--transition-base);
}
.side::after { /* brilho azul no rodapé */
  content: ''; position: absolute; left: -40%; bottom: -10%; width: 180%; height: 220px; pointer-events: none;
  background: radial-gradient(ellipse at center, rgba(37, 99, 235, .35), transparent 65%); filter: blur(20px);
}
.brand { display: flex; flex-direction: column; gap: 4px; padding: 4px 8px 26px; text-decoration: none; position: relative; z-index: 1; }
.brand img { height: 44px; width: auto; object-fit: contain; object-position: left; }
.brand small { color: var(--text-muted); font-size: .74rem; letter-spacing: .5px; padding-left: 2px; }
nav { display: flex; flex-direction: column; gap: 6px; flex: 1; position: relative; z-index: 1; }
nav a, .side-foot a, .side-foot button {
  display: flex; align-items: center; gap: 14px; padding: 12px 14px; border-radius: 14px;
  color: #a5b4cf; text-decoration: none; font: 600 .92rem var(--font-secondary);
  background: none; border: 1px solid transparent; cursor: pointer; text-align: left; transition: all .18s ease;
}
nav a i, .side-foot i { width: 20px; text-align: center; font-size: 1rem; }
nav a:hover, .side-foot a:hover, .side-foot button:hover { background: rgba(148, 163, 184, .08); color: #fff; }
nav a.active {
  color: #fff; border-color: rgba(96, 165, 250, .45);
  background: linear-gradient(135deg, rgba(37, 99, 235, .55), rgba(14, 165, 233, .25));
  box-shadow: 0 6px 24px rgba(37, 99, 235, .35), inset 0 0 0 1px rgba(255, 255, 255, .04);
}
nav a.active i { color: #7dd3fc; }
.side-foot { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 2px; padding-top: 12px; border-top: 1px solid rgba(148, 163, 184, .12); }

/* topbar */
.main { flex: 1; margin-left: 250px; min-width: 0; display: flex; flex-direction: column; }
.topbar { position: sticky; top: 0; z-index: 1000; display: flex; align-items: center; gap: 18px; padding: 14px 32px; backdrop-filter: blur(10px); background: rgba(5, 11, 26, .55); }
.spacer { flex: 1; }
.online { display: inline-flex; align-items: center; gap: 8px; color: #34d399; font: 600 .86rem var(--font-secondary); }
.online i { width: 8px; height: 8px; border-radius: 50%; background: #34d399; box-shadow: 0 0 0 4px rgba(52, 211, 153, .18), 0 0 12px #34d399; }
.user { position: relative; display: flex; align-items: center; gap: 10px; cursor: pointer; color: var(--text-secondary); }
.user img { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 2px solid rgba(96, 165, 250, .5); }
.user > i { font-size: .72rem; }
.dropdown { position: absolute; right: 0; top: 54px; min-width: 220px; padding: 8px; display: flex; flex-direction: column; gap: 2px; background: #0b1630; border: 1px solid rgba(96, 165, 250, .2); border-radius: 14px; box-shadow: 0 16px 40px rgba(0, 0, 0, .5); }
.dropdown small { padding: 8px 10px; color: var(--text-muted); font-size: .78rem; border-bottom: 1px solid var(--border); margin-bottom: 4px; word-break: break-all; }
.dropdown a, .dropdown button { display: flex; gap: 10px; align-items: center; padding: 9px 10px; border-radius: 10px; color: #cbd5e1; text-decoration: none; font: 600 .86rem var(--font-secondary); background: none; border: none; cursor: pointer; text-align: left; }
.dropdown a:hover, .dropdown button:hover { background: rgba(148, 163, 184, .1); color: #fff; }
.content { flex: 1; }
.burger, .scrim { display: none; }

@media (max-width: 900px) {
  .side { transform: translateX(-100%); }
  .side.open { transform: none; }
  .main { margin-left: 0; }
  .topbar { padding: 10px 16px; }
  .burger { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 12px; background: rgba(148, 163, 184, .1); border: 1px solid var(--border-light); color: #fff; cursor: pointer; }
  .scrim { display: block; position: fixed; inset: 0; background: rgba(0, 0, 0, .6); z-index: 1450; }
}
</style>
