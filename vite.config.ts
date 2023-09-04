import {defineConfig} from 'vite'
import svgr from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react'
import {resolve} from 'path'

const projectDir = resolve(__dirname)

/** @type {import('vite').UserConfig} */
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(projectDir, './src'),
    },
  },
  plugins: [svgr(), react()],
})
