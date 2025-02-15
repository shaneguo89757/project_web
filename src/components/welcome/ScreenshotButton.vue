<template>
  <button class="share-button" @click="shareContent">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="18" cy="5" r="3"/>
      <circle cx="6" cy="12" r="3"/>
      <circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
    分享
  </button>
</template>

<script setup>
import html2canvas from 'html2canvas'

const shareContent = async () => {
  try {
    // 找到要截圖的元素（改為截取整個 app-container）
    const element = document.querySelector('.app-container')
    if (!element) return

    // 獲取視窗大小
    const windowHeight = window.innerHeight
    const elementHeight = element.scrollHeight

    // 創建預覽圖
    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: window.devicePixelRatio * 2,
      logging: false,
      useCORS: true,
      allowTaint: true,
      width: element.offsetWidth,
      height: Math.min(elementHeight, windowHeight),
      windowWidth: element.offsetWidth,
      windowHeight: Math.min(elementHeight, windowHeight),
      x: 0,
      y: window.scrollY,
      scrollY: window.scrollY,
      scrollX: 0,
      onclone: (clonedDoc) => {
        // 在克隆的文檔中添加背景樣式
        const clonedElement = clonedDoc.querySelector('.app-container')
        if (clonedElement) {
          clonedElement.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          clonedElement.style.minHeight = '100vh'
        }
      }
    })

    // 轉換為 blob
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png', 1.0))
    
    // 創建要分享的文件
    const file = new File([blob], '生命數字序列.png', { type: 'image/png' })

    try {
      // 首先嘗試使用原生分享 API
      if (navigator.share) {
        await navigator.share({
          title: '生命數字序列',
          text: '查看我的生命數字序列！',
          files: [file]
        })
      } else {
        // 如果不支援原生分享，則提供下載選項
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = '生命數字序列.png'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        
        // 提示用戶可以分享到 Instagram
        const instagramUsername = 'tarotjason'
        if (confirm('圖片已下載！是否要前往 Instagram 諮詢老師？')) {
          // 嘗試使用 Instagram URL scheme 開啟應用程式
          const instagramAppUrl = `instagram://user?username=${instagramUsername}`
          const webUrl = `https://www.instagram.com/${instagramUsername}`
          
          // 先嘗試開啟 App，如果失敗則開啟網頁版
          window.location.href = instagramAppUrl
          setTimeout(() => {
            if (document.hidden || document.webkitHidden) {
              return // App 已經成功開啟
            }
            window.location.href = webUrl
          }, 2500)
        }
      }
    } catch (error) {
      if (error.name === 'AbortError') return // 用戶取消分享
      console.error('分享失敗:', error)
      alert('分享失敗，請稍後再試')
    }

  } catch (error) {
    console.error('截圖失敗:', error)
    alert('截圖失敗，請稍後再試')
  }
}
</script>

<style scoped>
.share-button {
  position: fixed;
  top: 20px;
  right: 140px;
  z-index: 100;
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
  -webkit-tap-highlight-color: transparent;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.share-button:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.share-button:active {
  transform: translateY(0);
}

svg {
  width: 18px;
  height: 18px;
}

@media (max-width: 768px) {
  .share-button {
    top: 14.5px;
    right: 115px;
    padding: 6px 12px;
    font-size: 0.8rem;
  }
}
</style> 