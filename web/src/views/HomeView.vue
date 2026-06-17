<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import GlowCard from '@/components/GlowCard.vue'
import { useReveal } from '@/composables/useReveal'

const mainRef = ref<HTMLElement | null>(null)
useReveal(mainRef)
</script>

<template>
  <div ref="mainRef">
    <!-- Hero section -->
    <section class="section" style="padding-top: 62px;">
      <div class="container">
        <div class="fade-in" data-reveal="zoom" style="max-width:720px;">
          <span class="eyebrow fade-in" data-reveal="fade">Web Development Group</span>
          <h1 class="fade-in" data-reveal="rise" data-reveal-delay="1"
              style="font-size:clamp(2.4rem,4vw,4.5rem);font-weight:800;line-height:1.08;margin:18px 0 14px;">
            全栈筑基，安开护航，测试兜底。
          </h1>
          <p class="fade-in" data-reveal="rise" data-reveal-delay="2"
             style="color:var(--muted);font-size:1.05rem;line-height:1.85;max-width:600px;">
            TDS Web 组覆盖全栈开发、安全开发与自动化测试三大方向。
            从前后端架构到漏洞攻防，从接口测试到 CI/CD 交付，我们用工程化的方式把项目做稳、做深、做透。
          </p>
          <div class="hero-actions fade-in" data-reveal="rise" data-reveal-delay="3">
            <RouterLink to="/works" class="button">查看成员作品</RouterLink>
            <RouterLink to="/about" class="ghost-button">了解 Web 组</RouterLink>
          </div>
        </div>

        <div class="hero-metrics fade-in" data-reveal="rise" data-reveal-delay="4">
          <GlowCard tag="article" data-glow-card>
            <h3>全栈开发</h3>
            <p>Vue / React、Node.js / Go、数据库设计、API 开发与容器化部署，打通前后端完整链路。</p>
          </GlowCard>
          <GlowCard tag="article" data-glow-card>
            <h3>安全开发</h3>
            <p>Web 渗透、漏洞挖掘、安全编码规范、代码审计与攻防演练，构建安全可靠的系统。</p>
          </GlowCard>
          <GlowCard tag="article" data-glow-card>
            <h3>自动化测试</h3>
            <p>单元测试、接口测试、E2E 自动化、性能压测与 CI/CD 质量门禁，让交付更稳。</p>
          </GlowCard>
        </div>
      </div>
    </section>

    <!-- Explore section -->
    <section class="section">
      <div class="container">
        <div class="section-heading fade-in" data-reveal="rise">
          <div>
            <span class="eyebrow">Explore</span>
            <h2>探索 Web 组</h2>
          </div>
          <p>从项目实战到安全研究，从测试方案到技术博客，选择你感兴趣的方向深入了解。</p>
        </div>

        <div class="nav-grid fade-in" data-reveal="rise" data-reveal-delay="1">
          <RouterLink to="/works" class="nav-card glow-card" data-glow-card>
            <div class="mini-window-head"></div>
            <div class="nav-card-icon">&#128187;</div>
            <h3>成员作品</h3>
            <p>浏览 Web 组成员的全栈、安全与测试项目作品集。</p>
            <span class="nav-card-arrow">&rarr;</span>
          </RouterLink>
          <RouterLink to="/blog" class="nav-card glow-card" data-glow-card>
            <div class="mini-window-head"></div>
            <div class="nav-card-icon">&#128221;</div>
            <h3>开发日志</h3>
            <p>技术文章、漏洞分析与测试方案分享。</p>
            <span class="nav-card-arrow">&rarr;</span>
          </RouterLink>
          <RouterLink to="/learn" class="nav-card glow-card" data-glow-card>
            <div class="mini-window-head"></div>
            <div class="nav-card-icon">&#128218;</div>
            <h3>学习资源</h3>
            <p>全栈、安全与测试入门路线、推荐教程与工具清单。</p>
            <span class="nav-card-arrow">&rarr;</span>
          </RouterLink>
          <RouterLink to="/about" class="nav-card glow-card" data-glow-card>
            <div class="mini-window-head"></div>
            <div class="nav-card-icon">&#128101;</div>
            <h3>关于我们</h3>
            <p>Web 组详细介绍、成员风采与招新信息。</p>
            <span class="nav-card-arrow">&rarr;</span>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Back to main site -->
    <section class="section" style="border-top:1px solid var(--line);padding-top:32px;">
      <div class="container">
        <div class="fade-in" data-reveal="rise" style="text-align:center;">
          <a href="../../index.html" class="button">&larr; 前往 TDS 主站</a>
        </div>
      </div>
    </section>
  </div>
</template>
