<template>
  <div
    v-if="currentLanguage"
    class="position-relative d-inline-block"
    @click="toggleDropdown"
    style="width: 87px; font-family: sans-serif; cursor: pointer"
  >
    <!-- Botão principal -->
    <div class="px-2 py-1 rounded d-flex align-items-center justify-content-between">
      <img
        :src="currentLanguage.flag"
        class="rounded-circle me-2"
        style="width: 20px; height: 20px; object-fit: cover"
      />
      <span class="flex-grow-1 small text-start">{{ currentLanguage.code }}</span>
      <span class="ms-1">
        <i v-if="!isOpen" class="fas fa-chevron-down"></i>
        <i v-else class="fas fa-chevron-up"></i>
      </span>
    </div>

    <!-- Dropdown -->
    <div
      v-if="isOpen"
      class="position-absolute rounded shadow mt-1 w-100 z-index-3"
      style="top: 100%; left: 0; background-color: var(--color-black);"
    >
      <div
        v-for="(lang, index) in languages"
        :key="index"
        @click.stop="selectLanguage(lang)"
        class="d-flex align-items-center px-3 py-2 hover-bg cursor-pointer"
      >
        <img
          :src="lang.flag"
          class="rounded-circle me-2"
          style="width: 20px; height: 20px; object-fit: cover"
        />
        <span class="small">{{ lang.code }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const isOpen = ref(false);

const languages = [
  { code: "BR", flag: "https://flagcdn.com/w40/br.png", locale: "pt" },
  { code: "EN", flag: "https://flagcdn.com/w40/us.png", locale: "en" },
  { code: "ES", flag: "https://flagcdn.com/w40/es.png", locale: "es" },
];

const currentLanguage = ref({
  code: "BR",
  flag: "https://flagcdn.com/w40/br.png",
  locale: "pt",
});

onMounted(() => {
  const storedLocale = localStorage.getItem("OptLang") || locale.value;
  const foundLang = languages.find((lang) => lang.locale === storedLocale);
  if (foundLang) {
    currentLanguage.value = foundLang;
    locale.value = foundLang.locale;
  }
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectLanguage = (lang) => {
  currentLanguage.value = lang;
  isOpen.value = false;
  locale.value = lang.locale;
  localStorage.setItem("OptLang", lang.locale);
};
</script>

<style scoped>
.hover-bg {
  background-color: #0000003a;
}

.hover-bg:hover {
  background-color: #00000056;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
a
