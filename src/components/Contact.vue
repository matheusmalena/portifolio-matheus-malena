<template>
  <section id="contact" class="contact-section">
    <h2 class="contact-title">Fale Conosco</h2>
    <p class="contact-description">
      Entre em contato agora mesmo e vamos criar algo incrível juntos.
    </p>
    <a 
      href="https://wa.me/seunumerowhatsapp" 
      target="_blank" 
      class="contact-button"
    >
      Chamar no WhatsApp
    </a>
  </section>
</template>

<script>
export default {
  name: 'Contact'
};
</script>

<style scoped>
/* -------- CONTACT SECTION -------- */
.contact-section {
  padding: 100px 40px;
  background-color: var(--color-black);
  text-align: center;
}

.contact-title {
  color: var(--color-blue);
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 30px;
  position: relative;
}

.contact-title::after {
  content: '';
  display: block;
  width: 70px;
  height: 4px;
  background-color: var(--color-purple);
  margin: 10px auto 0;
  border-radius: 10px;
}

.contact-description {
  color: var(--color-gray);
  max-width: 700px;
  margin: 0 auto 40px;
  font-size: 1.1rem;
  line-height: 1.7;
}

.contact-button {
  display: inline-block;
  padding: 14px 40px;
  background-color: var(--color-purple);
  color: var(--color-white);
  border-radius: 50px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease;
}

.contact-button:hover {
  background-color: #5b21b6;
  transform: translateY(-4px) scale(1.03);
  box-shadow: 0 8px 20px rgba(124, 58, 237, 0.4);
}

/* -------- RESPONSIVO -------- */
@media (max-width: 768px) {
  .contact-title {
    font-size: 2.2rem;
  }

  .contact-description {
    font-size: 1rem;
  }
}
</style>
