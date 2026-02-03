<template>
  <!-- TIMELINE SECTION -->
  <section id="timeline" class="timeline-section" ref="timelineSection">
    <div class="section-title">
      <h2>{{ $t("timeline.title") }}</h2>
      <p>{{ $t("timeline.description") }}</p>
    </div>

    <div class="timeline-items">
      <!-- Yup Chat - Software Junior Developer -->
      <div class="timeline-item">
        <div class="timeline-date">
          2025 -
          {{ $t("timeline.jobs.software_dev.title") ? "Atual" : $t("timeline.current") }}
        </div>
        <div class="timeline-content">
          <h3>{{ $t("timeline.jobs.software_dev.title") }}</h3>
          <div class="company">{{ $t("timeline.jobs.software_dev.company") }}</div>
          <p>{{ $t("timeline.jobs.software_dev.description") }}</p>
          <div class="skills">
            <span class="skill-tag">Vue.js</span>
            <span class="skill-tag">Node.js</span>
            <span class="skill-tag">JavaScript</span>
            <span class="skill-tag">SQL</span>
            <span class="skill-tag">PHP</span>
            <span class="skill-tag">Scrum</span>
            <span class="skill-tag">Kanban</span>
            <span class="skill-tag">{{ $t("skills.agile_methodologies") }}</span>
          </div>
        </div>
      </div>

      <!-- Yup Chat - Suporte TI -->
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-date">2024</div>
        <div class="timeline-content">
          <h3>{{ $t("timeline.jobs.support.title") }}</h3>
          <div class="company">{{ $t("timeline.jobs.support.company") }}</div>
          <p>{{ $t("timeline.jobs.support.description") }}</p>
          <div class="skills">
            <span class="skill-tag">{{ $t("skills.technical_support") }}</span>
            <span class="skill-tag">{{ $t("skills.problem_solving") }}</span>
            <span class="skill-tag">{{ $t("skills.database") }}</span>
            <span class="skill-tag">{{ $t("skills.customer_service") }}</span>
          </div>
        </div>
      </div>

      <!-- Formação ADS -->
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-date">2022 - 2024</div>
        <div class="timeline-content">
          <h3>{{ $t("timeline.jobs.college.title") }}</h3>
          <div class="company">{{ $t("timeline.jobs.college.company") }}</div>
          <p>{{ $t("timeline.jobs.college.description") }}</p>
          <div class="skills">
            <span class="skill-tag">{{ $t("skills.programming") }}</span>
            <span class="skill-tag">{{ $t("skills.database") }}</span>
            <span class="skill-tag">{{ $t("skills.software_engineering") }}</span>
            <span class="skill-tag">{{ $t("skills.agile_methodologies") }}</span>
          </div>
        </div>
      </div>

      <!-- Yup Chat - Estagiário -->
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-date">2022 - 2023</div>
        <div class="timeline-content">
          <h3>{{ $t("timeline.jobs.internship.title") }}</h3>
          <div class="company">{{ $t("timeline.jobs.internship.company") }}</div>
          <p>{{ $t("timeline.jobs.internship.description") }}</p>
          <div class="skills">
            <span class="skill-tag">{{ $t("skills.web_development") }}</span>
            <span class="skill-tag">Front-end</span>
            <span class="skill-tag">HTML/CSS</span>
            <span class="skill-tag">JavaScript</span>
            <span class="skill-tag">{{ $t("skills.teamwork") }}</span>
          </div>
        </div>
      </div>

      <!-- Curso Técnico -->
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-date">2019 - 2021</div>
        <div class="timeline-content">
          <h3>{{ $t("timeline.jobs.technical_course.title") }}</h3>
          <div class="company">{{ $t("timeline.jobs.technical_course.company") }}</div>
          <p>{{ $t("timeline.jobs.technical_course.description") }}</p>
          <div class="skills">
            <span class="skill-tag">{{ $t("skills.logic_programming") }}</span>
            <span class="skill-tag">Game Design</span>
            <span class="skill-tag">{{ $t("skills.development_fundamentals") }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Background Elements adicionados -->
    <div class="bg-grid"></div>
    <div class="bg-blur-1"></div>
    <div class="bg-blur-2"></div>
  </section>
</template>

<script>
import { onMounted, onBeforeUnmount, ref } from "vue";

export default {
  name: "Timeline",
  setup() {
    const timelineSection = ref(null);
    let observer = null;

    onMounted(() => {
      const items = document.querySelectorAll(".timeline-item");

      // IntersectionObserver = animação suave + performance melhor que scroll listener
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target); // anima 1 vez
            }
          });
        },
        { threshold: 0.18, rootMargin: "0px 0px -80px 0px" }
      );

      items.forEach((el) => observer.observe(el));

      // Animação para a seção completa
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("section-visible");
            }
          });
        },
        { threshold: 0.1 }
      );

      if (timelineSection.value) {
        sectionObserver.observe(timelineSection.value);
      }
    });

    onBeforeUnmount(() => {
      if (observer) observer.disconnect();
    });

    return {
      timelineSection
    };
  },
};
</script>

