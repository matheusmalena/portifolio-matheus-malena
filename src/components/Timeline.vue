<template>
  <section id="timeline" class="timeline-section" ref="timelineSection">
    <div class="section-bg">
      <div class="bg-glow glow-1"></div>
      <div class="bg-glow glow-2"></div>
      <div class="bg-grid"></div>
    </div>

    <div class="container">
      <div class="section-header">
        <div class="badge">Trajetória</div>
        <h2 class="section-title">{{ $t("timeline.title") }}</h2>
        <p class="section-subtitle">{{ $t("timeline.description") }}</p>
      </div>

      <div class="timeline">
        <div class="timeline-line"></div>

        <div class="timeline-item" v-for="(item, index) in timelineItems" :key="index">
          <div class="timeline-node">
            <div class="node-dot"></div>
            <div class="node-ring"></div>
          </div>
          <div class="timeline-card">
            <div class="card-header">
              <span class="timeline-date">{{ item.date }}</span>
              <div class="card-accent"></div>
            </div>
            <h3 class="card-title">{{ $t(item.titleKey) }}</h3>
            <div class="card-company">{{ $t(item.companyKey) }}</div>
            <p class="card-description">{{ $t(item.descKey) }}</p>
            <div class="card-skills">
              <span v-for="skill in item.skills" :key="skill" class="skill-tag">{{ skill }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted, onBeforeUnmount, ref } from "vue";

export default {
  name: "Timeline",
  setup() {
    const timelineSection = ref(null);
    let observer = null;

    const timelineItems = ref([
      {
        date: "2026 - Atual",
        titleKey: "timeline.jobs.software_dev_pleno.title",
        companyKey: "timeline.jobs.software_dev_pleno.company",
        descKey: "timeline.jobs.software_dev_pleno.description",
        skills: ["Vue.js", "Node.js", "JavaScript", "SQL", "PHP", "Scrum", "Kanban"],
      },
      {
        date: "2025 - 2026",
        titleKey: "timeline.jobs.software_dev.title",
        companyKey: "timeline.jobs.software_dev.company",
        descKey: "timeline.jobs.software_dev.description",
        skills: ["Vue.js", "Node.js", "JavaScript", "SQL", "PHP", "Scrum", "Kanban"],
      },
      {
        date: "2024",
        titleKey: "timeline.jobs.support.title",
        companyKey: "timeline.jobs.support.company",
        descKey: "timeline.jobs.support.description",
        skills: ["Suporte TI", "Resolução de Problemas", "Banco de Dados", "Atendimento"],
      },
      {
        date: "2022 - 2023",
        titleKey: "timeline.jobs.internship.title",
        companyKey: "timeline.jobs.internship.company",
        descKey: "timeline.jobs.internship.description",
        skills: ["Desenvolvimento Web", "Front-end", "HTML/CSS", "JavaScript", "Trabalho em Equipe"],
      },
      {
        date: "2022 - 2024",
        titleKey: "timeline.jobs.college.title",
        companyKey: "timeline.jobs.college.company",
        descKey: "timeline.jobs.college.description",
        skills: ["Programação", "Banco de Dados", "Engenharia de Software", "Metodologias Ágeis"],
      },
      {
        date: "2019 - 2021",
        titleKey: "timeline.jobs.technical_course.title",
        companyKey: "timeline.jobs.technical_course.company",
        descKey: "timeline.jobs.technical_course.description",
        skills: ["Lógica de Programação", "Game Design", "Fundamentos de Desenvolvimento"],
      },
    ]);

    onMounted(() => {
      const items = document.querySelectorAll(".timeline-item");

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
      );

      items.forEach((el) => observer.observe(el));

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
      timelineSection,
      timelineItems,
    };
  },
};
</script>

<style scoped>
.timeline-section {
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
  opacity: 0.3;
}

.glow-1 {
  width: 500px;
  height: 500px;
  background: var(--primary);
  top: 10%;
  left: -100px;
}

