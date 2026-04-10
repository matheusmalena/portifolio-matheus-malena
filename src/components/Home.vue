<template>
  <div class="home">
    <section id="home" class="hero-section">
      <div class="bg-effects">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="gradient-orb orb-3"></div>
        <div class="grid-pattern"></div>
      </div>

      <div class="max-width">
        <div class="home-content">
          <div class="text-content">
            <div class="badge">
              <span>Olá, eu sou</span>
            </div>
            
            <h1 class="name-text">
              <span class="name-line">Matheus</span>
              <span class="name-line gradient-text">Malena</span>
            </h1>
            
            <div class="typing-container">
              <span ref="typingRef" class="profession-typing"></span>
              <span class="cursor"></span>
            </div>

            <p class="description">
              Desenvolvedor Full Stack criando experiências digitais inovadoras com paixão e precisão.
            </p>

            <div class="action-buttons">
              <a href="#contact" class="btn-primary">
                <span>Fale Comigo</span>
                <i class="fas fa-arrow-right"></i>
              </a>
              <a href="#projects" class="btn-secondary">
                <i class="fas fa-eye"></i>
                <span>Ver Projetos</span>
              </a>
            </div>

            <div class="stats">
              <div class="stat">
                <span class="stat-number">3+</span>
                <span class="stat-label">Anos de XP</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat">
                <span class="stat-number">20+</span>
                <span class="stat-label">Projetos</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat">
                <span class="stat-number">15+</span>
                <span class="stat-label">Clientes</span>
              </div>
            </div>
          </div>

          <div class="profile-section">
            <div class="profile-wrapper">
              <div class="profile-ring"></div>
              <div class="profile-ring ring-2"></div>
              <div class="profile-glow"></div>
              <div class="profile-image-container">
                <img src="../assets/img/perfil.jpeg" alt="Matheus Malena" class="profile-image" />
              </div>
              <div class="floating-badge badge-1">
                <i class="fas fa-code"></i>
                <span>Frontend</span>
              </div>
              <div class="floating-badge badge-2">
                <i class="fas fa-server"></i>
                <span>Backend</span>
              </div>
            </div>
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
  },
  beforeUnmount() {
    if (this.typed) {
      this.typed.destroy();
    }
  },
};
</script>

<style scoped>
.home {
  overflow-x: hidden;
}

.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 5% 80px;
  overflow: hidden;
}

.bg-effects {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.5;
}

.orb-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, var(--primary) 0%, transparent 70%);
  top: -200px;
  right: -100px;
  animation: float 8s ease-in-out infinite;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, var(--secondary) 0%, transparent 70%);
  bottom: -100px;
  left: -100px;
  animation: float 10s ease-in-out infinite reverse;
}

.orb-3 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: pulse 4s ease-in-out infinite;
}