<style scoped>
/* -------- VARIABLES -------- */
.timeline-section {
  --gradient-blue: linear-gradient(90deg, rgba(195, 236, 254, 1) 1%, rgba(70, 130, 180, 1) 38%, rgba(195, 236, 254, 1) 70%);
  --gradient-purple: linear-gradient(135deg, #8a2be2, #4a00e0);
  --color-black: #0a0a0a;
  --color-white: #ffffff;
}

/* -------- SECTION -------- */
.timeline-section {
  background: linear-gradient(135deg, #0a0a0a 0%, #0f172a 100%);
  min-height: 100vh;
  padding: 150px 40px;
  position: relative;
  overflow: hidden;
  color: white;
}

/* Background Elements adicionados */
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
  pointer-events: none;
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
  opacity: 0.6;
  pointer-events: none;
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
  opacity: 0.6;
  pointer-events: none;
}

/* brilho de fundo sutil adicional */
.timeline-section::before {
  content: "";
  position: absolute;
  inset: -40%;
  background: radial-gradient(circle, rgba(195, 236, 254, 0.08) 0%, transparent 55%);
  filter: blur(120px);
  pointer-events: none;
  z-index: 0;
}

.timeline-section .section-title {
  text-align: center;
  max-width: 760px;
  margin: 0 auto 100px;
  position: relative;
  z-index: 2;
}

.timeline-section .section-title h2 {
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 25px;
  position: relative;
  letter-spacing: -0.02em;
  color: var(--color-white);
  background: var(--gradient-blue);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.timeline-section.section-visible .section-title h2 {
  opacity: 1;
  transform: translateY(0);
}

.timeline-section .section-title h2::after {
  content: "";
  position: absolute;
  width: 100px;
  height: 5px;
  background: var(--gradient-blue);
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 4px;
  animation: underlinePulse 3s ease-in-out infinite;
  box-shadow: 0 10px 28px rgba(70, 130, 180, 0.28);
}

@keyframes underlinePulse {
  0%, 100% { width: 100px; }
  50% { width: 150px; }
}

.timeline-section .section-title p {
  color: #94a3b8;
  font-size: 1.3rem;
  line-height: 1.8;
  font-weight: 300;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
}

.timeline-section.section-visible .section-title p {
  opacity: 1;
  transform: translateY(0);
}

/* -------- TIMELINE LAYOUT -------- */
.timeline-items {
  max-width: 1200px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  z-index: 2;
}

/* linha central com glow */
.timeline-items::before {
  content: "";
  position: absolute;
  width: 4px;
  height: 100%;
  left: calc(50% - 2px);
  top: 0;
  background: linear-gradient(180deg, 
    transparent 0%,
    var(--gradient-blue) 15%,
    var(--gradient-blue) 85%,
    transparent 100%
  );
  opacity: 0.6;
  filter: blur(0.4px);
  box-shadow: 0 0 30px rgba(70, 130, 180, 0.35);
  pointer-events: none;
  z-index: 1;
}

/* item */
.timeline-item {
  margin-bottom: 80px;
  width: calc(70% - 60px);
  position: relative;
  opacity: 0;
  transform: translateY(40px) scale(0.95);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* quando visível */
.timeline-item.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-item:nth-child(odd) {
  margin-left: auto;
  padding-right: 60px;
  text-align: right;
}

.timeline-item:nth-child(even) {
  margin-right: auto;
  padding-left: 60px;
}

.timeline-date {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 8px 0 20px;
  font-weight: 700;
  padding: 8px 20px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
   background: rgba(195, 236, 254, 0.15);
  border-color: rgba(195, 236, 254, 0.3);
  white-space: nowrap;
  display: inline-block;
  transition: all 0.3s ease;
}

.timeline-item:hover .timeline-date {
  background: rgba(195, 236, 254, 0.15);
  border-color: rgba(195, 236, 254, 0.3);
  color: #ffffff;
}

/* -------- CARD -------- */
.timeline-content {
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.02) 100%);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 40px 35px;
  border-radius: 24px;
  position: relative;
  z-index: 1;
  
  /* box-shadow da cor do gradient blue */
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(195, 236, 254, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* borda "glow" suave */
.timeline-content::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 24px;
  background: var(--gradient-blue);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

/* hover moderno */
.timeline-content:hover {
  transform: translateY(-15px);
  background: linear-gradient(135deg, 
    rgba(195, 236, 254, 0.1) 0%,
    rgba(70, 130, 180, 0.05) 100%);
  border-color: rgba(195, 236, 254, 0.3);
  box-shadow:
    0 30px 60px rgba(195, 236, 254, 0.2),
    0 0 0 1px rgba(195, 236, 254, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.timeline-content:hover::before {
  opacity: 0.1;
}

/* Glow effect para o card */
.timeline-content::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, 
    rgba(195, 236, 254, 0.15) 0%,
    transparent 70%);
  border-radius: 24px;
  opacity: 0;
  transition: opacity 0.5s ease;
  filter: blur(20px);
  z-index: -1;
}

.timeline-content:hover::after {
  opacity: 1;
  animation: glowPulse 2s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.7; }
}

.timeline-content h3 {
  font-size: 1.5rem;
  background: var(--gradient-blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 15px;
  text-transform: capitalize;
  font-weight: 700;
}

.timeline-content .company {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 15px;
  color: #0a0a0a;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  background: rgb(171, 221, 243);
  border-radius: 20px;
  border: 1px solid rgb(171, 221, 243);
}

.timeline-content p {
  color: #cbd5e1;
  font-size: 1.05rem;
  line-height: 1.7;
  margin: 0 0 20px;
}

/* tags */
.timeline-content .skills {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.timeline-content .skill-tag {
  background: linear-gradient(135deg, rgba(195, 236, 254, 0.1), rgba(70, 130, 180, 0.1));
  color: rgb(171, 221, 243);
  font-size: 0.9rem;
  padding: 8px 16px;
  border-radius: 20px;
  display: inline-block;
  border: 1px solid rgb(171, 221, 243);
  transition: all 0.3s ease;
}

.timeline-content .skill-tag:hover {
  background: linear-gradient(135deg, rgba(195, 236, 254, 0.2), rgba(70, 130, 180, 0.2));
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(195, 236, 254, 0.2);
}

/* acessibilidade: reduz animações se usuário preferir */
@media (prefers-reduced-motion: reduce) {
  .timeline-item,
  .timeline-content,
  .timeline-dot,
  .timeline-date {
    transition: none !important;
  }
  .timeline-content:hover,
  .timeline-item:hover .timeline-dot {
    transform: none !important;
  }
  .timeline-section .section-title h2,
  .timeline-section .section-title p {
    transition: none !important;
  }
}

/* -------- ANIMAÇÕES ADICIONAIS -------- */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.timeline-item.is-visible .timeline-content {
  animation: float 6s ease-in-out infinite;
}

.timeline-item:nth-child(2).is-visible .timeline-content {
  animation-delay: 1s;
}

.timeline-item:nth-child(3).is-visible .timeline-content {
  animation-delay: 2s;
}

.timeline-item:nth-child(4).is-visible .timeline-content {
  animation-delay: 3s;
}

.timeline-item:nth-child(5).is-visible .timeline-content {
  animation-delay: 4s;
}

/* -------- RESPONSIVE -------- */
@media (max-width: 1024px) {
  .timeline-section {
    padding: 100px 20px;
  }
  
  .timeline-items::before {
    left: 30px;
  }
  
  .timeline-item {
    width: calc(100% - 60px);
    margin-left: 60px !important;
    padding: 0 !important;
    text-align: left !important;
  }
  
  .timeline-dot {
    left: 30px;
  }
  
  .timeline-section .section-title h2 {
    font-size: 3rem;
  }
}

@media (max-width: 768px) {
  .timeline-section {
    padding: 80px 15px;
  }
  
  .timeline-items::before {
    left: 20px;
    width: 3px;
  }
  
  .timeline-item {
    width: calc(100% - 40px);
    margin-left: 40px !important;
    margin-bottom: 60px;
  }
  
  .timeline-dot {
    left: 20px;
    width: 20px;
    height: 20px;
  }
  
  .timeline-content {
    padding: 30px 25px;
  }
  
  .timeline-content h3 {
    font-size: 1.3rem;
  }
  
  .timeline-section .section-title h2 {
    font-size: 2.5rem;
  }
  
  .timeline-section .section-title p {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .timeline-section {
    padding: 60px 15px;
  }
  
  .timeline-section .section-title h2 {
    font-size: 2.2rem;
  }
  
  .timeline-item {
    width: calc(100% - 30px);
    margin-left: 30px !important;
  }
  
  .timeline-items::before {
    left: 15px;
  }
  
  .timeline-dot {
    left: 15px;
  }
  
  .timeline-content {
    padding: 25px 20px;
  }
  
  .skills {
    gap: 8px;
  }
  
  .skill-tag {
    font-size: 0.85rem;
    padding: 6px 12px;
  }
}
</style>