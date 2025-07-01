<template>
  <header class="header">
    <div class="logo">
          <a class="portfolio-title" href="#">Portfo<span>lio</span></a>
        </div>

    <button class="hamburger" @click="toggleMenu">
      <span :class="{ open: isOpen }"></span>
      <span :class="{ open: isOpen }"></span>
      <span :class="{ open: isOpen }"></span>
    </button>

    <nav :class="['nav', { open: isOpen }]">
      <router-link to="/" class="nav-link" @click="closeMenu">Home</router-link>
      <router-link to="/#services" class="nav-link" @click="closeMenu">Serviços</router-link>
      <router-link to="/#about" class="nav-link" @click="closeMenu">Sobre</router-link>
      <router-link to="/#skills" class="nav-link" @click="closeMenu">Skills</router-link>
      <router-link to="/#projects" class="nav-link" @click="closeMenu">Projetos</router-link>
      <router-link to="/#certificates" class="nav-link" @click="closeMenu">Certificados</router-link>
       <router-link to="/#contact" class="nav-link" @click="closeMenu">Contato</router-link>
       <a class="btn-me mobile" href="http://wa.me/5513996958183" target="_blank" rel="noopener noreferrer"> <img
              class="icon-wpp" src="./src/img/whatsapp.png" alt=""> Fale comigo</a>
    </nav>

    <div>
          <a class="btn-me desktop" href="http://wa.me/5513996958183" target="_blank" rel="noopener noreferrer"> <img
              class="icon-wpp" src="./src/img/whatsapp.png" alt=""> Fale comigo</a>
        </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    closeMenu() {
      this.isOpen = false;
    }
  }
};
</script>

<style scoped>
/* -------- CORES -------- */
:root {
  --color-black: #000;
  --color-white: #fff;
  --color-purple: #7c3aed;
}

/* -------- HEADER -------- */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 60px;
  background-color: var(--color-black);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  transition: background-color 0.3s ease;
}

.logo {
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--color-purple);
  cursor: pointer;
  transition: transform 0.3s ease;
}

.logo span {
  background: linear-gradient(90deg, rgba(195, 236, 254, 1) 1%, rgba(70, 130, 180, 1) 38%, rgba(195, 236, 254, 1) 70%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.3s ease;
  display: inline-block;
  text-decoration: none;
  transition: color 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

/* -------- NAV -------- */
.nav {
  display: flex;
  gap: 40px;
}

.nav-link {
  color: var(--color-white);
  text-decoration: none;
  position: relative;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -6px;
  width: 0%;
  height: 2px;
  background-color: var(--color-purple);
  border-radius: 10px;
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: var(--color-purple);
}

.nav-link:hover::after {
  width: 100%;
}

/* -------- HAMBURGER -------- */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1100;
}

.hamburger span {
  width: 25px;
  height: 3px;
  background-color: var(--color-white);
  transition: 0.3s;
  border-radius: 2px;
}

.hamburger span.open:nth-child(1) {
  transform: rotate(45deg) translateY(8px);
}

.hamburger span.open:nth-child(2) {
  opacity: 0;
}

.hamburger span.open:nth-child(3) {
  transform: rotate(-45deg) translateY(-8px);
}

.btn-me-wpp, .btn-me {
  padding: 0.5rem !important;
  background-color: var(--color-white) !important;
  text-decoration: none;
  border: 1px solid var(--color-white) !important;
  border-radius: 1rem !important;
  color: var(--color-black) !important;
  font-family: 'Ubuntu', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.btn-me-wpp:hover, .btn-me:hover  {
  background-color: rgba(255, 255, 255, 0.95) !important; /* Mais claro */
  border: 1px solid rgba(255, 255, 255, 0.95) !important;
  transform: scale(1.05);
}

.mobile {
  display: none;
}

/* -------- RESPONSIVO -------- */
@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .desktop {
    display: none;
  }

  .mobile {
    display: block;
  }

  .header {
    display: flex;
    flex-direction: row;
  }

  .nav {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: var(--color-black);
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px 0;
    transition: max-height 0.3s ease, opacity 0.3s ease;
    pointer-events: none;
    opacity: 0;
  }

  .nav.open {
    transform: translateY(0);
    pointer-events: auto;
    opacity: 1;
    margin: 0;
  }
}
</style>
