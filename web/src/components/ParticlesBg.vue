<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  count?: number
}>()

const particleCount = computed(() => props.count ?? 28)

const particles = computed(() =>
  Array.from({ length: particleCount.value }, (_, i) => ({
    size: 4 + Math.round(Math.random() * 10),
    x: `${Math.round(Math.random() * 100)}%`,
    y: `${Math.round(Math.random() * 100)}%`,
    alpha: (0.14 + Math.random() * 0.2).toFixed(2),
    duration: `${10 + Math.random() * 12}s`,
    delay: `${(i * -0.7).toFixed(2)}s`,
    driftX: `${(-18 + Math.random() * 36).toFixed(2)}px`,
    driftY: `${(-26 + Math.random() * 52).toFixed(2)}px`,
    scale: (0.9 + Math.random() * 0.8).toFixed(2),
  }))
)
</script>

<template>
  <div class="particles-bg" aria-hidden="true">
    <span
      v-for="(p, i) in particles"
      :key="i"
      class="particle"
      :style="{
        '--size': p.size + 'px',
        '--x': p.x,
        '--y': p.y,
        '--alpha': p.alpha,
        '--duration': p.duration,
        '--delay': p.delay,
        '--drift-x': p.driftX,
        '--drift-y': p.driftY,
        '--scale': p.scale,
      }"
    />
  </div>
</template>

<style scoped>
.particles-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.particle {
  position: absolute;
  left: var(--x);
  top: var(--y);
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background: var(--accent);
  opacity: var(--alpha);
  animation: particleDrift var(--duration) ease-in-out var(--delay) infinite alternate;
  transform: scale(var(--scale));
}

@keyframes particleDrift {
  0% {
    transform: translate(0, 0) scale(var(--scale));
  }
  100% {
    transform: translate(var(--drift-x), var(--drift-y)) scale(var(--scale));
  }
}
</style>
