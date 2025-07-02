<template>
  <!-- TIMELINE SECTION -->
  <section id="timeline" class="timeline-section">
    <div class="section-title">
      <h2>Trajetória de carreira</h2>
      <p>Acompanhe a evolução da minha trajetória na área de tecnologia, desde meus estudos iniciais até minhas experiências profissionais mais recentes.</p>
    </div>

    <div class="timeline-items">
      <!-- Yup Chat -->
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-date">2025 - Atual</div>
        <div class="timeline-content">
          <h3>Software Junior Developer</h3>
          <div class="company">Yup Chat</div>
          <p>Atualmente trabalho na Yup Chat, onde estou aprimorando minhas habilidades em desenvolvimento Full-Stack. Colaboro com equipes multidisciplinares para criar soluções tecnológicas inovadoras e escaláveis.</p>
          <div class="skills">
            <span class="skill-tag">Vue.js</span>
            <span class="skill-tag">Node.js</span>
            <span class="skill-tag">JavaScript</span>
            <span class="skill-tag">SQL</span>
            <span class="skill-tag">PHP</span>
          </div>
        </div>
      </div>

      <!-- Yup Chat - Suporte TI -->
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-date">2024</div>
        <div class="timeline-content">
          <h3>Suporte TI</h3>
          <div class="company">Yup Chat</div>
          <p>Atuei na área de suporte de TI, resolvendo problemas técnicos, atendendo às necessidades dos usuários e garantindo o funcionamento adequado dos sistemas. Esta experiência me proporcionou um entendimento mais profundo das necessidades dos usuários finais.</p>
          <div class="skills">
            <span class="skill-tag">Suporte Técnico</span>
            <span class="skill-tag">Resolução de Problemas</span>
            <span class="skill-tag">Banco de Dados</span>
            <span class="skill-tag">Atendimento ao Cliente</span>
          </div>
        </div>
      </div>

      <!-- Formação ADS -->
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-date">2022 - 2024</div>
        <div class="timeline-content">
          <h3>Análise e Desenvolvimento de Sistemas</h3>
          <div class="company">Unisanta</div>
          <p>Concluí minha formação superior em Análise e Desenvolvimento de Sistemas na Unisanta, onde adquiri conhecimentos sólidos em programação, banco de dados, análise de sistemas e metodologias de desenvolvimento de software.</p>
          <div class="skills">
            <span class="skill-tag">Programação</span>
            <span class="skill-tag">Banco de Dados</span>
            <span class="skill-tag">Engenharia de Software</span>
            <span class="skill-tag">Metodologias Ágeis</span>
          </div>
        </div>
      </div>

      <!-- Yup Chat - Estagiário -->
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-date">2021 - 2024</div>
        <div class="timeline-content">
          <h3>Estagiário</h3>
          <div class="company">Yup Chat</div>
          <p>Iniciei minha jornada profissional na Yup Chat como estagiário, onde pude aplicar os conhecimentos adquiridos na faculdade e desenvolver minhas habilidades práticas em um ambiente empresarial real, participando de projetos e aprendendo com profissionais experientes.</p>
          <div class="skills">
            <span class="skill-tag">Desenvolvimento Web</span>
            <span class="skill-tag">Front-end</span>
            <span class="skill-tag">HTML/CSS</span>
            <span class="skill-tag">JavaScript</span>
            <span class="skill-tag">Trabalho em Equipe</span>
          </div>
        </div>
      </div>

      <!-- Curso Técnico -->
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-date">2019 - 2021</div>
        <div class="timeline-content">
          <h3>Técnico em Jogos Digitais</h3>
          <div class="company">ETEC</div>
          <p>Durante o ensino médio, cursei o técnico em Jogos Digitais na ETEC, onde tive meu primeiro contato com programação e desenvolvimento de software. Esta experiência foi fundamental para definir minha trajetória na área de tecnologia.</p>
          <div class="skills">
            <span class="skill-tag">Lógica de Programação</span>
            <span class="skill-tag">Game Design</span>
            <span class="skill-tag">Fundamentos de Desenvolvimento</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted } from 'vue';

export default {
  name: 'Timeline',
  setup() {
    onMounted(() => {
      const timelineItems = document.querySelectorAll('.timeline-item');

      function checkVisibility() {
        timelineItems.forEach(item => {
          const rect = item.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight - 100;

          if (isVisible) {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }
        });
      }

      // Inicializa estilos
      timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'all 0.8s ease';
      });

      // Verifica visibilidade inicial
      checkVisibility();

      // Escuta rolagem da página
      window.addEventListener('scroll', checkVisibility);
    });
  }
};
</script>


<style scoped>
.timeline-section {
   background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  min-height: 100vh;
  padding: 100px 15px;
}

.timeline-section .section-title {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 70px;
}

.timeline-section .section-title h2 {
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 20px;
  position: relative;
}

.timeline-section .section-title h2:after {
  content: '';
  position: absolute;
  width: 50px;
  height: 4px;
  background: var(--gradient-blue);
  bottom: -10px;
  left: 0;
  right: 0;
  margin: 0 auto;
}

.timeline-items {
  max-width: 1000px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  position: relative;
}

.timeline-items::before {
  content: '';
  position: absolute;
  width: 2px;
  height: 100%;
  background: var(--gradient-blue);
  left: calc(50% - 1px);
}

.timeline-item {
  margin-bottom: 40px;
  width: 100%;
  position: relative;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-item:nth-child(odd) {
  padding-right: calc(50% + 30px);
  text-align: right;
}

.timeline-item:nth-child(even) {
  padding-left: calc(50% + 30px);
}

.timeline-dot {
  height: 16px;
  width: 16px;
  background: var(--gradient-blue);
  position: absolute;
  left: calc(50% - 8px);
  border-radius: 50%;
  top: 10px;
}

.timeline-date {
  font-size: 18px;
  color: var(--color-white);
  margin: 6px 0 15px;
  font-weight: 600;
}

.timeline-content {
  background-color: var(--color-white);
  padding: 30px;
  border-radius: 5px;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
}

.timeline-content:hover {
  transform: translateY(-5px);
}

.timeline-content h3 {
  font-size: 20px;
  background: var(--gradient-blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 10px;
  text-transform: capitalize;
  font-weight: 700;
}

.timeline-content .company {
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 10px;
  color: #666;
}

.timeline-content p {
  color: #555;
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
}

.timeline-content .skills {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  background: transparent !important;
  gap: 8px;
}

.fundo-project-timeline {
  background: linear-gradient(0deg,rgba(242, 242, 242, 1) 48%, rgba(183, 212, 230, 1) 62%, rgba(142, 191, 222, 1) 84%);
}

.btn-trajetoria {
  width: 50% !important;
  font-size: 1rem !important;
  background-color: var(--color-white) !important;
  color: var(--first-color) !important;
  border: 1px solid var(--color-white) !important;
  border-radius: 1rem;
  padding: 0.5rem;
  text-decoration: none;
  font-family: 'Ubuntu', sans-serif;
  font-weight: 600;
}

.timeline-content .skill-tag {
  background-color: #e9ecef;
  color: #495057;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 20px;
  display: inline-block;
}
</style>