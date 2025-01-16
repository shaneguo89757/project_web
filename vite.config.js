import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // 本地開發時移除 base 設置
  // 只有在部署到 GitHub Pages 時才需要設置 base
  // base: '/你的儲存庫名稱/',
}) 