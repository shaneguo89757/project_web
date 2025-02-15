<template>
  <BaseWelcomeForm class="sequence-container" :full-width="true">
    <div class="welcome-message">
      <h2 class="message-title">本源密碼</h2>
      <p class="message-text">嗨! <span class="birth-info">{{ name }}</span> 根據您的生日  <span class="birth-info">{{ year }}年{{ month }}月{{ day }}日</span>，我們為您計算出了獨特的數字。這些數字展現了：</p>
      <ul class="message-list">
        <li>命定星宮的週期迴響</li>
        <li>生命之輪的月相軌跡</li>
        <li>靈魂印記的年度共振</li>
      </ul>
      <p class="message-hint">特別標註：<span class="highlight-text">紅色密碼</span> 代表在靈數中重複出現，可能暗示著您生命中的重要節點。</p>
    </div>
    <div class="calendarBackground">
        <div class="calendar">
        <!-- 星期序列 -->
        <div class="sequence-section">
            <div class="sequence-label">週期律動</div>
            <div class="days-grid">
                <div v-for="num in weekdaySequence" 
                    :key="'week-'+num" 
                    class="day-button elementYMD"
                    :title="`第${num}天`">{{ numberChange(num) }}</div>
                <div v-for="i in (12 - weekdaySequence.length)"
                    :key="'empty-'+i"
                    class="day-button empty"></div>
            </div>
        </div>

        <!-- 月份序列 -->
        <div class="sequence-section">
            <div class="sequence-label">月相能量</div>
            <div class="days-grid">
                <div v-for="num in monthSequence" 
                    :key="'month-'+num" 
                    class="day-button elementYMD"
                    :title="`第${num}月`">{{ numberChange(num) }}</div>
            </div>
        </div>

        <!-- 年份序列 -->
        <div class="sequence-section">
            <div class="sequence-label">生命週期</div>
            <div class="days-grid">
                <div v-for="num in yearSequence" 
                    :key="'year-'+num" 
                    class="day-button elementYMD"
                    :title="`生命週期第${num}年`">{{ numberChange(num) }}</div>
            </div>
        </div>

        <!-- 垂直加總 -->
        <div class="sequence-section">
            <div class="sequence-label">靈數密碼</div>
            <div class="days-grid"> 
                <div v-for="(num, index) in verticalSumSequence" 
                    :key="'sum-'+index" 
                    class="day-button defaultTotal"
                    :class="{ 'highlight': isDuplicateInVerticalSum(num) }"
                    :title="isDuplicateInVerticalSum(num) ? '重要生命數字' : '生命能量數字'">{{ numberChange(num) }}</div>
            </div>
        </div>

        <!-- 年齡網格 -->
        <div class="sequence-section">
            <div class="sequence-label">人生階段</div>
            <div class="days-grid">
                <div v-for="num in 36" 
                    :key="'age-'+num" 
                    class="day-button"
                    :class="{
                    'past': num + beginAge < currentAge,
                    'current': num + beginAge === currentAge,
                    'future': num + beginAge > currentAge
                    }"
                    >{{ num + beginAge }}</div>
            </div>
        </div>
        </div>
    </div>
  </BaseWelcomeForm>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import BaseWelcomeForm from './BaseWelcomeForm.vue'

const props = defineProps({
  name: { type: String, required: true },
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
  return age 
})

const numberChange = (num) => {
  const thaiNumberMap = new Map([
    [1, '๑'],
    [2, '๒'], 
    [3, '๓'],
    [4, '๔'],
    [5, '๕'],
    [6, '๖'],
    [7, '๗'],
    [8, '๘'],
    [9, '๙'],
    [10, '๑๐'],
    [11, '๑๑'],
    [12, '๑๒']
  ])
  
  return thaiNumberMap.get(num) || num.toString()
}

const beginAge = computed(() => {
  const age = currentAge.value - (currentAge.value % 12) - 12
  return age < 0 ? 0 : age
})

// 檢查垂直加總中的重複數字
const isDuplicateInVerticalSum = (num) => {
  return verticalSumSequence.value.filter(n => n === num).length >= 2
}

// 組件掛載時滾動到底部
onMounted(() => {
  setTimeout(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    })
  }, 100)
})
</script>

<style scoped>
.sequence-container {
  width: 100%;
  max-width: 100%;
  padding: 0;
  margin: 0;
}

.welcome-message {
  color: rgba(0, 0, 0, 0.942);
  margin-bottom: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.093);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.376);
  font-size: .9rem;
  
}

.message-title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.985);
}

.message-text {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.message-list {
  margin-left: 1.5rem;
  margin-bottom: 0.5rem;
  li {
    margin-bottom: rem;
  }
}

.message-hint {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.879);
}

.highlight-text {
  color: rgb(238, 98, 98);
  font-weight: bold;
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
    transform: scale(1.05);
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
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

.sequence-section {
  margin-bottom: 1rem;
}

.sequence-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.5rem;
  padding-left: 0.1rem;
  font-weight: 500;
  font-weight: bold;
}

.birth-info {
  color: rgba(255, 255, 255, 0.952);
  font-weight: bold;
  /* text-decoration: underline; */
  font-size: 1.2rem;
}
</style> 