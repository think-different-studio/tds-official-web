<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineProps<{
  tag?: string
}>()

const cardRef = ref<HTMLElement | null>(null)

function onMouseMove(e: MouseEvent) {
  const el = cardRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
  el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
}

onMounted(() => {
  cardRef.value?.addEventListener('mousemove', onMouseMove)
})

onUnmounted(() => {
  cardRef.value?.removeEventListener('mousemove', onMouseMove)
})
</script>

<template>
  <component :is="tag || 'div'" ref="cardRef" class="glow-card">
    <slot />
  </component>
</template>
