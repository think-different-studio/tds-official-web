<script setup lang="ts">
import { ref } from 'vue'
import BlogCard from '@/components/BlogCard.vue'
import { useReveal } from '@/composables/useReveal'
import blogsData from '@/data/blogs.json'
import type { BlogItem } from '@/components/BlogCard.vue'

const mainRef = ref<HTMLElement | null>(null)
useReveal(mainRef)

const blogs: BlogItem[] = blogsData.blogs
</script>

<template>
  <div ref="mainRef">
    <section class="section">
      <div class="container">
        <div class="section-heading fade-in" data-reveal="rise">
          <div>
            <span class="eyebrow fade-in" data-reveal="fade">Dev Blog</span>
            <h2 class="fade-in" data-reveal="rise" data-reveal-delay="1">开发日志</h2>
          </div>
          <p class="fade-in" data-reveal="rise" data-reveal-delay="2">
            技术文章、开发心得、工具推荐与项目复盘。记录 Web 组的技术成长轨迹。
          </p>
        </div>

        <div class="blog-grid fade-in" data-reveal="rise" data-reveal-delay="3">
          <BlogCard
            v-for="blog in blogs"
            :key="blog.slug"
            :blog="blog"
            class="fade-in"
            data-reveal="rise"
          />
        </div>
      </div>
    </section>
  </div>
</template>