.grid-pattern {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(14, 165, 233, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(14, 165, 233, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}

.max-width {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
}

.home-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
}

.text-content {
  flex: 1;
  max-width: 600px;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(14, 165, 233, 0.1);
  border: 1px solid rgba(14, 165, 233, 0.3);
  padding: 8px 16px;
  border-radius: var(--radius-full);
  font-size: 0.9rem;
  color: var(--primary-light);
  margin-bottom: 1.5rem;
  animation: fadeInUp 0.6s ease forwards;
}

.badge-dot {
  width: 8px;
  height: 8px;
  background: var(--primary);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

.name-text {
  display: flex;
  flex-direction: column;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

.name-line {
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
}

.name-line:nth-child(1) {
  animation-delay: 0.1s;
  color: var(--text-primary);
}

.name-line:nth-child(2) {
  animation-delay: 0.2s;
}

.gradient-text {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.typing-container {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  min-height: 2.5rem;
  animation: fadeInUp 0.6s ease 0.3s forwards;
  opacity: 0;
}

.profession-typing {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 600;
}

.cursor {
  width: 3px;
  height: 1.5rem;
  background: var(--primary);
  margin-left: 4px;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.description {
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 2rem;
  animation: fadeInUp 0.6s ease 0.4s forwards;
  opacity: 0;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  animation: fadeInUp 0.6s ease 0.5s forwards;
  opacity: 0;
}

.btn-primary,
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  border-radius: var(--radius-full);
  font-weight: 600;
  font-size: 1rem;
  transition: all var(--transition-bounce);
  text-decoration: none;
}

.btn-primary {
  background: var(--gradient-primary);
  color: white;
  box-shadow: 0 4px 20px rgba(14, 165, 233, 0.3);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(14, 165, 233, 0.4);
}

.btn-primary i {
  transition: transform var(--transition-base);
}

.btn-primary:hover i {
  transform: translateX(4px);
}

.btn-secondary {
  background: var(--surface);
  border: 1px solid var(--border-light);
  color: var(--text-primary);
  backdrop-filter: blur(10px);
}

.btn-secondary:hover {
  background: var(--surface-light);
  transform: translateY(-3px);
  border-color: var(--primary);
}

.stats {
  display: flex;
  align-items: center;
  gap: 2rem;
  animation: fadeInUp 0.6s ease 0.6s forwards;
  opacity: 0;
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 1.8rem;
  font-weight: 800;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.stat-label {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: var(--border);
}

.profile-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeInUp 0.8s ease 0.3s forwards;
  opacity: 0;
}

.profile-wrapper {
  position: relative;
  width: 380px;
  height: 380px;
}

.profile-ring {
  position: absolute;
  inset: 0;
  border: 2px solid var(--primary);
  border-radius: 50%;
  animation: spin 20s linear infinite;
}

.ring-2 {
  inset: -15px;
  border-color: var(--secondary);
  animation-duration: 15s;
  animation-direction: reverse;
  opacity: 0.5;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.profile-glow {
  position: absolute;
  inset: -50px;
  background: var(--gradient-glow);
  filter: blur(60px);
  opacity: 0.5;
  animation: pulse 4s ease-in-out infinite;
}

.profile-image-container {
  position: absolute;
  inset: 20px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  transition: transform var(--transition-bounce);
}

.profile-image-container:hover {
  transform: scale(1.05);
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.profile-image-container:hover .profile-image {
  transform: scale(1.1);
}

.floating-badge {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--background-card);
  border: 1px solid var(--border);
  padding: 10px 16px;
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  font-weight: 500;
  box-shadow: var(--shadow-md);
  animation: floatBadge 3s ease-in-out infinite;
}

.floating-badge i {
  color: var(--primary);
}

.badge-1 {
  top: 20%;
  right: -60px;
  animation-delay: 0s;
}

.badge-2 {
  bottom: 20%;
  right: -60px;
  animation-delay: 1.5s;
}

@keyframes floatBadge {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--text-muted);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  animation: fadeInUp 0.6s ease 0.8s forwards;
  opacity: 0;
}

.mouse {
  width: 24px;
  height: 38px;
  border: 2px solid var(--border);
  border-radius: 12px;
  display: flex;
  justify-content: center;
  padding-top: 8px;
}

.wheel {
  width: 4px;
  height: 8px;
  background: var(--primary);
  border-radius: 2px;
  animation: scrollWheel 2s ease-in-out infinite;
}

@keyframes scrollWheel {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(12px);
    opacity: 0;
  }
}

@media (max-width: 1024px) {
  .home-content {
    flex-direction: column;
    text-align: center;
    gap: 3rem;
  }

  .text-content {
    max-width: 100%;
  }

  .name-text {
    align-items: center;
  }

  .action-buttons {
    justify-content: center;
  }

  .stats {
    justify-content: center;
  }

  .profile-wrapper {
    width: 300px;
    height: 300px;
  }

  .floating-badge {
    display: none;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 100px 5% 60px;
  }

  .badge {
    font-size: 0.8rem;
  }

  .typing-container {
    font-size: 1.2rem;
  }

  .description {
    font-size: 1rem;
  }

  .action-buttons {
    flex-direction: column;
    align-items: center;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    justify-content: center;
    max-width: 280px;
  }

  .stats {
    gap: 1.5rem;
  }

  .stat-number {
    font-size: 1.5rem;
  }

  .profile-wrapper {
    width: 260px;
    height: 260px;
  }
}

@media (max-width: 480px) {
  .profile-wrapper {
    width: 220px;
    height: 220px;
  }

  .stats {
    flex-wrap: wrap;
    gap: 1rem;
  }

  .stat-divider {
    display: none;
  }
}
</style>
