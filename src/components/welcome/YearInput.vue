<template>
  <BaseWelcomeForm>
    <div class="welcome-header">
      <h1>{{ greetingService.getGreeting() }}，{{ userName }}</h1>
      <p class="subtitle">請問你的出生年份是？</p>
    </div>
    <div class="input-container">
      <div class="year-input-wrapper">
        <input 
          type="tel"
          inputmode="numeric"
          pattern="[0-9]*"
          v-model="inputYear"
          placeholder="例如：1990"
          @keyup.enter="handleSubmit"
          ref="yearInput"
          min="1900"
          :max="currentYear"
        >
        <span class="year-label">年</span>
      </div>
      <button 
        class="submit-button"
        @click="handleSubmit"
        :disabled="!isValidYear"
      >
        下一步
      </button>
    </div>
  </BaseWelcomeForm>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { greetingService } from '../../services/greetingService'
import BaseWelcomeForm from './BaseWelcomeForm.vue'

const props = defineProps({
  userName: { type: String, required: true }
})

const emit = defineEmits(['submit'])
const inputYear = ref('')
const yearInput = ref(null)
const currentYear = new Date().getFullYear()

const isValidYear = computed(() => {
  const year = Number(inputYear.value)
  return year >= 1900 && year <= currentYear
})

const handleSubmit = () => {
  if (isValidYear.value) {
    emit('submit', Number(inputYear.value))
  }
}

onMounted(() => {
  yearInput.value?.focus()
})
</script>

<style scoped>
.year-input-wrapper {
  position: relative;
  width: 100%;
}

.year-input-wrapper input {
  padding-right: 3em;
  text-align: center;
  font-size: 1.5rem;
  letter-spacing: 0.05em;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  color: white;
}

.year-input-wrapper input::-webkit-inner-spin-button,
.year-input-wrapper input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.year-input-wrapper input[type=number] {
  -moz-appearance: textfield;
}

.year-label {
  position: absolute;
  right: 1.2em;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.2rem;
  pointer-events: none;
}

/* 當輸入框獲得焦點時的特效 */
.year-input-wrapper input:focus {
  background: rgba(255, 255, 255, 0.25);
}

/* 錯誤狀態 */
.year-input-wrapper input:invalid {
  box-shadow: none;
  animation: shake 0.3s;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

/* 移動設備優化 */
@media (max-width: 768px) {
  .year-input-wrapper input {
    font-size: 1.3rem;
  }
  
  .year-label {
    font-size: 1rem;
  }
}
</style> 