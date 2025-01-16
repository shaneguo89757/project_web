<template>
  <BaseWelcomeForm>
    <div class="welcome-header">
      <h1>{{ greetingService.getGreeting() }}，{{ userName }}</h1>
      <p class="subtitle">{{ year }} 年 {{ month }} 月的哪一天呢？</p>
    </div>
    <DayCalendar 
      :year="year"
      :month="month"
      @select="$emit('select', $event)"
    />
  </BaseWelcomeForm>
</template>

<script setup>
import { greetingService } from '../../services/greetingService'
import DayCalendar from './DayCalendar.vue'
import BaseWelcomeForm from './BaseWelcomeForm.vue'

defineProps({
  userName: { type: String, required: true },
  year: { type: [Number, String], required: true },
  month: { type: [Number, String], required: true }
})
</script> 