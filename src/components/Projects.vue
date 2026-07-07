<template>
  <section class="projects-section" id="projects" aria-label="Meus projetos desenvolvidos">
    <div class="section-bg">
      <div class="bg-glow glow-1"></div>
      <div class="bg-glow glow-2"></div>
      <div class="bg-grid"></div>
    </div>

    <div class="container">
      <header class="section-header">
        <div class="badge">Portfolio</div>
        <h2 class="section-title" v-html="$t('projects.section_title')"></h2>
        <p class="section-subtitle">{{ $t('projects.section_subtitle') }}</p>
      </header>

      <nav class="projects-filter">
        <button 
          v-for="category in categories" 
          :key="category.id" 
          @click="changeCategory(category.id)"
          :class="{ active: activeCategory === category.id }" 
          class="filter-btn"
        >
          <span class="btn-text">{{ $t(`projects.categories.${category.id}`) }}</span>
          <span class="btn-icon"><i class="fas fa-check"></i></span>
        </button>
      </nav>

      <div class="projects-grid">
        <article
          v-for="(project, index) in paginatedProjects"
          :key="project.id"
          class="project-card"
          @click="openModal(project)"
        >
          <div class="card-image">
            <img :src="project.image" :alt="project.title" class="project-image" />
            <div class="image-overlay"></div>
            <div class="expand-hint">
              <i class="fas fa-expand"></i>
            </div>
          </div>

          <div class="card-content">
            <div class="card-header">
              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>
            </div>

            <div class="card-techs">
              <span v-for="tech in project.techs" :key="tech" class="tech-tag">
                {{ tech }}
              </span>
            </div>

            <div class="card-actions" @click.stop>
              <a v-if="project.demoUrl" :href="project.demoUrl" target="_blank" class="action-btn primary">
                <i class="fas fa-external-link-alt"></i>
                <span>Visitar</span>
              </a>
              <a v-if="project.codeUrl" :href="project.codeUrl" target="_blank" class="action-btn secondary">
                <i class="fab fa-github"></i>
                <span>Código</span>
              </a>
            </div>
          </div>

          <div class="card-border-glow"></div>
        </article>
      </div>

      <Pagination v-if="filteredProjects.length > itemsPerPage" :current-page="currentPage" :total-pages="totalPages" @page-changed="changePage" />
    </div>

    <Teleport to="body">
      <Transition name="modal">
        <div v-if="selectedProject" class="project-modal-overlay" @click.self="closeModal">
          <div class="project-modal">
            <button class="modal-close" @click="closeModal" aria-label="Fechar">
              <i class="fas fa-times"></i>
            </button>

            <div class="modal-image">
              <img :src="selectedProject.image" :alt="selectedProject.title" />
              <div class="modal-image-overlay"></div>
              <span class="modal-badge">{{ $t(`projects.categories.${categoryLabelKey(selectedProject)}`) }}</span>
            </div>

            <div class="modal-body">
              <h3 class="modal-title">{{ selectedProject.title }}</h3>
              <p class="modal-description">{{ selectedProject.description }}</p>

              <div class="modal-techs">
                <span v-for="tech in selectedProject.techs" :key="tech" class="tech-tag">
                  {{ tech }}
                </span>
              </div>

              <div class="modal-actions">
                <a v-if="selectedProject.demoUrl" :href="selectedProject.demoUrl" target="_blank" class="action-btn primary">
                  <i class="fas fa-external-link-alt"></i>
                  <span>Visitar Projeto</span>
                </a>
                <a v-if="selectedProject.codeUrl" :href="selectedProject.codeUrl" target="_blank" class="action-btn secondary">
                  <i class="fab fa-github"></i>
                  <span>Ver Código</span>
                </a>
              </div>
            </div>

            <div class="modal-glow"></div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script>
import Pagination from './Pagination.vue';

