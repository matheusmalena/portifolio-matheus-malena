<script setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { ref, onMounted, onUnmounted } from 'vue';

const showScrollButton = ref(false);

const checkScroll = () => {
  showScrollButton.value = window.scrollY > 300;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

onMounted(() => {
  window.addEventListener('scroll', checkScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll);
});
</script>

<template>
  <Header />
  <router-view></router-view>
  <Footer />
  
  <!-- Botão Voltar ao Topo -->
  <button 
    v-if="showScrollButton" 
    @click="scrollToTop" 
    class="scroll-to-top"
    aria-label="Voltar ao topo"
  >
    <i class="fas fa-arrow-up"></i>
  </button>
</template>

<style scoped>
/* Estilos do botão Voltar ao Topo */
.scroll-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--gradient-blue);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 6px 20px rgba(58, 153, 237, 0.4);
  z-index: 999;
  opacity: 0.9;
  transition: all 0.3s ease;
}

.scroll-to-top:hover {
  opacity: 1;
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(58, 153, 237, 0.6);
}

.scroll-to-top i {
  transition: transform 0.3s ease;
}

.scroll-to-top:hover i {
  transform: translateY(-3px);
}

/* Responsividade */
@media (max-width: 768px) {
  .scroll-to-top {
    width: 45px;
    height: 45px;
    bottom: 20px;
    right: 20px;
  }
}
</style>