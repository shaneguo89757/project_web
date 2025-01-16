<template>
  <BaseWelcomeForm>
    <div class="sequence-container">
      <!-- 星期序列 -->
      <div class="number-row">
        <div v-for="num in weekdaySequence" 
             :key="'week-'+num" 
             class="number">{{ num }}</div>
      </div>

      <!-- 月份序列 -->
      <div class="number-row">
        <div v-for="num in monthSequence" 
             :key="'month-'+num" 
             class="number">{{ num }}</div>
      </div>

      <!-- 年份序列 -->
      <div class="number-row">
        <div v-for="num in yearSequence" 
             :key="'year-'+num" 
             class="number">{{ num }}</div>
      </div>

      <div class="divider"></div>

      <!-- 垂直加總 -->
      <div class="number-row">
        <div v-for="(num, index) in verticalSumSequence" 
             :key="'sum-'+index" 
             class="number"
             :class="{ 'highlight': num % 2 === 0 }">{{ num }}</div>
      </div>

      <div class="divider"></div>

      <!-- 年齡網格 -->
      <div class="age-grid">
        <div v-for="num in 72" 
             :key="'age-'+num" 
             class="number"
             :class="{
               'past': num < currentAge,
               'current': num === currentAge,
               'future': num > currentAge
             }">{{ num }}</div>
      </div>
    </div>
  </BaseWelcomeForm>
</template>

<script setup>
import { computed } from 'vue'
import BaseWelcomeForm from './BaseWelcomeForm.vue'

const props = defineProps({
  year: { type: [Number, String], required: true },
  month: { type: [Number, String], required: true },
  day: { type: [Number, String], required: true }
})

// 生成星期序列
const weekdaySequence = computed(() => {
  const start = new Date(props.year, props.month - 1, props.day).getDay() || 7
  return Array.from({ length: 7 }, (_, i) => ((start + i - 1) % 7) + 1)
})

// 生成月份序列
const monthSequence = computed(() => {
  const start = Number(props.month) + 1
  return Array.from({ length: 12 }, (_, i) => ((start + i - 1) % 12) + 1)
})

// 生成年份序列
const yearSequence = computed(() => {
  const start = ((Number(props.year) - 1900) % 12) + 1
  return Array.from({ length: 12 }, (_, i) => ((start + i - 1) % 12) + 1)
})

// 計算垂直加總序列
const verticalSumSequence = computed(() => {
  return Array.from({ length: 12 }, (_, i) => {
    const sum = (weekdaySequence.value[i % 7] || 0) +
               (monthSequence.value[i] || 0) +
               (yearSequence.value[i] || 0)
    return ((sum - 1) % 12) + 1
  })
})

// 計算當前年齡
const currentAge = computed(() => {
  const today = new Date()
  let age = today.getFullYear() - Number(props.year)
  if (today.getMonth() + 1 < props.month || 
      (today.getMonth() + 1 === props.month && today.getDate() < props.day)) {
    age--
  }
  return age
})
</script>

<style scoped>
.sequence-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
}

.number-row, .age-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 8px;
}

.number {
  aspect-ratio: 1;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  font-size: 1rem;
  cursor: default;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;
}

.divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.15);
  margin: 2px 0;
}

.highlight {
  background: rgba(255, 255, 255, 0.25);
  color: #4cd137;
}

.past {
  color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.1);
}

.current {
  background: rgba(255, 255, 255, 0.25);
  color: #4cd137;
  box-shadow: 0 2px 0 #4cd137;
}

@media (max-width: 768px) {
  .sequence-container {
    padding: 15px;
    gap: 10px;
  }

  .number {
    font-size: 0.9rem;
  }
}
</style> 