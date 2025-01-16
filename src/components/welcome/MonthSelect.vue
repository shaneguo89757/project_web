<template>
  <BaseWelcomeForm>
    <div class="welcome-header">
      <h1>{{ greetingService.getGreeting() }}，{{ userName }}</h1>
      <p class="subtitle">你的出生月份是？</p>
    </div>
    <div class="month-grid">
      <button 
        v-for="month in 12" 
        :key="month"
        class="month-button"
        @click="$emit('select', month)"
      >
        <span>{{ month }} 月</span>
      </button>
    </div>
  </BaseWelcomeForm>
</template>

<script setup>
import { greetingService } from '../../services/greetingService'
import BaseWelcomeForm from './BaseWelcomeForm.vue'

defineProps({
  userName: { type: String, required: true }
})
</script>

<style scoped>
.month-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.month-button {
  aspect-ratio: 1.2;
  border: none;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  -webkit-tap-highlight-color: transparent;
}

@media (hover: hover) {
  .month-button:hover {
    transform: translateY(-3px);
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
}

@media (hover: none) {
  .month-button:active {
    background: rgba(255, 255, 255, 0.25);
  }
}

.month-button:active {
  transform: translateY(0);
}
</style> 