<script setup lang="ts">
import { ref } from 'vue'
import GlowCard from '@/components/GlowCard.vue'
import { useReveal } from '@/composables/useReveal'

const mainRef = ref<HTMLElement | null>(null)
useReveal(mainRef)

const members = [
  { name: '张三', role: '组长', focus: '全栈 / 安全开发', desc: '负责 Web 组技术方向与项目统筹，热衷于架构设计与安全加固。' },
  { name: '李四', role: '核心成员', focus: '渗透测试 / 攻防', desc: '擅长 Web 渗透与漏洞挖掘，热衷于 CTF 比赛与安全工具开发。' },
  { name: '王五', role: '核心成员', focus: '自动化测试 / DevOps', desc: '关注 CI/CD 与自动化测试体系，对性能压测和质量门禁有深入研究。' },
  { name: '赵六', role: '成员', focus: '全栈 / 后端开发', desc: '探索高并发架构与微服务实践，热衷于用 Go/Node 构建稳定的后端系统。' },
]

const timeline = [
  { year: '2023', event: 'Web 组成立，完成首批成员招募与基础培训。' },
  { year: '2024', event: '完成社团官网第一版开发，组织多次技术分享会。' },
  { year: '2025', event: '启动官网 Vue 重构项目，成员作品持续产出中。' },
]
</script>

<template>
  <div ref="mainRef">
    <section class="section">
      <div class="container">
        <div class="section-heading fade-in" data-reveal="rise">
          <div>
            <span class="eyebrow fade-in" data-reveal="fade">About Us</span>
            <h2 class="fade-in" data-reveal="rise" data-reveal-delay="1">关于 Web 组</h2>
          </div>
          <p class="fade-in" data-reveal="rise" data-reveal-delay="2">
            Web 组是 TDS 社团中覆盖全栈开发、安全开发与自动化测试的方向小组。
            我们负责社团系统架构设计与开发、安全攻防实践、自动化测试体系搭建，同时也鼓励成员自由探索各种 Web 技术方向。
          </p>
        </div>

        <div class="about-grid fade-in" data-reveal="rise" data-reveal-delay="3">
          <GlowCard>
            <h3>我们做什么</h3>
            <p>全栈项目从 0 到 1 的架构与交付；Web 渗透与漏洞挖掘；自动化测试与 CI/CD 质量体系建设。</p>
          </GlowCard>
          <GlowCard>
            <h3>怎么学习</h3>
            <p>每周固定分享会（技术教学 + 攻防演练 + 测试方案评审）；以真实项目驱动学习；鼓励跨方向协作。</p>
          </GlowCard>
          <GlowCard>
            <h3>技术栈</h3>
            <p>主力方向：Vue / React + Node.js / Go + Docker / K8s。也涉及 Web 安全、自动化测试、数据库等。</p>
          </GlowCard>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-heading fade-in" data-reveal="rise">
          <div>
            <span class="eyebrow fade-in" data-reveal="fade">Team</span>
            <h2 class="fade-in" data-reveal="rise" data-reveal-delay="1">成员风采</h2>
          </div>
        </div>

        <div class="members-grid fade-in" data-reveal="rise" data-reveal-delay="2">
          <GlowCard v-for="member in members" :key="member.name">
            <div class="member-avatar">{{ member.name[0] }}</div>
            <h3>{{ member.name }}</h3>
            <span class="member-role">{{ member.role }} · {{ member.focus }}</span>
            <p>{{ member.desc }}</p>
          </GlowCard>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-heading fade-in" data-reveal="rise">
          <div>
            <span class="eyebrow fade-in" data-reveal="fade">History</span>
            <h2 class="fade-in" data-reveal="rise" data-reveal-delay="1">发展历程</h2>
          </div>
        </div>

        <div class="timeline fade-in" data-reveal="rise" data-reveal-delay="2">
          <div v-for="item in timeline" :key="item.year" class="timeline-item">
            <div class="timeline-year">{{ item.year }}</div>
            <div class="timeline-content">{{ item.event }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-heading fade-in" data-reveal="rise">
          <div>
            <span class="eyebrow fade-in" data-reveal="fade">Join Us</span>
            <h2 class="fade-in" data-reveal="rise" data-reveal-delay="1">加入 Web 组</h2>
          </div>
          <p class="fade-in" data-reveal="rise" data-reveal-delay="2">
            对全栈开发、安全攻防或自动化测试感兴趣？欢迎加入我们！
            无论你现在的水平如何，持续学习和协作意识是最重要的。
          </p>
        </div>

        <div class="join-grid fade-in" data-reveal="rise" data-reveal-delay="3">
          <GlowCard>
            <small style="display:block;color:var(--accent);font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:8px;">Step 01</small>
            <h3>加入社团群</h3>
            <p>通过校内宣讲或社团群（QQ: 1027736196）联系招新负责人。</p>
          </GlowCard>
          <GlowCard>
            <small style="display:block;color:var(--accent);font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:8px;">Step 02</small>
            <h3>选择方向</h3>
            <p>了解 Web 组的学习内容和技术方向，确认自己的兴趣点。</p>
          </GlowCard>
          <GlowCard>
            <small style="display:block;color:var(--accent);font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:8px;">Step 03</small>
            <h3>开始协作</h3>
            <p>参与分享会、技术练习和项目实战，逐步成长为团队核心成员。</p>
          </GlowCard>
        </div>

        <div class="fade-in" data-reveal="rise" data-reveal-delay="4" style="margin-top:32px;">
          <a href="/index.html#join" class="button">查看 TDS 招新详情</a>
        </div>
      </div>
    </section>
  </div>
</template>
