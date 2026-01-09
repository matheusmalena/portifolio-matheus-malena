<template>
  <header :class="['header', { scrolled: isScrolled || isOpen }]">
    <!-- Logo -->
    <div class="logo">
      <a class="portfolio-title" href="#">Portfo<span>lio</span></a>
    </div>

    <!-- Navegação principal -->
    <nav :class="['nav', { open: isOpen }]" @click="closeMenuOnOutsideClick">
      <div :class="['nav-links', { scrolled: isScrolled || isOpen }]">
        <router-link 
          to="/" 
          class="nav-link" 
          :class="{ 'nav-link-active': isHomeActive }" 
          @click="handleLinkClick($event, '/')"
          data-text="Home"
        >
          {{ $t('header.home') }}
        </router-link>

        <router-link 
          to="/#services" 
          class="nav-link" 
          :class="{ 'nav-link-active': isHashActive('#services') }"
          @click="handleLinkClick($event, '/#services')"
          data-text="Services"
        >
          {{ $t('header.services') }}
        </router-link>

        <router-link 
          to="/#about" 
          class="nav-link" 
          :class="{ 'nav-link-active': isHashActive('#about') }"
          @click="handleLinkClick($event, '/#about')"
          :data-text="$t('header.about')"
        >
          {{ $t('header.about') }}
        </router-link>

        <router-link 
          to="/#projects" 
          class="nav-link" 
          :class="{ 'nav-link-active': isHashActive('#projects') }"
          @click="handleLinkClick($event, '/#projects')"
          :data-text="$t('header.projects')"
        >
          {{ $t('header.projects') }}
        </router-link>

        <router-link 
          to="/#timeline" 
          class="nav-link" 
          :class="{ 'nav-link-active': isHashActive('#timeline') }"
          @click="handleLinkClick($event, '/#timeline')"
          :data-text="$t('header.timeline')"
        >
          {{ $t('header.timeline') }}
        </router-link>

        <router-link 
          to="/#contact" 
          class="nav-link" 
          :class="{ 'nav-link-active': isHashActive('#contact') }"
          @click="handleLinkClick($event, '/#contact')"
          :data-text="$t('header.contact')"
        >
          {{ $t('header.contact') }}
        </router-link>
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
      <button class="hamburger" @click="toggleMenu" :aria-label="isOpen ? 'Close menu' : 'Open menu'">
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
      isScrolled: false,
      activeLinkIndex: 0,
      indicatorWidth: 0,
      indicatorLeft: 0,
      isMobile: false,
      lastActiveLink: null
    };
  },
  computed: {
    isHomeActive() {
      return this.$route.path === '/' && (!this.$route.hash || this.$route.hash === '');
    },
    indicatorStyle() {
      return {
        width: `${this.indicatorWidth}px`,
        left: `${this.indicatorLeft}px`,
        opacity: this.indicatorWidth > 0 ? 1 : 0
      };
    }
  },
  methods: {
    isHashActive(hash) {
      return this.$route.path === '/' && this.$route.hash === hash;
    },
    
    handleLinkClick(event, route) {
      const link = event.currentTarget;
      this.updateIndicator(link);
      this.closeMenu();
      
      // Adiciona efeito de clique
      link.classList.add('clicked');
      setTimeout(() => {
        link.classList.remove('clicked');
      }, 300);
    },
    
    updateIndicator(activeLink) {
      if (this.isMobile || !activeLink) return;
      
      const links = document.querySelectorAll('.nav-link');
      const index = Array.from(links).indexOf(activeLink);
      
      if (index !== -1) {
        this.activeLinkIndex = index;
        const linkRect = activeLink.getBoundingClientRect();
        const navRect = activeLink.parentElement.getBoundingClientRect();
        
        this.indicatorWidth = linkRect.width;
        this.indicatorLeft = linkRect.left - navRect.left;
      }
    },
    
    toggleMenu() {
      this.isOpen = !this.isOpen;
      document.body.style.overflow = this.isOpen ? 'hidden' : '';
      
      if (!this.isOpen) {
        // Adiciona efeito de fechamento suave
        setTimeout(() => {
          const links = document.querySelectorAll('.nav-link');
          links.forEach(link => link.classList.remove('menu-open'));
        }, 300);
      } else {
        // Adiciona efeito de abertura sequencial
        setTimeout(() => {
          const links = document.querySelectorAll('.nav-link');
          links.forEach((link, index) => {
            setTimeout(() => {
              link.classList.add('menu-open');
            }, index * 50);
          });
        }, 100);
      }
    },
    
    closeMenu() {
      if (this.isOpen) {
        this.isOpen = false;
        document.body.style.overflow = '';
        
        // Remove classes de animação
        setTimeout(() => {
          const links = document.querySelectorAll('.nav-link');
          links.forEach(link => link.classList.remove('menu-open'));
        }, 300);
      }
    },
    
    closeMenuOnOutsideClick(event) {
      if (this.isOpen && event.target.classList.contains('nav')) {
        this.closeMenu();
      }
    },
    
    handleScroll() {
      this.isScrolled = window.scrollY > 20;
      
      // Atualiza o indicador baseado na posição da página
      if (!this.isMobile) {
        const links = document.querySelectorAll('.nav-link');
        let activeLink = null;
        
        links.forEach(link => {
          if (link.classList.contains('nav-link-active')) {
            activeLink = link;
          }
        });
        
        if (activeLink) {
          this.updateIndicator(activeLink);
        }
      }
    },
    
    checkMobile() {
      this.isMobile = window.innerWidth <= 768;
      if (!this.isMobile) {
        this.closeMenu();
      }
    },
    
    handleRouteChange() {
      // Aguarda a renderização dos links
      this.$nextTick(() => {
        const links = document.querySelectorAll('.nav-link');
        links.forEach(link => {
          if (link.classList.contains('nav-link-active') && link !== this.lastActiveLink) {
            this.updateIndicator(link);
            this.lastActiveLink = link;
          }
        });
      });
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.checkMobile);
    
    // Inicializa o estado mobile
    this.checkMobile();
    
    // Inicializa o indicador
    this.$nextTick(() => {
      const activeLink = document.querySelector('.nav-link-active');
      if (activeLink) {
        this.updateIndicator(activeLink);
        this.lastActiveLink = activeLink;
      }
    });
    
    // Observa mudanças de rota
    this.$watch(() => this.$route, this.handleRouteChange, { immediate: true });
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.checkMobile);
    document.body.style.overflow = '';
  }
};
</script>

