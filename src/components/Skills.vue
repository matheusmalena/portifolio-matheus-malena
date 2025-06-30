<template>
  <section class="skills-section" id="skills" aria-label="Minhas habilidades técnicas e experiência">
    <div class="container">
      <div class="section-header" data-aos="fade-up">
        <h2 class="section-title">Minhas <span class="highlight">Habilidades</span></h2>
        <p class="section-subtitle">Tecnologias que utilizo com frequência no desenvolvimento</p>
      </div>

      <div class="skills-grid">
        <!-- Card Sobre -->
        <div class="about-card">
          <h3 class="about-title">Minha Jornada <span class="accent-line"></span></h3>
          <div class="about-content">
            <p>
              Sou formado em Análise e Desenvolvimento de Sistemas e cursei Jogos Digitais na ETEC. 
              Me especializei como Desenvolvedor Full-Stack, com foco em interfaces modernas, APIs eficientes 
              e integração com banco de dados.
            </p>

            <div class="experience-item">
              <div class="experience-icon">
                <i class="fas fa-laptop-code"></i>
              </div>
              <div class="experience-content">
                <h4>Front-end</h4>
                <p>
                  Vue.js, JavaScript, HTML5, CSS3, Bootstrap e Tailwind para criar experiências responsivas e intuitivas.
                </p>
              </div>
            </div>

            <div class="experience-item">
              <div class="experience-icon">
                <i class="fas fa-server"></i>
              </div>
              <div class="experience-content">
                <h4>Back-end</h4>
                <p>
                  PHP e Node.js para APIs REST, CRUD e integrações com banco de dados.
                </p>
              </div>
            </div>

            <div class="experience-item">
              <div class="experience-icon">
                <i class="fas fa-database"></i>
              </div>
              <div class="experience-content">
                <h4>Banco de Dados</h4>
                <p>
                  Consultas, modelagem e análise de logs em PostgreSQL.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Card Skills -->
        <div class="skills-card">
          <h3 class="skills-category">Linguagens & Ferramentas</h3>
          <div class="icons-container">
            <img v-for="icon in icons" :key="icon.alt" :src="icon.src" :alt="icon.alt" class="icon" />
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
      icons: [
        { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original-wordmark.svg', alt: 'HTML' },
        { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original-wordmark.svg', alt: 'CSS' },
        { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-plain.svg', alt: 'JavaScript' },
        { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original-wordmark.svg', alt: 'Vue.js' },
        { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg', alt: 'PHP' },
        { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg', alt: 'Node.js' },
        { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original-wordmark.svg', alt: 'Bootstrap' },
        { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original-wordmark.svg', alt: 'Git' },
        { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original-wordmark.svg', alt: 'PostgreSQL' },
        { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg', alt: 'NPM' },
        { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg', alt: 'Postman' },
        { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', alt: 'TypeScript' },
        { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg', alt: 'VS Code' },
        { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg', alt: 'Linux' },
        { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg', alt: 'Figma' },
      ]
    }
  }
}
</script>

<style scoped>
.skills-section {
  padding: 6rem 0;
  background: var(--gradient-blue);
  color: var(--color-white);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* HEADER */
.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
}

.highlight {
  color: var(--accent-color);
}

.section-subtitle {
  font-size: 1.1rem;
  color: var(--color-gray);
  margin-top: 0.5rem;
}

/* LAYOUT */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 2.5rem;
}

/* ABOUT */
.about-card, .skills-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  transition: 0.3s ease;
}

.about-card:hover, .skills-card:hover {
  transform: translateY(-5px);
}

.about-title {
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
  position: relative;
}

.accent-line {
  display: block;
  width: 50px;
  height: 3px;
  background: var(--accent-color);
  margin-top: 6px;
  border-radius: 2px;
}

.about-content p {
  margin-bottom: 1.5rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.85);
}

/* EXPERIÊNCIA */
.experience-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.experience-icon {
  font-size: 1.4rem;
  color: var(--accent-color);
}

.experience-content h4 {
  margin-bottom: 0.4rem;
  font-size: 1.1rem;
  font-weight: 600;
}

.experience-content p {
  margin: 0;
  font-size: 0.95rem;
  color: #f0f0f0;
}

/* ICONS */
.skills-category {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--accent-color);
  margin-bottom: 1rem;
}

.icons-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
  gap: 20px;
  justify-items: center;
}

.icon {
  width: 70px;
  height: 70px;
  object-fit: contain;
  border-radius: 12px;
  background: white;
  padding: 6px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.icon:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 14px rgba(0,0,0,0.2);
}

/* RESPONSIVO */
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }

  .about-title {
    font-size: 1.3rem;
  }

  .skills-category {
    font-size: 1.1rem;
  }

  .icon {
    width: 60px;
    height: 60px;
  }
}
</style>
