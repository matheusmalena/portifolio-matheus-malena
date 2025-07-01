<template>
  <section class="skills-section" id="skills" aria-label="Minhas habilidades técnicas">
    <div class="container">
      <!-- Header com animação -->
      <div class="section-header" data-aos="fade-up">
        <h2 class="section-title">
          <span class="title-text">Minhas</span>
          <span class="highlight-wrapper">
            <span class="highlight">Habilidades</span>
            <span class="highlight-accent"></span>
          </span>
        </h2>
        <p class="section-subtitle">Tecnologias que domino e utilizo diariamente</p>
      </div>

      <div class="skills-grid">
        <!-- Card Sobre com efeito de vidro -->
        <div class="about-card" data-aos="fade-right">
          
          <div class="about-content">
            <p class="about-description">
              Formado em Análise e Desenvolvimento de Sistemas com especialização em desenvolvimento Full-Stack. 
              Combinando design intuitivo com arquitetura robusta para criar soluções completas e escaláveis.
            </p>

            <div class="experience-list">
              <div 
                v-for="(item, index) in experienceItems" 
                :key="index" 
                class="experience-item"
                data-aos="fade-up"
                :data-aos-delay="100 * index"
              >
                <div class="experience-icon">
                  <i :class="item.icon"></i>
                </div>
                <div class="experience-content">
                  <h4>{{ item.title }}</h4>
                  <p>{{ item.description }}</p>
                  <div class="tech-tags">
                    <span v-for="(tag, tagIndex) in item.tags" :key="tagIndex" class="tech-tag">
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Card Skills com animação -->
        <div class="skills-card" data-aos="fade-left">
          <div class="skills-header">
            <h3 class="skills-category">Tecnologias & Ferramentas</h3>
            <div class="skills-filter">
              <button 
                v-for="category in skillCategories" 
                :key="category.id"
                @click="activeCategory = category.id"
                :class="{ active: activeCategory === category.id }"
                class="filter-btn"
              >
                {{ category.name }}
              </button>
            </div>
          </div>
          
          <div class="icons-container">
            <div 
              v-for="(icon, index) in filteredIcons" 
              :key="icon.alt" 
              class="icon-wrapper"
              data-aos="zoom-in"
              :data-aos-delay="50 * index"
            >
              <img :src="icon.src" :alt="icon.alt" class="icon" />
              <span class="icon-tooltip">{{ icon.alt }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Skills',
  data() {
    return {
      activeCategory: 'all',
      experienceItems: [
        {
          icon: 'fas fa-laptop-code',
          title: 'Front-end',
          description: 'Desenvolvimento de interfaces modernas, responsivas e acessíveis.',
          tags: ['Vue.js', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind', 'Bootstrap']
        },
        {
          icon: 'fas fa-server',
          title: 'Back-end',
          description: 'Construção de APIs robustas e sistemas escaláveis.',
          tags: ['Node.js', 'PHP', 'Express', 'REST APIs', 'Microserviços']
        },
        {
          icon: 'fas fa-database',
          title: 'Banco de Dados',
          description: 'Modelagem e otimização de estruturas de dados eficientes.',
          tags: ['PostgreSQL','MongoDB', 'Firebase']
        },
      ],
      skillCategories: [
        { id: 'all', name: 'Todas' },
        { id: 'frontend', name: 'Front-end' },
        { id: 'backend', name: 'Back-end' },
        { id: 'tools', name: 'Ferramentas' }
      ],
      icons: [
        { 
          src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original-wordmark.svg', 
          alt: 'Vue.js', 
          categories: ['frontend'] 
        },
        { 
          src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', 
          alt: 'JavaScript', 
          categories: ['frontend', 'backend'] 
        },
        { 
          src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', 
          alt: 'TypeScript', 
          categories: ['frontend', 'backend'] 
        },
        { 
          src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original-wordmark.svg', 
          alt: 'HTML5', 
          categories: ['frontend'] 
        },
        { 
          src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original-wordmark.svg', 
          alt: 'CSS3', 
          categories: ['frontend'] 
        },
        { 
          src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original-wordmark.svg', 
          alt: 'Tailwind CSS', 
          categories: ['frontend'] 
        },
        { 
          src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original-wordmark.svg', 
          alt: 'Bootstrap', 
          categories: ['frontend'] 
        },
        { 
          src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg', 
          alt: 'Node.js', 
          categories: ['backend'] 
        },
        { 
          src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original-wordmark.svg', 
          alt: 'Express.js', 
          categories: ['backend'] 
        },
        { 
          src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg', 
          alt: 'PHP', 
          categories: ['backend'] 
        },
        { 
          src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original-wordmark.svg', 
          alt: 'PostgreSQL', 
          categories: ['backend'] 
        },
        { 
          src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original-wordmark.svg', 
          alt: 'MongoDB', 
          categories: ['backend'] 
        },
        { 
          src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original-wordmark.svg', 
          alt: 'Git', 
          categories: ['tools'] 
        },
        { 
          src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original-wordmark.svg', 
          alt: 'Docker', 
          categories: ['tools'] 
        },
        { 
          src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original-wordmark.svg', 
          alt: 'VS Code', 
          categories: ['tools'] 
        },
        { 
          src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg', 
          alt: 'Figma', 
          categories: ['tools'] 
        }
      ]
    }
  },
  computed: {
    filteredIcons() {
      if (this.activeCategory === 'all') return this.icons;
      return this.icons.filter(icon => 
        icon.categories.includes(this.activeCategory)
      );
    }
  }
}
</script>

<style scoped>
.skills-section {
  padding: 8rem 0;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
}

/* Header Section */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
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

/* Grid Layout */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;
}

