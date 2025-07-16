<template>
  <!-- TIMELINE SECTION -->
  <section id="timeline" class="timeline-section">
    <div class="section-title">
      <h2>{{ $t("timeline.title") }}</h2>
      <p>{{ $t("timeline.description") }}</p>
    </div>

    <div class="timeline-items">
      <!-- Yup Chat - Software Junior Developer -->
      <div class="timeline-item">
        <div class="timeline-dot"></div>
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
        <div class="timeline-date">2021 - 2023</div>
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
  </section>
</template>

<script>
import { onMounted } from "vue";

export default {
  name: "Timeline",
  setup() {
    onMounted(() => {
      const timelineItems = document.querySelectorAll(".timeline-item");

      function checkVisibility() {
        timelineItems.forEach((item) => {
          const rect = item.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight - 100;

          if (isVisible) {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
          }
        });
      }

      // Inicializa estilos
      timelineItems.forEach((item) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(50px)";
        item.style.transition = "all 0.8s ease";
      });

      // Verifica visibilidade inicial
      checkVisibility();

      // Escuta rolagem da página
      window.addEventListener("scroll", checkVisibility);
    });
  },
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
  content: "";
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
  content: "";
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
  background: linear-gradient(
    0deg,
    rgba(242, 242, 242, 1) 48%,
    rgba(183, 212, 230, 1) 62%,
    rgba(142, 191, 222, 1) 84%
  );
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
  font-family: "Ubuntu", sans-serif;
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

@media (max-width: 768px) {
  .timeline-items::before {
    left: 8px;
  }

  .timeline-item {
    padding-left: 30px !important;
    padding-right: 0 !important;
    text-align: left !important;
  }

  .timeline-dot {
    left: 0;
  }

  .timeline-content {
    padding: 20px;
  }

  .timeline-content h3 {
    font-size: 18px;
  }

  .timeline-date {
    font-size: 16px;
  }

  .timeline-section .section-title h2 {
    font-size: 28px;
  }

  .timeline-content p {
    font-size: 14px;
  }

  .timeline-content .skills {
    justify-content: flex-start;
  }
}
</style>
