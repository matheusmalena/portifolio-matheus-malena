import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Services from '../components/Services.vue'
import About from '../components/About.vue'
import Contact from '../components/Contact.vue'
import Projects from '../components/Projects.vue'
import Skills from '../components/Skills.vue'
import Certificates from '../components/Certificates.vue'
import Timeline from '../components/Timeline.vue'
import AdminLogin from '../components/admin/AdminLogin.vue'
import AdminProjects from '../components/admin/AdminProjects.vue'
import { getSession } from '../lib/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/services',
    name: 'Services',
    component: Services,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects,
  },
  {
    path: '/skills',
    name: 'Skills',
    component: Skills,
  },
  {
    path: '/certificates',
    name: 'Certificates',
    component: Certificates,
  },
  {
    path: '/timeline',
    name: 'Timeline',
    component: Timeline,
  },
  {
    path: '/admin',
    name: 'AdminLogin',
    component: AdminLogin,
  },
  {
    path: '/admin/projetos',
    name: 'AdminProjects',
    component: AdminProjects,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return { top: 0 }
  },
})

router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth) return true

  const session = await getSession()
  if (!session) {
    return { path: '/admin' }
  }
  return true
})

export default router
