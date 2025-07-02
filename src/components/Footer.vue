<template>
  <footer class="footer">
    <p>&copy; 2025 <span>Matheus Malena</span> — Todos os direitos reservados.</p>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
};
</script>

<style scoped>
/* -------- FOOTER -------- */
.footer {
  background-color: #111;
  padding: 20px 40px;
  text-align: center;
  color: var(--color-gray);
  font-size: 0.9rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.footer span {
  background: var(--gradient-blue);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 500;
}

/* Efeito suave no hover do texto opcional */
.footer:hover {
  background-color: #1a1a1a;
  transition: background-color 0.4s ease;
}
</style>