import imgSweetGiftfy from '../assets/img/sweetgift.png';
import imgPrevisaoDoTempo from '../assets/img/previsao-web.png';
import imgEscola from '../assets/img/escola.png';
import imgCookinUp from '../assets/img/cookin-up.jpeg';
import imgFokus from '../assets/img/fokus.png';
import imgTasklist from '../assets/img/task-list.png';
import imgCafe from '../assets/img/cafe.png';
import imgAdivinha from '../assets/img/jogonumero.png';
import imgDipemat from '../assets/img/dipemat2.jpeg';
import imgLiberaja from '../assets/img/liberaja.png';
import imgGameMemorie from '../assets/img/game-memorie.png';
import imgVieiraDias from '../assets/img/vieira-dias.png';
import imgNgStone from '../assets/img/ng-stone.png';
import gifVivaColorir from '../assets/img/gif-viva-colorir.gif';
import imgYupChat from '../assets/img/yup-chat.png';

export default {
  name: 'Projects',
  components: { Pagination },
  data() {
    return {
      activeCategory: 'all',
      currentPage: 1,
      itemsPerPage: 9,
      selectedProject: null,
      categories: [
        { id: 'all' },
        { id: 'web' },
        { id: 'institutional' },
        { id: 'tool' },
        { id: 'game' },
      ],
      projects: [
        {
          id: 15,
          title: this.$t('projects.list.15.title'),
          description: this.$t('projects.list.15.description'),
          image: imgYupChat,
          demoUrl: 'https://yup.chat',
          techs: ['Vue.js', 'Node.js', 'JavaScript'],
          category: ['web', 'app']
        },
        {
          id: 1,
          title: this.$t('projects.list.1.title'),
          description: this.$t('projects.list.1.description'),
          image: imgSweetGiftfy,
          demoUrl: 'https://sweetgiftfy.com',
          techs: ['Vue.js', 'Supabase', 'Bootstrap'],
          category: ['web']
        },
        {
          id: 14,
          title: this.$t('projects.list.14.title'),
          description: this.$t('projects.list.14.description'),
          image: imgLiberaja,
          demoUrl: 'https://liberajadespachante.com.br/',
          techs: ['Vue.js'],
          categories: ["web", "institutional"],
        },
        {
          id: 3,
          title: this.$t('projects.list.2.title'),
          description: this.$t('projects.list.2.description'),
          image: imgEscola,
          demoUrl: 'https://arvoredavidaperuibe.com.br',
          techs: ['Vue.js', 'JavaScript'],
          categories: ["web", "institutional"],
        },
        {
          id: 4,
          title: this.$t('projects.list.12.title'),
          description: this.$t('projects.list.12.description'),
          image: imgNgStone,
          demoUrl: 'https://ngstonemarmoresperuibe.com.br',
          techs: ['Vue.js', 'Node.js', 'Bootstrap'],
          categories: ["web", "institutional"],
        },
        {
          id: 5,
          title: this.$t('projects.list.5.title'),
          description: this.$t('projects.list.5.description'),
          image: imgFokus,
          demoUrl: 'https://matheusmalena.github.io/Fokus/',
          techs: [' HTML', 'CSS3', 'JavaScript'],
          category: ['tool']
        },
        {
          id: 2,
          title: this.$t('projects.list.9.title'),
          description: this.$t('projects.list.9.description'),
          image: imgDipemat,
          demoUrl: 'https://dipemat.com/',
          techs: ['Vue.js'],
          categories: ["web", "institutional"],
        },
        {
          id: 6,
          title: this.$t('projects.list.11.title'),
          description: this.$t('projects.list.11.description'),
          image: imgVieiraDias,
          demoUrl: 'https://vieira-dias-advogadas.vercel.app/',
          techs: ['Vue.js', 'Node.js', 'Blog CMS'],
          categories: ["web", "institutional"],
        },
        {
          id: 13,
          title: this.$t('projects.list.13.title'),
          description: this.$t('projects.list.13.description'),
          image: gifVivaColorir,
          demoUrl: 'https://vivacolorirbiblia.vercel.app/',
          techs: ['Vue JS', 'JavaScript'],
          category: ['web', 'institutional']
        },
        {
          id: 7,
          title: this.$t('projects.list.3.title'),
          description: this.$t('projects.list.3.description'),
          image: imgPrevisaoDoTempo,
          demoUrl: 'https://matheusmalena.github.io/AppPrevisaoDoTempo/',
          techs: ['JavaScript', 'API REST'],
          category: ['app', 'tool']
        },
        {
          id: 8,
          title: this.$t('projects.list.4.title'),
          description: this.$t('projects.list.4.description'),
          image: imgCookinUp,
          demoUrl: 'https://cookin-up-website.vercel.app/',
          techs: ['Vue.js', 'Node.js'],
          category: ['app']
        },
        {
          id: 9,
          title: this.$t('projects.list.6.title'),
          description: this.$t('projects.list.6.description'),
          image: imgTasklist,
          demoUrl: 'https://task-list-surf.vercel.app',
          techs: ['Vue.js', 'LocalStorage'],
          category: ['tool']
        },
        {
          id: 10,
          title: this.$t('projects.list.7.title'),
          description: this.$t('projects.list.7.description'),
          image: imgAdivinha,
          demoUrl: 'https://jogo-numero-secreto-voz-three.vercel.app/',
          techs: ['JavaScript', 'Web Speech API'],
          category: ['game']
        },
        {
          id: 11,
          title: this.$t('projects.list.8.title'),
          description: this.$t('projects.list.8.description'),
          image: imgGameMemorie,
          demoUrl: 'https://matheusmalena.github.io/memorie-love-game/',
          techs: ['HTML5', 'CSS3', 'JavaScript'],
          category: ['game']
        },
        {
          id: 12,
          title: this.$t('projects.list.10.title'),
          description: this.$t('projects.list.10.description'),
          image: imgCafe,
          demoUrl: 'https://matheusmalena.github.io/landing-page_cafeteria/',
          techs: ['HTML5', 'CSS3'],
          categories: ["web", "institutional"],
        },
      ]
    };
  },
  computed: {
    filteredProjects() {
      if (this.activeCategory === 'all') return this.projects;

      return this.projects.filter(project => {
        if (project.category) {
          return Array.isArray(project.category)
            ? project.category.includes(this.activeCategory)
            : project.category === this.activeCategory;
        }

        if (project.categories) {
          return project.categories.includes(this.activeCategory);
        }

        return false;
      });
    },
    paginatedProjects() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredProjects.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(this.filteredProjects.length / this.itemsPerPage);
    }
  },
  methods: {
    changeCategory(category) {
      this.activeCategory = category;
      this.currentPage = 1;
    },
    changePage(page) {
      this.currentPage = page;
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    openModal(project) {
      this.selectedProject = project;
      document.body.style.overflow = 'hidden';
    },
    closeModal() {
      this.selectedProject = null;
      document.body.style.overflow = '';
    },
    categoryLabelKey(project) {
      const category = project.category ?? project.categories;
      return Array.isArray(category) ? category[0] : category;
    },
    handleKeydown(event) {
      if (event.key === 'Escape') this.closeModal();
    }
  },
  watch: {
    filteredProjects() {
      if (this.currentPage > this.totalPages && this.totalPages > 0) {
        this.currentPage = this.totalPages;
      }
    }
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeydown);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
    document.body.style.overflow = '';
  }
};
</script>

