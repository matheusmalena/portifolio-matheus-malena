<template>
  <section class="certificates-section" id="certificates" aria-label="Certificados de cursos e formações">
    <div class="container" data-aos="fade-up">
      <h2 class="title">Minhas <span>Conquistas</span></h2>

      <Swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="30"
        :pagination="{ clickable: true }"
        :navigation="true"
        class="certificates-carousel"
      >
        <SwiperSlide v-for="(certificate, index) in certificates" :key="index">
          <a :href="certificate.link" target="_blank" rel="noopener noreferrer">
            <img :src="certificate.image" :alt="certificate.alt" class="certificate-image" />
          </a>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// imagens
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
      modules: [Navigation, Pagination],
      certificates: [
        { image: certificateFacul, link: '#', alt: 'Certificado Faculdade' },
        { image: certificateVue, link: 'https://cursos.alura.com.br/degree/certificate/d69b699c-c9ed-4ec6-86d3-444713833708', alt: 'Vue.js' },
        { image: certificateJs, link: 'https://cursos.alura.com.br/degree/certificate/f36bf34c-fd7e-4326-9d59-45b03c4ff385', alt: 'JavaScript' },
        { image: certificateHtml, link: 'https://cursos.alura.com.br/degree/certificate/1244f4a2-7b6b-4cfa-a0e9-7a07bed262bb', alt: 'HTML' },
        { image: certificateGit, link: 'https://cursos.alura.com.br/certificate/e77a674a-4527-4715-95a4-71b145fce611', alt: 'Git e GitHub' },
        { image: certificateLinux, link: 'https://cursos.alura.com.br/degree/certificate/6f36049a-25b7-4b6a-ab98-42e3324faa3a', alt: 'Linux' },
        { image: certificateBootstrap, link: 'https://cursos.alura.com.br/degree/certificate/4a40261c-7c41-476f-8397-b67c1b830da0', alt: 'Bootstrap' },
        { image: certificatePc, link: 'https://cursos.alura.com.br/certificate/matheus-tew-one/arquitetura-computadores-funcionamento-programa', alt: 'Arquitetura de Computadores' },
        { image: certificateDns, link: 'https://cursos.alura.com.br/certificate/df42bfc0-c7d5-4cf4-b7a5-7e768eb1c281', alt: 'DNS' },
        { image: certificateJogo, link: 'https://cursos.alura.com.br/certificate/matheus-tew-one/logica-programacao-javascript-html', alt: 'Lógica de Programação' },
      ],
    };
  },
};
</script>

<style scoped>
.certificates-section {
  background: var(--gradient-blue);
  padding: 5rem 1rem;
  color: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
}

.title span {
  color: var(--accent-color);
}

.certificates-carousel {
  padding-bottom: 2rem;
}

.certificate-image {
  width: 100%;
  max-width: 600px;
  height: auto;
  margin: 0 auto;
  display: block;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.certificate-image:hover {
  transform: scale(1.05);
}
</style>
