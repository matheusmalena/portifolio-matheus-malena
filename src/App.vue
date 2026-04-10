<script setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { ref, onMounted, onUnmounted } from 'vue';

const showScrollButton = ref(false);

const checkScroll = () => {
  showScrollButton.value = window.scrollY > 400;
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
.scroll-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: var(--gradient-primary);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 4px 20px rgba(14, 165, 233, 0.4);
  z-index: 999;
  transition: all 0.3s ease;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.scroll-to-top:hover {
  transform: translateY(-5px) scale(1.1);
  box-shadow: 0 8px 30px rgba(14, 165, 233, 0.5);
}

.scroll-to-top i {
  transition: transform 0.3s ease;
}

.scroll-to-top:hover i {
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .scroll-to-top {
    width: 45px;
    height: 45px;
    bottom: 20px;
    right: 20px;
  }
}
</style>