/* About Card */
.about-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2.5rem;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.about-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}

.card-header {
  margin-bottom: 2rem;
}

.about-title {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
  position: relative;
  display: inline-block;
}

.accent-line {
  width: 60px;
  height: 4px;
  background: var(--accent-color);
  border-radius: 2px;
  margin-top: 0.5rem;
}

.about-description {
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.8;
  margin-bottom: 2rem;
  font-size: 1.05rem;
}

/* Experience List */
.experience-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.experience-item {
  display: flex;
  gap: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 1.5rem;
  transition: transform 0.3s ease, background 0.3s ease;
}

.experience-item:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateX(5px);
}

.experience-icon {
  font-size: 1.6rem;
  color: var(--accent-color);
  min-width: 40px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 4px;
}

.experience-content {
  flex: 1;
}

.experience-content h4 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: white;
}

.experience-content p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 0.8rem;
  font-size: 0.95rem;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background: rgba(74, 205, 240, 0.15);
  color: var(--accent-color);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Skills Card */
.skills-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2.5rem;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.skills-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}

.skills-header {
  margin-bottom: 2rem;
}

.skills-category {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: white;
}

.skills-filter {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.filter-btn {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.filter-btn.active {
  background: var(--accent-color);
  color: white;
}

/* Icons Grid */
.icons-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 1.5rem;
}

.icon-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1/1;
}

.icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 1rem;
  background: rgba(250, 250, 250, 0.1);
  border-radius: 16px;
  transition: all 0.3s ease;
  filter: grayscale(20%);
}

.icon:hover {
  transform: scale(1.1);
  filter: grayscale(0%);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.icon-tooltip {
  position: absolute;
  bottom: -30px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  font-size: 0.8rem;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.icon-wrapper:hover .icon-tooltip {
  opacity: 1;
  visibility: visible;
  bottom: -35px;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2.2rem;
  }
  
  .about-card, .skills-card {
    padding: 1.8rem;
  }
  
  .icons-container {
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.8rem;
  }
  
  .section-subtitle {
    font-size: 1rem;
  }
  
  .about-title, .skills-category {
    font-size: 1.4rem;
  }
  
  .experience-item {
    flex-direction: column;
    gap: 1rem;
  }
  
  .icons-container {
    grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
    gap: 1rem;
  }
}
</style>