<template>
  <div class="home">
    <!-- Seção Hero com efeitos 3D e glassmorphism -->
    <section id="home" class="hero-section">
      <!-- Efeito de partículas melhorado -->
      <div class="particles" id="particles-js"></div>

      <!-- Efeito de gradiente dinâmico -->
      <div class="dynamic-gradient"></div>

      <!-- Efeito de vidro -->
      <div class="glass-effect"></div>

      <div class="max-width">
        <div class="home-content">
          <!-- Conteúdo de texto com animações refinadas -->
          <div class="text-content">
            <div class="greeting-text">
              <span class="greeting-highlight">{{ $t("home.greeting") }}</span>
            </div>
            <h1 class="name-text">
              <span class="name-gradient">Matheus Malena</span>
            </h1>
            <div class="profession-text">
              <span ref="typingRef" class="profession-typing"></span>
              <span class="typing-cursor"></span>
            </div>

            <!-- Botões de ação -->
            <div class="action-buttons">
              <a href="#contact" class="cta-button neon-button">
                {{ $t("home.cta_button") }}
                <i class="fas fa-arrow-right arrow-icon"></i>
              </a>
              <a href="#projects" class="secondary-button">
                Ver Projetos
                <i class="fas fa-code"></i>
              </a>
            </div>
          </div>

          <!-- Container da foto de perfil com efeitos 3D -->
          <div class="profile-container">
            <div class="profile-image-wrapper" ref="profileWrapper">
              <div class="profile-frame"></div>
              <img src="../assets/img/perfil.jpeg" alt="Matheus Malena" class="profile-image" />
            </div>
          </div>
        </div>

        <!-- Redes sociais flutuantes -->
        <div class="floating-socials">
          <!-- <div class="social-line"></div> -->
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

        <!-- Scroll indicator -->
        <div class="scroll-indicator">
          <!-- <span>Scroll</span> -->
          <div class="mouse">
            <div class="wheel"></div>
          </div>
        </div>
      </div>
    </section>

    <Services />
    <About />
    <Skills />
    <Projects />
    <Certificates />
    <Timeline />
    <Contact />
  </div>
</template>

<script>
import Typed from "typed.js";
import Contact from "./Contact.vue";
import Services from "./Services.vue";
import About from "./About.vue";
import Projects from "./Projects.vue";
import Skills from "./Skills.vue";
import Certificates from "./Certificates.vue";
import Timeline from "./Timeline.vue";

