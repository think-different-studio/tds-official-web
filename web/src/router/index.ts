import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const isProd = import.meta.env.PROD

const router = createRouter({
  // 生产环境（GitHub Pages）使用 hash 路由，避免路径前缀问题
  // 开发环境使用 history 路由，保持 URL 美观
  history: isProd
    ? createWebHashHistory()
    : createWebHistory('/web/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/works',
      name: 'works',
      component: () => import('@/views/WorksView.vue')
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('@/views/BlogView.vue')
    },
    {
      path: '/blog/:slug',
      name: 'blog-detail',
      component: () => import('@/views/BlogDetailView.vue')
    },
    {
      path: '/learn',
      name: 'learn',
      component: () => import('@/views/LearnView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue')
    }
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  }
})

export default router