.glow-2 {
  width: 400px;
  height: 400px;
  background: var(--secondary);
  bottom: 10%;
  right: -100px;
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
  max-width: 900px;
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
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.15rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

/* -------- TIMELINE -------- */
.timeline {
  position: relative;
  padding: 20px 0;
}

.timeline-line {
  position: absolute;
  left: 24px;
  top: 0;
  bottom: 0;
  width: 2px;
  background-image: repeating-linear-gradient(
    to bottom,
    var(--primary) 0px,
    var(--primary) 8px,
    transparent 8px,
    transparent 16px
  );
  opacity: 0.5;
}

.timeline-line::before {
  content: '';
  position: absolute;
  left: -3px;
  top: 0;
  bottom: 0;
  width: 8px;
  background-image: repeating-linear-gradient(
    to bottom,
    rgba(14, 165, 233, 0.2) 0px,
    rgba(14, 165, 233, 0.2) 8px,
    transparent 8px,
    transparent 16px
  );
  filter: blur(4px);
}

/* -------- ITEM -------- */
.timeline-item {
  position: relative;
  padding-left: 70px;
  margin-bottom: 3rem;
  opacity: 0;
  transform: translateX(-30px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.timeline-item:nth-child(even) {
  transform: translateX(30px);
}

.timeline-item.is-visible {
  opacity: 1;
  transform: translateX(0);
}

.timeline-item:last-child {
  margin-bottom: 0;
}

/* -------- NODE -------- */
.timeline-node {
  position: absolute;
  left: 14px;
  top: 30px;
  width: 22px;
  height: 22px;
}

.node-dot {
  position: absolute;
  inset: 0;
  background: var(--gradient-primary);
  border-radius: 50%;
  z-index: 2;
  transition: transform 0.3s ease;
}

.timeline-item.is-visible .node-dot {
  animation: nodeAppear 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes nodeAppear {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

.node-ring {
  position: absolute;
  inset: -6px;
  border: 2px solid var(--primary);
  border-radius: 50%;
  opacity: 0.4;
  animation: ringPulse 3s ease-in-out infinite;
}

@keyframes ringPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.4;
  }
  50% {
    transform: scale(1.3);
    opacity: 0;
  }
}

.timeline-item:nth-child(1) .node-ring {
  animation-delay: 0s;
}

.timeline-item:nth-child(2) .node-ring {
  animation-delay: 0.5s;
}

.timeline-item:nth-child(3) .node-ring {
  animation-delay: 1s;
}

.timeline-item:nth-child(4) .node-ring {
  animation-delay: 1.5s;
}

.timeline-item:nth-child(5) .node-ring {
  animation-delay: 2s;
}

.timeline-item:nth-child(6) .node-ring {
  animation-delay: 2.5s;
}

/* -------- CARD -------- */
.timeline-card {
  background: var(--surface);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 1.8rem 2rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.timeline-card:hover {
  border-color: rgba(14, 165, 233, 0.3);
  transform: translateX(8px);
  box-shadow: 0 10px 40px rgba(14, 165, 233, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1rem;
}

.timeline-date {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--primary-light);
  background: rgba(14, 165, 233, 0.1);
  border: 1px solid rgba(14, 165, 233, 0.2);
  padding: 6px 16px;
  border-radius: var(--radius-full);
  white-space: nowrap;
}

.card-accent {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, var(--border) 0%, transparent 100%);
}

.card-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.card-company {
  display: inline-block;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.card-description {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 1.2rem;
}

.card-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  background: rgba(14, 165, 233, 0.08);
  border: 1px solid rgba(14, 165, 233, 0.15);
  color: var(--primary-light);
  font-size: 0.8rem;
  font-weight: 500;
  padding: 5px 12px;
  border-radius: var(--radius-full);
  transition: all 0.3s ease;
}

.skill-tag:hover {
  background: rgba(14, 165, 233, 0.15);
  border-color: rgba(14, 165, 233, 0.3);
  transform: translateY(-2px);
}

/* -------- RESPONSIVE -------- */
@media (max-width: 768px) {
  .timeline-section {
    padding: 80px 5%;
  }

  .timeline-line {
    left: 18px;
  }

  .timeline-item {
    padding-left: 55px;
    margin-bottom: 2rem;
  }

  .timeline-node {
    left: 8px;
    width: 20px;
    height: 20px;
  }

  .timeline-card {
    padding: 1.5rem;
  }

  .card-title {
    font-size: 1.2rem;
  }

  .card-description {
    font-size: 0.9rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .timeline-item,
  .node-dot,
  .node-ring,
  .timeline-card {
    transition: none !important;
    animation: none !important;
  }
}
</style>
