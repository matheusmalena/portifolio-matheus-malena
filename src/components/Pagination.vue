<template>
  <div class="pagination-container" v-if="totalPages > 1">
    <button 
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="pagination-button"
      aria-label="Página anterior"
    >
      &lt;
    </button>

    <button
      v-for="page in visiblePages"
      :key="page"
      @click="goToPage(page)"
      :class="{ active: page === currentPage }"
      class="pagination-button"
      :aria-label="`Ir para página ${page}`"
    >
      {{ page }}
    </button>

    <button 
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="pagination-button"
      aria-label="Próxima página"
    >
      &gt;
    </button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    },
    maxVisibleButtons: {
      type: Number,
      default: 5
    }
  },
  computed: {
    visiblePages() {
      const range = [];
      const half = Math.floor(this.maxVisibleButtons / 2);
      let start = Math.max(1, this.currentPage - half);
      let end = Math.min(this.totalPages, start + this.maxVisibleButtons - 1);

      if (end - start + 1 < this.maxVisibleButtons) {
        start = Math.max(1, end - this.maxVisibleButtons + 1);
      }

      for (let i = start; i <= end; i++) {
        range.push(i);
      }

      return range;
    }
  },
  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit('page-changed', page);
      }
    }
  }
}
</script>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 3rem;
  flex-wrap: wrap;
}

.pagination-button {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-button:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
}

.pagination-button.active {
  background: var(--accent-color);
  color: white;
  box-shadow: 0 4px 15px rgba(74, 205, 240, 0.3);
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 480px) {
  .pagination-button {
    width: 36px;
    height: 36px;
    font-size: 0.9rem;
  }
}
</style>