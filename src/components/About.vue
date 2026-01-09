<template>
  <section id="about" class="about-section" aria-label="Section about Matheus Malena and his programming journey.">
    <div class="about-container">
      <!-- LEFT SIDE - IMAGE -->
      <div class="about-image" ref="tiltContainer" @mousemove="handleTilt" @mouseleave="resetTilt">
        <div class="image-wrapper" ref="imageWrapper">
          <img src="../assets/img/perfil-2.jpeg" alt="Photo of Matheus Malena" class="profile-image" />
          <div class="image-glow"></div>
        </div>
      </div>

      <!-- RIGHT SIDE - TEXT -->
      <div class="about-text">
        <small class="about-subtitle">{{ $t("about.subtitle") }}</small>
        <h2 class="about-title">
          {{ $t("about.title") }} <span class="highlight">Malena</span>
        </h2>

        <p class="about-paragraph">
          {{ $t("about.paragraph_1") }}
          <a href="https://yupchat.com" target="_blank" rel="noopener noreferrer" class="link-purple">Yup Chat</a>.
        </p>

        <p class="about-paragraph">
          {{ $t("about.paragraph_2") }}
        </p>

        <p class="about-paragraph">
          {{ $t("about.paragraph_3") }}
        </p>

        <a href="#timeline" class="about-link btn-trajetoria">
          {{ $t("about.trajectory_button") }}
          <span class="material-symbols-outlined">conversion_path</span>
        </a>

        <div class="social-icons">
          <a href="https://github.com/matheusmalena" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <i class="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/matheusmalena" target="_blank" rel="noopener noreferrer"
            aria-label="LinkedIn">
            <i class="fab fa-linkedin-in"></i>
          </a>
          <a href="https://www.instagram.com/dev_malena" target="_blank" rel="noopener noreferrer"
            aria-label="Instagram">
            <i class="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";

export default {
  name: "About",
  setup() {
    const tiltContainer = ref(null);
    const imageWrapper = ref(null);

    const handleTilt = (e) => {
      const container = tiltContainer.value;
      const card = imageWrapper.value;
      if (!container || !card) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    };

    const resetTilt = () => {
      const card = imageWrapper.value;
      if (!card) return;
      card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    };

    return {
      tiltContainer,
      imageWrapper,
      handleTilt,
      resetTilt,
    };
  },
};
</script>

<style scoped>
.about-section {
  background-color: #fff;
  padding: 100px 40px;
  position: relative;
  overflow: hidden;
}

/* brilho sutil no fundo */
.about-section::before {
  content: "";
  position: absolute;
  inset: -30%;
  background: radial-gradient(circle, rgba(195, 236, 254, 0.22) 0%, transparent 55%);
  filter: blur(25px);
  pointer-events: none;
}

.about-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1280px;
  margin: 0 auto;
  gap: 40px;
  position: relative;
  z-index: 1;
}

.about-text {
  flex: 1;
  min-width: 320px;
  max-width: 600px;
}

.about-subtitle {
  font-weight: 800;
  font-size: 0.92rem;
  color: #111;
  margin-bottom: 12px;
  display: block;
  text-transform: uppercase;
  letter-spacing: 1.2px;
}

.about-title {
  font-size: 2.55rem;
  font-weight: 900;
  color: #0a0a23;
  margin-bottom: 22px;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.highlight {
  background: var(--gradient-blue);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.about-paragraph {
  font-size: 1.02rem;
  line-height: 1.75;
  color: #444;
  margin-bottom: 16px;
}

.link-purple {
  background: var(--gradient-blue);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 700;
  text-decoration: none;
  position: relative;
}

.link-purple::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -3px;
  width: 100%;
  height: 2px;
  background: var(--gradient-blue);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s ease;
  border-radius: 999px;
}

.link-purple:hover::after {
  transform: scaleX(1);
}

.about-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--gradient-blue);
  color: white;
  padding: 12px 20px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 800;
  margin-top: 14px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  box-shadow: 0 12px 30px rgba(70, 130, 180, 0.22);
}

.about-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 38px rgba(70, 130, 180, 0.28);
}

.social-icons {
  margin-top: 26px;
  display: flex;
  gap: 12px;
}

.social-icons a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background-color: #f3f4f6;
  border-radius: 12px;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
  font-size: 18px;
  color: #1f2937;
  text-decoration: none !important;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.social-icons a:hover {
  transform: translateY(-3px);
  background: #fff;
  box-shadow: 0 16px 30px rgba(70, 130, 180, 0.18);
}

.social-icons a i {
  color: #111827;
}

/* Estilos da imagem */
.about-image {
  flex: 1;
  min-width: 300px;
  max-width: 450px;
  position: relative;
}

.image-wrapper {
  transform-style: preserve-3d;
  transition: transform 0.2s ease;
  will-change: transform;
  perspective: 1000px;
  border-radius: 22px;
}

.profile-image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 22px;
  transition: transform 0.5s ease;
  position: relative;
  z-index: 2;
  border: 4px solid white;
  box-shadow: 0 22px 70px rgba(0, 0, 0, 0.18);
}

.image-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(70, 130, 180, 0.22) 0%, rgba(70, 130, 180, 0) 70%);
  border-radius: 22px;
  z-index: 1;
  animation: pulse-glow 4s infinite alternate;
}

@keyframes pulse-glow {
  0% {
    transform: scale(0.98);
    opacity: 0.65;
  }

  100% {
    transform: scale(1.03);
    opacity: 0.35;
  }
}

/* Responsivo */
@media (max-width: 1024px) {
  .about-container {
    flex-direction: column;
    text-align: center;
    gap: 30px;
  }

  .about-text,
  .about-image {
    max-width: 100%;
  }

  .about-title {
    font-size: 2rem;
  }

  .about-image {
    order: -1;
    padding-top: 0;
  }

  .about-link {
    margin-left: auto;
    margin-right: auto;
  }

  .social-icons {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .about-section {
    padding: 60px 20px;
  }

  .about-title {
    font-size: 1.8rem;
  }
}
</style>
