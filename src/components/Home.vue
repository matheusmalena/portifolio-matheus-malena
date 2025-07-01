<template>
  <div class="home">
    <section id="home" class="hero-section">
      <!-- Partículas animadas -->
      <div class="particles" id="particles-js"></div>
      
      <!-- Gradiente animado -->
      <div class="animated-gradient"></div>
      
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
    </section>

    <Services />
    <About />
    <Skills />
    <Projects />
    <Certificates/>
    <Timeline />
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
import Timeline from './Timeline.vue';

export default {
  name: 'Home',
  components: {
    Contact,
    Services,
    Projects,
    About,
    Certificates,
    Timeline,
    Skills
  },
  mounted() {
    // Configuração do Typed.js
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

    // Carrega partículas.js se estiver disponível
    if (typeof window !== 'undefined' && window.particlesJS) {
      this.initParticles();
    } else {
      // Carrega o script dinamicamente se não estiver disponível
      const script = document.createElement('script');
      script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
      script.onload = this.initParticles;
      document.head.appendChild(script);
    }
  },
  methods: {
    initParticles() {
      particlesJS('particles-js', {
        "particles": {
          "number": {
            "value": 80,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": "#4cc9f0"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            },
            "polygon": {
              "nb_sides": 5
            }
          },
          "opacity": {
            "value": 0.5,
            "random": true,
            "anim": {
              "enable": true,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 3,
            "random": true,
            "anim": {
              "enable": true,
              "speed": 2,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#4cc9f0",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 1,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": true,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "grab"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 140,
              "line_linked": {
                "opacity": 1
              }
            },
            "push": {
              "particles_nb": 4
            }
          }
        },
        "retina_detect": true
      });
    }
  },
  beforeUnmount() {
    if (this.typed) {
      this.typed.destroy();
    }
    // Limpa as partículas se existirem
    if (window.pJSDom && window.pJSDom.length > 0) {
      window.pJSDom[0].pJS.fn.vendors.destroypJS();
      window.pJSDom = [];
    }
  },
};
</script>

<style scoped>
/* ============= ESTILOS GERAIS ============= */
.home {
  overflow-x: hidden; /* Impede vazamento horizontal */
}

.hero-section {
  position: relative;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: white;
  width: 100%;
  overflow: hidden;
}

.max-width {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 3;
  box-sizing: border-box; /* Garante que padding não some à largura */
}

/* ============= ANIMAÇÕES DE FUNDO ============= */
.particles {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}

.animated-gradient {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
  opacity: 0.1;
  z-index: 0;
}

@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* ============= CONTEÚDO PRINCIPAL ============= */
.home-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  flex-wrap: wrap;
  width: 100%;
}

.profile-container {
  flex: 1;
  min-width: 300px;
  display: flex;
  justify-content: center;
  position: relative;
}

.profile-image-wrapper {
  position: relative;
  width: 350px;
  height: 350px;
  border-radius: 50%;
  max-width: 100%;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 0 30px rgba(76, 201, 240, 0.5);
  position: relative;
  z-index: 2;
  transition: all 0.5s ease;
  border: 3px solid rgba(76, 201, 240, 0.3);
}

.profile-image:hover {
  transform: scale(1.05);
  box-shadow: 0 0 50px rgba(76, 201, 240, 0.8);
}

.profile-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(76, 201, 240, 0.4) 0%, rgba(76, 201, 240, 0) 70%);
  top: 0;
  left: 0;
  animation: pulse-glow 4s infinite alternate;
}

@keyframes pulse-glow {
  0% {
    transform: scale(0.95);
    opacity: 0.6;
  }
  100% {
    transform: scale(1.1);
    opacity: 0.3;
  }
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
  text-shadow: 0 0 10px rgba(76, 201, 240, 0.5);
}

.name-text {
  font-size: clamp(2.5rem, 5vw, 4rem); /* Tamanho responsivo */
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
  color: white;
  text-shadow: 0 0 20px rgba(76, 201, 240, 0.5);
  background: linear-gradient(90deg, #4cc9f0, #4895ef);
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 3s linear infinite;
}

@keyframes shine {
  to {
    background-position: 200% center;
  }
}

.profession-text {
  font-size: clamp(1.5rem, 3vw, 2rem); /* Tamanho responsivo */
  margin: 1.5rem 0 2.5rem;
  min-height: 3rem;
  display: flex;
  align-items: center;
}

.profession-typing {
  background: linear-gradient(90deg, #4cc9f0, #f72585);
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
  background: linear-gradient(45deg, #4cc9f0, #4895ef);
  color: white;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(76, 201, 240, 0.4);
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #4895ef, #4cc9f0);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cta-button:hover::before {
  opacity: 1;
}

.cta-button i {
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(76, 201, 240, 0.6);
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
  flex-wrap: wrap;
}

.social-link {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  color: white;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  text-decoration: none;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.social-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-5px);
  color: #4cc9f0;
  box-shadow: 0 5px 15px rgba(76, 201, 240, 0.3);
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
  backdrop-filter: blur(5px);
}

.social-link:hover .social-tooltip {
  opacity: 1;
  visibility: visible;
  bottom: -35px;
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
  
  .profession-text {
    justify-content: center;
  }
}

@media (max-width: 768px) {
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
  
  .profession-text {
    margin: 1rem 0 2rem;
    flex-direction: column;
  }
  
  .social-media {
    gap: 1rem;
  }
  
  .social-link {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
  
  .max-width {
    padding: 0 1.5rem;
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
</style>