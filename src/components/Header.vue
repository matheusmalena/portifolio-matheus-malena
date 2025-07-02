<template>
  <header :class="['header', { scrolled: isScrolled }]">
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
       <a class="btn-whatsapp  mobile" href="http://wa.me/5513996958183" target="_blank" rel="noopener noreferrer"> Fale comigo</a>
    </nav>

    <div>
          <a class="btn-whatsapp  desktop" href="http://wa.me/5513996958183" target="_blank" rel="noopener noreferrer"> <i class="fab fa-whatsapp"></i>  Fale comigo</a>
        </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isOpen: false,
      isScrolled: false
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    closeMenu() {
      this.isOpen = false;
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 20;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style scoped>

/* -------- HEADER -------- */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 60px;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  transition: background-color 0.3s ease;
}

.header {
  background-color: transparent;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: none;
}

.header.scrolled {
  background-color: var(--color-black);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
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

.btn-whatsapp {
  padding: 0.6rem 1.2rem;
  background-color: #25D366;
  text-decoration: none;
  border: none;
  border-radius: 2rem;
  color: white;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 2px 8px rgba(37, 211, 102, 0.3);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.btn-whatsapp:hover {
  background-color: #24c25e; /* Cor mais escura no hover */
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
}

.btn-whatsapp:active {
  transform: translateY(0);
  box-shadow: 0 2px 5px rgba(37, 211, 102, 0.3);
}

.btn-whatsapp::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: 0.5s;
}

.btn-whatsapp:hover::before {
  left: 100%;
}

.icon-wpp {
  width: 1.2rem;
  height: 1.2rem;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.1));
  transition: transform 0.3s ease;
}

.btn-whatsapp:hover .icon-wpp {
  transform: scale(1.1) rotate(5deg);
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
