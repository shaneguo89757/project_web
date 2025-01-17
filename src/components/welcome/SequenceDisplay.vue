<template>
  <BaseWelcomeForm class="sequence-container" :full-width="true">
    <div class="calendarBackground">
        <div class="calendar">
        <!-- 星期序列 -->
        <div class="days-grid">
            <div v-for="num in weekdaySequence" 
                :key="'week-'+num" 
                class="day-button elementYMD">{{ num }}</div>
            <div v-for="i in (12 - weekdaySequence.length)"
                :key="'empty-'+i"
                class="day-button empty"></div>
        </div>

        <!-- 月份序列 -->
        <div class="days-grid">
            <div v-for="num in monthSequence" 
                :key="'month-'+num" 
                class="day-button elementYMD">{{ num }}</div>
        </div>

        <!-- 年份序列 -->
        <div class="days-grid">
            <div v-for="num in yearSequence" 
                :key="'year-'+num" 
                class="day-button elementYMD">{{ num }}</div>
        </div>

        <div class="divider"></div>

        <!-- 垂直加總 -->
        <div class="days-grid"> 
            <div v-for="(num, index) in verticalSumSequence" 
                :key="'sum-'+index" 
                class="day-button defaultTotal"
                :class="{ 'highlight': isDuplicateInVerticalSum(num) }">{{ num }}</div>
        </div>

        <div class="divider"></div>

        <!-- 年齡網格 -->
        <div class="days-grid">
            <div v-for="num in 48" 
                :key="'age-'+num" 
                class="day-button"
                :class="{
                'past': num + 12 < currentAge,
                'current': num + 12 === currentAge,
                'future': num + 12 > currentAge
                }">{{ num + 12 }}</div>
        </div>
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
    const sum = (weekdaySequence.value[i] || 0) +
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
.sequence-container {
  width: 100%;
  max-width: 100%;
  padding: 0;
  margin: 0;
}

.calendar {
  width: 100%;
  max-width: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.calendarBackground {
  background: rgba(255, 255, 255, 0.093);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 5px;
  border: 1px solid rgba(255, 255, 255, 0.376);
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 4px;
  width: 100%;
  box-sizing: border-box !important;
}

.day-button {
  aspect-ratio: 1;
  border: none;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;
}

@media (hover: hover) {
  .day-button:hover:not(:disabled):not(.empty) {
    transform: none;
    background: rgba(255, 255, 255, 0.05);
    box-shadow: none;
  }
}

.day-button:active:not(:disabled):not(.empty) {
  transform: none;
}

.divider {
  height: 1px;
  background: rgba(28, 4, 74, 0.177);
}

.elementYMD {
    background: rgba(53, 67, 159, 0.18);
    color: rgba(0, 0, 0, 0.785);
}

.defaultTotal {
    background: rgba(53, 67, 159, 0.395);
    border: 1px solid rgba(53, 67, 159, 0.395); 
    color: rgba(0, 0, 0, 0.785);
}

.highlight {
    color: rgb(238, 98, 98);
}

.past {
  background: rgba(255, 255, 255, 0.15);
  color: rgba(0, 0, 0, 0.13);
}

.current {
  background: rgba(249, 90, 124, 0.827);
  color: rgba(255, 255, 255, 0.757);
  text-decoration: underline;
}

.future {
  background: rgba(255, 255, 255, 0.15);
  color: rgba(0, 0, 0, 0.566);
}

.empty {
  visibility: hidden;
  pointer-events: none;
}

.empty-light {
  background: rgba(255, 255, 255, 0.05);
  visibility: visible;
}

.eight {
  background: rgba(255, 192, 203, 0.2); /* 淡粉色背景 */
  color: white;
}

@media (max-width: 768px) {
  .calendar {
    gap: 4px;
  }
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
</style> 