<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-brand">
        <a href="#" class="logo">
          <img src="../assets/logo-nova.png" alt="Matheus Malena" class="logo-image" />
        </a>
        <!-- <p class="footer-tagline">Desenvolvedor Full Stack criando experiências digitais inovadoras.</p> -->
      </div>

      <div class="footer-divider"></div>

      <div class="footer-bottom">
        <p class="copyright">&copy; 2026 Matheus Malena. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
};
</script>

<style scoped>
.footer {
  background: var(--background-dark);
  border-top: 1px solid var(--border);
  padding: 4rem 5% 2rem;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-brand {
  text-align: center;
  margin-bottom: 2rem;
}

.logo {
  display: inline-block;
  text-decoration: none;
  margin-bottom: 1rem;
}

.logo-image {
  height: 60px;
  width: auto;
}

.footer-tagline {
  color: var(--text-muted);
  font-size: 1rem;
  max-width: 400px;
  margin: 0 auto;
}

.footer-divider {
  height: 1px;
  background: var(--border);
  margin: 2rem 0;
}

.footer-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
}

.copyright {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .footer {
    padding: 3rem 5% 1.5rem;
  }

  .logo-image {
    height: 50px;
  }
}
</style>
