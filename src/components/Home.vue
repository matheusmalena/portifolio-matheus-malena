<template>
  <div class="home">
    <section id="home" class="hero-section">
      <div class="max-width">
        <div class="home-content">

          <!-- Textos principais -->
          <div class="text-content">
            <div class="greeting-text">Olá, eu sou</div>
            <h1 class="name-text">Matheus Malena</h1>
            <div class="profession-text">
              <span ref="typingRef" class="profession-typing"></span>
              <span class="typing-cursor"></span>
            </div>
            
            <!-- Botão de ação principal -->
            <a href="#contact" class="cta-button">
              Vamos conversar
              <i class="fas fa-arrow-right"></i>
            </a>
          </div>

          <div class="profile-container">
            <div class="profile-image-wrapper">
              <img src="../assets/img/perfil.jpeg" alt="Matheus Malena" class="profile-image">
              <div class="profile-glow"></div>
            </div>
          </div>
        </div>

        <!-- Redes sociais com hover effects -->
        <div class="social-media">
          <a href="https://github.com/matheusmalena" target="_blank" class="social-link" aria-label="GitHub">
            <i class="fab fa-github"></i>
            <span class="social-tooltip">GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/matheusmalena" target="_blank" class="social-link" aria-label="LinkedIn">
            <i class="fab fa-linkedin-in"></i>
            <span class="social-tooltip">LinkedIn</span>
          </a>
          <a href="https://www.instagram.com/dev_malena" target="_blank" class="social-link" aria-label="Instagram">
            <i class="fab fa-instagram"></i>
            <span class="social-tooltip">Instagram</span>
          </a>
        </div>
      </div>
      
      <!-- Elemento decorativo -->
      <div class="hero-decoration"></div>
    </section>

    <Services />
    <About />
    <Projects />
    <Skills />
    <Certificates/>
    <Contact />
  </div>
</template>

<script>
import Typed from 'typed.js';
import Contact from './Contact.vue';
import Services from './Services.vue';
import About from './About.vue';
import Projects from './Projects.vue';
import Skills from './Skills.vue';
import Certificates from './Certificates.vue';

export default {
  name: 'Home',
  components: {
    Contact,
    Services,
    Projects,
    About,
    Certificates,
    Skills
  },
  mounted() {
    const options = {
      strings: [
        'Desenvolvedor Full Stack',
        'Analista de Sistemas',
        'Gestor de tráfego',
        'Surfista nas horas vagas',
      ],
      typeSpeed: 100,
      backSpeed: 70,
      loop: true,
    };

    this.typed = new Typed(this.$refs.typingRef, options);
  },
  beforeUnmount() {
    if (this.typed) {
      this.typed.destroy();
    }
  },
};
</script>


<style scoped>
/* ============= ESTILOS GERAIS ============= */
.hero-section {
  position: relative;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;
  overflow: hidden;
  padding: 0 2rem;
}

.max-width {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

/* ============= CONTEÚDO PRINCIPAL ============= */
.home-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  flex-wrap: wrap;
}

.profile-container {
  flex: 1;
  min-width: 300px;
  display: flex;
  justify-content: center;
}

.profile-image-wrapper {
  position: relative;
  width: 350px;
  height: 350px;
  border-radius: 50%;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 0 30px rgba(76, 201, 240, 0.3);
  position: relative;
  z-index: 2;
  transition: all 0.5s ease;
}

.profile-image:hover {
  transform: scale(1.15);
  box-shadow: 0 0 50px rgba(76, 201, 240, 0.5);
}
.text-content {
  flex: 1;
  min-width: 300px;
  color: var(--text-light);
}

.greeting-text {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--accent-color);
  font-weight: 400;
}

.name-text {
  font-size: 4rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
  color: var(--color-white);
}

.profession-text {
  font-size: 2rem;
  margin: 1.5rem 0 2.5rem;
  min-height: 3rem;
  display: flex;
  align-items: center;
}

.profession-typing {
  background: var(--gradient-blue);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 700;
}

.typing-cursor {
  margin-left: 0.5rem;
  color: var(--accent-color);
  animation: blink 1s infinite;
}

/* ============= BOTÃO CTA ============= */
.cta-button {
  display: inline-flex;
  align-items: center;
  padding: 0.8rem 2rem;
  color: white;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(87, 115, 240, 0.3);
  border: none;
  cursor: pointer;
}

.cta-button i {
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(67, 97, 238, 0.4);
}

.cta-button:hover i {
  transform: translateX(3px);
}

/* ============= REDES SOCIAIS ============= */
.social-media {
  display: flex;
  gap: 1.5rem;
  margin-top: 3rem;
  justify-content: center;
  text-decoration: none;
}

.social-link {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  text-decoration: none;
  position: relative;
}

.social-link:hover {
  color: var(--color-purple);
  transform: translateY(-5px);
}

.social-tooltip {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 5px;
  font-size: 0.8rem;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.social-link:hover .social-tooltip {
  opacity: 1;
  visibility: visible;
  bottom: -35px;
}

/* ============= ELEMENTO DECORATIVO ============= */
.hero-decoration {
  position: absolute;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(76, 201, 240, 0.1) 0%, rgba(76, 201, 240, 0) 70%);
  border-radius: 50%;
  top: -200px;
  right: -200px;
  z-index: 1;
}

/* ============= ANIMAÇÕES ============= */
@keyframes pulse {
  0% {
    transform: scale(0.95);
    opacity: 0.5;
  }
  100% {
    transform: scale(1.1);
    opacity: 0.3;
  }
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

/* ============= RESPONSIVIDADE ============= */
@media (max-width: 992px) {
  .home-content {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
  
  .profile-image-wrapper {
    width: 280px;
    height: 280px;
  }
  
  .name-text {
    font-size: 3rem;
  }
  
  .profession-text {
    font-size: 1.5rem;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .name-text {
    font-size: 2.5rem;
  }
  
  .greeting-text {
    font-size: 1.2rem;
  }
  
  .cta-button {
    padding: 0.7rem 1.5rem;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .profile-image-wrapper {
    width: 220px;
    height: 220px;
  }
  
  .name-text {
    font-size: 2rem;
  }
  
  .profession-text {
    font-size: 1.2rem;
    margin: 1rem 0 2rem;
  }
  
  .social-media {
    gap: 1rem;
  }
  
  .social-link {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
}
</style>