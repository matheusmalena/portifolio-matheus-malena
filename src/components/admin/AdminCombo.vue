<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  options: { type: Array, default: () => [] },
  placeholder: { type: String, default: '' },
  icon: { type: String, default: 'fa-server' },
})
const emit = defineEmits(['update:modelValue'])

const root = ref(null)
const open = ref(false)
const active = ref(-1)

const filtered = computed(() => {
  const q = props.modelValue.trim().toLowerCase()
  const list = [...new Set(props.options)]
  return q ? list.filter((o) => o.toLowerCase().includes(q)) : list
})
const isNew = computed(() => {
  const v = props.modelValue.trim()
  return v && !props.options.some((o) => o.toLowerCase() === v.toLowerCase())
})

function pick(v) {
  emit('update:modelValue', v)
  open.value = false
  active.value = -1
}
function onInput(e) {
  emit('update:modelValue', e.target.value)
  open.value = true
  active.value = -1
}
function onKey(e) {
  if (e.key === 'ArrowDown') { e.preventDefault(); open.value = true; active.value = Math.min(active.value + 1, filtered.value.length - 1) }
  else if (e.key === 'ArrowUp') { e.preventDefault(); active.value = Math.max(active.value - 1, 0) }
  else if (e.key === 'Enter' && open.value && active.value >= 0) { e.preventDefault(); pick(filtered.value[active.value]) }
  else if (e.key === 'Escape') { open.value = false }
}
const outside = (e) => { if (root.value && !root.value.contains(e.target)) open.value = false }
onMounted(() => document.addEventListener('mousedown', outside))
onUnmounted(() => document.removeEventListener('mousedown', outside))
</script>

<template>
  <div ref="root" class="combo">
    <i class="fas lead" :class="icon"></i>
    <input
      class="ap-input" :value="modelValue" :placeholder="placeholder" autocomplete="off"
      @input="onInput" @focus="open = true" @keydown="onKey"
    />
    <button type="button" class="toggle" tabindex="-1" aria-label="Abrir opções" @click="open = !open">
      <i class="fas fa-chevron-down" :class="{ flip: open }"></i>
    </button>

    <transition name="pop">
      <ul v-if="open && (filtered.length || isNew)" class="list">
        <li
          v-for="(o, i) in filtered" :key="o"
          :class="{ on: i === active, sel: o === modelValue }"
          @mousedown.prevent="pick(o)" @mouseenter="active = i"
        >
          <i class="fas" :class="icon"></i><span>{{ o }}</span>
          <i v-if="o === modelValue" class="fas fa-check tick"></i>
        </li>
        <li v-if="isNew" class="new" @mousedown.prevent="open = false">
          <i class="fas fa-plus"></i><span>Usar “{{ modelValue.trim() }}”</span>
        </li>
      </ul>
    </transition>
  </div>
</template>

<style scoped>
.combo { position: relative; }
.combo .ap-input { padding-left: 42px; padding-right: 42px; }
.lead { position: absolute; left: 15px; top: 15px; font-size: .9rem; color: #64748b; pointer-events: none; }
.combo:focus-within .lead { color: #38bdf8; }
.toggle { position: absolute; right: 6px; top: 6px; width: 34px; height: 34px; border: none; background: none; color: #94a3b8; cursor: pointer; border-radius: 10px; }
.toggle:hover { background: rgba(148, 163, 184, .1); color: #fff; }
.toggle i { font-size: .72rem; transition: transform .2s; }
.toggle i.flip { transform: rotate(180deg); }

.list {
  position: absolute; z-index: 30; left: 0; right: 0; top: calc(100% + 8px); max-height: 260px; overflow-y: auto;
  list-style: none; margin: 0; padding: 6px;
  background: linear-gradient(180deg, #0f1c3d, #0a1226); border: 1px solid rgba(96, 165, 250, .3);
  border-radius: 14px; box-shadow: 0 18px 44px rgba(0, 0, 0, .55), 0 0 0 4px rgba(56, 189, 248, .06);
}
.list li { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 10px; cursor: pointer; color: #cbd5e1; font-size: .9rem; }
.list li > i:first-child { width: 18px; text-align: center; color: #64748b; font-size: .82rem; }
.list li.on { background: rgba(56, 189, 248, .12); color: #fff; }
.list li.on > i:first-child { color: #38bdf8; }
.list li.sel { color: #7dd3fc; }
.tick { margin-left: auto; color: #38bdf8; font-size: .8rem; }
.list li.new { color: #7dd3fc; border-top: 1px dashed rgba(96, 165, 250, .25); border-radius: 0 0 10px 10px; margin-top: 4px; }
.list li.new > i { color: #38bdf8; }
.list::-webkit-scrollbar { width: 6px; }
.list::-webkit-scrollbar-thumb { background: rgba(148, 163, 184, .25); border-radius: 6px; }

.pop-enter-active, .pop-leave-active { transition: opacity .14s ease, transform .14s ease; }
.pop-enter-from, .pop-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
