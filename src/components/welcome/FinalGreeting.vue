<template>
  <BaseWelcomeForm>
    <div class="greeting-content">
      <h1>{{ greetingService.getGreeting() }}，{{ userName }}</h1>
      <p class="welcome-message">
        很高興認識你！<br>
        你是 {{ birthYear }} 年 {{ birthMonth }} 月 {{ birthDay }} 日出生的，<br>
        今年 {{ currentAge }} 歲了呢
      </p>
      <button 
        class="more-info-button"
        @click="$emit('next')"
      >
        <span>查看更多資訊</span>
        <div class="arrow-down">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
        </div>
      </button>
    </div>
  </BaseWelcomeForm>
</template>

<script setup>
import { computed } from 'vue'
import { greetingService } from '../../services/greetingService'
import BaseWelcomeForm from './BaseWelcomeForm.vue'

const props = defineProps({
  userName: { type: String, required: true },
  birthYear: { type: [Number, String], required: true },
  birthMonth: { type: [Number, String], required: true },
  birthDay: { type: [Number, String], required: true }
})

defineEmits(['next'])

const currentAge = computed(() => {
  const today = new Date()
  let age = today.getFullYear() - Number(props.birthYear)
  if (today.getMonth() + 1 < props.birthMonth || 
      (today.getMonth() + 1 === props.birthMonth && today.getDate() < props.birthDay)) {
    age--
  }
  return age
})
</script>

<style scoped>
.greeting-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.welcome-message {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  line-height: 1.8;
}

.more-info-button {
  margin-top: 20px;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: none;
  border-radius: 20px;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 10px;
  -webkit-tap-highlight-color: transparent;
}

.arrow-down {
  display: flex;
  align-items: center;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-6px);
  }
  60% {
    transform: translateY(-3px);
  }
}

@media (hover: hover) {
  .more-info-button:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
}

@media (hover: none) {
  .more-info-button:active {
    background: rgba(255, 255, 255, 0.25);
  }
}

.more-info-button:active {
  transform: translateY(0);
}

/* 移動設備優化 */
@media (max-width: 768px) {
  .welcome-message {
    font-size: 1.1rem;
  }
  
  .more-info-button {
    font-size: 1rem;
    padding: 10px 20px;
  }
}
</style> 