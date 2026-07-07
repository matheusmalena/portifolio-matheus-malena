<template>
  <section class="contact-section" id="contact" aria-label="Entre em contato">
    <div class="section-bg">
      <div class="bg-glow glow-1"></div>
      <div class="bg-glow glow-2"></div>
      <div class="bg-grid"></div>
    </div>

    <div class="container">
      <div class="contact-header">
        <div class="badge">Contato</div>
        <h2 class="section-title">{{ $t('contact.title') }}</h2>
        <p class="section-subtitle">{{ $t('contact.subtitle') }}</p>
      </div>

      <div class="contact-content">
        <div class="contact-cards">
          <div class="contact-card">
            <div class="card-icon">
              <i class="fas fa-envelope"></i>
            </div>
            <div class="card-info">
              <span class="card-label">{{ $t('contact.email_label') }}</span>
              <a href="mailto:matheusmalenadev@gmail.com" class="card-value">
                matheusmalenadev@gmail.com
              </a>
            </div>
          </div>

          <div class="contact-card">
            <div class="card-icon">
              <i class="fas fa-map-marker-alt"></i>
            </div>
            <div class="card-info">
              <span class="card-label">{{ $t('contact.location_label') }}</span>
              <span class="card-value">{{ $t('contact.location_value') }}</span>
            </div>
          </div>
        </div>

        <div class="cta-container">
          <a href="http://wa.me/5513996958183" target="_blank" rel="noopener noreferrer" class="whatsapp-btn">
            <div class="btn-icon">
              <i class="fab fa-whatsapp"></i>
            </div>
            <div class="btn-content">
              <span class="btn-label">{{ $t('contact.whatsapp') }}</span>
              <span class="btn-sublabel">Inicie uma conversa</span>
            </div>
            <div class="btn-arrow">
              <i class="fas fa-arrow-right"></i>
            </div>
          </a>
        </div>

        <div class="social-section">
          <span class="social-label">{{ $t('contact.social_title') }}</span>
          <div class="social-links">
            <a href="https://github.com/matheusmalena" target="_blank" rel="noopener noreferrer" class="social-btn github" aria-label="GitHub">
              <i class="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/matheusmalena" target="_blank" rel="noopener noreferrer" class="social-btn linkedin" aria-label="LinkedIn">
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a href="https://www.instagram.com/dev_malena" target="_blank" rel="noopener noreferrer" class="social-btn instagram" aria-label="Instagram">
              <i class="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Contact'
};
</script>

<style scoped>
.contact-section {
  padding: 120px 5%;
  position: relative;
  overflow: hidden;
  background: var(--gradient-dark);
}

.section-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.bg-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.4;
}

.glow-1 {
  width: 500px;
  height: 500px;
  background: var(--primary);
  top: -150px;
  left: 50%;
  transform: translateX(-50%);
}

.glow-2 {
  width: 300px;
  height: 300px;
  background: var(--secondary);
  bottom: -100px;
  right: 10%;
}

.bg-grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(14, 165, 233, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(14, 165, 233, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
}

.contact-header {
  text-align: center;
  margin-bottom: 4rem;
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
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.15rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.contact-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
}

.contact-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  width: 100%;
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 1.5rem 2rem;
  min-width: 300px;
  transition: all 0.4s ease;
}

.contact-card:hover {
  border-color: rgba(14, 165, 233, 0.3);
  transform: translateY(-4px);
}

.card-icon {
  width: 60px;
  height: 60px;
  background: var(--gradient-primary);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-icon i {
  font-size: 1.5rem;
  color: white;
}

.card-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.card-label {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-weight: 500;
}

.card-value {
  font-size: 1.05rem;
  color: var(--text-primary);
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s ease;
}

a.card-value:hover {
  color: var(--primary-light);
}

.cta-container {
  width: 100%;
  max-width: 500px;
}

.whatsapp-btn {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  background: #25D366;
  border-radius: var(--radius-xl);
  padding: 1.5rem 2rem;
  text-decoration: none;
  transition: all 0.4s ease;
  box-shadow: 0 4px 20px rgba(37, 211, 102, 0.3);
  position: relative;
  overflow: hidden;
}

.whatsapp-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.6s ease;
}

.whatsapp-btn:hover::before {
  left: 100%;
}

.whatsapp-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(37, 211, 102, 0.4);
}

.btn-icon {
  width: 56px;
  height: 56px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.btn-icon i {
  font-size: 1.8rem;
  color: white;
}

.btn-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.btn-label {
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
}

.btn-sublabel {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

.btn-arrow {
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.btn-arrow i {
  color: white;
  font-size: 1rem;
}

.whatsapp-btn:hover .btn-arrow {
  transform: translateX(4px);
}

.social-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.social-label {
  font-size: 1rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.social-links {
  display: flex;
  gap: 16px;
}

.social-btn {
  width: 56px;
  height: 56px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.4s ease;
}

.social-btn:hover {
  transform: translateY(-4px);
}

.social-btn.github:hover {
  background: #333;
  border-color: #333;
  color: white;
}

.social-btn.linkedin:hover {
  background: #0077B5;
  border-color: #0077B5;
  color: white;
}

.social-btn.instagram:hover {
  background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
  border-color: transparent;
  color: white;
}

@media (max-width: 768px) {
  .contact-section {
    padding: 80px 5%;
  }

  .contact-cards {
    flex-direction: column;
  }

  .contact-card {
    min-width: 100%;
  }

  .whatsapp-btn {
    padding: 1.2rem 1.5rem;
    gap: 1rem;
  }

  .btn-icon {
    width: 48px;
    height: 48px;
  }

  .btn-icon i {
    font-size: 1.4rem;
  }

  .btn-label {
    font-size: 1rem;
  }

  .social-btn {
    width: 48px;
    height: 48px;
    font-size: 1.2rem;
  }
}
</style>
