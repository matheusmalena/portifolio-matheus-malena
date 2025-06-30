<template>
  <section id="about" class="about-section">
    <div class="about-container">
      <!-- LADO ESQUERDO -->
      <div class="about-text">
        <small class="about-subtitle">Quem somos</small>
        <h2 class="about-title">
          Uma agência de marketing,<br />
          com um único objetivo: <span class="highlight">atingir o seu!</span>
        </h2>
        <p class="about-paragraph">
          A <a href="#" class="link-purple">Connext</a> é uma agência de Marketing Digital, com sede em Curvelo, que tem
          experiência e excelência na busca para atingir os objetivos traçados pela sua empresa.
        </p>
        <p class="about-paragraph">
          Com anos de experiência no mercado, atendemos diversos segmentos, traçando
          as melhores estratégias que ajudam empresas a crescer e estabelecer a sua
          presença digital no mercado.
        </p>
        <a href="#contact" class="about-link">Fale com um de nossos especialistas</a>

        <div class="social-icons">
          <a href="#"><i class="fab fa-whatsapp"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
          <a href="#"><i class="fab fa-facebook-f"></i></a>
        </div>
      </div>

      <!-- LADO DIREITO -->
      <div class="about-image">
        <img src="" alt="Marketing Illustration" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
.about-section {
  background-color: #fff;
  padding: 100px 40px;
}

.about-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1280px;
  margin: 0 auto;
}

.about-text {
  flex: 1;
  min-width: 320px;
  max-width: 600px;
}

.about-subtitle {
  font-weight: bold;
  font-size: 0.95rem;
  color: #111;
  margin-bottom: 12px;
  display: block;
}

.about-title {
  font-size: 2.8rem;
  font-weight: 800;
  color: #0a0a23;
  margin-bottom: 24px;
  line-height: 1.2;
}

.highlight {
  color: #1d4ed8;
}

.about-paragraph {
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
  margin-bottom: 20px;
}

.link-purple {
  color: #a855f7;
  text-decoration: none;
}

.link-purple:hover {
  text-decoration: underline;
}

.about-link {
  display: inline-block;
  color: #1d4ed8;
  font-weight: 500;
  text-decoration: none;
  margin-top: 10px;
}

.social-icons {
  margin-top: 30px;
  display: flex;
  gap: 12px;
}

.social-icons a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  background-color: #f3f4f6;
  border-radius: 8px;
  transition: transform 0.3s ease;
  font-size: 18px;
  color: #1f2937;
  text-decoration: none;
}

.social-icons a:hover {
  transform: scale(1.1);
  background-color: #e5e7eb;
}

.about-image {
  flex: 1;
  min-width: 300px;
  text-align: center;
  padding-top: 40px;
}

.about-image img {
  max-width: 100%;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* Responsivo */
@media (max-width: 1024px) {
  .about-container {
    flex-direction: column;
    text-align: center;
  }

  .about-text,
  .about-image {
    max-width: 100%;
  }

  .about-title {
    font-size: 2rem;
  }
}
</style>
