<template>
  <section class="skills" id="skills">
    <div class="section-bg">
      <div class="bg-glow glow-1"></div>
      <div class="bg-glow glow-2"></div>
      <div class="bg-grid"></div>
    </div>

    <div class="container">
      <div class="section-header">
        <div class="badge">Minhas Skills</div>
        <h2 class="section-title" v-html="$t('skills.title')"></h2>
        <p class="section-subtitle">{{ $t("skills.subtitle") }}</p>
      </div>

      <div class="skills-content">
        <div class="skills-grid">
          <div 
            v-for="(skill, index) in skills" 
            :key="index" 
            class="skill-card"
          >
            <div class="skill-icon-wrapper">
              <img :src="skill.icon" :alt="skill.name" class="skill-icon" />
            </div>
            <span class="skill-name">{{ skill.name }}</span>
            <div class="skill-glow"></div>
          </div>
        </div>
      </div>
    </div>
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
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg",
        },
        {
          name: "JavaScript",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
        },
        {
          name: "TypeScript",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
        },
        {
          name: "HTML5",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
        },
        {
          name: "PHP",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
        },
        {
          name: "CSS3",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
        },
        {
          name: "Bootstrap",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg",
        },
        {
          name: "Tailwind",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original-wordmark.svg",
        },
        {
          name: "Node.js",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
        },
        {
          name: "Express",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
        },
        {
          name: "PostgreSQL",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
        },
        {
          name: "MongoDB",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
        },
        {
          name: "Git",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
        },
        {
          name: "Docker",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
        },
        {
          name: "Linux",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
        },
        {
          name: "Python",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
        },
        {
          name: "Vite",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
        },
        {
          name: "Firebase",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",
        },
      ],
    };
  },
};
</script>

<style scoped>
.skills {
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
  filter: blur(100px);
  opacity: 0.3;
}

.glow-1 {
  width: 400px;
  height: 400px;
  background: var(--primary);
  top: -100px;
  left: -100px;
}

.glow-2 {
  width: 350px;
  height: 350px;
  background: var(--secondary);
  bottom: -100px;
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
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.skills-content {
  position: relative;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1.5rem;
}

.skill-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 1.5rem 1rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.skill-card:hover {
  transform: translateY(-8px);
  border-color: rgba(14, 165, 233, 0.4);
  background: var(--surface-light);
}

.skill-icon-wrapper {
  width: 64px;
  height: 64px;
  background: var(--background-card);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s ease;
}

.skill-card:hover .skill-icon-wrapper {
  background: var(--gradient-primary);
  transform: scale(1.1);
}

.skill-icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
  transition: filter 0.3s ease;
}

.skill-card:hover .skill-icon {
  filter: brightness(0) invert(1);
}

.skill-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-align: center;
  transition: color 0.3s ease;
}

.skill-card:hover .skill-name {
  color: var(--primary-light);
}

.skill-glow {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--gradient-primary);
  opacity: 0;
  filter: blur(20px);
  transition: opacity 0.4s ease;
  z-index: -1;
}

.skill-card:hover .skill-glow {
  opacity: 0.15;
}

@media (max-width: 768px) {
  .skills {
    padding: 80px 5%;
  }

  .skills-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 1rem;
  }

  .skill-card {
    padding: 1.2rem 0.8rem;
  }

  .skill-icon-wrapper {
    width: 56px;
    height: 56px;
  }

  .skill-icon {
    width: 32px;
    height: 32px;
  }

  .skill-name {
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .skills-grid {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 0.8rem;
  }
}
</style>
