import { ref } from 'vue'

export function useError() {
  const error = ref(null)
  
  const handleError = (e) => {
    error.value = e.message
    console.error('Error:', e)
    // 這裡可以添加錯誤處理邏輯，比如顯示錯誤提示等
  }

  return {
    error,
    handleError
  }
} 