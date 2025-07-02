<template>
  <section class="certificates-section" id="certificates" aria-label="Certificados e conquistas acadêmicas">
    <div class="container">
      <!-- Header com animação -->
      <div class="section-header" data-aos="fade-up">
        <h2 class="section-title">
          <span class="title-text">Minhas <span class="highlight-wrapper">
            <span class="highlight">Conquistas</span>
            <span class="highlight-accent"></span>
          </span></span>
        </h2>
        <p class="section-subtitle">Certificados que comprovam minha jornada de aprendizado contínuo</p>
      </div>

      <!-- Carrossel de certificados -->
      <div class="certificates-carousel-wrapper" data-aos="fade-up" data-aos-delay="100">
        <Swiper
          :modules="modules"
          :slides-per-view="2"
          :space-between="30"
          :pagination="{ clickable: true, dynamicBullets: true }"
          :navigation="{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }"
          :autoplay="{
            delay: 5000,
            disableOnInteraction: false
          }"
          :breakpoints="{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 2 }
          }"
          class="certificates-carousel"
        >
          <SwiperSlide v-for="(certificate, index) in certificates" :key="index">
            <div class="certificate-card">
              <a 
                :href="certificate.link" 
                target="_blank" 
                rel="noopener noreferrer"
                class="certificate-link"
                :aria-label="'Ver certificado de ' + certificate.alt"
              >
                <img 
                  :src="certificate.image" 
                  :alt="certificate.alt" 
                  class="certificate-image" 
                  loading="lazy"
                />
                <div class="certificate-overlay">
                  <div class="certificate-info">
                    <h3 class="certificate-title">{{ certificate.alt }}</h3>
                    <div class="certificate-cta">
                      Ver Certificado
                      <i class="fas fa-external-link-alt"></i>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </SwiperSlide>
          
          <!-- Navegação customizada -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </Swiper>
      </div>

      <!-- Contador de certificados -->
      <div class="certificates-counter" data-aos="fade-up" data-aos-delay="200">
        <span class="current-slide">1</span>
        <span class="divider">/</span>
        <span class="total-slides">{{ certificates.length }}</span>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// Importações das imagens
import certificateFacul from '../assets/img/facul.png';
import certificateVue from '../assets/img/vue.png';
import certificateJs from '../assets/img/certificado-js.png';
import certificateHtml from '../assets/img/certificado-html.png';
import certificateGit from '../assets/img/certificado-git.png';
import certificateLinux from '../assets/img/certificado-linux.png';
import certificateBootstrap from '../assets/img/certificado-bootstrap.png';
import certificatePc from '../assets/img/certificado-pc-funcionavel.png';
import certificateDns from '../assets/img/certificado-dns.png';
import certificateJogo from '../assets/img/certificado-jogo.png';

