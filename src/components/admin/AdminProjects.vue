<template>
  <section class="admin-projects">
    <header class="admin-header">
      <div>
        <div class="badge">Admin</div>
        <h1 class="title">Projetos</h1>
        <p class="subtitle" v-if="!loading && projects.length">
          {{ projects.length }} {{ projects.length === 1 ? 'projeto cadastrado' : 'projetos cadastrados' }}
          <span class="subtitle-hint">· arraste pelo <i class="fas fa-grip-vertical"></i> para reordenar</span>
        </p>
      </div>
      <div class="header-actions">
        <button class="btn primary" @click="openCreateForm">
          <i class="fas fa-plus"></i>
          <span>Novo projeto</span>
        </button>
        <button class="btn secondary" @click="handleLogout">
          <i class="fas fa-sign-out-alt"></i>
          <span>Sair</span>
        </button>
      </div>
    </header>

    <p v-if="loadError" class="error banner">{{ loadError }}</p>
    <p v-if="reorderError" class="error banner">{{ reorderError }}</p>

    <div v-if="loading" class="state-message">
      <i class="fas fa-circle-notch fa-spin"></i>
      <span>Carregando projetos...</span>
    </div>
    <div v-else-if="!projects.length" class="state-message">
      <i class="fas fa-folder-open"></i>
      <span>Nenhum projeto cadastrado ainda. Clique em "Novo projeto" para começar.</span>
    </div>

    <draggable
      v-else
      v-model="projects"
      item-key="id"
      handle=".drag-handle"
      animation="220"
      ghost-class="ghost-card"
      drag-class="dragging-card"
      class="projects-grid"
      @end="handleReorder"
    >
      <template #item="{ element: project, index }">
        <article class="project-card">
          <span class="drag-handle" title="Arrastar para reordenar">
            <i class="fas fa-grip-vertical"></i>
          </span>
          <span class="order-badge">{{ index + 1 }}</span>

          <div class="card-thumb">
            <img :src="project.image_url || placeholderImage" :alt="project.title" loading="lazy" />
          </div>

          <div class="card-body">
            <h3>{{ project.title }}</h3>
            <p>{{ project.description_pt }}</p>

            <div class="card-meta">
              <span v-for="tech in project.techs" :key="tech" class="tag">{{ tech }}</span>
              <span v-for="cat in project.categories" :key="cat" class="tag tag-cat">{{ cat }}</span>
            </div>
          </div>

          <div class="card-actions">
            <button class="icon-btn" title="Editar" @click="openEditForm(project)">
              <i class="fas fa-pen"></i>
            </button>
            <button class="icon-btn danger" title="Excluir" @click="confirmDelete(project)">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </article>
      </template>
    </draggable>

    <!-- Form panel -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showForm" class="overlay" @click.self="closeForm">
          <div class="panel">
            <button class="panel-close" @click="closeForm" aria-label="Fechar">
              <i class="fas fa-times"></i>
            </button>

            <h2 class="panel-title">{{ editingProject ? 'Editar projeto' : 'Novo projeto' }}</h2>

            <form @submit.prevent="handleSubmit">
              <label class="field">
                <span>Título</span>
                <input v-model="form.title" type="text" required />
              </label>

              <div class="lang-tabs">
                <button
                  v-for="lang in languages"
                  :key="lang.code"
                  type="button"
                  class="lang-tab"
                  :class="{ active: activeLang === lang.code }"
                  @click="activeLang = lang.code"
                >
                  {{ lang.label }}
                </button>
              </div>

              <label class="field">
                <span>Descrição ({{ activeLangLabel }})</span>
                <textarea v-model="form[`description_${activeLang}`]" rows="3" required></textarea>
              </label>

              <label class="field">
                <span>Imagem</span>
                <input type="file" accept="image/*" @change="onImageChange" />
                <img v-if="imagePreview" :src="imagePreview" class="image-preview" alt="Pré-visualização" />
              </label>

              <label class="field">
                <span>Link do projeto (demo)</span>
                <input v-model="form.demo_url" type="url" placeholder="https://..." />
              </label>

              <label class="field">
                <span>Link do código (GitHub)</span>
                <input v-model="form.code_url" type="url" placeholder="https://github.com/..." />
              </label>

              <label class="field">
                <span>Tecnologias (separadas por vírgula)</span>
                <input v-model="techsInput" type="text" placeholder="Vue.js, Node.js, JavaScript" />
              </label>

              <div class="field">
                <span>Categorias</span>
                <div class="checkbox-group">
                  <label v-for="cat in categoryOptions" :key="cat" class="checkbox">
                    <input type="checkbox" :value="cat" v-model="form.categories" />
                    <span>{{ cat }}</span>
                  </label>
                </div>
              </div>

              <label class="field">
                <span>Ordem de exibição</span>
                <input v-model.number="form.sort_order" type="number" />
              </label>

              <p v-if="formError" class="error">{{ formError }}</p>

              <div class="panel-actions">
                <button type="button" class="btn secondary" @click="closeForm">Cancelar</button>
                <button type="submit" class="btn primary" :disabled="saving">
                  {{ saving ? 'Salvando...' : 'Salvar' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Delete confirmation -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="deletingProject" class="overlay" @click.self="deletingProject = null">
          <div class="confirm-card">
            <h3>Excluir projeto?</h3>
            <p>Tem certeza que deseja excluir "{{ deletingProject.title }}"? Essa ação não pode ser desfeita.</p>
            <div class="panel-actions">
              <button class="btn secondary" @click="deletingProject = null">Cancelar</button>
              <button class="btn danger" :disabled="deleting" @click="handleDelete">
                {{ deleting ? 'Excluindo...' : 'Excluir' }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script>
import draggable from 'vuedraggable'
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
  uploadProjectImage,
  reorderProjects,
} from '../../lib/projectsApi'
import { signOut } from '../../lib/auth'

const emptyForm = () => ({
  title: '',
  description_pt: '',
  description_en: '',
  description_es: '',
  image_url: '',
  demo_url: '',
  code_url: '',
  categories: [],
  sort_order: 0,
})

export default {
  name: 'AdminProjects',
  components: { draggable },
  data() {
    return {
      projects: [],
      loading: true,
      loadError: '',
      reorderError: '',
      showForm: false,
      editingProject: null,
      form: emptyForm(),
      techsInput: '',
      imageFile: null,
      imagePreview: '',
      activeLang: 'pt',
      languages: [
        { code: 'pt', label: 'Português' },
        { code: 'en', label: 'English' },
        { code: 'es', label: 'Español' },
      ],
      categoryOptions: ['web', 'institutional', 'tool', 'game', 'app'],
      formError: '',
      saving: false,
      deletingProject: null,
      deleting: false,
      placeholderImage:
        'data:image/svg+xml;utf8,' +
        encodeURIComponent(
          '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="140"><rect width="100%" height="100%" fill="%231e293b"/></svg>'
        ),
    }
  },
  computed: {
    activeLangLabel() {
      return this.languages.find((l) => l.code === this.activeLang)?.label ?? ''
    },
  },
  methods: {
    async loadProjects() {
      this.loading = true
      this.loadError = ''
      try {
        this.projects = await fetchProjects()
      } catch (err) {
        this.loadError = 'Não foi possível carregar os projetos.'
      } finally {
        this.loading = false
      }
    },
    openCreateForm() {
      this.editingProject = null
      this.form = emptyForm()
      this.techsInput = ''
      this.imageFile = null
      this.imagePreview = ''
      this.activeLang = 'pt'
      this.formError = ''
      this.showForm = true
    },
    openEditForm(project) {
      this.editingProject = project
      this.form = {
        title: project.title,
        description_pt: project.description_pt ?? '',
        description_en: project.description_en ?? '',
        description_es: project.description_es ?? '',
        image_url: project.image_url ?? '',
        demo_url: project.demo_url ?? '',
        code_url: project.code_url ?? '',
        categories: [...(project.categories ?? [])],
        sort_order: project.sort_order ?? 0,
      }
      this.techsInput = (project.techs ?? []).join(', ')
      this.imageFile = null
      this.imagePreview = project.image_url ?? ''
      this.activeLang = 'pt'
      this.formError = ''
      this.showForm = true
    },
    closeForm() {
      this.showForm = false
    },
    onImageChange(event) {
      const file = event.target.files?.[0]
      if (!file) return
      this.imageFile = file
      this.imagePreview = URL.createObjectURL(file)
    },
    async handleSubmit() {
      this.formError = ''
      this.saving = true
      try {
        let imageUrl = this.form.image_url
        if (this.imageFile) {
          imageUrl = await uploadProjectImage(this.imageFile)
        }

        const payload = {
          title: this.form.title,
          description_pt: this.form.description_pt,
          description_en: this.form.description_en,
          description_es: this.form.description_es,
          image_url: imageUrl,
          demo_url: this.form.demo_url || null,
          code_url: this.form.code_url || null,
          techs: this.techsInput
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
          categories: this.form.categories,
          sort_order: this.form.sort_order,
        }

        if (this.editingProject) {
          await updateProject(this.editingProject.id, payload)
        } else {
          await createProject(payload)
        }

        this.showForm = false
        await this.loadProjects()
      } catch (err) {
        this.formError = 'Não foi possível salvar o projeto. Tente novamente.'
      } finally {
        this.saving = false
      }
    },
    async handleReorder() {
      this.reorderError = ''
      const orderedIds = this.projects.map((p) => p.id)
      try {
        await reorderProjects(orderedIds)
        this.projects.forEach((p, index) => {
          p.sort_order = index
        })
      } catch (err) {
        this.reorderError = 'Não foi possível salvar a nova ordem. Tente novamente.'
        await this.loadProjects()
      }
    },
    confirmDelete(project) {
      this.deletingProject = project
    },
    async handleDelete() {
      if (!this.deletingProject) return
      this.deleting = true
      try {
        await deleteProject(this.deletingProject.id)
        this.deletingProject = null
        await this.loadProjects()
      } catch (err) {
        this.loadError = 'Não foi possível excluir o projeto.'
      } finally {
        this.deleting = false
      }
    },
    async handleLogout() {
      await signOut()
      this.$router.push('/admin')
    },
  },
  mounted() {
    this.loadProjects()
  },
}
</script>

<style scoped>
.admin-projects {
  min-height: 100vh;
  padding: 64px 5% 96px;
  background: var(--gradient-dark);
}

.admin-header {
  max-width: 1280px;
  margin: 0 auto 3rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.subtitle {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-top: 6px;
}

.subtitle-hint {
  color: var(--text-muted);
}

.subtitle-hint i {
  font-size: 0.75rem;
  margin: 0 2px;
}

.badge {
  display: inline-block;
  background: rgba(14, 165, 233, 0.1);
  border: 1px solid rgba(14, 165, 233, 0.3);
  padding: 4px 14px;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--primary-light);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 0.5rem;
}

.title {
  font-size: 2.25rem;
  font-weight: 800;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  letter-spacing: -0.5px;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: transform var(--transition-fast);
  font-family: inherit;
}

.btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn.primary {
  background: var(--gradient-primary);
  color: white;
  box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3);
}

.btn.secondary {
  background: var(--surface);
  border: 1px solid var(--border-light);
  color: var(--text-primary);
}

.btn.danger {
  background: #ef4444;
  color: white;
}

.state-message {
  max-width: 1280px;
  margin: 4rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  text-align: center;
  color: var(--text-secondary);
  font-size: 1rem;
}

.state-message i {
  font-size: 1.75rem;
  color: var(--primary-light);
  opacity: 0.7;
}

.error.banner {
  max-width: 1280px;
  margin: 0 auto 1.5rem;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #f87171;
}

.projects-grid {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.75rem;
}

.project-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: border-color var(--transition-base), transform var(--transition-base), box-shadow var(--transition-base);
}

