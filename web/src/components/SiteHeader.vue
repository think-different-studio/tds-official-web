<script setup lang="ts">
import { onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

defineProps<{ theme: 'light' | 'dark' }>()
const emit = defineEmits<{ 'toggle-theme': [] }>()

const navItems = [
  { to: '/', label: '首页' },
  { to: '/works', label: '成员作品' },
  { to: '/blog', label: '开发日志' },
  { to: '/learn', label: '学习资源' },
  { to: '/about', label: '关于我们' },
]

function toggleMenu() {
  document.body.classList.toggle('menu-open')
}

function closeMenu() {
  document.body.classList.remove('menu-open')
}

onUnmounted(() => {
  closeMenu()
})
</script>

<template>
  <header class="site-header">
    <div class="web-topbar">
      <div class="container web-nav-bar nav-bar">
        <!-- Left: back + brand -->
        <div style="display:flex;align-items:center;gap:16px;">
          <a class="back-main" href="/index.html" title="返回 TDS 主站" @click="closeMenu">
            &larr; 主站
          </a>
          <RouterLink to="/" class="brand" @click="closeMenu">
            <div class="brand-logo-text">W</div>
            <div>
              <div class="brand-mark">TDS · Web 组</div>
              <div class="brand-title">Thinking Different Studio</div>
            </div>
          </RouterLink>
        </div>

        <!-- Center: nav links -->
        <nav class="web-nav-links nav-links" aria-label="主导航">
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            @click="closeMenu"
          >
            {{ item.label }}
          </RouterLink>
          <a href="/index.html" class="nav-cta" @click="closeMenu">主站</a>
        </nav>

        <!-- Right: theme toggle + hamburger -->
        <div style="display:flex;align-items:center;gap:12px;">
          <button class="theme-toggle" type="button" @click="emit('toggle-theme')" aria-label="切换主题">
            <span class="theme-label-light">LIGHT</span>
            <span class="theme-label-dark">NIGHT</span>
          </button>
          <button class="nav-toggle" type="button" @click="toggleMenu" aria-label="菜单">
            <span></span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
