<template>
  <section id="services" class="services-section" ref="servicesSection">
    <div class="services-wrapper">
      <div class="services-info" ref="servicesInfo">
        <small class="services-subtitle">{{ $t('services.subtitle') }}</small>
        <h2 class="services-title" v-html="$t('services.title').replace('\n', '<br />')"></h2>
        <p class="services-description">{{ $t('services.description') }}</p>
        <button @click="redirectToWhatsapp" class="services-button">
          <span class="button-text">{{ $t('services.button') }}</span>
          <span class="button-icon">
            <i class="fas fa-arrow-right"></i>
          </span>
        </button>
      </div>

      <div class="services-cards">
        <div v-for="(service, index) in services" :key="index" class="service-card"
          :ref="el => serviceCards[index] = el" @mouseenter="handleCardHover(index)"
          @mouseleave="handleCardLeave(index)" :style="{ '--delay': index * 0.1 + 's' }">
          <div class="service-card-inner">
            <div class="service-icon-wrapper">
              <div class="service-icon">
                <i :class="service.icon"></i>
              </div>
              <div class="icon-backdrop" :class="'backdrop-' + index"></div>
            </div>
            <h3 class="service-card-title">{{ service.title }}</h3>
            <p class="service-card-desc">{{ service.description }}</p>
            <div class="service-card-footer">
              <span class="service-tag">{{ service.tag }}</span>
              <!-- <div class="service-arrow">
                <i class="fas fa-arrow-right"></i>
              </div> -->
            </div>
            <div class="service-hover-effect"></div>
          </div>
          <div class="card-glow"></div>
        </div>
      </div>
    </div>

    <!-- Background Elements -->
    <div class="bg-grid"></div>
    <div class="bg-blur-1"></div>
    <div class="bg-blur-2"></div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const servicesSection = ref(null)
const servicesInfo = ref(null)
const serviceCards = ref([])

const services = [
  {
    icon: 'fas fa-laptop-code',
    title: 'Projetos web',
    description: 'Design e desenvolvimento de projetos web: sites, landing pages, etc.',
    tag: 'Web'
  },
  {
    icon: 'fas fa-bullseye',
    title: 'Marketing digital',
    description: 'Planejamento e ações de marketing digital para aumentar a presença da sua marca.',
    tag: 'Marketing'
  },
  {
    icon: 'fa-solid fa-square-poll-vertical',
    title: 'Tráfego Pago',
    description: 'Gestão de campanhas patrocinadas para atrair clientes, aumentar conversões e impulsionar resultados.',
    tag: 'Ads'
  },
  {
    icon: 'fas fa-code-branch',
    title: 'Desenvolvedor Full Stack',
    description: 'Desenvolvimento de soluções web com tecnologias modernas e eficientes.',
    tag: 'Dev'
  }
]

function redirectToWhatsapp() {
  window.open('http://wa.me/5513996958183', '_blank')
}

function handleCardHover(index) {
  const card = serviceCards.value[index]
  if (card) {
    card.classList.add('hover-active')

    // Remove hover de outros cards
    serviceCards.value.forEach((c, i) => {
      if (c && i !== index) {
        c.classList.remove('hover-active')
        c.classList.add('other-hover')
      }
    })
  }
}

function handleCardLeave(index) {
  const card = serviceCards.value[index]
  if (card) {
    card.classList.remove('hover-active')

    // Remove estado de outros cards
    serviceCards.value.forEach(c => {
      if (c) {
        c.classList.remove('other-hover')
      }
    })
  }
}

// Animação de entrada
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
}

const observerCallback = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Anima o conteúdo de informações
      if (servicesInfo.value) {
        servicesInfo.value.classList.add('animate-in')
      }

      // Anima os cards sequencialmente
      serviceCards.value.forEach((card, index) => {
        if (card) {
          setTimeout(() => {
            card.classList.add('animate-in')
          }, index * 150)
        }
      })
    }
  })
}

let observer = null

