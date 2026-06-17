<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import GlowCard from '@/components/GlowCard.vue'
import { useReveal } from '@/composables/useReveal'
import blogsData from '@/data/blogs.json'
import type { BlogItem } from '@/components/BlogCard.vue'

const mainRef = ref<HTMLElement | null>(null)
useReveal(mainRef)

const route = useRoute()
const blogs: BlogItem[] = blogsData.blogs

const blog = computed(() => blogs.find((b) => b.slug === route.params.slug))

const renderedContent = computed(() => {
  if (!blog.value) return ''
  return blog.value.content
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
})
</script>

<template>
  <div ref="mainRef">
    <section class="section" v-if="blog">
      <div class="container article-container">
        <div class="article-header fade-in" data-reveal="rise">
          <span class="eyebrow">{{ blog.date }}</span>
          <h1>{{ blog.title }}</h1>
          <div class="chips">
            <span class="tag" v-for="tag in blog.tags" :key="tag">{{ tag }}</span>
          </div>
        </div>

        <GlowCard class="fade-in" data-reveal="rise" data-reveal-delay="1" style="padding:36px;">
          <div v-html="renderedContent" class="prose"></div>
        </GlowCard>

        <div class="article-nav fade-in" data-reveal="rise" data-reveal-delay="2">
          <RouterLink to="/blog" class="ghost-button">&larr; 返回博客列表</RouterLink>
        </div>
      </div>
    </section>

    <section class="section" v-else>
      <div class="container">
        <GlowCard class="fade-in visible">
          <h3>文章未找到</h3>
          <p>找不到对应的博客文章，请返回博客列表查看。</p>
          <div style="margin-top:16px;">
            <RouterLink to="/blog" class="button">返回博客列表</RouterLink>
          </div>
        </GlowCard>
      </div>
    </section>
  </div>
</template>
