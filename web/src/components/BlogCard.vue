<script setup lang="ts">
import { RouterLink } from 'vue-router'
import GlowCard from './GlowCard.vue'

export interface BlogItem {
  slug: string
  title: string
  date: string
  summary: string
  tags: string[]
  content: string
}

defineProps<{ blog: BlogItem }>()
</script>

<template>
  <RouterLink :to="`/blog/${blog.slug}`" class="blog-link-wrap">
    <GlowCard class="blog-card">
      <span class="blog-date">{{ blog.date }}</span>
      <h3>{{ blog.title }}</h3>
      <p>{{ blog.summary }}</p>
      <div class="chips" v-if="blog.tags?.length">
        <span class="tag" v-for="tag in blog.tags" :key="tag">{{ tag }}</span>
      </div>
      <span class="read-more">阅读全文 &rarr;</span>
    </GlowCard>
  </RouterLink>
</template>
