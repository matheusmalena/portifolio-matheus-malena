import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Services from '../components/Services.vue'
import About from '../components/About.vue'
import Contact from '../components/Contact.vue'
import Projects from '../components/Projects.vue'
import Skills from '../components/Skills.vue'
import Certificates from '../components/Certificates.vue'
import Timeline from '../components/Timeline.vue'

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

export default router