export default {
  name: "Home",
  components: {
    Contact,
    Services,
    Projects,
    About,
    Certificates,
    Timeline,
    Skills,
  },
  mounted() {
    this.initTyped();
    this.initParticles();
    this.initScrollEffect();
    this.initImageEffects();
  },
  watch: {
    "$i18n.locale"() {
      if (this.typed) {
        this.typed.destroy();
      }
      this.initTyped();
    },
  },
  methods: {
    initImageEffects() {
      const wrapper = this.$refs.profileWrapper;
      if (!wrapper) return;

      const maxTilt = 15; // graus

      wrapper.addEventListener("mousemove", (e) => {
        // Efeito de tilt (inclinação)
        const { width, height, left, top } = wrapper.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;

        const rotateX = (y / height - 0.5) * -maxTilt;
        const rotateY = (x / width - 0.5) * maxTilt;

        const relX = x / width;
        const relY = y / height;

        const radius1 = 30 + 30 * relX;
        const radius2 = 70 - 30 * relY;
        const radius3 = 70 - 30 * relX;
        const radius4 = 30 + 30 * relY;

        // Aplica ambos os efeitos
        wrapper.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        wrapper.style.borderRadius = `${radius1}% ${radius2}% ${radius3}% ${radius4}% / ${radius1}% ${radius2}% ${radius3}% ${radius4}%`;
        wrapper.style.boxShadow = `0 0 ${30 + 50 * relX}px rgba(76, 201, 240, ${0.3 + 0.3 * relY
          })`;
        wrapper.style.transition =
          "transform 0.1s ease, border-radius 0.3s ease, box-shadow 0.3s ease";
      });

      wrapper.addEventListener("mouseleave", () => {
        wrapper.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
        wrapper.style.borderRadius = "30% 70% 70% 30% / 30% 30% 70% 70%";
        wrapper.style.boxShadow = "0 0 50px rgba(76, 201, 240, 0.3)";
        wrapper.style.transition =
          "transform 0.4s ease, border-radius 0.6s ease, box-shadow 0.6s ease";
      });
    },
    initTyped() {
      const options = {
        strings: [
          this.$t("home.titles.devFull"),
          this.$t("home.titles.systemAnalyst"),
          this.$t("home.titles.trafficManager"),
          this.$t("home.titles.surfer"),
        ],
        typeSpeed: 80,
        backSpeed: 50,
        loop: true,
        loopCount: Infinity,
        showCursor: true,
        cursorChar: "|",
        autoInsertCss: true,
      };
      this.typed = new Typed(this.$refs.typingRef, options);
    },
    initParticles() {
      if (typeof window !== "undefined" && window.particlesJS) {
        particlesJS("particles-js", {
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#4cc9f0" },
            shape: {
              type: "circle",
              stroke: { width: 0, color: "#000000" },
              polygon: { nb_sides: 5 }
            },
            opacity: {
              value: 0.5,
              random: true,
              anim: { enable: true, speed: 1, opacity_min: 0.1 }
            },
            size: {
              value: 3,
              random: true,
              anim: { enable: true, speed: 2, size_min: 0.1 }
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#3a0ca3",
              opacity: 0.3,
              width: 1
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: true,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: { enable: true, rotateX: 600, rotateY: 1200 }
            }
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: true, mode: "bubble" },
              onclick: { enable: true, mode: "push" }
            },
            modes: {
              bubble: {
                distance: 200,
                size: 6,
                duration: 2,
                opacity: 0.8,
                speed: 3
              },
              push: { particles_nb: 4 }
            }
          }
        });
      } else {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
        script.onload = this.initParticles;
        document.head.appendChild(script);
      }
    },
    initScrollEffect() {
      window.addEventListener("scroll", this.handleScroll);
    },
    handleScroll() {
      const scrollPosition = window.scrollY;
      const dynamicGradient = document.querySelector(".dynamic-gradient");
      if (dynamicGradient) {
        dynamicGradient.style.transform = `translateY(${scrollPosition * 0.3}px)`;
      }
    },
  },
  beforeUnmount() {
    if (this.typed) {
      this.typed.destroy();
    }
    if (window.pJSDom && window.pJSDom.length > 0) {
      window.pJSDom[0].pJS.fn.vendors.destroypJS();
      window.pJSDom = [];
    }
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
/* ============= VARIÁVEIS CSS ============= */
:root {
  --primary-color: #4cc9f0;
  --secondary-color: #7209b7;
  --dark-bg: #0f172a;
  --darker-bg: #0a1120;
  --text-light: #f8fafc;
  --text-gray: #94a3b8;
  --accent-color: #4cc9f0;
  --gradient-blue: linear-gradient(135deg, #4cc9f0 0%, #7209b7 100%);
  --gradient-purple: linear-gradient(135deg, #7209b7 0%, #3a0ca3 100%);
  --glass-bg: rgba(15, 23, 42, 0.6);
  --glass-border: rgba(255, 255, 255, 0.1);
}

/* ============= ESTILOS GERAIS ============= */
.home {
  overflow-x: hidden;
  scroll-behavior: smooth;
}

.hero-section {
  position: relative;
  height: 100%;
  min-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--darker-bg);
  color: var(--text-light);
  width: 100%;
  overflow: hidden;
  isolation: isolate;
}

.max-width {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 5%;
  position: relative;
  z-index: 10;
}

/* ============= EFEITOS DE FUNDO ============= */
.particles {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}

.dynamic-gradient {
  position: absolute;
  width: 150%;
  height: 150%;
  top: -25%;
  left: -25%;
  background: radial-gradient(circle at center,
      rgba(39, 125, 255, 0.2) 0%,
      rgba(35, 52, 92, 0) 80%);
  z-index: 2;
  transition: transform 0.1s ease-out;
  will-change: transform;
}

.glass-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 3;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.05);
}

/* ============= CONTEÚDO PRINCIPAL ============= */
.home-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5rem;
  width: 100%;
  position: relative;
}

