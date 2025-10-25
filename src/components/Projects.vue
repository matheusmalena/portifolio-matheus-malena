<template>
  <section class="projects-section" id="projects" aria-label="Meus projetos desenvolvidos">
    <div class="container">
      <!-- Cabeçalho -->
      <header class="section-header" data-aos="fade-up">
        <h2 class="section-title" v-html="$t('projects.section_title')"></h2>
        <p class="section-subtitle">{{ $t('projects.section_subtitle') }}</p>
      </header>

      <!-- Filtros -->
      <nav class="projects-filter" data-aos="fade-up" data-aos-delay="100">
        <button v-for="category in categories" :key="category.id" @click="changeCategory(category.id)"
          :class="{ active: activeCategory === category.id }" class="filter-btn">
          {{ $t(`projects.categories.${category.id}`) }}
        </button>
      </nav>

      <!-- Grade de projetos -->
      <div class="projects-grid">
        <article v-for="(project, index) in paginatedProjects" :key="project.id" class="project-card" data-aos="fade-up"
          :data-aos-delay="100 * (index % 3)">
          <div class="project-image-wrapper">
            <img :src="project.image" :alt="project.title" class="project-image" />

            <div class="project-hover-content">
              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>

              <div class="project-links">
                <a v-if="project.demoUrl" :href="project.demoUrl" target="_blank" class="project-link demo"
                  aria-label="Ver demonstração">
                  <i class="fas fa-external-link-alt"></i> {{ $t('projects.visit_demo') }}
                </a>

                <a v-if="project.codeUrl" :href="project.codeUrl" target="_blank" class="project-link code"
                  aria-label="Ver código fonte">
                  <i class="fab fa-github"></i> {{ $t('projects.view_code') }}
                </a>
              </div>
            </div>
          </div>

          <div class="project-techs">
            <span v-for="tech in project.techs" :key="tech" class="tech-tag">
              {{ tech }}
            </span>
          </div>
        </article>
      </div>

      <!-- Paginação -->
      <Pagination v-if="filteredProjects.length > itemsPerPage" :current-page="currentPage" :total-pages="totalPages"
        @page-changed="changePage" />
    </div>
  </section>
</template>

<script>
import Pagination from './Pagination.vue';

// Imagens
import imgSweetGiftfy from '../assets/img/sweetgift.png';
import imgPrevisaoDoTempo from '../assets/img/previsao-web.png';
import imgEscola from '../assets/img/escola.png';
import imgCookinUp from '../assets/img/cookin-up.jpeg';
import imgFokus from '../assets/img/fokus.png';
import imgTasklist from '../assets/img/task-list.png';
import imgCafe from '../assets/img/cafe.png';
import imgAdivinha from '../assets/img/jogonumero.png';
import imgDipemat from '../assets/img/dipemat2.jpeg';
import imgGameMemorie from '../assets/img/game-memorie.png';
import imgVieiraDias from '../assets/img/vieira-dias.png';
import imgNgStone from '../assets/img/ng-stone.png';

export default {
  name: 'Projects',
  components: { Pagination },
  data() {
    return {
      activeCategory: 'all',
      currentPage: 1,
      itemsPerPage: 9,
      categories: [
        { id: 'all' },
        { id: 'web' },
        { id: 'institutional' },
        { id: 'app' },
        { id: 'tool' },
        { id: 'game' },
      ],
      projects: [
        {
          id: 1,
          title: this.$t('projects.list.1.title'),
          description: this.$t('projects.list.1.description'),
          image: imgSweetGiftfy,
          demoUrl: 'https://sweetgiftfy.com',
          techs: ['Vue.js', 'Supabase', 'CSS3'],
          category: ['web']
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
          techs: ['Vue.js', 'Node.js', 'Blog CMS'],
          categories: ["web", "institutional"],
        },
        {
          id: 5,
          title: this.$t('projects.list.5.title'),
          description: this.$t('projects.list.5.description'),
          image: imgFokus,
          demoUrl: 'https://matheusmalena.github.io/Fokus/',
          techs: ['JavaScript', 'CSS3'],
          category: ['tool']
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
          id: 7,
          title: this.$t('projects.list.3.title'),
          description: this.$t('projects.list.3.description'),
          image: imgPrevisaoDoTempo,
          demoUrl: 'https://matheusmalena.github.io/AppPrevisaoDoTempo/',
          techs: ['JavaScript', 'API REST'],
          category: ['app']
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
        // se o projeto tiver "category" (mesmo que array)
        if (project.category) {
          return Array.isArray(project.category)
            ? project.category.includes(this.activeCategory)
            : project.category === this.activeCategory;
        }

        // se o projeto tiver "categories"
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
  }
},
watch: {
  filteredProjects() {
    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }
  }
}
};
</script>

<style scoped>
.projects-section {
  padding: 6rem 0;
  background: var(--color-black);
  color: white;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Header Section */
.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
}

.title-text {
  color: rgba(255, 255, 255, 0.9);
}

.highlight-wrapper {
  position: relative;
  display: inline-block;
}

.highlight {
  color: var(--accent-color);
  position: relative;
  z-index: 2;
}

.highlight-accent {
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
  height: 12px;
  background: rgba(74, 205, 240, 0.3);
  z-index: 1;
  border-radius: 4px;
  transform: rotate(-1deg);
}

.section-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Filtros */
.projects-filter {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 3rem;
}

.filter-btn {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  border: none;
  padding: 0.6rem 1.4rem;
  border-radius: 30px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.filter-btn.active {
  background: var(--accent-color);
  color: white;
  box-shadow: 0 4px 15px rgba(74, 205, 240, 0.3);
}

/* Grid de Projetos */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.project-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
}

.project-image-wrapper {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .project-image {
  transform: scale(1.05);
}

.project-hover-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem 1.5rem;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.5) 100%);
  transform: translateY(100%);
  transition: transform 0.4s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.project-card:hover .project-hover-content {
  transform: translateY(0);
}

.project-tags {
  display: flex;
  gap: 0.6rem;
  margin-bottom: 0.8rem;
}

.project-tag {
  background: var(--accent-color);
  color: white;
  font-size: 0.7rem;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-weight: 600;
}

.project-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: white;
}

.project-description {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.project-links {
  display: flex;
  gap: 1rem;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.2rem;
  border-radius: 30px;
  font-size: 0.8rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.project-link.demo {
  background: white;
  color: #0f172a;
}

.project-link.demo:hover {
  background: #e0e0e0;
}

.project-link.code {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.project-link.code:hover {
  background: rgba(255, 255, 255, 0.2);
}

.project-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  padding: 1.2rem 1.5rem;
  background: rgba(255, 255, 255, 0.03);
}

.tech-tag {
  font-size: 0.75rem;
  color: var(--accent-color);
  background: rgba(74, 205, 240, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
}

/* Responsividade */
@media (max-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2.2rem;
  }

  .section-subtitle {
    font-size: 1rem;
  }

  .projects-filter {
    gap: 0.6rem;
  }

  .filter-btn {
    padding: 0.5rem 1.2rem;
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .projects-section {
    padding: 4rem 0;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .project-hover-content {
    padding: 1.5rem 1rem;
  }

  .project-title {
    font-size: 1.2rem;
  }

  .project-description {
    font-size: 0.85rem;
    margin-bottom: 1rem;
  }

  .project-link {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
}
</style>