export default {
  name: 'Certificates',
  components: { Swiper, SwiperSlide },
  data() {
    return {
      modules: [Navigation, Pagination, Autoplay],
      certificates: [
        { 
          image: certificateFacul, 
          link: '#', 
          alt: 'Formação em Análise e Desenvolvimento de Sistemas',
          institution: 'Unisanta'
        },
        { 
          image: certificateVue, 
          link: 'https://cursos.alura.com.br/degree/certificate/d69b699c-c9ed-4ec6-86d3-444713833708', 
          alt: 'Formação Vue.js',
          institution: 'Alura'
        },
        { 
          image: certificateJs, 
          link: 'https://cursos.alura.com.br/degree/certificate/f36bf34c-fd7e-4326-9d59-45b03c4ff385', 
          alt: 'Formação JavaScript',
          institution: 'Alura'
        },
        { 
          image: certificateHtml, 
          link: 'https://cursos.alura.com.br/degree/certificate/1244f4a2-7b6b-4cfa-a0e9-7a07bed262bb', 
          alt: 'Formação HTML e CSS',
          institution: 'Alura'
        },
        { 
          image: certificateGit, 
          link: 'https://cursos.alura.com.br/certificate/e77a674a-4527-4715-95a4-71b145fce611', 
          alt: 'Git e GitHub',
          institution: 'Alura'
        },
        { 
          image: certificateLinux, 
          link: 'https://cursos.alura.com.br/degree/certificate/6f36049a-25b7-4b6a-ab98-42e3324faa3a', 
          alt: 'Linux',
          institution: 'Alura'
        },
        { 
          image: certificateBootstrap, 
          link: 'https://cursos.alura.com.br/degree/certificate/4a40261c-7c41-476f-8397-b67c1b830da0', 
          alt: 'Bootstrap',
          institution: 'Alura'
        },
        { 
          image: certificatePc, 
          link: 'https://cursos.alura.com.br/certificate/matheus-tew-one/arquitetura-computadores-funcionamento-programa', 
          alt: 'Arquitetura de Computadores',
          institution: 'Alura'
        },
        { 
          image: certificateDns, 
          link: 'https://cursos.alura.com.br/certificate/df42bfc0-c7d5-4cf4-b7a5-7e768eb1c281', 
          alt: 'DNS',
          institution: 'Alura'
        },
        { 
          image: certificateJogo, 
          link: 'https://cursos.alura.com.br/certificate/matheus-tew-one/logica-programacao-javascript-html', 
          alt: 'Lógica de Programação',
          institution: 'Alura'
        },
      ]
    };
  },
  mounted() {
    // Atualiza o contador de slides
    const swiper = document.querySelector('.certificates-carousel').swiper;
    const currentSlide = document.querySelector('.current-slide');
    const totalSlides = document.querySelector('.total-slides');
    
    totalSlides.textContent = this.certificates.length;
    
    swiper.on('slideChange', () => {
      currentSlide.textContent = swiper.realIndex + 1;
    });
  }
};
</script>

<style scoped>
.certificates-section {
  padding: 6rem 0;
  background: white;
  color: white;
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
}

/* Header Section */
.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
}

.title-text {
  background: var(--gradient-dark-blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.highlight-wrapper {
  position: relative;
  display: inline-block;
}

.highlight {
background: var(--gradient-dark-blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  z-index: 2;
}

.highlight-accent {
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
  height: 12px;
  background: rgba(74, 205, 240, 0.3);
  z-index: 1;
  border-radius: 4px;
  transform: rotate(-1deg);
}

.section-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Carrossel */
.certificates-carousel-wrapper {
  position: relative;
  padding: 0 3rem;
}

.certificate-card {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.certificate-link {
  display: block;
  height: 100%;
  position: relative;
}

.certificate-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.certificate-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 70%, transparent 100%);
  padding: 1.5rem;
  transform: translateY(100%);
  transition: transform 0.4s ease;
}

.certificate-card:hover .certificate-overlay {
  transform: translateY(0);
}

.certificate-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
}

.certificate-card:hover .certificate-image {
  transform: scale(1.05);
}

.certificate-info {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.certificate-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  color: white;
}

.certificate-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--accent-color);
  font-weight: 500;
  font-size: 0.9rem;
}

/* Navegação customizada */
.swiper-button-prev,
.swiper-button-next {
  color: var(--accent-color);
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.swiper-button-prev:hover,
.swiper-button-next:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.swiper-button-prev::after,
.swiper-button-next::after {
  font-size: 1rem;
  font-weight: bold;
}

/* Paginação customizada */
:deep(.swiper-pagination-bullet) {
  background: rgba(255, 255, 255, 0.5);
  opacity: 1;
  width: 10px;
  height: 10px;
  transition: all 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
  background: var(--accent-color);
  width: 30px;
  border-radius: 10px;
}

/* Contador de slides */
.certificates-counter {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
}

.current-slide {
  color: var(--accent-color);
  font-weight: 600;
}

.divider {
  opacity: 0.5;
}

/* Responsividade */
@media (max-width: 1024px) {
  .certificates-carousel-wrapper {
    padding: 0 2rem;
  }
  
  .certificate-image {
    height: 280px;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2.2rem;
  }
  
  .section-subtitle {
    font-size: 1rem;
  }
  
  .certificates-carousel-wrapper {
    padding: 0 1rem;
  }
  
  .certificate-overlay {
    padding: 1rem;
  }
  
  .certificate-title {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .certificates-section {
    padding: 4rem 0;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .certificate-image {
    height: 220px;
  }
  
  .swiper-button-prev,
  .swiper-button-next {
    width: 30px;
    height: 30px;
  }
}
</style>