<script setup lang="ts">
import { ref } from 'vue'
import GlowCard from '@/components/GlowCard.vue'
import { useReveal } from '@/composables/useReveal'

const mainRef = ref<HTMLElement | null>(null)
useReveal(mainRef)

const categories = [
  {
    eyebrow: 'Getting Started',
    title: '入门路线',
    items: [
      { name: 'HTML & CSS 基础', desc: 'MDN Web Docs 的入门教程，从零开始学习网页结构。', link: 'https://developer.mozilla.org/zh-CN/docs/Learn' },
      { name: 'JavaScript 核心', desc: '现代 JavaScript 教程，涵盖 ES6+ 语法和异步编程。', link: 'https://zh.javascript.info/' },
      { name: 'Git 版本控制', desc: '猴子都能懂的 Git 入门，掌握代码协作基础。', link: 'https://backlog.com/git-tutorial/cn/' },
    ]
  },
  {
    eyebrow: 'Frameworks',
    title: '框架与工具',
    items: [
      { name: 'Vue 3 官方文档', desc: '渐进式 JavaScript 框架，Web 组主力技术栈。', link: 'https://cn.vuejs.org/' },
      { name: 'TypeScript Handbook', desc: 'JavaScript 的类型超集，大型项目必备。', link: 'https://www.typescriptlang.org/docs/handbook/' },
      { name: 'Vite 官方文档', desc: '下一代前端构建工具，极速冷启动与热更新。', link: 'https://cn.vitejs.dev/' },
    ]
  },
  {
    eyebrow: 'Security',
    title: '安全开发',
    items: [
      { name: 'Web 安全入门', desc: 'OWASP 十大漏洞详解与防御方案，Web 安全第一课。', link: 'https://owasp.org/www-project-top-ten/' },
      { name: '渗透测试实战', desc: '从信息收集到漏洞利用的完整渗透测试流程。', link: 'https://portswigger.net/web-security' },
      { name: '安全编码规范', desc: 'CWE / SANS 安全编码指南，写出更安全的代码。', link: 'https://cwe.mitre.org/' },
    ]
  },
  {
    eyebrow: 'Testing',
    title: '测试体系',
    items: [
      { name: '自动化测试基础', desc: '单元测试、集成测试与 E2E 测试的分层策略。', link: 'https://martinfowler.com/articles/practical-test-pyramid.html' },
      { name: '性能测试方法', desc: '负载测试、压力测试与容量规划的核心概念。', link: '#' },
      { name: 'CI/CD 质量门禁', desc: '在持续集成中嵌入自动化测试与代码质量检查。', link: '#' },
    ]
  },
  {
    eyebrow: 'Advanced',
    title: '进阶提升',
    items: [
      { name: 'Web 性能优化', desc: 'Google Web Vitals 指标解读与优化实践。', link: 'https://web.dev/vitals/' },
      { name: '设计模式', desc: '前端常用设计模式与架构思想总结。', link: '#' },
      { name: 'Node.js 全栈', desc: '从前端到后端的完整 JavaScript 开发栈。', link: 'https://nodejs.org/zh-cn' },
    ]
  }
]

const tools = [
  { name: 'VS Code', desc: '微软出品的代码编辑器，开发首选 IDE。' },
  { name: 'Chrome DevTools', desc: '浏览器内置调试工具，性能分析与网络监控。' },
  { name: 'Figma', desc: '协作式设计工具，界面设计与原型交付。' },
  { name: 'pnpm', desc: '快速、节省磁盘空间的包管理器。' },
  { name: 'GitHub', desc: '代码托管平台，团队协作与开源贡献。' },
  { name: 'Vercel / Netlify', desc: '静态站点部署平台，CI/CD 一键发布。' },
]

const securityTools = [
  { name: 'Burp Suite', desc: 'Web 渗透测试利器，拦截代理、漏洞扫描与自动化攻击。' },
  { name: 'OWASP ZAP', desc: '开源 Web 应用漏洞扫描器，适合自动化安全测试入门。' },
  { name: 'Nmap', desc: '网络扫描与主机发现工具，信息收集阶段必备。' },
  { name: 'SQLMap', desc: '自动化 SQL 注入检测与利用工具，支持多种数据库。' },
  { name: 'Wireshark', desc: '网络协议分析器，抓包排障与流量审计。' },
  { name: 'Metasploit', desc: '渗透测试框架，漏洞利用与后渗透阶段的核心平台。' },
]

