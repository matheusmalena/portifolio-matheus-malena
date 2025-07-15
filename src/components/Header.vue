<template>
  <header :class="['header', { scrolled: isScrolled || isOpen }]">
    <!-- Logo -->
    <div class="logo">
      <a class="portfolio-title" href="#">Portfo<span>lio</span></a>
    </div>

    <!-- Navegação principal -->
    <nav :class="['nav', { open: isOpen }]">
      <div class="nav-links">
        <router-link to="/" class="nav-link" @click="closeMenu">{{ $t('header.home') }}</router-link>
        <router-link to="/#services" class="nav-link" @click="closeMenu">{{ $t('header.services') }}</router-link>
        <router-link to="/#about" class="nav-link" @click="closeMenu">{{ $t('header.about') }}</router-link>
        <router-link to="/#skills" class="nav-link" @click="closeMenu">{{ $t('header.skills') }}</router-link>
        <router-link to="/#projects" class="nav-link" @click="closeMenu">{{ $t('header.projects') }}</router-link>
        <router-link to="/#certificates" class="nav-link" @click="closeMenu">{{ $t('header.certificates') }}</router-link>
        <router-link to="/#timeline" class="nav-link" @click="closeMenu">{{ $t('header.timeline') }}</router-link>
        <router-link to="/#contact" class="nav-link" @click="closeMenu">{{ $t('header.contact') }}</router-link>
      </div>
      
      <!-- Botão WhatsApp mobile -->
      <a class="btn-whatsapp mobile" href="http://wa.me/5513996958183" target="_blank" rel="noopener noreferrer">
        {{ $t('header.talk_to_me') }}
      </a>
    </nav>

    <!-- Área de ações (direita) -->
    <div class="header-actions">
      <!-- Dropdown de idioma (desktop) -->
      <OptLangDropdown class="lang-dropdown-desktop" />
      
      <!-- Botão WhatsApp desktop -->
      <a class="btn-whatsapp desktop" href="http://wa.me/5513996958183" target="_blank" rel="noopener noreferrer">
        <i class="fab fa-whatsapp"></i> {{ $t('header.talk_to_me') }}
      </a>
      
      <!-- Menu hamburger -->
      <button class="hamburger" @click="toggleMenu">
        <span :class="{ open: isOpen }"></span>
        <span :class="{ open: isOpen }"></span>
        <span :class="{ open: isOpen }"></span>
      </button>
    </div>
  </header>
</template>

<script>
import OptLangDropdown from './OptLangDropdown.vue';

export default {
  name: 'Header',
  components: {
    OptLangDropdown
  },
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
/* -------- VARIÁVEIS -------- */
:root {
  --color-black: #0a0a0a;
  --color-white: #ffffff;
  --color-purple: #8a2be2;
  --gradient-blue: linear-gradient(90deg, rgba(195, 236, 254, 1) 1%, rgba(70, 130, 180, 1) 38%, rgba(195, 236, 254, 1) 70%);
}

/* -------- HEADER -------- */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 5%;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  background-color: transparent;
}

.header.scrolled {
  background-color: var(--color-black);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0);
  padding: 20px 5%;
}

.logo {
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--color-purple);
  cursor: pointer;
  transition: transform 0.3s ease;
  z-index: 1100;
}

.logo span {
  background: var(--gradient-blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.logo:hover {
  transform: scale(1.05);
}

/* -------- NAVIGATION -------- */
.nav {
  display: flex;
  align-items: center;
  gap: 40px;
}

.nav-links {
  display: flex;
  gap: 25px;
}

.nav-link {
  color: var(--color-white);
  text-decoration: none;
  position: relative;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s ease;
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
  background: var(--gradient-blue);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.nav-link:hover::after {
  width: 100%;
}

/* -------- HEADER ACTIONS -------- */
.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.lang-dropdown-desktop {
  margin-left: 10px;
}

/* -------- WHATSAPP BUTTON -------- */
.btn-whatsapp {
  padding: 0.6rem 1.2rem;
  background-color: #23c45e;
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
  background-color: #24c25e;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
}

.btn-whatsapp:active {
  transform: translateY(0);
}

.btn-whatsapp::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: 0.5s;
}

.btn-whatsapp:hover::before {
  left: 100%;
}

.btn-whatsapp i {
  transition: transform 0.3s ease;
}

.btn-whatsapp:hover i {
  transform: scale(1.1) rotate(5deg);
}

.desktop {
  display: flex;
}

.mobile {
  display: none;
}

/* -------- HAMBURGER MENU -------- */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1100;
  padding: 5px;
}

.hamburger span {
  width: 25px;
  height: 3px;
  background-color: var(--color-white);
  transition: all 0.3s ease;
  border-radius: 2px;
}

.hamburger span.open:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger span.open:nth-child(2) {
  opacity: 0;
}

.hamburger span.open:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* -------- RESPONSIVE DESIGN -------- */
@media (max-width: 1024px) {
  .nav-links {
    gap: 15px;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 16px 20px;
  }
  
  .header-actions {
    gap: 15px;
  }
  
  .nav {
    position: fixed;
    top: -10px;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--color-black);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    transform: translateY(-100%);
    transition: transform 0.3s ease;
    z-index: 1000;
    padding-top: 80px;
  }
  
  .nav.open {
    transform: translateY(0);
  }
  
  .nav-links {
    flex-direction: column;
    align-items: center;
    gap: 25px;
  }
  
  .hamburger {
    display: flex;
  }
  
  .lang-dropdown-desktop {
    display: none;
  }
  
  .desktop {
    display: none;
  }
  
  .mobile {
    display: flex;
    margin-top: 20px;
  }
  
  /* Dropdown de idiomas no mobile */
  .header-actions::before {
    content: '';
    display: block;
    position: absolute;
    right: 60px;
    top: 50%;
    transform: translateY(-50%);
  }
  
  .header-actions {
    position: relative;
  }
}

@media (max-width: 480px) {
  .logo {
    font-size: 1.5rem;
  }
  
  .header-actions::before {
    right: 50px;
  }
}
</style>