<script setup lang="ts">
import { ref } from 'vue'
import WorkCard from '@/components/WorkCard.vue'
import { useReveal } from '@/composables/useReveal'
import worksData from '@/data/works.json'
import type { WorkItem } from '@/components/WorkCard.vue'

const mainRef = ref<HTMLElement | null>(null)
useReveal(mainRef)

const works: WorkItem[] = worksData.works
</script>

<template>
  <div ref="mainRef">
    <section class="section">
      <div class="container">
        <div class="section-heading fade-in" data-reveal="rise">
          <div>
            <span class="eyebrow fade-in" data-reveal="fade">Member Works</span>
            <h2 class="fade-in" data-reveal="rise" data-reveal-delay="1">成员作品展示</h2>
          </div>
          <p class="fade-in" data-reveal="rise" data-reveal-delay="2">
            Web 组成员的前端、全栈与创意项目作品集。每个作品都是成员从构思到落地的完整实践。
          </p>
        </div>

        <div class="works-grid fade-in" data-reveal="rise" data-reveal-delay="3">
          <WorkCard
            v-for="work in works"
            :key="work.name"
            :work="work"
            class="fade-in"
            data-reveal="rise"
          />
        </div>
      </div>
    </section>
  </div>
</template>
