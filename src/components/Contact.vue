<template>
  <section class="contact-section" id="contact" aria-label="Entre em contato através das redes sociais ou WhatsApp">
    <div class="contact-container">
      <div class="contact-header" data-aos="fade-down">
        <h2 class="contact-title">Vamos Conversar?</h2>
        <div class="title-decoration"></div>
        <p class="contact-subtitle">Estou disponível para colaborações e novos projetos</p>
      </div>

      <div class="whatsapp-container" >
         <a href="http://wa.me/5513996958183" target="_blank" rel="noopener noreferrer" class="whatsapp-btn">
          <i class="fab fa-whatsapp"></i>
          <span>Fale comigo pelo WhatsApp</span>
        </a>
      </div>

      <div class="contact-content">
        <div class="contact-info">
          <div class="info-card">
            <i class="fas fa-envelope contact-icon"></i>
            <div class="info-text">
              <h3>Email</h3>
              <a href="mailto:matheusmalena28@gmail.com" class="info-link">matheusmalena28@gmail.com</a>
            </div>
          </div>

          <div class="info-card">
            <i class="fas fa-map-marker-alt contact-icon"></i>
            <div class="info-text">
              <h3>Localização</h3>
              <p>Peruíbe - SP, Brasil</p>
            </div>
          </div>
        </div>

        <div class="social-container">
          <h3 class="social-title">Minhas Redes</h3>
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

/* -------- SEÇÃO CONTATO -------- */
.contact-section {
  background-color: var(--color-bg);
  padding: 5rem 0;
  position: relative;
  overflow: hidden;
}

.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.contact-header {
  text-align: center;
  margin-bottom: 3rem;
}

.contact-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-white);
  margin-bottom: 1rem;
  background: var(--gradient-blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-decoration {
  width: 80px;
  height: 4px;
  background: linear-gradient(to right, var(--color-primary), var(--color-primary-light));
  margin: 0 auto 1.5rem;
  border-radius: 2px;
}

.contact-subtitle {
  color: var(--color-text-light);
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* -------- INFORMAÇÕES DE CONTATO -------- */
.contact-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
}

.contact-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  max-width: 800px;
}

.info-card {
  background: var(--color-card);
  padding: 1.5rem 2rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  max-width: 350px;
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.contact-icon {
  font-size: 1.8rem;
  color: var(--color-primary);
  background: rgba(124, 58, 237, 0.1);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.info-text h3 {
  color: var(--color-text-light);
  font-size: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.info-link, .info-text p {
  color: var(--color-text);
  font-size: 1.1rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s ease;
}

.info-link:hover {
  color: var(--color-primary);
}

/* -------- REDES SOCIAIS -------- */
.social-container {
  text-align: center;
  width: 100%;
}

.social-title {
  color: var(--color-text-light);
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.social-media {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.social-link {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.3rem;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none !important;
}

.social-link:hover {
  transform: translateY(-5px);
}

.social-link i {
  transition: transform 0.3s ease;
   color: var(--color-white);
}

.social-link:hover i {
  transform: scale(1.2);
}

.social-tooltip {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-card);
  color: var(--color-text);
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.8rem;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.social-link:hover .social-tooltip {
  opacity: 1;
  visibility: visible;
  bottom: -40px;
}

/* Cores específicas para cada rede social */
.social-link:nth-child(1) {
  background-color: #333;
}
.social-link:nth-child(2) {
  background-color: #0077B5;
}
.social-link:nth-child(3) {
  background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
}

/* -------- BOTÃO WHATSAPP -------- */
.whatsapp-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 2rem;
  background-color:#23c45e;
  color: white;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
  margin-top: 1rem;
}

.whatsapp-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
  background-color: #23c55e;
}

.whatsapp-btn i {
  font-size: 1.4rem;
}

.whatsapp-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 2rem 2rem 2rem;
}

/* -------- RESPONSIVIDADE -------- */
@media (max-width: 1024px) {
  .contact-title {
    font-size: 2.2rem;
  }

  .info-card {
    flex: 1 1 100%;
    max-width: 100%;
  }

  .contact-subtitle {
    font-size: 1.1rem;
  }

  .social-media {
    gap: 1rem;
  }

  .whatsapp-btn {
    font-size: 1rem;
    padding: 0.8rem 1.5rem;
  }
}

@media (max-width: 768px) {
  .contact-title {
    font-size: 2rem;
  }

  .contact-subtitle {
    font-size: 1rem;
  }

  .contact-content {
    gap: 2rem;
  }

  .info-card {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;
    align-items: center;
  }

  .contact-icon {
    margin-bottom: 1rem;
  }

  .info-text h3 {
    font-size: 1rem;
  }

  .info-link,
  .info-text p {
    font-size: 1rem;
  }

  .social-link {
    width: 45px;
    height: 45px;
    font-size: 1.1rem;
  }

  .social-tooltip {
    font-size: 0.7rem;
    padding: 0.2rem 0.6rem;
  }

  .whatsapp-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .contact-container {
    padding: 0 1rem;
  }

  .contact-title {
    font-size: 1.8rem;
  }

  .contact-subtitle {
    font-size: 0.95rem;
    line-height: 1.4;
  }

  .info-card {
    max-width: 100%;
    padding: 1.2rem;
  }

  .contact-icon {
    width: 50px;
    height: 50px;
    font-size: 1.4rem;
  }

  .whatsapp-btn {
    font-size: 0.95rem;
    padding: 0.8rem 1.2rem;
  }

  .social-link {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
}

</style>