<template>
  <header :class="['header', { scrolled: isScrolled || isOpen }]">
    <div class="header-container">
      <a href="#" class="logo">Portfo<span>lio</span></a>

      <nav :class="['nav', { open: isOpen }]">
        <div class="nav-links">
          <router-link 
            to="/" 
            class="nav-link" 
            :class="{ 'active': isHomeActive }" 
            @click="handleLinkClick($event, '/')"
          >
            <span class="link-text">{{ $t('header.home') }}</span>
            <span class="link-icon"><i class="fas fa-home"></i></span>
          </router-link>

          <router-link 
            to="/#services" 
            class="nav-link" 
            :class="{ 'active': isHashActive('#services') }"
            @click="handleLinkClick($event, '/#services')"
          >
            <span class="link-text">{{ $t('header.services') }}</span>
            <span class="link-icon"><i class="fas fa-briefcase"></i></span>
          </router-link>

          <router-link 
            to="/#about" 
            class="nav-link" 
            :class="{ 'active': isHashActive('#about') }"
            @click="handleLinkClick($event, '/#about')"
          >
            <span class="link-text">{{ $t('header.about') }}</span>
            <span class="link-icon"><i class="fas fa-user"></i></span>
          </router-link>

          <router-link 
            to="/#projects" 
            class="nav-link" 
            :class="{ 'active': isHashActive('#projects') }"
            @click="handleLinkClick($event, '/#projects')"
          >
            <span class="link-text">{{ $t('header.projects') }}</span>
            <span class="link-icon"><i class="fas fa-folder-open"></i></span>
          </router-link>

          <router-link 
            to="/#timeline" 
            class="nav-link" 
            :class="{ 'active': isHashActive('#timeline') }"
            @click="handleLinkClick($event, '/#timeline')"
          >
            <span class="link-text">{{ $t('header.timeline') }}</span>
            <span class="link-icon"><i class="fas fa-clock"></i></span>
          </router-link>

          <router-link 
            to="/#contact" 
            class="nav-link" 
            :class="{ 'active': isHashActive('#contact') }"
            @click="handleLinkClick($event, '/#contact')"
          >
            <span class="link-text">{{ $t('header.contact') }}</span>
            <span class="link-icon"><i class="fas fa-envelope"></i></span>
          </router-link>
        </div>

        <div class="nav-actions mobile">
          <a class="btn-whatsapp" href="http://wa.me/5513996958183" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-whatsapp"></i>
            <span>{{ $t('header.talk_to_me') }}</span>
          </a>
        </div>
      </nav>

      <div class="header-actions">
        <OptLangDropdown class="lang-dropdown" />

        <a class="btn-whatsapp desktop" href="http://wa.me/5513996958183" target="_blank" rel="noopener noreferrer">
          <i class="fab fa-whatsapp"></i>
        </a>

        <button class="menu-toggle" @click="toggleMenu" :class="{ open: isOpen }">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
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
    };
  },
  computed: {
    isHomeActive() {
      return this.$route.path === '/' && (!this.$route.hash || this.$route.hash === '');
    },
  },
  methods: {
    isHashActive(hash) {
      return this.$route.path === '/' && this.$route.hash === hash;
    },
    
    handleLinkClick(event, route) {
      this.closeMenu();
    },
    
    toggleMenu() {
      this.isOpen = !this.isOpen;
      document.body.style.overflow = this.isOpen ? 'hidden' : '';
    },
    
    closeMenu() {
      if (this.isOpen) {
        this.isOpen = false;
        document.body.style.overflow = '';
      }
    },
    
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll();
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    document.body.style.overflow = '';
  }
};
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 20px 5%;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.header.scrolled {
  background: rgba(3, 7, 18, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
  padding: 12px 5%;
}

.header-container {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
  text-decoration: none;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.02);
}

.logo span {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
  background: var(--surface);
  backdrop-filter: blur(10px);
  padding: 6px;
  border-radius: var(--radius-full);
  border: 1px solid var(--border);
}

.nav-link {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  border-radius: var(--radius-full);
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s ease;
  overflow: hidden;
}

.nav-link .link-text {
  transition: transform 0.3s ease;
}

.nav-link .link-icon {
  display: none;
  position: absolute;
}

.nav-link:hover {
  color: var(--text-primary);
}

.nav-link:hover .link-text {
  transform: translateY(-8px);
}

.nav-link::before {
  content: attr(data-text);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: all 0.3s ease;
}

.nav-link:hover::before {
  opacity: 1;
}

.nav-link.active {
  background: var(--gradient-primary);
  color: white;
  box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3);
}

.nav-link.active .link-text {
  opacity: 0;
}

.nav-link.active .link-icon {
  display: flex;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.lang-dropdown {
  margin-right: 8px;
}

.btn-whatsapp {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  background: #25D366;
  color: white;
  border-radius: var(--radius-full);
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
}

.btn-whatsapp:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
}

.btn-whatsapp.desktop {
  padding: 12px;
  width: 44px;
  height: 44px;
}

.btn-whatsapp i {
  font-size: 1.2rem;
}

.btn-whatsapp span {
  margin-left: 8px;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  cursor: pointer;
  padding: 10px;
  gap: 5px;
  transition: all 0.3s ease;
}

.menu-toggle span {
  width: 20px;
  height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.menu-toggle:hover {
  background: var(--surface-light);
}

.menu-toggle.open span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.menu-toggle.open span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.menu-toggle.open span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

.nav-actions.mobile {
  display: none;
}

@media (max-width: 1024px) {
  .nav-links {
    gap: 2px;
    padding: 4px;
  }

  .nav-link {
    padding: 8px 14px;
    font-size: 0.85rem;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 16px 5%;
  }

  .header.scrolled {
    padding: 12px 5%;
  }

  .logo {
    font-size: 1.5rem;
  }

  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(3, 7, 18, 0.98);
    backdrop-filter: blur(20px);
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    transform: translateX(100%);
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 999;
  }

  .nav.open {
    transform: translateX(0);
  }

  .nav-links {
    flex-direction: column;
    background: transparent;
    border: none;
    padding: 0;
    width: 100%;
    max-width: 300px;
  }

  .nav-link {
    width: 100%;
    padding: 16px 24px;
    font-size: 1.1rem;
    border-radius: var(--radius-lg);
    background: var(--surface);
    margin-bottom: 8px;
    border: 1px solid var(--border);
  }

  .nav-link .link-text {
    transform: none;
  }

  .nav-link .link-icon {
    display: none !important;
  }

  .nav-link:hover .link-text {
    transform: none;
  }

  .nav-link::before {
    display: none;
  }

  .nav-actions.mobile {
    display: flex;
    margin-top: 2rem;
  }

  .nav-actions.mobile .btn-whatsapp {
    width: 100%;
    justify-content: center;
    padding: 16px;
  }

  .header-actions .btn-whatsapp.desktop,
  .lang-dropdown {
    display: none;
  }

  .menu-toggle {
    display: flex;
  }
}
</style>
