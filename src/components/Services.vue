<template>
  <section id="services" class="services-section" ref="servicesSection">
    <div class="section-bg">
      <div class="bg-glow glow-1"></div>
      <div class="bg-glow glow-2"></div>
      <div class="bg-grid"></div>
    </div>

    <div class="container">
      <div class="section-header">
        <div class="badge">{{ $t('services.subtitle') }}</div>
        <h2 class="section-title" v-html="$t('services.title').replace('\n', '<br />')"></h2>
        <p class="section-subtitle">{{ $t('services.description') }}</p>
      </div>

      <div class="services-grid">
        <div 
          v-for="(service, index) in services" 
          :key="index" 
          class="service-card"
          :ref="el => serviceCards[index] = el"
        >
          <div class="card-content">
            <div class="card-icon">
              <i :class="service.icon"></i>
              <div class="icon-glow"></div>
            </div>
            <h3 class="card-title">{{ service.title }}</h3>
            <p class="card-description">{{ service.description }}</p>
            <div class="card-footer">
              <span class="tag">{{ service.tag }}</span>
              <div class="card-line"></div>
            </div>
          </div>
          <div class="card-border"></div>
        </div>
      </div>

      <div class="cta-section">
        <button @click="redirectToWhatsapp" class="cta-button">
          <span class="cta-text">{{ $t('services.button') }}</span>
          <span class="cta-icon">
            <i class="fas fa-arrow-right"></i>
          </span>
          <div class="cta-shimmer"></div>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const servicesSection = ref(null)
const serviceCards = ref([])

const services = [
  {
    icon: 'fas fa-code',
    title: 'Software Developer',
    description: 'Desenvolvimento de soluções completas com tecnologias modernas do mercado.',
    tag: 'Full Stack'
  },
  {
    icon: 'fas fa-globe',
    title: 'Sites Profissionais',
    description: 'Sites rápidos, modernos e pensados para conversão. Presença digital que gera credibilidade e atrai clientes.',
    tag: 'Web'
  },
  {
    icon: 'fas fa-bullseye',
    title: 'Marketing Digital',
    description: 'Estratégias completas de marketing digital para aumentar a presença e visibilidade da sua marca.',
    tag: 'Digital'
  },
  {
    icon: 'fa-solid fa-chart-line',
    title: 'Tráfego Pago',
    description: 'Gestão inteligente de campanhas patrocinadas para maximizar conversões e resultados.',
    tag: 'Ads'
  },
  {
    icon: 'fas fa-robot',
    title: 'Automações',
    description: 'Automatize processos e reduza trabalho manual. Chatbots, fluxos de atendimento e rotinas inteligentes.',
    tag: 'Automação'
  },
  {
    icon: 'fas fa-cogs',
    title: 'Sistemas Personalizados',
    description: 'Soluções sob medida para organizar e escalar seu negócio. Painéis, CRMs e ERPs do jeito que você precisa.',
    tag: 'Sistemas'
  }
]

function redirectToWhatsapp() {
  window.open('http://wa.me/5513996958183', '_blank')
}

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
}

const observerCallback = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in')
    }
  })
}

let observer = null

onMounted(() => {
  observer = new IntersectionObserver(observerCallback, observerOptions)
  if (servicesSection.value) {
    observer.observe(servicesSection.value)
  }
  
  serviceCards.value.forEach((card, index) => {
    if (card) {
      card.style.transitionDelay = `${index * 0.1}s`
      observer.observe(card)
    }
  })
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.services-section {
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
  right: -100px;
}

.glow-2 {
  width: 400px;
  height: 400px;
  background: var(--secondary);
  bottom: -100px;
  left: -100px;
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
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
}

.section-header {
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
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 800;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.section-subtitle {
  font-size: 1.15rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.7;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 4rem;
}

.service-card {
  position: relative;
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.service-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.card-content {
  background: var(--surface);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 1;
}

.service-card:hover .card-content {
  background: var(--surface-light);
  border-color: rgba(14, 165, 233, 0.3);
  transform: translateY(-8px);
}

.card-border {
  position: absolute;
  inset: 0;
  border-radius: var(--radius-xl);
  background: var(--gradient-primary);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 0;
  filter: blur(20px);
  transform: scale(0.95);
}

.service-card:hover .card-border {
  opacity: 0.3;
}

.card-icon {
  position: relative;
  width: 64px;
  height: 64px;
  background: var(--gradient-primary);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: transform 0.4s ease;
}

.card-icon i {
  font-size: 1.5rem;
  color: white;
  position: relative;
  z-index: 1;
}

.icon-glow {
  position: absolute;
  inset: 0;
  background: var(--gradient-primary);
  border-radius: inherit;
  filter: blur(15px);
  opacity: 0.4;
  transition: opacity 0.4s ease;
}

.service-card:hover .card-icon {
  transform: scale(1.1) rotate(5deg);
}

.service-card:hover .icon-glow {
  opacity: 0.6;
  transform: scale(1.3);
}

.card-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
  transition: color 0.3s ease;
}

.service-card:hover .card-title {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.card-description {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.7;
  flex: 1;
  margin-bottom: 1.5rem;
}

.card-footer {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}

.tag {
  background: rgba(14, 165, 233, 0.1);
  border: 1px solid rgba(14, 165, 233, 0.3);
  padding: 6px 14px;
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--primary-light);
}

.card-line {
  flex: 1;
  height: 2px;
  background: linear-gradient(90deg, var(--border) 0%, transparent 100%);
  border-radius: 1px;
}

.cta-section {
  text-align: center;
}

.cta-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 36px;
  background: var(--gradient-primary);
  color: white;
  border: none;
  border-radius: var(--radius-full);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.4s ease;
  box-shadow: 0 4px 20px rgba(14, 165, 233, 0.3);
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(14, 165, 233, 0.4);
}

.cta-icon {
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.cta-button:hover .cta-icon {
  transform: translateX(4px);
}

.cta-icon i {
  font-size: 0.85rem;
}

.cta-shimmer {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transition: left 0.6s ease;
}

.cta-button:hover .cta-shimmer {
  left: 100%;
}

@media (max-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .services-section {
    padding: 80px 5%;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .card-content {
    padding: 1.5rem;
  }

  .cta-button {
    width: 100%;
    justify-content: center;
  }
}
</style>
