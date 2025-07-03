<template>
  <section id="services" class="services-section">
    <div class="services-wrapper">
      <div class="services-info">
        <small class="services-subtitle">Meu serviços</small>
        <h2 class="services-title">
          O que <br /> faço
        </h2>
        <p class="services-description">
          Expertise e capacidade de criar estratégias personalizadas, que resultam em um aumento significativo e qualitativo da presença online.
        </p>
        <button @click="redirectToWhatsapp" class="services-button">Faça um orçamento</button>
      </div>

      <div class="services-cards">
        <div class="service-card">
          <div class="service-icon">
            <i class="fas fa-laptop-code"></i>
          </div>
          <h3 class="service-card-title">Projetos web</h3>
          <p class="service-card-desc">
            Design e desenvolvimento de projetos web: sites, landing pages, etc.
          </p>
        </div>

        <div class="service-card">
          <div class="service-icon">
            <i class="fas fa-bullseye"></i>
          </div>
          <h3 class="service-card-title">Marketing digital</h3>
          <p class="service-card-desc">
            Planejamento e ações de marketing digital para aumentar a presença da sua marca.
          </p>
        </div>

        <div class="service-card">
          <div class="service-icon">
            <i class="fas fa-shapes"></i>
          </div>
          <h3 class="service-card-title">Identidade visual</h3>
          <p class="service-card-desc">
            Criação de identidade visual, manual de marca e material gráfico de apoio.
          </p>
        </div>

        <div class="service-card">
  <div class="service-icon">
    <i class="fas fa-laptop-code"></i>
  </div>
  <h3 class="service-card-title">Desenvolverdor Full Stack</h3>
  <p class="service-card-desc">
    Desenvolvimento de soluções web com tecnologias modernas e eficientes.
  </p>
</div>

      </div>
    </div>
  </section>
</template>

<script setup>
function redirectToWhatsapp() {
  window.open('http://wa.me/5513996958183', '_blank');
}
</script>

<style scoped>
/* -------- SERVICES SECTION -------- */

.services-section {
  padding: 100px 40px;
  background-color: var(--color-black);
  color: white;
}

.services-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 50px;
  align-items: start;
}

.services-info {
  text-align: left;
}

.services-subtitle {
  font-size: 0.9rem;
  color: #bbb;
  margin-bottom: 10px;
  display: block;
}

.services-title {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 25px;
  background: var(--gradient-blue);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.services-description {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 40px;
  color: #eee;
}

.services-button {
  background: var(--gradient-blue);
  color: var(--color-black);
  font-weight: 700;
  border: none;
  border-radius: 30px;
  padding: 12px 36px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.services-button:hover {
  background-color: var(--color-purple-hover);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(45, 98, 196, 0.5);
}

.services-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px 40px;
}

.service-card {
  background-color: rgba(19, 41, 112, 0.137);
  padding: 30px 25px;
  border-radius: 12px;
  color: #ccc;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.4s ease;
  cursor: pointer;
}

.service-card:hover {
  transform: translateY(-8px) scale(1.1);
  box-shadow: 0 12px 30px rgba(45, 111, 196, 0.2);
  background-color: rgba(19, 41, 112, 0.137);
}

.service-icon {
  background-color: #2d6fc428;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  font-size: 1.5rem;
  transition: transform 0.4s ease, background-color 0.4s ease;
}

.service-icon i {
  background: var(--gradient-blue);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.service-card-title {
  font-weight: 700;
  color: white;
  font-size: 1.1rem;
  margin-bottom: 8px;
  transition: color 0.4s ease;
}

.service-card:hover .service-card-title {
  background: var(--gradient-blue);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.service-card-desc {
  font-size: 0.9rem;
  line-height: 1.4;
  color: #ccc;
  transition: color 0.4s ease;
}

.service-card:hover .service-card-desc {
  color: #eee;
}

/* -------- RESPONSIVO -------- */

@media (max-width: 1024px) {
  .services-wrapper {
    grid-template-columns: 1fr;
  }

  .services-cards {
    grid-template-columns: 1fr 1fr;
    margin-top: 40px;
  }
}

@media (max-width: 600px) {
  .services-cards {
    grid-template-columns: 1fr;
  }

  .services-button {
    width: 100%;
  }
}
</style>
