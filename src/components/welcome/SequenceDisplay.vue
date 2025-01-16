<template>
  <BaseWelcomeForm>
    <div class="calendar">
      <!-- 星期序列 -->
      <div class="days-grid">
        <div v-for="num in weekdaySequence" 
             :key="'week-'+num" 
             class="day-button">{{ num }}</div>
        <div v-for="i in (12 - weekdaySequence.length)"
             :key="'empty-'+i"
             class="day-button empty"></div>
      </div>

      <!-- 月份序列 -->
      <div class="days-grid">
        <div v-for="num in monthSequence" 
             :key="'month-'+num" 
             class="day-button">{{ num }}</div>
      </div>

      <!-- 年份序列 -->
      <div class="days-grid">
        <div v-for="num in yearSequence" 
             :key="'year-'+num" 
             class="day-button">{{ num }}</div>
      </div>

      <div class="divider"></div>

      <!-- 垂直加總 -->
      <div class="days-grid">
        <div v-for="(num, index) in verticalSumSequence" 
             :key="'sum-'+index" 
             class="day-button"
             :class="{ 'highlight': isDuplicateInVerticalSum(num) }">{{ num }}</div>
      </div>

      <div class="divider"></div>

      <!-- 年齡網格 -->
      <div class="days-grid">
        <div v-for="num in 72" 
             :key="'age-'+num" 
             class="day-button"
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
  return Array.from({ length: 7 }, (_, i) => ((start + i) % 7) + 1)
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
    const sum = (weekdaySequence.value[i] || 0)%7 +
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

// 在 script setup 部分添加新的计算函数
const isDuplicateInVerticalSum = (num) => {
  return verticalSumSequence.value.filter(n => n === num).length >= 2
}
</script>

<style scoped>
.calendar {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 4px;
}

.day-button {
  aspect-ratio: 1;
  border: none;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;
  padding: 0;
}

@media (hover: hover) {
  .day-button:hover:not(:disabled):not(.empty) {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
}

@media (hover: none) {
  .day-button:active:not(:disabled):not(.empty) {
    background: rgba(255, 255, 255, 0.25);
  }
}

.day-button:active:not(:disabled):not(.empty) {
  transform: translateY(0);
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
}

.current {
  background: rgba(255, 255, 255, 0.25);
  color: #4cd137;
}

.future {
  color: white;
}

.empty {
  visibility: hidden;
  pointer-events: none;
}

@media (max-width: 768px) {
  .calendar {
    padding: 8px;
    gap: 8px;
  }

  .day-button {
    font-size: 0.85rem;
  }

  @media (max-width: 360px) {
    .days-grid {
      gap: 3px;
    }
    .day-button {
      font-size: 0.8rem;
      border-radius: 4px;
    }
  }
}
</style> 