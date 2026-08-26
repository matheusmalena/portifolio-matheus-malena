<template>
  <section class="admin-login">
    <div class="login-card">
      <div class="badge">Admin</div>
      <h1 class="title">Entrar</h1>
      <p class="subtitle">Acesse para gerenciar os projetos do portfólio.</p>

      <form @submit.prevent="handleSubmit">
        <label class="field">
          <span>E-mail</span>
          <input v-model="email" type="email" autocomplete="username" required />
        </label>

        <label class="field">
          <span>Senha</span>
          <input v-model="password" type="password" autocomplete="current-password" required />
        </label>

        <p v-if="error" class="error">{{ error }}</p>

        <button type="submit" class="submit-btn" :disabled="loading">
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>
    </div>
  </section>
</template>

<script>
import { signIn } from '../../lib/auth'

export default {
  name: 'AdminLogin',
  data() {
    return {
      email: '',
      password: '',
      error: '',
      loading: false,
    }
  },
  methods: {
    async handleSubmit() {
      this.error = ''
      this.loading = true
      try {
        await signIn(this.email, this.password)
        this.$router.push('/admin/projetos')
      } catch (err) {
        this.error = 'E-mail ou senha inválidos.'
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.admin-login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: var(--gradient-dark);
}

.login-card {
  width: 100%;
  max-width: 400px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 2.5rem;
  box-shadow: var(--shadow-lg);
}

.badge {
  display: inline-block;
  background: rgba(14, 165, 233, 0.1);
  border: 1px solid rgba(14, 165, 233, 0.3);
  padding: 6px 16px;
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--primary-light);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 1.25rem;
}

.title {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.subtitle {
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin-bottom: 2rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 1.25rem;
}

.field span {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.field input {
  background: var(--background-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 12px 14px;
  color: var(--text-primary);
  font-size: 0.95rem;
  font-family: inherit;
  outline: none;
  transition: border-color var(--transition-fast);
}

.field input:focus {
  border-color: var(--primary);
}

.error {
  color: #f87171;
  font-size: 0.85rem;
  margin-bottom: 1rem;
}

.submit-btn {
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-radius: var(--radius-md);
  background: var(--gradient-primary);
  color: white;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3);
  transition: transform var(--transition-fast);
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
