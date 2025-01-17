<template>
  <button class="contact-button" @click="contactTeacher">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
    </svg>
    諮詢老師
  </button>
</template>

<script setup>
const contactTeacher = () => {
  // Instagram 用戶名
  const instagramUsername = 'tarotjason'
  
  // 嘗試使用 Instagram URL scheme 開啟應用程式
  const instagramAppUrl = `instagram://user?username=${instagramUsername}`
  const webUrl = `https://www.instagram.com/${instagramUsername}`
  
  // 先嘗試開啟 App，如果失敗則開啟網頁版
  const tryOpenApp = () => {
    window.location.href = instagramAppUrl
    
    // 設定一個計時器，如果一段時間後還在當前頁面，就開啟網頁版
    setTimeout(() => {
      if (document.hidden || document.webkitHidden) {
        return // App 已經成功開啟
      }
      window.location.href = webUrl
    }, 2500)
  }

  tryOpenApp()
}
</script>

<style scoped>
.contact-button {
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

.contact-button:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.contact-button:active {
  transform: translateY(0);
}

svg {
  width: 18px;
  height: 18px;
}

@media (max-width: 768px) {
  .contact-button {
    top: 14.5px;
    right: 235px;
    padding: 6px 12px;
    font-size: 0.8rem;
  }
}
</style> 