.text-content {
  flex: 1;
  min-width: 300px;
  max-width: 600px;
  position: relative;
  z-index: 5;
}

.greeting-text {
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
  color: var(--text-gray);
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.greeting-highlight {
  background: var(--gradient-blue);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  padding-bottom: 0.2rem;
  border-bottom: 2px solid var(--primary-color);
}

.name-text {
  font-size: clamp(1.4rem, 4vw, 4rem);
  font-weight: 800;
  margin: 0.5rem 0;
  line-height: 1.1;
  color: transparent;
  display: flex;
  flex-direction: column;
}

.name-gradient {
  color: rgb(233, 233, 233);
  display: inline-block;
}

.name-text span:first-child {
  animation: slideInLeft 0.8s ease-out;
}

.name-text span:last-child {
  animation: slideInRight 0.8s ease-out;
}

@keyframes slideInLeft {
  from {
    transform: translateX(-30px);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(30px);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.profession-text {
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  margin: 1.8rem 0 3rem;
  min-height: 3.5rem;
  display: flex;
  align-items: center;
  color: var(--text-gray);
  font-weight: 500;
}

.profession-typing {
  background: var(--gradient-blue);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 600;
}

.typing-cursor {
  color: var(--primary-color);
  font-weight: 400;
  animation: blink 1s infinite;
}

/* ============= BOTÕES ============= */
.action-buttons {
  display: flex;
  gap: 1.5rem;
  margin-top: 2.5rem;
  flex-wrap: wrap;
}

.cta-button,
.secondary-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 2.2rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-decoration: none;
  position: relative;
  overflow: hidden;
  z-index: 1;
  border: none;
  cursor: pointer;
}

.cta-button {
  background: var(--gradient-blue);
  color: white;
  box-shadow: 0 2px 10px rgba(76, 201, 240, 0.4);
}

.cta-button::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--gradient-purple);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.cta-button:hover::before {
  opacity: 1;
}

.neon-button {
  animation: neonGlow 2s infinite alternate;
}

@keyframes neonGlow {
  from {
    box-shadow: 0 0 6px rgba(76, 201, 240, 0.7), 0 0 12px rgba(76, 201, 240, 0.5),
      0 0 24px rgba(76, 201, 240, 0.3);
  }

  to {
    box-shadow: 0 0 6px rgba(76, 201, 240, 0.9), 0 0 12px rgba(76, 201, 240, 0.7),
      0 0 24px rgba(76, 201, 240, 0.5);
  }
}

.secondary-button {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: var(--text-light);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.secondary-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.arrow-icon,
.secondary-button i {
  margin-left: 0.6rem;
  transition: transform 0.3s ease;
}

.cta-button:hover .arrow-icon {
  transform: translateX(5px);
}

.secondary-button:hover i {
  transform: rotate(15deg);
}

/* ============= FOTO DE PERFIL ============= */
.profile-container {
  flex: 1;
  min-width: 350px;
  max-width: 500px;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 5;
}

.profile-image-wrapper {
  position: relative;
  width: 380px;
  height: 380px;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  animation: morph 30s ease-in-out infinite;
  box-shadow: 0 0 50px rgba(76, 201, 240, 0.3);
  overflow: hidden;
  transition: border-radius 0.6s ease, box-shadow 0.6s ease, transform 0.6s ease;
}

.profile-frame {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid var(--primary-color);
  border-radius: inherit;
  animation: rotateFrame 20s linear infinite;
  z-index: 1;
}

@keyframes rotateFrame {
  to {
    transform: rotate(360deg);
  }
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
  position: relative;
  z-index: 2;
  filter: grayscale(20%) contrast(110%);
  transition: all 0.5s ease;
}

.profile-image:hover {
  filter: grayscale(0%) contrast(100%);
  transform: scale(1.02);
}

.tech-icons {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1.5rem;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  border: 1px solid var(--glass-border);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  z-index: 3;
}

.tech-icons i {
  font-size: 1.5rem;
  color: var(--text-light);
  transition: all 0.3s ease;
}

.tech-icons i:hover {
  color: var(--primary-color);
  transform: translateY(-5px) scale(1.2);
}

/* ============= REDES SOCIAIS ============= */
.floating-socials {
  position: fixed;
  left: 30px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  z-index: 100;
}

.social-line {
  width: 2px;
  height: 100px;
  background: var(--gradient-blue);
  margin-bottom: 1rem;
}

.social-link {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f172a;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  color: white !important;
  font-size: 1.2rem;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-decoration: none !important;
  position: relative;
  border: 1px solid var(--glass-border);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.social-link:hover {
  transform: translateY(-5px) scale(1.1);
  color: white;
  box-shadow: 0 8px 25px rgba(76, 201, 240, 0.3);
}

.social-link:nth-child(2):hover {
  background: #0077b5;
}

.social-link:nth-child(3):hover {
  background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
}

.social-link:nth-child(4):hover {
  background: #333;
}

.social-tooltip {
  position: absolute;
  left: 70px;
  top: 50%;
  transform: translateY(-50%);
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: white !important;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 0.9rem;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  white-space: nowrap;
  border: 1px solid var(--glass-border);
}

.social-link:hover .social-tooltip {
  opacity: 1;
  visibility: visible;
  left: 80px;
}

/* ============= SCROLL INDICATOR ============= */
.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  color: var(--text-gray);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.mouse {
  width: 25px;
  height: 40px;
  border: 2px solid var(--text-gray);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
  position: relative;
}

.wheel {
  width: 5px;
  height: 8px;
  background: var(--primary-color);
  border-radius: 3px;
  position: absolute;
  top: 5px;
  animation: scrollWheel 2s infinite;
}

@keyframes scrollWheel {
  0% {
    transform: translateY(0);
    opacity: 1;
  }

  100% {
    transform: translateY(15px);
    opacity: 0;
  }
}

/* ============= RESPONSIVIDADE ============= */
@media (max-width: 1200px) {
  .home-content {
    gap: 3rem;
  }

  .profile-image-wrapper {
    width: 340px;
    height: 340px;
  }
}

@media (max-width: 992px) {
  .home-content {
    flex-direction: column-reverse;
    text-align: center;
    gap: 3rem;
  }

  .profile-container {
    margin-bottom: 2rem;
  }

  .name-text {
    align-items: center;
  }

  .profession-text {
    justify-content: center;
  }

  .action-buttons {
    justify-content: center;
  }

  .floating-socials {
    position: static;
    flex-direction: row;
    transform: none;
    justify-content: center;
    margin-top: 3rem;
    padding-top: 2rem;
  }

  .social-line {
    width: 100px;
    height: 2px;
    margin-bottom: 0;
    margin-right: 1rem;
  }
}

@media (max-width: 768px) {
  .greeting-text {
    font-size: 1.1rem;
  }

  .profile-image-wrapper {
    width: 280px;
    height: 280px;
  }

  .action-buttons {
    flex-direction: column;
    gap: 1rem;
  }

  .cta-button,
  .secondary-button {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 576px) {
  .home-content {
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 2rem;
  }

  .text-content {
    max-width: 100%;
  }

  .name-text {
    font-size: 2rem;
    line-height: 1.2;
  }

  .profession-text {
    font-size: 1.3rem;
    margin-top: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }

  .greeting-text {
    font-size: 1rem;
  }

  .action-buttons {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }

  .cta-button,
  .secondary-button {
    width: 100%;
    font-size: 1rem;
    padding: 0.8rem 1.5rem;
  }

  .floating-socials {
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
    margin: 2rem 0;
  }

  .scroll-indicator {
    bottom: 20px;
  }

  .social-tooltip {
    display: none;
  }

  .profile-image-wrapper {
    width: 240px;
    height: 240px;
  }

  .profile-container {
    margin: 4rem 0 0 !important;
  }

  .tech-icons {
    gap: 1rem;
    padding: 0.6rem 1.2rem;
  }

  .tech-icons i {
    font-size: 1.2rem;
  }

  .floating-socials {
    gap: 1rem;
  }

  .social-link {
    width: 45px;
    height: 45px;
    font-size: 1.1rem;
  }
}

@media screen and (max-width: 480px) {

  .profile-container {
   margin: 14rem 0 0 !important;
  }

}

@keyframes blink {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}
</style>
