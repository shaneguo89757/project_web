<template>
  <BaseWelcomeForm>
    <div class="greeting-content">
      <h1>{{ greetingService.getGreeting() }}，{{ userName }}</h1>
      <p class="welcome-message">
        很高興認識你！<br>
        你是 {{ birthYear }} 年 {{ birthMonth }} 月 {{ birthDay }} 日出生的，<br>
        今年 {{ currentAge }} 歲了呢
      </p>
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

const currentAge = computed(() => {
  return new Date().getFullYear() - Number(props.birthYear)
})
</script>

<style scoped>
.greeting-content {
  text-align: center;
}

.welcome-message {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  line-height: 1.8;
}
</style> 