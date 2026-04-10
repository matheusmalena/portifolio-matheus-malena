<template>
  <section id="about" class="about-section">
    <div class="section-bg">
      <div class="bg-pattern"></div>
      <div class="bg-glow"></div>
    </div>

    <div class="container">
      <div class="about-grid">
        <div class="about-image">
          <div class="image-wrapper">
            <div class="image-frame"></div>
            <img src="../assets/img/perfil-2.jpeg" alt="Matheus Malena" class="profile-image" />
            <div class="image-overlay"></div>
          </div>
          <div class="experience-badge">
            <span class="badge-number">3+</span>
            <span class="badge-text">Anos de<br>Experiência</span>
          </div>
        </div>

        <div class="about-content">
          <div class="badge">{{ $t("about.subtitle") }}</div>
          <h2 class="section-title">
            Prazer, sou <span class="gradient-text">Malena</span>
          </h2>

          <div class="about-text">
            <p>{{ $t("about.paragraph_1") }}</p>
            <p>Atuando no mercado de tecnologia com foco em desenvolvimento web e marketing digital, criei projetos para diversas empresas incluindo <a href="https://yupchat.com" target="_blank" rel="noopener noreferrer" class="highlight-link">Yup Chat</a>.</p>
            <p>{{ $t("about.paragraph_2") }}</p>
            <p>{{ $t("about.paragraph_3") }}</p>
          </div>

          <div class="about-actions">
            <a href="#timeline" class="btn-primary">
              <span>Minha Jornada</span>
              <i class="fas fa-arrow-right"></i>
            </a>
            <div class="social-links">
              <a href="https://github.com/matheusmalena" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="GitHub">
                <i class="fab fa-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/matheusmalena" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="LinkedIn">
                <i class="fab fa-linkedin-in"></i>
              </a>
              <a href="https://www.instagram.com/dev_malena" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="Instagram">
                <i class="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "About",
};
</script>

<style scoped>
.about-section {
  padding: 120px 5%;
  position: relative;
  overflow: hidden;
  background: var(--background-dark);
}

.section-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.bg-pattern {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(14, 165, 233, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(14, 165, 233, 0.02) 1px, transparent 1px);
  background-size: 40px 40px;
}

.bg-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, transparent 70%);
  filter: blur(80px);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 4rem;
  align-items: center;
}

.about-image {
  position: relative;
}

.image-wrapper {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.image-frame {
  position: absolute;
  inset: -4px;
  background: var(--gradient-primary);
  border-radius: calc(var(--radius-xl) + 4px);
  z-index: 0;
  animation: rotate 10s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.profile-image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: var(--radius-xl);
  position: relative;
  z-index: 1;
  border: 4px solid var(--background-dark);
  transition: transform 0.5s ease;
}

.image-wrapper:hover .profile-image {
  transform: scale(1.03);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 60%,
    rgba(3, 7, 18, 0.8) 100%
  );
  z-index: 2;
  pointer-events: none;
}

.experience-badge {
  position: absolute;
  bottom: -20px;
  right: -20px;
  background: var(--background-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: var(--shadow-lg);
  z-index: 10;
}

.badge-number {
  font-size: 2.5rem;
  font-weight: 800;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  line-height: 1;
}

.badge-text {
  font-size: 0.8rem;
  color: var(--text-secondary);
  text-align: center;
  margin-top: 4px;
}

.about-content {
  padding: 2rem 0;
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
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 2rem;
  line-height: 1.2;
}

.gradient-text {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.about-text {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.about-text p {
  font-size: 1.05rem;
  color: var(--text-secondary);
  line-height: 1.8;
}

.highlight-link {
  color: var(--primary-light);
  font-weight: 600;
  position: relative;
  text-decoration: none;
  transition: color 0.3s ease;
}

.highlight-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--gradient-primary);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}

.highlight-link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.about-actions {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  background: var(--gradient-primary);
  color: white;
  border-radius: var(--radius-full);
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(14, 165, 233, 0.3);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(14, 165, 233, 0.4);
}

.btn-primary i {
  transition: transform 0.3s ease;
}

.btn-primary:hover i {
  transform: translateX(4px);
}

.social-links {
  display: flex;
  gap: 12px;
}

.social-btn {
  width: 48px;
  height: 48px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  font-size: 1.2rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-btn:hover {
  background: var(--surface-light);
  border-color: var(--primary);
  color: var(--primary-light);
  transform: translateY(-3px);
}

@media (max-width: 1024px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .about-image {
    max-width: 400px;
    margin: 0 auto;
  }

  .about-content {
    text-align: center;
    padding: 0;
  }

  .about-actions {
    justify-content: center;
  }

  .experience-badge {
    bottom: -15px;
    right: -15px;
    padding: 1rem;
  }

  .badge-number {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .about-section {
    padding: 80px 5%;
  }

  .about-image {
    max-width: 300px;
  }

  .about-actions {
    flex-direction: column;
    gap: 1.5rem;
  }

  .btn-primary {
    width: 100%;
    justify-content: center;
  }
}
</style>
