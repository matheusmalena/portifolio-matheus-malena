<template>
  <section class="projects-section" id="projects" aria-label="Meus projetos desenvolvidos">
    <div class="container">
      <!-- Header com animação -->
      <div class="section-header" data-aos="fade-up">
        <h2 class="section-title">
          <span class="title-text">Meus <span class="highlight-wrapper">
            <span class="highlight">Projetos</span>
            <span class="highlight-accent"></span>
          </span></span>
        </h2>
        <p class="section-subtitle">Trabalhos que demonstram minha evolução como desenvolvedor</p>
      </div>

      <!-- Filtros -->
      <div class="projects-filter" data-aos="fade-up" data-aos-delay="100">
        <button 
          v-for="category in categories" 
          :key="category.id"
          @click="activeCategory = category.id"
          :class="{ active: activeCategory === category.id }"
          class="filter-btn"
        >
          {{ category.name }}
        </button>
      </div>

      <!-- Grid de projetos -->
      <div class="projects-grid">
        <div 
          v-for="(project, index) in filteredProjects" 
          :key="project.id"
          class="project-card"
          data-aos="fade-up"
          :data-aos-delay="100 * (index % 3)"
        >
          <div class="project-image-wrapper">
            <img :src="project.image" :alt="project.title" class="project-image" />
            <div class="project-hover-content">
              <div class="project-tags">
                <span v-for="tag in project.tags" :key="tag" class="project-tag">
                  {{ tag }}
                </span>
              </div>
              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>
              <div class="project-links">
                <a 
                  v-if="project.demoUrl" 
                  :href="project.demoUrl" 
                  target="_blank" 
                  class="project-link demo"
                  aria-label="Ver demonstração"
                >
                  <i class="fas fa-external-link-alt"></i> Visitar
                </a>
                <a 
                  v-if="project.codeUrl" 
                  :href="project.codeUrl" 
                  target="_blank" 
                  class="project-link code"
                  aria-label="Ver código fonte"
                >
                  <i class="fab fa-github"></i> Código
                </a>
              </div>
            </div>
          </div>
          <div class="project-techs">
            <span v-for="tech in project.techs" :key="tech" class="tech-tag">
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import imgSweetGiftfy from '../assets/img/sweetgift.png';
import imgPrevisaoDoTempo from '../assets/img/previsao-web.png';
import imgEscola from '../assets/img/escola.png';
import imgCookinUp from '../assets/img/cookin-up.jpeg';
import imgFokus from '../assets/img/fokus.png';
import imgTasklist from '../assets/img/task-list.png';
import imgCafe from '../assets/img/cafe.png';
import imgAdivinha from '../assets/img/jogonumero.png';

export default {
  name: 'Projects',
  data() {
    return {
      activeCategory: 'all',
      categories: [
        { id: 'all', name: 'Todos' },
        { id: 'web', name: 'Websites' },
        { id: 'app', name: 'Aplicativos' },
        { id: 'tool', name: 'Ferramentas' },
        { id: 'game', name: 'Jogos' }
      ],
      projects: [
        {
          id: 1,
          title: 'Sweet Giftfy',
          description: 'Sites personalizados para presentear alguém especial com fotos, música e mensagens.',
          image: imgSweetGiftfy,
          demoUrl: 'https://sweetgiftfy.com',
          techs: ['Vue.js', 'Supabase', 'CSS3'],
          category: 'web'
        },
        {
          id: 2,
          title: 'Escola Árvore da Vida',
          description: 'Website profissional para instituição de ensino com informações acadêmicas.',
          image: imgEscola,
          demoUrl: 'https://arvoredavidaperuibe.com.br',
          techs: ['Vue.js', 'JavaScript'],
          category: 'web'
        },
        {
          id: 3,
          title: 'Previsão do Tempo',
          description: 'Aplicativo que exibe dados meteorológicos em tempo real usando API da OpenWeather.',
          image: imgPrevisaoDoTempo,
          demoUrl: 'https://matheusmalena.github.io/AppPrevisaoDoTempo/',
          techs: ['JavaScript', 'API REST'],
          category: 'app'
        },
        {
          id: 4,
          title: 'Cookin Up',
          description: 'Plataforma para explorar receitas com base nos ingredientes disponíveis.',
          image: imgCookinUp,
          demoUrl: 'https://cookin-up-website.vercel.app/',
          techs: ['Vue.js', 'Node.js'],
          category: 'app'
        },
        {
          id: 5,
          title: 'Fokus Timer',
          description: 'Sistema de temporizador Pomodoro para melhorar a produtividade.',
          image: imgFokus,
          demoUrl: 'https://matheusmalena.github.io/Fokus/',
          techs: ['JavaScript', 'CSS3'],
          category: 'tool'
        },
        {
          id: 6,
          title: 'Task List',
          description: 'Aplicativo de gerenciamento de tarefas com CRUD completo.',
          image: imgTasklist,
          demoUrl: 'https://task-list-surf.vercel.app',
          techs: ['Vue.js', 'LocalStorage'],
          category: 'tool'
        },
        {
          id: 7,
          title: 'Adivinha Número',
          description: 'Jogo de adivinhação com reconhecimento de voz.',
          image: imgAdivinha,
          demoUrl: 'https://jogo-numero-secreto-voz-three.vercel.app/',
          techs: ['JavaScript', 'Web Speech API'],
          category: 'game'
        },
        {
          id: 8,
          title: 'Cafeteria Moderna',
          description: 'Landing page para cafeteria com design elegante.',
          image: imgCafe,
          demoUrl: 'https://matheusmalena.github.io/landing-page_cafeteria/',
          techs: ['HTML5', 'CSS3'],
          category: 'web'
        }
      ]
    }
  },
  computed: {
    filteredProjects() {
      if (this.activeCategory === 'all') return this.projects;
      return this.projects.filter(project => project.category === this.activeCategory);
    }
  }
}
</script>

<style scoped>
.projects-section {
  padding: 6rem 0;
  background: black;
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
  background: linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 100%);
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
  padding: 0.4rem 1.2rem;
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