<style scoped>
.projects-section {
  padding: 120px 5%;
  position: relative;
  overflow: hidden;
  background: var(--gradient-dark);
}

.section-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.bg-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.3;
}

.glow-1 {
  width: 500px;
  height: 500px;
  background: var(--primary);
  top: -150px;
  right: -150px;
}

.glow-2 {
  width: 400px;
  height: 400px;
  background: var(--secondary);
  bottom: -100px;
  left: -100px;
}

.bg-grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(14, 165, 233, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(14, 165, 233, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.badge {
  display: inline-block;
  background: rgba(14, 165, 233, 0.1);
  border: 1px solid rgba(14, 165, 233, 0.3);
  padding: 8px 20px;
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--primary-light);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.15rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.projects-filter {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 3rem;
}

.filter-btn {
  position: relative;
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  padding: 12px 24px;
  border-radius: var(--radius-full);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.filter-btn .btn-icon {
  display: none;
  margin-left: 8px;
}

.filter-btn:hover {
  border-color: var(--primary);
  color: var(--text-primary);
}

.filter-btn.active {
  background: var(--gradient-primary);
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 20px rgba(14, 165, 233, 0.3);
}

.filter-btn.active .btn-text {
  transform: translateX(-10px);
}

.filter-btn.active .btn-icon {
  display: inline-flex;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.project-card {
  position: relative;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.project-card:hover {
  transform: translateY(-8px);
  border-color: rgba(14, 165, 233, 0.3);
}

.card-border-glow {
  position: absolute;
  inset: 0;
  background: var(--gradient-primary);
  opacity: 0;
  filter: blur(30px);
  transition: opacity 0.4s ease;
  z-index: 0;
}

.project-card:hover .card-border-glow {
  opacity: 0.15;
}

.card-image {
  position: relative;
  aspect-ratio: 16/10;
  overflow: hidden;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .project-image {
  transform: scale(1.08);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 40%,
    rgba(3, 7, 18, 0.9) 100%
  );
  pointer-events: none;
}

.expand-hint {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(3, 7, 18, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  color: var(--text-primary);
  font-size: 0.9rem;
  opacity: 0;
  transform: scale(0.7);
  transition: all 0.3s ease;
  pointer-events: none;
}

.project-card:hover .expand-hint {
  opacity: 1;
  transform: scale(1);
}

.card-content {
  padding: 1.5rem;
  position: relative;
  z-index: 1;
}

.card-header {
  margin-bottom: 1rem;
}

.project-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.project-card:hover .project-title {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.project-description {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 1.5rem;
}

.tech-tag {
  background: rgba(14, 165, 233, 0.1);
  border: 1px solid rgba(14, 165, 233, 0.2);
  color: var(--primary-light);
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
}

.card-actions {
  display: flex;
  gap: 12px;
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.action-btn.primary {
  background: var(--gradient-primary);
  color: white;
  box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3);
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(14, 165, 233, 0.4);
}

.action-btn.secondary {
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text-primary);
}

.action-btn.secondary:hover {
  background: var(--surface-light);
  border-color: var(--primary);
  transform: translateY(-2px);
}

@media (max-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .projects-section {
    padding: 80px 5%;
  }

  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .filter-btn {
    padding: 10px 18px;
    font-size: 0.85rem;
  }
}

/* -------- PROJECT MODAL -------- */
.project-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(3, 7, 18, 0.75);
  backdrop-filter: blur(12px);
}

.project-modal {
  position: relative;
  width: 100%;
  max-width: 640px;
  max-height: 88vh;
  overflow-y: auto;
  background: var(--background-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg), 0 0 60px rgba(14, 165, 233, 0.15);
}

.modal-glow {
  position: absolute;
  inset: 0;
  border-radius: var(--radius-xl);
  background: var(--gradient-glow);
  opacity: 0.5;
  pointer-events: none;
  z-index: 0;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(3, 7, 18, 0.6);
  color: var(--text-primary);
  font-size: 1rem;
  cursor: pointer;
  z-index: 2;
  transition: all 0.3s ease;
}

.modal-close:hover {
  background: var(--gradient-primary);
  border-color: transparent;
  transform: rotate(90deg);
}

.modal-image {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
}

.modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 50%, rgba(3, 7, 18, 0.95) 100%);
}

.modal-badge {
  position: absolute;
  bottom: 16px;
  left: 24px;
  background: var(--gradient-primary);
  color: white;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 6px 16px;
  border-radius: var(--radius-full);
  box-shadow: 0 4px 15px rgba(14, 165, 233, 0.4);
}

.modal-body {
  position: relative;
  z-index: 1;
  padding: 2rem;
}

.modal-title {
  font-size: 1.75rem;
  font-weight: 800;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 1rem;
}

.modal-description {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.modal-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 2rem;
}

.modal-actions {
  display: flex;
  gap: 12px;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .project-modal,
.modal-leave-active .project-modal {
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
}

.modal-enter-from .project-modal,
.modal-leave-to .project-modal {
  transform: scale(0.9) translateY(20px);
  opacity: 0;
}

@media (max-width: 640px) {
  .modal-body {
    padding: 1.5rem;
  }

  .modal-title {
    font-size: 1.4rem;
  }

  .modal-actions {
    flex-direction: column;
  }
}
</style>
