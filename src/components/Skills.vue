<template>
  <section class="skills" id="skills">
    <div class="container">
      <div class="section-header" data-aos="fade-up">
        <h2 class="section-title" v-html="$t('skills.title')"></h2>
        <p class="section-subtitle">{{ $t("skills.subtitle") }}</p>
      </div>

      <div class="skills-content">
        <div class="skills-intro">
          <!-- <p>{{ $t("skills.description") }}</p> -->
        </div>

        <div class="skills-grid">
          <div v-for="(skill, index) in skills" :key="index" class="skill-card">
            <img :src="skill.icon" :alt="skill.name" class="skill-icon" />
            <span class="skill-name">{{ skill.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Background Elements (igual services) -->
    <div class="bg-grid"></div>
    <div class="bg-blur-1"></div>
    <div class="bg-blur-2"></div>
  </section>
</template>

<script>
export default {
  name: "SkillsSection",
  data() {
    return {
      skills: [
        {
          name: "Vue.js",
          icon:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg",
        },
        {
          name: "JavaScript",
          icon:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
        },
        {
          name: "TypeScript",
          icon:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
        },
        {
          name: "HTML5",
          icon:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
        },
        {
          name: "PHP",
          icon:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
        },
        {
          name: "CSS3",
          icon:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
        },
        {
          name: "Bootstrap",
          icon:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg",
        },
        {
          name: "Tailwind",
          icon:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original-wordmark.svg",
        },
        {
          name: "Node.js",
          icon:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
        },
        {
          name: "Express",
          icon:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
        },
        {
          name: "PostgreSQL",
          icon:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
        },
        {
          name: "MongoDB",
          icon:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
        },
        {
          name: "Git",
          icon:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
        },
        {
          name: "Docker",
          icon:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
        },
        {
          name: "Linux",
          icon:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
        },
        {
          name: "Python",
          icon:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
        },
        {
          name: "Vite",
          icon:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
        },
        {
          name: "Firebase",
          icon:
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",
        },
      ],
    };
  },
};
</script>

<style scoped>
.skills {
  padding: 5rem 0;
  background: linear-gradient(135deg, #0a0a0a 0%, #0f172a 100%);
  color: white;

  /* IMPORTANTE pro fundo */
  position: relative;
  overflow: hidden;
}

/* garante que seu conteúdo fique acima do fundo */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 2;
}

.section-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #fff;
}

.section-header p {
  font-size: 1.1rem;
  color: #94a3b8;
  max-width: 600px;
  margin: 0 auto;
}

.skills-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.skills-intro {
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
}

.skills-intro p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #e2e8f0;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.skill-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.3s ease;
}

.skill-card:hover {
  transform: translateY(-5px);
}

.skill-icon {
  width: 60px;
  height: 60px;
  object-fit: contain;
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.skill-card:hover .skill-icon {
  background: rgba(74, 205, 240, 0.1);
  transform: scale(1.1);
}

.skill-name {
  font-size: 0.9rem;
  font-weight: 500;
  color: #e2e8f0;
  text-align: center;
}

/* -------- BACKGROUND ELEMENTS (igual services) -------- */
.bg-grid {
  position: absolute;
  inset: 0;
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
  pointer-events: none;
}

/* -------- RESPONSIVO -------- */
@media (max-width: 768px) {
  .skills {
    padding: 3rem 0;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .skills-grid {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 1rem;
  }

  .skill-icon {
    width: 50px;
    height: 50px;
  }

  .section-title {
    font-size: 2.2rem;
  }
}

@media (max-width: 480px) {
  .section-header h2 {
    font-size: 1.8rem;
  }

  .section-header p,
  .skills-intro p {
    font-size: 1rem;
  }

  .skills-grid {
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
  }

  .section-title {
    font-size: 1.8rem;
  }
}
</style>