.project-card:hover {
  border-color: rgba(14, 165, 233, 0.3);
  box-shadow: var(--shadow-md);
}

.ghost-card {
  opacity: 0.35;
}

.dragging-card {
  cursor: grabbing !important;
  box-shadow: var(--shadow-lg), 0 0 0 1px var(--primary);
}

.drag-handle {
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 2;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  background: rgba(3, 7, 18, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  color: var(--text-primary);
  cursor: grab;
  transition: all var(--transition-fast);
}

.drag-handle:hover {
  color: var(--primary-light);
  border-color: var(--primary);
}

.drag-handle:active {
  cursor: grabbing;
}

.order-badge {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 2;
  min-width: 28px;
  height: 28px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  background: rgba(3, 7, 18, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  color: var(--text-secondary);
  font-size: 0.75rem;
  font-weight: 700;
}

.card-thumb {
  aspect-ratio: 16/10;
  overflow: hidden;
}

.card-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.project-card:hover .card-thumb img {
  transform: scale(1.05);
}

.card-body {
  padding: 1.25rem 1.25rem 0.5rem;
  flex: 1;
}

.card-body h3 {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 6px;
}

.card-body p {
  font-size: 0.85rem;
  line-height: 1.55;
  color: var(--text-secondary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 12px;
}

.card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  background: rgba(14, 165, 233, 0.1);
  border: 1px solid rgba(14, 165, 233, 0.2);
  color: var(--primary-light);
  padding: 3px 10px;
  border-radius: var(--radius-full);
  font-size: 0.7rem;
  font-weight: 600;
}

.tag-cat {
  background: rgba(99, 102, 241, 0.1);
  border-color: rgba(99, 102, 241, 0.2);
  color: var(--secondary-light);
}

.card-actions {
  display: flex;
  gap: 8px;
  padding: 1rem 1.25rem 1.25rem;
}

.icon-btn {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-light);
  background: var(--background-card);
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.icon-btn:hover {
  border-color: var(--primary);
  color: var(--primary-light);
}

.icon-btn.danger:hover {
  border-color: #ef4444;
  color: #ef4444;
}

/* Overlay / panel */
.overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(3, 7, 18, 0.75);
  backdrop-filter: blur(12px);
}

.panel {
  position: relative;
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  overflow-y: auto;
  background: var(--background-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  padding: 2rem;
}

.panel-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid var(--border-light);
  background: var(--surface);
  color: var(--text-primary);
  cursor: pointer;
}

.panel-title {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 1.1rem;
}

.field span {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.field input,
.field textarea {
  background: var(--surface);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 10px 14px;
  color: var(--text-primary);
  font-size: 0.9rem;
  font-family: inherit;
  outline: none;
  resize: vertical;
  transition: border-color var(--transition-fast);
}

.field input:focus,
.field textarea:focus {
  border-color: var(--primary);
}

.image-preview {
  margin-top: 8px;
  width: 100%;
  max-height: 160px;
  object-fit: cover;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-light);
}

.lang-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 0.75rem;
}

.lang-tab {
  padding: 6px 14px;
  border-radius: var(--radius-full);
  border: 1px solid var(--border-light);
  background: var(--surface);
  color: var(--text-secondary);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.lang-tab.active {
  background: var(--gradient-primary);
  color: white;
  border-color: transparent;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: var(--text-primary);
  cursor: pointer;
}

.panel-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 1.5rem;
}

.confirm-card {
  width: 100%;
  max-width: 420px;
  background: var(--background-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-xl);
  padding: 2rem;
  box-shadow: var(--shadow-lg);
}

.confirm-card h3 {
  color: var(--text-primary);
  margin-bottom: 0.75rem;
}

.confirm-card p {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 0;
}

.error {
  color: #f87171;
  font-size: 0.85rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
