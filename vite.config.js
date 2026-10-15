import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { SITE } from './src/data/content.js'

const escapeHtml = (v) =>
  String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Fills {{site.*}} tokens in index.html from SITE (src/data/content.js), the single brand config. */
function siteMeta() {
  return {
    name: 'site-meta',
    transformIndexHtml(html) {
      return html.replace(/\{\{site\.(\w+)\}\}/g, (_, key) => {
        if (!(key in SITE)) throw new Error(`index.html: unknown token {{site.${key}}}`)
        return escapeHtml(SITE[key])
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), siteMeta()],
  build: {
    rollupOptions: {
      output: {
        // keep licence banners (/*! ... @license ... */) in the minified bundle; GSAP's terms forbid removing them
        comments: { legal: true },
        manualChunks(id) {
          if (id.includes('node_modules/framer-motion')) {
            return 'framer-motion'
          }
          if (id.includes('node_modules/gsap')) {
            return 'gsap'
          }
        },
      },
    },
  },
})