<style scoped>
/* -------- VARIÁVEIS -------- */
:root {
  --color-black: #0a0a0a;
  --color-white: #ffffff;
  --color-purple: #8a2be2;
  --color-light-purple: rgba(138, 43, 226, 0.1);
  --gradient-blue: linear-gradient(90deg, rgba(195, 236, 254, 1) 1%, rgba(70, 130, 180, 1) 38%, rgba(195, 236, 254, 1) 70%);
  --gradient-purple: linear-gradient(135deg, #8a2be2, #4a00e0);
  --glass-bg: rgba(255, 255, 255, 0.05);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
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
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: transparent;
  backdrop-filter: blur(0px);
}

.header.scrolled {
  background: linear-gradient(135deg, #0a0a0a 0%, #0f172a 100%);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  padding: 15px 5%;
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
  position: relative;
}

.logo:hover {
  transform: scale(1.05);
}

.logo:hover span {
  animation: gradientShift 2s ease infinite;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* -------- NAVIGATION -------- */
.nav {
  display: flex;
  align-items: center;
  gap: 40px;
  position: relative;
}

.nav-links {
  display: flex;
  background: #171718;
  gap: 0;
  padding: 0.4rem;
  border: 1px solid var(--glass-border);
  box-shadow: 0 0 32px 2px rgba(43, 92, 226, 0.375);
  border-radius: 2rem;
  backdrop-filter: blur(4px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.nav-links.scrolled {
  box-shadow: 0 0 32px 2px rgba(43, 92, 226, 0.375);
  border-radius: 2rem;
  backdrop-filter: blur(8px);
}

/* Indicador de item ativo */
.nav-indicator {
  position: absolute;
  bottom: -5px;
  height: 3px;
  background: var(--gradient-blue);
  border-radius: 2px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
  pointer-events: none;
}

.nav-link {
  color: var(--color-white);
  text-decoration: none;
  position: relative;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  border-radius: 999px;
  padding: 0.6rem 1.2rem;
  overflow: hidden;
  z-index: 1;
}

/* Efeito de fundo animado */
.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: var(--gradient-blue);
  transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
  border-radius: 999px;
}

.nav-link:hover::before {
  left: 0;
}

.nav-link:hover {
  color: var(--color-black);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(70, 130, 180, 0.4);
}

/* Efeito de clique */
.nav-link.clicked {
  animation: clickEffect 0.3s ease;
  transform: scale(0.95);
}

@keyframes clickEffect {
  0% { transform: scale(1); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
}

/* Link ativo */
.nav-link-active {
  background: var(--gradient-blue);
  color: var(--color-black);
  font-weight: 600;
  box-shadow: 
    0 6px 20px rgba(70, 130, 180, 0.45),
    inset 0 0 0 1px rgba(255, 255, 255, 0.35);
  animation: pulseActive 2s ease infinite;
}

@keyframes pulseActive {
  0%, 100% { box-shadow: 0 6px 20px rgba(70, 130, 180, 0.45); }
  50% { box-shadow: 0 6px 25px rgba(70, 130, 180, 0.6); }
}

/* Efeito de texto flutuante */
.nav-link::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-blue);
  color: var(--color-black);
  border-radius: 999px;
  transform: translateY(100%);
  opacity: 0;
  transition: all 0.3s ease;
  font-weight: 600;
}

.nav-link:hover::after {
  transform: translateY(0);
  opacity: 1;
}

/* -------- HEADER ACTIONS -------- */
.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.lang-dropdown-desktop {
  margin-left: 10px;
  transition: transform 0.3s ease;
}

.lang-dropdown-desktop:hover {
  transform: translateY(-2px);
}

/* -------- WHATSAPP BUTTON -------- */
.btn-whatsapp {
  padding: 0.6rem 1.2rem;
  background: linear-gradient(135deg, #25D366, #128C7E);
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
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.btn-whatsapp::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: 0.5s;
}

.btn-whatsapp:hover::before {
  left: 100%;
}

.btn-whatsapp:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
}

.btn-whatsapp:active {
  transform: translateY(-1px) scale(1.02);
}

.btn-whatsapp i {
  transition: all 0.3s ease;
}

.btn-whatsapp:hover i {
  transform: scale(1.2) rotate(10deg);
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
  padding: 8px;
  border-radius: 50%;
  transition: background 0.3s ease;
}

.hamburger:hover {
  background: rgba(255, 255, 255, 0.1);
}

.hamburger span {
  width: 25px;
  height: 3px;
  background-color: var(--color-white);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 2px;
  transform-origin: center;
}

.hamburger span.open:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.hamburger span.open:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.hamburger span.open:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
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
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: linear-gradient(135deg, rgba(10, 10, 10, 0.98), rgba(20, 20, 40, 0.98));
    backdrop-filter: blur(20px);
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 0;
    transform: translateY(-100%);
    opacity: 0;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1000;
    padding-top: 100px;
    overflow-y: auto;
  }

  .nav.open {
    transform: translateY(0);
    opacity: 1;
  }

  .nav-links {
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 90%;
    max-width: 300px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    margin-top: 20px;
  }

  .nav-link {
    width: 100%;
    text-align: center;
    border-radius: 12px;
    padding: 15px 20px;
    margin: 5px 0;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .nav-link.menu-open {
    opacity: 1;
    transform: translateY(0);
  }

  .nav-link:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 10px 30px rgba(70, 130, 180, 0.3);
  }

  .nav-link-active {
    animation: mobilePulse 2s ease infinite;
  }

  @keyframes mobilePulse {
    0%, 100% { box-shadow: 0 8px 25px rgba(70, 130, 180, 0.4); }
    50% { box-shadow: 0 8px 30px rgba(70, 130, 180, 0.6); }
  }

  .nav-link::after {
    display: none;
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
    margin: 30px 0;
    width: 80%;
    max-width: 250px;
    justify-content: center;
    font-size: 1rem;
    padding: 14px 24px;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.5s ease 0.8s forwards;
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Efeito de entrada sequencial para os links */
  .nav-link:nth-child(1).menu-open { transition-delay: 0.1s; }
  .nav-link:nth-child(2).menu-open { transition-delay: 0.2s; }
  .nav-link:nth-child(3).menu-open { transition-delay: 0.3s; }
  .nav-link:nth-child(4).menu-open { transition-delay: 0.4s; }
  .nav-link:nth-child(5).menu-open { transition-delay: 0.5s; }
  .nav-link:nth-child(6).menu-open { transition-delay: 0.6s; }
}

@media (max-width: 480px) {
  .logo {
    font-size: 1.5rem;
  }

  .nav-link {
    padding: 14px 18px;
    font-size: 1rem;
  }

  .mobile {
    padding: 12px 20px;
    font-size: 0.95rem;
  }
}

/* Animações globais */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>