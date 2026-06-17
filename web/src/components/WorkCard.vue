<script setup lang="ts">
import GlowCard from './GlowCard.vue'

export interface WorkItem {
  name: string
  author: string
  title: string
  description: string
  tags: string[]
  links?: { label: string; url: string }[]
}

defineProps<{ work: WorkItem }>()
</script>

<template>
  <GlowCard class="work-card">
    <div class="work-thumb">
      <strong>{{ work.name }}</strong>
    </div>
    <span class="work-meta">{{ work.author }} · {{ work.title }}</span>
    <h3>{{ work.name }}</h3>
    <p>{{ work.description }}</p>
    <div class="chips" v-if="work.tags?.length">
      <span class="tag" v-for="tag in work.tags" :key="tag">{{ tag }}</span>
    </div>
    <div class="work-links" v-if="work.links?.length">
      <a
        v-for="link in work.links"
        :key="link.url"
        :href="link.url"
        class="work-link"
        target="_blank"
        rel="noreferrer"
      >
        {{ link.label }}
      </a>
    </div>
  </GlowCard>
</template>
