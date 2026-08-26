import { supabase } from './supabase'

const TABLE = 'projects'
const BUCKET = 'project-images'

export async function fetchProjects() {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) throw error
  return data
}

export async function createProject(project) {
  const { data, error } = await supabase
    .from(TABLE)
    .insert(project)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateProject(id, project) {
  const { data, error } = await supabase
    .from(TABLE)
    .update(project)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteProject(id) {
  const { error } = await supabase.from(TABLE).delete().eq('id', id)
  if (error) throw error
}

export async function uploadProjectImage(file) {
  const ext = file.name.split('.').pop()
  const path = `${crypto.randomUUID()}.${ext}`

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  })
  if (error) throw error

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}