const perfTools = [
  { name: 'JMeter', desc: 'Apache 出品的开源性能测试工具，支持 HTTP / TCP / 数据库等多种协议。' },
  { name: 'k6', desc: '基于 Go 的现代负载测试工具，用 JavaScript 编写测试脚本。' },
  { name: 'Lighthouse', desc: 'Google 开源的 Web 性能、可访问性与 SEO 审计工具。' },
  { name: 'Artillery', desc: 'Node.js 性能测试工具，擅长服务端负载与混沌测试。' },
  { name: 'Locust', desc: 'Python 编写的分布式负载测试框架，模拟真实用户行为。' },
  { name: 'Grafana + Prometheus', desc: '监控与可观测性套件，性能指标采集、可视化与告警。' },
]
</script>

<template>
  <div ref="mainRef">
    <section class="section">
      <div class="container">
        <div class="section-heading fade-in" data-reveal="rise">
          <div>
            <span class="eyebrow fade-in" data-reveal="fade">Learning Resources</span>
            <h2 class="fade-in" data-reveal="rise" data-reveal-delay="1">学习资源</h2>
          </div>
          <p class="fade-in" data-reveal="rise" data-reveal-delay="2">
            Web 组整理的学习路线与推荐资源，覆盖全栈开发、安全攻防与自动化测试，帮助你系统性地提升技术能力。
          </p>
        </div>

        <div v-for="(cat, ci) in categories" :key="cat.title" class="category-block fade-in" data-reveal="rise" :data-reveal-delay="String(ci + 1)">
          <div class="category-header">
            <span class="eyebrow">{{ cat.eyebrow }}</span>
            <h3>{{ cat.title }}</h3>
          </div>
          <div class="resource-grid">
            <a
              v-for="item in cat.items"
              :key="item.name"
              :href="item.link"
              target="_blank"
              rel="noreferrer"
              class="glow-card resource-card"
            >
              <div class="mini-window-head"></div>
              <h4 style="font-size:1rem;font-weight:700;">{{ item.name }}</h4>
              <p style="color:var(--muted);font-size:0.88rem;line-height:1.6;">{{ item.desc }}</p>
              <span class="resource-arrow" v-if="item.link !== '#'">&nearr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-heading fade-in" data-reveal="rise">
          <div>
            <span class="eyebrow fade-in" data-reveal="fade">Toolbox</span>
            <h2 class="fade-in" data-reveal="rise" data-reveal-delay="1">推荐工具</h2>
          </div>
          <p class="fade-in" data-reveal="rise" data-reveal-delay="2">Web 组日常开发中常用的工具与平台。</p>
        </div>

        <div class="tools-grid fade-in" data-reveal="rise" data-reveal-delay="2">
          <GlowCard v-for="tool in tools" :key="tool.name">
            <h3>{{ tool.name }}</h3>
            <p>{{ tool.desc }}</p>
          </GlowCard>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-heading fade-in" data-reveal="rise">
          <div>
            <span class="eyebrow fade-in" data-reveal="fade">Security Tools</span>
            <h2 class="fade-in" data-reveal="rise" data-reveal-delay="1">安全测试工具</h2>
          </div>
          <p class="fade-in" data-reveal="rise" data-reveal-delay="2">Web 组安全开发方向常用的渗透测试与漏洞检测工具。</p>
        </div>

        <div class="tools-grid fade-in" data-reveal="rise" data-reveal-delay="2">
          <GlowCard v-for="tool in securityTools" :key="tool.name">
            <h3>{{ tool.name }}</h3>
            <p>{{ tool.desc }}</p>
          </GlowCard>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-heading fade-in" data-reveal="rise">
          <div>
            <span class="eyebrow fade-in" data-reveal="fade">Performance Tools</span>
            <h2 class="fade-in" data-reveal="rise" data-reveal-delay="1">性能测试工具</h2>
          </div>
          <p class="fade-in" data-reveal="rise" data-reveal-delay="2">Web 组自动化测试方向常用的负载测试与性能监控工具。</p>
        </div>

        <div class="tools-grid fade-in" data-reveal="rise" data-reveal-delay="2">
          <GlowCard v-for="tool in perfTools" :key="tool.name">
            <h3>{{ tool.name }}</h3>
            <p>{{ tool.desc }}</p>
          </GlowCard>
        </div>
      </div>
    </section>
  </div>
</template>
