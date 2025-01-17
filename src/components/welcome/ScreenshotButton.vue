<template>
  <button class="screenshot-button" @click="takeScreenshot">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <circle cx="12" cy="12" r="3"/>
      <path d="M8 8h.01"/>
    </svg>
    截圖
  </button>
</template>

<script setup>
import html2canvas from 'html2canvas'

const takeScreenshot = async () => {
  try {
    // 找到要截圖的元素
    const element = document.querySelector('.sequence-container')
    if (!element) return

    // 創建canvas
    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 2, // 提高清晰度
      logging: false,
      useCORS: true
    })

    // 轉換為圖片並下載
    const link = document.createElement('a')
    link.download = `生命數字序列_${new Date().getTime()}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  } catch (error) {
    console.error('截圖失敗:', error)
  }
}
</script>

<style scoped>
.screenshot-button {
  position: fixed;
  top: 20px;
  left: 20px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 6px;
  z-index: 100;
}

.screenshot-button:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

.screenshot-button:active {
  transform: translateY(0);
}

svg {
  width: 18px;
  height: 18px;
}

@media (max-width: 768px) {
  .screenshot-button {
    top: 10px;
    left: 10px;
    padding: 6px 12px;
    font-size: 0.8rem;
  }
}
</style> 