<template>
  <BaseWelcomeForm>
    <div class="welcome-header">
      <h1>歡迎</h1>
      <p class="subtitle">讓我們開始認識你</p>
    </div>
    <div class="input-container">
      <input 
        type="text" 
        v-model="inputName" 
        placeholder="你的名字是..."
        @keyup.enter="handleSubmit"
        ref="nameInput"
      >
      <button 
        class="submit-button"
        @click="handleSubmit"
        :disabled="!inputName.trim()"
      >
        下一步
      </button>
    </div>
  </BaseWelcomeForm>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BaseWelcomeForm from './BaseWelcomeForm.vue'

const emit = defineEmits(['submit'])
const inputName = ref('')
const nameInput = ref(null)

const handleSubmit = () => {
  if (inputName.value.trim()) {
    emit('submit', inputName.value)
  }
}

onMounted(() => {
  nameInput.value?.focus()
})
</script>

<style scoped>
/* 特定於名字輸入的樣式 */
input {
  text-align: center;
  font-size: 1.5rem !important;
  letter-spacing: 0.05em;
  -webkit-tap-highlight-color: transparent;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  color: white;
  transition: all 0.3s ease;
}

input::placeholder {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.6);
}

input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  input {
    font-size: 1.3rem !important;
  }
  
  input::placeholder {
    font-size: 1.1rem;
  }
}
</style> 