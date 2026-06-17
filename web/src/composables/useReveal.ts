import { onMounted, onUnmounted, type Ref } from 'vue'

export function useReveal(root: Ref<HTMLElement | null>) {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const el = root.value
    if (!el) return

    const items = el.querySelectorAll<HTMLElement>('.fade-in')
    if (!items.length) return

    items.forEach((item) => {
      const delay = item.dataset.revealDelay || '0'
      item.style.setProperty('--reveal-delay', `${Number(delay) * 90}ms`)
    })

    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('visible'))
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer!.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )

    items.forEach((item) => {
      if (!item.classList.contains('visible')) {
        observer!.observe(item)
      }
    })
  })

  onUnmounted(() => {
    observer?.disconnect()
  })
}
