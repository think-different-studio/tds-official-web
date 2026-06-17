import { resolve, join, extname } from 'node:path'
import { readFileSync, existsSync, statSync } from 'node:fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 主站根目录
const rootDir = resolve(__dirname, '..')

const MIME_MAP: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
}

function serveRootStatic() {
  return {
    name: 'serve-root-static',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        const url = req.url || '/'
        // 只处理非 /web/ 开头的请求
        if (!url.startsWith('/web/')) {
          const cleanPath = url.split('?')[0].split('#')[0]
          // 对中文路径进行 URL 解码
          const decodedPath = decodeURIComponent(cleanPath)
          let filePath: string

          if (decodedPath === '/' || decodedPath === '') {
            filePath = join(rootDir, 'index.html')
          } else {
            filePath = join(rootDir, decodedPath)
          }

          // 如果请求的是目录，尝试 index.html
          if (existsSync(filePath) && statSync(filePath).isDirectory()) {
            filePath = join(filePath, 'index.html')
          }

          if (existsSync(filePath) && statSync(filePath).isFile()) {
            const ext = extname(filePath).toLowerCase()
            const mime = MIME_MAP[ext] || 'application/octet-stream'
            res.setHeader('Content-Type', mime)
            res.end(readFileSync(filePath))
            return
          }

          // 如果文件不存在且无扩展名，回退到主站 index.html（SPA fallback）
          if (!extname(decodedPath)) {
            res.setHeader('Content-Type', 'text/html; charset=utf-8')
            res.end(readFileSync(join(rootDir, 'index.html')))
            return
          }
        }
        next()
      })
    }
  }
}

export default defineConfig({
  plugins: [vue(), serveRootStatic()],
  base: '/web/',
  server: {
    port: 5173,
    open: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
