import { supabase } from './supabase'

function crud(table, orderBy, ascending = true) {
  return {
    async list() {
      const { data, error } = await supabase.from(table).select('*').order(orderBy, { ascending })
      if (error) throw error
      return data
    },
    async create(row) {
      const { data, error } = await supabase.from(table).insert(row).select().single()
      if (error) throw error
      return data
    },
    async update(id, row) {
      const { data, error } = await supabase.from(table).update(row).eq('id', id).select().single()
      if (error) throw error
      return data
    },
    async remove(id) {
      const { error } = await supabase.from(table).delete().eq('id', id)
      if (error) throw error
    },
  }
}

export const clientsApi = crud('clients', 'name')
export const internalProjectsApi = crud('internal_projects', 'created_at', false)

export const STATUS = {
  planejamento: { label: 'Planejamento', color: '#a78bfa' },
  desenvolvimento: { label: 'Em desenvolvimento', color: '#38bdf8' },
  producao: { label: 'No ar', color: '#34d399' },
  pausado: { label: 'Pausado', color: '#fbbf24' },
  arquivado: { label: 'Arquivado', color: '#64748b' },
}

export const HOSTING_SUGGESTIONS = [
  'VPS Malena Tech', 'Vercel', 'Netlify', 'Cloudflare Pages', 'Supabase',
  'Hostinger', 'Locaweb', 'GitHub Pages', 'Cliente (infra própria)', 'Local / não publicado',
]

export const brl = (n) =>
  Number(n || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export function daysUntil(dateStr) {
  if (!dateStr) return null
  const d = new Date(dateStr + 'T00:00:00')
  const today = new Date(); today.setHours(0, 0, 0, 0)
  return Math.round((d - today) / 86400000)
}

export const fmtDate = (s) => (s ? new Date(s + 'T00:00:00').toLocaleDateString('pt-BR') : '—')