onMounted(() => {
  observer = new IntersectionObserver(observerCallback, observerOptions)
  if (servicesSection.value) {
    observer.observe(servicesSection.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
/* -------- VARIABLES -------- */
.services-section {
  --gradient-blue: linear-gradient(90deg, rgba(195, 236, 254, 1) 1%, rgba(70, 130, 180, 1) 38%, rgba(195, 236, 254, 1) 70%);
  --gradient-purple: linear-gradient(135deg, #8a2be2, #4a00e0);
  --color-black: #0a0a0a;
  --color-white: #ffffff;
  --card-glow: 0 0 50px rgba(195, 236, 254, 0.1);
}

/* -------- SERVICES SECTION -------- */
.services-section {
  padding: 150px 40px;
  background: linear-gradient(135deg, #0a0a0a 0%, #0f172a 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.services-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 80px;
  align-items: start;
  position: relative;
  z-index: 2;
}

/* -------- SERVICES INFO -------- */
.services-info {
  text-align: left;
  opacity: 0;
  transform: translateX(-30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.services-info.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.services-subtitle {
  font-size: 1rem;
  color: #e7e7e7;
  margin-bottom: 15px;
  display: block;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.5s ease 0.1s;
}

.services-info.animate-in .services-subtitle {
  opacity: 1;
  transform: translateY(0);
}

.services-title {
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 30px;
  background: var(--gradient-blue);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;
  display: inline-block;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease 0.2s;
}

.services-info.animate-in .services-title {
  opacity: 1;
  transform: translateY(0);
}

.services-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 100px;
  height: 4px;
  background: var(--gradient-blue);
  border-radius: 2px;
  animation: underlinePulse 3s ease-in-out infinite;
}

@keyframes underlinePulse {

  0%,
  100% {
    width: 100px;
  }

  50% {
    width: 150px;
  }
}

.services-description {
  font-size: 1.3rem;
  line-height: 1.8;
  margin-bottom: 50px;
  color: #94a3b8;
  font-weight: 300;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease 0.3s;
}

.services-info.animate-in .services-description {
  opacity: 1;
  transform: translateY(0);
}

.services-button {
  background: var(--gradient-blue);
  color: var(--color-black);
  font-weight: 700;
  border: none;
  border-radius: 50px;
  padding: 18px 45px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  gap: 15px;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease 0.4s;
}

.services-info.animate-in .services-button {
  opacity: 1;
  transform: translateY(0);
}

.services-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: 0.5s;
}

.services-button:hover::before {
  left: 100%;
}

.services-button:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 20px 40px rgba(70, 130, 180, 0.4);
}

.button-icon {
  width: 24px;
  height: 24px;
  background: var(--color-black);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.services-button:hover .button-icon {
  transform: translateX(5px);
}

.button-icon i {
  font-size: 0.9rem;
  color: white;
}

/* -------- SERVICES CARDS -------- */
.services-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  position: relative;
}

.service-card {
  position: relative;
  opacity: 0;
  transform: translateY(40px) scale(0.95);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: var(--delay);
  perspective: 1000px;
}

.service-card.animate-in {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.service-card-inner {
  background: linear-gradient(135deg,
      rgba(255, 255, 255, 0.05) 0%,
      rgba(255, 255, 255, 0.02) 100%);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 40px 30px;
  border-radius: 24px;
  position: relative;
  z-index: 1;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  height: 100%;
}

.service-card.hover-active .service-card-inner {
  transform: translateY(-15px);
  background: linear-gradient(135deg,
      rgba(195, 236, 254, 0.1) 0%,
      rgba(70, 130, 180, 0.05) 100%);
  border-color: rgba(195, 236, 254, 0.3);
  box-shadow:
    0 20px 40px rgba(195, 236, 254, 0.15),
    0 0 0 1px rgba(195, 236, 254, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.service-card.other-hover .service-card-inner {
  filter: brightness(0.7);
  transform: scale(0.95);
}

.card-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center,
      rgba(195, 236, 254, 0.2) 0%,
      transparent 70%);
  border-radius: 24px;
  opacity: 0;
  transition: opacity 0.5s ease;
  filter: blur(20px);
  z-index: 0;
}

.service-card.hover-active .card-glow {
  opacity: 1;
  animation: glowPulse 2s ease-in-out infinite;
}

@keyframes glowPulse {

  0%,
  100% {
    opacity: 0.3;
  }

  50% {
    opacity: 0.6;
  }
}

.service-icon-wrapper {
  position: relative;
  width: 70px;
  height: 70px;
  margin-bottom: 25px;
}

.service-icon {
  width: 70px;
  height: 70px;
  background: var(--gradient-blue);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: var(--color-black);
  position: relative;
  z-index: 2;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.service-card.hover-active .service-icon {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 10px 30px rgba(195, 236, 254, 0.4);
}

.icon-backdrop {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 70px;
  height: 70px;
  border-radius: 20px;
  background: var(--gradient-blue);
  opacity: 0.2;
  filter: blur(15px);
  transition: all 0.4s ease;
}

.service-card.hover-active .icon-backdrop {
  transform: scale(1.2);
  opacity: 0.4;
}

.service-card-title {
  font-weight: 700;
  color: white;
  font-size: 1.4rem;
  margin-bottom: 15px;
  transition: all 0.3s ease;
}

.service-card.hover-active .service-card-title {
  background: var(--gradient-blue);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.service-card-desc {
  font-size: 1rem;
  line-height: 1.7;
  color: #94a3b8;
  margin-bottom: 25px;
  transition: all 0.3s ease;
}

.service-card.hover-active .service-card-desc {
  color: #cbd5e1;
}

.service-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.service-tag {
  background: rgba(224, 224, 224, 0.2);
  color: #fafafa;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.service-card.hover-active .service-tag {
  background: rgba(195, 236, 254, 0.2);
  color: #e0f2fe;
  border-color: rgba(195, 236, 254, 0.3);
}

.service-arrow {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.service-card.hover-active .service-arrow {
  background: var(--gradient-blue);
  transform: translateX(5px);
}

.service-arrow i {
  color: white;
  font-size: 1rem;
  transition: transform 0.3s ease;
}

.service-card.hover-active .service-arrow i {
  transform: translateX(3px);
}

.service-hover-effect {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent);
  transition: 0.8s;
}

.service-card.hover-active .service-hover-effect {
  left: 100%;
}

/* -------- BACKGROUND ELEMENTS -------- */
.bg-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.3;
  z-index: 1;
}

.bg-blur-1 {
  position: absolute;
  top: 20%;
  right: 10%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(195, 236, 254, 0.1) 0%, transparent 70%);
  filter: blur(60px);
  z-index: 1;
}

.bg-blur-2 {
  position: absolute;
  bottom: 20%;
  left: 10%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(138, 43, 226, 0.1) 0%, transparent 70%);
  filter: blur(80px);
  z-index: 1;
}

/* -------- RESPONSIVO -------- */
@media (max-width: 1200px) {
  .services-wrapper {
    gap: 50px;
  }

  .services-title {
    font-size: 3.5rem;
  }
}

@media (max-width: 1024px) {
  .services-wrapper {
    grid-template-columns: 1fr;
    gap: 60px;
  }

  .services-cards {
    margin-top: 0;
  }

  .services-title {
    font-size: 3rem;
  }
}

@media (max-width: 768px) {
  .services-section {
    padding: 100px 20px;
  }

  .services-cards {
    grid-template-columns: 1fr;
    gap: 25px;
  }

  .services-title {
    font-size: 2.5rem;
  }

  .services-description {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .services-section {
    padding: 80px 15px;
  }

  .services-title {
    font-size: 2.2rem;
  }

  .service-card-inner {
    padding: 30px 20px;
  }

  .services-button {
    width: 100%;
    justify-content: center;
  }
}

/* -------- ANIMAÇÕES ADICIONAIS -------- */
@keyframes float {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-10px);
  }
}

.service-card {
  animation: float 6s ease-in-out infinite;
}

.service-card:nth-child(2) {
  animation-delay: 1s;
}

.service-card:nth-child(3) {
  animation-delay: 2s;
}

.service-card:nth-child(4) {
  animation-delay: 3s;
}

/* -------- SCROLL ANIMATION -------- */
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--gradient-blue);
  transform-origin: left;
  transform: scaleX(0);
  z-index: 9999;
}
</style>