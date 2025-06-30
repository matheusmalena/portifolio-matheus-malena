<template>
  <section class="projects-section">
    <div class="projects-header">
      <p class="subtitle">Agência de Marketing Digital</p>
      <h2 class="title">Nossos projetos</h2>
      <p class="description">
        Destacamos alguns projetos marcantes assinados pela nossa
        <strong>Agência de Marketing Digital</strong> e que proporcionaram grandes resultados.
      </p>
      <a href="" class="more-projects-link"><strong>Conheça mais projetos</strong></a>
      <router-link to="/projects" class="contact-link">Fale com um de nossos especialistas</router-link>
    </div>

    <div class="projects-grid">
      <div class="project-card" v-for="(project, index) in projects" :key="index">
        <img :src="project.img" :alt="project.title" class="project-image" />
        <div v-if="project.tag" class="project-tag">{{ project.tag }}</div>
        <h3 class="project-title">{{ project.title }}</h3>
      </div>
    </div>
  </section>
</template>

<script setup>
import imgProjeto1 from '../assets/img/projeto1.jpg';
import imgProjeto2 from '../assets/img/projeto2.jpg';
import imgProjeto3 from '../assets/img/projeto3.jpg';
import imgProjeto4 from '../assets/img/projeto4.jpg';
import imgProjeto5 from '../assets/img/projeto5.jpg';
import imgProjeto6 from '../assets/img/projeto6.jpg';

const projects = [
  {
    img: imgProjeto1,
    title: '',
    tag: 'Website',
  },
  {
    img: imgProjeto2,
    title: '',
    tag: 'Website',
  },
  {
    img: imgProjeto3,
    title: 'UP Vendas',
    tag: 'Website',
  },
  {
    img: imgProjeto4,
    title: '',
    tag: 'Website',
  },
  {
    img: imgProjeto5,
    title: '',
    tag: 'Website',
  },
  {
    img: imgProjeto6,
    title: '',
    tag: 'Website',
  },
]
</script>

<style>
.projects-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  color: var(--color-white);
}

.projects-header {
  max-width: 600px;
  margin-bottom: 3rem;
}

.subtitle {
  font-size: 0.9rem;
  color: var(--color-gray);
  margin-bottom: 0.2rem;
}

.title {
  font-size: 2.5rem;
  margin: 0 0 0.6rem 0;
  font-weight: 700;
  color: var(--color-purple);
}

.description {
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  color: var(--color-white);
}

.more-projects-link {
  font-size: 1rem;
  color: var(--color-purple);
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease;
}

.more-projects-link:hover {
  color: var(--color-purple);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem 1rem;
}

.project-card {
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.project-card:hover {
  transform: scale(1.03);
}

.project-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
  border-radius: 4px;
}

/* Tag do projeto, como o "website" na imagem */
.project-tag {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(255 255 255 / 0.8);
  color: var(--color-black);
  font-size: 0.7rem;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 600;
  pointer-events: none;
}

/* Título branco sobre imagem - só para o projeto com título na foto */
.project-title {
  position: absolute;
  bottom: 12px;
  left: 12px;
  color: var(--color-white);
  font-size: 1.3rem;
  font-weight: 500;
  text-shadow: 1px 1px 4px rgba(0,0,0,0.8);
  pointer-events: none;
}
</style>
