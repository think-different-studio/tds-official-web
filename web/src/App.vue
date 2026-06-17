<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import ParticlesBg from './components/ParticlesBg.vue'

const themeStorageKey = 'tds-home-theme'
const currentTheme = ref<'light' | 'dark'>('dark')
const route = useRoute()

onMounted(() => {
  const saved = localStorage.getItem(themeStorageKey)
  currentTheme.value = saved === 'light' ? 'light' : 'dark'
  document.body.setAttribute('data-theme', currentTheme.value)
  document.body.classList.add('web-page')
})

function toggleTheme() {
  currentTheme.value = currentTheme.value === 'dark' ? 'light' : 'dark'
  document.body.setAttribute('data-theme', currentTheme.value)
  localStorage.setItem(themeStorageKey, currentTheme.value)
}

watch(() => route.path, () => {
  document.body.classList.remove('menu-open')
  window.scrollTo({ top: 0 })
})
</script>

<template>
  <div class="site-shell">
    <SiteHeader :theme="currentTheme" @toggle-theme="toggleTheme" />
    <ParticlesBg />
    <div class="ambient-particles" aria-hidden="true"></div>
    <main class="page-main">
      <RouterView />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.site-shell {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

.page-main {
  padding-bottom: 110px;
}
</style>
