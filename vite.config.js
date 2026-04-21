import { copyFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

/** По умолчанию `/` — Vercel и обычный хостинг. Для GitHub Pages проекта: `VITE_BASE_PATH=/style`. */
function productionBase() {
  const raw = process.env.VITE_BASE_PATH?.trim()
  if (!raw) return '/'
  return raw.endsWith('/') ? raw : `${raw}/`
}

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? productionBase() : '/',
  plugins: [
    react(),
    {
      name: 'github-pages-spa-fallback',
      closeBundle() {
        const dist = resolve(__dirname, 'dist')
        copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))
        writeFileSync(resolve(dist, '.nojekyll'), '')
      },
    },
  ],
}))
